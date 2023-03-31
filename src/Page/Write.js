import React, { useRef, memo } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { request } from "../Axios";
import QuillEditor from "../Component/Writing";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Writing = memo(({ api }) => {
    const [title, setTitle] = React.useState("");
    const [useYn, setValues] = React.useState("");
    const [category, setCategory] = React.useState("");

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleuse = (e) => {
        setValues(e.target.value);
    };
    const handleCategory = (e) => {
        setCategory(e.target.value);
    };
    const quillRef = useRef();
    const regi = sessionStorage.getItem("name");

    const handleSubmit = () => {
        const content = quillRef.current.getEditor().getContents(); //태그를 제외한 순수 text만을 받아온다. 검색기능을 구현하지 않을 거라면 굳이 text만 따로 저장할 필요는 없다.
        const descriptions = quillRef.current.value; //태그를 제외한 순수 text만을 받아온다. 검색기능을 구현하지 않을 거라면 굳이 text만 따로 저장할 필요는 없다.
        console.log(quillRef.current.value);
        console.log(quillRef.current.getEditor());
        if (descriptions.trim() === "") {
            alert("내용을 입력해주세요.");
            return;
        }
        console.log(regi);
        request
            .post(
                "/regipost",
                {
                    title: title,
                    content: descriptions,
                    category: category,
                    useYn: useYn,
                    regiUser: regi,
                },
                {
                    headers: { "Content-Type": `application/json` },
                }
            )
            .then(function (response) {
                alert("등록 성공");
                // document.location.href = "/blog";
            })
            .catch(function (error) {
                console.error(error);
            });
    };
    return (
        <div>
            <div style={{ marginBottom: 30, marginTop: 30 }}>
                <TextField
                    fullWidth
                    value={title || ""}
                    id="standard-multiline-flexible"
                    label="title"
                    name="title"
                    variant="filled"
                    onChange={handleTitle}
                />
            </div>
            <QuillEditor quillRef={quillRef} api={api} />
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>Accordion 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl style={{ width: 100 }}>
                        <InputLabel id="demo-simple-select-label">공개여부</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={useYn}
                            label="use"
                            onChange={handleuse}>
                            <MenuItem value={"Y"}>Y</MenuItem>
                            <MenuItem value={"N"}>N</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: 100 }}>
                        <InputLabel id="category">카테고리</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            value={category}
                            label="category"
                            onChange={handleCategory}>
                            <MenuItem value={"diary"}>일기</MenuItem>
                            <MenuItem value={"song"}>노래추천</MenuItem>
                            <MenuItem value={"book"}>독후감</MenuItem>
                            <MenuItem value={"study"}>코딩 공부</MenuItem>
                            <MenuItem value={"deli"}>맛집 추천</MenuItem>
                        </Select>
                    </FormControl>
                </AccordionDetails>
            </Accordion>

            <Button onClick={handleSubmit} style={{ marginTop: 90 }}>
                등록하기
            </Button>
        </div>
    );
});
export default Writing;
