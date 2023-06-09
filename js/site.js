function getValues(){
    //The global constants of some class functions(value) are determined using the following three line codes
    const amount = document.querySelector('#loanAmount').value;
    const interest_rate = document.querySelector('#rate').value;
    const months = document.querySelector('#months').value;
    
    //The interest rate has been calculated.
    //The total amount of interest per month has been calculated by the following calculation.
    //That calculation is stored in a constant called "interest"
    const interest = (amount * (interest_rate * 0.01)) / months;
    
    //The bottom line calculates how much to pay each month.
    //Here the total amount is divided by the month (which you will input) and the monthly interest is added to it.
    //All these calculations are stored in a constant called "payment".     
    let payment = ((amount / months) + interest).toFixed(2); 
    
    //regedit to add a comma after every three digits
    //That is, a comma (,) will be added after every three numbers.
    //Example 50,000
    payment = payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
    
    //With the help of innerHTML, the information stored in the "payment" is displayed on the webpage.
    document.querySelector('#payment').innerHTML = `Monthly Payment = ${payment}`
    }






//I had to declare the variables outside of the main code so everything would work consider this my :root directory.
var sum = 0;
let balanceArray = [];
let interestArray = [];
let ppArray = [];
let cumulative = [];
//Get the user inputted Loan Amout, Term, and Interest Rates.
function getInput() {
    //user inputted loan amount get
    let loan = document.getElementById("loan").value;
    //user inputted term get
    let term = document.getElementById("term").value;
    //user inputted interest rate amount get
    let rate = document.getElementById("rate").value;

    //Lets make sure they're integers.
    loan = parseFloat(loan);
    term = parseFloat(term);
    rate = parseFloat(rate);
    console.log(loan);
    console.log(term);
    console.log(rate);
    //math
    let TMP = loan *  (rate / 1200) / (1 - (1 + rate/1200)**(-term));
    //console.logs throughout cause its easier for me to see whats happening the debugger hates me :(
    //console.log(TMP);
    //Calling my functions for later.
    calculateMortgage();
    displayNumbers();

    //Rounding function taken from Mozilla Developer Documentation. This resolves the errors I was getting rounding previously.
    function round(x) {
        return Number.parseFloat(x).toFixed(2);
    }
    //Logic Function
    function calculateMortgage() {
        //BEGIN GATHERING THE REMAINING BALANCE TOTALS
        //define variables I need for the for loop:
        let balance = loan;
        let interestCumulative = 0;
        //Okay lets count from month 1 to the last month:
        for (let index = 0; index < term; index++) {

            //and while we're counting from month 1 to the end we need to calculate the interest and balance.
            let interest = balance * (rate/1200);
            let pp = TMP - interest;
            //Formulas taken from coder foundry project spec sheet.
            balance = balance - pp;
            let interestTotal = (balance + interest) - balance;
            //push the balance to an array.
            balanceArray.push(balance);
            //Total interest push to array.
            interestArray.push(interestTotal);
            //push principal payment to array.
            ppArray.push(pp);
        }
        //This is basically a cumulative interest counter, it doesn't work unless its in a seperate for loop.
        for (let index = 0; index < term; index++) {
            interestCumulative += interestArray[index];
            //push to interestCumulative
            cumulative.push(interestCumulative);

        }
        //This code adds together things to give us the sum.
        sum = interestArray.reduce(add, 0);
        function add(accumulator, a) {
            return accumulator + a;
        }
        //I need to call the display function or variables used won't work.
        displayNumbers();
        //These are to make sure things are adding up properly please ignore, remember to comment them out when done!
        //console.log(balanceArray);
        //console.log(interestArray);
        //console.log(sum);
        //console.log(ppArray);
        //console.log(cumulative);

        //This is a bit of code thats basically the round function but using maps in order to round each entry in the arrays. I ran this 4 times for each array, not sure if this could be better.
        cumulative = cumulative.map(function(each_element){
            return Number(each_element.toFixed(2));
        });
        interestArray = interestArray.map(function(each_element){
            return Number(each_element.toFixed(2));
        });
        balanceArray = balanceArray.map(function(each_element){
            return Number(each_element.toFixed(2));
        });
        ppArray = ppArray.map(function(each_element){
            return Number(each_element.toFixed(2));
        });
    }
    //fill the table, total principal, total interest, monthly payments and total cost areas with the data.
    function displayNumbers() {
        //Display the payment
        document.getElementById("payment").innerHTML = TMP;
        //Display the principal:
        let principal = document.getElementById("loan").value;
        document.getElementById("principal-tot").innerHTML = principal;
        //display the total interest:
        sum = round(sum);
        document.getElementById("interest-tot").innerHTML = sum;
        //display total cost
        document.getElementById("cost-tot").innerHTML = +principal + +sum;
        //Display amortization table.
        TMP = round(TMP);
        let table = "";
        let b = 1;
        for (let i = 0; i < term; i++) {
            table += ``;
            table += `${b++}${TMP}${ppArray[i]}${interestArray[i]}${cumulative[i]}${balanceArray[i]}`;
            table += ``

        }
        document.getElementById("results").innerHTML = table;

    }
}