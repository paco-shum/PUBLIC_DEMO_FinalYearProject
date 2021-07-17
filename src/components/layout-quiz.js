import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

//example layout of questions
/* const questions = [
{
	question: "Who invented JavaScript?",
	answers: {
		a: "Douglas Crockford",
		b: "Sheryl Sandberg",
		c: "Brendan Eich"
	},
	correctAnswer: "c"
},
{
	question: "Which one of these is a JavaScript package manager?",
	answers: {
		a: "Node.js",
		b: "TypeScript",
		c: "npm"
	},
	correctAnswer: "c"
},
{
	question: "Which tool can you use to ensure code quality?",
	answers: {
		a: "Angular",
		b: "jQuery",
		c: "RequireJS",
		d: "ESLint"
	},
	correctAnswer: "d"
}
]; */

const useStyles = makeStyles((theme) => ({
	formControl: {
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		marginBottom: theme.spacing(3),
	},
	button: {
	  margin: theme.spacing(1, 1, 0, 0),
	}
  }));

function Quiz(props) {
	const classes = useStyles();

	const [helperText, setHelperText] = React.useState(' ');
	const [userAnswer, setUserAnswer] = React.useState([]);
	const [error, setError] = React.useState(false);

	const correctAnswers = [];
	const buildQuiz = questions => {
		let build = [];
		for(var question in questions){
			let answers = [];
			//userAnswer = Array.from(Array(questions.length));
			for(var answer in questions[question].answers){
				answers.push(<FormControlLabel value={answer} control={<Radio />} label={questions[question].answers[answer]} />); 
			}
			build.push(<FormLabel component="legend"><h3>{parseInt(question)+1}. {questions[question].question}</h3></FormLabel>);
			build.push(<RadioGroup aria-label="quiz" name={question} onChange={userSelect}>{answers}</RadioGroup>);
			build.push(<br />);
			userAnswer.push("unanswered");
			correctAnswers.push(questions[question].correctAnswer)
		}
		return build
	}
	const userSelect = (event) => {
		let tempArr = userAnswer;
		tempArr[parseInt(event.target.name)] = event.target.value;
		setUserAnswer(tempArr);
		console.log(userAnswer); 
	};
	const showResults = (event) => {
		event.preventDefault();
		var unanswered = [];
		var inCorrectAnswer = [];

		for (var ans in correctAnswers){
			if (userAnswer[ans] === "unanswered"){
				unanswered.push(parseInt(ans)+1);
			} else if (correctAnswers[ans] !== userAnswer[ans]) {
				inCorrectAnswer.push(parseInt(ans)+1);
			}
		}
		if (unanswered.length !== 0){
			setHelperText("Please select an option for question " + unanswered.join(", "));
			setError(true);
		} else if (inCorrectAnswer.length !== 0){
			setHelperText("Incorrect answer for question " + inCorrectAnswer.join(", "));
			setError(true);
		} else {
			setHelperText("Well done! They are all correct!");
			setError(false);
		}



	};
	return(
		<div>
			<br/>
			<form onSubmit={showResults}>
				<FormControl component="fieldset" className={classes.formControl}>
				{buildQuiz(props.questionsList)}
				<FormHelperText error={error}><h4>{helperText}</h4></FormHelperText>
				<Button type="submit" variant="contained" color="primary" className={classes.button}>
					Check Answer
				</Button>
				</FormControl>
			</form>
		</div>
	)
};

export default Quiz