import { SyntheticEvent, useState } from "react";
import { Card, Header, Tab, Image, Grid, Button } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "../../app/models/profile";
import { deletePhoto, setMainPhoto, uploadPhoto } from "./queries";
import { getUser } from "../users/queries";

interface Props {
  profile: Profile;
}

const ProfilePhotos = ({ profile }: Props) => {
  const { data: user, isLoading: getUserLoading } = getUser();
  const { mutateAsync: setMainMut, isLoading: setMainLoading } = setMainPhoto();
  const { mutateAsync: deletePhotoMut, isLoading: deletePhotoLoading } =
    deletePhoto();
  const { mutateAsync: uploadPhotoMut, isLoading: uploadPhotoLoading } =
    uploadPhoto();

  const loading =
    getUserLoading ||
    setMainLoading ||
    deletePhotoLoading ||
    uploadPhotoLoading;

  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState("");

  const isCurrentUser = user?.username === profile.username;

  const handlePhotoUpload = (file: any) => {
    uploadPhotoMut(file).then(() => setAddPhotoMode(false));
  };

  const handleSetMain = (
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    setTarget(e.currentTarget.name);
    setMainMut(photo.id);
  };

  const handleDeletePhoto = (
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    setTarget(e.currentTarget.name);
    deletePhotoMut(photo.id);
  };

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width="16">
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add" + " Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width="16">
          {addPhotoMode ? (
            <PhotoUploadWidget
              uploadPhoto={handlePhotoUpload}
              loading={loading}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <Button.Group fluid widths={2}>
                      <Button
                        basic
                        color="green"
                        content="Main"
                        name={"main" + photo.id}
                        loading={target === "main" + photo.id && loading}
                        disabled={photo.isMain}
                        onClick={(e) => handleSetMain(photo, e)}
                      />
                      <Button
                        name={photo.id}
                        loading={loading && photo.id === target}
                        onClick={(e) => handleDeletePhoto(photo, e)}
                        basic
                        color="red"
                        icon="trash"
                        disabled={photo.isMain}
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default ProfilePhotos;
