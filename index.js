import { Client } from '@notionhq/client';

const NOTION_KEY = "secret_WGQa2YN0twOP0y02GmEvTjdjOYGhehNajIe3HHIFUNz";
const NOTION_DATABASE_ID = "f178d0772e034bbd9f4832b28a6b8fb8";
const databaseId = NOTION_DATABASE_ID
const notion = new Client({ auth: NOTION_KEY })


async function addItem(text) {//adds a page to a database
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        'Assname': {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: text,
              },
            },
          ],
        },
        "Grade": {
          "type": "number",
          "number": 100
        },
      },
    })
    console.log(response)
    console.log("Success! Entry added.")
}

async function getItems() {// retrieves information about pages, NOT the properties
  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: {
      property: "Grade",
      number: {
        is_not_empty: {},
      },
    }
  });
  console.log(response);
}

async function getProps(pageId, pageName,callback) { // gets properties
  const response = JSON.stringify(await notion.pages.retrieve({page_id: pageId}))
  pageName.json = JSON.parse(response);

  //console.log(pageName.json.properties.Grade.number); // Get ass grade
  //console.log(pageName.json.properties.Class.relation[0].id); // Get class id
  /*
  switch(pageName.json.properties.Class.relation[0].id) { // Get class name? maybe not neccessary
    case "10960b4c-8d37-4596-ae77-96c554ea4e66":
      console.log("Control Systems");
      break;
    default:
        console.log("Unkown Class");
  }*/
  callback(); //waits to update page object until finished
}

//-----------------------------------------------
//---program-------------------------

var page = {};
//getItems();
addItem("Farts");
//let str = getProps('8d2c0974-39d6-4a42-a668-cfb9018def0c');
getProps('8d2c0974-39d6-4a42-a668-cfb9018def0c',page, print);




function print() {
console.log(page.json);
}
/*
chrome.contextMenus.create({
  id: "context",
  title: "Update Grades",
  contexts: ["all]"]
})*/