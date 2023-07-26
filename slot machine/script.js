const prompt=require("prompt-sync")();
const ROWS=3;
const COLS=3;

const SYMBOL_COUNT={
    "A":2,
    "B":3,
    "C":4,
    "D":4
}
const SYMBOL_VALUES={
    "A":5,
    "B":4,
    "C":3,
    "D":2
}

//get the deposit amount

const deposit=() => {
    while(true){
   const depositamount=prompt("enter a deposit amount:");
    const numberdepositamount=parseFloat(depositamount);
    if(isNaN(numberdepositamount)||numberdepositamount<=0)
    console.log("enter the valid number");
    else
    return numberdepositamount;
}};


 //get number of lines 

 const getnumberofLines=()=>{
    while(true){
        const nol=prompt("enter number of lines:");
         const numberoflines=parseFloat(nol);
         if(isNaN(numberoflines)||numberoflines<=0||numberoflines>3)
         console.log("enter the valid number of lines");
         else
         return numberoflines;
     }};
     
     //get the bet amount
     const getBet=(balance,numberoflines)=>{
        while(true){
            const bet=prompt("enter the bet amount per line :");
             const betamount=parseFloat(bet);
             if(isNaN(betamount)||betamount>(balance/numberoflines))
             console.log("enter the valid bet amount");
             else
             return betamount;
        }
     };

     // spin the machine
     const spin=()=>{
      const symbols=[];
      for(const [symbol,count] of Object.entries(SYMBOL_COUNT)){
      for(let i=1;i<count;i++){
        symbols.push(symbol);
      }
    }
   const reels=[[],[],[]];
   for(let i=0;i<COLS;i++){
    const reelSymbols=[...symbols];
    for(let j=0;j<ROWS;j++){
        const num=Math.floor(Math.random()*reelSymbols.length);
    const selectedSymbol=reelSymbols[num];
    reels[i].push(selectedSymbol);
    reelSymbols.splice(num,1);
    }
   }
   return reels; 
     };  


      //transpose all the reels 
     const transpose=(reels)=>{
        const rows=[];
        for(let i=0;i<ROWS;i++){
            rows.push([]);
            for(let j=0;j<COLS;j++){
                rows[i].push(reels[j][i]);
            }
        }
        return rows;
     };

      // printing the rows

     const printrows=(rows)=>{
        for(const row of rows){
            let rowString="";;
        for(const[i,symbol] of row.entries()){
            rowString+=symbol;
            if(i!=row.length-1){
                rowString+=" | ";
            }
        }
        console.log(rowString);
        }
     };

     const getWinnings=(rows,bet,lines)=>{
        let winnings=0;
        for(let row=0;row<lines;row++){
            const symbols=rows[row]; 
            let allSame=true;
            for(const symbol of symbols) {
                if(symbol!=symbols[0]){
                allSame=false;
                break;
            } 
              }
              if(allSame){
                winnings+=bet*SYMBOL_VALUES[symbols[0]];
              }
     }
     return winnings;
    };
     
    const game=()=>{
     let balance=deposit();
     while(true){
     console.log("you have a balance of $"+ balance);
     const numberoflines=getnumberofLines();
     const betamount=getBet(balance,numberoflines);
     balance-=betamount*numberoflines
     const reels=spin();
     const rows=transpose(reels);
     printrows(rows);
     const winnings=getWinnings(rows,betamount,numberoflines);
     balance+=winnings;
     console.log("you won , $"+winnings.toString());
     if(balance<=0){
        console.log("you ran out of money!");
        break;
     }
     const playAgain=prompt("do you want to play again(y/n)?");
     if(playAgain!="y")break;
     }
    };
    game();
     
       

