import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ImageUploading, { ImageListType } from "react-images-uploading";

interface UploadImageProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  name: string;
  value: any;
}

const UploadImage = ({ onClick, name, value }: UploadImageProps) => {
  const { setFieldValue } = useFormikContext();
  const [images, setImages] = useState<ImageListType>([]);
  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  useEffect(() => {
    if (images.length > 1) {
      //   const newImage: ImageListType = images[1];
      setImages([images[1]]);
    }
    setFieldValue(name, images[0]);
    console.log(value);
    if (images.length === 0 && value) {
      setImages([value]);
      // console.log(value);
    }
  }, [images]);
  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={2}
        maxFileSize={5242880}
        dataURLKey="data_url"
        acceptType={["jpg", "jpeg", "png", "bmp"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          errors,
        }) => (
          // write your building UI
          <div>
            <div
              className="upload__image-wrapper rounded"
              style={{ width: "100%", backgroundColor: "#ededed" }}
            >
              <button
                className="mt-2"
                style={{
                  width: "100%",
                  //   height: "280px",
                  border: "none",
                  backgroundColor: "transparent",
                  // fontSize: "0.9em",
                }}
                onClick={(e) => {
                  onClick(e);
                  images.length === 0 && onImageUpload();
                  images.length > 0 && onImageUpdate(0);
                }}
                {...dragProps}
              >
                {images.length === 0
                  ? "Kliknij lub przeciągnij aby dodać zdjęcie"
                  : "Kliknij lub przeciągnij aby zmienić zdjęcie"}
                {images.length === 0 ? (
                  <img
                    src="./recipe.jpg"
                    alt=""
                    style={{
                      height: "250px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    className="mt-2 px-3"
                  />
                ) : (
                  <img
                    src={images[0].data_url}
                    alt=""
                    style={{
                      height: "250px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    className="mt-2 px-3"
                  />
                  //   <img
                  //     src={imageList[0]["data_url"]}
                  //     alt=""
                  //     style={{
                  //       height: "250px",
                  //       width: "100%",
                  //       objectFit: "cover",
                  //       zIndex: "-2",
                  //     }}
                  //     //   className="mt-2 px-3"
                  //     className={isDragging ? "mt-5" : undefined}
                  //   />
                )}
                {/* {imageList.map((image, index) => (
                  <div
                    key={index}
                    className="image-item"
                    //   style={{
                    //     zIndex: "-2",
                    //     position: "absolute",
                    //     left: "20px",
                    //     bottom: "20px",
                    //   }}
                    {...dragProps}
                    // onClick={(e) => {
                    //   onClick(e);
                    //   images.length === 0 && onImageUpload();
                    //   images.length > 0 && onImageUpdate(0);
                    // }}
                  >
                    <img
                      src={image["data_url"]}
                      alt=""
                      style={{
                        height: "250px",
                        width: "100%",
                        objectFit: "cover",
                        zIndex: "-2",
                      }}
                      //   className="mt-2 px-3"
                      className={isDragging ? "mt-5" : undefined}
                    />
                  </div> 
                ))}*/}
              </button>
              &nbsp;
              {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
              {/* {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="500" />
                <div className="image-item__btn-wrapper">
                  <button
                    onClick={(e) => {
                      onClick(e);
                      onImageUpdate(index);
                    }}
                  >
                    Update
                  </button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))} */}
            </div>

            <div className="mt-2">
              <Form.Text>
                {errors?.acceptType && (
                  <span className="text-danger">Zły format zdjęcia</span>
                )}
                {errors?.maxFileSize && (
                  <span className="text-danger">Za duży rozmiar zdjęcia</span>
                )}
              </Form.Text>
            </div>
            <div className="d-grid mt-2">
              <Button
                variant="outline-secondary"
                onClick={() => {
                  onImageRemove(0);
                  setFieldValue(name, "");
                }}
              >
                Usuń zdjęcie
              </Button>
            </div>
          </div>
        )}
      </ImageUploading>
      <div className="mt-1">
        <Form.Text>
          Możesz dodać zdjęcie w formacie:
          <strong>.png .jpg .jpeg .bpm</strong>
          {/* o maksymalnym rozmiarze{" "} <strong>5 MB</strong> */}
        </Form.Text>
      </div>
    </div>
  );
};

export default UploadImage;
