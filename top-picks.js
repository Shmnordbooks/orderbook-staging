/* ═══════════════════════════════════════════════════════════════════════
   TOP PICKS — "Most requested" strip under the category video
   ───────────────────────────────────────────────────────────────────────
   Load on hardgoods.html AFTER the main script and shared-cart.js:

       <script src="top-picks.js"></script>

   To switch it off, remove that line. Nothing else depends on it.

   Adding a group: add an entry to TOP_PICKS below, keyed by the CATALOG
   group name (same key as CATEGORY_VIDEOS), with 3-6 item codes.

   Rules
   - Stock is read live from allItems, so the daily stock update applies.
   - Unavailable or missing codes are skipped; fewer than 3 valid picks
     hides the strip for that group.
   - Add uses the page's own setQty(), so the cart, N/A guard and
     shared cart behave exactly like the table rows below.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.__topPicks) return;
  window.__topPicks = true;

  var MIN_PICKS = 3;

  /* Picks chosen from public best-seller rankings and reviews
     (Galaxus, Bikable, eBay, buyer guides; checked 6 Nov 2026),
     limited to items that exist in this catalog. */
  window.TOP_PICKS = window.TOP_PICKS || {
    'Bottom Bracket': {
      title: 'Top Picks',
      sub: 'Most requested bottom brackets',
      picks: [
        { code: 'ISMBBR60B',    model: 'SM-BBR60', tag: 'Road',            spec: 'Ultegra · BSA 68mm · Hollowtech II' },
        { code: 'IBBR9100I',    model: 'BB-R9100', tag: 'Road',            spec: 'Dura-Ace · Italian 70mm' },
        { code: 'EBBRS501B',    model: 'BB-RS501', tag: 'Road + MTB',      spec: 'BSA threaded · Hollowtech II' },
        { code: 'EBBRS500PB',   model: 'BB-RS500', tag: 'Road',            spec: 'Press-fit · Hollowtech II' },
        { code: 'IBBMT801B',    model: 'BB-MT801', tag: 'MTB',             spec: 'BSA 68/73mm · Hollowtech II' },
        { code: 'EBBMT501B',    model: 'BB-MT501', tag: 'MTB',             spec: 'BSA 68/73mm · Hollowtech II' },
        { code: 'EBBMT500PA',   model: 'BB-MT500', tag: 'MTB',             spec: 'Press-fit · Hollowtech II' },
        { code: 'ISMBB93B',     model: 'SM-BB93',  tag: 'MTB · XTR',       spec: 'BSA 68mm · Hollowtech II' },
        { code: 'EBBUN300B23X', model: 'BB-UN300', tag: 'City / Trekking', spec: 'BSA 122.5/68mm · Square taper' },
        { code: 'EBBES300B13',  model: 'BB-ES300', tag: 'Octalink',        spec: 'BSA 68/113mm · Octalink' }
      ]
    },
    'Chain': {
      title: 'Top Picks',
      sub: 'Most requested chains',
      picks: [
        { code: 'ICNM8100126Q', model: 'CN-M8100', tag: 'MTB · Deore XT', spec: '12-speed · 126 links · Quick Link' },
        { code: 'ICNM6100126Q', model: 'CN-M6100', tag: 'MTB · Deore', spec: '12-speed · 126 links · Quick Link' },
        { code: 'ICNHG60111116Q', model: 'CN-HG601', tag: 'Road + MTB', spec: '11-speed · 116 links · Quick Link' },
        { code: 'ICNHG70111116Q', model: 'CN-HG701', tag: 'Road + MTB', spec: '11-speed · 116 links · Quick Link' },
        { code: 'ICNLG500116Q', model: 'CN-LG500', tag: 'Linkglide', spec: '9/10/11-speed · 116 links · Quick Link' },
        { code: 'ICNHG95116I', model: 'CN-HG95', tag: '10-speed', spec: '10-speed · 116 links' },
        { code: 'ICNHG54116I', model: 'CN-HG54', tag: '10-speed', spec: '10-speed · 116 links' },
        { code: 'ECNHG53C116I', model: 'CN-HG53', tag: '9-speed', spec: '9-speed · 116 links' },
        { code: 'ECNHG71C116I', model: 'CN-HG71', tag: '6/7/8-speed', spec: '6/7/8-speed · 116 links' },
        { code: 'ECNHG40116Q', model: 'CN-HG40', tag: 'Entry · 6/7/8-speed', spec: '6/7/8-speed · 116 links' }
      ]
    },
    'Cassettes': {
      title: 'Top Picks',
      sub: 'Most requested cassettes',
      picks: [
        { code: 'ICSHG70011134', model: 'CS-HG700', tag: 'Road · 105', spec: '11-speed · 11-34T' },
        { code: 'ICSR710112134', model: 'CS-R7101', tag: 'Road · 105', spec: '12-speed · 11-34T' },
        { code: 'ICSR810112134', model: 'CS-R8101', tag: 'Road · Ultegra', spec: '12-speed · 11-34T' },
        { code: 'ICSHG8001111134', model: 'CS-HG800', tag: 'Road · Ultegra', spec: '11-speed · 11-34T' },
        { code: 'ICSM7100045', model: 'CS-M7100', tag: 'MTB · SLX', spec: '12-speed · 10-45T · Hyperglide+' },
        { code: 'ICSM8100051', model: 'CS-M8100', tag: 'MTB · Deore XT', spec: '12-speed · 10-51T · Hyperglide+' },
        { code: 'ICSM510011142', model: 'CS-M5100', tag: 'MTB · Deore', spec: '11-speed · 11-42T' },
        { code: 'ICSHG50010134', model: 'CS-HG500', tag: 'Road + MTB · Tiagra', spec: '10-speed · 11-34T' },
        { code: 'ICSHG5010136', model: 'CS-HG50', tag: 'MTB · Deore', spec: '10-speed · 11-36T' },
        { code: 'ICSHG4009134', model: 'CS-HG400', tag: '9-speed · Alivio', spec: '9-speed · 11-34T' }
      ]
    },
    'Crankset': {
      title: 'Top Picks',
      sub: 'Most requested cranksets',
      picks: [
        { code: 'IFCR7100CX04', model: 'FC-R7100', tag: 'Road · 105', spec: '2x12 · 50/34T · 170mm' },
        { code: 'IFCR8100CX26', model: 'FC-R8100', tag: 'Road · Ultegra', spec: '2x12 · 52/36T · 170mm' },
        { code: 'EFCRS510DX66X', model: 'FC-RS510', tag: 'Road · 105', spec: '2x11 · 46/36T · 172.5mm' },
        { code: 'EFCRS520CX04', model: 'FC-RS520', tag: 'Road', spec: '2x12 · 50/34T · 170mm' },
        { code: 'EFCRX600112CX60', model: 'FC-RX600', tag: 'Gravel · GRX', spec: '2x11 · 46/30T · 170mm' },
        { code: 'EFCM61001EXA2', model: 'FC-M6100-1', tag: 'MTB · Deore', spec: '1x12 · 32T · 175mm' },
        { code: 'EFCMT5101CXA2L', model: 'FC-MT510-1', tag: 'MTB · Deore', spec: '1x12 · 32T · 170mm' },
        { code: 'EFCM51001CXA0', model: 'FC-M5100-1', tag: 'MTB · Deore', spec: '1x10/11 · 30T · 170mm' },
        { code: 'EFCM371C422CL', model: 'FC-M371', tag: 'Trekking · Altus', spec: '9-speed · 44/32/22T · 170mm' },
        { code: 'EFCM361C888CL', model: 'FC-M361', tag: 'Entry · Acera', spec: '8-speed · 48/38/28T · 170mm' }
      ]
    },
    'Rotors': {
      title: 'Top Picks',
      sub: 'Most requested rotors',
      picks: [
        { code: 'ESMRT64SI3C', model: 'SM-RT64 · 160mm', tag: 'MTB · Deore', spec: 'Center Lock · internal lockring' },
        { code: 'ESMRT64MI3C', model: 'SM-RT64 · 180mm', tag: 'MTB · Deore', spec: 'Center Lock · internal lockring' },
        { code: 'ESMRT64SEC', model: 'SM-RT64 · 160mm', tag: 'MTB · Deore', spec: 'Center Lock · external lockring' },
        { code: 'ESMRT10S2', model: 'SM-RT10 · 160mm', tag: 'Entry', spec: 'Center Lock · with lockring' },
        { code: 'ESMRT86S2', model: 'SM-RT86 · 160mm', tag: 'MTB · XT', spec: '6-bolt' },
        { code: 'ESMRT86M2', model: 'SM-RT86 · 180mm', tag: 'MTB · XT', spec: '6-bolt' },
        { code: 'IRTCL800SI', model: 'RT-CL800 · 160mm', tag: 'Gravel · GRX', spec: 'Center Lock · internal lockring' },
        { code: 'IRTCL800SE', model: 'RT-CL800 · 160mm', tag: 'Gravel · GRX', spec: 'Center Lock · external lockring' },
        { code: 'IRTCL800MI', model: 'RT-CL800 · 180mm', tag: 'Gravel · GRX', spec: 'Center Lock · internal lockring' },
        { code: 'IRTCL900SI', model: 'RT-CL900 · 160mm', tag: 'Road', spec: 'Center Lock · internal lockring' }
      ]
    },
    'DiscBreakPads': {
      title: 'Top Picks',
      sub: 'Most requested disc brake pads',
      picks: [
        { code: 'EBPB05SRXA', model: 'B05S', tag: 'Resin · MTB', spec: '1 pair · for BR-MT200 / MT400 / MT500' },
        { code: 'EBPL05ARFA', model: 'L05A', tag: 'Resin · Road', spec: '1 pair · 105 / Ultegra / Dura-Ace disc' },
        { code: 'EBPD03SRXA', model: 'D03S', tag: 'Resin', spec: '1 pair' },
        { code: 'EBPJ05ARFA', model: 'J05A', tag: 'Resin', spec: '1 pair' },
        { code: 'EBPG05ARXA', model: 'G05A', tag: 'Resin', spec: '1 pair' },
        { code: 'EBPH03ARFA', model: 'H03A', tag: 'Resin', spec: '1 pair' },
        { code: 'IBPJ04CMFA', model: 'J04C', tag: 'Metal', spec: '1 pair · XTR / XT / SLX / Deore 2-piston' },
        { code: 'IBPN04CMFA', model: 'N04C', tag: 'Metal', spec: '1 pair · XTR / XT / SLX 4-piston' },
        { code: 'IBPL04CMFA', model: 'L04C', tag: 'Metal', spec: '1 pair' },
        { code: 'IBPG04SMXA', model: 'G04S', tag: 'Metal', spec: '1 pair' }
      ]
    },
    'Dreailleur': {
      title: 'Top Picks',
      sub: 'Most requested rear derailleurs',
      picks: [
        { code: 'IRDM8100GS', model: 'RD-M8100', tag: 'MTB · Deore XT', spec: '12-speed · GS' },
        { code: 'IRDM5100SGS', model: 'RD-M5100', tag: 'MTB · Deore', spec: '11-speed · SGS' },
        { code: 'ERDM3100SGS', model: 'RD-M3100', tag: 'MTB · Alivio', spec: '9-speed · SGS' },
        { code: 'ERDM370SGSL', model: 'RD-M370', tag: 'MTB · Altus', spec: '9-speed · SGS' },
        { code: 'ERDM310DL', model: 'RD-M310', tag: 'MTB · Altus', spec: '7/8-speed' },
        { code: 'ERDTY300D', model: 'RD-TY300', tag: 'Tourney', spec: '6/7-speed' },
        { code: 'IRDR8000GS', model: 'RD-R8000', tag: 'Road · Ultegra', spec: '11-speed · GS' },
        { code: 'IRDR7000GSL', model: 'RD-R7000', tag: 'Road · 105', spec: '11-speed · GS' },
        { code: 'IRD4700GS', model: 'RD-4700', tag: 'Road · Tiagra', spec: '10-speed · GS' },
        { code: 'ERDR2000GS', model: 'RD-R2000', tag: 'Road · Claris', spec: '8-speed · GS' }
      ]
    },
    'STI Shifters Sets': {
      title: 'Top Picks',
      sub: 'Most requested shift / brake levers',
      picks: [
        { code: 'ISTR7000DPAL', model: 'ST-R7000 · set', tag: 'Road · 105', spec: 'Left + right · 2x11-speed' },
        { code: 'IST4700PAC2', model: 'ST-4700 · set', tag: 'Road · Tiagra', spec: 'Left + right · 2x10-speed' },
        { code: 'ISTR8000RI', model: 'ST-R8000 · right', tag: 'Road · Ultegra', spec: 'Right lever · 11-speed' },
        { code: 'ISTR7020RIL', model: 'ST-R7020 · right', tag: 'Road · 105', spec: 'Right lever · 11-speed' },
        { code: 'ISTR7120RBI', model: 'ST-R7120 · right', tag: 'Road · 105', spec: 'Right lever · 12-speed' },
        { code: 'ISTRX600RBI', model: 'ST-RX600 · right', tag: 'Gravel · GRX', spec: 'Right lever · 11-speed' },
        { code: 'ISTR8020RI', model: 'ST-R8020 · right', tag: 'Road · Ultegra', spec: 'Right lever · 11-speed · disc' },
        { code: 'ESTEF5004PV8A3', model: 'ST-EF500 · set', tag: 'MTB / Trekking', spec: 'Left + right · 3x8-speed' },
        { code: 'ESTEF5002RV8AL', model: 'ST-EF500 · right', tag: 'MTB / Trekking', spec: 'Right lever · 8-speed' },
        { code: 'ESTEF41R7AL', model: 'ST-EF41 · right', tag: 'Entry', spec: 'Right lever · 7-speed' }
      ]
    },
    'HUBS': {
      title: 'Top Picks',
      sub: 'Most requested hubs',
      picks: [
        { code: 'EHBTC50015B', model: 'HB-TC500-15', tag: 'Front · Trekking / MTB', spec: 'Thru axle · Center Lock' },
        { code: 'EFHTC500HMB', model: 'FH-TC500-HM', tag: 'Rear · 8/11-speed', spec: 'Thru axle · Center Lock' },
        { code: 'EFHTC500HMBC', model: 'FH-TC500-HM-B', tag: 'Rear · 8/11-speed', spec: 'Thru axle · Center Lock' },
        { code: 'EFHTC500MSA', model: 'FH-TC500-MS', tag: 'Rear · 12-speed', spec: 'Thru axle · Center Lock' },
        { code: 'EHBM8110BX', model: 'HB-M8110', tag: 'Front · Deore XT', spec: 'Thru axle · Center Lock' },
        { code: 'EFHM8110B', model: 'FH-M8110', tag: 'Rear · Deore XT', spec: '12-speed · Center Lock' },
        { code: 'EFHM8110BB', model: 'FH-M8110-B', tag: 'Rear · Deore XT', spec: '12-speed · Center Lock' },
        { code: 'EHBM5100B', model: 'HB-M5100', tag: 'Front · Deore', spec: 'Center Lock' },
        { code: 'EFHM5100BZBL', model: 'FH-M5100', tag: 'Rear · Deore', spec: 'Center Lock' },
        { code: 'EFHQC500MSBB41B', model: 'FH-QC500-MS-B', tag: 'Rear · 12-speed', spec: 'Center Lock' }
      ]
    },
    'Wheels': {
      title: 'Top Picks',
      sub: 'Most requested wheels',
      picks: [
        { code: 'EWHRS171FED70B', model: 'WH-RS171 · front', tag: 'Road · disc', spec: 'Clincher · thru axle' },
        { code: 'EWHRS171RED70B', model: 'WH-RS171 · rear', tag: 'Road · disc', spec: 'Clincher · thru axle' },
        { code: 'EWHRS100FB', model: 'WH-RS100 · front', tag: 'Road · rim brake', spec: 'Clincher' },
        { code: 'EWHRS100RCB', model: 'WH-RS100 · rear', tag: 'Road · rim brake', spec: 'Clincher' },
        { code: 'EWHR501PCBY', model: 'WH-R501 · set', tag: 'Road · rim brake', spec: 'Clincher' },
        { code: 'EWHRS370LFEDB', model: 'WH-RS370 · front', tag: 'Road · disc', spec: 'Tubeless · thru axle' },
        { code: 'EWHRS370LREDB', model: 'WH-RS370 · rear', tag: 'Road · disc', spec: 'Tubeless · thru axle' },
        { code: 'EWHRX570LFERED70', model: 'WH-RX570 · set', tag: 'Gravel · GRX', spec: '700C · tubeless' },
        { code: 'EWHMT500RD9C', model: 'WH-MT500 · rear', tag: 'MTB', spec: 'Clincher' },
        { code: 'EWHMT500R12D9', model: 'WH-MT500 · rear', tag: 'MTB', spec: 'Clincher · 12-speed' }
      ]
    },
    'Cables': {
      title: 'Top Picks',
      sub: 'Most requested cables, housing and hoses',
      picks: [
        { code: 'IOTSP41SET04', model: 'SP-41 · road set', tag: 'Shift cable set', spec: 'Stainless' },
        { code: 'IOTSP41SET03', model: 'SP-41 · MTB set', tag: 'Shift cable set', spec: 'Stainless' },
        { code: 'IOTSP41SET02', model: 'SP-41 · MTB set', tag: 'Shift cable set', spec: 'Polymer coated' },
        { code: 'IOTRS900SET01', model: 'OT-RS900 · road set', tag: 'Shift cable set', spec: 'Polymer coated' },
        { code: 'IBC9000SET01', model: 'BC-9000 · road set', tag: 'Brake cable set', spec: 'Polymer coated' },
        { code: 'IBCROADSET02', model: 'Road set', tag: 'Brake cable set', spec: 'Black' },
        { code: 'Y80098561', model: 'Road inner cable', tag: 'Brake cable', spec: 'Box' },
        { code: 'IOT41SP50ML', model: 'SP-41 outer', tag: 'Shift housing', spec: '50m' },
        { code: 'ESMBH90SSL170', model: 'SM-BH90-SS', tag: 'Disc brake hose', spec: '1700mm' },
        { code: 'ISMBH59SBL170', model: 'SM-BH59-SB', tag: 'Disc brake hose', spec: '1700mm' }
      ]
    },
    'Brake Sets': {
      title: 'Top Picks',
      sub: 'Most requested disc brake sets',
      picks: [
        { code: 'EMT201KRRXRA170', model: 'BR-MT200 · rear', tag: 'MTB · Altus', spec: 'Rear set' },
        { code: 'EMT201KLFPRA100', model: 'BR-MT200 · front', tag: 'MTB · Altus', spec: 'Front set' },
        { code: 'EMT4101JRRXRA170', model: 'BR-MT410 · rear', tag: 'MTB', spec: 'Rear set' },
        { code: 'EMT4101JLFPRA100', model: 'BR-MT410 · front', tag: 'MTB', spec: 'Front set' },
        { code: 'EM61001JRRXRA170', model: 'BR-M6100 · rear', tag: 'MTB · Deore', spec: 'Rear set' },
        { code: 'IM7100JLFPRA100', model: 'BR-M7100 · front', tag: 'MTB · SLX', spec: 'Front set' },
        { code: 'IM8100JLFPRA100', model: 'BR-M8100 · front', tag: 'MTB · Deore XT', spec: 'Front set' },
        { code: 'EBRM6100MPRX', model: 'BR-M6100', tag: 'MTB · Deore', spec: 'Caliper only' },
        { code: 'EBRMT410MPRXL', model: 'BR-MT410', tag: 'MTB', spec: 'Caliper only' },
        { code: 'EBRM375MPRL', model: 'BR-M375', tag: 'Entry', spec: 'Caliper only' }
      ]
    },
    'Brake Shoes': {
      title: 'Top Picks',
      sub: 'Featured brake shoes',
      picks: [
        { code: 'Y8L298050', model: 'Dura-Ace', tag: 'Road', spec: 'BR-9000' },
        { code: 'Y8LA98030', model: 'Ultegra', tag: 'Road', spec: 'BR-6800' },
        { code: 'Y2J398010', model: 'Ultegra', tag: 'Road', spec: 'BR-R8100' },
        { code: 'Y88T98020', model: '105', tag: 'Road', spec: 'BR-5800' },
        { code: 'Y8ZJ98010', model: '105', tag: 'Road', spec: 'BR-R7000' },
        { code: 'Y8LJ98010', model: '105', tag: 'Road', spec: 'BR-7010' },
        { code: 'Y8MG98090', model: 'Tiagra', tag: 'Road', spec: 'BR-4700 · 5 pairs' },
        { code: 'Y8JY98070', model: 'Tiagra', tag: 'Road', spec: 'BR-4600' },
        { code: 'Y2J498010', model: 'Ultegra', tag: 'Road', spec: 'BR-R8110' },
        { code: 'Y8BM9803A', model: 'Deore', tag: 'V-brake', spec: 'BR-MX70' }
      ]
    },
    'DI2': {
      title: 'Top Picks',
      sub: 'Most requested Di2 wires and junctions',
      picks: [
        { code: 'IEWSD300L030', model: 'EW-SD300 · 300mm', tag: 'Di2 wire', spec: 'External routing' },
        { code: 'IEWSD300L050', model: 'EW-SD300 · 500mm', tag: 'Di2 wire', spec: 'External routing' },
        { code: 'IEWSD300L060', model: 'EW-SD300 · 600mm', tag: 'Di2 wire', spec: 'External routing' },
        { code: 'IEWSD300L080', model: 'EW-SD300 · 800mm', tag: 'Di2 wire', spec: 'External routing' },
        { code: 'IEWSD300L100', model: 'EW-SD300 · 1000mm', tag: 'Di2 wire', spec: 'External routing' },
        { code: 'IEWSD300L120', model: 'EW-SD300 · 1200mm', tag: 'Di2 wire', spec: 'External routing' },
        { code: 'IEWSD50L50', model: 'EW-SD50 · 500mm', tag: 'Di2 wire', spec: 'External routing' },
        { code: 'IEWSD50L100', model: 'EW-SD50 · 1000mm', tag: 'Di2 wire', spec: 'External routing' },
        { code: 'IEWJC304', model: 'EW-JC304', tag: 'Junction', spec: '4 ports' },
        { code: 'IEWJC302', model: 'EW-JC302', tag: 'Junction', spec: '2 ports' }
      ]
    },
    'Battery Charger': {
      title: 'Top Picks',
      sub: 'Battery chargers',
      picks: [
        { code: 'ISMBCR2', model: 'SM-BCR2', tag: 'Charger', spec: 'For SM-BTR2' },
        { code: 'IECDN100A', model: 'EC-DN100', tag: 'Charger', spec: 'Di2 / STEPS' },
        { code: 'IECE6002D', model: 'EC-E8004-1', tag: 'Charger', spec: 'STEPS' },
        { code: 'IECE80041A', model: 'EC-E6002', tag: 'Charger', spec: 'STEPS' }
      ]
    },
    'SHIMANO TOOLS': {
      title: 'Top Picks',
      sub: 'Most requested workshop tools',
      picks: [
        { code: 'Y13098550', model: 'TL-CN34', tag: 'Pro chain tool', spec: '11-speed' },
        { code: 'Y13098700', model: 'TL-CN29', tag: 'Chain tool', spec: '12-speed' },
        { code: 'Y12160000', model: 'TL-CN42', tag: 'Chain wear indicator', spec: 'Quick check' },
        { code: 'Y13009220', model: 'TL-FC16', tag: 'Crank arm tool', spec: 'Hollowtech II' },
        { code: 'Y13009210', model: 'TL-FC32', tag: 'BB adapter tool', spec: 'Hollowtech II BB' },
        { code: 'Y12009220', model: 'TL-LR10', tag: 'Lock ring tool', spec: 'Center Lock' },
        { code: 'Y13009073', model: 'TL-UN74-S', tag: 'Cartridge BB tool', spec: 'Square taper BB' },
        { code: 'Y13098730', model: 'TL-SR24', tag: 'Sprocket removal tool', spec: '10-12 speed' },
        { code: 'Y13098570', model: 'TL-BH62', tag: 'Hose cut & set tool', spec: 'Disc brake hose' },
        { code: 'Y13098630', model: 'TL-BR', tag: 'Disc brake bleed kit', spec: 'Professional' }
      ]
    },
    'Parktool': {
      title: 'Top Picks',
      sub: 'Featured ParkTool workshop essentials',
      picks: [
        { code: 'PTCC32C', model: 'CC-3.2', tag: 'Chain checker', spec: 'Wear gauge' },
        { code: 'PTCT33', model: 'CT-3.3', tag: 'Chain tool', spec: 'Workshop' },
        { code: 'PT0MLP1', model: 'MLP-1.2', tag: 'Master link pliers', spec: 'Quick link' },
        { code: 'PT101154', model: 'TL-5', tag: 'Tire levers', spec: 'Heavy duty steel' },
        { code: 'PT100053', model: 'AWS-10', tag: 'Hex wrench set', spec: 'Fold-up' },
        { code: 'PTFR52', model: 'FR-5.2', tag: 'Cassette lockring tool', spec: 'Shimano / SRAM' },
        { code: 'PTSR182', model: 'SR-18.2', tag: 'Chain whip', spec: 'Sprocket remover' },
        { code: 'PTBBT22', model: 'BBT-22', tag: 'BB tool', spec: '20 spline' },
        { code: 'PTTW52', model: 'TW-5.2', tag: 'Torque wrench', spec: 'Ratcheting click-type' },
        { code: 'PT100782', model: 'PW-4', tag: 'Pedal wrench', spec: 'Professional' }
      ]
    },
    'Vittoria': {
      title: 'Top Picks',
      sub: 'Featured Vittoria tires and tubes',
      picks: [
        { code: '11A00400', model: 'Corsa N.EXT', tag: 'Road · 700x28c', spec: 'Folding · tubeless ready' },
        { code: '11A01158', model: 'Corsa Pro', tag: 'Road · 700x28c', spec: 'Folding · tubeless ready' },
        { code: '11A00600', model: 'Rubino V', tag: 'Road · 700x28c', spec: 'Folding' },
        { code: '11A00590', model: 'Rubino V', tag: 'Road · 700x28c', spec: 'Tubeless ready' },
        { code: '11A00937', model: 'Zaffiro Evo', tag: 'Road · 700x28c', spec: 'Folding' },
        { code: '11A00806', model: 'Terreno T30', tag: 'Gravel · 700x40c', spec: 'Tubeless ready' },
        { code: '11A00711', model: 'Mezcal XC Race', tag: 'MTB · 29x2.4', spec: 'Tubeless ready' },
        { code: '11A00772', model: 'Barzo Trail', tag: 'MTB · 29x2.4', spec: 'Tubeless ready' },
        { code: '1TA00010', model: 'Standard inner tube', tag: '700x20/28c', spec: 'Presta 48mm' },
        { code: '1AA00541', model: 'Airliner Light Road', tag: 'Tire insert', spec: '700x28-30' }
      ]
    }

  };

  var css =
    '.tp-wrap{margin:-6px 0 14px 0}' +
    '.tp-head{display:flex;align-items:baseline;gap:10px;margin:0 0 6px 2px}' +
    '.tp-title{font-family:"Barlow Condensed",Arial,sans-serif;font-weight:700;font-size:16px;letter-spacing:.1em;text-transform:uppercase;color:var(--text,#fff)}' +
    '.tp-title i{font-style:normal;color:#0082CA}' +
    '.tp-sub{font-size:11px;color:var(--text2,#9aa);letter-spacing:.03em}' +
    '.tp-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:7px}' +
    '.tp-card{display:flex;flex-direction:column;gap:3px;padding:8px 9px 7px;min-width:0;' +
      'background:var(--surface,#111118);border:1px solid var(--border,#1e1e2e);border-radius:8px;' +
      'box-shadow:inset 0 2px 0 #0082CA}' +
    '.tp-tag{font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#0082CA;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
    '.tp-model{align-self:flex-start;font-family:"Barlow Condensed",Arial,sans-serif;font-weight:700;font-size:17px;line-height:1.05;color:var(--text,#fff)}' +
    '.tp-model.tp-ph{cursor:zoom-in;border-bottom:1px dotted #0082CA}' +
    '.tp-model.tp-ph::after{content:"";display:inline-block;width:13px;height:13px;margin-left:5px;vertical-align:-1px;opacity:.85;background:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%230082CA%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z%27/%3E%3Ccircle cx=%2712%27 cy=%2713%27 r=%274%27/%3E%3C/svg%3E") center/contain no-repeat}' +
    '.tp-model.tp-ph:hover::after{opacity:1}' +
    '.tp-code{font-size:10px;color:var(--text3,#6b7280);letter-spacing:.04em}' +
    '.tp-spec{font-size:11px;line-height:1.3;color:var(--text2,#9aa);min-height:28px}' +
    '.tp-foot{display:flex;align-items:center;justify-content:space-between;gap:6px;margin-top:auto;padding-top:3px}' +
    '.tp-st{font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap}' +
    '.tp-st.av{color:#00c896}.tp-st.etd{color:#f5a623}' +
    '.tp-add{display:flex;align-items:center;gap:4px}' +
    '.tp-qty{width:38px;padding:4px 2px;text-align:center;background:var(--surface,#111118);color:var(--text,#fff);' +
      'border:1px solid var(--border,#1e1e2e);border-radius:5px;font-family:"Barlow Condensed",sans-serif;font-size:13px;font-weight:600}' +
    '.tp-btn{padding:5px 9px;border:0;border-radius:5px;background:#0082CA;color:#fff;cursor:pointer;' +
      'font-family:"Barlow Condensed",Arial,sans-serif;font-weight:700;font-size:13px;letter-spacing:.06em;text-transform:uppercase}' +
    '.tp-btn:hover{background:#0a94e0}' +
    '#tpPhoto{position:fixed;z-index:99999;display:none;width:240px;height:240px;padding:6px;box-sizing:border-box;' +
      'background:#fff;border:1px solid rgba(0,130,202,.6);border-radius:10px;box-shadow:0 14px 40px rgba(0,0,0,.55);pointer-events:none}' +
    '#tpPhoto img{width:100%;height:100%;object-fit:contain;display:block}' +
    '@media(max-width:1200px){.tp-grid{grid-template-columns:repeat(4,1fr)}}' +
    '@media(max-width:900px){.tp-grid{grid-template-columns:repeat(2,1fr);gap:6px}.tp-sub{display:none}.tp-spec{min-height:0}}';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function ensureHost() {
    var host = document.getElementById('topPicks');
    if (host) return host;
    var anchor = document.getElementById('categoryVideo');
    if (!anchor || !anchor.parentNode) return null;
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    host = document.createElement('div');
    host.id = 'topPicks';
    host.className = 'tp-wrap';
    host.setAttribute('lang', 'en');
    host.style.display = 'none';
    anchor.parentNode.insertBefore(host, anchor.nextSibling);
    return host;
  }

  function itemByCode(code) {
    if (typeof allItems === 'undefined') return null;
    for (var i = 0; i < allItems.length; i++) if (allItems[i].code === code) return allItems[i];
    return null;
  }

  function stBadge(it) {
    if (it.status === 'available') return '<span class="tp-st av">In stock</span>';
    return '<span class="tp-st etd">ETD' + (it.etd ? ' ' + esc(it.etd) : '') + '</span>';
  }

  /* Photo on hover: reuses the page's product-photo map (pvHas / pvUrls). On touch screens a tap toggles it. */
  function hasPhoto(code) { return typeof window.pvHas === 'function' && window.pvHas(code); }
  var pop = null, popImg = null;
  function getPop() {
    if (pop) return pop;
    pop = document.createElement('div'); pop.id = 'tpPhoto';
    popImg = document.createElement('img'); popImg.alt = '';
    pop.appendChild(popImg); document.body.appendChild(pop);
    return pop;
  }
  function showPhoto(el) {
    var code = el.getAttribute('data-code');
    var urls = (typeof window.pvUrls === 'function') ? window.pvUrls(code) : [];
    if (!urls.length) return;
    var p = getPop(), url = urls[0];
    popImg.onerror = function () {
      if (popImg.getAttribute('data-step') !== '1') {
        popImg.setAttribute('data-step', '1');
        popImg.src = 'https://wsrv.nl/?url=' + encodeURIComponent(url.replace(/^https:/, 'http:')) + '&w=500&we&output=jpg';
      } else { p.style.display = 'none'; }
    };
    popImg.setAttribute('data-step', '0');
    popImg.src = url;
    var r = el.getBoundingClientRect(), W = 240, H = 240;
    var left = Math.max(8, Math.min(r.left, window.innerWidth - W - 8));
    var top = r.bottom + 8;
    if (top + H > window.innerHeight - 8) top = Math.max(8, r.top - H - 8);
    p.style.left = left + 'px'; p.style.top = top + 'px'; p.style.display = 'block';
  }
  function hidePhoto() { if (pop) pop.style.display = 'none'; }

  document.addEventListener('mouseover', function (e) {
    var m = e.target && e.target.closest ? e.target.closest('.tp-model.tp-ph') : null;
    if (m) showPhoto(m);
  });
  document.addEventListener('mouseout', function (e) {
    var m = e.target && e.target.closest ? e.target.closest('.tp-model.tp-ph') : null;
    if (m) hidePhoto();
  });
  document.addEventListener('click', function (e) {
    var m = e.target && e.target.closest ? e.target.closest('.tp-model.tp-ph') : null;
    if (m && window.matchMedia && window.matchMedia('(hover: none)').matches) {
      if (pop && pop.style.display === 'block') hidePhoto(); else showPhoto(m);
    } else if (!m) hidePhoto();
  });
  window.addEventListener('scroll', hidePhoto, true);

  function render() {
    var host = ensureHost();
    if (!host) return;
    var cfg = null;
    try {
      cfg = (typeof currentCat !== 'undefined' && !searchQuery) ? window.TOP_PICKS[currentCat] : null;
    } catch (e) { cfg = null; }
    if (!cfg) { hidePhoto(); host.style.display = 'none'; host.innerHTML = ''; return; }

    var cards = [];
    cfg.picks.forEach(function (p) {
      var it = itemByCode(p.code);
      if (!it || (it.status !== 'available' && it.status !== 'etd')) return;
      cards.push(
        '<div class="tp-card">' +
          '<div class="tp-tag">' + esc(p.tag) + '</div>' +
          '<div class="tp-model' + (hasPhoto(it.code) ? ' tp-ph' : '') + '" data-code="' + esc(it.code) + '">' + esc(p.model || it.desc2 || it.desc1) + '</div>' +
          '<div class="tp-spec">' + esc(p.spec || it.desc1) + '</div>' +
          '<div class="tp-code">' + esc(it.code) + '</div>' +
          '<div class="tp-foot">' + stBadge(it) +
            '<span class="tp-add"><input class="tp-qty" type="number" min="1" value="1" aria-label="Quantity">' +
            '<button class="tp-btn" type="button" data-code="' + esc(it.code) + '">Add</button></span>' +
          '</div>' +
        '</div>');
    });

    if (cards.length < MIN_PICKS) { host.style.display = 'none'; host.innerHTML = ''; return; }
    host.innerHTML =
      '<div class="tp-head"><span class="tp-title"><i>★</i> ' + esc(cfg.title || 'Top Picks') + '</span>' +
      '<span class="tp-sub">' + esc(cfg.sub || '') + '</span></div>' +
      '<div class="tp-grid">' + cards.join('') + '</div>';
    host.style.display = '';
  }

  /* One delegated click handler: adds the typed quantity on top of what is already in the order */
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest ? e.target.closest('.tp-btn') : null;
    if (!b) return;
    var code = b.getAttribute('data-code');
    var it = itemByCode(code);
    if (!it || typeof setQty !== 'function') return;
    var card = b.closest('.tp-card');
    var add = parseInt(card.querySelector('.tp-qty').value, 10);
    if (!add || add < 1) add = 1;
    var cur = (typeof orderList !== 'undefined' && orderList[code]) ? (orderList[code].qty || orderList[code]) : 0;
    cur = parseInt(cur, 10) || 0;
    var total = cur + add;
    setQty(code, it.desc1 || code, String(total));
    document.querySelectorAll('.qty-input[data-code="' + code + '"]').forEach(function (el) { el.value = total; });
  });

  /* Re-render whenever the page redraws the category banner (category / search / page changes) */
  var orig = window.updateCategoryBanner;
  if (typeof orig === 'function') {
    window.updateCategoryBanner = function () {
      var r = orig.apply(this, arguments);
      try { render(); } catch (e) {}
      return r;
    };
  }
  document.addEventListener('DOMContentLoaded', function () { try { render(); } catch (e) {} });
  try { render(); } catch (e) {}
})();
