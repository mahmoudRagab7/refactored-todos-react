import * as React from "react";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Icons
// import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
// import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
// import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
// import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

// Components
import Todo from "./Todo";

// Others
import { useState, useEffect, useMemo } from "react";
import { useTodos, useTodosDispatch } from "../contexts/todosContexts";
import { useToast } from "../contexts/ToastContext";

export default function TodoList() {
  // const [todos, dispatch] = useReducer(todosReducer, []);
  const todos = useTodos();
  const dispatch = useTodosDispatch();

  const { showHideToast } = useToast();

  const [titleInput, setTitleInput] = useState("");

  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogTodo, setDialogTodo] = useState(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  //   Filteration Arrays

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling completed todos");
      return t.isCompleted;
    });
  }, [todos]);
  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling not completed todos");
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRendered = todos;
  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  //   useEffect(() => {
  //     console.log("calling use effect");
  //   }, [todos,titleInput]);
  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  // ===== Handlers
  function changeDisplayedType(e) {
    // console.log(e.target.value);
    setDisplayedTodosType(e.target.value);
  }

  //   function handleCheckClick(todoId) {
  //     const updatedTodos = todos.map((t) => {
  //       if (t.id === todoId) {
  //         t.isCompleted = !t.isCompleted;
  //       }
  //       return t;
  //     });
  //     setTodos(updatedTodos);
  //   }

  function handleAddClick() {
    dispatch({
      type: "added",
      payload: {
        newTitle: titleInput,
      },
    });
    setTitleInput("");
    showHideToast("تمت الإضافة بنجاح");
  }

  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    // alert(todo.id);
    setShowDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    // console.log(dialogTodo);
    dispatch({ type: "deleted", payload: { id: dialogTodo.id } });
    setShowDeleteDialog(false);
    showHideToast("تم الحذف بنجاح");
  }

  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }

  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfirm() {
    dispatch({
      type: "updated",
      payload: dialogTodo, // sending the whole object
    });
    setShowUpdateDialog(false);
    showHideToast("تم التحديث بنجاح");
  }
  // ===== Handlers =====

  const todosJsx = todosToBeRendered.map((t) => {
    // return <Todo key={t.id} todo={t} handleCheck={handleCheckClick} />;
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={openDeleteDialog}
        showUpdate={openUpdateDialog}
      />
    );
  });
  return (
    <>
      {/* Delete Modal */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متأكد من رغبتك في حذف المهمة ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            نعم، قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===== Delete Modal ===== */}
      {/* Update Modal */}
      <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">تعديل مهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={dialogTodo?.title}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={dialogTodo?.details}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>إغلاق</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===== Update Modal ===== */}

      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "90vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography
              variant="h1"
              style={{ fontWeight: "bold" }}
              className="card-title"
            >
              مهامي
            </Typography>
            <Divider />
            {/* Filter Buttons */}
            <ToggleButtonGroup
              value={displayedTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
              style={{ direction: "ltr", marginTop: "20px" }}
              color="primary"
            >
              <ToggleButton value="non-completed">غير المنجز</ToggleButton>
              <ToggleButton value="completed">المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/* ===== Filter Buttons ===== */}

            {/*  All Todos  */}
            {todosJsx}
            {/* ===== All Todos ===== */}

            {/* Input + Add Button */}
            <Grid container spacing={2} marginTop={"10px"}>
              <Grid
                xs={8}
                display={"flex"}
                justifyContent={"space-around"}
                alignItems={"center"}
              >
                <TextField
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>
              <Grid
                xs={4}
                display={"flex"}
                justifyContent={"space-around"}
                alignItems={"center"}
              >
                <Button
                  variant="contained"
                  style={{ width: "100%", height: "100%" }}
                  onClick={() => {
                    handleAddClick();
                  }}
                  disabled={titleInput.length === 0}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
            {/* ===== Input + Add Button ===== */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
