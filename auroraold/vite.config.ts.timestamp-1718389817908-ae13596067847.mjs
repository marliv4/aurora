// vite.generated.ts
import path from "path";
import { existsSync as existsSync5, mkdirSync as mkdirSync2, readdirSync as readdirSync2, readFileSync as readFileSync4, writeFileSync as writeFileSync2 } from "fs";
import { createHash } from "crypto";
import * as net from "net";

// target/plugins/application-theme-plugin/theme-handle.js
import { existsSync as existsSync3, readFileSync as readFileSync2 } from "fs";
import { resolve as resolve3 } from "path";

// target/plugins/application-theme-plugin/theme-generator.js
import { globSync as globSync2 } from "file:///C:/Dev/vaurora/aurora/node_modules/glob/dist/mjs/index.js";
import { resolve as resolve2, basename as basename2 } from "path";
import { existsSync as existsSync2, readFileSync, writeFileSync } from "fs";

// target/plugins/application-theme-plugin/theme-copy.js
import { readdirSync, statSync, mkdirSync, existsSync, copyFileSync } from "fs";
import { resolve, basename, relative, extname } from "path";
import { globSync } from "file:///C:/Dev/vaurora/aurora/node_modules/glob/dist/mjs/index.js";
var ignoredFileExtensions = [".css", ".js", ".json"];
function copyThemeResources(themeFolder2, projectStaticAssetsOutputFolder, logger) {
  const staticAssetsThemeFolder = resolve(projectStaticAssetsOutputFolder, "themes", basename(themeFolder2));
  const collection = collectFolders(themeFolder2, logger);
  if (collection.files.length > 0) {
    mkdirSync(staticAssetsThemeFolder, { recursive: true });
    collection.directories.forEach((directory) => {
      const relativeDirectory = relative(themeFolder2, directory);
      const targetDirectory = resolve(staticAssetsThemeFolder, relativeDirectory);
      mkdirSync(targetDirectory, { recursive: true });
    });
    collection.files.forEach((file) => {
      const relativeFile = relative(themeFolder2, file);
      const targetFile = resolve(staticAssetsThemeFolder, relativeFile);
      copyFileIfAbsentOrNewer(file, targetFile, logger);
    });
  }
}
function collectFolders(folderToCopy, logger) {
  const collection = { directories: [], files: [] };
  logger.trace("files in directory", readdirSync(folderToCopy));
  readdirSync(folderToCopy).forEach((file) => {
    const fileToCopy = resolve(folderToCopy, file);
    try {
      if (statSync(fileToCopy).isDirectory()) {
        logger.debug("Going through directory", fileToCopy);
        const result = collectFolders(fileToCopy, logger);
        if (result.files.length > 0) {
          collection.directories.push(fileToCopy);
          logger.debug("Adding directory", fileToCopy);
          collection.directories.push.apply(collection.directories, result.directories);
          collection.files.push.apply(collection.files, result.files);
        }
      } else if (!ignoredFileExtensions.includes(extname(fileToCopy))) {
        logger.debug("Adding file", fileToCopy);
        collection.files.push(fileToCopy);
      }
    } catch (error) {
      handleNoSuchFileError(fileToCopy, error, logger);
    }
  });
  return collection;
}
function copyStaticAssets(themeName, themeProperties, projectStaticAssetsOutputFolder, logger) {
  const assets = themeProperties["assets"];
  if (!assets) {
    logger.debug("no assets to handle no static assets were copied");
    return;
  }
  mkdirSync(projectStaticAssetsOutputFolder, {
    recursive: true
  });
  const missingModules = checkModules(Object.keys(assets));
  if (missingModules.length > 0) {
    throw Error(
      "Missing npm modules '" + missingModules.join("', '") + "' for assets marked in 'theme.json'.\nInstall package(s) by adding a @NpmPackage annotation or install it using 'npm/pnpm/bun i'"
    );
  }
  Object.keys(assets).forEach((module) => {
    const copyRules = assets[module];
    Object.keys(copyRules).forEach((copyRule) => {
      const nodeSources = resolve("node_modules/", module, copyRule);
      const files = globSync(nodeSources, { nodir: true });
      const targetFolder = resolve(projectStaticAssetsOutputFolder, "themes", themeName, copyRules[copyRule]);
      mkdirSync(targetFolder, {
        recursive: true
      });
      files.forEach((file) => {
        const copyTarget = resolve(targetFolder, basename(file));
        copyFileIfAbsentOrNewer(file, copyTarget, logger);
      });
    });
  });
}
function checkModules(modules) {
  const missing = [];
  modules.forEach((module) => {
    if (!existsSync(resolve("node_modules/", module))) {
      missing.push(module);
    }
  });
  return missing;
}
function copyFileIfAbsentOrNewer(fileToCopy, copyTarget, logger) {
  try {
    if (!existsSync(copyTarget) || statSync(copyTarget).mtime < statSync(fileToCopy).mtime) {
      logger.trace("Copying: ", fileToCopy, "=>", copyTarget);
      copyFileSync(fileToCopy, copyTarget);
    }
  } catch (error) {
    handleNoSuchFileError(fileToCopy, error, logger);
  }
}
function handleNoSuchFileError(file, error, logger) {
  if (error.code === "ENOENT") {
    logger.warn("Ignoring not existing file " + file + ". File may have been deleted during theme processing.");
  } else {
    throw error;
  }
}

// target/plugins/application-theme-plugin/theme-generator.js
var themeComponentsFolder = "components";
var documentCssFilename = "document.css";
var stylesCssFilename = "styles.css";
var CSSIMPORT_COMMENT = "CSSImport end";
var headerImport = `import 'construct-style-sheets-polyfill';
`;
function writeThemeFiles(themeFolder2, themeName, themeProperties, options) {
  const productionMode = !options.devMode;
  const useDevServerOrInProductionMode = !options.useDevBundle;
  const outputFolder = options.frontendGeneratedFolder;
  const styles = resolve2(themeFolder2, stylesCssFilename);
  const documentCssFile = resolve2(themeFolder2, documentCssFilename);
  const autoInjectComponents = themeProperties.autoInjectComponents ?? true;
  const globalFilename = "theme-" + themeName + ".global.generated.js";
  const componentsFilename = "theme-" + themeName + ".components.generated.js";
  const themeFilename = "theme-" + themeName + ".generated.js";
  let themeFileContent = headerImport;
  let globalImportContent = "// When this file is imported, global styles are automatically applied\n";
  let componentsFileContent = "";
  var componentsFiles;
  if (autoInjectComponents) {
    componentsFiles = globSync2("*.css", {
      cwd: resolve2(themeFolder2, themeComponentsFolder),
      nodir: true
    });
    if (componentsFiles.length > 0) {
      componentsFileContent += "import { unsafeCSS, registerStyles } from '@vaadin/vaadin-themable-mixin/register-styles';\n";
    }
  }
  if (themeProperties.parent) {
    themeFileContent += `import { applyTheme as applyBaseTheme } from './theme-${themeProperties.parent}.generated.js';
`;
  }
  themeFileContent += `import { injectGlobalCss } from 'Frontend/generated/jar-resources/theme-util.js';
`;
  themeFileContent += `import './${componentsFilename}';
`;
  themeFileContent += `let needsReloadOnChanges = false;
`;
  const imports = [];
  const componentCssImports = [];
  const globalFileContent = [];
  const globalCssCode = [];
  const shadowOnlyCss = [];
  const componentCssCode = [];
  const parentTheme = themeProperties.parent ? "applyBaseTheme(target);\n" : "";
  const parentThemeGlobalImport = themeProperties.parent ? `import './theme-${themeProperties.parent}.global.generated.js';
` : "";
  const themeIdentifier = "_vaadintheme_" + themeName + "_";
  const lumoCssFlag = "_vaadinthemelumoimports_";
  const globalCssFlag = themeIdentifier + "globalCss";
  const componentCssFlag = themeIdentifier + "componentCss";
  if (!existsSync2(styles)) {
    if (productionMode) {
      throw new Error(`styles.css file is missing and is needed for '${themeName}' in folder '${themeFolder2}'`);
    }
    writeFileSync(
      styles,
      "/* Import your application global css files here or add the styles directly to this file */",
      "utf8"
    );
  }
  let filename = basename2(styles);
  let variable = camelCase(filename);
  const lumoImports = themeProperties.lumoImports || ["color", "typography"];
  if (lumoImports) {
    lumoImports.forEach((lumoImport) => {
      imports.push(`import { ${lumoImport} } from '@vaadin/vaadin-lumo-styles/${lumoImport}.js';
`);
      if (lumoImport === "utility" || lumoImport === "badge" || lumoImport === "typography" || lumoImport === "color") {
        globalFileContent.push(`import '@vaadin/vaadin-lumo-styles/${lumoImport}-global.js';
`);
      }
    });
    lumoImports.forEach((lumoImport) => {
      shadowOnlyCss.push(`removers.push(injectGlobalCss(${lumoImport}.cssText, '', target, true));
`);
    });
  }
  if (useDevServerOrInProductionMode) {
    globalFileContent.push(parentThemeGlobalImport);
    globalFileContent.push(`import 'themes/${themeName}/${filename}';
`);
    imports.push(`import ${variable} from 'themes/${themeName}/${filename}?inline';
`);
    shadowOnlyCss.push(`removers.push(injectGlobalCss(${variable}.toString(), '', target));
    `);
  }
  if (existsSync2(documentCssFile)) {
    filename = basename2(documentCssFile);
    variable = camelCase(filename);
    if (useDevServerOrInProductionMode) {
      globalFileContent.push(`import 'themes/${themeName}/${filename}';
`);
      imports.push(`import ${variable} from 'themes/${themeName}/${filename}?inline';
`);
      shadowOnlyCss.push(`removers.push(injectGlobalCss(${variable}.toString(),'', document));
    `);
    }
  }
  let i = 0;
  if (themeProperties.documentCss) {
    const missingModules = checkModules(themeProperties.documentCss);
    if (missingModules.length > 0) {
      throw Error(
        "Missing npm modules or files '" + missingModules.join("', '") + "' for documentCss marked in 'theme.json'.\nInstall or update package(s) by adding a @NpmPackage annotation or install it using 'npm/pnpm/bun i'"
      );
    }
    themeProperties.documentCss.forEach((cssImport) => {
      const variable2 = "module" + i++;
      imports.push(`import ${variable2} from '${cssImport}?inline';
`);
      globalCssCode.push(`if(target !== document) {
        removers.push(injectGlobalCss(${variable2}.toString(), '', target));
    }
    `);
      globalCssCode.push(
        `removers.push(injectGlobalCss(${variable2}.toString(), '${CSSIMPORT_COMMENT}', document));
    `
      );
    });
  }
  if (themeProperties.importCss) {
    const missingModules = checkModules(themeProperties.importCss);
    if (missingModules.length > 0) {
      throw Error(
        "Missing npm modules or files '" + missingModules.join("', '") + "' for importCss marked in 'theme.json'.\nInstall or update package(s) by adding a @NpmPackage annotation or install it using 'npm/pnpm/bun i'"
      );
    }
    themeProperties.importCss.forEach((cssPath) => {
      const variable2 = "module" + i++;
      globalFileContent.push(`import '${cssPath}';
`);
      imports.push(`import ${variable2} from '${cssPath}?inline';
`);
      shadowOnlyCss.push(`removers.push(injectGlobalCss(${variable2}.toString(), '${CSSIMPORT_COMMENT}', target));
`);
    });
  }
  if (autoInjectComponents) {
    componentsFiles.forEach((componentCss) => {
      const filename2 = basename2(componentCss);
      const tag = filename2.replace(".css", "");
      const variable2 = camelCase(filename2);
      componentCssImports.push(
        `import ${variable2} from 'themes/${themeName}/${themeComponentsFolder}/${filename2}?inline';
`
      );
      const componentString = `registerStyles(
        '${tag}',
        unsafeCSS(${variable2}.toString())
      );
      `;
      componentCssCode.push(componentString);
    });
  }
  themeFileContent += imports.join("");
  const themeFileApply = `
  let themeRemovers = new WeakMap();
  let targets = [];

  export const applyTheme = (target) => {
    const removers = [];
    if (target !== document) {
      ${shadowOnlyCss.join("")}
    }
    ${parentTheme}
    ${globalCssCode.join("")}

    if (import.meta.hot) {
      targets.push(new WeakRef(target));
      themeRemovers.set(target, removers);
    }

  }
  
`;
  componentsFileContent += `
${componentCssImports.join("")}

if (!document['${componentCssFlag}']) {
  ${componentCssCode.join("")}
  document['${componentCssFlag}'] = true;
}

if (import.meta.hot) {
  import.meta.hot.accept((module) => {
    window.location.reload();
  });
}

`;
  themeFileContent += themeFileApply;
  themeFileContent += `
if (import.meta.hot) {
  import.meta.hot.accept((module) => {

    if (needsReloadOnChanges) {
      window.location.reload();
    } else {
      targets.forEach(targetRef => {
        const target = targetRef.deref();
        if (target) {
          themeRemovers.get(target).forEach(remover => remover())
          module.applyTheme(target);
        }
      })
    }
  });

  import.meta.hot.on('vite:afterUpdate', (update) => {
    document.dispatchEvent(new CustomEvent('vaadin-theme-updated', { detail: update }));
  });
}

`;
  globalImportContent += `
${globalFileContent.join("")}
`;
  writeIfChanged(resolve2(outputFolder, globalFilename), globalImportContent);
  writeIfChanged(resolve2(outputFolder, themeFilename), themeFileContent);
  writeIfChanged(resolve2(outputFolder, componentsFilename), componentsFileContent);
}
function writeIfChanged(file, data) {
  if (!existsSync2(file) || readFileSync(file, { encoding: "utf-8" }) !== data) {
    writeFileSync(file, data);
  }
}
function camelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, "").replace(/\.|\-/g, "");
}

// target/plugins/application-theme-plugin/theme-handle.js
var nameRegex = /theme-(.*)\.generated\.js/;
var prevThemeName = void 0;
var firstThemeName = void 0;
function processThemeResources(options, logger) {
  const themeName = extractThemeName(options.frontendGeneratedFolder);
  if (themeName) {
    if (!prevThemeName && !firstThemeName) {
      firstThemeName = themeName;
    } else if (prevThemeName && prevThemeName !== themeName && firstThemeName !== themeName || !prevThemeName && firstThemeName !== themeName) {
      const warning = `Attention: Active theme is switched to '${themeName}'.`;
      const description = `
      Note that adding new style sheet files to '/themes/${themeName}/components', 
      may not be taken into effect until the next application restart.
      Changes to already existing style sheet files are being reloaded as before.`;
      logger.warn("*******************************************************************");
      logger.warn(warning);
      logger.warn(description);
      logger.warn("*******************************************************************");
    }
    prevThemeName = themeName;
    findThemeFolderAndHandleTheme(themeName, options, logger);
  } else {
    prevThemeName = void 0;
    logger.debug("Skipping Vaadin application theme handling.");
    logger.trace("Most likely no @Theme annotation for application or only themeClass used.");
  }
}
function findThemeFolderAndHandleTheme(themeName, options, logger) {
  let themeFound = false;
  for (let i = 0; i < options.themeProjectFolders.length; i++) {
    const themeProjectFolder = options.themeProjectFolders[i];
    if (existsSync3(themeProjectFolder)) {
      logger.debug("Searching themes folder '" + themeProjectFolder + "' for theme '" + themeName + "'");
      const handled = handleThemes(themeName, themeProjectFolder, options, logger);
      if (handled) {
        if (themeFound) {
          throw new Error(
            "Found theme files in '" + themeProjectFolder + "' and '" + themeFound + "'. Theme should only be available in one folder"
          );
        }
        logger.debug("Found theme files from '" + themeProjectFolder + "'");
        themeFound = themeProjectFolder;
      }
    }
  }
  if (existsSync3(options.themeResourceFolder)) {
    if (themeFound && existsSync3(resolve3(options.themeResourceFolder, themeName))) {
      throw new Error(
        "Theme '" + themeName + `'should not exist inside a jar and in the project at the same time
Extending another theme is possible by adding { "parent": "my-parent-theme" } entry to the theme.json file inside your theme folder.`
      );
    }
    logger.debug(
      "Searching theme jar resource folder '" + options.themeResourceFolder + "' for theme '" + themeName + "'"
    );
    handleThemes(themeName, options.themeResourceFolder, options, logger);
    themeFound = true;
  }
  return themeFound;
}
function handleThemes(themeName, themesFolder, options, logger) {
  const themeFolder2 = resolve3(themesFolder, themeName);
  if (existsSync3(themeFolder2)) {
    logger.debug("Found theme ", themeName, " in folder ", themeFolder2);
    const themeProperties = getThemeProperties(themeFolder2);
    if (themeProperties.parent) {
      const found = findThemeFolderAndHandleTheme(themeProperties.parent, options, logger);
      if (!found) {
        throw new Error(
          "Could not locate files for defined parent theme '" + themeProperties.parent + "'.\nPlease verify that dependency is added or theme folder exists."
        );
      }
    }
    copyStaticAssets(themeName, themeProperties, options.projectStaticAssetsOutputFolder, logger);
    copyThemeResources(themeFolder2, options.projectStaticAssetsOutputFolder, logger);
    writeThemeFiles(themeFolder2, themeName, themeProperties, options);
    return true;
  }
  return false;
}
function getThemeProperties(themeFolder2) {
  const themePropertyFile = resolve3(themeFolder2, "theme.json");
  if (!existsSync3(themePropertyFile)) {
    return {};
  }
  const themePropertyFileAsString = readFileSync2(themePropertyFile);
  if (themePropertyFileAsString.length === 0) {
    return {};
  }
  return JSON.parse(themePropertyFileAsString);
}
function extractThemeName(frontendGeneratedFolder) {
  if (!frontendGeneratedFolder) {
    throw new Error(
      "Couldn't extract theme name from 'theme.js', because the path to folder containing this file is empty. Please set the a correct folder path in ApplicationThemePlugin constructor parameters."
    );
  }
  const generatedThemeFile = resolve3(frontendGeneratedFolder, "theme.js");
  if (existsSync3(generatedThemeFile)) {
    const themeName = nameRegex.exec(readFileSync2(generatedThemeFile, { encoding: "utf8" }))[1];
    if (!themeName) {
      throw new Error("Couldn't parse theme name from '" + generatedThemeFile + "'.");
    }
    return themeName;
  } else {
    return "";
  }
}

