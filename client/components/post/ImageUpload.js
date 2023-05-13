import React, { useState } from "react";
import { UploadStyle } from "./style";
import { Button, Form, Input, Upload } from "antd";
import { BACK_URL } from "../../config/config";

function ImageUpload() {
    const [fileList, setFileList] = useState([]);
    const onChange = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file) => {
        let src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
        });
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    return (
        <div>
            <UploadStyle
                encType="multipart/form-data"
                progress={{
                    strokeWidth: 3,
                    strokeColor: {
                        "0%": "#f0f",
                        "100%": "#ff0",
                    },
                    style: { top: 12 },
                }}
                // beforeUpload={(file)=>beforChange(file)}
                style={{ position: "relative", top: "-20px" }}
                action={BACK_URL}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                multiple
            >
                {fileList.length < 5 && "+ Upload"}
            </UploadStyle>
        </div>
    );
}

export default ImageUpload;
