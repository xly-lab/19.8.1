const changeToStar = function(num){
  const number = num.toString().substring(0,1);
  const star=[]
  for(var i = 0 ; i < 10 ; i+=2 ){
    if(i<number)star.push(1);
    else star.push(0)
  }
  return star;
}
module.exports = {
  changeToStar
}
const changeToStar1 = function (num) {
  const number = num.toString().substring(0, 1);
  const star = []
  for (var i = 0; i < 5; i += 1) {
    if (i < number) star.push(1);
    else star.push(0)
  }
  return star;
}
module.exports = {
  changeToStar,
  changeToStar1
}