function csvToJson(inputFile){
  const readline = require('readline');
  const fs = require('fs');

  const rl = readline.createInterface({
    input: fs.createReadStream(inputFile)
  });

  let countryindex = 0;
  let sugarindex = 0; 
  let saltindex = 0;
  let fatindex = 0;
  let proteinindex = 0;
  let carbohydrateindex = 0;
  let country = ['Netherlands', 'Canada', 'United Kingdom' , 'United States' , 'Australia' , 'France' , 'Germany' , 'Spain', 'South Africa'];
  let nEurope = ['United Kingdom', 'Denmark' , 'Sweden' , 'Norway'];
  let cEurope = ['France' , 'Belgium' , 'Germany' , 'Switzerland' , 'Netherlands'];
  let sEurope = ['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia' ,'Albania'];
//
let asugar = new Array(country.length).fill(0.0);
let asalt = new Array(country.length).fill(0.0);
let anfat = new Array(nEurope.length).fill(0.0);
let anprotein = new Array(nEurope.length).fill(0.0);
let ancarbohydrate = new Array(nEurope.length).fill(0.0);
let acfat = new Array(cEurope.length).fill(0.0);
let acprotein = new Array(cEurope.length).fill(0.0);
let accarbohydrate = new Array(cEurope.length).fill(0.0);
let asfat = new Array(sEurope.length).fill(0.0);
let asprotein = new Array(sEurope.length).fill(0.0);
let ascarbohydrate = new Array(sEurope.length).fill(0.0);
let count = 0;
let jsonDocs1 = [];
let jsonDocsNorth = [];
let jsonDocsCentral = [];
let jsonDocsSouth = [];
rl.on('line', (line) => {
  count++;
  let fields =  line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)

  if(count==1) {
    countryindex = fields.indexOf("countries_en");
    sugarindex = fields.indexOf("sugars_100g"); 
    saltindex = fields.indexOf("salt_100g");
    fatindex = fields.indexOf("fat_100g");
    proteinindex = fields.indexOf("proteins_100g");
    carbohydrateindex = fields.indexOf("carbohydrates_100g");
    console.log('Indexes are : countryindex',countryindex, ' sugarindex', sugarindex, ' saltindex', saltindex, ' fatindex', fatindex,' proteinindex', proteinindex,' carbohydrateindex', carbohydrateindex );
  }

  let currentCountry = fields[countryindex];
  let currentSugar = fields[sugarindex];
  let currentSalt = fields[saltindex];
  let currentFat = fields[fatindex];
  let currentProtein = fields[proteinindex];
  let currentCarbohydrate = fields[carbohydrateindex];
  if(country.includes(currentCountry)) 
  {
    if(currentSalt.length!=0)
    {
      cindex = country.indexOf(currentCountry); 

      asalt[cindex] = parseFloat(asalt[cindex])+parseFloat(currentSalt);

    }
    if(currentSugar.length!=0 )
    {
      cindex = country.indexOf(currentCountry);       
      asugar[cindex] = parseFloat(asugar[cindex])+parseFloat(currentSugar); 
    }
  }
  if(nEurope.includes(currentCountry))
  {
    if(currentFat.length!=0)
    {
      cindex = nEurope.indexOf(currentCountry);
      anfat[cindex] = parseFloat(anfat[cindex]) + parseFloat(currentFat);
    }
    if(currentProtein.length!=0)
    {
      cindex = nEurope.indexOf(currentCountry);
      anprotein[cindex] = parseFloat(anprotein[cindex]) + parseFloat(currentProtein);
    }
    if(currentCarbohydrate.length!=0)
    {
      cindex = nEurope.indexOf(currentCountry);
      ancarbohydrate[cindex] = parseFloat(ancarbohydrate[cindex]) + parseFloat(currentCarbohydrate);
    }

  }
  //central Europe begins
  if(cEurope.includes(currentCountry))
  {
    if(currentFat.length!=0)
    {
      cindex = cEurope.indexOf(currentCountry);
      acfat[cindex] = parseFloat(acfat[cindex]) + parseFloat(currentFat);
    }
    if(currentProtein.length!=0)
    {
      cindex = cEurope.indexOf(currentCountry);
      acprotein[cindex] = parseFloat(acprotein[cindex]) + parseFloat(currentProtein);
    }
    if(currentCarbohydrate.length!=0)
    {
      cindex = cEurope.indexOf(currentCountry);
      accarbohydrate[cindex] = parseFloat(accarbohydrate[cindex]) + parseFloat(currentCarbohydrate);
    }
  }
  //south Europe aggregation
  if(sEurope.includes(currentCountry))
  {
    if(currentFat.length!=0)
    {
      cindex = sEurope.indexOf(currentCountry);
      asfat[cindex] = parseFloat(asfat[cindex]) + parseFloat(currentFat);
    }
    if(currentProtein.length!=0)
    {
      cindex = sEurope.indexOf(currentCountry);
      asprotein[cindex] = parseFloat(asprotein[cindex]) + parseFloat(currentProtein);
    }
    if(currentCarbohydrate.length!=0)
    {
      cindex = sEurope.indexOf(currentCountry);
      ascarbohydrate[cindex] = parseFloat(ascarbohydrate[cindex]) + parseFloat(currentCarbohydrate);
    }
  }


});


