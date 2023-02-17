const express = require("express");
const cors = require("cors");
//const parseurl = require('url')
//const vhost = require("vhost");
var path = require("path");
const app = express();
const port = 9090;

var fs = require("fs");

function handleProgItem(progStr) {
  let regexPattern =
    /<time\s{1,}itemprop="startDate"\s{1,}datetime="([^".]*)">(\d*\.\d*)*<\/time>/gi;
  let regexPattern2 =
    /<time\s{1,}itemprop="endDate"\s{1,}datetime="([^".]*)">(\d*\.\d*)*<\/time>/gi;
  let regexPattern3 = /<meta itemprop="duration" content="([^".]*)">/gi;
  // let regexPattern = /<h2/;
  let regex = new RegExp(regexPattern);
  // let result = textHtml.match(regex);
  let result,
    result2 = null;
  // let max = result.length;
  let ind = 0;
  let startDateStr = null,
    startTimeStr = null;
  let endDateStr = null,
    endTimeStr = null;
  let spanStr = progStr;
  let jsonProgItem = {};

  jsonProgItem.accessibilityfeature = false;

  let regexPattern1 =
    /<div\s{1,}class="schedule-card__header"\s{1,}tabIndex="0">/gi;
  let regex1 = new RegExp(regexPattern1);
  let result1 = regex1.exec(progStr);
  let headerStr = null;
  if (result1) {
    let regex4 = new RegExp(/<meta itemprop="(\w*)" content="([^".]*)">/gi);
    let result4 = regex4.exec(progStr);
    let itemPropName = "";
    let itemPropContent = "";
    let metaitems = {};
    let durationStr = "";
    while (result4) {
      itemPropName = result4[1];
      itemPropContent = result4[2];
      if (itemPropName == "duration") durationStr = itemPropContent;
      if (
        itemPropName == "accessibilityFeature" &&
        itemPropContent == "captions"
      )
        jsonProgItem.accessibilityfeature = true;
      metaitems[itemPropName] = itemPropContent;
      result4 = regex4.exec(spanStr);
    }
    jsonProgItem.metaitems = metaitems;
    jsonProgItem.duration = durationStr;

    headerStr = progStr.substring(result1.index + result1[0].length);
    let indRegex1 = headerStr.indexOf("</div>");
    if (indRegex1 > -1) {
      let headerStr1 = headerStr.substring(0, indRegex1);
      result = regex.exec(headerStr1);
      if (result) {
        startDateStr = result[1];
        startTimeStr = result[2];
        jsonProgItem.startDate = startDateStr;
        jsonProgItem.startTime = startTimeStr;

        headerStr1 = headerStr1.substring(result.index);
        let regex2 = new RegExp(regexPattern2);
        result2 = regex2.exec(headerStr1);
        if (result2) {
          endDateStr = result2[1];
          endTimeStr = result2[2];
          jsonProgItem.endDate = endDateStr;
          jsonProgItem.endTime = endTimeStr;
        }

        jsonProgItem.status = undefined;

        let regex5b = new RegExp(/<span\s{1,}class="areena-status([^".]*)">/gi);
        let result5b = regex5b.exec(headerStr1);
        let statusStr = "";
        if (result5b) {
          statusStr = result5b[1];
          jsonProgItem.status = statusStr;
        }

        let regex5 = new RegExp(/<span\s{1,}class="schedule-card__title">/gi);
        let result5 = regex5.exec(headerStr1);
        let nameStr = "";
        if (result5) {
          let ind5 = -1;
          let namSpan = headerStr1.substring(result5.index);
          let spanEndSearch = "</span>";
          ind5 = namSpan.indexOf(spanEndSearch);
          if (ind5 > -1) {
            namSpan = namSpan.substring(0, ind5 + spanEndSearch.length);
            let regex6 = new RegExp(
              /<span\s{1,}itemprop="name">([^<.]*)<\/span>/gi
            );
            let result6 = regex6.exec(namSpan);
            if (result6) {
              nameStr = result6[1];
              jsonProgItem.name = nameStr;
            }
          }
        }
      }

      jsonProgItem.upcoming = false;
      jsonProgItem.expired = false;
      jsonProgItem.current = false;

      let regex6b = new RegExp(
        /<li\s+class="schedule-card\s+schedule-card([^\s.]*\s)/gi
      );
      let result6b = regex6b.exec(progStr);
      if (result6b) {
        let aftercard = result6b[1];

        if (aftercard.toString().includes("__no-more-programs-today"))
          return null;
        jsonProgItem.upcoming = aftercard.toString().includes("--upcoming");
        jsonProgItem.expired = aftercard.toString().includes("--expired");
        jsonProgItem.current = aftercard.toString().includes("--current");
        jsonProgItem.aftercard = aftercard.toString().trim();
      }
    }

    let regex7b = new RegExp(/<div\s{1,}class="schedule-card__footer">/gi);
    let result7b = regex7b.exec(progStr);
    if (result7b) {
      let footerStr = progStr.substring(result7b.index);
      let regex7 = new RegExp(/<span\s{1,}itemprop="description">/gi);
      let result7 = regex7.exec(footerStr);
      let descriptionStr = "";
      let divFooter = "";
      if (result7) {
        divFooter = footerStr.substring(result7.index + result7[0].length);
        let ind8 = divFooter.indexOf("</span>");
        if (ind8 > -1) {
          //descriptionStr = descStr.substring(0, ind8);
          descriptionStr = divFooter.substring(0, ind8);
          jsonProgItem.description = descriptionStr;
        }
      }

      jsonProgItem.captiontext = undefined;

      let regex9b = new RegExp(/<span\s+itemprop="name">([^<\n.]*)</gi);
      let result9b = regex9b.exec(footerStr);
      if (result9b) {
        let progtext = result9b[1];
        jsonProgItem.captiontext = progtext;
      }

      let regex9 = new RegExp(
        /<span\s+class="schedule-card__duration">([^<\n.]*)</gi
      );
      let result9 = regex9.exec(footerStr);
      let durationMinStr = "";
      if (result9) {
        durationMinStr = result9[1];
        let divFooter2 = divFooter.substring(result9.lastIndex);
        let regex10 = new RegExp(/<a\s{1,}([^>.]*)>([^<.]*)<\/a>/gi);
        let result10 = regex10.exec(divFooter2);
        let linkHRef = "",
          linkHRef2;
        let linkText = "";
        let regex11 = new RegExp(/href="([^".]*)"/gi);
        let result11 = null; // regex10.exec(divFooter2);
        let links = [];
        let link = {};

        while (result10) {
          linkHRef = result10[1];
          result11 = regex11.exec(linkHRef);
          if (result11) linkHRef2 = result11[1];
          linkText = result10[2];
          link = {};
          link.href = linkHRef2;
          link.text = linkText;
          links.push(link);
          result10 = regex10.exec(divFooter2);
        }
        jsonProgItem.links = links;
      }
      jsonProgItem.createdtime = new Date().toTimeString();
    }

    return jsonProgItem;
  }
  return null;
}

