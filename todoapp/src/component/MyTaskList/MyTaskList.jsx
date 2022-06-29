// in this file, i will define the task list component and store the data in my local//

import React, {Component} from "react";
import {Card, Header, Form, Input, Icon}from "semantic-ui-react";
import "./MyTaskList.css";

class MyTaskList extends Component {
    constructor(props){
        super(props)

        this.state = {
            task: "",
            tasklist: []
        };
    }

    //on loading, this will show the task list

    componentDidMount= () => { 
        this.getTasks(); 
    };

    onChange= event => {
        this.setState({
            [event.targer.nname]: event.target.value
        });

    };

    //this will add task to the list of tasks

    onSubmit= () => {
        // this will check if the task is an empty string
        if (this.state.task) {
            //gets the task list from local
            let tasklist = JSON.parse(localStorage.getItem("tasklist"));

            //null means empty, i'll create an empty task list
            if (tasklist== null) {
                tasklist =[];

            }

            // i'll create task object, default status is false
             let task = {
                 task: `? ${this.state.task}`,
                 status: false
             };

             //to add task to list

             tasklist.push(task);

             //to save task in local storage
             localStorage.setItem("tasklist", JSON.stringify(tasklist));

             //to clear task list
             this.setState({task: ""});

             //refresh the tasks
             this,getTasks();

            
        }

    };

    //to get tasklist

    getTasks = () => {
        //from local
    let tasklist =JSON.parse(localStorage.getItem("tasklist"));

    //to check if list is empty
    if (tasklist) {
        //sort tasks
        //completed task should move down
        tasklist=tasklist.sort((a,b) =>{
            if (a.status){
                return 1;
            }
            elseif (b.status){
                return -1;

            }
            return 0;
            
        } );

        //this will save the task list in local storage
        
    }
    }
    

