// in this file, i will define the task list component and store the data in my local//

import React, {Component} from "react";
import { Card, Header, Form, Input, Icon, CardMeta, Button}from "semantic-ui-react";
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
                 task: `?${this.state.task}`,
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
            elseif (b.status);{
                return -1;

            }
            return 0;
            
        } );

        //this will save the task list in local storage
        localStorage.setItem("tasklist", JSON.stringify(tasklist));

        //this will set tasklist to the state

        this.setState({
            //default color || incomplete- green || complete- yellow
            tasklist:tasklist.map((item,index) =>{
                let color = "green";
                let cardBackground = { background : "white" };
                let taskComplete = {textDecoration : "none"};

                if (item.status){
                    color="yellow";
                    cardBackground.background="beige";
                    taskComplete["textDecoration"] = "line-through";
                }

                return(
                    <Card key={index} color={color} fluid style= {cardBackground}>
                    <Card.Content>

                        <Card.Header textAlign="left" style={taskComplete}>
                            <div style={{ wordWrap:"break-word"}}>{item.task}</div>
                        </Card.Header>

                        <Card.Meta textAlign="right"> 
                        <icon
                        link name = "check circle"
                        color= "yellow"
                        onClick={() => this.updateTask(index)}
                        />
                        <span style={{ paddingRight :10 }}> Done</span>

                        <icon 
                        link name = "undo"
                        color= "green"
                        onclick={() => this.undoTask(index)}
                        />
                        <span style={{ paddingRight :10 }}> Undo</span>

                        <icon 
                        link name = "delete"
                        color= "red"
                        onclick={() => this.deleteTask(index)}
                        />
                        <span style={{ paddingRight :10 }}> Delete</span>



                        </Card.Meta>
                        </Card.Content>
                        </Card>
                );

            })
        });
    }
    };

    //update the task list
    updateTask= index => {
        //get list from local storage
        let tasklist= JSON.parse(localStorage.getItem('tasklist'));
        //change the status to true
        tasklist[index].status = true;
        //save
        localStorage.setItem("tasklist", JSON.stringify(tasklist));
        //refresh the list
        this.getTasks();

    };
     

    // undo the task status from true to false
    undoTask= index => {
        //get the task list from the local storage

        let tasklist= JSON.parse(localStorage.getItem('tasklist'));
        //change status to false
        tasklist[index].status=false;
        //save the updates
        localStorage.setItem('tasklist', JSON.stringify(tasklist));
        //refresh the task list
        this.getTasks();


    };

    //delete the task list from the list
    deleteTask= indes => {
        //get the list
        let tasklist= JSON.parse(localStorage.getItem("tasklist"));
        //remove task from list
        tasklist.splice(index, 1);
        //save the updated list
        localStorage.setItem("tasklist", JSON.stringify(tasklist));
        //refresh
        this.getTasks();


    };

    render(){
        return(
            <div>
                <div>
                    <Header as= "h1">
                        <div className="app-header"> My Tasks</div>
                        
                    </Header>
                
                </div>
                <div className="app-form">
                    <Form onSubmit={this.onSubmit}>
                        <label>Task name</label>
                        <input 
                        type="text"
                        name="task"
                        onChange={this.onChange}
                        value={this.state.task}
                        placeholder='add task...'
                        />
                       <Button variant="primary mb-3" type="submit">
      Submit
    </Button>
                    </Form>
                </div>
                <div>
                   
                    <Card.Group>{this.state.task}</Card.Group>
                </div>

                
            </div>
        );
    }

}

export default MyTaskList;
