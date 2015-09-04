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
var goOldNames = {
  'go\\.drct\\.cover': 'goDrctCover',
  'go\\.svc\\.isLocation': 'goSvcIsLocation',
  'go\\.drct\\.image': 'goDrctImage',
  'go\\.model\\.product': 'goModelProduct',
  'go\\.mdl\\.product': 'goModelProduct',
  'go\\.model\\.ageRating': 'goModelAgeRating',
  'go\\.model\\.detailedLiveProgram': 'goModelDetailedLiveProgram',
  'go\\.model\\.device': 'goModelDevice',
  'go\\.model\\.externalCatchupUrl': 'goModelExternalCatchupUrl',
  'go\\.model\\.genre': 'goModelGenre',
  'go\\.constants\\.enumerated\\.goType': 'goCnstEnumerated.goType',
  'go\\.constants\\.enumerated\\.goSource': 'goCnstEnumerated.goSource',
  'go\\.model\\.interest': 'goModelInterest',
  'go\\.model\\.libraryChannel': 'goModelLibraryChannel',
  'go\\.model\\.libraryItem': 'goModelLibraryItem',
  'go\\.model\\.liveSchedule': 'goModelLiveSchedule',
  'go\\.model\\.liveStreams': 'goModelLiveStreams',
  'go\\.model\\.media': 'goModelMedia',
  'go\\.model\\.movie': 'goModelMovie',
  'go\\.model\\.nextEpisode': 'goModelNextEpisode',
  'go\\.model\\.openRecommendation': 'goModelOpenRecommendation',
  'go\\.model\\.parameter': 'goModelParameter',
  'go\\.model\\.paymentMethod': 'goModelPaymentMethod',
  'go\\.model\\.pricingModel': 'goModelPricingModel',
  'go\\.model\\.liveChannel': 'goModelLiveChannel',
  'go\\.model\\.staff': 'goModelStaff',
  'go\\.model\\.recording': 'goModelRecording',
  'go\\.model\\.registrationField': 'goModelRegistrationField',
  'go\\.model\\.season': 'goModelSeason',
  'go\\.model\\.serie': 'goModelSerie',
  'go\\.model\\.subscription': 'goModelSubscription',
  'go\\.model\\.tag': 'goModelTag',
  'go\\.model\\.taggedProduct': 'goModelTaggedProduct',
  'go\\.model\\.thumboxImage': 'goModelThumboxImage',
  'go\\.model\\.user': 'goModelUser',
  'go\\.model\\.episode': 'goModelEpisode',
  'go\\.mdl\\.detail\\.svc\\.dataStatus': 'goMdlDetailSvcDataStatus',
  'go\\.mdl\\.lastWatch\\.': 'goMdlLastWatch',
  'go\\.mdl\\.library\\.ctrl\\.secondHeader': 'goMdlLayoutCtrlSecondHeader',
  'go\\.mdl\\.recording': 'goModelRecording',
  'go\\.svc\\.pageTitle': 'goSvcPageTitle',
  'go\\.model\\.liveProgram': 'goModelLiveProgram'
};

