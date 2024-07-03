import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const ImageUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "images/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex items-start justify-center lg:justify-start w-full h-full ">
            <img
              src={fileUrl}
              className="w-24 h-24 rounded-full m-2 border-[2px] p-[3px] border-dashed border-primary-500 cursor-pointer object-cover"
              alt="image"
            />
          </div>
        </>
      ) : (
        <div className="file_uploader-boxa">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file_upload"
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG,PNG,JPEG</p>
          <Button className="shad-button_dark_4">Select From Computer</Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