function parseOneYleChannelFromHtml(blog) {
  const h2Ind = blog.indexOf("</h2>");
  let title = null;
  let h2str = null;
  if (h2Ind == -1) {
    h2Ind = blog.length - 1;
    h2str = blog;
  } else h2str = blog.substring(0, h2Ind);

  let regexPattern = /aria-label="([^".]*)"/gi;
  // let regexPattern = /<h2/;
  let regex = new RegExp(regexPattern);
  let result = regex.exec(h2str);
  let channeltitle = "";
  if (result) channeltitle = result[1];

  let ind = 0;
  const searchstr = '<li class="schedule-card';
  let liInd = blog.indexOf(searchstr, ind);
  let progStr = null,
    indEndLi = -1;
  let progitems = [],
    bEnd = false,
    progItem = null;
  let i = 1;

  while (liInd > -1) {
    ind = liInd + searchstr.length;
    indEndLi = blog.indexOf(searchstr, ind);
    if (indEndLi == -1) {
      indEndLi = blog.length - 1;
      ind = indEndLi;
      bEnd = true;
    } else {
      ind = indEndLi;
    }
    progStr = blog.substring(liInd, indEndLi);

    /*
        var path = 'prog' +i +'.txt';
    
        fs.writeFile(path, progStr, function (err) {
            if (err) return console.log(err);
          });
          */
    progItem = handleProgItem(progStr);
    if (progItem) progitems.push(progItem);
    if (bEnd) break;
    liInd = blog.indexOf(searchstr, ind);
    i = i + 1;
  }

  // let schedules = store.getState().schedules;
  let ret = {};
  ret.name = channeltitle;
  ret.channelprograms = progitems;
  return ret;
  // store.setState({ schedules: schedules });
}

