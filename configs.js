var fs = require('fs');
var replace = require('replace');
var endOfLine = require('os').EOL;
var goStore = {
  'go.svc.configProvider': 'goSvcConfigProvider',
  'go.svc.cookiesProvider': 'goSvcCookiesProvider',
  'go.svc.loggerProvider': 'goSvcLoggerProvider',
  'go.svc.playerSilverlightProvider': 'goSvcPlayerSilverlightProvider',
  'go.svc.googleAnalyticsProvider': 'goSvcGoogleAnalyticsProvider'
};

var goStoreDrct = {};
var goStoreFltr = {};

var camelCase = function (str) {
  var op = '';
  str = str.trim();

  if (str.charAt(0) === '-') {
    op = '-';
  }

  if (str.length === 1 || !(/[_.\- ]+/).test(str) ) {
    if (str[0] === str[0].toLowerCase() && str.slice(1) !== str.slice(1).toLowerCase()) {
      return str;
    }

    return str.toLowerCase();
  }

  return op.concat(str
  .replace(/^[_.\- ]+/, '')
  .replace(/[_.\- ]+(\w|$)/g, function (m, p1) {
    return p1.toUpperCase();
  }));
};

var configs = {
  '/home/daniel/workspace/mca-go/app/devices/config.json': require('/home/daniel/workspace/mca-go/app/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/devices/ops/config.json': require('/home/daniel/workspace/mca-go/app/devices/ops/config.json'),
  '/home/daniel/workspace/mca-go/app/devices/pc/config.json': require('/home/daniel/workspace/mca-go/app/devices/pc/config.json'),
  '/home/daniel/workspace/mca-go/app/countries/en-us/config.json': require('/home/daniel/workspace/mca-go/app/countries/en-us/config.json'),
  '/home/daniel/workspace/mca-go/app/countries/es-ar/config.json': require('/home/daniel/workspace/mca-go/app/countries/es-ar/config.json'),
  '/home/daniel/workspace/mca-go/app/countries/es-cl/config.json': require('/home/daniel/workspace/mca-go/app/countries/es-cl/config.json'),
  '/home/daniel/workspace/mca-go/app/countries/es-co/config.json': require('/home/daniel/workspace/mca-go/app/countries/es-co/config.json'),
  '/home/daniel/workspace/mca-go/app/countries/es-cr/config.json': require('/home/daniel/workspace/mca-go/app/countries/es-cr/config.json'),
  '/home/daniel/workspace/mca-go/app/countries/es-es/config.json': require('/home/daniel/workspace/mca-go/app/countries/es-es/config.json'),
  '/home/daniel/workspace/mca-go/app/countries/es-gt/config.json': require('/home/daniel/workspace/mca-go/app/countries/es-gt/config.json'),
  '/home/daniel/workspace/mca-go/app/countries/es-ni/config.json': require('/home/daniel/workspace/mca-go/app/countries/es-ni/config.json'),
  '/home/daniel/workspace/mca-go/app/countries/es-pa/config.json': require('/home/daniel/workspace/mca-go/app/countries/es-pa/config.json'),
  '/home/daniel/workspace/mca-go/app/countries/es-sv/config.json': require('/home/daniel/workspace/mca-go/app/countries/es-sv/config.json'),
  '/home/daniel/workspace/mca-go/app/countries/pt-br/config.json': require('/home/daniel/workspace/mca-go/app/countries/pt-br/config.json'),
  '/home/daniel/workspace/mca-go/app/countries/pt-br-gvt/config.json': require('/home/daniel/workspace/mca-go/app/countries/pt-br-gvt/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/analytics/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/analytics/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/authentication/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/authentication/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/authentication/devices/ops/config.json': require('/home/daniel/workspace/mca-go/app/modules/authentication/devices/ops/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/browser/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/browser/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/browser/devices/pc/config.json': require('/home/daniel/workspace/mca-go/app/modules/browser/devices/pc/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/browser/devices/ops/config.json': require('/home/daniel/workspace/mca-go/app/modules/browser/devices/ops/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/catchup/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/catchup/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/catchup/countries/es-co/config.json': require('/home/daniel/workspace/mca-go/app/modules/catchup/countries/es-co/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/catchup/countries/pt-br/config.json': require('/home/daniel/workspace/mca-go/app/modules/catchup/countries/pt-br/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/cookies/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/cookies/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/detail/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/detail/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/detail/devices/ops/config.json': require('/home/daniel/workspace/mca-go/app/modules/detail/devices/ops/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/editors/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/editors/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/epg/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/epg/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/error/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/error/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/home/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/home/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/landing/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/landing/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/last-watch/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/last-watch/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/layout/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/layout/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/layout/devices/ops/config.json': require('/home/daniel/workspace/mca-go/app/modules/layout/devices/ops/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/library/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/library/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/live/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/live/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/my-tv/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/my-tv/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/pop-ups/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/pop-ups/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/pop-ups/countries/config.json': require('/home/daniel/workspace/mca-go/app/modules/pop-ups/countries/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/recommendations/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/recommendations/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/search/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/search/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/settings/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/settings/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/settings/countries/en-us/config.json': require('/home/daniel/workspace/mca-go/app/modules/settings/countries/en-us/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/settings/countries/es-ar/config.json': require('/home/daniel/workspace/mca-go/app/modules/settings/countries/es-ar/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/settings/countries/es-cl/config.json': require('/home/daniel/workspace/mca-go/app/modules/settings/countries/es-cl/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/smart-banners/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/smart-banners/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/upselling/devices/config.json': require('/home/daniel/workspace/mca-go/app/modules/upselling/devices/config.json'),
  '/home/daniel/workspace/mca-go/app/modules/upselling/devices/ops/config.json': require('/home/daniel/workspace/mca-go/app/modules/upselling/devices/ops/config.json')
};

var _replaceAllConfigsJon = function() {
  function _insertKeyValue(old, _new) {
    goStore[old.replace(/\.+/g, '\\.')] = _new;
  }

  function _insertDrct(old, _new) {
    if (old.charAt(0) === 'g') {
      goStoreDrct['data-' + old.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()] = 'data-'+(_new.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()).replace(/\.+/g, '-');
    }
  }

  function _insertFltr(old, _new) {
    if (old.charAt(0) === 'g') {
      //goStoreFltr['| ' +  old.replace(/\.+/g, '/.')] = '| ' + goStore[old];
      goStoreFltr[old.replace(/\.+/g, '\\.')] = goStore[old.replace(/\.+/g, '\\.')];
    }
  }

  for (var i in configs) {
    if (configs[i].loader.constants) {
      for (var j = 0; j < configs[i].loader.constants.length; j++) {
        _insertKeyValue(configs[i].loader.constants[j], camelCase(configs[i].loader.constants[j]));
        configs[i].loader.constants[j] = camelCase(configs[i].loader.constants[j]);  
      }
    }
    if (configs[i].loader.models) {
      for (var j = 0; j < configs[i].loader.models.length; j++) {
        _insertKeyValue(configs[i].loader.models[j], camelCase(configs[i].loader.models[j]));
        configs[i].loader.models[j] = camelCase(configs[i].loader.models[j]);  
      }
    }
    if (configs[i].loader.modules) {
      for (var j = 0; j < configs[i].loader.modules.length; j++) {
        _insertKeyValue(configs[i].loader.modules[j], camelCase(configs[i].loader.modules[j]));
        configs[i].loader.modules[j] = camelCase(configs[i].loader.modules[j]);  
      }
    }
    if (configs[i].loader.directives) {
      for (var j = 0; j < configs[i].loader.directives.length; j++) {
        _insertDrct(configs[i].loader.directives[j], configs[i].loader.directives[j]);
        _insertKeyValue(configs[i].loader.directives[j], camelCase(configs[i].loader.directives[j]));
        configs[i].loader.directives[j] = camelCase(configs[i].loader.directives[j]);  
      }
    }
    if (configs[i].loader.animations) {
      for (var j = 0; j < configs[i].loader.animations.length; j++) {
        _insertKeyValue(configs[i].loader.animations[j], camelCase(configs[i].loader.animations[j]));
        configs[i].loader.animations[j] = camelCase(configs[i].loader.animations[j]);  
      }
    }
    if (configs[i].loader.services) {
      for (var j = 0; j < configs[i].loader.services.length; j++) {
        _insertKeyValue(configs[i].loader.services[j], camelCase(configs[i].loader.services[j]));
        configs[i].loader.services[j] = camelCase(configs[i].loader.services[j]);  
      }
    }
    if (configs[i].loader.filters) {
      for (var j = 0; j < configs[i].loader.filters.length; j++) {
        _insertKeyValue(configs[i].loader.filters[j], camelCase(configs[i].loader.filters[j]));
        _insertFltr(configs[i].loader.filters[j], camelCase(configs[i].loader.filters[j]));
        configs[i].loader.filters[j] = camelCase(configs[i].loader.filters[j]);  
      }
    }
    if (configs[i].loader.controllers) {
      for (var j = 0; j < configs[i].loader.controllers.length; j++) {
        _insertKeyValue(configs[i].loader.controllers[j], camelCase(configs[i].loader.controllers[j]));
        configs[i].loader.controllers[j] = camelCase(configs[i].loader.controllers[j]);  
      }
    }
    fs.writeFile(i, JSON.stringify(configs[i], null, 2) + endOfLine);
  }
}

var _replaceAllJsFiles = function() {
  for (var i in goStore) {
    replace({
      regex: "'" + i + "'",
      replacement: "'" + goStore[i] + "'",
      paths: ['/home/daniel/workspace/mca-go/app/'],
      recursive: true,
      silent: true
    });  
  } 
}

var _replaceTestFiles = function() {
  for (var i in goStore) {
    replace({
      regex: "'" + i + "'",
      replacement: "'" + goStore[i] + "'",
      paths: ['/home/daniel/workspace/mca-go/test/specs/'],
      recursive: true,
      silent: true
    });  
  }
}

var _replaceAppConstant = function() {
  replace({
    regex: 'go.cnst.app',
    replacement: 'goCnstApp',
    paths: ['/home/daniel/workspace/mca-go/app/constants/app/constant.js'],
    recursive: true,
    silent: true
  });  
}

var _replaceAppCnst = function() {
  replace({
    regex: 'go.cnst.app',
    replacement: 'goCnstApp',
    paths: ['/home/daniel/workspace/mca-go/build/templates/app.cnst.tmpl.js'],
    recursive: true,
    silent: true
  });  
}

var _replaceIndextTmpl = function() {
  replace({
    regex: 'data-go.mdl.layout.drct.main',
    replacement: 'data-go-mdl-layout-drct-main',
    paths: ['/home/daniel/workspace/mca-go/build/templates/index.tmpl.html'],
    recursive: true,
    silent: true
  });  
}

var _replaceMochaGlobals = function() {
  replace({
    regex: 'go.svc.configProvider',
    replacement: 'goSvcConfigProvider',
    paths: ['/home/daniel/workspace/mca-go/test/config/mocha-globals.js'],
    recursive: true,
    silent: true
  });
  replace({
    regex: 'go.svc.uniapiProvider',
    replacement: 'goSvcUniapiProvider',
    paths: ['/home/daniel/workspace/mca-go/test/config/mocha-globals.js'],
    recursive: true,
    silent: true
  });
  replace({
    regex: 'go.cnst.config',
    replacement: 'goCnstConfig',
    paths: ['/home/daniel/workspace/mca-go/test/config/mocha-globals.js'],
    recursive: true,
    silent: true
  });
  replace({
    regex: 'go.svc.playerSilverlightProvider',
    replacement: 'goSvcPlayerSilverlightProvider',
    paths: ['/home/daniel/workspace/mca-go/test/config/mocha-globals.js'],
    recursive: true,
    silent: true
  });
  replace({
    regex: 'go.svc.loggerProvider',
    replacement: 'goSvcLoggerProvider',
    paths: ['/home/daniel/workspace/mca-go/test/config/mocha-globals.js'],
    recursive: true,
    silent: true
  });
}

var _replaceTemplatesBuild = function() {
  replace({
    regex: 'go.cnst.config',
    replacement: 'goCnstConfig',
    paths: ['/home/daniel/workspace/mca-go/build/templates/config.cnst.tmpl.js'],
    recursive: true,
    silent: true
  });
}

var _replaceTemplates = function() {
  for (var i in goStoreDrct) {
    replace({
      regex: i,
      replacement: goStoreDrct[i],
      paths: ['/home/daniel/workspace/mca-go/app/'],
      recursive: true,
      silent: true
    });  
  }
}

var _replaceTemplatesTests = function() {
  for (var i in goStoreDrct) {
    replace({
      regex: i,
      replacement: goStoreDrct[i],
      paths: ['/home/daniel/workspace/mca-go/test/'],
      recursive: true,
      silent: true
    });  
  }
}

var _replaceFiltersInTemplates = function() {
  for (var i in goStoreFltr) {
    replace({
      //regex: new RegExp('\\|\\s' + i),
      regex: i,
      //replacement: '| ' + goStoreFltr[i],
      replacement: goStoreFltr[i],
      paths: ['/home/daniel/workspace/mca-go/app/'],
      recursive: true,
      silent: true
    });
  }
}

var _replaceChannelNavTemplate = function() {
  replace({
    regex: 'go\\.mdl\\.live\\.drct\\.channel',
    replacement: 'data-go-mdl-live-drct-channel',
    paths: ['/home/daniel/workspace/mca-go/app/modules/live/directives/channel-nav/tmpl.html'],
    recursive: true,
    silent: true
  });
}

var _replaceControllerHome = function() {
  replace({
    regex: 'data-ng-controller="go\\.mdl\\.home\\.ctrl\\.home"',
    replacement: 'data-ng-controller="goMdlHomeCtrlHome"',
    paths: ['/home/daniel/workspace/mca-go/app/modules/home/directives/home/tmpl.html'],
    recursive: true,
    silent: true
  });
}

console.log('Paso 0-1: Modificamos la app constant');
_replaceAppConstant();
console.log('Paso 0-2: Modificamos los templates del build');
_replaceTemplatesBuild();
console.log('Paso 0-3: Modificar app.cnst.tmpl');
_replaceAppCnst();
console.log('Paso 0-4: Modificar index tmpl');
_replaceIndextTmpl();
console.log('Paso 0-5: Reemplazar mocha globals');
_replaceMochaGlobals();
console.log('Paso 0-6: Reemplazar data-ng-controller en template home');
_replaceControllerHome();
console.log('Paso 0-7: Reemplazar channel nav template');
_replaceChannelNavTemplate();
console.log('Paso 1: Creamos las keys a partir de los config.json y los modificamos');
_replaceAllConfigsJon();
console.log('Paso 2: Modificamos todos los .js de app');
_replaceAllJsFiles();
console.log('Paso 3: Modificamos templates de app');
_replaceTemplates();
console.log('Paso 4: Modificamos todos los tests de la app');
_replaceTestFiles();
console.log('Paso 5: Modificamos templates de units tests');
_replaceTemplatesTests();
console.log('Paso 6: Modificamos los templates de app para sustituir las llamadas a filtros');
_replaceFiltersInTemplates();
