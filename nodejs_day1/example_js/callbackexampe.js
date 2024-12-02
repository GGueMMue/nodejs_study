function Hello()
{
    console.log("hello");
}
function GoodBye()
{
    console.log("Goodbye");
}
function MySec()
{
    console.log("GoodBye :: " + MyCalculor(5, 5));
}
function MyCalculor(num1, num2)
{
    let sum = num1 + num2;
    return sum;
}


Hello();
GoodBye();
MySec();