rl.on('close', () => {

  for(let i=0;i<country.length;i++)
  {

    jsonDocs1.push({country: country[i], salt: asalt[i], sugar: asugar[i]});
    console.log(jsonDocs1);
    //sorting according to sugar + sugar
    // console.log(Array.sort(jsonDocs1));
    jsonDocs1.sort(function(a, b){
      console.log(a);
      console.log(b);
      console.log("a.salt+a.sugar", parseFloat(a.salt)+parseFloat(a.sugar));
      console.log("b.salt+b.sugar", parseFloat(b.salt)+parseFloat(b.sugar));
  return (parseFloat(a.salt)+parseFloat(a.sugar)) < (parseFloat(b.salt)+parseFloat(b.sugar));
});
  }
  let jsonEuropeAll=[];
  let nfatsum=0;
  let nproteinsum=0;
  let ncarbohydratesum=0;
  let cfatsum=0;
  let cproteinsum=0;
  let ccarbohydratesum=0;
  let sfatsum=0;
  let sproteinsum=0;
  let scarbohydratesum=0; 

  
  for(let i=0;i<nEurope.length;i++)
  {
    jsonDocsNorth.push({country: nEurope[i], fat: anfat[i], protein: anprotein[i], carbohydrate: ancarbohydrate[i]});
    nfatsum = nfatsum + anfat[i];
    nproteinsum = nproteinsum + anprotein[i];
    ncarbohydratesum = ncarbohydratesum + ancarbohydrate[i];

  }
  for(let i=0;i<cEurope.length;i++)
  {
    jsonDocsCentral.push({country: cEurope[i], fat: acfat[i], protein: acprotein[i], carbohydrate: accarbohydrate[i] });
    cfatsum = cfatsum + acfat[i];
    cproteinsum = cproteinsum + acprotein[i];
    ccarbohydratesum = ccarbohydratesum + accarbohydrate[i];
  }
  for(let i=0;i<sEurope.length;i++)
  {
    jsonDocsSouth.push({country: sEurope[i], fat: asfat[i], protein: asprotein[i], carbohydrate: ascarbohydrate[i]});
    sfatsum = sfatsum + asfat[i];
    sproteinsum = sproteinsum + asprotein[i];
    scarbohydratesum = scarbohydratesum + ascarbohydrate[i];
  }

  jsonEuropeAll.push({region: "NorthEurope", fat: nfatsum, protein: nproteinsum, carbohydrate: ncarbohydratesum});
  jsonEuropeAll.push({region: "CentralEurope", fat: cfatsum, protein: cproteinsum, carbohydrate: ccarbohydratesum});
  jsonEuropeAll.push({region: "SouthEurope", fat: sfatsum, protein: sproteinsum, carbohydrate: scarbohydratesum});


  fs.writeFile('output/jsonDocs1.json', JSON.stringify(jsonDocs1), function (err) {
    if (err)
     console.log(err);
 });

  fs.writeFile('output/jsonDocsEuropeAll.json', JSON.stringify(jsonEuropeAll), function (err) {
    if (err)
     console.log(err);
 });


});
}


//Calling csvToJson function

csvToJson('FoodFacts.csv');