// target/plugins/theme-loader/theme-loader-utils.js
import { existsSync as existsSync4, readFileSync as readFileSync3 } from "fs";
import { resolve as resolve4, basename as basename3 } from "path";
import { globSync as globSync3 } from "file:///C:/Dev/vaurora/aurora/node_modules/glob/dist/mjs/index.js";
var urlMatcher = /(url\(\s*)(\'|\")?(\.\/|\.\.\/)(\S*)(\2\s*\))/g;
function assetsContains(fileUrl, themeFolder2, logger) {
  const themeProperties = getThemeProperties2(themeFolder2);
  if (!themeProperties) {
    logger.debug("No theme properties found.");
    return false;
  }
  const assets = themeProperties["assets"];
  if (!assets) {
    logger.debug("No defined assets in theme properties");
    return false;
  }
  for (let module of Object.keys(assets)) {
    const copyRules = assets[module];
    for (let copyRule of Object.keys(copyRules)) {
      if (fileUrl.startsWith(copyRules[copyRule])) {
        const targetFile = fileUrl.replace(copyRules[copyRule], "");
        const files = globSync3(resolve4("node_modules/", module, copyRule), { nodir: true });
        for (let file of files) {
          if (file.endsWith(targetFile))
            return true;
        }
      }
    }
  }
  return false;
}
function getThemeProperties2(themeFolder2) {
  const themePropertyFile = resolve4(themeFolder2, "theme.json");
  if (!existsSync4(themePropertyFile)) {
    return {};
  }
  const themePropertyFileAsString = readFileSync3(themePropertyFile);
  if (themePropertyFileAsString.length === 0) {
    return {};
  }
  return JSON.parse(themePropertyFileAsString);
}
function rewriteCssUrls(source, handledResourceFolder, themeFolder2, logger, options) {
  source = source.replace(urlMatcher, function(match, url, quoteMark, replace2, fileUrl, endString) {
    let absolutePath = resolve4(handledResourceFolder, replace2, fileUrl);
    const existingThemeResource = absolutePath.startsWith(themeFolder2) && existsSync4(absolutePath);
    if (existingThemeResource || assetsContains(fileUrl, themeFolder2, logger)) {
      const replacement = options.devMode ? "./" : "../static/";
      const skipLoader = existingThemeResource ? "" : replacement;
      const frontendThemeFolder = skipLoader + "themes/" + basename3(themeFolder2);
      logger.debug(
        "Updating url for file",
        "'" + replace2 + fileUrl + "'",
        "to use",
        "'" + frontendThemeFolder + "/" + fileUrl + "'"
      );
      const pathResolved = absolutePath.substring(themeFolder2.length).replace(/\\/g, "/");
      return url + (quoteMark ?? "") + frontendThemeFolder + pathResolved + endString;
    } else if (options.devMode) {
      logger.log("No rewrite for '", match, "' as the file was not found.");
    } else {
      return url + (quoteMark ?? "") + "../../" + fileUrl + endString;
    }
    return match;
  });
  return source;
}

// target/vaadin-dev-server-settings.json
var vaadin_dev_server_settings_default = {
  frontendFolder: "C:/Dev/vaurora/aurora/./frontend",
  themeFolder: "themes",
  themeResourceFolder: "C:/Dev/vaurora/aurora/./frontend/generated/jar-resources",
  staticOutput: "C:/Dev/vaurora/aurora/target/classes/META-INF/VAADIN/webapp/VAADIN/static",
  generatedFolder: "generated",
  statsOutput: "C:\\Dev\\vaurora\\aurora\\target\\classes\\META-INF\\VAADIN\\config",
  frontendBundleOutput: "C:\\Dev\\vaurora\\aurora\\target\\classes\\META-INF\\VAADIN\\webapp",
  devBundleOutput: "C:/Dev/vaurora/aurora/target/dev-bundle/webapp",
  devBundleStatsOutput: "C:/Dev/vaurora/aurora/target/dev-bundle/config",
  jarResourcesFolder: "C:/Dev/vaurora/aurora/./frontend/generated/jar-resources",
  themeName: "",
  clientServiceWorkerSource: "C:\\Dev\\vaurora\\aurora\\target\\sw.ts",
  pwaEnabled: false,
  offlineEnabled: false,
  offlinePath: "'offline.html'"
};

// vite.generated.ts
import {
  defineConfig,
  mergeConfig
} from "file:///C:/Dev/vaurora/aurora/node_modules/vite/dist/node/index.js";
import { getManifest } from "file:///C:/Dev/vaurora/aurora/node_modules/workbox-build/build/index.js";
import * as rollup from "file:///C:/Dev/vaurora/aurora/node_modules/rollup/dist/es/rollup.js";
import brotli from "file:///C:/Dev/vaurora/aurora/node_modules/rollup-plugin-brotli/lib/index.cjs.js";
import replace from "file:///C:/Dev/vaurora/aurora/node_modules/@rollup/plugin-replace/dist/es/index.js";
import checker from "file:///C:/Dev/vaurora/aurora/node_modules/vite-plugin-checker/dist/esm/main.js";

// target/plugins/rollup-plugin-postcss-lit-custom/rollup-plugin-postcss-lit.js
import { createFilter } from "file:///C:/Dev/vaurora/aurora/node_modules/@rollup/pluginutils/dist/es/index.js";
import transformAst from "file:///C:/Dev/vaurora/aurora/node_modules/transform-ast/index.js";
var assetUrlRE = /__VITE_ASSET__([\w$]+)__(?:\$_(.*?)__)?/g;
var escape = (str) => str.replace(assetUrlRE, '${unsafeCSSTag("__VITE_ASSET__$1__$2")}').replace(/`/g, "\\`").replace(/\\(?!`)/g, "\\\\");
function postcssLit(options = {}) {
  const defaultOptions = {
    include: "**/*.{css,sss,pcss,styl,stylus,sass,scss,less}",
    exclude: null,
    importPackage: "lit"
  };
  const opts = { ...defaultOptions, ...options };
  const filter = createFilter(opts.include, opts.exclude);
  return {
    name: "postcss-lit",
    enforce: "post",
    transform(code, id) {
      if (!filter(id))
        return;
      const ast = this.parse(code, {});
      let defaultExportName;
      let isDeclarationLiteral = false;
      const magicString = transformAst(code, { ast }, (node) => {
        if (node.type === "ExportDefaultDeclaration") {
          defaultExportName = node.declaration.name;
          isDeclarationLiteral = node.declaration.type === "Literal";
        }
      });
      if (!defaultExportName && !isDeclarationLiteral) {
        return;
      }
      magicString.walk((node) => {
        if (defaultExportName && node.type === "VariableDeclaration") {
          const exportedVar = node.declarations.find((d) => d.id.name === defaultExportName);
          if (exportedVar) {
            exportedVar.init.edit.update(`cssTag\`${escape(exportedVar.init.value)}\``);
          }
        }
        if (isDeclarationLiteral && node.type === "ExportDefaultDeclaration") {
          node.declaration.edit.update(`cssTag\`${escape(node.declaration.value)}\``);
        }
      });
      magicString.prepend(`import {css as cssTag, unsafeCSS as unsafeCSSTag} from '${opts.importPackage}';
`);
      return {
        code: magicString.toString(),
        map: magicString.generateMap({
          hires: true
        })
      };
    }
  };
}

// vite.generated.ts
import { createRequire } from "module";
import { visualizer } from "file:///C:/Dev/vaurora/aurora/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "C:\\Dev\\vaurora\\aurora";
var __vite_injected_original_import_meta_url = "file:///C:/Dev/vaurora/aurora/vite.generated.ts";
var require2 = createRequire(__vite_injected_original_import_meta_url);
var appShellUrl = ".";
var frontendFolder = path.resolve(__vite_injected_original_dirname, vaadin_dev_server_settings_default.frontendFolder);
var themeFolder = path.resolve(frontendFolder, vaadin_dev_server_settings_default.themeFolder);
var frontendBundleFolder = path.resolve(__vite_injected_original_dirname, vaadin_dev_server_settings_default.frontendBundleOutput);
var devBundleFolder = path.resolve(__vite_injected_original_dirname, vaadin_dev_server_settings_default.devBundleOutput);
var devBundle = !!process.env.devBundle;
var jarResourcesFolder = path.resolve(__vite_injected_original_dirname, vaadin_dev_server_settings_default.jarResourcesFolder);
var themeResourceFolder = path.resolve(__vite_injected_original_dirname, vaadin_dev_server_settings_default.themeResourceFolder);
var projectPackageJsonFile = path.resolve(__vite_injected_original_dirname, "package.json");
var buildOutputFolder = devBundle ? devBundleFolder : frontendBundleFolder;
var statsFolder = path.resolve(__vite_injected_original_dirname, devBundle ? vaadin_dev_server_settings_default.devBundleStatsOutput : vaadin_dev_server_settings_default.statsOutput);
var statsFile = path.resolve(statsFolder, "stats.json");
var bundleSizeFile = path.resolve(statsFolder, "bundle-size.html");
var nodeModulesFolder = path.resolve(__vite_injected_original_dirname, "node_modules");
var webComponentTags = "";
var projectIndexHtml = path.resolve(frontendFolder, "index.html");
var projectStaticAssetsFolders = [
  path.resolve(__vite_injected_original_dirname, "src", "main", "resources", "META-INF", "resources"),
  path.resolve(__vite_injected_original_dirname, "src", "main", "resources", "static"),
  frontendFolder
];
var themeProjectFolders = projectStaticAssetsFolders.map((folder) => path.resolve(folder, vaadin_dev_server_settings_default.themeFolder));
var themeOptions = {
  devMode: false,
  useDevBundle: devBundle,
  // The following matches folder 'frontend/generated/themes/'
  // (not 'frontend/themes') for theme in JAR that is copied there
  themeResourceFolder: path.resolve(themeResourceFolder, vaadin_dev_server_settings_default.themeFolder),
  themeProjectFolders,
  projectStaticAssetsOutputFolder: devBundle ? path.resolve(devBundleFolder, "../assets") : path.resolve(__vite_injected_original_dirname, vaadin_dev_server_settings_default.staticOutput),
  frontendGeneratedFolder: path.resolve(frontendFolder, vaadin_dev_server_settings_default.generatedFolder)
};
var hasExportedWebComponents = existsSync5(path.resolve(frontendFolder, "web-component.html"));
console.trace = () => {
};
console.debug = () => {
};
function injectManifestToSWPlugin() {
  const rewriteManifestIndexHtmlUrl = (manifest) => {
    const indexEntry = manifest.find((entry) => entry.url === "index.html");
    if (indexEntry) {
      indexEntry.url = appShellUrl;
    }
    return { manifest, warnings: [] };
  };
  return {
    name: "vaadin:inject-manifest-to-sw",
    async transform(code, id) {
      if (/sw\.(ts|js)$/.test(id)) {
        const { manifestEntries } = await getManifest({
          globDirectory: buildOutputFolder,
          globPatterns: ["**/*"],
          globIgnores: ["**/*.br"],
          manifestTransforms: [rewriteManifestIndexHtmlUrl],
          maximumFileSizeToCacheInBytes: 100 * 1024 * 1024
          // 100mb,
        });
        return code.replace("self.__WB_MANIFEST", JSON.stringify(manifestEntries));
      }
    }
  };
}
function buildSWPlugin(opts) {
  let config;
  const devMode = opts.devMode;
  const swObj = {};
  async function build(action, additionalPlugins = []) {
    const includedPluginNames = [
      "vite:esbuild",
      "rollup-plugin-dynamic-import-variables",
      "vite:esbuild-transpile",
      "vite:terser"
    ];
    const plugins = config.plugins.filter((p) => {
      return includedPluginNames.includes(p.name);
    });
    const resolver = config.createResolver();
    const resolvePlugin = {
      name: "resolver",
      resolveId(source, importer, _options) {
        return resolver(source, importer);
      }
    };
    plugins.unshift(resolvePlugin);
    plugins.push(
      replace({
        values: {
          "process.env.NODE_ENV": JSON.stringify(config.mode),
          ...config.define
        },
        preventAssignment: true
      })
    );
    if (additionalPlugins) {
      plugins.push(...additionalPlugins);
    }
    const bundle = await rollup.rollup({
      input: path.resolve(vaadin_dev_server_settings_default.clientServiceWorkerSource),
      plugins
    });
    try {
      return await bundle[action]({
        file: path.resolve(buildOutputFolder, "sw.js"),
        format: "es",
        exports: "none",
        sourcemap: config.command === "serve" || config.build.sourcemap,
        inlineDynamicImports: true
      });
    } finally {
      await bundle.close();
    }
  }
  return {
    name: "vaadin:build-sw",
    enforce: "post",
    async configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    async buildStart() {
      if (devMode) {
        const { output } = await build("generate");
        swObj.code = output[0].code;
        swObj.map = output[0].map;
      }
    },
    async load(id) {
      if (id.endsWith("sw.js")) {
        return "";
      }
    },
    async transform(_code, id) {
      if (id.endsWith("sw.js")) {
        return swObj;
      }
    },
    async closeBundle() {
      if (!devMode) {
        await build("write", [injectManifestToSWPlugin(), brotli()]);
      }
    }
  };
}
function statsExtracterPlugin() {
  function collectThemeJsonsInFrontend(themeJsonContents, themeName) {
    const themeJson = path.resolve(frontendFolder, vaadin_dev_server_settings_default.themeFolder, themeName, "theme.json");
    if (existsSync5(themeJson)) {
      const themeJsonContent = readFileSync4(themeJson, { encoding: "utf-8" }).replace(/\r\n/g, "\n");
      themeJsonContents[themeName] = themeJsonContent;
      const themeJsonObject = JSON.parse(themeJsonContent);
      if (themeJsonObject.parent) {
        collectThemeJsonsInFrontend(themeJsonContents, themeJsonObject.parent);
      }
    }
  }
  return {
    name: "vaadin:stats",
    enforce: "post",
    async writeBundle(options, bundle) {
      const modules = Object.values(bundle).flatMap((b) => b.modules ? Object.keys(b.modules) : []);
      const nodeModulesFolders = modules.map((id) => id.replace(/\\/g, "/")).filter((id) => id.startsWith(nodeModulesFolder.replace(/\\/g, "/"))).map((id) => id.substring(nodeModulesFolder.length + 1));
      const npmModules = nodeModulesFolders.map((id) => id.replace(/\\/g, "/")).map((id) => {
        const parts = id.split("/");
        if (id.startsWith("@")) {
          return parts[0] + "/" + parts[1];
        } else {
          return parts[0];
        }
      }).sort().filter((value, index, self) => self.indexOf(value) === index);
      const npmModuleAndVersion = Object.fromEntries(npmModules.map((module) => [module, getVersion(module)]));
      const cvdls = Object.fromEntries(
        npmModules.filter((module) => getCvdlName(module) != null).map((module) => [module, { name: getCvdlName(module), version: getVersion(module) }])
      );
      mkdirSync2(path.dirname(statsFile), { recursive: true });
      const projectPackageJson = JSON.parse(readFileSync4(projectPackageJsonFile, { encoding: "utf-8" }));
      const entryScripts = Object.values(bundle).filter((bundle2) => bundle2.isEntry).map((bundle2) => bundle2.fileName);
      const generatedIndexHtml = path.resolve(buildOutputFolder, "index.html");
      const customIndexData = readFileSync4(projectIndexHtml, { encoding: "utf-8" });
      const generatedIndexData = readFileSync4(generatedIndexHtml, {
        encoding: "utf-8"
      });
      const customIndexRows = new Set(customIndexData.split(/[\r\n]/).filter((row) => row.trim() !== ""));
      const generatedIndexRows = generatedIndexData.split(/[\r\n]/).filter((row) => row.trim() !== "");
      const rowsGenerated = [];
      generatedIndexRows.forEach((row) => {
        if (!customIndexRows.has(row)) {
          rowsGenerated.push(row);
        }
      });
      const parseImports = (filename, result) => {
        const content = readFileSync4(filename, { encoding: "utf-8" });
        const lines = content.split("\n");
        const staticImports = lines.filter((line) => line.startsWith("import ")).map((line) => line.substring(line.indexOf("'") + 1, line.lastIndexOf("'"))).map((line) => line.includes("?") ? line.substring(0, line.lastIndexOf("?")) : line);
        const dynamicImports = lines.filter((line) => line.includes("import(")).map((line) => line.replace(/.*import\(/, "")).map((line) => line.split(/'/)[1]).map((line) => line.includes("?") ? line.substring(0, line.lastIndexOf("?")) : line);
        staticImports.forEach((staticImport) => result.add(staticImport));
        dynamicImports.map((dynamicImport) => {
          const importedFile = path.resolve(path.dirname(filename), dynamicImport);
          parseImports(importedFile, result);
        });
      };
      const generatedImportsSet = /* @__PURE__ */ new Set();
      parseImports(
        path.resolve(themeOptions.frontendGeneratedFolder, "flow", "generated-flow-imports.js"),
        generatedImportsSet
      );
      const generatedImports = Array.from(generatedImportsSet).sort();
      const frontendFiles = {};
      const projectFileExtensions = [".js", ".js.map", ".ts", ".ts.map", ".tsx", ".tsx.map", ".css", ".css.map"];
      const isThemeComponentsResource = (id) => id.startsWith(themeOptions.frontendGeneratedFolder.replace(/\\/g, "/")) && id.match(/.*\/jar-resources\/themes\/[^\/]+\/components\//);
      const isGeneratedWebComponentResource = (id) => id.startsWith(themeOptions.frontendGeneratedFolder.replace(/\\/g, "/")) && id.match(/.*\/flow\/web-components\//);
      const isFrontendResourceCollected = (id) => !id.startsWith(themeOptions.frontendGeneratedFolder.replace(/\\/g, "/")) || isThemeComponentsResource(id) || isGeneratedWebComponentResource(id);
      modules.map((id) => id.replace(/\\/g, "/")).filter((id) => id.startsWith(frontendFolder.replace(/\\/g, "/"))).filter(isFrontendResourceCollected).map((id) => id.substring(frontendFolder.length + 1)).map((line) => line.includes("?") ? line.substring(0, line.lastIndexOf("?")) : line).forEach((line) => {
        const filePath = path.resolve(frontendFolder, line);
        if (projectFileExtensions.includes(path.extname(filePath))) {
          const fileBuffer = readFileSync4(filePath, { encoding: "utf-8" }).replace(/\r\n/g, "\n");
          frontendFiles[line] = createHash("sha256").update(fileBuffer, "utf8").digest("hex");
        }
      });
      generatedImports.filter((line) => line.includes("generated/jar-resources")).forEach((line) => {
        let filename = line.substring(line.indexOf("generated"));
        const fileBuffer = readFileSync4(path.resolve(frontendFolder, filename), { encoding: "utf-8" }).replace(
          /\r\n/g,
          "\n"
        );
        const hash = createHash("sha256").update(fileBuffer, "utf8").digest("hex");
        const fileKey = line.substring(line.indexOf("jar-resources/") + 14);
        frontendFiles[fileKey] = hash;
      });
      let frontendFolderAlias = "Frontend";
      generatedImports.filter((line) => line.startsWith(frontendFolderAlias + "/")).filter((line) => !line.startsWith(frontendFolderAlias + "/generated/")).filter((line) => !line.startsWith(frontendFolderAlias + "/themes/")).map((line) => line.substring(frontendFolderAlias.length + 1)).filter((line) => !frontendFiles[line]).forEach((line) => {
        const filePath = path.resolve(frontendFolder, line);
        if (projectFileExtensions.includes(path.extname(filePath)) && existsSync5(filePath)) {
          const fileBuffer = readFileSync4(filePath, { encoding: "utf-8" }).replace(/\r\n/g, "\n");
          frontendFiles[line] = createHash("sha256").update(fileBuffer, "utf8").digest("hex");
        }
      });
      if (existsSync5(path.resolve(frontendFolder, "index.ts"))) {
        const fileBuffer = readFileSync4(path.resolve(frontendFolder, "index.ts"), { encoding: "utf-8" }).replace(
          /\r\n/g,
          "\n"
        );
        frontendFiles[`index.ts`] = createHash("sha256").update(fileBuffer, "utf8").digest("hex");
      }
      const themeJsonContents = {};
      const themesFolder = path.resolve(jarResourcesFolder, "themes");
      if (existsSync5(themesFolder)) {
        readdirSync2(themesFolder).forEach((themeFolder2) => {
          const themeJson = path.resolve(themesFolder, themeFolder2, "theme.json");
          if (existsSync5(themeJson)) {
            themeJsonContents[path.basename(themeFolder2)] = readFileSync4(themeJson, { encoding: "utf-8" }).replace(
              /\r\n/g,
              "\n"
            );
          }
        });
      }
      collectThemeJsonsInFrontend(themeJsonContents, vaadin_dev_server_settings_default.themeName);
      let webComponents = [];
      if (webComponentTags) {
        webComponents = webComponentTags.split(";");
      }
      const stats = {
        packageJsonDependencies: projectPackageJson.dependencies,
        npmModules: npmModuleAndVersion,
        bundleImports: generatedImports,
        frontendHashes: frontendFiles,
        themeJsonContents,
        entryScripts,
        webComponents,
        cvdlModules: cvdls,
        packageJsonHash: projectPackageJson?.vaadin?.hash,
        indexHtmlGenerated: rowsGenerated
      };
      writeFileSync2(statsFile, JSON.stringify(stats, null, 1));
    }
  };
}
function vaadinBundlesPlugin() {
  const disabledMessage = "Vaadin component dependency bundles are disabled.";
  const modulesDirectory = nodeModulesFolder.replace(/\\/g, "/");
  let vaadinBundleJson;
  function parseModuleId(id) {
    const [scope, scopedPackageName] = id.split("/", 3);
    const packageName = scope.startsWith("@") ? `${scope}/${scopedPackageName}` : scope;
    const modulePath = `.${id.substring(packageName.length)}`;
    return {
      packageName,
      modulePath
    };
  }
  function getExports(id) {
    const { packageName, modulePath } = parseModuleId(id);
    const packageInfo = vaadinBundleJson.packages[packageName];
    if (!packageInfo)
      return;
    const exposeInfo = packageInfo.exposes[modulePath];
    if (!exposeInfo)
      return;
    const exportsSet = /* @__PURE__ */ new Set();
    for (const e of exposeInfo.exports) {
      if (typeof e === "string") {
        exportsSet.add(e);
      } else {
        const { namespace, source } = e;
        if (namespace) {
          exportsSet.add(namespace);
        } else {
          const sourceExports = getExports(source);
          if (sourceExports) {
            sourceExports.forEach((e2) => exportsSet.add(e2));
          }
        }
      }
    }
    return Array.from(exportsSet);
  }
  function getExportBinding(binding) {
    return binding === "default" ? "_default as default" : binding;
  }
  function getImportAssigment(binding) {
    return binding === "default" ? "default: _default" : binding;
  }
  return {
    name: "vaadin:bundles",
    enforce: "pre",
    apply(config, { command }) {
      if (command !== "serve")
        return false;
      try {
        const vaadinBundleJsonPath = require2.resolve("@vaadin/bundles/vaadin-bundle.json");
        vaadinBundleJson = JSON.parse(readFileSync4(vaadinBundleJsonPath, { encoding: "utf8" }));
      } catch (e) {
        if (typeof e === "object" && e.code === "MODULE_NOT_FOUND") {
          vaadinBundleJson = { packages: {} };
          console.info(`@vaadin/bundles npm package is not found, ${disabledMessage}`);
          return false;
        } else {
          throw e;
        }
      }
      const versionMismatches = [];
      for (const [name, packageInfo] of Object.entries(vaadinBundleJson.packages)) {
        let installedVersion = void 0;
        try {
          const { version: bundledVersion } = packageInfo;
          const installedPackageJsonFile = path.resolve(modulesDirectory, name, "package.json");
          const packageJson = JSON.parse(readFileSync4(installedPackageJsonFile, { encoding: "utf8" }));
          installedVersion = packageJson.version;
          if (installedVersion && installedVersion !== bundledVersion) {
            versionMismatches.push({
              name,
              bundledVersion,
              installedVersion
            });
          }
        } catch (_) {
        }
      }
      if (versionMismatches.length) {
        console.info(`@vaadin/bundles has version mismatches with installed packages, ${disabledMessage}`);
        console.info(`Packages with version mismatches: ${JSON.stringify(versionMismatches, void 0, 2)}`);
        vaadinBundleJson = { packages: {} };
        return false;
      }
      return true;
    },
    async config(config) {
      return mergeConfig(
        {
          optimizeDeps: {
            exclude: [
              // Vaadin bundle
              "@vaadin/bundles",
              ...Object.keys(vaadinBundleJson.packages),
              "@vaadin/vaadin-material-styles"
            ]
          }
        },
        config
      );
    },
    load(rawId) {
      const [path2, params] = rawId.split("?");
      if (!path2.startsWith(modulesDirectory))
        return;
      const id = path2.substring(modulesDirectory.length + 1);
      const bindings = getExports(id);
      if (bindings === void 0)
        return;
      const cacheSuffix = params ? `?${params}` : "";
      const bundlePath = `@vaadin/bundles/vaadin.js${cacheSuffix}`;
      return `import { init as VaadinBundleInit, get as VaadinBundleGet } from '${bundlePath}';
await VaadinBundleInit('default');
const { ${bindings.map(getImportAssigment).join(", ")} } = (await VaadinBundleGet('./node_modules/${id}'))();
export { ${bindings.map(getExportBinding).join(", ")} };`;
    }
  };
}
function themePlugin(opts) {
  const fullThemeOptions = { ...themeOptions, devMode: opts.devMode };
  return {
    name: "vaadin:theme",
    config() {
      processThemeResources(fullThemeOptions, console);
    },
    configureServer(server) {
      function handleThemeFileCreateDelete(themeFile, stats) {
        if (themeFile.startsWith(themeFolder)) {
          const changed = path.relative(themeFolder, themeFile);
          console.debug("Theme file " + (!!stats ? "created" : "deleted"), changed);
          processThemeResources(fullThemeOptions, console);
        }
      }
      server.watcher.on("add", handleThemeFileCreateDelete);
      server.watcher.on("unlink", handleThemeFileCreateDelete);
    },
    handleHotUpdate(context) {
      const contextPath = path.resolve(context.file);
      const themePath = path.resolve(themeFolder);
      if (contextPath.startsWith(themePath)) {
        const changed = path.relative(themePath, contextPath);
        console.debug("Theme file changed", changed);
        if (changed.startsWith(vaadin_dev_server_settings_default.themeName)) {
          processThemeResources(fullThemeOptions, console);
        }
      }
    },
    async resolveId(id, importer) {
      if (path.resolve(themeOptions.frontendGeneratedFolder, "theme.js") === importer && !existsSync5(path.resolve(themeOptions.frontendGeneratedFolder, id))) {
        console.debug("Generate theme file " + id + " not existing. Processing theme resource");
        processThemeResources(fullThemeOptions, console);
        return;
      }
      if (!id.startsWith(vaadin_dev_server_settings_default.themeFolder)) {
        return;
      }
      for (const location of [themeResourceFolder, frontendFolder]) {
        const result = await this.resolve(path.resolve(location, id));
        if (result) {
          return result;
        }
      }
    },
    async transform(raw, id, options) {
      const [bareId, query] = id.split("?");
      if (!bareId?.startsWith(themeFolder) && !bareId?.startsWith(themeOptions.themeResourceFolder) || !bareId?.endsWith(".css")) {
        return;
      }
      const [themeName] = bareId.substring(themeFolder.length + 1).split("/");
      return rewriteCssUrls(raw, path.dirname(bareId), path.resolve(themeFolder, themeName), console, opts);
    }
  };
}
function runWatchDog(watchDogPort, watchDogHost) {
  const client = net.Socket();
  client.setEncoding("utf8");
  client.on("error", function(err) {
    console.log("Watchdog connection error. Terminating vite process...", err);
    client.destroy();
    process.exit(0);
  });
  client.on("close", function() {
    client.destroy();
    runWatchDog(watchDogPort, watchDogHost);
  });
  client.connect(watchDogPort, watchDogHost || "localhost");
}
var allowedFrontendFolders = [frontendFolder, nodeModulesFolder];
function showRecompileReason() {
  return {
    name: "vaadin:why-you-compile",
    handleHotUpdate(context) {
      console.log("Recompiling because", context.file, "changed");
    }
  };
}
var DEV_MODE_START_REGEXP = /\/\*[\*!]\s+vaadin-dev-mode:start/;
var DEV_MODE_CODE_REGEXP = /\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i;
function preserveUsageStats() {
  return {
    name: "vaadin:preserve-usage-stats",
    transform(src, id) {
      if (id.includes("vaadin-usage-statistics")) {
        if (src.includes("vaadin-dev-mode:start")) {
          const newSrc = src.replace(DEV_MODE_START_REGEXP, "/*! vaadin-dev-mode:start");
          if (newSrc === src) {
            console.error("Comment replacement failed to change anything");
          } else if (!newSrc.match(DEV_MODE_CODE_REGEXP)) {
            console.error("New comment fails to match original regexp");
          } else {
            return { code: newSrc };
          }
        }
      }
      return { code: src };
    }
  };
}
var vaadinConfig = (env) => {
  const devMode = env.mode === "development";
  const productionMode = !devMode && !devBundle;
  if (devMode && process.env.watchDogPort) {
    runWatchDog(process.env.watchDogPort, process.env.watchDogHost);
  }
  return {
    root: frontendFolder,
    base: "",
    publicDir: false,
    resolve: {
      alias: {
        "@vaadin/flow-frontend": jarResourcesFolder,
        Frontend: frontendFolder
      },
      preserveSymlinks: true
    },
    define: {
      OFFLINE_PATH: vaadin_dev_server_settings_default.offlinePath,
      VITE_ENABLED: "true"
    },
    server: {
      host: "127.0.0.1",
      strictPort: true,
      fs: {
        allow: allowedFrontendFolders
      }
    },
    build: {
      outDir: buildOutputFolder,
      emptyOutDir: devBundle,
      assetsDir: "VAADIN/build",
      rollupOptions: {
        input: {
          indexhtml: projectIndexHtml,
          ...hasExportedWebComponents ? { webcomponenthtml: path.resolve(frontendFolder, "web-component.html") } : {}
        },
        onwarn: (warning, defaultHandler) => {
          const ignoreEvalWarning = [
            "generated/jar-resources/FlowClient.js",
            "generated/jar-resources/vaadin-spreadsheet/spreadsheet-export.js",
            "@vaadin/charts/src/helpers.js"
          ];
          if (warning.code === "EVAL" && warning.id && !!ignoreEvalWarning.find((id) => warning.id.endsWith(id))) {
            return;
          }
          defaultHandler(warning);
        }
      }
    },
    optimizeDeps: {
      entries: [
        // Pre-scan entrypoints in Vite to avoid reloading on first open
        "generated/vaadin.ts"
      ],
      exclude: [
        "@vaadin/router",
        "@vaadin/vaadin-license-checker",
        "@vaadin/vaadin-usage-statistics",
        "workbox-core",
        "workbox-precaching",
        "workbox-routing",
        "workbox-strategies"
      ]
    },
    plugins: [
      productionMode && brotli(),
      devMode && vaadinBundlesPlugin(),
      devMode && showRecompileReason(),
      vaadin_dev_server_settings_default.offlineEnabled && buildSWPlugin({ devMode }),
      !devMode && statsExtracterPlugin(),
      devBundle && preserveUsageStats(),
      themePlugin({ devMode }),
      postcssLit({
        include: ["**/*.css", /.*\/.*\.css\?.*/],
        exclude: [
          `${themeFolder}/**/*.css`,
          new RegExp(`${themeFolder}/.*/.*\\.css\\?.*`),
          `${themeResourceFolder}/**/*.css`,
          new RegExp(`${themeResourceFolder}/.*/.*\\.css\\?.*`),
          new RegExp(".*/.*\\?html-proxy.*")
        ]
      }),
      {
        name: "vaadin:force-remove-html-middleware",
        configureServer(server) {
          return () => {
            server.middlewares.stack = server.middlewares.stack.filter((mw) => {
              const handleName = `${mw.handle}`;
              return !handleName.includes("viteHtmlFallbackMiddleware");
            });
          };
        }
      },
      hasExportedWebComponents && {
        name: "vaadin:inject-entrypoints-to-web-component-html",
        transformIndexHtml: {
          order: "pre",
          handler(_html, { path: path2, server }) {
            if (path2 !== "/web-component.html") {
              return;
            }
            return [
              {
                tag: "script",
                attrs: { type: "module", src: `/generated/vaadin-web-component.ts` },
                injectTo: "head"
              }
            ];
          }
        }
      },
      {
        name: "vaadin:inject-entrypoints-to-index-html",
        transformIndexHtml: {
          order: "pre",
          handler(_html, { path: path2, server }) {
            if (path2 !== "/index.html") {
              return;
            }
            const scripts = [];
            if (devMode) {
              scripts.push({
                tag: "script",
                attrs: { type: "module", src: `/generated/vite-devmode.ts` },
                injectTo: "head"
              });
            }
            scripts.push({
              tag: "script",
              attrs: { type: "module", src: "/generated/vaadin.ts" },
              injectTo: "head"
            });
            return scripts;
          }
        }
      },
      checker({
        typescript: true
      }),
      productionMode && visualizer({ brotliSize: true, filename: bundleSizeFile })
    ]
  };
};
var overrideVaadinConfig = (customConfig2) => {
  return defineConfig((env) => mergeConfig(vaadinConfig(env), customConfig2(env)));
};
function getVersion(module) {
  const packageJson = path.resolve(nodeModulesFolder, module, "package.json");
  return JSON.parse(readFileSync4(packageJson, { encoding: "utf-8" })).version;
}
function getCvdlName(module) {
  const packageJson = path.resolve(nodeModulesFolder, module, "package.json");
  return JSON.parse(readFileSync4(packageJson, { encoding: "utf-8" })).cvdlName;
}

// vite.config.ts
var customConfig = (env) => ({
  // Here you can add custom Vite parameters
  // https://vitejs.dev/config/
});
var vite_config_default = overrideVaadinConfig(customConfig);
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5nZW5lcmF0ZWQudHMiLCAidGFyZ2V0L3BsdWdpbnMvYXBwbGljYXRpb24tdGhlbWUtcGx1Z2luL3RoZW1lLWhhbmRsZS5qcyIsICJ0YXJnZXQvcGx1Z2lucy9hcHBsaWNhdGlvbi10aGVtZS1wbHVnaW4vdGhlbWUtZ2VuZXJhdG9yLmpzIiwgInRhcmdldC9wbHVnaW5zL2FwcGxpY2F0aW9uLXRoZW1lLXBsdWdpbi90aGVtZS1jb3B5LmpzIiwgInRhcmdldC9wbHVnaW5zL3RoZW1lLWxvYWRlci90aGVtZS1sb2FkZXItdXRpbHMuanMiLCAidGFyZ2V0L3ZhYWRpbi1kZXYtc2VydmVyLXNldHRpbmdzLmpzb24iLCAidGFyZ2V0L3BsdWdpbnMvcm9sbHVwLXBsdWdpbi1wb3N0Y3NzLWxpdC1jdXN0b20vcm9sbHVwLXBsdWdpbi1wb3N0Y3NzLWxpdC5qcyIsICJ2aXRlLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXERldlxcXFx2YXVyb3JhXFxcXGF1cm9yYVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcRGV2XFxcXHZhdXJvcmFcXFxcYXVyb3JhXFxcXHZpdGUuZ2VuZXJhdGVkLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9EZXYvdmF1cm9yYS9hdXJvcmEvdml0ZS5nZW5lcmF0ZWQudHNcIjsvKipcbiAqIE5PVElDRTogdGhpcyBpcyBhbiBhdXRvLWdlbmVyYXRlZCBmaWxlXG4gKlxuICogVGhpcyBmaWxlIGhhcyBiZWVuIGdlbmVyYXRlZCBieSB0aGUgYGZsb3c6cHJlcGFyZS1mcm9udGVuZGAgbWF2ZW4gZ29hbC5cbiAqIFRoaXMgZmlsZSB3aWxsIGJlIG92ZXJ3cml0dGVuIG9uIGV2ZXJ5IHJ1bi4gQW55IGN1c3RvbSBjaGFuZ2VzIHNob3VsZCBiZSBtYWRlIHRvIHZpdGUuY29uZmlnLnRzXG4gKi9cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZXhpc3RzU3luYywgbWtkaXJTeW5jLCByZWFkZGlyU3luYywgcmVhZEZpbGVTeW5jLCB3cml0ZUZpbGVTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgKiBhcyBuZXQgZnJvbSAnbmV0JztcblxuaW1wb3J0IHsgcHJvY2Vzc1RoZW1lUmVzb3VyY2VzIH0gZnJvbSAnLi90YXJnZXQvcGx1Z2lucy9hcHBsaWNhdGlvbi10aGVtZS1wbHVnaW4vdGhlbWUtaGFuZGxlLmpzJztcbmltcG9ydCB7IHJld3JpdGVDc3NVcmxzIH0gZnJvbSAnLi90YXJnZXQvcGx1Z2lucy90aGVtZS1sb2FkZXIvdGhlbWUtbG9hZGVyLXV0aWxzLmpzJztcbmltcG9ydCBzZXR0aW5ncyBmcm9tICcuL3RhcmdldC92YWFkaW4tZGV2LXNlcnZlci1zZXR0aW5ncy5qc29uJztcbmltcG9ydCB7XG4gIEFzc2V0SW5mbyxcbiAgQ2h1bmtJbmZvLFxuICBkZWZpbmVDb25maWcsXG4gIG1lcmdlQ29uZmlnLFxuICBPdXRwdXRPcHRpb25zLFxuICBQbHVnaW5PcHRpb24sXG4gIFJlc29sdmVkQ29uZmlnLFxuICBVc2VyQ29uZmlnRm5cbn0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBnZXRNYW5pZmVzdCB9IGZyb20gJ3dvcmtib3gtYnVpbGQnO1xuXG5pbXBvcnQgKiBhcyByb2xsdXAgZnJvbSAncm9sbHVwJztcbmltcG9ydCBicm90bGkgZnJvbSAncm9sbHVwLXBsdWdpbi1icm90bGknO1xuaW1wb3J0IHJlcGxhY2UgZnJvbSAnQHJvbGx1cC9wbHVnaW4tcmVwbGFjZSc7XG5pbXBvcnQgY2hlY2tlciBmcm9tICd2aXRlLXBsdWdpbi1jaGVja2VyJztcbmltcG9ydCBwb3N0Y3NzTGl0IGZyb20gJy4vdGFyZ2V0L3BsdWdpbnMvcm9sbHVwLXBsdWdpbi1wb3N0Y3NzLWxpdC1jdXN0b20vcm9sbHVwLXBsdWdpbi1wb3N0Y3NzLWxpdC5qcyc7XG5cbmltcG9ydCB7IGNyZWF0ZVJlcXVpcmUgfSBmcm9tICdtb2R1bGUnO1xuXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJztcblxuLy8gTWFrZSBgcmVxdWlyZWAgY29tcGF0aWJsZSB3aXRoIEVTIG1vZHVsZXNcbmNvbnN0IHJlcXVpcmUgPSBjcmVhdGVSZXF1aXJlKGltcG9ydC5tZXRhLnVybCk7XG5cbmNvbnN0IGFwcFNoZWxsVXJsID0gJy4nO1xuXG5jb25zdCBmcm9udGVuZEZvbGRlciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIHNldHRpbmdzLmZyb250ZW5kRm9sZGVyKTtcbmNvbnN0IHRoZW1lRm9sZGVyID0gcGF0aC5yZXNvbHZlKGZyb250ZW5kRm9sZGVyLCBzZXR0aW5ncy50aGVtZUZvbGRlcik7XG5jb25zdCBmcm9udGVuZEJ1bmRsZUZvbGRlciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIHNldHRpbmdzLmZyb250ZW5kQnVuZGxlT3V0cHV0KTtcbmNvbnN0IGRldkJ1bmRsZUZvbGRlciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIHNldHRpbmdzLmRldkJ1bmRsZU91dHB1dCk7XG5jb25zdCBkZXZCdW5kbGUgPSAhIXByb2Nlc3MuZW52LmRldkJ1bmRsZTtcbmNvbnN0IGphclJlc291cmNlc0ZvbGRlciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIHNldHRpbmdzLmphclJlc291cmNlc0ZvbGRlcik7XG5jb25zdCB0aGVtZVJlc291cmNlRm9sZGVyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgc2V0dGluZ3MudGhlbWVSZXNvdXJjZUZvbGRlcik7XG5jb25zdCBwcm9qZWN0UGFja2FnZUpzb25GaWxlID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2UuanNvbicpO1xuXG5jb25zdCBidWlsZE91dHB1dEZvbGRlciA9IGRldkJ1bmRsZSA/IGRldkJ1bmRsZUZvbGRlciA6IGZyb250ZW5kQnVuZGxlRm9sZGVyO1xuY29uc3Qgc3RhdHNGb2xkZXIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBkZXZCdW5kbGUgPyBzZXR0aW5ncy5kZXZCdW5kbGVTdGF0c091dHB1dCA6IHNldHRpbmdzLnN0YXRzT3V0cHV0KTtcbmNvbnN0IHN0YXRzRmlsZSA9IHBhdGgucmVzb2x2ZShzdGF0c0ZvbGRlciwgJ3N0YXRzLmpzb24nKTtcbmNvbnN0IGJ1bmRsZVNpemVGaWxlID0gcGF0aC5yZXNvbHZlKHN0YXRzRm9sZGVyLCAnYnVuZGxlLXNpemUuaHRtbCcpO1xuY29uc3Qgbm9kZU1vZHVsZXNGb2xkZXIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnbm9kZV9tb2R1bGVzJyk7XG5jb25zdCB3ZWJDb21wb25lbnRUYWdzID0gJyc7XG5cbmNvbnN0IHByb2plY3RJbmRleEh0bWwgPSBwYXRoLnJlc29sdmUoZnJvbnRlbmRGb2xkZXIsICdpbmRleC5odG1sJyk7XG5cbmNvbnN0IHByb2plY3RTdGF0aWNBc3NldHNGb2xkZXJzID0gW1xuICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJywgJ21haW4nLCAncmVzb3VyY2VzJywgJ01FVEEtSU5GJywgJ3Jlc291cmNlcycpLFxuICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJywgJ21haW4nLCAncmVzb3VyY2VzJywgJ3N0YXRpYycpLFxuICBmcm9udGVuZEZvbGRlclxuXTtcblxuLy8gRm9sZGVycyBpbiB0aGUgcHJvamVjdCB3aGljaCBjYW4gY29udGFpbiBhcHBsaWNhdGlvbiB0aGVtZXNcbmNvbnN0IHRoZW1lUHJvamVjdEZvbGRlcnMgPSBwcm9qZWN0U3RhdGljQXNzZXRzRm9sZGVycy5tYXAoKGZvbGRlcikgPT4gcGF0aC5yZXNvbHZlKGZvbGRlciwgc2V0dGluZ3MudGhlbWVGb2xkZXIpKTtcblxuY29uc3QgdGhlbWVPcHRpb25zID0ge1xuICBkZXZNb2RlOiBmYWxzZSxcbiAgdXNlRGV2QnVuZGxlOiBkZXZCdW5kbGUsXG4gIC8vIFRoZSBmb2xsb3dpbmcgbWF0Y2hlcyBmb2xkZXIgJ2Zyb250ZW5kL2dlbmVyYXRlZC90aGVtZXMvJ1xuICAvLyAobm90ICdmcm9udGVuZC90aGVtZXMnKSBmb3IgdGhlbWUgaW4gSkFSIHRoYXQgaXMgY29waWVkIHRoZXJlXG4gIHRoZW1lUmVzb3VyY2VGb2xkZXI6IHBhdGgucmVzb2x2ZSh0aGVtZVJlc291cmNlRm9sZGVyLCBzZXR0aW5ncy50aGVtZUZvbGRlciksXG4gIHRoZW1lUHJvamVjdEZvbGRlcnM6IHRoZW1lUHJvamVjdEZvbGRlcnMsXG4gIHByb2plY3RTdGF0aWNBc3NldHNPdXRwdXRGb2xkZXI6IGRldkJ1bmRsZVxuICAgID8gcGF0aC5yZXNvbHZlKGRldkJ1bmRsZUZvbGRlciwgJy4uL2Fzc2V0cycpXG4gICAgOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBzZXR0aW5ncy5zdGF0aWNPdXRwdXQpLFxuICBmcm9udGVuZEdlbmVyYXRlZEZvbGRlcjogcGF0aC5yZXNvbHZlKGZyb250ZW5kRm9sZGVyLCBzZXR0aW5ncy5nZW5lcmF0ZWRGb2xkZXIpXG59O1xuXG5jb25zdCBoYXNFeHBvcnRlZFdlYkNvbXBvbmVudHMgPSBleGlzdHNTeW5jKHBhdGgucmVzb2x2ZShmcm9udGVuZEZvbGRlciwgJ3dlYi1jb21wb25lbnQuaHRtbCcpKTtcblxuLy8gQmxvY2sgZGVidWcgYW5kIHRyYWNlIGxvZ3MuXG5jb25zb2xlLnRyYWNlID0gKCkgPT4ge307XG5jb25zb2xlLmRlYnVnID0gKCkgPT4ge307XG5cbmZ1bmN0aW9uIGluamVjdE1hbmlmZXN0VG9TV1BsdWdpbigpOiByb2xsdXAuUGx1Z2luIHtcbiAgY29uc3QgcmV3cml0ZU1hbmlmZXN0SW5kZXhIdG1sVXJsID0gKG1hbmlmZXN0KSA9PiB7XG4gICAgY29uc3QgaW5kZXhFbnRyeSA9IG1hbmlmZXN0LmZpbmQoKGVudHJ5KSA9PiBlbnRyeS51cmwgPT09ICdpbmRleC5odG1sJyk7XG4gICAgaWYgKGluZGV4RW50cnkpIHtcbiAgICAgIGluZGV4RW50cnkudXJsID0gYXBwU2hlbGxVcmw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgbWFuaWZlc3QsIHdhcm5pbmdzOiBbXSB9O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3ZhYWRpbjppbmplY3QtbWFuaWZlc3QtdG8tc3cnLFxuICAgIGFzeW5jIHRyYW5zZm9ybShjb2RlLCBpZCkge1xuICAgICAgaWYgKC9zd1xcLih0c3xqcykkLy50ZXN0KGlkKSkge1xuICAgICAgICBjb25zdCB7IG1hbmlmZXN0RW50cmllcyB9ID0gYXdhaXQgZ2V0TWFuaWZlc3Qoe1xuICAgICAgICAgIGdsb2JEaXJlY3Rvcnk6IGJ1aWxkT3V0cHV0Rm9sZGVyLFxuICAgICAgICAgIGdsb2JQYXR0ZXJuczogWycqKi8qJ10sXG4gICAgICAgICAgZ2xvYklnbm9yZXM6IFsnKiovKi5iciddLFxuICAgICAgICAgIG1hbmlmZXN0VHJhbnNmb3JtczogW3Jld3JpdGVNYW5pZmVzdEluZGV4SHRtbFVybF0sXG4gICAgICAgICAgbWF4aW11bUZpbGVTaXplVG9DYWNoZUluQnl0ZXM6IDEwMCAqIDEwMjQgKiAxMDI0IC8vIDEwMG1iLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY29kZS5yZXBsYWNlKCdzZWxmLl9fV0JfTUFOSUZFU1QnLCBKU09OLnN0cmluZ2lmeShtYW5pZmVzdEVudHJpZXMpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGJ1aWxkU1dQbHVnaW4ob3B0cyk6IFBsdWdpbk9wdGlvbiB7XG4gIGxldCBjb25maWc6IFJlc29sdmVkQ29uZmlnO1xuICBjb25zdCBkZXZNb2RlID0gb3B0cy5kZXZNb2RlO1xuXG4gIGNvbnN0IHN3T2JqID0ge307XG5cbiAgYXN5bmMgZnVuY3Rpb24gYnVpbGQoYWN0aW9uOiAnZ2VuZXJhdGUnIHwgJ3dyaXRlJywgYWRkaXRpb25hbFBsdWdpbnM6IHJvbGx1cC5QbHVnaW5bXSA9IFtdKSB7XG4gICAgY29uc3QgaW5jbHVkZWRQbHVnaW5OYW1lcyA9IFtcbiAgICAgICd2aXRlOmVzYnVpbGQnLFxuICAgICAgJ3JvbGx1cC1wbHVnaW4tZHluYW1pYy1pbXBvcnQtdmFyaWFibGVzJyxcbiAgICAgICd2aXRlOmVzYnVpbGQtdHJhbnNwaWxlJyxcbiAgICAgICd2aXRlOnRlcnNlcidcbiAgICBdO1xuICAgIGNvbnN0IHBsdWdpbnM6IHJvbGx1cC5QbHVnaW5bXSA9IGNvbmZpZy5wbHVnaW5zLmZpbHRlcigocCkgPT4ge1xuICAgICAgcmV0dXJuIGluY2x1ZGVkUGx1Z2luTmFtZXMuaW5jbHVkZXMocC5uYW1lKTtcbiAgICB9KTtcbiAgICBjb25zdCByZXNvbHZlciA9IGNvbmZpZy5jcmVhdGVSZXNvbHZlcigpO1xuICAgIGNvbnN0IHJlc29sdmVQbHVnaW46IHJvbGx1cC5QbHVnaW4gPSB7XG4gICAgICBuYW1lOiAncmVzb2x2ZXInLFxuICAgICAgcmVzb2x2ZUlkKHNvdXJjZSwgaW1wb3J0ZXIsIF9vcHRpb25zKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlcihzb3VyY2UsIGltcG9ydGVyKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHBsdWdpbnMudW5zaGlmdChyZXNvbHZlUGx1Z2luKTsgLy8gUHV0IHJlc29sdmUgZmlyc3RcbiAgICBwbHVnaW5zLnB1c2goXG4gICAgICByZXBsYWNlKHtcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgJ3Byb2Nlc3MuZW52Lk5PREVfRU5WJzogSlNPTi5zdHJpbmdpZnkoY29uZmlnLm1vZGUpLFxuICAgICAgICAgIC4uLmNvbmZpZy5kZWZpbmVcbiAgICAgICAgfSxcbiAgICAgICAgcHJldmVudEFzc2lnbm1lbnQ6IHRydWVcbiAgICAgIH0pXG4gICAgKTtcbiAgICBpZiAoYWRkaXRpb25hbFBsdWdpbnMpIHtcbiAgICAgIHBsdWdpbnMucHVzaCguLi5hZGRpdGlvbmFsUGx1Z2lucyk7XG4gICAgfVxuICAgIGNvbnN0IGJ1bmRsZSA9IGF3YWl0IHJvbGx1cC5yb2xsdXAoe1xuICAgICAgaW5wdXQ6IHBhdGgucmVzb2x2ZShzZXR0aW5ncy5jbGllbnRTZXJ2aWNlV29ya2VyU291cmNlKSxcbiAgICAgIHBsdWdpbnNcbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgYnVuZGxlW2FjdGlvbl0oe1xuICAgICAgICBmaWxlOiBwYXRoLnJlc29sdmUoYnVpbGRPdXRwdXRGb2xkZXIsICdzdy5qcycpLFxuICAgICAgICBmb3JtYXQ6ICdlcycsXG4gICAgICAgIGV4cG9ydHM6ICdub25lJyxcbiAgICAgICAgc291cmNlbWFwOiBjb25maWcuY29tbWFuZCA9PT0gJ3NlcnZlJyB8fCBjb25maWcuYnVpbGQuc291cmNlbWFwLFxuICAgICAgICBpbmxpbmVEeW5hbWljSW1wb3J0czogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGF3YWl0IGJ1bmRsZS5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3ZhYWRpbjpidWlsZC1zdycsXG4gICAgZW5mb3JjZTogJ3Bvc3QnLFxuICAgIGFzeW5jIGNvbmZpZ1Jlc29sdmVkKHJlc29sdmVkQ29uZmlnKSB7XG4gICAgICBjb25maWcgPSByZXNvbHZlZENvbmZpZztcbiAgICB9LFxuICAgIGFzeW5jIGJ1aWxkU3RhcnQoKSB7XG4gICAgICBpZiAoZGV2TW9kZSkge1xuICAgICAgICBjb25zdCB7IG91dHB1dCB9ID0gYXdhaXQgYnVpbGQoJ2dlbmVyYXRlJyk7XG4gICAgICAgIHN3T2JqLmNvZGUgPSBvdXRwdXRbMF0uY29kZTtcbiAgICAgICAgc3dPYmoubWFwID0gb3V0cHV0WzBdLm1hcDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIGxvYWQoaWQpIHtcbiAgICAgIGlmIChpZC5lbmRzV2l0aCgnc3cuanMnKSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfSxcbiAgICBhc3luYyB0cmFuc2Zvcm0oX2NvZGUsIGlkKSB7XG4gICAgICBpZiAoaWQuZW5kc1dpdGgoJ3N3LmpzJykpIHtcbiAgICAgICAgcmV0dXJuIHN3T2JqO1xuICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgY2xvc2VCdW5kbGUoKSB7XG4gICAgICBpZiAoIWRldk1vZGUpIHtcbiAgICAgICAgYXdhaXQgYnVpbGQoJ3dyaXRlJywgW2luamVjdE1hbmlmZXN0VG9TV1BsdWdpbigpLCBicm90bGkoKV0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gc3RhdHNFeHRyYWN0ZXJQbHVnaW4oKTogUGx1Z2luT3B0aW9uIHtcbiAgZnVuY3Rpb24gY29sbGVjdFRoZW1lSnNvbnNJbkZyb250ZW5kKHRoZW1lSnNvbkNvbnRlbnRzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LCB0aGVtZU5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IHRoZW1lSnNvbiA9IHBhdGgucmVzb2x2ZShmcm9udGVuZEZvbGRlciwgc2V0dGluZ3MudGhlbWVGb2xkZXIsIHRoZW1lTmFtZSwgJ3RoZW1lLmpzb24nKTtcbiAgICBpZiAoZXhpc3RzU3luYyh0aGVtZUpzb24pKSB7XG4gICAgICBjb25zdCB0aGVtZUpzb25Db250ZW50ID0gcmVhZEZpbGVTeW5jKHRoZW1lSnNvbiwgeyBlbmNvZGluZzogJ3V0Zi04JyB9KS5yZXBsYWNlKC9cXHJcXG4vZywgJ1xcbicpO1xuICAgICAgdGhlbWVKc29uQ29udGVudHNbdGhlbWVOYW1lXSA9IHRoZW1lSnNvbkNvbnRlbnQ7XG4gICAgICBjb25zdCB0aGVtZUpzb25PYmplY3QgPSBKU09OLnBhcnNlKHRoZW1lSnNvbkNvbnRlbnQpO1xuICAgICAgaWYgKHRoZW1lSnNvbk9iamVjdC5wYXJlbnQpIHtcbiAgICAgICAgY29sbGVjdFRoZW1lSnNvbnNJbkZyb250ZW5kKHRoZW1lSnNvbkNvbnRlbnRzLCB0aGVtZUpzb25PYmplY3QucGFyZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5hbWU6ICd2YWFkaW46c3RhdHMnLFxuICAgIGVuZm9yY2U6ICdwb3N0JyxcbiAgICBhc3luYyB3cml0ZUJ1bmRsZShvcHRpb25zOiBPdXRwdXRPcHRpb25zLCBidW5kbGU6IHsgW2ZpbGVOYW1lOiBzdHJpbmddOiBBc3NldEluZm8gfCBDaHVua0luZm8gfSkge1xuICAgICAgY29uc3QgbW9kdWxlcyA9IE9iamVjdC52YWx1ZXMoYnVuZGxlKS5mbGF0TWFwKChiKSA9PiAoYi5tb2R1bGVzID8gT2JqZWN0LmtleXMoYi5tb2R1bGVzKSA6IFtdKSk7XG4gICAgICBjb25zdCBub2RlTW9kdWxlc0ZvbGRlcnMgPSBtb2R1bGVzXG4gICAgICAgIC5tYXAoKGlkKSA9PiBpZC5yZXBsYWNlKC9cXFxcL2csICcvJykpXG4gICAgICAgIC5maWx0ZXIoKGlkKSA9PiBpZC5zdGFydHNXaXRoKG5vZGVNb2R1bGVzRm9sZGVyLnJlcGxhY2UoL1xcXFwvZywgJy8nKSkpXG4gICAgICAgIC5tYXAoKGlkKSA9PiBpZC5zdWJzdHJpbmcobm9kZU1vZHVsZXNGb2xkZXIubGVuZ3RoICsgMSkpO1xuICAgICAgY29uc3QgbnBtTW9kdWxlcyA9IG5vZGVNb2R1bGVzRm9sZGVyc1xuICAgICAgICAubWFwKChpZCkgPT4gaWQucmVwbGFjZSgvXFxcXC9nLCAnLycpKVxuICAgICAgICAubWFwKChpZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHBhcnRzID0gaWQuc3BsaXQoJy8nKTtcbiAgICAgICAgICBpZiAoaWQuc3RhcnRzV2l0aCgnQCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFydHNbMF0gKyAnLycgKyBwYXJ0c1sxXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnRzWzBdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnNvcnQoKVxuICAgICAgICAuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIHNlbGYpID0+IHNlbGYuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4KTtcbiAgICAgIGNvbnN0IG5wbU1vZHVsZUFuZFZlcnNpb24gPSBPYmplY3QuZnJvbUVudHJpZXMobnBtTW9kdWxlcy5tYXAoKG1vZHVsZSkgPT4gW21vZHVsZSwgZ2V0VmVyc2lvbihtb2R1bGUpXSkpO1xuICAgICAgY29uc3QgY3ZkbHMgPSBPYmplY3QuZnJvbUVudHJpZXMoXG4gICAgICAgIG5wbU1vZHVsZXNcbiAgICAgICAgICAuZmlsdGVyKChtb2R1bGUpID0+IGdldEN2ZGxOYW1lKG1vZHVsZSkgIT0gbnVsbClcbiAgICAgICAgICAubWFwKChtb2R1bGUpID0+IFttb2R1bGUsIHsgbmFtZTogZ2V0Q3ZkbE5hbWUobW9kdWxlKSwgdmVyc2lvbjogZ2V0VmVyc2lvbihtb2R1bGUpIH1dKVxuICAgICAgKTtcblxuICAgICAgbWtkaXJTeW5jKHBhdGguZGlybmFtZShzdGF0c0ZpbGUpLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgIGNvbnN0IHByb2plY3RQYWNrYWdlSnNvbiA9IEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKHByb2plY3RQYWNrYWdlSnNvbkZpbGUsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSkpO1xuXG4gICAgICBjb25zdCBlbnRyeVNjcmlwdHMgPSBPYmplY3QudmFsdWVzKGJ1bmRsZSlcbiAgICAgICAgLmZpbHRlcigoYnVuZGxlKSA9PiBidW5kbGUuaXNFbnRyeSlcbiAgICAgICAgLm1hcCgoYnVuZGxlKSA9PiBidW5kbGUuZmlsZU5hbWUpO1xuXG4gICAgICBjb25zdCBnZW5lcmF0ZWRJbmRleEh0bWwgPSBwYXRoLnJlc29sdmUoYnVpbGRPdXRwdXRGb2xkZXIsICdpbmRleC5odG1sJyk7XG4gICAgICBjb25zdCBjdXN0b21JbmRleERhdGE6IHN0cmluZyA9IHJlYWRGaWxlU3luYyhwcm9qZWN0SW5kZXhIdG1sLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pO1xuICAgICAgY29uc3QgZ2VuZXJhdGVkSW5kZXhEYXRhOiBzdHJpbmcgPSByZWFkRmlsZVN5bmMoZ2VuZXJhdGVkSW5kZXhIdG1sLCB7XG4gICAgICAgIGVuY29kaW5nOiAndXRmLTgnXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgY3VzdG9tSW5kZXhSb3dzID0gbmV3IFNldChjdXN0b21JbmRleERhdGEuc3BsaXQoL1tcXHJcXG5dLykuZmlsdGVyKChyb3cpID0+IHJvdy50cmltKCkgIT09ICcnKSk7XG4gICAgICBjb25zdCBnZW5lcmF0ZWRJbmRleFJvd3MgPSBnZW5lcmF0ZWRJbmRleERhdGEuc3BsaXQoL1tcXHJcXG5dLykuZmlsdGVyKChyb3cpID0+IHJvdy50cmltKCkgIT09ICcnKTtcblxuICAgICAgY29uc3Qgcm93c0dlbmVyYXRlZDogc3RyaW5nW10gPSBbXTtcbiAgICAgIGdlbmVyYXRlZEluZGV4Um93cy5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgICAgaWYgKCFjdXN0b21JbmRleFJvd3MuaGFzKHJvdykpIHtcbiAgICAgICAgICByb3dzR2VuZXJhdGVkLnB1c2gocm93KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vQWZ0ZXIgZGV2LWJ1bmRsZSBidWlsZCBhZGQgdXNlZCBGbG93IGZyb250ZW5kIGltcG9ydHMgSnNNb2R1bGUvSmF2YVNjcmlwdC9Dc3NJbXBvcnRcblxuICAgICAgY29uc3QgcGFyc2VJbXBvcnRzID0gKGZpbGVuYW1lOiBzdHJpbmcsIHJlc3VsdDogU2V0PHN0cmluZz4pOiB2b2lkID0+IHtcbiAgICAgICAgY29uc3QgY29udGVudDogc3RyaW5nID0gcmVhZEZpbGVTeW5jKGZpbGVuYW1lLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pO1xuICAgICAgICBjb25zdCBsaW5lcyA9IGNvbnRlbnQuc3BsaXQoJ1xcbicpO1xuICAgICAgICBjb25zdCBzdGF0aWNJbXBvcnRzID0gbGluZXNcbiAgICAgICAgICAuZmlsdGVyKChsaW5lKSA9PiBsaW5lLnN0YXJ0c1dpdGgoJ2ltcG9ydCAnKSlcbiAgICAgICAgICAubWFwKChsaW5lKSA9PiBsaW5lLnN1YnN0cmluZyhsaW5lLmluZGV4T2YoXCInXCIpICsgMSwgbGluZS5sYXN0SW5kZXhPZihcIidcIikpKVxuICAgICAgICAgIC5tYXAoKGxpbmUpID0+IChsaW5lLmluY2x1ZGVzKCc/JykgPyBsaW5lLnN1YnN0cmluZygwLCBsaW5lLmxhc3RJbmRleE9mKCc/JykpIDogbGluZSkpO1xuICAgICAgICBjb25zdCBkeW5hbWljSW1wb3J0cyA9IGxpbmVzXG4gICAgICAgICAgLmZpbHRlcigobGluZSkgPT4gbGluZS5pbmNsdWRlcygnaW1wb3J0KCcpKVxuICAgICAgICAgIC5tYXAoKGxpbmUpID0+IGxpbmUucmVwbGFjZSgvLippbXBvcnRcXCgvLCAnJykpXG4gICAgICAgICAgLm1hcCgobGluZSkgPT4gbGluZS5zcGxpdCgvJy8pWzFdKVxuICAgICAgICAgIC5tYXAoKGxpbmUpID0+IChsaW5lLmluY2x1ZGVzKCc/JykgPyBsaW5lLnN1YnN0cmluZygwLCBsaW5lLmxhc3RJbmRleE9mKCc/JykpIDogbGluZSkpO1xuXG4gICAgICAgIHN0YXRpY0ltcG9ydHMuZm9yRWFjaCgoc3RhdGljSW1wb3J0KSA9PiByZXN1bHQuYWRkKHN0YXRpY0ltcG9ydCkpO1xuXG4gICAgICAgIGR5bmFtaWNJbXBvcnRzLm1hcCgoZHluYW1pY0ltcG9ydCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGltcG9ydGVkRmlsZSA9IHBhdGgucmVzb2x2ZShwYXRoLmRpcm5hbWUoZmlsZW5hbWUpLCBkeW5hbWljSW1wb3J0KTtcbiAgICAgICAgICBwYXJzZUltcG9ydHMoaW1wb3J0ZWRGaWxlLCByZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGdlbmVyYXRlZEltcG9ydHNTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgIHBhcnNlSW1wb3J0cyhcbiAgICAgICAgcGF0aC5yZXNvbHZlKHRoZW1lT3B0aW9ucy5mcm9udGVuZEdlbmVyYXRlZEZvbGRlciwgJ2Zsb3cnLCAnZ2VuZXJhdGVkLWZsb3ctaW1wb3J0cy5qcycpLFxuICAgICAgICBnZW5lcmF0ZWRJbXBvcnRzU2V0XG4gICAgICApO1xuICAgICAgY29uc3QgZ2VuZXJhdGVkSW1wb3J0cyA9IEFycmF5LmZyb20oZ2VuZXJhdGVkSW1wb3J0c1NldCkuc29ydCgpO1xuXG4gICAgICBjb25zdCBmcm9udGVuZEZpbGVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG5cbiAgICAgIGNvbnN0IHByb2plY3RGaWxlRXh0ZW5zaW9ucyA9IFsnLmpzJywgJy5qcy5tYXAnLCAnLnRzJywgJy50cy5tYXAnLCAnLnRzeCcsICcudHN4Lm1hcCcsICcuY3NzJywgJy5jc3MubWFwJ107XG5cbiAgICAgIGNvbnN0IGlzVGhlbWVDb21wb25lbnRzUmVzb3VyY2UgPSAoaWQ6IHN0cmluZykgPT5cbiAgICAgICAgICBpZC5zdGFydHNXaXRoKHRoZW1lT3B0aW9ucy5mcm9udGVuZEdlbmVyYXRlZEZvbGRlci5yZXBsYWNlKC9cXFxcL2csICcvJykpXG4gICAgICAgICAgICAgICYmIGlkLm1hdGNoKC8uKlxcL2phci1yZXNvdXJjZXNcXC90aGVtZXNcXC9bXlxcL10rXFwvY29tcG9uZW50c1xcLy8pO1xuXG4gICAgICBjb25zdCBpc0dlbmVyYXRlZFdlYkNvbXBvbmVudFJlc291cmNlID0gKGlkOiBzdHJpbmcpID0+XG4gICAgICAgICAgaWQuc3RhcnRzV2l0aCh0aGVtZU9wdGlvbnMuZnJvbnRlbmRHZW5lcmF0ZWRGb2xkZXIucmVwbGFjZSgvXFxcXC9nLCAnLycpKVxuICAgICAgICAgICAgICAmJiBpZC5tYXRjaCgvLipcXC9mbG93XFwvd2ViLWNvbXBvbmVudHNcXC8vKTtcblxuICAgICAgY29uc3QgaXNGcm9udGVuZFJlc291cmNlQ29sbGVjdGVkID0gKGlkOiBzdHJpbmcpID0+XG4gICAgICAgICAgIWlkLnN0YXJ0c1dpdGgodGhlbWVPcHRpb25zLmZyb250ZW5kR2VuZXJhdGVkRm9sZGVyLnJlcGxhY2UoL1xcXFwvZywgJy8nKSlcbiAgICAgICAgICB8fCBpc1RoZW1lQ29tcG9uZW50c1Jlc291cmNlKGlkKSBcbiAgICAgICAgICB8fCBpc0dlbmVyYXRlZFdlYkNvbXBvbmVudFJlc291cmNlKGlkKTtcblxuICAgICAgLy8gY29sbGVjdHMgcHJvamVjdCdzIGZyb250ZW5kIHJlc291cmNlcyBpbiBmcm9udGVuZCBmb2xkZXIsIGV4Y2x1ZGluZ1xuICAgICAgLy8gJ2dlbmVyYXRlZCcgc3ViLWZvbGRlciwgZXhjZXB0IGZvciBsZWdhY3kgc2hhZG93IERPTSBzdHlsZXNoZWV0c1xuICAgICAgLy8gcGFja2FnZWQgaW4gYHRoZW1lL2NvbXBvbmVudHMvYCBmb2xkZXJcbiAgICAgIC8vIGFuZCBnZW5lcmF0ZWQgd2ViIGNvbXBvbmVudCByZXNvdXJjZXMgaW4gYGZsb3cvd2ViLWNvbXBvbmVudHNgIGZvbGRlci5cbiAgICAgIG1vZHVsZXNcbiAgICAgICAgLm1hcCgoaWQpID0+IGlkLnJlcGxhY2UoL1xcXFwvZywgJy8nKSlcbiAgICAgICAgLmZpbHRlcigoaWQpID0+IGlkLnN0YXJ0c1dpdGgoZnJvbnRlbmRGb2xkZXIucmVwbGFjZSgvXFxcXC9nLCAnLycpKSlcbiAgICAgICAgLmZpbHRlcihpc0Zyb250ZW5kUmVzb3VyY2VDb2xsZWN0ZWQpXG4gICAgICAgIC5tYXAoKGlkKSA9PiBpZC5zdWJzdHJpbmcoZnJvbnRlbmRGb2xkZXIubGVuZ3RoICsgMSkpXG4gICAgICAgIC5tYXAoKGxpbmU6IHN0cmluZykgPT4gKGxpbmUuaW5jbHVkZXMoJz8nKSA/IGxpbmUuc3Vic3RyaW5nKDAsIGxpbmUubGFzdEluZGV4T2YoJz8nKSkgOiBsaW5lKSlcbiAgICAgICAgLmZvckVhY2goKGxpbmU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIC8vIFxcclxcbiBmcm9tIHdpbmRvd3MgbWFkZSBmaWxlcyBtYXkgYmUgdXNlZCBzbyBjaGFuZ2UgdG8gXFxuXG4gICAgICAgICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLnJlc29sdmUoZnJvbnRlbmRGb2xkZXIsIGxpbmUpO1xuICAgICAgICAgIGlmIChwcm9qZWN0RmlsZUV4dGVuc2lvbnMuaW5jbHVkZXMocGF0aC5leHRuYW1lKGZpbGVQYXRoKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVCdWZmZXIgPSByZWFkRmlsZVN5bmMoZmlsZVBhdGgsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSkucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKTtcbiAgICAgICAgICAgIGZyb250ZW5kRmlsZXNbbGluZV0gPSBjcmVhdGVIYXNoKCdzaGEyNTYnKS51cGRhdGUoZmlsZUJ1ZmZlciwgJ3V0ZjgnKS5kaWdlc3QoJ2hleCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIGNvbGxlY3RzIGZyb250ZW5kIHJlc291cmNlcyBmcm9tIHRoZSBKQVJzXG4gICAgICBnZW5lcmF0ZWRJbXBvcnRzXG4gICAgICAgIC5maWx0ZXIoKGxpbmU6IHN0cmluZykgPT4gbGluZS5pbmNsdWRlcygnZ2VuZXJhdGVkL2phci1yZXNvdXJjZXMnKSlcbiAgICAgICAgLmZvckVhY2goKGxpbmU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGxldCBmaWxlbmFtZSA9IGxpbmUuc3Vic3RyaW5nKGxpbmUuaW5kZXhPZignZ2VuZXJhdGVkJykpO1xuICAgICAgICAgIC8vIFxcclxcbiBmcm9tIHdpbmRvd3MgbWFkZSBmaWxlcyBtYXkgYmUgdXNlZCBybyByZW1vdmUgdG8gYmUgb25seSBcXG5cbiAgICAgICAgICBjb25zdCBmaWxlQnVmZmVyID0gcmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShmcm9udGVuZEZvbGRlciwgZmlsZW5hbWUpLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pLnJlcGxhY2UoXG4gICAgICAgICAgICAvXFxyXFxuL2csXG4gICAgICAgICAgICAnXFxuJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgaGFzaCA9IGNyZWF0ZUhhc2goJ3NoYTI1NicpLnVwZGF0ZShmaWxlQnVmZmVyLCAndXRmOCcpLmRpZ2VzdCgnaGV4Jyk7XG5cbiAgICAgICAgICBjb25zdCBmaWxlS2V5ID0gbGluZS5zdWJzdHJpbmcobGluZS5pbmRleE9mKCdqYXItcmVzb3VyY2VzLycpICsgMTQpO1xuICAgICAgICAgIGZyb250ZW5kRmlsZXNbZmlsZUtleV0gPSBoYXNoO1xuICAgICAgICB9KTtcbiAgICAgIC8vIGNvbGxlY3RzIGFuZCBoYXNoIHJlc3Qgb2YgdGhlIEZyb250ZW5kIHJlc291cmNlcyBleGNsdWRpbmcgZmlsZXMgaW4gL2dlbmVyYXRlZC8gYW5kIC90aGVtZXMvIFxuICAgICAgLy8gYW5kIGZpbGVzIGFscmVhZHkgaW4gZnJvbnRlbmRGaWxlcy5cbiAgICAgIGxldCBmcm9udGVuZEZvbGRlckFsaWFzID0gXCJGcm9udGVuZFwiO1xuICAgICAgZ2VuZXJhdGVkSW1wb3J0c1xuICAgICAgICAuZmlsdGVyKChsaW5lOiBzdHJpbmcpID0+IGxpbmUuc3RhcnRzV2l0aChmcm9udGVuZEZvbGRlckFsaWFzICsgJy8nKSlcbiAgICAgICAgLmZpbHRlcigobGluZTogc3RyaW5nKSA9PiAhbGluZS5zdGFydHNXaXRoKGZyb250ZW5kRm9sZGVyQWxpYXMgKyAnL2dlbmVyYXRlZC8nKSlcbiAgICAgICAgLmZpbHRlcigobGluZTogc3RyaW5nKSA9PiAhbGluZS5zdGFydHNXaXRoKGZyb250ZW5kRm9sZGVyQWxpYXMgKyAnL3RoZW1lcy8nKSlcbiAgICAgICAgLm1hcCgobGluZSkgPT4gbGluZS5zdWJzdHJpbmcoZnJvbnRlbmRGb2xkZXJBbGlhcy5sZW5ndGggKyAxKSlcbiAgICAgICAgLmZpbHRlcigobGluZTogc3RyaW5nKSA9PiAhZnJvbnRlbmRGaWxlc1tsaW5lXSlcbiAgICAgICAgLmZvckVhY2goKGxpbmU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5yZXNvbHZlKGZyb250ZW5kRm9sZGVyLCBsaW5lKTtcbiAgICAgICAgICBpZiAocHJvamVjdEZpbGVFeHRlbnNpb25zLmluY2x1ZGVzKHBhdGguZXh0bmFtZShmaWxlUGF0aCkpICYmIGV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICAgICAgICBjb25zdCBmaWxlQnVmZmVyID0gcmVhZEZpbGVTeW5jKGZpbGVQYXRoLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pLnJlcGxhY2UoL1xcclxcbi9nLCAnXFxuJyk7XG4gICAgICAgICAgICBmcm9udGVuZEZpbGVzW2xpbmVdID0gY3JlYXRlSGFzaCgnc2hhMjU2JykudXBkYXRlKGZpbGVCdWZmZXIsICd1dGY4JykuZGlnZXN0KCdoZXgnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pOyAgICAgICAgXG4gICAgICAvLyBJZiBhIGluZGV4LnRzIGV4aXN0cyBoYXNoIGl0IHRvIGJlIGFibGUgdG8gc2VlIGlmIGl0IGNoYW5nZXMuXG4gICAgICBpZiAoZXhpc3RzU3luYyhwYXRoLnJlc29sdmUoZnJvbnRlbmRGb2xkZXIsICdpbmRleC50cycpKSkge1xuICAgICAgICBjb25zdCBmaWxlQnVmZmVyID0gcmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShmcm9udGVuZEZvbGRlciwgJ2luZGV4LnRzJyksIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSkucmVwbGFjZShcbiAgICAgICAgICAvXFxyXFxuL2csXG4gICAgICAgICAgJ1xcbidcbiAgICAgICAgKTtcbiAgICAgICAgZnJvbnRlbmRGaWxlc1tgaW5kZXgudHNgXSA9IGNyZWF0ZUhhc2goJ3NoYTI1NicpLnVwZGF0ZShmaWxlQnVmZmVyLCAndXRmOCcpLmRpZ2VzdCgnaGV4Jyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRoZW1lSnNvbkNvbnRlbnRzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG4gICAgICBjb25zdCB0aGVtZXNGb2xkZXIgPSBwYXRoLnJlc29sdmUoamFyUmVzb3VyY2VzRm9sZGVyLCAndGhlbWVzJyk7XG4gICAgICBpZiAoZXhpc3RzU3luYyh0aGVtZXNGb2xkZXIpKSB7XG4gICAgICAgIHJlYWRkaXJTeW5jKHRoZW1lc0ZvbGRlcikuZm9yRWFjaCgodGhlbWVGb2xkZXIpID0+IHtcbiAgICAgICAgICBjb25zdCB0aGVtZUpzb24gPSBwYXRoLnJlc29sdmUodGhlbWVzRm9sZGVyLCB0aGVtZUZvbGRlciwgJ3RoZW1lLmpzb24nKTtcbiAgICAgICAgICBpZiAoZXhpc3RzU3luYyh0aGVtZUpzb24pKSB7XG4gICAgICAgICAgICB0aGVtZUpzb25Db250ZW50c1twYXRoLmJhc2VuYW1lKHRoZW1lRm9sZGVyKV0gPSByZWFkRmlsZVN5bmModGhlbWVKc29uLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pLnJlcGxhY2UoXG4gICAgICAgICAgICAgIC9cXHJcXG4vZyxcbiAgICAgICAgICAgICAgJ1xcbidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgY29sbGVjdFRoZW1lSnNvbnNJbkZyb250ZW5kKHRoZW1lSnNvbkNvbnRlbnRzLCBzZXR0aW5ncy50aGVtZU5hbWUpO1xuXG4gICAgICBsZXQgd2ViQ29tcG9uZW50czogc3RyaW5nW10gPSBbXTtcbiAgICAgIGlmICh3ZWJDb21wb25lbnRUYWdzKSB7XG4gICAgICAgIHdlYkNvbXBvbmVudHMgPSB3ZWJDb21wb25lbnRUYWdzLnNwbGl0KCc7Jyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN0YXRzID0ge1xuICAgICAgICBwYWNrYWdlSnNvbkRlcGVuZGVuY2llczogcHJvamVjdFBhY2thZ2VKc29uLmRlcGVuZGVuY2llcyxcbiAgICAgICAgbnBtTW9kdWxlczogbnBtTW9kdWxlQW5kVmVyc2lvbixcbiAgICAgICAgYnVuZGxlSW1wb3J0czogZ2VuZXJhdGVkSW1wb3J0cyxcbiAgICAgICAgZnJvbnRlbmRIYXNoZXM6IGZyb250ZW5kRmlsZXMsXG4gICAgICAgIHRoZW1lSnNvbkNvbnRlbnRzOiB0aGVtZUpzb25Db250ZW50cyxcbiAgICAgICAgZW50cnlTY3JpcHRzLFxuICAgICAgICB3ZWJDb21wb25lbnRzLFxuICAgICAgICBjdmRsTW9kdWxlczogY3ZkbHMsXG4gICAgICAgIHBhY2thZ2VKc29uSGFzaDogcHJvamVjdFBhY2thZ2VKc29uPy52YWFkaW4/Lmhhc2gsXG4gICAgICAgIGluZGV4SHRtbEdlbmVyYXRlZDogcm93c0dlbmVyYXRlZFxuICAgICAgfTtcbiAgICAgIHdyaXRlRmlsZVN5bmMoc3RhdHNGaWxlLCBKU09OLnN0cmluZ2lmeShzdGF0cywgbnVsbCwgMSkpO1xuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIHZhYWRpbkJ1bmRsZXNQbHVnaW4oKTogUGx1Z2luT3B0aW9uIHtcbiAgdHlwZSBFeHBvcnRJbmZvID1cbiAgICB8IHN0cmluZ1xuICAgIHwge1xuICAgICAgICBuYW1lc3BhY2U/OiBzdHJpbmc7XG4gICAgICAgIHNvdXJjZTogc3RyaW5nO1xuICAgICAgfTtcblxuICB0eXBlIEV4cG9zZUluZm8gPSB7XG4gICAgZXhwb3J0czogRXhwb3J0SW5mb1tdO1xuICB9O1xuXG4gIHR5cGUgUGFja2FnZUluZm8gPSB7XG4gICAgdmVyc2lvbjogc3RyaW5nO1xuICAgIGV4cG9zZXM6IFJlY29yZDxzdHJpbmcsIEV4cG9zZUluZm8+O1xuICB9O1xuXG4gIHR5cGUgQnVuZGxlSnNvbiA9IHtcbiAgICBwYWNrYWdlczogUmVjb3JkPHN0cmluZywgUGFja2FnZUluZm8+O1xuICB9O1xuXG4gIGNvbnN0IGRpc2FibGVkTWVzc2FnZSA9ICdWYWFkaW4gY29tcG9uZW50IGRlcGVuZGVuY3kgYnVuZGxlcyBhcmUgZGlzYWJsZWQuJztcblxuICBjb25zdCBtb2R1bGVzRGlyZWN0b3J5ID0gbm9kZU1vZHVsZXNGb2xkZXIucmVwbGFjZSgvXFxcXC9nLCAnLycpO1xuXG4gIGxldCB2YWFkaW5CdW5kbGVKc29uOiBCdW5kbGVKc29uO1xuXG4gIGZ1bmN0aW9uIHBhcnNlTW9kdWxlSWQoaWQ6IHN0cmluZyk6IHsgcGFja2FnZU5hbWU6IHN0cmluZzsgbW9kdWxlUGF0aDogc3RyaW5nIH0ge1xuICAgIGNvbnN0IFtzY29wZSwgc2NvcGVkUGFja2FnZU5hbWVdID0gaWQuc3BsaXQoJy8nLCAzKTtcbiAgICBjb25zdCBwYWNrYWdlTmFtZSA9IHNjb3BlLnN0YXJ0c1dpdGgoJ0AnKSA/IGAke3Njb3BlfS8ke3Njb3BlZFBhY2thZ2VOYW1lfWAgOiBzY29wZTtcbiAgICBjb25zdCBtb2R1bGVQYXRoID0gYC4ke2lkLnN1YnN0cmluZyhwYWNrYWdlTmFtZS5sZW5ndGgpfWA7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhY2thZ2VOYW1lLFxuICAgICAgbW9kdWxlUGF0aFxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBnZXRFeHBvcnRzKGlkOiBzdHJpbmcpOiBzdHJpbmdbXSB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgeyBwYWNrYWdlTmFtZSwgbW9kdWxlUGF0aCB9ID0gcGFyc2VNb2R1bGVJZChpZCk7XG4gICAgY29uc3QgcGFja2FnZUluZm8gPSB2YWFkaW5CdW5kbGVKc29uLnBhY2thZ2VzW3BhY2thZ2VOYW1lXTtcblxuICAgIGlmICghcGFja2FnZUluZm8pIHJldHVybjtcblxuICAgIGNvbnN0IGV4cG9zZUluZm86IEV4cG9zZUluZm8gPSBwYWNrYWdlSW5mby5leHBvc2VzW21vZHVsZVBhdGhdO1xuICAgIGlmICghZXhwb3NlSW5mbykgcmV0dXJuO1xuXG4gICAgY29uc3QgZXhwb3J0c1NldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIGZvciAoY29uc3QgZSBvZiBleHBvc2VJbmZvLmV4cG9ydHMpIHtcbiAgICAgIGlmICh0eXBlb2YgZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZXhwb3J0c1NldC5hZGQoZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB7IG5hbWVzcGFjZSwgc291cmNlIH0gPSBlO1xuICAgICAgICBpZiAobmFtZXNwYWNlKSB7XG4gICAgICAgICAgZXhwb3J0c1NldC5hZGQobmFtZXNwYWNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBzb3VyY2VFeHBvcnRzID0gZ2V0RXhwb3J0cyhzb3VyY2UpO1xuICAgICAgICAgIGlmIChzb3VyY2VFeHBvcnRzKSB7XG4gICAgICAgICAgICBzb3VyY2VFeHBvcnRzLmZvckVhY2goKGUpID0+IGV4cG9ydHNTZXQuYWRkKGUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmZyb20oZXhwb3J0c1NldCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRFeHBvcnRCaW5kaW5nKGJpbmRpbmc6IHN0cmluZykge1xuICAgIHJldHVybiBiaW5kaW5nID09PSAnZGVmYXVsdCcgPyAnX2RlZmF1bHQgYXMgZGVmYXVsdCcgOiBiaW5kaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW1wb3J0QXNzaWdtZW50KGJpbmRpbmc6IHN0cmluZykge1xuICAgIHJldHVybiBiaW5kaW5nID09PSAnZGVmYXVsdCcgPyAnZGVmYXVsdDogX2RlZmF1bHQnIDogYmluZGluZztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3ZhYWRpbjpidW5kbGVzJyxcbiAgICBlbmZvcmNlOiAncHJlJyxcbiAgICBhcHBseShjb25maWcsIHsgY29tbWFuZCB9KSB7XG4gICAgICBpZiAoY29tbWFuZCAhPT0gJ3NlcnZlJykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB2YWFkaW5CdW5kbGVKc29uUGF0aCA9IHJlcXVpcmUucmVzb2x2ZSgnQHZhYWRpbi9idW5kbGVzL3ZhYWRpbi1idW5kbGUuanNvbicpO1xuICAgICAgICB2YWFkaW5CdW5kbGVKc29uID0gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmModmFhZGluQnVuZGxlSnNvblBhdGgsIHsgZW5jb2Rpbmc6ICd1dGY4JyB9KSk7XG4gICAgICB9IGNhdGNoIChlOiB1bmtub3duKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZSA9PT0gJ29iamVjdCcgJiYgKGUgYXMgeyBjb2RlOiBzdHJpbmcgfSkuY29kZSA9PT0gJ01PRFVMRV9OT1RfRk9VTkQnKSB7XG4gICAgICAgICAgdmFhZGluQnVuZGxlSnNvbiA9IHsgcGFja2FnZXM6IHt9IH07XG4gICAgICAgICAgY29uc29sZS5pbmZvKGBAdmFhZGluL2J1bmRsZXMgbnBtIHBhY2thZ2UgaXMgbm90IGZvdW5kLCAke2Rpc2FibGVkTWVzc2FnZX1gKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCB2ZXJzaW9uTWlzbWF0Y2hlczogQXJyYXk8eyBuYW1lOiBzdHJpbmc7IGJ1bmRsZWRWZXJzaW9uOiBzdHJpbmc7IGluc3RhbGxlZFZlcnNpb246IHN0cmluZyB9PiA9IFtdO1xuICAgICAgZm9yIChjb25zdCBbbmFtZSwgcGFja2FnZUluZm9dIG9mIE9iamVjdC5lbnRyaWVzKHZhYWRpbkJ1bmRsZUpzb24ucGFja2FnZXMpKSB7XG4gICAgICAgIGxldCBpbnN0YWxsZWRWZXJzaW9uOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgeyB2ZXJzaW9uOiBidW5kbGVkVmVyc2lvbiB9ID0gcGFja2FnZUluZm87XG4gICAgICAgICAgY29uc3QgaW5zdGFsbGVkUGFja2FnZUpzb25GaWxlID0gcGF0aC5yZXNvbHZlKG1vZHVsZXNEaXJlY3RvcnksIG5hbWUsICdwYWNrYWdlLmpzb24nKTtcbiAgICAgICAgICBjb25zdCBwYWNrYWdlSnNvbiA9IEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKGluc3RhbGxlZFBhY2thZ2VKc29uRmlsZSwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pKTtcbiAgICAgICAgICBpbnN0YWxsZWRWZXJzaW9uID0gcGFja2FnZUpzb24udmVyc2lvbjtcbiAgICAgICAgICBpZiAoaW5zdGFsbGVkVmVyc2lvbiAmJiBpbnN0YWxsZWRWZXJzaW9uICE9PSBidW5kbGVkVmVyc2lvbikge1xuICAgICAgICAgICAgdmVyc2lvbk1pc21hdGNoZXMucHVzaCh7XG4gICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgIGJ1bmRsZWRWZXJzaW9uLFxuICAgICAgICAgICAgICBpbnN0YWxsZWRWZXJzaW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICAvLyBpZ25vcmUgcGFja2FnZSBub3QgZm91bmRcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHZlcnNpb25NaXNtYXRjaGVzLmxlbmd0aCkge1xuICAgICAgICBjb25zb2xlLmluZm8oYEB2YWFkaW4vYnVuZGxlcyBoYXMgdmVyc2lvbiBtaXNtYXRjaGVzIHdpdGggaW5zdGFsbGVkIHBhY2thZ2VzLCAke2Rpc2FibGVkTWVzc2FnZX1gKTtcbiAgICAgICAgY29uc29sZS5pbmZvKGBQYWNrYWdlcyB3aXRoIHZlcnNpb24gbWlzbWF0Y2hlczogJHtKU09OLnN0cmluZ2lmeSh2ZXJzaW9uTWlzbWF0Y2hlcywgdW5kZWZpbmVkLCAyKX1gKTtcbiAgICAgICAgdmFhZGluQnVuZGxlSnNvbiA9IHsgcGFja2FnZXM6IHt9IH07XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBhc3luYyBjb25maWcoY29uZmlnKSB7XG4gICAgICByZXR1cm4gbWVyZ2VDb25maWcoXG4gICAgICAgIHtcbiAgICAgICAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgICAgICAgIGV4Y2x1ZGU6IFtcbiAgICAgICAgICAgICAgLy8gVmFhZGluIGJ1bmRsZVxuICAgICAgICAgICAgICAnQHZhYWRpbi9idW5kbGVzJyxcbiAgICAgICAgICAgICAgLi4uT2JqZWN0LmtleXModmFhZGluQnVuZGxlSnNvbi5wYWNrYWdlcyksXG4gICAgICAgICAgICAgICdAdmFhZGluL3ZhYWRpbi1tYXRlcmlhbC1zdHlsZXMnXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb25maWdcbiAgICAgICk7XG4gICAgfSxcbiAgICBsb2FkKHJhd0lkKSB7XG4gICAgICBjb25zdCBbcGF0aCwgcGFyYW1zXSA9IHJhd0lkLnNwbGl0KCc/Jyk7XG4gICAgICBpZiAoIXBhdGguc3RhcnRzV2l0aChtb2R1bGVzRGlyZWN0b3J5KSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBpZCA9IHBhdGguc3Vic3RyaW5nKG1vZHVsZXNEaXJlY3RvcnkubGVuZ3RoICsgMSk7XG4gICAgICBjb25zdCBiaW5kaW5ncyA9IGdldEV4cG9ydHMoaWQpO1xuICAgICAgaWYgKGJpbmRpbmdzID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICAgICAgY29uc3QgY2FjaGVTdWZmaXggPSBwYXJhbXMgPyBgPyR7cGFyYW1zfWAgOiAnJztcbiAgICAgIGNvbnN0IGJ1bmRsZVBhdGggPSBgQHZhYWRpbi9idW5kbGVzL3ZhYWRpbi5qcyR7Y2FjaGVTdWZmaXh9YDtcblxuICAgICAgcmV0dXJuIGBpbXBvcnQgeyBpbml0IGFzIFZhYWRpbkJ1bmRsZUluaXQsIGdldCBhcyBWYWFkaW5CdW5kbGVHZXQgfSBmcm9tICcke2J1bmRsZVBhdGh9JztcbmF3YWl0IFZhYWRpbkJ1bmRsZUluaXQoJ2RlZmF1bHQnKTtcbmNvbnN0IHsgJHtiaW5kaW5ncy5tYXAoZ2V0SW1wb3J0QXNzaWdtZW50KS5qb2luKCcsICcpfSB9ID0gKGF3YWl0IFZhYWRpbkJ1bmRsZUdldCgnLi9ub2RlX21vZHVsZXMvJHtpZH0nKSkoKTtcbmV4cG9ydCB7ICR7YmluZGluZ3MubWFwKGdldEV4cG9ydEJpbmRpbmcpLmpvaW4oJywgJyl9IH07YDtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRoZW1lUGx1Z2luKG9wdHMpOiBQbHVnaW5PcHRpb24ge1xuICBjb25zdCBmdWxsVGhlbWVPcHRpb25zID0geyAuLi50aGVtZU9wdGlvbnMsIGRldk1vZGU6IG9wdHMuZGV2TW9kZSB9O1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICd2YWFkaW46dGhlbWUnLFxuICAgIGNvbmZpZygpIHtcbiAgICAgIHByb2Nlc3NUaGVtZVJlc291cmNlcyhmdWxsVGhlbWVPcHRpb25zLCBjb25zb2xlKTtcbiAgICB9LFxuICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZVRoZW1lRmlsZUNyZWF0ZURlbGV0ZSh0aGVtZUZpbGUsIHN0YXRzKSB7XG4gICAgICAgIGlmICh0aGVtZUZpbGUuc3RhcnRzV2l0aCh0aGVtZUZvbGRlcikpIHtcbiAgICAgICAgICBjb25zdCBjaGFuZ2VkID0gcGF0aC5yZWxhdGl2ZSh0aGVtZUZvbGRlciwgdGhlbWVGaWxlKTtcbiAgICAgICAgICBjb25zb2xlLmRlYnVnKCdUaGVtZSBmaWxlICcgKyAoISFzdGF0cyA/ICdjcmVhdGVkJyA6ICdkZWxldGVkJyksIGNoYW5nZWQpO1xuICAgICAgICAgIHByb2Nlc3NUaGVtZVJlc291cmNlcyhmdWxsVGhlbWVPcHRpb25zLCBjb25zb2xlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2VydmVyLndhdGNoZXIub24oJ2FkZCcsIGhhbmRsZVRoZW1lRmlsZUNyZWF0ZURlbGV0ZSk7XG4gICAgICBzZXJ2ZXIud2F0Y2hlci5vbigndW5saW5rJywgaGFuZGxlVGhlbWVGaWxlQ3JlYXRlRGVsZXRlKTtcbiAgICB9LFxuICAgIGhhbmRsZUhvdFVwZGF0ZShjb250ZXh0KSB7XG4gICAgICBjb25zdCBjb250ZXh0UGF0aCA9IHBhdGgucmVzb2x2ZShjb250ZXh0LmZpbGUpO1xuICAgICAgY29uc3QgdGhlbWVQYXRoID0gcGF0aC5yZXNvbHZlKHRoZW1lRm9sZGVyKTtcbiAgICAgIGlmIChjb250ZXh0UGF0aC5zdGFydHNXaXRoKHRoZW1lUGF0aCkpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlZCA9IHBhdGgucmVsYXRpdmUodGhlbWVQYXRoLCBjb250ZXh0UGF0aCk7XG5cbiAgICAgICAgY29uc29sZS5kZWJ1ZygnVGhlbWUgZmlsZSBjaGFuZ2VkJywgY2hhbmdlZCk7XG5cbiAgICAgICAgaWYgKGNoYW5nZWQuc3RhcnRzV2l0aChzZXR0aW5ncy50aGVtZU5hbWUpKSB7XG4gICAgICAgICAgcHJvY2Vzc1RoZW1lUmVzb3VyY2VzKGZ1bGxUaGVtZU9wdGlvbnMsIGNvbnNvbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhc3luYyByZXNvbHZlSWQoaWQsIGltcG9ydGVyKSB7XG4gICAgICAvLyBmb3JjZSB0aGVtZSBnZW5lcmF0aW9uIGlmIGdlbmVyYXRlZCB0aGVtZSBzb3VyY2VzIGRvZXMgbm90IHlldCBleGlzdFxuICAgICAgLy8gdGhpcyBtYXkgaGFwcGVuIGZvciBleGFtcGxlIGR1cmluZyBKYXZhIGhvdCByZWxvYWQgd2hlbiB1cGRhdGluZ1xuICAgICAgLy8gQFRoZW1lIGFubm90YXRpb24gdmFsdWVcbiAgICAgIGlmIChcbiAgICAgICAgcGF0aC5yZXNvbHZlKHRoZW1lT3B0aW9ucy5mcm9udGVuZEdlbmVyYXRlZEZvbGRlciwgJ3RoZW1lLmpzJykgPT09IGltcG9ydGVyICYmXG4gICAgICAgICFleGlzdHNTeW5jKHBhdGgucmVzb2x2ZSh0aGVtZU9wdGlvbnMuZnJvbnRlbmRHZW5lcmF0ZWRGb2xkZXIsIGlkKSlcbiAgICAgICkge1xuICAgICAgICBjb25zb2xlLmRlYnVnKCdHZW5lcmF0ZSB0aGVtZSBmaWxlICcgKyBpZCArICcgbm90IGV4aXN0aW5nLiBQcm9jZXNzaW5nIHRoZW1lIHJlc291cmNlJyk7XG4gICAgICAgIHByb2Nlc3NUaGVtZVJlc291cmNlcyhmdWxsVGhlbWVPcHRpb25zLCBjb25zb2xlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFpZC5zdGFydHNXaXRoKHNldHRpbmdzLnRoZW1lRm9sZGVyKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3QgbG9jYXRpb24gb2YgW3RoZW1lUmVzb3VyY2VGb2xkZXIsIGZyb250ZW5kRm9sZGVyXSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnJlc29sdmUocGF0aC5yZXNvbHZlKGxvY2F0aW9uLCBpZCkpO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgdHJhbnNmb3JtKHJhdywgaWQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIHJld3JpdGUgdXJscyBmb3IgdGhlIGFwcGxpY2F0aW9uIHRoZW1lIGNzcyBmaWxlc1xuICAgICAgY29uc3QgW2JhcmVJZCwgcXVlcnldID0gaWQuc3BsaXQoJz8nKTtcbiAgICAgIGlmIChcbiAgICAgICAgKCFiYXJlSWQ/LnN0YXJ0c1dpdGgodGhlbWVGb2xkZXIpICYmICFiYXJlSWQ/LnN0YXJ0c1dpdGgodGhlbWVPcHRpb25zLnRoZW1lUmVzb3VyY2VGb2xkZXIpKSB8fFxuICAgICAgICAhYmFyZUlkPy5lbmRzV2l0aCgnLmNzcycpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgW3RoZW1lTmFtZV0gPSBiYXJlSWQuc3Vic3RyaW5nKHRoZW1lRm9sZGVyLmxlbmd0aCArIDEpLnNwbGl0KCcvJyk7XG4gICAgICByZXR1cm4gcmV3cml0ZUNzc1VybHMocmF3LCBwYXRoLmRpcm5hbWUoYmFyZUlkKSwgcGF0aC5yZXNvbHZlKHRoZW1lRm9sZGVyLCB0aGVtZU5hbWUpLCBjb25zb2xlLCBvcHRzKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIHJ1bldhdGNoRG9nKHdhdGNoRG9nUG9ydCwgd2F0Y2hEb2dIb3N0KSB7XG4gIGNvbnN0IGNsaWVudCA9IG5ldC5Tb2NrZXQoKTtcbiAgY2xpZW50LnNldEVuY29kaW5nKCd1dGY4Jyk7XG4gIGNsaWVudC5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coJ1dhdGNoZG9nIGNvbm5lY3Rpb24gZXJyb3IuIFRlcm1pbmF0aW5nIHZpdGUgcHJvY2Vzcy4uLicsIGVycik7XG4gICAgY2xpZW50LmRlc3Ryb3koKTtcbiAgICBwcm9jZXNzLmV4aXQoMCk7XG4gIH0pO1xuICBjbGllbnQub24oJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgIGNsaWVudC5kZXN0cm95KCk7XG4gICAgcnVuV2F0Y2hEb2cod2F0Y2hEb2dQb3J0LCB3YXRjaERvZ0hvc3QpO1xuICB9KTtcblxuICBjbGllbnQuY29ubmVjdCh3YXRjaERvZ1BvcnQsIHdhdGNoRG9nSG9zdCB8fCAnbG9jYWxob3N0Jyk7XG59XG5cbmNvbnN0IGFsbG93ZWRGcm9udGVuZEZvbGRlcnMgPSBbZnJvbnRlbmRGb2xkZXIsIG5vZGVNb2R1bGVzRm9sZGVyXTtcblxuZnVuY3Rpb24gc2hvd1JlY29tcGlsZVJlYXNvbigpOiBQbHVnaW5PcHRpb24ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICd2YWFkaW46d2h5LXlvdS1jb21waWxlJyxcbiAgICBoYW5kbGVIb3RVcGRhdGUoY29udGV4dCkge1xuICAgICAgY29uc29sZS5sb2coJ1JlY29tcGlsaW5nIGJlY2F1c2UnLCBjb250ZXh0LmZpbGUsICdjaGFuZ2VkJyk7XG4gICAgfVxuICB9O1xufVxuXG5jb25zdCBERVZfTU9ERV9TVEFSVF9SRUdFWFAgPSAvXFwvXFwqW1xcKiFdXFxzK3ZhYWRpbi1kZXYtbW9kZTpzdGFydC87XG5jb25zdCBERVZfTU9ERV9DT0RFX1JFR0VYUCA9IC9cXC9cXCpbXFwqIV1cXHMrdmFhZGluLWRldi1tb2RlOnN0YXJ0KFtcXHNcXFNdKil2YWFkaW4tZGV2LW1vZGU6ZW5kXFxzK1xcKlxcKlxcLy9pO1xuXG5mdW5jdGlvbiBwcmVzZXJ2ZVVzYWdlU3RhdHMoKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3ZhYWRpbjpwcmVzZXJ2ZS11c2FnZS1zdGF0cycsXG5cbiAgICB0cmFuc2Zvcm0oc3JjOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcbiAgICAgIGlmIChpZC5pbmNsdWRlcygndmFhZGluLXVzYWdlLXN0YXRpc3RpY3MnKSkge1xuICAgICAgICBpZiAoc3JjLmluY2x1ZGVzKCd2YWFkaW4tZGV2LW1vZGU6c3RhcnQnKSkge1xuICAgICAgICAgIGNvbnN0IG5ld1NyYyA9IHNyYy5yZXBsYWNlKERFVl9NT0RFX1NUQVJUX1JFR0VYUCwgJy8qISB2YWFkaW4tZGV2LW1vZGU6c3RhcnQnKTtcbiAgICAgICAgICBpZiAobmV3U3JjID09PSBzcmMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0NvbW1lbnQgcmVwbGFjZW1lbnQgZmFpbGVkIHRvIGNoYW5nZSBhbnl0aGluZycpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIW5ld1NyYy5tYXRjaChERVZfTU9ERV9DT0RFX1JFR0VYUCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05ldyBjb21tZW50IGZhaWxzIHRvIG1hdGNoIG9yaWdpbmFsIHJlZ2V4cCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4geyBjb2RlOiBuZXdTcmMgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgY29kZTogc3JjIH07XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgY29uc3QgdmFhZGluQ29uZmlnOiBVc2VyQ29uZmlnRm4gPSAoZW52KSA9PiB7XG4gIGNvbnN0IGRldk1vZGUgPSBlbnYubW9kZSA9PT0gJ2RldmVsb3BtZW50JztcbiAgY29uc3QgcHJvZHVjdGlvbk1vZGUgPSAhZGV2TW9kZSAmJiAhZGV2QnVuZGxlXG5cbiAgaWYgKGRldk1vZGUgJiYgcHJvY2Vzcy5lbnYud2F0Y2hEb2dQb3J0KSB7XG4gICAgLy8gT3BlbiBhIGNvbm5lY3Rpb24gd2l0aCB0aGUgSmF2YSBkZXYtbW9kZSBoYW5kbGVyIGluIG9yZGVyIHRvIGZpbmlzaFxuICAgIC8vIHZpdGUgd2hlbiBpdCBleGl0cyBvciBjcmFzaGVzLlxuICAgIHJ1bldhdGNoRG9nKHByb2Nlc3MuZW52LndhdGNoRG9nUG9ydCwgcHJvY2Vzcy5lbnYud2F0Y2hEb2dIb3N0KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcm9vdDogZnJvbnRlbmRGb2xkZXIsXG4gICAgYmFzZTogJycsXG4gICAgcHVibGljRGlyOiBmYWxzZSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQHZhYWRpbi9mbG93LWZyb250ZW5kJzogamFyUmVzb3VyY2VzRm9sZGVyLFxuICAgICAgICBGcm9udGVuZDogZnJvbnRlbmRGb2xkZXJcbiAgICAgIH0sXG4gICAgICBwcmVzZXJ2ZVN5bWxpbmtzOiB0cnVlXG4gICAgfSxcbiAgICBkZWZpbmU6IHtcbiAgICAgIE9GRkxJTkVfUEFUSDogc2V0dGluZ3Mub2ZmbGluZVBhdGgsXG4gICAgICBWSVRFX0VOQUJMRUQ6ICd0cnVlJ1xuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBob3N0OiAnMTI3LjAuMC4xJyxcbiAgICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gICAgICBmczoge1xuICAgICAgICBhbGxvdzogYWxsb3dlZEZyb250ZW5kRm9sZGVyc1xuICAgICAgfVxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogYnVpbGRPdXRwdXRGb2xkZXIsXG4gICAgICBlbXB0eU91dERpcjogZGV2QnVuZGxlLFxuICAgICAgYXNzZXRzRGlyOiAnVkFBRElOL2J1aWxkJyxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICBpbmRleGh0bWw6IHByb2plY3RJbmRleEh0bWwsXG5cbiAgICAgICAgICAuLi4oaGFzRXhwb3J0ZWRXZWJDb21wb25lbnRzID8geyB3ZWJjb21wb25lbnRodG1sOiBwYXRoLnJlc29sdmUoZnJvbnRlbmRGb2xkZXIsICd3ZWItY29tcG9uZW50Lmh0bWwnKSB9IDoge30pXG4gICAgICAgIH0sXG4gICAgICAgIG9ud2FybjogKHdhcm5pbmc6IHJvbGx1cC5Sb2xsdXBXYXJuaW5nLCBkZWZhdWx0SGFuZGxlcjogcm9sbHVwLldhcm5pbmdIYW5kbGVyKSA9PiB7XG4gICAgICAgICAgY29uc3QgaWdub3JlRXZhbFdhcm5pbmcgPSBbXG4gICAgICAgICAgICAnZ2VuZXJhdGVkL2phci1yZXNvdXJjZXMvRmxvd0NsaWVudC5qcycsXG4gICAgICAgICAgICAnZ2VuZXJhdGVkL2phci1yZXNvdXJjZXMvdmFhZGluLXNwcmVhZHNoZWV0L3NwcmVhZHNoZWV0LWV4cG9ydC5qcycsXG4gICAgICAgICAgICAnQHZhYWRpbi9jaGFydHMvc3JjL2hlbHBlcnMuanMnXG4gICAgICAgICAgXTtcbiAgICAgICAgICBpZiAod2FybmluZy5jb2RlID09PSAnRVZBTCcgJiYgd2FybmluZy5pZCAmJiAhIWlnbm9yZUV2YWxXYXJuaW5nLmZpbmQoKGlkKSA9PiB3YXJuaW5nLmlkLmVuZHNXaXRoKGlkKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGVmYXVsdEhhbmRsZXIod2FybmluZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgZW50cmllczogW1xuICAgICAgICAvLyBQcmUtc2NhbiBlbnRyeXBvaW50cyBpbiBWaXRlIHRvIGF2b2lkIHJlbG9hZGluZyBvbiBmaXJzdCBvcGVuXG4gICAgICAgICdnZW5lcmF0ZWQvdmFhZGluLnRzJ1xuICAgICAgXSxcbiAgICAgIGV4Y2x1ZGU6IFtcbiAgICAgICAgJ0B2YWFkaW4vcm91dGVyJyxcbiAgICAgICAgJ0B2YWFkaW4vdmFhZGluLWxpY2Vuc2UtY2hlY2tlcicsXG4gICAgICAgICdAdmFhZGluL3ZhYWRpbi11c2FnZS1zdGF0aXN0aWNzJyxcbiAgICAgICAgJ3dvcmtib3gtY29yZScsXG4gICAgICAgICd3b3JrYm94LXByZWNhY2hpbmcnLFxuICAgICAgICAnd29ya2JveC1yb3V0aW5nJyxcbiAgICAgICAgJ3dvcmtib3gtc3RyYXRlZ2llcydcbiAgICAgIF1cbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIHByb2R1Y3Rpb25Nb2RlICYmIGJyb3RsaSgpLFxuICAgICAgZGV2TW9kZSAmJiB2YWFkaW5CdW5kbGVzUGx1Z2luKCksXG4gICAgICBkZXZNb2RlICYmIHNob3dSZWNvbXBpbGVSZWFzb24oKSxcbiAgICAgIHNldHRpbmdzLm9mZmxpbmVFbmFibGVkICYmIGJ1aWxkU1dQbHVnaW4oeyBkZXZNb2RlIH0pLFxuICAgICAgIWRldk1vZGUgJiYgc3RhdHNFeHRyYWN0ZXJQbHVnaW4oKSxcbiAgICAgIGRldkJ1bmRsZSAmJiBwcmVzZXJ2ZVVzYWdlU3RhdHMoKSxcbiAgICAgIHRoZW1lUGx1Z2luKHsgZGV2TW9kZSB9KSxcbiAgICAgIHBvc3Rjc3NMaXQoe1xuICAgICAgICBpbmNsdWRlOiBbJyoqLyouY3NzJywgLy4qXFwvLipcXC5jc3NcXD8uKi9dLFxuICAgICAgICBleGNsdWRlOiBbXG4gICAgICAgICAgYCR7dGhlbWVGb2xkZXJ9LyoqLyouY3NzYCxcbiAgICAgICAgICBuZXcgUmVnRXhwKGAke3RoZW1lRm9sZGVyfS8uKi8uKlxcXFwuY3NzXFxcXD8uKmApLFxuICAgICAgICAgIGAke3RoZW1lUmVzb3VyY2VGb2xkZXJ9LyoqLyouY3NzYCxcbiAgICAgICAgICBuZXcgUmVnRXhwKGAke3RoZW1lUmVzb3VyY2VGb2xkZXJ9Ly4qLy4qXFxcXC5jc3NcXFxcPy4qYCksXG4gICAgICAgICAgbmV3IFJlZ0V4cCgnLiovLipcXFxcP2h0bWwtcHJveHkuKicpXG4gICAgICAgIF1cbiAgICAgIH0pLFxuICAgICAge1xuICAgICAgICBuYW1lOiAndmFhZGluOmZvcmNlLXJlbW92ZS1odG1sLW1pZGRsZXdhcmUnLFxuICAgICAgICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyKSB7XG4gICAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHNlcnZlci5taWRkbGV3YXJlcy5zdGFjayA9IHNlcnZlci5taWRkbGV3YXJlcy5zdGFjay5maWx0ZXIoKG13KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGhhbmRsZU5hbWUgPSBgJHttdy5oYW5kbGV9YDtcbiAgICAgICAgICAgICAgcmV0dXJuICFoYW5kbGVOYW1lLmluY2x1ZGVzKCd2aXRlSHRtbEZhbGxiYWNrTWlkZGxld2FyZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBoYXNFeHBvcnRlZFdlYkNvbXBvbmVudHMgJiYge1xuICAgICAgICBuYW1lOiAndmFhZGluOmluamVjdC1lbnRyeXBvaW50cy10by13ZWItY29tcG9uZW50LWh0bWwnLFxuICAgICAgICB0cmFuc2Zvcm1JbmRleEh0bWw6IHtcbiAgICAgICAgICBvcmRlcjogJ3ByZScsXG4gICAgICAgICAgaGFuZGxlcihfaHRtbCwgeyBwYXRoLCBzZXJ2ZXIgfSkge1xuICAgICAgICAgICAgaWYgKHBhdGggIT09ICcvd2ViLWNvbXBvbmVudC5odG1sJykge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0YWc6ICdzY3JpcHQnLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6ICdtb2R1bGUnLCBzcmM6IGAvZ2VuZXJhdGVkL3ZhYWRpbi13ZWItY29tcG9uZW50LnRzYCB9LFxuICAgICAgICAgICAgICAgIGluamVjdFRvOiAnaGVhZCdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICd2YWFkaW46aW5qZWN0LWVudHJ5cG9pbnRzLXRvLWluZGV4LWh0bWwnLFxuICAgICAgICB0cmFuc2Zvcm1JbmRleEh0bWw6IHtcbiAgICAgICAgICBvcmRlcjogJ3ByZScsXG4gICAgICAgICAgaGFuZGxlcihfaHRtbCwgeyBwYXRoLCBzZXJ2ZXIgfSkge1xuICAgICAgICAgICAgaWYgKHBhdGggIT09ICcvaW5kZXguaHRtbCcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBzY3JpcHRzID0gW107XG5cbiAgICAgICAgICAgIGlmIChkZXZNb2RlKSB7XG4gICAgICAgICAgICAgIHNjcmlwdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgdGFnOiAnc2NyaXB0JyxcbiAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiAnbW9kdWxlJywgc3JjOiBgL2dlbmVyYXRlZC92aXRlLWRldm1vZGUudHNgIH0sXG4gICAgICAgICAgICAgICAgaW5qZWN0VG86ICdoZWFkJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjcmlwdHMucHVzaCh7XG4gICAgICAgICAgICAgIHRhZzogJ3NjcmlwdCcsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6ICdtb2R1bGUnLCBzcmM6ICcvZ2VuZXJhdGVkL3ZhYWRpbi50cycgfSxcbiAgICAgICAgICAgICAgaW5qZWN0VG86ICdoZWFkJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gc2NyaXB0cztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjaGVja2VyKHtcbiAgICAgICAgdHlwZXNjcmlwdDogdHJ1ZVxuICAgICAgfSksXG4gICAgICBwcm9kdWN0aW9uTW9kZSAmJiB2aXN1YWxpemVyKHsgYnJvdGxpU2l6ZTogdHJ1ZSwgZmlsZW5hbWU6IGJ1bmRsZVNpemVGaWxlIH0pXG4gICAgXVxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IG92ZXJyaWRlVmFhZGluQ29uZmlnID0gKGN1c3RvbUNvbmZpZzogVXNlckNvbmZpZ0ZuKSA9PiB7XG4gIHJldHVybiBkZWZpbmVDb25maWcoKGVudikgPT4gbWVyZ2VDb25maWcodmFhZGluQ29uZmlnKGVudiksIGN1c3RvbUNvbmZpZyhlbnYpKSk7XG59O1xuZnVuY3Rpb24gZ2V0VmVyc2lvbihtb2R1bGU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHBhY2thZ2VKc29uID0gcGF0aC5yZXNvbHZlKG5vZGVNb2R1bGVzRm9sZGVyLCBtb2R1bGUsICdwYWNrYWdlLmpzb24nKTtcbiAgcmV0dXJuIEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKHBhY2thZ2VKc29uLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pKS52ZXJzaW9uO1xufVxuZnVuY3Rpb24gZ2V0Q3ZkbE5hbWUobW9kdWxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBwYWNrYWdlSnNvbiA9IHBhdGgucmVzb2x2ZShub2RlTW9kdWxlc0ZvbGRlciwgbW9kdWxlLCAncGFja2FnZS5qc29uJyk7XG4gIHJldHVybiBKU09OLnBhcnNlKHJlYWRGaWxlU3luYyhwYWNrYWdlSnNvbiwgeyBlbmNvZGluZzogJ3V0Zi04JyB9KSkuY3ZkbE5hbWU7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXERldlxcXFx2YXVyb3JhXFxcXGF1cm9yYVxcXFx0YXJnZXRcXFxccGx1Z2luc1xcXFxhcHBsaWNhdGlvbi10aGVtZS1wbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXERldlxcXFx2YXVyb3JhXFxcXGF1cm9yYVxcXFx0YXJnZXRcXFxccGx1Z2luc1xcXFxhcHBsaWNhdGlvbi10aGVtZS1wbHVnaW5cXFxcdGhlbWUtaGFuZGxlLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9EZXYvdmF1cm9yYS9hdXJvcmEvdGFyZ2V0L3BsdWdpbnMvYXBwbGljYXRpb24tdGhlbWUtcGx1Z2luL3RoZW1lLWhhbmRsZS5qc1wiOy8qXG4gKiBDb3B5cmlnaHQgMjAwMC0yMDIzIFZhYWRpbiBMdGQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3RcbiAqIHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mXG4gKiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlclxuICogdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBUaGlzIGZpbGUgY29udGFpbnMgZnVuY3Rpb25zIGZvciBsb29rIHVwIGFuZCBoYW5kbGUgdGhlIHRoZW1lIHJlc291cmNlc1xuICogZm9yIGFwcGxpY2F0aW9uIHRoZW1lIHBsdWdpbi5cbiAqL1xuaW1wb3J0IHsgZXhpc3RzU3luYywgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgd3JpdGVUaGVtZUZpbGVzIH0gZnJvbSAnLi90aGVtZS1nZW5lcmF0b3IuanMnO1xuaW1wb3J0IHsgY29weVN0YXRpY0Fzc2V0cywgY29weVRoZW1lUmVzb3VyY2VzIH0gZnJvbSAnLi90aGVtZS1jb3B5LmpzJztcblxuLy8gbWF0Y2hlcyB0aGVtZSBuYW1lIGluICcuL3RoZW1lLW15LXRoZW1lLmdlbmVyYXRlZC5qcydcbmNvbnN0IG5hbWVSZWdleCA9IC90aGVtZS0oLiopXFwuZ2VuZXJhdGVkXFwuanMvO1xuXG5sZXQgcHJldlRoZW1lTmFtZSA9IHVuZGVmaW5lZDtcbmxldCBmaXJzdFRoZW1lTmFtZSA9IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBMb29rcyB1cCBmb3IgYSB0aGVtZSByZXNvdXJjZXMgaW4gYSBjdXJyZW50IHByb2plY3QgYW5kIGluIGphciBkZXBlbmRlbmNpZXMsXG4gKiBjb3BpZXMgdGhlIGZvdW5kIHJlc291cmNlcyBhbmQgZ2VuZXJhdGVzL3VwZGF0ZXMgbWV0YSBkYXRhIGZvciB3ZWJwYWNrXG4gKiBjb21waWxhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBhcHBsaWNhdGlvbiB0aGVtZSBwbHVnaW4gbWFuZGF0b3J5IG9wdGlvbnMsXG4gKiBAc2VlIHtAbGluayBBcHBsaWNhdGlvblRoZW1lUGx1Z2lufVxuICpcbiAqIEBwYXJhbSBsb2dnZXIgYXBwbGljYXRpb24gdGhlbWUgcGx1Z2luIGxvZ2dlclxuICovXG5mdW5jdGlvbiBwcm9jZXNzVGhlbWVSZXNvdXJjZXMob3B0aW9ucywgbG9nZ2VyKSB7XG4gIGNvbnN0IHRoZW1lTmFtZSA9IGV4dHJhY3RUaGVtZU5hbWUob3B0aW9ucy5mcm9udGVuZEdlbmVyYXRlZEZvbGRlcik7XG4gIGlmICh0aGVtZU5hbWUpIHtcbiAgICBpZiAoIXByZXZUaGVtZU5hbWUgJiYgIWZpcnN0VGhlbWVOYW1lKSB7XG4gICAgICBmaXJzdFRoZW1lTmFtZSA9IHRoZW1lTmFtZTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKHByZXZUaGVtZU5hbWUgJiYgcHJldlRoZW1lTmFtZSAhPT0gdGhlbWVOYW1lICYmIGZpcnN0VGhlbWVOYW1lICE9PSB0aGVtZU5hbWUpIHx8XG4gICAgICAoIXByZXZUaGVtZU5hbWUgJiYgZmlyc3RUaGVtZU5hbWUgIT09IHRoZW1lTmFtZSlcbiAgICApIHtcbiAgICAgIC8vIFdhcm5pbmcgbWVzc2FnZSBpcyBzaG93biB0byB0aGUgZGV2ZWxvcGVyIHdoZW46XG4gICAgICAvLyAxLiBIZSBpcyBzd2l0Y2hpbmcgdG8gYW55IHRoZW1lLCB3aGljaCBpcyBkaWZmZXIgZnJvbSBvbmUgYmVpbmcgc2V0IHVwXG4gICAgICAvLyBvbiBhcHBsaWNhdGlvbiBzdGFydHVwLCBieSBjaGFuZ2luZyB0aGVtZSBuYW1lIGluIGBAVGhlbWUoKWBcbiAgICAgIC8vIDIuIEhlIHJlbW92ZXMgb3IgY29tbWVudHMgb3V0IGBAVGhlbWUoKWAgdG8gc2VlIGhvdyB0aGUgYXBwXG4gICAgICAvLyBsb29rcyBsaWtlIHdpdGhvdXQgdGhlbWluZywgYW5kIHRoZW4gYWdhaW4gYnJpbmdzIGBAVGhlbWUoKWAgYmFja1xuICAgICAgLy8gd2l0aCBhIHRoZW1lTmFtZSB3aGljaCBpcyBkaWZmZXIgZnJvbSBvbmUgYmVpbmcgc2V0IHVwIG9uIGFwcGxpY2F0aW9uXG4gICAgICAvLyBzdGFydHVwLlxuICAgICAgY29uc3Qgd2FybmluZyA9IGBBdHRlbnRpb246IEFjdGl2ZSB0aGVtZSBpcyBzd2l0Y2hlZCB0byAnJHt0aGVtZU5hbWV9Jy5gO1xuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBgXG4gICAgICBOb3RlIHRoYXQgYWRkaW5nIG5ldyBzdHlsZSBzaGVldCBmaWxlcyB0byAnL3RoZW1lcy8ke3RoZW1lTmFtZX0vY29tcG9uZW50cycsIFxuICAgICAgbWF5IG5vdCBiZSB0YWtlbiBpbnRvIGVmZmVjdCB1bnRpbCB0aGUgbmV4dCBhcHBsaWNhdGlvbiByZXN0YXJ0LlxuICAgICAgQ2hhbmdlcyB0byBhbHJlYWR5IGV4aXN0aW5nIHN0eWxlIHNoZWV0IGZpbGVzIGFyZSBiZWluZyByZWxvYWRlZCBhcyBiZWZvcmUuYDtcbiAgICAgIGxvZ2dlci53YXJuKCcqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqJyk7XG4gICAgICBsb2dnZXIud2Fybih3YXJuaW5nKTtcbiAgICAgIGxvZ2dlci53YXJuKGRlc2NyaXB0aW9uKTtcbiAgICAgIGxvZ2dlci53YXJuKCcqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqJyk7XG4gICAgfVxuICAgIHByZXZUaGVtZU5hbWUgPSB0aGVtZU5hbWU7XG5cbiAgICBmaW5kVGhlbWVGb2xkZXJBbmRIYW5kbGVUaGVtZSh0aGVtZU5hbWUsIG9wdGlvbnMsIGxvZ2dlcik7XG4gIH0gZWxzZSB7XG4gICAgLy8gVGhpcyBpcyBuZWVkZWQgaW4gdGhlIHNpdHVhdGlvbiB0aGF0IHRoZSB1c2VyIGRlY2lkZXMgdG8gY29tbWVudCBvclxuICAgIC8vIHJlbW92ZSB0aGUgQFRoZW1lKC4uLikgY29tcGxldGVseSB0byBzZWUgaG93IHRoZSBhcHBsaWNhdGlvbiBsb29rc1xuICAgIC8vIHdpdGhvdXQgYW55IHRoZW1lLiBUaGVuIHdoZW4gdGhlIHVzZXIgYnJpbmdzIGJhY2sgb25lIG9mIHRoZSB0aGVtZXMsXG4gICAgLy8gdGhlIHByZXZpb3VzIHRoZW1lIHNob3VsZCBiZSB1bmRlZmluZWQgdG8gZW5hYmxlIHVzIHRvIGRldGVjdCB0aGUgY2hhbmdlLlxuICAgIHByZXZUaGVtZU5hbWUgPSB1bmRlZmluZWQ7XG4gICAgbG9nZ2VyLmRlYnVnKCdTa2lwcGluZyBWYWFkaW4gYXBwbGljYXRpb24gdGhlbWUgaGFuZGxpbmcuJyk7XG4gICAgbG9nZ2VyLnRyYWNlKCdNb3N0IGxpa2VseSBubyBAVGhlbWUgYW5ub3RhdGlvbiBmb3IgYXBwbGljYXRpb24gb3Igb25seSB0aGVtZUNsYXNzIHVzZWQuJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBTZWFyY2ggZm9yIHRoZSBnaXZlbiB0aGVtZSBpbiB0aGUgcHJvamVjdCBhbmQgcmVzb3VyY2UgZm9sZGVycy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGhlbWVOYW1lIG5hbWUgb2YgdGhlbWUgdG8gZmluZFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgYXBwbGljYXRpb24gdGhlbWUgcGx1Z2luIG1hbmRhdG9yeSBvcHRpb25zLFxuICogQHNlZSB7QGxpbmsgQXBwbGljYXRpb25UaGVtZVBsdWdpbn1cbiAqIEBwYXJhbSBsb2dnZXIgYXBwbGljYXRpb24gdGhlbWUgcGx1Z2luIGxvZ2dlclxuICogQHJldHVybiB0cnVlIG9yIGZhbHNlIGZvciBpZiB0aGVtZSB3YXMgZm91bmRcbiAqL1xuZnVuY3Rpb24gZmluZFRoZW1lRm9sZGVyQW5kSGFuZGxlVGhlbWUodGhlbWVOYW1lLCBvcHRpb25zLCBsb2dnZXIpIHtcbiAgbGV0IHRoZW1lRm91bmQgPSBmYWxzZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLnRoZW1lUHJvamVjdEZvbGRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB0aGVtZVByb2plY3RGb2xkZXIgPSBvcHRpb25zLnRoZW1lUHJvamVjdEZvbGRlcnNbaV07XG4gICAgaWYgKGV4aXN0c1N5bmModGhlbWVQcm9qZWN0Rm9sZGVyKSkge1xuICAgICAgbG9nZ2VyLmRlYnVnKFwiU2VhcmNoaW5nIHRoZW1lcyBmb2xkZXIgJ1wiICsgdGhlbWVQcm9qZWN0Rm9sZGVyICsgXCInIGZvciB0aGVtZSAnXCIgKyB0aGVtZU5hbWUgKyBcIidcIik7XG4gICAgICBjb25zdCBoYW5kbGVkID0gaGFuZGxlVGhlbWVzKHRoZW1lTmFtZSwgdGhlbWVQcm9qZWN0Rm9sZGVyLCBvcHRpb25zLCBsb2dnZXIpO1xuICAgICAgaWYgKGhhbmRsZWQpIHtcbiAgICAgICAgaWYgKHRoZW1lRm91bmQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBcIkZvdW5kIHRoZW1lIGZpbGVzIGluICdcIiArXG4gICAgICAgICAgICAgIHRoZW1lUHJvamVjdEZvbGRlciArXG4gICAgICAgICAgICAgIFwiJyBhbmQgJ1wiICtcbiAgICAgICAgICAgICAgdGhlbWVGb3VuZCArXG4gICAgICAgICAgICAgIFwiJy4gVGhlbWUgc2hvdWxkIG9ubHkgYmUgYXZhaWxhYmxlIGluIG9uZSBmb2xkZXJcIlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgbG9nZ2VyLmRlYnVnKFwiRm91bmQgdGhlbWUgZmlsZXMgZnJvbSAnXCIgKyB0aGVtZVByb2plY3RGb2xkZXIgKyBcIidcIik7XG4gICAgICAgIHRoZW1lRm91bmQgPSB0aGVtZVByb2plY3RGb2xkZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGV4aXN0c1N5bmMob3B0aW9ucy50aGVtZVJlc291cmNlRm9sZGVyKSkge1xuICAgIGlmICh0aGVtZUZvdW5kICYmIGV4aXN0c1N5bmMocmVzb2x2ZShvcHRpb25zLnRoZW1lUmVzb3VyY2VGb2xkZXIsIHRoZW1lTmFtZSkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiVGhlbWUgJ1wiICtcbiAgICAgICAgICB0aGVtZU5hbWUgK1xuICAgICAgICAgIFwiJ3Nob3VsZCBub3QgZXhpc3QgaW5zaWRlIGEgamFyIGFuZCBpbiB0aGUgcHJvamVjdCBhdCB0aGUgc2FtZSB0aW1lXFxuXCIgK1xuICAgICAgICAgICdFeHRlbmRpbmcgYW5vdGhlciB0aGVtZSBpcyBwb3NzaWJsZSBieSBhZGRpbmcgeyBcInBhcmVudFwiOiBcIm15LXBhcmVudC10aGVtZVwiIH0gZW50cnkgdG8gdGhlIHRoZW1lLmpzb24gZmlsZSBpbnNpZGUgeW91ciB0aGVtZSBmb2xkZXIuJ1xuICAgICAgKTtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKFxuICAgICAgXCJTZWFyY2hpbmcgdGhlbWUgamFyIHJlc291cmNlIGZvbGRlciAnXCIgKyBvcHRpb25zLnRoZW1lUmVzb3VyY2VGb2xkZXIgKyBcIicgZm9yIHRoZW1lICdcIiArIHRoZW1lTmFtZSArIFwiJ1wiXG4gICAgKTtcbiAgICBoYW5kbGVUaGVtZXModGhlbWVOYW1lLCBvcHRpb25zLnRoZW1lUmVzb3VyY2VGb2xkZXIsIG9wdGlvbnMsIGxvZ2dlcik7XG4gICAgdGhlbWVGb3VuZCA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIHRoZW1lRm91bmQ7XG59XG5cbi8qKlxuICogQ29waWVzIHN0YXRpYyByZXNvdXJjZXMgZm9yIHRoZW1lIGFuZCBnZW5lcmF0ZXMvd3JpdGVzIHRoZVxuICogW3RoZW1lLW5hbWVdLmdlbmVyYXRlZC5qcyBmb3Igd2VicGFjayB0byBoYW5kbGUuXG4gKlxuICogTm90ZSEgSWYgYSBwYXJlbnQgdGhlbWUgaXMgZGVmaW5lZCBpdCB3aWxsIGFsc28gYmUgaGFuZGxlZCBoZXJlIHNvIHRoYXQgdGhlIHBhcmVudCB0aGVtZSBnZW5lcmF0ZWQgZmlsZSBpc1xuICogZ2VuZXJhdGVkIGluIGFkdmFuY2Ugb2YgdGhlIHRoZW1lIGdlbmVyYXRlZCBmaWxlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGVtZU5hbWUgbmFtZSBvZiB0aGVtZSB0byBoYW5kbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGVtZXNGb2xkZXIgZm9sZGVyIGNvbnRhaW5pbmcgYXBwbGljYXRpb24gdGhlbWUgZm9sZGVyc1xuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgYXBwbGljYXRpb24gdGhlbWUgcGx1Z2luIG1hbmRhdG9yeSBvcHRpb25zLFxuICogQHNlZSB7QGxpbmsgQXBwbGljYXRpb25UaGVtZVBsdWdpbn1cbiAqIEBwYXJhbSB7b2JqZWN0fSBsb2dnZXIgcGx1Z2luIGxvZ2dlciBpbnN0YW5jZVxuICpcbiAqIEB0aHJvd3MgRXJyb3IgaWYgcGFyZW50IHRoZW1lIGRlZmluZWQsIGJ1dCBjYW4ndCBsb2NhdGUgcGFyZW50IHRoZW1lXG4gKlxuICogQHJldHVybnMgdHJ1ZSBpZiB0aGVtZSB3YXMgZm91bmQgZWxzZSBmYWxzZS5cbiAqL1xuZnVuY3Rpb24gaGFuZGxlVGhlbWVzKHRoZW1lTmFtZSwgdGhlbWVzRm9sZGVyLCBvcHRpb25zLCBsb2dnZXIpIHtcbiAgY29uc3QgdGhlbWVGb2xkZXIgPSByZXNvbHZlKHRoZW1lc0ZvbGRlciwgdGhlbWVOYW1lKTtcbiAgaWYgKGV4aXN0c1N5bmModGhlbWVGb2xkZXIpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdGb3VuZCB0aGVtZSAnLCB0aGVtZU5hbWUsICcgaW4gZm9sZGVyICcsIHRoZW1lRm9sZGVyKTtcblxuICAgIGNvbnN0IHRoZW1lUHJvcGVydGllcyA9IGdldFRoZW1lUHJvcGVydGllcyh0aGVtZUZvbGRlcik7XG5cbiAgICAvLyBJZiB0aGVtZSBoYXMgcGFyZW50IGhhbmRsZSBwYXJlbnQgdGhlbWUgaW1tZWRpYXRlbHkuXG4gICAgaWYgKHRoZW1lUHJvcGVydGllcy5wYXJlbnQpIHtcbiAgICAgIGNvbnN0IGZvdW5kID0gZmluZFRoZW1lRm9sZGVyQW5kSGFuZGxlVGhlbWUodGhlbWVQcm9wZXJ0aWVzLnBhcmVudCwgb3B0aW9ucywgbG9nZ2VyKTtcbiAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIFwiQ291bGQgbm90IGxvY2F0ZSBmaWxlcyBmb3IgZGVmaW5lZCBwYXJlbnQgdGhlbWUgJ1wiICtcbiAgICAgICAgICAgIHRoZW1lUHJvcGVydGllcy5wYXJlbnQgK1xuICAgICAgICAgICAgXCInLlxcblwiICtcbiAgICAgICAgICAgICdQbGVhc2UgdmVyaWZ5IHRoYXQgZGVwZW5kZW5jeSBpcyBhZGRlZCBvciB0aGVtZSBmb2xkZXIgZXhpc3RzLidcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29weVN0YXRpY0Fzc2V0cyh0aGVtZU5hbWUsIHRoZW1lUHJvcGVydGllcywgb3B0aW9ucy5wcm9qZWN0U3RhdGljQXNzZXRzT3V0cHV0Rm9sZGVyLCBsb2dnZXIpO1xuICAgIGNvcHlUaGVtZVJlc291cmNlcyh0aGVtZUZvbGRlciwgb3B0aW9ucy5wcm9qZWN0U3RhdGljQXNzZXRzT3V0cHV0Rm9sZGVyLCBsb2dnZXIpO1xuXG4gICAgd3JpdGVUaGVtZUZpbGVzKHRoZW1lRm9sZGVyLCB0aGVtZU5hbWUsIHRoZW1lUHJvcGVydGllcywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnZXRUaGVtZVByb3BlcnRpZXModGhlbWVGb2xkZXIpIHtcbiAgY29uc3QgdGhlbWVQcm9wZXJ0eUZpbGUgPSByZXNvbHZlKHRoZW1lRm9sZGVyLCAndGhlbWUuanNvbicpO1xuICBpZiAoIWV4aXN0c1N5bmModGhlbWVQcm9wZXJ0eUZpbGUpKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG4gIGNvbnN0IHRoZW1lUHJvcGVydHlGaWxlQXNTdHJpbmcgPSByZWFkRmlsZVN5bmModGhlbWVQcm9wZXJ0eUZpbGUpO1xuICBpZiAodGhlbWVQcm9wZXJ0eUZpbGVBc1N0cmluZy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ge307XG4gIH1cbiAgcmV0dXJuIEpTT04ucGFyc2UodGhlbWVQcm9wZXJ0eUZpbGVBc1N0cmluZyk7XG59XG5cbi8qKlxuICogRXh0cmFjdHMgY3VycmVudCB0aGVtZSBuYW1lIGZyb20gYXV0by1nZW5lcmF0ZWQgJ3RoZW1lLmpzJyBmaWxlIGxvY2F0ZWQgb24gYVxuICogZ2l2ZW4gZm9sZGVyLlxuICogQHBhcmFtIGZyb250ZW5kR2VuZXJhdGVkRm9sZGVyIGZvbGRlciBpbiBwcm9qZWN0IGNvbnRhaW5pbmcgJ3RoZW1lLmpzJyBmaWxlXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjdXJyZW50IHRoZW1lIG5hbWVcbiAqL1xuZnVuY3Rpb24gZXh0cmFjdFRoZW1lTmFtZShmcm9udGVuZEdlbmVyYXRlZEZvbGRlcikge1xuICBpZiAoIWZyb250ZW5kR2VuZXJhdGVkRm9sZGVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCJDb3VsZG4ndCBleHRyYWN0IHRoZW1lIG5hbWUgZnJvbSAndGhlbWUuanMnLFwiICtcbiAgICAgICAgJyBiZWNhdXNlIHRoZSBwYXRoIHRvIGZvbGRlciBjb250YWluaW5nIHRoaXMgZmlsZSBpcyBlbXB0eS4gUGxlYXNlIHNldCcgK1xuICAgICAgICAnIHRoZSBhIGNvcnJlY3QgZm9sZGVyIHBhdGggaW4gQXBwbGljYXRpb25UaGVtZVBsdWdpbiBjb25zdHJ1Y3RvcicgK1xuICAgICAgICAnIHBhcmFtZXRlcnMuJ1xuICAgICk7XG4gIH1cbiAgY29uc3QgZ2VuZXJhdGVkVGhlbWVGaWxlID0gcmVzb2x2ZShmcm9udGVuZEdlbmVyYXRlZEZvbGRlciwgJ3RoZW1lLmpzJyk7XG4gIGlmIChleGlzdHNTeW5jKGdlbmVyYXRlZFRoZW1lRmlsZSkpIHtcbiAgICAvLyByZWFkIHRoZW1lIG5hbWUgZnJvbSB0aGUgJ2dlbmVyYXRlZC90aGVtZS5qcycgYXMgdGhlcmUgd2UgYWx3YXlzXG4gICAgLy8gbWFyayB0aGUgdXNlZCB0aGVtZSBmb3Igd2VicGFjayB0byBoYW5kbGUuXG4gICAgY29uc3QgdGhlbWVOYW1lID0gbmFtZVJlZ2V4LmV4ZWMocmVhZEZpbGVTeW5jKGdlbmVyYXRlZFRoZW1lRmlsZSwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pKVsxXTtcbiAgICBpZiAoIXRoZW1lTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgcGFyc2UgdGhlbWUgbmFtZSBmcm9tICdcIiArIGdlbmVyYXRlZFRoZW1lRmlsZSArIFwiJy5cIik7XG4gICAgfVxuICAgIHJldHVybiB0aGVtZU5hbWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbi8qKlxuICogRmluZHMgYWxsIHRoZSBwYXJlbnQgdGhlbWVzIGxvY2F0ZWQgaW4gdGhlIHByb2plY3QgdGhlbWVzIGZvbGRlcnMgYW5kIGluXG4gKiB0aGUgSkFSIGRlcGVuZGVuY2llcyB3aXRoIHJlc3BlY3QgdG8gdGhlIGdpdmVuIGN1c3RvbSB0aGVtZSB3aXRoXG4gKiB7QGNvZGUgdGhlbWVOYW1lfS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGVtZU5hbWUgZ2l2ZW4gY3VzdG9tIHRoZW1lIG5hbWUgdG8gbG9vayBwYXJlbnRzIGZvclxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgYXBwbGljYXRpb24gdGhlbWUgcGx1Z2luIG1hbmRhdG9yeSBvcHRpb25zLFxuICogQHNlZSB7QGxpbmsgQXBwbGljYXRpb25UaGVtZVBsdWdpbn1cbiAqIEByZXR1cm5zIHtzdHJpbmdbXX0gYXJyYXkgb2YgcGF0aHMgdG8gZm91bmQgcGFyZW50IHRoZW1lcyB3aXRoIHJlc3BlY3QgdG8gdGhlXG4gKiBnaXZlbiBjdXN0b20gdGhlbWVcbiAqL1xuZnVuY3Rpb24gZmluZFBhcmVudFRoZW1lcyh0aGVtZU5hbWUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZXhpc3RpbmdUaGVtZUZvbGRlcnMgPSBbb3B0aW9ucy50aGVtZVJlc291cmNlRm9sZGVyLCAuLi5vcHRpb25zLnRoZW1lUHJvamVjdEZvbGRlcnNdLmZpbHRlcigoZm9sZGVyKSA9PlxuICAgIGV4aXN0c1N5bmMoZm9sZGVyKVxuICApO1xuICByZXR1cm4gY29sbGVjdFBhcmVudFRoZW1lcyh0aGVtZU5hbWUsIGV4aXN0aW5nVGhlbWVGb2xkZXJzLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3RQYXJlbnRUaGVtZXModGhlbWVOYW1lLCB0aGVtZUZvbGRlcnMsIGlzUGFyZW50KSB7XG4gIGxldCBmb3VuZFBhcmVudFRoZW1lcyA9IFtdO1xuICB0aGVtZUZvbGRlcnMuZm9yRWFjaCgoZm9sZGVyKSA9PiB7XG4gICAgY29uc3QgdGhlbWVGb2xkZXIgPSByZXNvbHZlKGZvbGRlciwgdGhlbWVOYW1lKTtcbiAgICBpZiAoZXhpc3RzU3luYyh0aGVtZUZvbGRlcikpIHtcbiAgICAgIGNvbnN0IHRoZW1lUHJvcGVydGllcyA9IGdldFRoZW1lUHJvcGVydGllcyh0aGVtZUZvbGRlcik7XG5cbiAgICAgIGlmICh0aGVtZVByb3BlcnRpZXMucGFyZW50KSB7XG4gICAgICAgIGZvdW5kUGFyZW50VGhlbWVzLnB1c2goLi4uY29sbGVjdFBhcmVudFRoZW1lcyh0aGVtZVByb3BlcnRpZXMucGFyZW50LCB0aGVtZUZvbGRlcnMsIHRydWUpKTtcbiAgICAgICAgaWYgKCFmb3VuZFBhcmVudFRoZW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBcIkNvdWxkIG5vdCBsb2NhdGUgZmlsZXMgZm9yIGRlZmluZWQgcGFyZW50IHRoZW1lICdcIiArXG4gICAgICAgICAgICAgIHRoZW1lUHJvcGVydGllcy5wYXJlbnQgK1xuICAgICAgICAgICAgICBcIicuXFxuXCIgK1xuICAgICAgICAgICAgICAnUGxlYXNlIHZlcmlmeSB0aGF0IGRlcGVuZGVuY3kgaXMgYWRkZWQgb3IgdGhlbWUgZm9sZGVyIGV4aXN0cy4nXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gQWRkIGEgdGhlbWUgcGF0aCB0byByZXN1bHQgY29sbGVjdGlvbiBvbmx5IGlmIGEgZ2l2ZW4gdGhlbWVOYW1lXG4gICAgICAvLyBpcyBzdXBwb3NlZCB0byBiZSBhIHBhcmVudCB0aGVtZVxuICAgICAgaWYgKGlzUGFyZW50KSB7XG4gICAgICAgIGZvdW5kUGFyZW50VGhlbWVzLnB1c2godGhlbWVGb2xkZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmb3VuZFBhcmVudFRoZW1lcztcbn1cblxuZXhwb3J0IHsgcHJvY2Vzc1RoZW1lUmVzb3VyY2VzLCBleHRyYWN0VGhlbWVOYW1lLCBmaW5kUGFyZW50VGhlbWVzIH07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXERldlxcXFx2YXVyb3JhXFxcXGF1cm9yYVxcXFx0YXJnZXRcXFxccGx1Z2luc1xcXFxhcHBsaWNhdGlvbi10aGVtZS1wbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXERldlxcXFx2YXVyb3JhXFxcXGF1cm9yYVxcXFx0YXJnZXRcXFxccGx1Z2luc1xcXFxhcHBsaWNhdGlvbi10aGVtZS1wbHVnaW5cXFxcdGhlbWUtZ2VuZXJhdG9yLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9EZXYvdmF1cm9yYS9hdXJvcmEvdGFyZ2V0L3BsdWdpbnMvYXBwbGljYXRpb24tdGhlbWUtcGx1Z2luL3RoZW1lLWdlbmVyYXRvci5qc1wiOy8qXG4gKiBDb3B5cmlnaHQgMjAwMC0yMDI0IFZhYWRpbiBMdGQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3RcbiAqIHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mXG4gKiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlclxuICogdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBUaGlzIGZpbGUgaGFuZGxlcyB0aGUgZ2VuZXJhdGlvbiBvZiB0aGUgJ1t0aGVtZS1uYW1lXS5qcycgdG9cbiAqIHRoZSB0aGVtZXMvW3RoZW1lLW5hbWVdIGZvbGRlciBhY2NvcmRpbmcgdG8gcHJvcGVydGllcyBmcm9tICd0aGVtZS5qc29uJy5cbiAqL1xuaW1wb3J0IHsgZ2xvYlN5bmMgfSBmcm9tICdnbG9iJztcbmltcG9ydCB7IHJlc29sdmUsIGJhc2VuYW1lIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBleGlzdHNTeW5jLCByZWFkRmlsZVN5bmMsIHdyaXRlRmlsZVN5bmMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBjaGVja01vZHVsZXMgfSBmcm9tICcuL3RoZW1lLWNvcHkuanMnO1xuXG4vLyBTcGVjaWFsIGZvbGRlciBpbnNpZGUgYSB0aGVtZSBmb3IgY29tcG9uZW50IHRoZW1lcyB0aGF0IGdvIGluc2lkZSB0aGUgY29tcG9uZW50IHNoYWRvdyByb290XG5jb25zdCB0aGVtZUNvbXBvbmVudHNGb2xkZXIgPSAnY29tcG9uZW50cyc7XG4vLyBUaGUgY29udGVudHMgb2YgYSBnbG9iYWwgQ1NTIGZpbGUgd2l0aCB0aGlzIG5hbWUgaW4gYSB0aGVtZSBpcyBhbHdheXMgYWRkZWQgdG9cbi8vIHRoZSBkb2N1bWVudC4gRS5nLiBAZm9udC1mYWNlIG11c3QgYmUgaW4gdGhpc1xuY29uc3QgZG9jdW1lbnRDc3NGaWxlbmFtZSA9ICdkb2N1bWVudC5jc3MnO1xuLy8gc3R5bGVzLmNzcyBpcyB0aGUgb25seSBlbnRyeXBvaW50IGNzcyBmaWxlIHdpdGggZG9jdW1lbnQuY3NzLiBFdmVyeXRoaW5nIGVsc2Ugc2hvdWxkIGJlIGltcG9ydGVkIHVzaW5nIGNzcyBAaW1wb3J0XG5jb25zdCBzdHlsZXNDc3NGaWxlbmFtZSA9ICdzdHlsZXMuY3NzJztcblxuY29uc3QgQ1NTSU1QT1JUX0NPTU1FTlQgPSAnQ1NTSW1wb3J0IGVuZCc7XG5jb25zdCBoZWFkZXJJbXBvcnQgPSBgaW1wb3J0ICdjb25zdHJ1Y3Qtc3R5bGUtc2hlZXRzLXBvbHlmaWxsJztcbmA7XG5cbi8qKlxuICogR2VuZXJhdGUgdGhlIFt0aGVtZU5hbWVdLmpzIGZpbGUgZm9yIHRoZW1lRm9sZGVyIHdoaWNoIGNvbGxlY3RzIGFsbCByZXF1aXJlZCBpbmZvcm1hdGlvbiBmcm9tIHRoZSBmb2xkZXIuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRoZW1lRm9sZGVyIGZvbGRlciBvZiB0aGUgdGhlbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGVtZU5hbWUgbmFtZSBvZiB0aGUgaGFuZGxlZCB0aGVtZVxuICogQHBhcmFtIHtKU09OfSB0aGVtZVByb3BlcnRpZXMgY29udGVudCBvZiB0aGVtZS5qc29uXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBidWlsZCBvcHRpb25zIChlLmcuIHByb2Qgb3IgZGV2IG1vZGUpXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGVtZSBmaWxlIGNvbnRlbnRcbiAqL1xuZnVuY3Rpb24gd3JpdGVUaGVtZUZpbGVzKHRoZW1lRm9sZGVyLCB0aGVtZU5hbWUsIHRoZW1lUHJvcGVydGllcywgb3B0aW9ucykge1xuICBjb25zdCBwcm9kdWN0aW9uTW9kZSA9ICFvcHRpb25zLmRldk1vZGU7XG4gIGNvbnN0IHVzZURldlNlcnZlck9ySW5Qcm9kdWN0aW9uTW9kZSA9ICFvcHRpb25zLnVzZURldkJ1bmRsZTtcbiAgY29uc3Qgb3V0cHV0Rm9sZGVyID0gb3B0aW9ucy5mcm9udGVuZEdlbmVyYXRlZEZvbGRlcjtcbiAgY29uc3Qgc3R5bGVzID0gcmVzb2x2ZSh0aGVtZUZvbGRlciwgc3R5bGVzQ3NzRmlsZW5hbWUpO1xuICBjb25zdCBkb2N1bWVudENzc0ZpbGUgPSByZXNvbHZlKHRoZW1lRm9sZGVyLCBkb2N1bWVudENzc0ZpbGVuYW1lKTtcbiAgY29uc3QgYXV0b0luamVjdENvbXBvbmVudHMgPSB0aGVtZVByb3BlcnRpZXMuYXV0b0luamVjdENvbXBvbmVudHMgPz8gdHJ1ZTtcbiAgY29uc3QgZ2xvYmFsRmlsZW5hbWUgPSAndGhlbWUtJyArIHRoZW1lTmFtZSArICcuZ2xvYmFsLmdlbmVyYXRlZC5qcyc7XG4gIGNvbnN0IGNvbXBvbmVudHNGaWxlbmFtZSA9ICd0aGVtZS0nICsgdGhlbWVOYW1lICsgJy5jb21wb25lbnRzLmdlbmVyYXRlZC5qcyc7XG4gIGNvbnN0IHRoZW1lRmlsZW5hbWUgPSAndGhlbWUtJyArIHRoZW1lTmFtZSArICcuZ2VuZXJhdGVkLmpzJztcblxuICBsZXQgdGhlbWVGaWxlQ29udGVudCA9IGhlYWRlckltcG9ydDtcbiAgbGV0IGdsb2JhbEltcG9ydENvbnRlbnQgPSAnLy8gV2hlbiB0aGlzIGZpbGUgaXMgaW1wb3J0ZWQsIGdsb2JhbCBzdHlsZXMgYXJlIGF1dG9tYXRpY2FsbHkgYXBwbGllZFxcbic7XG4gIGxldCBjb21wb25lbnRzRmlsZUNvbnRlbnQgPSAnJztcbiAgdmFyIGNvbXBvbmVudHNGaWxlcztcblxuICBpZiAoYXV0b0luamVjdENvbXBvbmVudHMpIHtcbiAgICBjb21wb25lbnRzRmlsZXMgPSBnbG9iU3luYygnKi5jc3MnLCB7XG4gICAgICBjd2Q6IHJlc29sdmUodGhlbWVGb2xkZXIsIHRoZW1lQ29tcG9uZW50c0ZvbGRlciksXG4gICAgICBub2RpcjogdHJ1ZVxuICAgIH0pO1xuXG4gICAgaWYgKGNvbXBvbmVudHNGaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb21wb25lbnRzRmlsZUNvbnRlbnQgKz1cbiAgICAgICAgXCJpbXBvcnQgeyB1bnNhZmVDU1MsIHJlZ2lzdGVyU3R5bGVzIH0gZnJvbSAnQHZhYWRpbi92YWFkaW4tdGhlbWFibGUtbWl4aW4vcmVnaXN0ZXItc3R5bGVzJztcXG5cIjtcbiAgICB9XG4gIH1cblxuICBpZiAodGhlbWVQcm9wZXJ0aWVzLnBhcmVudCkge1xuICAgIHRoZW1lRmlsZUNvbnRlbnQgKz0gYGltcG9ydCB7IGFwcGx5VGhlbWUgYXMgYXBwbHlCYXNlVGhlbWUgfSBmcm9tICcuL3RoZW1lLSR7dGhlbWVQcm9wZXJ0aWVzLnBhcmVudH0uZ2VuZXJhdGVkLmpzJztcXG5gO1xuICB9XG5cbiAgdGhlbWVGaWxlQ29udGVudCArPSBgaW1wb3J0IHsgaW5qZWN0R2xvYmFsQ3NzIH0gZnJvbSAnRnJvbnRlbmQvZ2VuZXJhdGVkL2phci1yZXNvdXJjZXMvdGhlbWUtdXRpbC5qcyc7XFxuYDtcbiAgdGhlbWVGaWxlQ29udGVudCArPSBgaW1wb3J0ICcuLyR7Y29tcG9uZW50c0ZpbGVuYW1lfSc7XFxuYDtcblxuICB0aGVtZUZpbGVDb250ZW50ICs9IGBsZXQgbmVlZHNSZWxvYWRPbkNoYW5nZXMgPSBmYWxzZTtcXG5gO1xuICBjb25zdCBpbXBvcnRzID0gW107XG4gIGNvbnN0IGNvbXBvbmVudENzc0ltcG9ydHMgPSBbXTtcbiAgY29uc3QgZ2xvYmFsRmlsZUNvbnRlbnQgPSBbXTtcbiAgY29uc3QgZ2xvYmFsQ3NzQ29kZSA9IFtdO1xuICBjb25zdCBzaGFkb3dPbmx5Q3NzID0gW107XG4gIGNvbnN0IGNvbXBvbmVudENzc0NvZGUgPSBbXTtcbiAgY29uc3QgcGFyZW50VGhlbWUgPSB0aGVtZVByb3BlcnRpZXMucGFyZW50ID8gJ2FwcGx5QmFzZVRoZW1lKHRhcmdldCk7XFxuJyA6ICcnO1xuICBjb25zdCBwYXJlbnRUaGVtZUdsb2JhbEltcG9ydCA9IHRoZW1lUHJvcGVydGllcy5wYXJlbnRcbiAgICA/IGBpbXBvcnQgJy4vdGhlbWUtJHt0aGVtZVByb3BlcnRpZXMucGFyZW50fS5nbG9iYWwuZ2VuZXJhdGVkLmpzJztcXG5gXG4gICAgOiAnJztcblxuICBjb25zdCB0aGVtZUlkZW50aWZpZXIgPSAnX3ZhYWRpbnRoZW1lXycgKyB0aGVtZU5hbWUgKyAnXyc7XG4gIGNvbnN0IGx1bW9Dc3NGbGFnID0gJ192YWFkaW50aGVtZWx1bW9pbXBvcnRzXyc7XG4gIGNvbnN0IGdsb2JhbENzc0ZsYWcgPSB0aGVtZUlkZW50aWZpZXIgKyAnZ2xvYmFsQ3NzJztcbiAgY29uc3QgY29tcG9uZW50Q3NzRmxhZyA9IHRoZW1lSWRlbnRpZmllciArICdjb21wb25lbnRDc3MnO1xuXG4gIGlmICghZXhpc3RzU3luYyhzdHlsZXMpKSB7XG4gICAgaWYgKHByb2R1Y3Rpb25Nb2RlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHN0eWxlcy5jc3MgZmlsZSBpcyBtaXNzaW5nIGFuZCBpcyBuZWVkZWQgZm9yICcke3RoZW1lTmFtZX0nIGluIGZvbGRlciAnJHt0aGVtZUZvbGRlcn0nYCk7XG4gICAgfVxuICAgIHdyaXRlRmlsZVN5bmMoXG4gICAgICBzdHlsZXMsXG4gICAgICAnLyogSW1wb3J0IHlvdXIgYXBwbGljYXRpb24gZ2xvYmFsIGNzcyBmaWxlcyBoZXJlIG9yIGFkZCB0aGUgc3R5bGVzIGRpcmVjdGx5IHRvIHRoaXMgZmlsZSAqLycsXG4gICAgICAndXRmOCdcbiAgICApO1xuICB9XG5cbiAgLy8gc3R5bGVzLmNzcyB3aWxsIGFsd2F5cyBiZSBhdmFpbGFibGUgYXMgd2Ugd3JpdGUgb25lIGlmIGl0IGRvZXNuJ3QgZXhpc3QuXG4gIGxldCBmaWxlbmFtZSA9IGJhc2VuYW1lKHN0eWxlcyk7XG4gIGxldCB2YXJpYWJsZSA9IGNhbWVsQ2FzZShmaWxlbmFtZSk7XG5cbiAgLyogTFVNTyAqL1xuICBjb25zdCBsdW1vSW1wb3J0cyA9IHRoZW1lUHJvcGVydGllcy5sdW1vSW1wb3J0cyB8fCBbJ2NvbG9yJywgJ3R5cG9ncmFwaHknXTtcbiAgaWYgKGx1bW9JbXBvcnRzKSB7XG4gICAgbHVtb0ltcG9ydHMuZm9yRWFjaCgobHVtb0ltcG9ydCkgPT4ge1xuICAgICAgaW1wb3J0cy5wdXNoKGBpbXBvcnQgeyAke2x1bW9JbXBvcnR9IH0gZnJvbSAnQHZhYWRpbi92YWFkaW4tbHVtby1zdHlsZXMvJHtsdW1vSW1wb3J0fS5qcyc7XFxuYCk7XG4gICAgICBpZiAobHVtb0ltcG9ydCA9PT0gJ3V0aWxpdHknIHx8IGx1bW9JbXBvcnQgPT09ICdiYWRnZScgfHwgbHVtb0ltcG9ydCA9PT0gJ3R5cG9ncmFwaHknIHx8IGx1bW9JbXBvcnQgPT09ICdjb2xvcicpIHtcbiAgICAgICAgLy8gSW5qZWN0IGludG8gbWFpbiBkb2N1bWVudCB0aGUgc2FtZSB3YXkgYXMgb3RoZXIgTHVtbyBzdHlsZXMgYXJlIGluamVjdGVkXG4gICAgICAgIC8vIEx1bW8gaW1wb3J0cyBnbyB0byB0aGUgdGhlbWUgZ2xvYmFsIGltcG9ydHMgZmlsZSB0byBwcmV2ZW50IHN0eWxlIGxlYWtzXG4gICAgICAgIC8vIHdoZW4gdGhlIHRoZW1lIGlzIGFwcGxpZWQgdG8gYW4gZW1iZWRkZWQgY29tcG9uZW50XG4gICAgICAgIGdsb2JhbEZpbGVDb250ZW50LnB1c2goYGltcG9ydCAnQHZhYWRpbi92YWFkaW4tbHVtby1zdHlsZXMvJHtsdW1vSW1wb3J0fS1nbG9iYWwuanMnO1xcbmApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbHVtb0ltcG9ydHMuZm9yRWFjaCgobHVtb0ltcG9ydCkgPT4ge1xuICAgICAgLy8gTHVtbyBpcyBpbmplY3RlZCB0byB0aGUgZG9jdW1lbnQgYnkgTHVtbyBpdHNlbGZcbiAgICAgIHNoYWRvd09ubHlDc3MucHVzaChgcmVtb3ZlcnMucHVzaChpbmplY3RHbG9iYWxDc3MoJHtsdW1vSW1wb3J0fS5jc3NUZXh0LCAnJywgdGFyZ2V0LCB0cnVlKSk7XFxuYCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiBUaGVtZSAqL1xuICBpZiAodXNlRGV2U2VydmVyT3JJblByb2R1Y3Rpb25Nb2RlKSB7XG4gICAgZ2xvYmFsRmlsZUNvbnRlbnQucHVzaChwYXJlbnRUaGVtZUdsb2JhbEltcG9ydCk7XG4gICAgZ2xvYmFsRmlsZUNvbnRlbnQucHVzaChgaW1wb3J0ICd0aGVtZXMvJHt0aGVtZU5hbWV9LyR7ZmlsZW5hbWV9JztcXG5gKTtcblxuICAgIGltcG9ydHMucHVzaChgaW1wb3J0ICR7dmFyaWFibGV9IGZyb20gJ3RoZW1lcy8ke3RoZW1lTmFtZX0vJHtmaWxlbmFtZX0/aW5saW5lJztcXG5gKTtcbiAgICBzaGFkb3dPbmx5Q3NzLnB1c2goYHJlbW92ZXJzLnB1c2goaW5qZWN0R2xvYmFsQ3NzKCR7dmFyaWFibGV9LnRvU3RyaW5nKCksICcnLCB0YXJnZXQpKTtcXG4gICAgYCk7XG4gIH1cbiAgaWYgKGV4aXN0c1N5bmMoZG9jdW1lbnRDc3NGaWxlKSkge1xuICAgIGZpbGVuYW1lID0gYmFzZW5hbWUoZG9jdW1lbnRDc3NGaWxlKTtcbiAgICB2YXJpYWJsZSA9IGNhbWVsQ2FzZShmaWxlbmFtZSk7XG5cbiAgICBpZiAodXNlRGV2U2VydmVyT3JJblByb2R1Y3Rpb25Nb2RlKSB7XG4gICAgICBnbG9iYWxGaWxlQ29udGVudC5wdXNoKGBpbXBvcnQgJ3RoZW1lcy8ke3RoZW1lTmFtZX0vJHtmaWxlbmFtZX0nO1xcbmApO1xuXG4gICAgICBpbXBvcnRzLnB1c2goYGltcG9ydCAke3ZhcmlhYmxlfSBmcm9tICd0aGVtZXMvJHt0aGVtZU5hbWV9LyR7ZmlsZW5hbWV9P2lubGluZSc7XFxuYCk7XG4gICAgICBzaGFkb3dPbmx5Q3NzLnB1c2goYHJlbW92ZXJzLnB1c2goaW5qZWN0R2xvYmFsQ3NzKCR7dmFyaWFibGV9LnRvU3RyaW5nKCksJycsIGRvY3VtZW50KSk7XFxuICAgIGApO1xuICAgIH1cbiAgfVxuXG4gIGxldCBpID0gMDtcbiAgaWYgKHRoZW1lUHJvcGVydGllcy5kb2N1bWVudENzcykge1xuICAgIGNvbnN0IG1pc3NpbmdNb2R1bGVzID0gY2hlY2tNb2R1bGVzKHRoZW1lUHJvcGVydGllcy5kb2N1bWVudENzcyk7XG4gICAgaWYgKG1pc3NpbmdNb2R1bGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBcIk1pc3NpbmcgbnBtIG1vZHVsZXMgb3IgZmlsZXMgJ1wiICtcbiAgICAgICAgICBtaXNzaW5nTW9kdWxlcy5qb2luKFwiJywgJ1wiKSArXG4gICAgICAgICAgXCInIGZvciBkb2N1bWVudENzcyBtYXJrZWQgaW4gJ3RoZW1lLmpzb24nLlxcblwiICtcbiAgICAgICAgICBcIkluc3RhbGwgb3IgdXBkYXRlIHBhY2thZ2UocykgYnkgYWRkaW5nIGEgQE5wbVBhY2thZ2UgYW5ub3RhdGlvbiBvciBpbnN0YWxsIGl0IHVzaW5nICducG0vcG5wbS9idW4gaSdcIlxuICAgICAgKTtcbiAgICB9XG4gICAgdGhlbWVQcm9wZXJ0aWVzLmRvY3VtZW50Q3NzLmZvckVhY2goKGNzc0ltcG9ydCkgPT4ge1xuICAgICAgY29uc3QgdmFyaWFibGUgPSAnbW9kdWxlJyArIGkrKztcbiAgICAgIGltcG9ydHMucHVzaChgaW1wb3J0ICR7dmFyaWFibGV9IGZyb20gJyR7Y3NzSW1wb3J0fT9pbmxpbmUnO1xcbmApO1xuICAgICAgLy8gRHVlIHRvIGNocm9tZSBidWcgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MzM2ODc2IGZvbnQtZmFjZSB3aWxsIG5vdCB3b3JrXG4gICAgICAvLyBpbnNpZGUgc2hhZG93Um9vdCBzbyB3ZSBuZWVkIHRvIGluamVjdCBpdCB0aGVyZSBhbHNvLlxuICAgICAgZ2xvYmFsQ3NzQ29kZS5wdXNoKGBpZih0YXJnZXQgIT09IGRvY3VtZW50KSB7XG4gICAgICAgIHJlbW92ZXJzLnB1c2goaW5qZWN0R2xvYmFsQ3NzKCR7dmFyaWFibGV9LnRvU3RyaW5nKCksICcnLCB0YXJnZXQpKTtcbiAgICB9XFxuICAgIGApO1xuICAgICAgZ2xvYmFsQ3NzQ29kZS5wdXNoKFxuICAgICAgICBgcmVtb3ZlcnMucHVzaChpbmplY3RHbG9iYWxDc3MoJHt2YXJpYWJsZX0udG9TdHJpbmcoKSwgJyR7Q1NTSU1QT1JUX0NPTU1FTlR9JywgZG9jdW1lbnQpKTtcXG4gICAgYFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuICBpZiAodGhlbWVQcm9wZXJ0aWVzLmltcG9ydENzcykge1xuICAgIGNvbnN0IG1pc3NpbmdNb2R1bGVzID0gY2hlY2tNb2R1bGVzKHRoZW1lUHJvcGVydGllcy5pbXBvcnRDc3MpO1xuICAgIGlmIChtaXNzaW5nTW9kdWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgXCJNaXNzaW5nIG5wbSBtb2R1bGVzIG9yIGZpbGVzICdcIiArXG4gICAgICAgICAgbWlzc2luZ01vZHVsZXMuam9pbihcIicsICdcIikgK1xuICAgICAgICAgIFwiJyBmb3IgaW1wb3J0Q3NzIG1hcmtlZCBpbiAndGhlbWUuanNvbicuXFxuXCIgK1xuICAgICAgICAgIFwiSW5zdGFsbCBvciB1cGRhdGUgcGFja2FnZShzKSBieSBhZGRpbmcgYSBATnBtUGFja2FnZSBhbm5vdGF0aW9uIG9yIGluc3RhbGwgaXQgdXNpbmcgJ25wbS9wbnBtL2J1biBpJ1wiXG4gICAgICApO1xuICAgIH1cbiAgICB0aGVtZVByb3BlcnRpZXMuaW1wb3J0Q3NzLmZvckVhY2goKGNzc1BhdGgpID0+IHtcbiAgICAgIGNvbnN0IHZhcmlhYmxlID0gJ21vZHVsZScgKyBpKys7XG4gICAgICBnbG9iYWxGaWxlQ29udGVudC5wdXNoKGBpbXBvcnQgJyR7Y3NzUGF0aH0nO1xcbmApO1xuICAgICAgaW1wb3J0cy5wdXNoKGBpbXBvcnQgJHt2YXJpYWJsZX0gZnJvbSAnJHtjc3NQYXRofT9pbmxpbmUnO1xcbmApO1xuICAgICAgc2hhZG93T25seUNzcy5wdXNoKGByZW1vdmVycy5wdXNoKGluamVjdEdsb2JhbENzcygke3ZhcmlhYmxlfS50b1N0cmluZygpLCAnJHtDU1NJTVBPUlRfQ09NTUVOVH0nLCB0YXJnZXQpKTtcXG5gKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChhdXRvSW5qZWN0Q29tcG9uZW50cykge1xuICAgIGNvbXBvbmVudHNGaWxlcy5mb3JFYWNoKChjb21wb25lbnRDc3MpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVuYW1lID0gYmFzZW5hbWUoY29tcG9uZW50Q3NzKTtcbiAgICAgIGNvbnN0IHRhZyA9IGZpbGVuYW1lLnJlcGxhY2UoJy5jc3MnLCAnJyk7XG4gICAgICBjb25zdCB2YXJpYWJsZSA9IGNhbWVsQ2FzZShmaWxlbmFtZSk7XG4gICAgICBjb21wb25lbnRDc3NJbXBvcnRzLnB1c2goXG4gICAgICAgIGBpbXBvcnQgJHt2YXJpYWJsZX0gZnJvbSAndGhlbWVzLyR7dGhlbWVOYW1lfS8ke3RoZW1lQ29tcG9uZW50c0ZvbGRlcn0vJHtmaWxlbmFtZX0/aW5saW5lJztcXG5gXG4gICAgICApO1xuICAgICAgLy8gRG9uJ3QgZm9ybWF0IGFzIHRoZSBnZW5lcmF0ZWQgZmlsZSBmb3JtYXR0aW5nIHdpbGwgZ2V0IHdvbmt5IVxuICAgICAgY29uc3QgY29tcG9uZW50U3RyaW5nID0gYHJlZ2lzdGVyU3R5bGVzKFxuICAgICAgICAnJHt0YWd9JyxcbiAgICAgICAgdW5zYWZlQ1NTKCR7dmFyaWFibGV9LnRvU3RyaW5nKCkpXG4gICAgICApO1xuICAgICAgYDtcbiAgICAgIGNvbXBvbmVudENzc0NvZGUucHVzaChjb21wb25lbnRTdHJpbmcpO1xuICAgIH0pO1xuICB9XG5cbiAgdGhlbWVGaWxlQ29udGVudCArPSBpbXBvcnRzLmpvaW4oJycpO1xuXG4gIC8vIERvbid0IGZvcm1hdCBhcyB0aGUgZ2VuZXJhdGVkIGZpbGUgZm9ybWF0dGluZyB3aWxsIGdldCB3b25reSFcbiAgLy8gSWYgdGFyZ2V0cyBjaGVjayB0aGF0IHdlIG9ubHkgcmVnaXN0ZXIgdGhlIHN0eWxlIHBhcnRzIG9uY2UsIGNoZWNrcyBleGlzdCBmb3IgZ2xvYmFsIGNzcyBhbmQgY29tcG9uZW50IGNzc1xuICBjb25zdCB0aGVtZUZpbGVBcHBseSA9IGBcbiAgbGV0IHRoZW1lUmVtb3ZlcnMgPSBuZXcgV2Vha01hcCgpO1xuICBsZXQgdGFyZ2V0cyA9IFtdO1xuXG4gIGV4cG9ydCBjb25zdCBhcHBseVRoZW1lID0gKHRhcmdldCkgPT4ge1xuICAgIGNvbnN0IHJlbW92ZXJzID0gW107XG4gICAgaWYgKHRhcmdldCAhPT0gZG9jdW1lbnQpIHtcbiAgICAgICR7c2hhZG93T25seUNzcy5qb2luKCcnKX1cbiAgICB9XG4gICAgJHtwYXJlbnRUaGVtZX1cbiAgICAke2dsb2JhbENzc0NvZGUuam9pbignJyl9XG5cbiAgICBpZiAoaW1wb3J0Lm1ldGEuaG90KSB7XG4gICAgICB0YXJnZXRzLnB1c2gobmV3IFdlYWtSZWYodGFyZ2V0KSk7XG4gICAgICB0aGVtZVJlbW92ZXJzLnNldCh0YXJnZXQsIHJlbW92ZXJzKTtcbiAgICB9XG5cbiAgfVxuICBcbmA7XG4gIGNvbXBvbmVudHNGaWxlQ29udGVudCArPSBgXG4ke2NvbXBvbmVudENzc0ltcG9ydHMuam9pbignJyl9XG5cbmlmICghZG9jdW1lbnRbJyR7Y29tcG9uZW50Q3NzRmxhZ30nXSkge1xuICAke2NvbXBvbmVudENzc0NvZGUuam9pbignJyl9XG4gIGRvY3VtZW50Wycke2NvbXBvbmVudENzc0ZsYWd9J10gPSB0cnVlO1xufVxuXG5pZiAoaW1wb3J0Lm1ldGEuaG90KSB7XG4gIGltcG9ydC5tZXRhLmhvdC5hY2NlcHQoKG1vZHVsZSkgPT4ge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSk7XG59XG5cbmA7XG5cbiAgdGhlbWVGaWxlQ29udGVudCArPSB0aGVtZUZpbGVBcHBseTtcbiAgdGhlbWVGaWxlQ29udGVudCArPSBgXG5pZiAoaW1wb3J0Lm1ldGEuaG90KSB7XG4gIGltcG9ydC5tZXRhLmhvdC5hY2NlcHQoKG1vZHVsZSkgPT4ge1xuXG4gICAgaWYgKG5lZWRzUmVsb2FkT25DaGFuZ2VzKSB7XG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldHMuZm9yRWFjaCh0YXJnZXRSZWYgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0YXJnZXRSZWYuZGVyZWYoKTtcbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgIHRoZW1lUmVtb3ZlcnMuZ2V0KHRhcmdldCkuZm9yRWFjaChyZW1vdmVyID0+IHJlbW92ZXIoKSlcbiAgICAgICAgICBtb2R1bGUuYXBwbHlUaGVtZSh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSk7XG5cbiAgaW1wb3J0Lm1ldGEuaG90Lm9uKCd2aXRlOmFmdGVyVXBkYXRlJywgKHVwZGF0ZSkgPT4ge1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCd2YWFkaW4tdGhlbWUtdXBkYXRlZCcsIHsgZGV0YWlsOiB1cGRhdGUgfSkpO1xuICB9KTtcbn1cblxuYDtcblxuICBnbG9iYWxJbXBvcnRDb250ZW50ICs9IGBcbiR7Z2xvYmFsRmlsZUNvbnRlbnQuam9pbignJyl9XG5gO1xuXG4gIHdyaXRlSWZDaGFuZ2VkKHJlc29sdmUob3V0cHV0Rm9sZGVyLCBnbG9iYWxGaWxlbmFtZSksIGdsb2JhbEltcG9ydENvbnRlbnQpO1xuICB3cml0ZUlmQ2hhbmdlZChyZXNvbHZlKG91dHB1dEZvbGRlciwgdGhlbWVGaWxlbmFtZSksIHRoZW1lRmlsZUNvbnRlbnQpO1xuICB3cml0ZUlmQ2hhbmdlZChyZXNvbHZlKG91dHB1dEZvbGRlciwgY29tcG9uZW50c0ZpbGVuYW1lKSwgY29tcG9uZW50c0ZpbGVDb250ZW50KTtcbn1cblxuZnVuY3Rpb24gd3JpdGVJZkNoYW5nZWQoZmlsZSwgZGF0YSkge1xuICBpZiAoIWV4aXN0c1N5bmMoZmlsZSkgfHwgcmVhZEZpbGVTeW5jKGZpbGUsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSkgIT09IGRhdGEpIHtcbiAgICB3cml0ZUZpbGVTeW5jKGZpbGUsIGRhdGEpO1xuICB9XG59XG5cbi8qKlxuICogTWFrZSBnaXZlbiBzdHJpbmcgaW50byBjYW1lbENhc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBzdHJpbmcgdG8gbWFrZSBpbnRvIGNhbWVDYXNlXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjYW1lbENhc2VkIHZlcnNpb25cbiAqL1xuZnVuY3Rpb24gY2FtZWxDYXNlKHN0cikge1xuICByZXR1cm4gc3RyXG4gICAgLnJlcGxhY2UoLyg/Ol5cXHd8W0EtWl18XFxiXFx3KS9nLCBmdW5jdGlvbiAod29yZCwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBpbmRleCA9PT0gMCA/IHdvcmQudG9Mb3dlckNhc2UoKSA6IHdvcmQudG9VcHBlckNhc2UoKTtcbiAgICB9KVxuICAgIC5yZXBsYWNlKC9cXHMrL2csICcnKVxuICAgIC5yZXBsYWNlKC9cXC58XFwtL2csICcnKTtcbn1cblxuZXhwb3J0IHsgd3JpdGVUaGVtZUZpbGVzIH07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXERldlxcXFx2YXVyb3JhXFxcXGF1cm9yYVxcXFx0YXJnZXRcXFxccGx1Z2luc1xcXFxhcHBsaWNhdGlvbi10aGVtZS1wbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXERldlxcXFx2YXVyb3JhXFxcXGF1cm9yYVxcXFx0YXJnZXRcXFxccGx1Z2luc1xcXFxhcHBsaWNhdGlvbi10aGVtZS1wbHVnaW5cXFxcdGhlbWUtY29weS5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovRGV2L3ZhdXJvcmEvYXVyb3JhL3RhcmdldC9wbHVnaW5zL2FwcGxpY2F0aW9uLXRoZW1lLXBsdWdpbi90aGVtZS1jb3B5LmpzXCI7LypcbiAqIENvcHlyaWdodCAyMDAwLTIwMjMgVmFhZGluIEx0ZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdFxuICogdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2ZcbiAqIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUXG4gKiBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGVcbiAqIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyXG4gKiB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFRoaXMgY29udGFpbnMgZnVuY3Rpb25zIGFuZCBmZWF0dXJlcyB1c2VkIHRvIGNvcHkgdGhlbWUgZmlsZXMuXG4gKi9cblxuaW1wb3J0IHsgcmVhZGRpclN5bmMsIHN0YXRTeW5jLCBta2RpclN5bmMsIGV4aXN0c1N5bmMsIGNvcHlGaWxlU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IHJlc29sdmUsIGJhc2VuYW1lLCByZWxhdGl2ZSwgZXh0bmFtZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZ2xvYlN5bmMgfSBmcm9tICdnbG9iJztcblxuY29uc3QgaWdub3JlZEZpbGVFeHRlbnNpb25zID0gWycuY3NzJywgJy5qcycsICcuanNvbiddO1xuXG4vKipcbiAqIENvcHkgdGhlbWUgc3RhdGljIHJlc291cmNlcyB0byBzdGF0aWMgYXNzZXRzIGZvbGRlci4gQWxsIGZpbGVzIGluIHRoZSB0aGVtZVxuICogZm9sZGVyIHdpbGwgYmUgY29waWVkIGV4Y2x1ZGluZyBjc3MsIGpzIGFuZCBqc29uIGZpbGVzIHRoYXQgd2lsbCBiZVxuICogaGFuZGxlZCBieSB3ZWJwYWNrIGFuZCBub3QgYmUgc2hhcmVkIGFzIHN0YXRpYyBmaWxlcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGhlbWVGb2xkZXIgRm9sZGVyIHdpdGggdGhlbWUgZmlsZVxuICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RTdGF0aWNBc3NldHNPdXRwdXRGb2xkZXIgcmVzb3VyY2VzIG91dHB1dCBmb2xkZXJcbiAqIEBwYXJhbSB7b2JqZWN0fSBsb2dnZXIgcGx1Z2luIGxvZ2dlclxuICovXG5mdW5jdGlvbiBjb3B5VGhlbWVSZXNvdXJjZXModGhlbWVGb2xkZXIsIHByb2plY3RTdGF0aWNBc3NldHNPdXRwdXRGb2xkZXIsIGxvZ2dlcikge1xuICBjb25zdCBzdGF0aWNBc3NldHNUaGVtZUZvbGRlciA9IHJlc29sdmUocHJvamVjdFN0YXRpY0Fzc2V0c091dHB1dEZvbGRlciwgJ3RoZW1lcycsIGJhc2VuYW1lKHRoZW1lRm9sZGVyKSk7XG4gIGNvbnN0IGNvbGxlY3Rpb24gPSBjb2xsZWN0Rm9sZGVycyh0aGVtZUZvbGRlciwgbG9nZ2VyKTtcblxuICAvLyBPbmx5IGNyZWF0ZSBhc3NldHMgZm9sZGVyIGlmIHRoZXJlIGFyZSBmaWxlcyB0byBjb3B5LlxuICBpZiAoY29sbGVjdGlvbi5maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgbWtkaXJTeW5jKHN0YXRpY0Fzc2V0c1RoZW1lRm9sZGVyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAvLyBjcmVhdGUgZm9sZGVycyB3aXRoXG4gICAgY29sbGVjdGlvbi5kaXJlY3Rvcmllcy5mb3JFYWNoKChkaXJlY3RvcnkpID0+IHtcbiAgICAgIGNvbnN0IHJlbGF0aXZlRGlyZWN0b3J5ID0gcmVsYXRpdmUodGhlbWVGb2xkZXIsIGRpcmVjdG9yeSk7XG4gICAgICBjb25zdCB0YXJnZXREaXJlY3RvcnkgPSByZXNvbHZlKHN0YXRpY0Fzc2V0c1RoZW1lRm9sZGVyLCByZWxhdGl2ZURpcmVjdG9yeSk7XG5cbiAgICAgIG1rZGlyU3luYyh0YXJnZXREaXJlY3RvcnksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIH0pO1xuXG4gICAgY29sbGVjdGlvbi5maWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICBjb25zdCByZWxhdGl2ZUZpbGUgPSByZWxhdGl2ZSh0aGVtZUZvbGRlciwgZmlsZSk7XG4gICAgICBjb25zdCB0YXJnZXRGaWxlID0gcmVzb2x2ZShzdGF0aWNBc3NldHNUaGVtZUZvbGRlciwgcmVsYXRpdmVGaWxlKTtcbiAgICAgIGNvcHlGaWxlSWZBYnNlbnRPck5ld2VyKGZpbGUsIHRhcmdldEZpbGUsIGxvZ2dlcik7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBDb2xsZWN0IGFsbCBmb2xkZXJzIHdpdGggY29weWFibGUgZmlsZXMgYW5kIGFsbCBmaWxlcyB0byBiZSBjb3BpZWQuXG4gKiBGb2xlZCB3aWxsIG5vdCBiZSBhZGRlZCBpZiBubyBmaWxlcyBpbiBmb2xkZXIgb3Igc3ViZm9sZGVycy5cbiAqXG4gKiBGaWxlcyB3aWxsIG5vdCBjb250YWluIGZpbGVzIHdpdGggaWdub3JlZCBleHRlbnNpb25zIGFuZCBmb2xkZXJzIG9ubHkgY29udGFpbmluZyBpZ25vcmVkIGZpbGVzIHdpbGwgbm90IGJlIGFkZGVkLlxuICpcbiAqIEBwYXJhbSBmb2xkZXJUb0NvcHkgZm9sZGVyIHdlIHdpbGwgY29weSBmaWxlcyBmcm9tXG4gKiBAcGFyYW0gbG9nZ2VyIHBsdWdpbiBsb2dnZXJcbiAqIEByZXR1cm4ge3tkaXJlY3RvcmllczogW10sIGZpbGVzOiBbXX19IG9iamVjdCBjb250YWluaW5nIGRpcmVjdG9yaWVzIHRvIGNyZWF0ZSBhbmQgZmlsZXMgdG8gY29weVxuICovXG5mdW5jdGlvbiBjb2xsZWN0Rm9sZGVycyhmb2xkZXJUb0NvcHksIGxvZ2dlcikge1xuICBjb25zdCBjb2xsZWN0aW9uID0geyBkaXJlY3RvcmllczogW10sIGZpbGVzOiBbXSB9O1xuICBsb2dnZXIudHJhY2UoJ2ZpbGVzIGluIGRpcmVjdG9yeScsIHJlYWRkaXJTeW5jKGZvbGRlclRvQ29weSkpO1xuICByZWFkZGlyU3luYyhmb2xkZXJUb0NvcHkpLmZvckVhY2goKGZpbGUpID0+IHtcbiAgICBjb25zdCBmaWxlVG9Db3B5ID0gcmVzb2x2ZShmb2xkZXJUb0NvcHksIGZpbGUpO1xuICAgIHRyeSB7XG4gICAgICBpZiAoc3RhdFN5bmMoZmlsZVRvQ29weSkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICBsb2dnZXIuZGVidWcoJ0dvaW5nIHRocm91Z2ggZGlyZWN0b3J5JywgZmlsZVRvQ29weSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvbGxlY3RGb2xkZXJzKGZpbGVUb0NvcHksIGxvZ2dlcik7XG4gICAgICAgIGlmIChyZXN1bHQuZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbGxlY3Rpb24uZGlyZWN0b3JpZXMucHVzaChmaWxlVG9Db3B5KTtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ0FkZGluZyBkaXJlY3RvcnknLCBmaWxlVG9Db3B5KTtcbiAgICAgICAgICBjb2xsZWN0aW9uLmRpcmVjdG9yaWVzLnB1c2guYXBwbHkoY29sbGVjdGlvbi5kaXJlY3RvcmllcywgcmVzdWx0LmRpcmVjdG9yaWVzKTtcbiAgICAgICAgICBjb2xsZWN0aW9uLmZpbGVzLnB1c2guYXBwbHkoY29sbGVjdGlvbi5maWxlcywgcmVzdWx0LmZpbGVzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghaWdub3JlZEZpbGVFeHRlbnNpb25zLmluY2x1ZGVzKGV4dG5hbWUoZmlsZVRvQ29weSkpKSB7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnQWRkaW5nIGZpbGUnLCBmaWxlVG9Db3B5KTtcbiAgICAgICAgY29sbGVjdGlvbi5maWxlcy5wdXNoKGZpbGVUb0NvcHkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBoYW5kbGVOb1N1Y2hGaWxlRXJyb3IoZmlsZVRvQ29weSwgZXJyb3IsIGxvZ2dlcik7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNvbGxlY3Rpb247XG59XG5cbi8qKlxuICogQ29weSBhbnkgc3RhdGljIG5vZGVfbW9kdWxlcyBhc3NldHMgbWFya2VkIGluIHRoZW1lLmpzb24gdG9cbiAqIHByb2plY3Qgc3RhdGljIGFzc2V0cyBmb2xkZXIuXG4gKlxuICogVGhlIHRoZW1lLmpzb24gY29udGVudCBmb3IgYXNzZXRzIGlzIHNldCB1cCBhczpcbiAqIHtcbiAqICAgYXNzZXRzOiB7XG4gKiAgICAgXCJub2RlX21vZHVsZSBpZGVudGlmaWVyXCI6IHtcbiAqICAgICAgIFwiY29weS1ydWxlXCI6IFwidGFyZ2V0L2ZvbGRlclwiLFxuICogICAgIH1cbiAqICAgfVxuICogfVxuICpcbiAqIFRoaXMgd291bGQgbWVhbiB0aGF0IGFuIGFzc2V0IHdvdWxkIGJlIGJ1aWx0IGFzOlxuICogXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZVwiOiB7XG4gKiAgIFwic3Zncy9yZWd1bGFyLyoqXCI6IFwiZm9ydGF3ZXNvbWUvaWNvbnNcIlxuICogfVxuICogV2hlcmUgJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlJyBpcyB0aGUgbnBtIHBhY2thZ2UsICdzdmdzL3JlZ3VsYXIvKionIGlzIHdoYXQgc2hvdWxkIGJlIGNvcGllZFxuICogYW5kICdmb3J0YXdlc29tZS9pY29ucycgaXMgdGhlIHRhcmdldCBkaXJlY3RvcnkgdW5kZXIgcHJvamVjdFN0YXRpY0Fzc2V0c091dHB1dEZvbGRlciB3aGVyZSB0aGluZ3NcbiAqIHdpbGwgZ2V0IGNvcGllZCB0by5cbiAqXG4gKiBOb3RlISB0aGVyZSBjYW4gYmUgbXVsdGlwbGUgY29weS1ydWxlcyB3aXRoIHRhcmdldCBmb2xkZXJzIGZvciBvbmUgbnBtIHBhY2thZ2UgYXNzZXQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRoZW1lTmFtZSBuYW1lIG9mIHRoZSB0aGVtZSB3ZSBhcmUgY29weWluZyBhc3NldHMgZm9yXG4gKiBAcGFyYW0ge2pzb259IHRoZW1lUHJvcGVydGllcyB0aGVtZSBwcm9wZXJ0aWVzIGpzb24gd2l0aCBkYXRhIG9uIGFzc2V0c1xuICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RTdGF0aWNBc3NldHNPdXRwdXRGb2xkZXIgcHJvamVjdCBvdXRwdXQgZm9sZGVyIHdoZXJlIHdlIGNvcHkgYXNzZXRzIHRvIHVuZGVyIHRoZW1lL1t0aGVtZU5hbWVdXG4gKiBAcGFyYW0ge29iamVjdH0gbG9nZ2VyIHBsdWdpbiBsb2dnZXJcbiAqL1xuZnVuY3Rpb24gY29weVN0YXRpY0Fzc2V0cyh0aGVtZU5hbWUsIHRoZW1lUHJvcGVydGllcywgcHJvamVjdFN0YXRpY0Fzc2V0c091dHB1dEZvbGRlciwgbG9nZ2VyKSB7XG4gIGNvbnN0IGFzc2V0cyA9IHRoZW1lUHJvcGVydGllc1snYXNzZXRzJ107XG4gIGlmICghYXNzZXRzKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdubyBhc3NldHMgdG8gaGFuZGxlIG5vIHN0YXRpYyBhc3NldHMgd2VyZSBjb3BpZWQnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBta2RpclN5bmMocHJvamVjdFN0YXRpY0Fzc2V0c091dHB1dEZvbGRlciwge1xuICAgIHJlY3Vyc2l2ZTogdHJ1ZVxuICB9KTtcbiAgY29uc3QgbWlzc2luZ01vZHVsZXMgPSBjaGVja01vZHVsZXMoT2JqZWN0LmtleXMoYXNzZXRzKSk7XG4gIGlmIChtaXNzaW5nTW9kdWxlcy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgRXJyb3IoXG4gICAgICBcIk1pc3NpbmcgbnBtIG1vZHVsZXMgJ1wiICtcbiAgICAgICAgbWlzc2luZ01vZHVsZXMuam9pbihcIicsICdcIikgK1xuICAgICAgICBcIicgZm9yIGFzc2V0cyBtYXJrZWQgaW4gJ3RoZW1lLmpzb24nLlxcblwiICtcbiAgICAgICAgXCJJbnN0YWxsIHBhY2thZ2UocykgYnkgYWRkaW5nIGEgQE5wbVBhY2thZ2UgYW5ub3RhdGlvbiBvciBpbnN0YWxsIGl0IHVzaW5nICducG0vcG5wbS9idW4gaSdcIlxuICAgICk7XG4gIH1cbiAgT2JqZWN0LmtleXMoYXNzZXRzKS5mb3JFYWNoKChtb2R1bGUpID0+IHtcbiAgICBjb25zdCBjb3B5UnVsZXMgPSBhc3NldHNbbW9kdWxlXTtcbiAgICBPYmplY3Qua2V5cyhjb3B5UnVsZXMpLmZvckVhY2goKGNvcHlSdWxlKSA9PiB7XG4gICAgICBjb25zdCBub2RlU291cmNlcyA9IHJlc29sdmUoJ25vZGVfbW9kdWxlcy8nLCBtb2R1bGUsIGNvcHlSdWxlKTtcbiAgICAgIGNvbnN0IGZpbGVzID0gZ2xvYlN5bmMobm9kZVNvdXJjZXMsIHsgbm9kaXI6IHRydWUgfSk7XG4gICAgICBjb25zdCB0YXJnZXRGb2xkZXIgPSByZXNvbHZlKHByb2plY3RTdGF0aWNBc3NldHNPdXRwdXRGb2xkZXIsICd0aGVtZXMnLCB0aGVtZU5hbWUsIGNvcHlSdWxlc1tjb3B5UnVsZV0pO1xuXG4gICAgICBta2RpclN5bmModGFyZ2V0Rm9sZGVyLCB7XG4gICAgICAgIHJlY3Vyc2l2ZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICBmaWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvcHlUYXJnZXQgPSByZXNvbHZlKHRhcmdldEZvbGRlciwgYmFzZW5hbWUoZmlsZSkpO1xuICAgICAgICBjb3B5RmlsZUlmQWJzZW50T3JOZXdlcihmaWxlLCBjb3B5VGFyZ2V0LCBsb2dnZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja01vZHVsZXMobW9kdWxlcykge1xuICBjb25zdCBtaXNzaW5nID0gW107XG5cbiAgbW9kdWxlcy5mb3JFYWNoKChtb2R1bGUpID0+IHtcbiAgICBpZiAoIWV4aXN0c1N5bmMocmVzb2x2ZSgnbm9kZV9tb2R1bGVzLycsIG1vZHVsZSkpKSB7XG4gICAgICBtaXNzaW5nLnB1c2gobW9kdWxlKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBtaXNzaW5nO1xufVxuXG4vKipcbiAqIENvcGllcyBnaXZlbiBmaWxlIHRvIGEgZ2l2ZW4gdGFyZ2V0IHBhdGgsIGlmIHRhcmdldCBmaWxlIGRvZXNuJ3QgZXhpc3Qgb3IgaWZcbiAqIGZpbGUgdG8gY29weSBpcyBuZXdlci5cbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlVG9Db3B5IHBhdGggb2YgdGhlIGZpbGUgdG8gY29weVxuICogQHBhcmFtIHtzdHJpbmd9IGNvcHlUYXJnZXQgcGF0aCBvZiB0aGUgdGFyZ2V0IGZpbGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBsb2dnZXIgcGx1Z2luIGxvZ2dlclxuICovXG5mdW5jdGlvbiBjb3B5RmlsZUlmQWJzZW50T3JOZXdlcihmaWxlVG9Db3B5LCBjb3B5VGFyZ2V0LCBsb2dnZXIpIHtcbiAgdHJ5IHtcbiAgICBpZiAoIWV4aXN0c1N5bmMoY29weVRhcmdldCkgfHwgc3RhdFN5bmMoY29weVRhcmdldCkubXRpbWUgPCBzdGF0U3luYyhmaWxlVG9Db3B5KS5tdGltZSkge1xuICAgICAgbG9nZ2VyLnRyYWNlKCdDb3B5aW5nOiAnLCBmaWxlVG9Db3B5LCAnPT4nLCBjb3B5VGFyZ2V0KTtcbiAgICAgIGNvcHlGaWxlU3luYyhmaWxlVG9Db3B5LCBjb3B5VGFyZ2V0KTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaGFuZGxlTm9TdWNoRmlsZUVycm9yKGZpbGVUb0NvcHksIGVycm9yLCBsb2dnZXIpO1xuICB9XG59XG5cbi8vIElnbm9yZXMgZXJyb3JzIGR1ZSB0byBmaWxlIG1pc3NpbmcgZHVyaW5nIHRoZW1lIHByb2Nlc3Npbmdcbi8vIFRoaXMgbWF5IGhhcHBlbiBmb3IgZXhhbXBsZSB3aGVuIGFuIElERSBjcmVhdGVzIGEgdGVtcG9yYXJ5IGZpbGVcbi8vIGFuZCB0aGVuIGltbWVkaWF0ZWx5IGRlbGV0ZXMgaXRcbmZ1bmN0aW9uIGhhbmRsZU5vU3VjaEZpbGVFcnJvcihmaWxlLCBlcnJvciwgbG9nZ2VyKSB7XG4gIGlmIChlcnJvci5jb2RlID09PSAnRU5PRU5UJykge1xuICAgIGxvZ2dlci53YXJuKCdJZ25vcmluZyBub3QgZXhpc3RpbmcgZmlsZSAnICsgZmlsZSArICcuIEZpbGUgbWF5IGhhdmUgYmVlbiBkZWxldGVkIGR1cmluZyB0aGVtZSBwcm9jZXNzaW5nLicpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbmV4cG9ydCB7IGNoZWNrTW9kdWxlcywgY29weVN0YXRpY0Fzc2V0cywgY29weVRoZW1lUmVzb3VyY2VzIH07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXERldlxcXFx2YXVyb3JhXFxcXGF1cm9yYVxcXFx0YXJnZXRcXFxccGx1Z2luc1xcXFx0aGVtZS1sb2FkZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXERldlxcXFx2YXVyb3JhXFxcXGF1cm9yYVxcXFx0YXJnZXRcXFxccGx1Z2luc1xcXFx0aGVtZS1sb2FkZXJcXFxcdGhlbWUtbG9hZGVyLXV0aWxzLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9EZXYvdmF1cm9yYS9hdXJvcmEvdGFyZ2V0L3BsdWdpbnMvdGhlbWUtbG9hZGVyL3RoZW1lLWxvYWRlci11dGlscy5qc1wiO2ltcG9ydCB7IGV4aXN0c1N5bmMsIHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IHJlc29sdmUsIGJhc2VuYW1lIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBnbG9iU3luYyB9IGZyb20gJ2dsb2InO1xuXG4vLyBDb2xsZWN0IGdyb3VwcyBbdXJsKF0gWyd8XCJdb3B0aW9uYWwgJy4vfC4uLycsIGZpbGUgcGFydCBhbmQgZW5kIG9mIHVybFxuY29uc3QgdXJsTWF0Y2hlciA9IC8odXJsXFwoXFxzKikoXFwnfFxcXCIpPyhcXC5cXC98XFwuXFwuXFwvKShcXFMqKShcXDJcXHMqXFwpKS9nO1xuXG5mdW5jdGlvbiBhc3NldHNDb250YWlucyhmaWxlVXJsLCB0aGVtZUZvbGRlciwgbG9nZ2VyKSB7XG4gIGNvbnN0IHRoZW1lUHJvcGVydGllcyA9IGdldFRoZW1lUHJvcGVydGllcyh0aGVtZUZvbGRlcik7XG4gIGlmICghdGhlbWVQcm9wZXJ0aWVzKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdObyB0aGVtZSBwcm9wZXJ0aWVzIGZvdW5kLicpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBhc3NldHMgPSB0aGVtZVByb3BlcnRpZXNbJ2Fzc2V0cyddO1xuICBpZiAoIWFzc2V0cykge1xuICAgIGxvZ2dlci5kZWJ1ZygnTm8gZGVmaW5lZCBhc3NldHMgaW4gdGhlbWUgcHJvcGVydGllcycpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBHbyB0aHJvdWdoIGVhY2ggYXNzZXQgbW9kdWxlXG4gIGZvciAobGV0IG1vZHVsZSBvZiBPYmplY3Qua2V5cyhhc3NldHMpKSB7XG4gICAgY29uc3QgY29weVJ1bGVzID0gYXNzZXRzW21vZHVsZV07XG4gICAgLy8gR28gdGhyb3VnaCBlYWNoIGNvcHkgcnVsZVxuICAgIGZvciAobGV0IGNvcHlSdWxlIG9mIE9iamVjdC5rZXlzKGNvcHlSdWxlcykpIHtcbiAgICAgIC8vIGlmIGZpbGUgc3RhcnRzIHdpdGggY29weVJ1bGUgdGFyZ2V0IGNoZWNrIGlmIGZpbGUgd2l0aCBwYXRoIGFmdGVyIGNvcHkgdGFyZ2V0IGNhbiBiZSBmb3VuZFxuICAgICAgaWYgKGZpbGVVcmwuc3RhcnRzV2l0aChjb3B5UnVsZXNbY29weVJ1bGVdKSkge1xuICAgICAgICBjb25zdCB0YXJnZXRGaWxlID0gZmlsZVVybC5yZXBsYWNlKGNvcHlSdWxlc1tjb3B5UnVsZV0sICcnKTtcbiAgICAgICAgY29uc3QgZmlsZXMgPSBnbG9iU3luYyhyZXNvbHZlKCdub2RlX21vZHVsZXMvJywgbW9kdWxlLCBjb3B5UnVsZSksIHsgbm9kaXI6IHRydWUgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICAgIGlmIChmaWxlLmVuZHNXaXRoKHRhcmdldEZpbGUpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldFRoZW1lUHJvcGVydGllcyh0aGVtZUZvbGRlcikge1xuICBjb25zdCB0aGVtZVByb3BlcnR5RmlsZSA9IHJlc29sdmUodGhlbWVGb2xkZXIsICd0aGVtZS5qc29uJyk7XG4gIGlmICghZXhpc3RzU3luYyh0aGVtZVByb3BlcnR5RmlsZSkpIHtcbiAgICByZXR1cm4ge307XG4gIH1cbiAgY29uc3QgdGhlbWVQcm9wZXJ0eUZpbGVBc1N0cmluZyA9IHJlYWRGaWxlU3luYyh0aGVtZVByb3BlcnR5RmlsZSk7XG4gIGlmICh0aGVtZVByb3BlcnR5RmlsZUFzU3RyaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuICByZXR1cm4gSlNPTi5wYXJzZSh0aGVtZVByb3BlcnR5RmlsZUFzU3RyaW5nKTtcbn1cblxuZnVuY3Rpb24gcmV3cml0ZUNzc1VybHMoc291cmNlLCBoYW5kbGVkUmVzb3VyY2VGb2xkZXIsIHRoZW1lRm9sZGVyLCBsb2dnZXIsIG9wdGlvbnMpIHtcbiAgc291cmNlID0gc291cmNlLnJlcGxhY2UodXJsTWF0Y2hlciwgZnVuY3Rpb24gKG1hdGNoLCB1cmwsIHF1b3RlTWFyaywgcmVwbGFjZSwgZmlsZVVybCwgZW5kU3RyaW5nKSB7XG4gICAgbGV0IGFic29sdXRlUGF0aCA9IHJlc29sdmUoaGFuZGxlZFJlc291cmNlRm9sZGVyLCByZXBsYWNlLCBmaWxlVXJsKTtcbiAgICBjb25zdCBleGlzdGluZ1RoZW1lUmVzb3VyY2UgPSBhYnNvbHV0ZVBhdGguc3RhcnRzV2l0aCh0aGVtZUZvbGRlcikgJiYgZXhpc3RzU3luYyhhYnNvbHV0ZVBhdGgpO1xuICAgIGlmIChleGlzdGluZ1RoZW1lUmVzb3VyY2UgfHwgYXNzZXRzQ29udGFpbnMoZmlsZVVybCwgdGhlbWVGb2xkZXIsIGxvZ2dlcikpIHtcbiAgICAgIC8vIEFkZGluZyAuLyB3aWxsIHNraXAgY3NzLWxvYWRlciwgd2hpY2ggc2hvdWxkIGJlIGRvbmUgZm9yIGFzc2V0IGZpbGVzXG4gICAgICAvLyBJbiBhIHByb2R1Y3Rpb24gYnVpbGQsIHRoZSBjc3MgZmlsZSBpcyBpbiBWQUFESU4vYnVpbGQgYW5kIHN0YXRpYyBmaWxlcyBhcmUgaW4gVkFBRElOL3N0YXRpYywgc28gLi4vc3RhdGljIG5lZWRzIHRvIGJlIGFkZGVkXG4gICAgICBjb25zdCByZXBsYWNlbWVudCA9IG9wdGlvbnMuZGV2TW9kZSA/ICcuLycgOiAnLi4vc3RhdGljLyc7XG5cbiAgICAgIGNvbnN0IHNraXBMb2FkZXIgPSBleGlzdGluZ1RoZW1lUmVzb3VyY2UgPyAnJyA6IHJlcGxhY2VtZW50O1xuICAgICAgY29uc3QgZnJvbnRlbmRUaGVtZUZvbGRlciA9IHNraXBMb2FkZXIgKyAndGhlbWVzLycgKyBiYXNlbmFtZSh0aGVtZUZvbGRlcik7XG4gICAgICBsb2dnZXIuZGVidWcoXG4gICAgICAgICdVcGRhdGluZyB1cmwgZm9yIGZpbGUnLFxuICAgICAgICBcIidcIiArIHJlcGxhY2UgKyBmaWxlVXJsICsgXCInXCIsXG4gICAgICAgICd0byB1c2UnLFxuICAgICAgICBcIidcIiArIGZyb250ZW5kVGhlbWVGb2xkZXIgKyAnLycgKyBmaWxlVXJsICsgXCInXCJcbiAgICAgICk7XG4gICAgICBjb25zdCBwYXRoUmVzb2x2ZWQgPSBhYnNvbHV0ZVBhdGguc3Vic3RyaW5nKHRoZW1lRm9sZGVyLmxlbmd0aCkucmVwbGFjZSgvXFxcXC9nLCAnLycpO1xuXG4gICAgICAvLyBrZWVwIHRoZSB1cmwgdGhlIHNhbWUgZXhjZXB0IHJlcGxhY2UgdGhlIC4vIG9yIC4uLyB0byB0aGVtZXMvW3RoZW1lRm9sZGVyXVxuICAgICAgcmV0dXJuIHVybCArIChxdW90ZU1hcmsgPz8gJycpICsgZnJvbnRlbmRUaGVtZUZvbGRlciArIHBhdGhSZXNvbHZlZCArIGVuZFN0cmluZztcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGV2TW9kZSkge1xuICAgICAgbG9nZ2VyLmxvZyhcIk5vIHJld3JpdGUgZm9yICdcIiwgbWF0Y2gsIFwiJyBhcyB0aGUgZmlsZSB3YXMgbm90IGZvdW5kLlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSW4gcHJvZHVjdGlvbiwgdGhlIGNzcyBpcyBpbiBWQUFESU4vYnVpbGQgYnV0IHRoZSB0aGVtZSBmaWxlcyBhcmUgaW4gLlxuICAgICAgcmV0dXJuIHVybCArIChxdW90ZU1hcmsgPz8gJycpICsgJy4uLy4uLycgKyBmaWxlVXJsICsgZW5kU3RyaW5nO1xuICAgIH1cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH0pO1xuICByZXR1cm4gc291cmNlO1xufVxuXG5leHBvcnQgeyByZXdyaXRlQ3NzVXJscyB9O1xuIiwgIntcbiAgXCJmcm9udGVuZEZvbGRlclwiOiBcIkM6L0Rldi92YXVyb3JhL2F1cm9yYS8uL2Zyb250ZW5kXCIsXG4gIFwidGhlbWVGb2xkZXJcIjogXCJ0aGVtZXNcIixcbiAgXCJ0aGVtZVJlc291cmNlRm9sZGVyXCI6IFwiQzovRGV2L3ZhdXJvcmEvYXVyb3JhLy4vZnJvbnRlbmQvZ2VuZXJhdGVkL2phci1yZXNvdXJjZXNcIixcbiAgXCJzdGF0aWNPdXRwdXRcIjogXCJDOi9EZXYvdmF1cm9yYS9hdXJvcmEvdGFyZ2V0L2NsYXNzZXMvTUVUQS1JTkYvVkFBRElOL3dlYmFwcC9WQUFESU4vc3RhdGljXCIsXG4gIFwiZ2VuZXJhdGVkRm9sZGVyXCI6IFwiZ2VuZXJhdGVkXCIsXG4gIFwic3RhdHNPdXRwdXRcIjogXCJDOlxcXFxEZXZcXFxcdmF1cm9yYVxcXFxhdXJvcmFcXFxcdGFyZ2V0XFxcXGNsYXNzZXNcXFxcTUVUQS1JTkZcXFxcVkFBRElOXFxcXGNvbmZpZ1wiLFxuICBcImZyb250ZW5kQnVuZGxlT3V0cHV0XCI6IFwiQzpcXFxcRGV2XFxcXHZhdXJvcmFcXFxcYXVyb3JhXFxcXHRhcmdldFxcXFxjbGFzc2VzXFxcXE1FVEEtSU5GXFxcXFZBQURJTlxcXFx3ZWJhcHBcIixcbiAgXCJkZXZCdW5kbGVPdXRwdXRcIjogXCJDOi9EZXYvdmF1cm9yYS9hdXJvcmEvdGFyZ2V0L2Rldi1idW5kbGUvd2ViYXBwXCIsXG4gIFwiZGV2QnVuZGxlU3RhdHNPdXRwdXRcIjogXCJDOi9EZXYvdmF1cm9yYS9hdXJvcmEvdGFyZ2V0L2Rldi1idW5kbGUvY29uZmlnXCIsXG4gIFwiamFyUmVzb3VyY2VzRm9sZGVyXCI6IFwiQzovRGV2L3ZhdXJvcmEvYXVyb3JhLy4vZnJvbnRlbmQvZ2VuZXJhdGVkL2phci1yZXNvdXJjZXNcIixcbiAgXCJ0aGVtZU5hbWVcIjogXCJcIixcbiAgXCJjbGllbnRTZXJ2aWNlV29ya2VyU291cmNlXCI6IFwiQzpcXFxcRGV2XFxcXHZhdXJvcmFcXFxcYXVyb3JhXFxcXHRhcmdldFxcXFxzdy50c1wiLFxuICBcInB3YUVuYWJsZWRcIjogZmFsc2UsXG4gIFwib2ZmbGluZUVuYWJsZWRcIjogZmFsc2UsXG4gIFwib2ZmbGluZVBhdGhcIjogXCInb2ZmbGluZS5odG1sJ1wiXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxEZXZcXFxcdmF1cm9yYVxcXFxhdXJvcmFcXFxcdGFyZ2V0XFxcXHBsdWdpbnNcXFxccm9sbHVwLXBsdWdpbi1wb3N0Y3NzLWxpdC1jdXN0b21cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXERldlxcXFx2YXVyb3JhXFxcXGF1cm9yYVxcXFx0YXJnZXRcXFxccGx1Z2luc1xcXFxyb2xsdXAtcGx1Z2luLXBvc3Rjc3MtbGl0LWN1c3RvbVxcXFxyb2xsdXAtcGx1Z2luLXBvc3Rjc3MtbGl0LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9EZXYvdmF1cm9yYS9hdXJvcmEvdGFyZ2V0L3BsdWdpbnMvcm9sbHVwLXBsdWdpbi1wb3N0Y3NzLWxpdC1jdXN0b20vcm9sbHVwLXBsdWdpbi1wb3N0Y3NzLWxpdC5qc1wiOy8qKlxuICogTUlUIExpY2Vuc2VcblxuQ29weXJpZ2h0IChjKSAyMDE5IFVtYmVydG8gUGVwYXRvXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5jb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5TT0ZUV0FSRS5cbiAqL1xuLy8gVGhpcyBpcyBodHRwczovL2dpdGh1Yi5jb20vdW1ib3BlcGF0by9yb2xsdXAtcGx1Z2luLXBvc3Rjc3MtbGl0IDIuMC4wICsgaHR0cHM6Ly9naXRodWIuY29tL3VtYm9wZXBhdG8vcm9sbHVwLXBsdWdpbi1wb3N0Y3NzLWxpdC9wdWxsLzU0XG4vLyB0byBtYWtlIGl0IHdvcmsgd2l0aCBWaXRlIDNcbi8vIE9uY2UgLyBpZiBodHRwczovL2dpdGh1Yi5jb20vdW1ib3BlcGF0by9yb2xsdXAtcGx1Z2luLXBvc3Rjc3MtbGl0L3B1bGwvNTQgaXMgbWVyZ2VkIHRoaXMgc2hvdWxkIGJlIHJlbW92ZWQgYW5kIHJvbGx1cC1wbHVnaW4tcG9zdGNzcy1saXQgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZFxuXG5pbXBvcnQgeyBjcmVhdGVGaWx0ZXIgfSBmcm9tICdAcm9sbHVwL3BsdWdpbnV0aWxzJztcbmltcG9ydCB0cmFuc2Zvcm1Bc3QgZnJvbSAndHJhbnNmb3JtLWFzdCc7XG5cbmNvbnN0IGFzc2V0VXJsUkUgPSAvX19WSVRFX0FTU0VUX18oW1xcdyRdKylfXyg/OlxcJF8oLio/KV9fKT8vZ1xuXG5jb25zdCBlc2NhcGUgPSAoc3RyKSA9PlxuICBzdHJcbiAgICAucmVwbGFjZShhc3NldFVybFJFLCAnJHt1bnNhZmVDU1NUYWcoXCJfX1ZJVEVfQVNTRVRfXyQxX18kMlwiKX0nKVxuICAgIC5yZXBsYWNlKC9gL2csICdcXFxcYCcpXG4gICAgLnJlcGxhY2UoL1xcXFwoPyFgKS9nLCAnXFxcXFxcXFwnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcG9zdGNzc0xpdChvcHRpb25zID0ge30pIHtcbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgaW5jbHVkZTogJyoqLyoue2Nzcyxzc3MscGNzcyxzdHlsLHN0eWx1cyxzYXNzLHNjc3MsbGVzc30nLFxuICAgIGV4Y2x1ZGU6IG51bGwsXG4gICAgaW1wb3J0UGFja2FnZTogJ2xpdCdcbiAgfTtcblxuICBjb25zdCBvcHRzID0geyAuLi5kZWZhdWx0T3B0aW9ucywgLi4ub3B0aW9ucyB9O1xuICBjb25zdCBmaWx0ZXIgPSBjcmVhdGVGaWx0ZXIob3B0cy5pbmNsdWRlLCBvcHRzLmV4Y2x1ZGUpO1xuXG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3Bvc3Rjc3MtbGl0JyxcbiAgICBlbmZvcmNlOiAncG9zdCcsXG4gICAgdHJhbnNmb3JtKGNvZGUsIGlkKSB7XG4gICAgICBpZiAoIWZpbHRlcihpZCkpIHJldHVybjtcbiAgICAgIGNvbnN0IGFzdCA9IHRoaXMucGFyc2UoY29kZSwge30pO1xuICAgICAgLy8gZXhwb3J0IGRlZmF1bHQgY29uc3QgY3NzO1xuICAgICAgbGV0IGRlZmF1bHRFeHBvcnROYW1lO1xuXG4gICAgICAvLyBleHBvcnQgZGVmYXVsdCAnLi4uJztcbiAgICAgIGxldCBpc0RlY2xhcmF0aW9uTGl0ZXJhbCA9IGZhbHNlO1xuICAgICAgY29uc3QgbWFnaWNTdHJpbmcgPSB0cmFuc2Zvcm1Bc3QoY29kZSwgeyBhc3Q6IGFzdCB9LCAobm9kZSkgPT4ge1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSAnRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uJykge1xuICAgICAgICAgIGRlZmF1bHRFeHBvcnROYW1lID0gbm9kZS5kZWNsYXJhdGlvbi5uYW1lO1xuXG4gICAgICAgICAgaXNEZWNsYXJhdGlvbkxpdGVyYWwgPSBub2RlLmRlY2xhcmF0aW9uLnR5cGUgPT09ICdMaXRlcmFsJztcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghZGVmYXVsdEV4cG9ydE5hbWUgJiYgIWlzRGVjbGFyYXRpb25MaXRlcmFsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIG1hZ2ljU3RyaW5nLndhbGsoKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKGRlZmF1bHRFeHBvcnROYW1lICYmIG5vZGUudHlwZSA9PT0gJ1ZhcmlhYmxlRGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgY29uc3QgZXhwb3J0ZWRWYXIgPSBub2RlLmRlY2xhcmF0aW9ucy5maW5kKChkKSA9PiBkLmlkLm5hbWUgPT09IGRlZmF1bHRFeHBvcnROYW1lKTtcbiAgICAgICAgICBpZiAoZXhwb3J0ZWRWYXIpIHtcbiAgICAgICAgICAgIGV4cG9ydGVkVmFyLmluaXQuZWRpdC51cGRhdGUoYGNzc1RhZ1xcYCR7ZXNjYXBlKGV4cG9ydGVkVmFyLmluaXQudmFsdWUpfVxcYGApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0RlY2xhcmF0aW9uTGl0ZXJhbCAmJiBub2RlLnR5cGUgPT09ICdFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24nKSB7XG4gICAgICAgICAgbm9kZS5kZWNsYXJhdGlvbi5lZGl0LnVwZGF0ZShgY3NzVGFnXFxgJHtlc2NhcGUobm9kZS5kZWNsYXJhdGlvbi52YWx1ZSl9XFxgYCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbWFnaWNTdHJpbmcucHJlcGVuZChgaW1wb3J0IHtjc3MgYXMgY3NzVGFnLCB1bnNhZmVDU1MgYXMgdW5zYWZlQ1NTVGFnfSBmcm9tICcke29wdHMuaW1wb3J0UGFja2FnZX0nO1xcbmApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogbWFnaWNTdHJpbmcudG9TdHJpbmcoKSxcbiAgICAgICAgbWFwOiBtYWdpY1N0cmluZy5nZW5lcmF0ZU1hcCh7XG4gICAgICAgICAgaGlyZXM6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH07XG4gICAgfVxuICB9O1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcRGV2XFxcXHZhdXJvcmFcXFxcYXVyb3JhXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxEZXZcXFxcdmF1cm9yYVxcXFxhdXJvcmFcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L0Rldi92YXVyb3JhL2F1cm9yYS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IFVzZXJDb25maWdGbiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgb3ZlcnJpZGVWYWFkaW5Db25maWcgfSBmcm9tICcuL3ZpdGUuZ2VuZXJhdGVkJztcblxuY29uc3QgY3VzdG9tQ29uZmlnOiBVc2VyQ29uZmlnRm4gPSAoZW52KSA9PiAoe1xuICAvLyBIZXJlIHlvdSBjYW4gYWRkIGN1c3RvbSBWaXRlIHBhcmFtZXRlcnNcbiAgLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBvdmVycmlkZVZhYWRpbkNvbmZpZyhjdXN0b21Db25maWcpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQU1BLE9BQU8sVUFBVTtBQUNqQixTQUFTLGNBQUFBLGFBQVksYUFBQUMsWUFBVyxlQUFBQyxjQUFhLGdCQUFBQyxlQUFjLGlCQUFBQyxzQkFBcUI7QUFDaEYsU0FBUyxrQkFBa0I7QUFDM0IsWUFBWSxTQUFTOzs7QUNXckIsU0FBUyxjQUFBQyxhQUFZLGdCQUFBQyxxQkFBb0I7QUFDekMsU0FBUyxXQUFBQyxnQkFBZTs7O0FDRHhCLFNBQVMsWUFBQUMsaUJBQWdCO0FBQ3pCLFNBQVMsV0FBQUMsVUFBUyxZQUFBQyxpQkFBZ0I7QUFDbEMsU0FBUyxjQUFBQyxhQUFZLGNBQWMscUJBQXFCOzs7QUNGeEQsU0FBUyxhQUFhLFVBQVUsV0FBVyxZQUFZLG9CQUFvQjtBQUMzRSxTQUFTLFNBQVMsVUFBVSxVQUFVLGVBQWU7QUFDckQsU0FBUyxnQkFBZ0I7QUFFekIsSUFBTSx3QkFBd0IsQ0FBQyxRQUFRLE9BQU8sT0FBTztBQVdyRCxTQUFTLG1CQUFtQkMsY0FBYSxpQ0FBaUMsUUFBUTtBQUNoRixRQUFNLDBCQUEwQixRQUFRLGlDQUFpQyxVQUFV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QUFBQSxFQUNGO0FBQ0Y7QUFFTyxJQUFNLHVCQUF1QixDQUFDQyxrQkFBK0I7QUFDbEUsU0FBTyxhQUFhLENBQUMsUUFBUSxZQUFZLGFBQWEsR0FBRyxHQUFHQSxjQUFhLEdBQUcsQ0FBQyxDQUFDO0FBQ2hGO0FBQ0EsU0FBUyxXQUFXLFFBQXdCO0FBQzFDLFFBQU0sY0FBYyxLQUFLLFFBQVEsbUJBQW1CLFFBQVEsY0FBYztBQUMxRSxTQUFPLEtBQUssTUFBTVIsY0FBYSxhQUFhLEVBQUUsVUFBVSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RFO0FBQ0EsU0FBUyxZQUFZLFFBQXdCO0FBQzNDLFFBQU0sY0FBYyxLQUFLLFFBQVEsbUJBQW1CLFFBQVEsY0FBYztBQUMxRSxTQUFPLEtBQUssTUFBTUEsY0FBYSxhQUFhLEVBQUUsVUFBVSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RFOzs7QU8zMEJBLElBQU0sZUFBNkIsQ0FBQyxTQUFTO0FBQUE7QUFBQTtBQUc3QztBQUVBLElBQU8sc0JBQVEscUJBQXFCLFlBQVk7IiwKICAibmFtZXMiOiBbImV4aXN0c1N5bmMiLCAibWtkaXJTeW5jIiwgInJlYWRkaXJTeW5jIiwgInJlYWRGaWxlU3luYyIsICJ3cml0ZUZpbGVTeW5jIiwgImV4aXN0c1N5bmMiLCAicmVhZEZpbGVTeW5jIiwgInJlc29sdmUiLCAiZ2xvYlN5bmMiLCAicmVzb2x2ZSIsICJiYXNlbmFtZSIsICJleGlzdHNTeW5jIiwgInRoZW1lRm9sZGVyIiwgInRoZW1lRm9sZGVyIiwgInJlc29sdmUiLCAiZ2xvYlN5bmMiLCAiZXhpc3RzU3luYyIsICJiYXNlbmFtZSIsICJ2YXJpYWJsZSIsICJmaWxlbmFtZSIsICJleGlzdHNTeW5jIiwgInJlc29sdmUiLCAidGhlbWVGb2xkZXIiLCAicmVhZEZpbGVTeW5jIiwgImV4aXN0c1N5bmMiLCAicmVhZEZpbGVTeW5jIiwgInJlc29sdmUiLCAiYmFzZW5hbWUiLCAiZ2xvYlN5bmMiLCAidGhlbWVGb2xkZXIiLCAiZ2V0VGhlbWVQcm9wZXJ0aWVzIiwgImdsb2JTeW5jIiwgInJlc29sdmUiLCAiZXhpc3RzU3luYyIsICJyZWFkRmlsZVN5bmMiLCAicmVwbGFjZSIsICJiYXNlbmFtZSIsICJyZXF1aXJlIiwgImV4aXN0c1N5bmMiLCAicmVhZEZpbGVTeW5jIiwgIm1rZGlyU3luYyIsICJidW5kbGUiLCAicmVhZGRpclN5bmMiLCAidGhlbWVGb2xkZXIiLCAid3JpdGVGaWxlU3luYyIsICJlIiwgInBhdGgiLCAiY3VzdG9tQ29uZmlnIl0KfQo=