function parseHtmlDataIntoChannels(textHtml) {
  if (textHtml === undefined || textHtml === null) return "";

  let dataArray = [];
  /*
  let regexPattern0 =	/<ul\s+class="guide-channels"/gi;
  let regex0 = new RegExp(regexPattern0);
  let result0 = regex0.exec(textHtml);
  if (!result0)
    return;
  */
  // let indChannelUL = result0.index;
  let testSearh = "Talot huokuvat historiaa";
  let indTest = textHtml.indexOf(testSearh);
  let testStr = textHtml.substring(indTest);
  let ulStr = textHtml; //.substring(indChannelUL);
  let regexPattern = /<h2\s+class\s*=\s*"channel-header"\s*>/gi;
  let regexLiEndPattern = /<\/li>/gi;
  let regexLiEnd = new RegExp(regexLiEndPattern);

  // let regexPattern = /<h2/;
  let regex = new RegExp(regexPattern);
  let regex2 = new RegExp(regexPattern);
  // let result = textHtml.match(regex);
  let result,
    result2 = null;
  // let max = result.length;
  let ind = 0;
  let matchStart = -1,
    matchEnd = -1;
  let prev_matchStart = -1,
    prev_matchEnd = 0;
  let next_matchStart = -1,
    next_matchEnd = -1;
  let before = null,
    found = null,
    after = null,
    blog = null;

  let foundedRegex = false,
    mathlength;
  let mathlength2, next_matchEnd2;
  let i = 1,
    channel = null,
    channels = [];

  while ((result = regex.exec(textHtml)) != null) {
    matchStart = result.index;
    mathlength = result[ind].length;
    matchEnd = matchStart + mathlength;
    found = textHtml.substring(matchStart, matchEnd);
    before = textHtml.substring(prev_matchEnd, matchStart);
    after = textHtml.substring(matchEnd);
    result2 = regex2.exec(after);
    if (result2) {
      foundedRegex = true;
      let next_matchStart2 = result2.index;
      mathlength2 = result2[0].length;
      next_matchEnd2 = next_matchStart2 + mathlength2;
      next_matchStart = matchEnd + next_matchEnd2 - mathlength2;
    } else {
      foundedRegex = false;
      next_matchStart = textHtml.length - 1;
      next_matchEnd = textHtml.length - 1;
    }
    /*
    if (after)
    {
      foundedRegex = true;
      result2 = regexLiEnd.exec(after);
      // result2 = regex.exec(after);
      if (result2 != null)
      {
        let next_matchStart2 = result2.index;
        mathlength2 = result2[0].length;
        next_matchEnd2 = next_matchStart2 + mathlength2;
        next_matchStart = matchEnd +next_matchEnd2 - mathlength2;
      }
    }
    else
    {
      foundedRegex = false;
      next_matchStart = textHtml.length -1;
      next_matchEnd = textHtml.length -1;
    }
    */
    blog = textHtml.substring(matchStart, next_matchStart);
    //    console.log("blog");
    // console.log(blog);
    channel = null;

    /*
    var path = 'blog' +i +'.txt';

  //  fs.open(path, 'w', (err, fd) => {
  //    if (err) return console.log(err);
      fs.writeFile(path, blog, function (err) {
        if (err) return console.log(err);
      });
 //   });
      */

    if (blog) {
      channel = parseOneYleChannelFromHtml(blog);
      if (channel != null) channels.push(channel);
      /*
      fs.close(path, (err) => { 
      if (err) 
        console.error('Failed to close file', err); 
      else { 
        console.log("\n> File Closed successfully"); 
      } 
    }); 
    */
    }
    if (next_matchEnd) prev_matchEnd = next_matchEnd;
    else prev_matchEnd = matchEnd;

    i = i + 1;
    //    break;
  }
  let ret = JSON.stringify(channels);
  return ret;
}

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @param res {string} respond object from coming request. 
 * This function send result back to the caller.
