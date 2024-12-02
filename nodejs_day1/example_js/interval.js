//setInterval(MyFunction, 1000);
function MyFunction()
{
    let d = new Date();
    console.log(d.getHours() + "," + d.getMinutes() + " : " + d.getSeconds());
}

function MyAsync(something)
{
  console.log(something() + "MyAsync");  
}

//MyFunction();
MyAsync(MyFunction);

console.log("here!");