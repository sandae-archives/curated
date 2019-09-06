import React, {useState} from "react";
import {createStyles, Theme, makeStyles} from "@material-ui/core/styles";
import {Project} from "../../model-contracts/project";
import Container from "@material-ui/core/Container";
import {PomodoroComponent} from "./pomodoro";
import Button from '@material-ui/core/Button';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import LaptopIcon from '@material-ui/icons/Laptop';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            backgroundColor: theme.palette.background.paper
        },
        button: {
            margin: theme.spacing(1)
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    })
);

export type ProjectViewComponentProps = {
    project: Project;
};

enum PomodoroAction {
    focus = 25,
    break = 5
}

export function ProjectViewComponent({project}: ProjectViewComponentProps) {
    const [nextAction, setNextAction] = useState(PomodoroAction.focus);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [focusCount, setFocusCount] = useState(0);

    const classes = useStyles();

    function start() {
        setIsTimerRunning(true);
    }

    function done() {
        setIsTimerRunning(false);

        if (PomodoroAction.focus)
            setFocusCount(focusCount + 1);

        setNextAction(
            nextAction === PomodoroAction.focus
                ? PomodoroAction.break
                : PomodoroAction.break);
    }

    function canFocus() {
        return nextAction === PomodoroAction.focus;
    }

    return (
        <Container maxWidth="xs" className={classes.root}>
            <h1 style={{textAlign: 'center'}}>{project.name}</h1>
            <div style={{textAlign: 'center'}}>
                {isTimerRunning
                    ? <PomodoroComponent
                        onDone={() => done()}
                        onUpdate={({timeSpent}: any) => console.log("Time spent: " + timeSpent)}
                        initial={canFocus() ? PomodoroAction.focus : PomodoroAction.break}/>
                    : <Button className={classes.button}
                              size="large"
                              onClick={() => start()}
                              variant="contained"
                              color="primary">
                        {canFocus()
                            ? <LaptopIcon className={classes.extendedIcon}/>
                            : <LocalCafeIcon className={classes.extendedIcon}/>}
                        {canFocus() ? 'Focus' : 'Break'}
                    </Button>}
            </div>
        </Container>
    );
}

