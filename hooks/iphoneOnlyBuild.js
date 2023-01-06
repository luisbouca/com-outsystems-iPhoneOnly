TARGETED_DEVICE_FAMILY = "1,2";

var fs = require('fs');
var path = require('path');

const constants={
    SrcPath : path.join("platforms","ios"),
    pluginID : path.join("com","outsystems","alvierecapturecheck")
}

module.exports = function (context) {
    
    console.log("Start removing iPad!");
    let Q = require("q");
    let deferral = new Q.defer();

    const { ConfigParser } = context.requireCordovaModule("cordova-common");
    const appConfig = new ConfigParser(path.resolve(context.opts.projectRoot, "config.xml"));

    const appName = appConfig.name()

    const fileToChangePath = path.join(constants.SrcPath,appName+"xcodeproj","project.pbxproj");
    let content = fs.readFileSync(fileToChangePath,"utf8");

    const regexWkWebviewChanger = /TARGETED_DEVICE_FAMILY = "1,2"/gm;

    content = content.replace(regexWkWebviewChanger,"TARGETED_DEVICE_FAMILY = \"1\"")

    fs.writeFileSync(fileToChangePath,content);

    console.log("Finished removing iPad!");
    
    deferral.resolve();

    return deferral.promise;
}