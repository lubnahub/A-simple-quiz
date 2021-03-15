const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;
var text2=document.getElementById("id001");

finalScore.innerHTML = mostRecentScore;
if(finalScore.innerHTML==20)
{
    text2.innerHTML="Congratulations! That was really bad.";
}
else if(finalScore.innerHTML<=40)
{
    text2.innerHTML="Congratulations! That was bad.";
}
else if(finalScore.innerHTML<=60)
{
    text2.innerHTML="Congratulations! You'll probably do better in the next attempt.";
}
else if(finalScore.innerHTML<=80)
{
    text2.innerHTML="Congratulations! There is definitely room for improvement.";
}
else if(finalScore.innerHTML<=100)
{
    text2.innerHTML="Congratulations! That's a decent score.";
}
else if(finalScore.innerHTML<=120)
{
    text2.innerHTML="Congratulations! That was awesome.";
}
else if(finalScore.innerHTML<=150)
{
    text2.innerHTML="Congratulations! What a nerd!";
}



username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    //window.location.assign('/');
};
