import React, { useMemo, useCallback, memo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // react-quill과 css파일 import 하기
import { request } from "../Axios";

const Write = memo(({ quillRef, api, htmlContent, setHtmlContent }) => {
    // 툴바의 사진 아이콘 클릭시 기존에 작동하던 방식 대신에 실행시킬 핸들러를 만들어주자.
    const [previewImageUrl, setPreviewImageUrl] = useState("");
    const imageHandler = useCallback(() => {
        const formData = new FormData(); // 이미지를 url로 바꾸기위해 서버로 전달할 폼데이터 만들기

        const input = document.createElement("input"); // input 태그를 동적으로 생성하기
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*"); // 이미지 파일만 선택가능하도록 제한
        input.setAttribute("name", "image");
        input.click();

        // 파일 선택창에서 이미지를 선택하면 실행될 콜백 함수 등록
        input.onchange = async () => {
            const file = input.files[0];
            formData.append("file", file); // 위에서 만든 폼데이터에 이미지 추가

            console.log(file);

            try {
                const res = await request.post("/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                const imageUrl = res.data.fileDownloadUri;
                const quill = quillRef.current.getEditor();
                const range = quill.getSelection();
                quill.insertEmbed(range.index, "image", imageUrl);
                quill.setSelection(range.index + 1, 0);
            } catch (error) {
                console.error(error);
                alert("이미지 업로드에 실패하였습니다.");
            }
        }; //주어진 인덱스에 HTML로 작성된 내용물을 에디터에 삽입한다.
    }, [quillRef]);

    const modules = useMemo(
        () => ({
            toolbar: {
                // 툴바에 넣을 기능들을 순서대로 나열하면 된다.
                container: [
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ size: ["small", false, "large", "huge"] }, { color: [] }],
                    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }, { align: [] }],
                    ["image"],
                ],
                handlers: {
                    // 위에서 만든 이미지 핸들러 사용하도록 설정
                    image: imageHandler,
                },
            },
        }),
        [imageHandler]
    );
    return (
        <div>
            <ReactQuill
                ref={quillRef}
                value={htmlContent}
                onChange={setHtmlContent}
                modules={modules}
                placeholder="내용을 입력하세요."
                theme="snow"
                style={{ height: 500 }}
            />
        </div>
    );
});

export default Write;