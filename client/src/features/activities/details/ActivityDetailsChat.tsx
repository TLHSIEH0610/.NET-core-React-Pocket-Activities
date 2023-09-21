import { Formik, Form, Field, FieldProps } from "formik";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Comment, Loader } from "semantic-ui-react";
import * as Yup from "yup";
import { formatDistanceToNow } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { stopHubConnection, createHubConnection } from "../activitiesSlice";
import { addComment } from "../queries";

interface Props {
  activityId: string;
}

const ActivityDetailedChat = ({ activityId }: Props) => {
  const { comments } = useAppSelector((state) => state.acticities);
  const { mutateAsync: addCommentMut } = addComment();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // if (activityId) {
    dispatch(createHubConnection(activityId));
    // }

    return () => {
      console.log("demount");
      dispatch(stopHubConnection());
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
            addCommentMut({ ...values, activityId }).then(() => resetForm());
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
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image || "/assets/user.png"} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistanceToNow(comment.createdAt)} ago</div>
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
