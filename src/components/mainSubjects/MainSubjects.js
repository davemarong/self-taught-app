import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CardActions from "@material-ui/core/CardActions";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { change_main_subjects } from "../../redux/actions/index";
import useMainSubjectData from "./useMainSubjectData";
import IconButton from "@material-ui/core/IconButton";

import { ListItemText } from "@material-ui/core";
export default function MainSubjects() {
  const {
    mainSubjects,
    handleMainSubjectName,
    mainSubjectName,
    setMainSubjectName,
    handleNewSkill,
    newSkill,
    setNewSkill,
    handleFilterRemoveOneItem,
    handleAddNewSkill,
    currentSkills,
    handlePushInfoToRedux,
    focusInput,
    clickEnterAddSkill,
    addSkillInputRef,
  } = useMainSubjectData();
  const mainSubjectNameRef = useRef();

  useEffect(() => {
    focusInput(mainSubjectNameRef);
  }, []);
  return (
    <div>
      <Card>
        <CardContent>
          <TextField
            inputRef={mainSubjectNameRef}
            label="Name"
            onChange={handleMainSubjectName}
            variant="outlined"
            value={mainSubjectName}
          ></TextField>
        </CardContent>
        <CardContent>
          <TextField
            inputRef={addSkillInputRef}
            onKeyPress={clickEnterAddSkill}
            onChange={handleNewSkill}
            variant="outlined"
            label="Add skill..."
            value={newSkill}
          ></TextField>

          <Button
            onClick={() => {
              handleAddNewSkill(currentSkills);
              setNewSkill("");
              focusInput(addSkillInputRef);
            }}
          >
            Add
          </Button>
        </CardContent>
        <List>
          {currentSkills.map((item, index) => {
            return (
              <ListItem key={index}>
                <ListItemText>{item}</ListItemText>
              </ListItem>
            );
          })}
        </List>
        <CardActions>
          <Button
            onClick={() => {
              handlePushInfoToRedux();
              setMainSubjectName("");
            }}
          >
            Save
          </Button>
        </CardActions>
        <CardContent>
          <List>
            {mainSubjects.map((item, topIndex) => {
              return (
                <ListItem key={item.title}>
                  <ListItemText>Name: {item[0].title}</ListItemText>
                  <ListItemText>
                    Tasks:
                    {item[1].map((task) => {
                      return (
                        <div key={task}>
                          {task}
                          <button
                            onClick={() => {
                              handleFilterRemoveOneItem(topIndex, task);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      );
                    })}
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </div>
  );
}