// * @return {Promise<string>}
 * 
 */
function execShellCommandYleData(cmd, res) {
  const exec = require("child_process").exec;
  console.log("cmd");
  console.log(cmd);
  // return new Promise((resolve, reject) => {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.warn(error);
    }

    /*
        console.log("stdout");
        console.log(stdout);
        console.log("stderr");
        console.log(stderr);
        */

    // resolve(stdout? stdout : stderr);
    let result = stdout ? stdout : stderr;
    // let result = (stdout? parseHtmlDataIntoChannels(stdout) : stderr);
    res.send(result.toString("UTF8"));
    //     });
  });
}

/**
 * /telkku */

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @param res {string} respond object from coming request. 
 * This function send result back to the caller.
// * @return {Promise<string>}
 * 
 */
function execShellCommandXmlData(cmd, res) {
  const exec = require("child_process").exec;
  console.log("cmd");
  console.log(cmd);
  // return new Promise((resolve, reject) => {
  exec(cmd, { maxBuffer: 1024 * 2000 }, (error, stdout, stderr) => {
    if (error) {
      console.warn(error);
    }

    /*        
      console.log("stdout");
      console.log(stdout);
      console.log("stderr");
      console.log(stderr);
      */
    // resolve(stdout? stdout : stderr);
    let result = stdout ? stdout : stderr;
    res.send(result.toString("UTF8"));
    //     });
  });
}

app.use(cors());

console.log("new public staticits:");
console.log(__dirname);

var indexfunc = function (req, res) {
  // var d = new Date();
  res.sendFile(path.join(__dirname + "/public/index.html"));
  // Info(req.ip + " - Session to main.html built successfully! ");
};
app.get("/htmlamppari", indexfunc);
app.get("/htmltelkku", indexfunc);
app.get("/amppari", indexfunc);
app.get("/telkku", indexfunc);
app.use("/", express.static("public"));
app.use(express.static("public"));

// app.use("/", express.static("public"));

// -H "Content-Type: text/html; charset=utf-8"
app.get("/yletv_opas/:date", (req, res) => {
  const cmd =
    'curl "https://areena.yle.fi/tv/opas?t=' +
    req.params.date.substring(1) +
    '"';
  // res.send(cmd);
  execShellCommandYleData(cmd, res);
});

// ?t=2021-03-20
app.get("/yleradio_opas/:date", (req, res) => {
  const cmd =
    'curl "https://areena.yle.fi/podcastit/opas?t=' +
    req.params.date.substring(1) +
    '"';
  // res.send(cmd);
  execShellCommandYleData(cmd, res);
});

app.get("/telkku/:channel", (req, res) => {
  const cmd =
    'curl "https://telkussa.fi/RSS/Channel/' + req.params.channel + '"';
  // res.send(cmd);
  execShellCommandXmlData(cmd, res);
});

app.get("/ampparissa/:rest", (req, res) => {
  console.log("ampparissa");
  console.log("query");
  var query_index = req.originalUrl.indexOf("?");
  var query_string =
    query_index >= 0 ? req.originalUrl.slice(query_index + 1) : "";
  const query = query_string;
  console.log(query);
  const cmd =
    'curl "https://www.ampparit.com/' +
    req.params.rest +
    "?" +
    query.toString() +
    '"';
  // res.send(cmd);
  execShellCommandXmlData(cmd, res);
});

app.listen(port, () => {
  console.log(
    `Node server for tv and radio programs listening at http://localhost:${port}`
  );
});
