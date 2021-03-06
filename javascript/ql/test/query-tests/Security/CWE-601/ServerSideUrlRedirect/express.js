var express = require('express');

var app = express();

app.get('/some/path', function(req, res) {
  // BAD: a request parameter is incorporated without validation into a URL redirect
  res.redirect(req.param("target"));
});

app.all(function(req, res) {
  // BAD: a request parameter is incorporated without validation into a URL redirect
  res.header("Location", req.param("target"));
});

app.get('/some/other/path', function(req, res) {
  // GOOD: request parameter is embedded in query string
  res.redirect(someUrl() + "?target=" + req.param("target"));
});

const HASH = "#";
app.get('/some/other/path2', function(req, res) {
  // GOOD: request parameter is embedded in hash
  res.redirect(someUrl() + (HASH + req.param("anchor")));
});

app.get('/some/path', function(req, res) {
  var target = req.param("target");
  if (isLocalURL(target))
    // GOOD: request parameter is sanitized before incorporating it into the redirect
    res.redirect(target);
  else
    // BAD: sanitization doesn't apply here
    res.redirect(target);
  // BAD: sanitization doesn't apply here
  res.redirect(target);
});

function isLocalURL(target) {
  return new RegExp("^/(?![/\\])|^~/").exec(target);
}

app.get('/foo', function(req, res) {
  // BAD: may be a global redirection
  res.redirect((req.param('action') && req.param('action') != "") ? req.param('action') : "/google_contacts")
});

app.get('/bar', function(req, res, next) {
  var handle = req.params[0];
  var url = "/Me/" + handle + "/";
  var qs = querystring.stringify(req.query);
  if (qs.length > 0) url += "?" + qs;
  // GOOD: local redirect
  res.header("Location", url);
});

router.put('/putasync/:retry/:finalState', function (req, res, next) {
  var retry = req.params.retry;
  var finalState = getPascalCase(req.params.finalState);
  var scenario = getLROAsyncScenarioName("putasync", retry, finalState);
  if (scenario) {
    var pollingUri = 'http://localhost:' + utils.getPort() + '/lro/putasync/' + retry + '/' + finalState.toLowerCase() + '/operationResults/200/';
    var headers = {
      'Azure-AsyncOperation': pollingUri,
      // GOOD: localhost redirect
      'Location': pollingUri
    };
    if (retry === 'retry') {
      headers['Retry-After'] = 0;
    }
    res.set(headers).status(200).end('{ "properties": { "provisioningState": "Accepted"}, "id": "100", "name": "foo" }');
  } else {
    utils.send400(res, next, 'Unable to parse "putAsync" scenario with retry: "' + retry + '", finalState: "' + finalState + '"');
  }
});

app.get('/yet/another/path', function(req, res) {
  // BAD: a request parameter is incorporated without validation into a URL redirect
  res.redirect(`${req.param("target")}/foo`);
});

app.get('/hopefully/the/final/path', function(req, res) {
  // GOOD: request parameter is embedded in query string
  res.redirect(`${someUrl()}?target=${req.param("target")}`);
});

app.get('/some/path', function(req, res) {
  let target = req.param("target");

  // GOOD: request parameter is checked against whitelist
  if (SAFE_TARGETS.hasOwnProperty(target))
    res.redirect(target);
  else
    // BAD: check does not apply here
    res.redirect(target);

  // GOOD: request parameter is checked against whitelist
  if (target in SAFE_TARGETS)
    res.redirect(target);

  // BAD: check does not apply here
  res.redirect(target);

  // GOOD: request parameter is checked against whitelist
  if (SAFE_TARGETS[target] != undefined)
    res.redirect(target);

  // GOOD: request parameter is checked against whitelist
  if (void(0) == SAFE_TARGETS[target])
    res.send("Denied!");
  else
    res.redirect(target);
});

app.get('/array/join', function(req, res) {
  // GOOD: request input embedded in query string
  res.redirect(['index.html?section=', req.query.section].join(''));

  // GOOD: request input still embedded in query string
  res.redirect(['index.html?section=', '34'].join('') + '&subsection=' + req.query.subsection);

  // BAD: request input becomes before query string
  res.redirect([req.query.page, '?section=', req.query.section].join(''));
});