var goOldTests = {
  'go\\.svc\\.uniapiAuth': 'goSvcUniapiAuth',
  'go\\.svc\\.uniapi': 'goSvcUniapi',
  'go\\.drct\\.is-location-class': 'go-drct-is-location-class',
  'go\\.fltr.dateUnipai': 'goFltrSateUniapi',
  'go\\.mdl\\.browser\\.drct\\.browserkWarning': 'goMdlBrowserDrctBrowserWarning',
  'go\\.svc\\.foo': 'goSvcFoo',
  'go\\.model\\.foo': 'goModelFoo',
  'go\\.svc\\.catchup': 'goSvcCatchup',
  'go\\.svc\\.catchupFoo': 'goSvcCatchupFoo',
  'go\\.mdl\\.detail\\.drct\\.movie-details': 'goMdlDetailDrctMovieDetails',
  'go\\.mdl\\.detail\\.drct\\.watchlist-button': 'goMdlDetailDrctWatchlistButton',
  'go\\.mdl\\.epg\\.ctrl\\.programDetails': 'goMdlEpgCtrlProgramDetails',
  'data-go\\.mdl\\.epg\\.drct\\.program-details': 'data-go-mdl-epg-drct-program-details',
  'go\\.mdl\\.layout\\.drct\\.headerDropdown': 'goMdlLayoutDrctHeaderDropdown',
  'go\\.mdl\\.live\\.drc\\.timeRail': 'goMdlLiveDrctTimeRail',
  'go\\.mdl\\.myTv\\.svc\\.uniapi': 'goMdlMyTvSvcUniapi',
  'go\\.mdl\\.player\\.ctrl\\.playbackWarning':'goMdlPlayerCtrlPlaybackWarning',
  'go\\.mdl\\.player\\.ctrl\\.player': 'goMdlPlayerCtrlPlayer',
  'go\\.mdl\\.player\\.svc\\.browserSupport':'goMdlPlayerSvcBrowserSupport',
  'go\\.mdl\\.player': 'goMdlPlayer',
  'go\\.mdl\\.player\\.drct\\.playbackWarning': 'goMdlPlayerDrctPlaybackWarning',
  'data-go\\.mdl\\.player\\.drct\\.playback-warning':'data-go-mdl-player-drct-playback-warning',
  'go\\.mdl\\.player\\.drct\\.player': 'goMdlPlayerDrctPlayer',
  'go\\.mdl\\.popUps\\.ctrl\\.unsupportedBrowser':'goMdlPopUpsCtrlUnsupportedBrowser',
  'data-go\\.mdl\\.pop-ups\\.drct\\.unsupported-browser': 'data-go-mdl-pop-ups-drct-unsupported-browser',
  'go\\.mdl\\.recommendations\\.svc\\.recommendations': 'goMdlRecommendationsSvcRecommendations',
  'go\\.mdl\\.settings\\.ctrl\\.firstPurchase':'goMdlSettingsCtrlFirstPurchase',
  'go\\.mdl\\.smartBanners\\.svc\\.links': 'goMdlSmartBannersSvcLinks',
  'go\\.mdl\\.smartBanners\\.drct\\.playerBanner': 'goMdlSmartBannersDrctPlayerBanner',
  'data-go\\.mdl\\.smart-banners\\.drct\\.player-banner': 'data-go-mdl-smart-banners-drct-player-banner',
  'go\\.svc\\.catchupGlobosat': 'goSvcCatchupGlobosat',
  'go\\.svc\\.tidjs': 'goSvcTidjs',
  'go\\.svc\\.pin': 'goSvcPin',
  'go\\.mdl\\.detail\\.drct\\.series-dropdown': 'goMdlDetailDrctSeriesDropdown',
  'go\\.mdl\\.epg\\.drct\\.programDetails': 'goMdlEpgDrctProgramDetails',
  'go.mdl.epg.drct.pvrWarning': 'goMdlEpgDrctPvrWarning',
  'data-go\\.mdl\\.epg\\.drct\\.pvr-warning': 'data-go-mdl-epg-drct-pvr-warning',
  'go\\.mdl\\.channelNav\\.drct\\.channel': 'goMdlChannelNavDrctChannel',
  'goMdlPlayer\\.drct\\.playbackWarning': 'goMdlPlayerDrctPlaybackWarning',
  'go\\.mdl\\.authentication\\.drct\\.popUpLogin': 'goMdlAuthenticationDrctPopUpLogin',
  'go\\.mdl\\.popUps\\.drct\\.unsupportedBrowser': 'goMdlPopUpsDrctUnsupportedBrowser'

};


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





var _replaceControllerHome = function() {
  // for (var i in goOldNames) {
  //   replace({
  //     regex: i,
  //     replacement: goOldNames[i],
  //     paths: ['/home/daniel/workspace/mca-go/app/'],
  //     recursive: true,
  //     silent: true
  //   });  
  // }
  for (var i in goOldTests) {
    replace({
      regex: i,
      replacement: goOldTests[i],
      paths: ['/home/daniel/workspace/mca-go/test/'],
      recursive: true,
      silent: true
    });  
  }
}

_replaceControllerHome();
