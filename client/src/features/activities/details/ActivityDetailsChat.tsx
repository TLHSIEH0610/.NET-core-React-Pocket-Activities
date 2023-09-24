import { Formik, Form, Field, FieldProps } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Comment, Loader } from "semantic-ui-react";
import * as Yup from "yup";
import { DateTime } from "luxon";
import { addComment } from "../queries";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { ChatComment } from "../../../app/models/comment";

interface Props {
  activityId: string;
}

//todo: comments updated by other browsers would not trigger re-render?
const ActivityDetailedChat = ({ activityId }: Props) => {
  const [hubConnection, setHubConnection] = useState<HubConnection | null>(
    null
  );
  const [comments, setComments] = useState<ChatComment[]>([]);
  const { mutateAsync: addCommentMut } = addComment();

  useEffect(() => {
    createHubConnection({
      activityId,
      hubConnection,
      setHubConnection,
      setComments,
    });

    return () => {
      stopHubConnection({ hubConnection, setComments });
    };
  }, [activityId]);

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached clearing>
        <Formik
          onSubmit={(values, { resetForm }) => {
            addCommentMut({ ...values, activityId, hubConnection }).then(() =>
              resetForm()
            );
          }}
          initialValues={{ body: "" }}
          validationSchema={Yup.object({
            body: Yup.string().required(),
          })}
        >
          {({ isSubmitting, isValid, handleSubmit }) => (
            <Form className="ui form">
              <Field name="body">
                {(props: FieldProps) => (
                  <div style={{ position: "relative" }}>
                    <Loader active={isSubmitting} />
                    <textarea
                      placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
                      rows={2}
                      {...props.field}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.shiftKey) {
                          return;
                        }
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          isValid && handleSubmit();
                        }
                      }}
                    />
                  </div>
                )}
              </Field>
            </Form>
          )}
        </Formik>
        <Comment.Group>
          {comments?.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image || "/assets/user.png"} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.appUserId}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>
                    {DateTime.fromJSDate(comment.createdAt)
                      .diffNow()
                      .toString()}
                    ago
                  </div>
                </Comment.Metadata>
                <Comment.Text style={{ whiteSpace: "pre-wrap" }}>
                  {comment.body}
                </Comment.Text>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
    </>
  );
};

export default ActivityDetailedChat;

interface ICreateHub {
  activityId: string;
  hubConnection: HubConnection | null;
  setHubConnection: (arg: HubConnection | null) => void;
  setComments: (arg: ChatComment[]) => void;
}

const createHubConnection = ({
  activityId,
  setHubConnection,
  setComments,
}: ICreateHub) => {
  const token = localStorage.getItem("jwt");

  const connection = new HubConnectionBuilder()
    .withUrl(`${import.meta.env.VITE_CHAT_URL}?activityId=${activityId}`, {
      accessTokenFactory: () => token || "",
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

  connection
    .start()
    .catch((error) => console.log("Error establishing connection: ", error));

  connection.on("LoadComments", (comments: ChatComment[]) => {
    comments.forEach((comment) => {
      comment.createdAt = new Date(comment.createdAt + "Z");
    });
    setComments(comments);
  });

  connection.on("ReceiveComment", (comment) => {
    comment.createdAt = new Date(comment.createdAt);

    //@ts-ignore
    setComments((prev) => {
      prev.unshift(comment);
      return prev;
    });
  });

  setHubConnection(connection);
};

interface IStopHub {
  hubConnection: HubConnection | null;
  setComments: (arg: ChatComment[]) => void;
}

const stopHubConnection = ({ setComments, hubConnection }: IStopHub) => {
  setComments([]);

  hubConnection
    ?.stop()
    .catch((error) => console.log("Error stopping connection: ", error));
};
