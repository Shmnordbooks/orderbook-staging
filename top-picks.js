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

  /* Picks ranked by 2026 units (invoiced + open) from the TUG sales
     report (9 Nov 2026), limited to items that exist in this catalog
     and are available / ETD. Update yearly from a new report. */
  window.TOP_PICKS = window.TOP_PICKS || {
    'Bottom Bracket': {
      title: 'Top Picks',
      sub: 'Best sellers · 2026',
      picks: [
        { code: 'ISMBB9241B', model: 'SM-BB92', tag: 'Bottom bracket', spec: 'PrFit 86.5mm · Road' },
        { code: 'ISMBB7241B', model: 'SM-BB72', tag: 'Bottom bracket', spec: 'PrFit 86.5mm · Road' },
        { code: 'ISMBBR60B', model: 'SM-BBR60', tag: 'Road', spec: 'Ultegra · BSA 68mm · Hollowtech II' },
        { code: 'IBBR9100B', model: 'BB-R9100', tag: 'Bottom bracket', spec: 'BSA' },
        { code: 'EBBRS501B', model: 'BB-RS501', tag: 'Road + MTB', spec: 'BSA threaded · Hollowtech II' },
        { code: 'ISMBB7141B', model: 'SM-BB71', tag: 'Bottom bracket', spec: 'PrFit 86.5mm · Road' },
        { code: 'IBBR9100I', model: 'BB-R9100', tag: 'Road', spec: 'Dura-Ace · Italian 70mm' },
        { code: 'ISMBB93B', model: 'SM-BB93', tag: 'MTB · XTR', spec: 'BSA 68mm · Hollowtech II' },
        { code: 'EBBUN300C18X', model: 'BB-UN300', tag: 'Bottom bracket', spec: 'BSA 118/73mm · Square' },
        { code: 'EBBRS500PB', model: 'BB-RS500', tag: 'Road', spec: 'Press-fit · Hollowtech II' }
      ]
    },
    'Chain': {
      title: 'Top Picks',
      sub: 'Best sellers · 2026',
      picks: [
        { code: 'ICNM8100126Q', model: 'CN-M8100', tag: 'MTB · Deore XT', spec: '12-speed · 126 links · Quick Link' },
        { code: 'ICNM9100126Q', model: 'CN-M9100', tag: 'Chain', spec: '126 Links · 11/12-speed' },
        { code: 'ECNHG40116Q', model: 'CN-HG40', tag: 'Entry · 6/7/8-speed', spec: '6/7/8-speed · 116 links' },
        { code: 'ECNHG71C116I', model: 'CN-HG71', tag: '6/7/8-speed', spec: '6/7/8-speed · 116 links' },
        { code: 'ICNHG60111116Q', model: 'CN-HG601', tag: 'Road + MTB', spec: '11-speed · 116 links · Quick Link' },
        { code: 'ICNM7100126Q', model: 'CN-M7100', tag: 'Chain', spec: '126 Links · SLX 12-speed' },
        { code: 'ICNHG70111116Q', model: 'CN-HG701', tag: 'Road + MTB', spec: '11-speed · 116 links · Quick Link' },
        { code: 'ICNHG70111126Q', model: 'CN-HG701', tag: 'Chain', spec: '126 Links · 11-speed' },
        { code: 'ICNHG90111116Q', model: 'CN-HG901', tag: 'Chain', spec: '116 Links · 11-speed' },
        { code: 'ICNM6100126Q', model: 'CN-M6100', tag: 'MTB · Deore', spec: '12-speed · 126 links · Quick Link' }
      ]
    },
    'Cassettes': {
      title: 'Top Picks',
      sub: 'Best sellers · 2026',
      picks: [
        { code: 'ICSR710112134', model: 'CS-R7101', tag: 'Road · 105', spec: '12-speed · 11-34T' },
        { code: 'ICSR810112130', model: 'CS-R8101', tag: 'Cassette', spec: '12-speed 11-30T · Ultegra' },
        { code: 'ICSR810112134', model: 'CS-R8101', tag: 'Road · Ultegra', spec: '12-speed · 11-34T' },
        { code: 'ICSR920012130', model: 'CS-R9200', tag: 'Cassette', spec: '12-speed 11-30T · Dura-Ace' },
        { code: 'ECSHG318134', model: 'CS-HG31', tag: 'Cassette', spec: '8-speed 11-34T · Altus' },
        { code: 'ICSR700011132', model: 'CS-R7000', tag: 'Cassette', spec: '11-speed 11-32T · 105' },
        { code: 'ICSHG508225', model: 'CS-HG50', tag: 'Cassette', spec: '8-speed 12-25T · Claris' },
        { code: 'ICSR920012134', model: 'CS-R9200', tag: 'Cassette', spec: '12-speed 11-34T · Dura-Ace' },
        { code: 'ICSR800011132', model: 'CS-R8000', tag: 'Cassette', spec: '11-speed 11-32T · Ultegra' },
        { code: 'ICSR700011130', model: 'CS-R7000', tag: 'Cassette', spec: '11-speed 11-30T · 105' }
      ]
    },
    'Crankset': {
      title: 'Top Picks',
      sub: 'Best sellers · 2026',
      picks: [
        { code: 'IFCR8100AX26', model: 'FC-R8100', tag: 'Crankset', spec: '12-speed · 52/36T 165mm' },
        { code: 'IFCR9200AX26', model: 'FC-R9200', tag: 'Crankset', spec: '12-speed · 52/36T 165mm' },
        { code: 'IFCR8100CX26', model: 'FC-R8100', tag: 'Road · Ultegra', spec: '2x12 · 52/36T · 170mm' },
        { code: 'EFCTY5012C60XLB', model: 'FC-TY501-2', tag: 'Crankset', spec: '7/8-speed · 46/30T 170mm' },
        { code: 'IFCR7100AX26', model: 'FC-R7100', tag: 'Crankset', spec: '12-speed Black · 52/36T 165mm' },
        { code: 'EFCR2000CX04X', model: 'FC-R2000', tag: 'Crankset', spec: '8-speed · 50/34T 170mm' },
        { code: 'IFCR9200PAXXF', model: 'FC-R9200', tag: 'Crankset', spec: '12-speed · 165mm w/o CR' },
        { code: 'IFCR7100CX04', model: 'FC-R7100', tag: 'Road · 105', spec: '2x12 · 50/34T · 170mm' },
        { code: 'IFCR9200CX40', model: 'FC-R9200', tag: 'Crankset', spec: '12-speed · 54/40T 170mm' },
        { code: 'IFCR9200MX40', model: 'FC-R9200', tag: 'Crankset', spec: '12-speed · 54/40T 160mm w/o CG' }
      ]
    },
    'Rotors': {
      title: 'Top Picks',
      sub: 'Best sellers · 2026',
      picks: [
        { code: 'IRTCL900SI', model: 'RT-CL900 · 160mm', tag: 'Road', spec: 'Center Lock · internal lockring' },
        { code: 'IRTCL800SI', model: 'RT-CL800 · 160mm', tag: 'Gravel · GRX', spec: 'Center Lock · internal lockring' },
        { code: 'IRTCL800SSI', model: 'RT-CL800', tag: 'Disc rotor', spec: '140mm Lock Int. · w/LRing' },
        { code: 'IRTCL900SSI', model: 'RT-CL900', tag: 'Disc rotor', spec: '140mm Lock Int. · w/LRing' },
        { code: 'IRTCL800SE', model: 'RT-CL800 · 160mm', tag: 'Gravel · GRX', spec: 'Center Lock · external lockring' },
        { code: 'IRTCL800SSE', model: 'RT-CL800', tag: 'Disc rotor', spec: '140mm Lock Ext. · w/LRing' },
        { code: 'ESMRT66SP', model: 'SM-RT66', tag: 'Disc rotor', spec: '160mm 6-Bolt' },
        { code: 'ESMRT64SSI3C', model: 'SM-RT64', tag: 'Disc rotor', spec: '140mm Lock Int. · w/LRing Black' },
        { code: 'IRTCL900SE', model: 'RT-CL900', tag: 'Disc rotor', spec: '160mm Lock Ext. · w/LRing' },
        { code: 'ESMRT64SEC', model: 'SM-RT64 · 160mm', tag: 'MTB · Deore', spec: 'Center Lock · external lockring' }
      ]
    },
    'DiscBreakPads': {
      title: 'Top Picks',
      sub: 'Best sellers · 2026',
      picks: [
        { code: 'EBPL05ARFA', model: 'L05A', tag: 'Resin · Road', spec: '1 pair · 105 / Ultegra / Dura-Ace disc' },
        { code: 'EBPB05SRXA', model: 'B05S', tag: 'Resin · MTB', spec: '1 pair · for BR-MT200 / MT400 / MT500' },
        { code: 'EBPK05SRXA', model: 'K05S', tag: 'Resin pads', spec: '1 pair' },
        { code: 'IBPL04CMFA', model: 'L04C', tag: 'Metal', spec: '1 pair' },
        { code: 'EBPJ05ARFA', model: 'J05A', tag: 'Resin', spec: '1 pair' },
        { code: 'EBPD03SRXA', model: 'D03S', tag: 'Resin', spec: '1 pair' },
        { code: 'IBPK05TIRXA', model: 'K05T', tag: 'Resin pads', spec: '1 pair' },
        { code: 'EBPG05SRXA', model: 'G05S', tag: 'Resin pads', spec: '1 pair' },
        { code: 'IBPJ04CMFA', model: 'J04C', tag: 'Metal', spec: '1 pair · XTR / XT / SLX / Deore 2-piston' },
        { code: 'IBPM05RXA', model: 'M05R', tag: 'Resin pads', spec: '1 pair' }
      ]
    },
    'Dreailleur': {
      title: 'Top Picks',
      sub: 'Best sellers · 2026',
      picks: [
        { code: 'ERDTY300D', model: 'RD-TY300', tag: 'Tourney', spec: '6/7-speed' },
        { code: 'ERDM310DL', model: 'RD-M310', tag: 'MTB · Altus', spec: '7/8-speed' },
        { code: 'ERDTX800SGSL', model: 'RD-TX800', tag: 'Rear derailleur', spec: '7/8-speed Black · Tourney TX' },
        { code: 'ERDU4000GS', model: 'RD-U4000', tag: 'Rear derailleur', spec: '9-speed SGS · Cues' },
        { code: 'ERDU6000GS', model: 'RD-U6000', tag: 'Rear derailleur', spec: '10/11-speed GS · Cues' },
        { code: 'ERDM310DS', model: 'RD-M310', tag: 'Rear derailleur', spec: '7/8-speed Slvr SGS · Altus' },
        { code: 'ERDR2000GS', model: 'RD-R2000', tag: 'Road · Claris', spec: '8-speed · GS' },
        { code: 'IRDR9250F', model: 'RD-R9250', tag: 'Rear derailleur', spec: '12-speed Di2 · Dura-Ace' },
        { code: 'IRDR7150E', model: 'RD-R7150', tag: 'Rear derailleur', spec: '12-speed Di2 · 105' },
        { code: 'IRDR8150F', model: 'RD-R8150', tag: 'Rear derailleur', spec: '12-speed Di2 · Ultegra' }
      ]
    },
    'STI Shifters Sets': {
      title: 'Top Picks',
      sub: 'Best sellers · 2026',
      picks: [
        { code: 'ESTEF5004PV8A3', model: 'ST-EF500 · set', tag: 'MTB / Trekking', spec: 'Left + right · 3x8-speed' },
        { code: 'ISTR8170LF', model: 'ST-R8170', tag: 'STI lever · left', spec: '2-speed Di2 · Ultegra' },
        { code: 'ESTR2000RIA', model: 'ST-R2000-R', tag: 'STI lever · right', spec: '8-speed · Claris' },
        { code: 'ESTR2000LIA', model: 'ST-R2000-L', tag: 'STI lever · left', spec: '2-speed · Claris' },
        { code: 'ESTEF41R7AL', model: 'ST-EF41 · right', tag: 'Entry', spec: 'Right lever · 7-speed' },
        { code: 'ESTEF41LBL', model: 'ST-EF41-L', tag: 'STI lever · left', spec: '3-speed · EZ-Fire' },
        { code: 'ISTR9180R', model: 'ST-R9180', tag: 'STI lever · right', spec: '11-speed Di2 · Dura-Ace TT' },
        { code: 'ESTR3000RIA', model: 'ST-R3000', tag: 'STI lever · right', spec: '9-speed · Sora' },
        { code: 'ESTR3000LIA', model: 'ST-R3000', tag: 'STI lever · left', spec: '2-speed · Sora' },
        { code: 'ISTR9180L', model: 'ST-R9180', tag: 'STI lever · left', spec: '2-speed Di2 · Dura-Ace TT/Tri' }
      ]
    },
    'HUBS': {
      title: 'Top Picks',
      sub: 'Best sellers and featured hubs',
      picks: [
        { code: 'EFHQC300HMBZBP', model: 'FH-QC300-HM', tag: 'Rear hub', spec: '8/11-speed 135/32 Black · Disc Brake CL' },
        { code: 'EHBQC300BALP', model: 'HB-QC300', tag: 'Front hub', spec: '100/32 Black · Disc Brake CL' },
        { code: 'EHBTC50015B', model: 'HB-TC500-15', tag: 'Front · Trekking / MTB', spec: 'Thru axle · Center Lock' },
        { code: 'EFHTC500HMB', model: 'FH-TC500-HM', tag: 'Rear · 8/11-speed', spec: 'Thru axle · Center Lock' },
        { code: 'EFHTC500HMBC', model: 'FH-TC500-HM-B', tag: 'Rear · 8/11-speed', spec: 'Thru axle · Center Lock' },
        { code: 'EFHTC500MSA', model: 'FH-TC500-MS', tag: 'Rear · 12-speed', spec: 'Thru axle · Center Lock' },
        { code: 'EHBM8110BX', model: 'HB-M8110', tag: 'Front · Deore XT', spec: 'Thru axle · Center Lock' },
        { code: 'EFHM8110B', model: 'FH-M8110', tag: 'Rear · Deore XT', spec: '12-speed · Center Lock' },
        { code: 'EFHM8110BB', model: 'FH-M8110-B', tag: 'Rear · Deore XT', spec: '12-speed · Center Lock' },
        { code: 'EHBM5100B', model: 'HB-M5100', tag: 'Front · Deore', spec: 'Center Lock' }
      ]
    },
    'Wheels': {
      title: 'Top Picks',
      sub: 'Best sellers · 2026',
      picks: [
        { code: 'EWHRS370LREDB', model: 'WH-RS370 · rear', tag: 'Wheel', spec: 'Tubeless Disc Brake E-thru' },
        { code: 'EWHRS370LFEDB', model: 'WH-RS370 · front', tag: 'Wheel', spec: 'Tubeless Disc Brake E-thru' },
        { code: 'EWHRS100RCB', model: 'WH-RS100 · rear', tag: 'Wheel', spec: 'Clincher Rim Brake QR' },
        { code: 'EWHRS100FB', model: 'WH-RS100 · front', tag: 'Wheel', spec: 'Clincher Rim Brake QR' },
        { code: 'EWHR9270C60LREDX', model: 'WH-R9270-C60 · rear', tag: 'Wheel', spec: 'Carbon Tubeless Disc brake E-thru' },
        { code: 'EWHR9270C60LFEDX', model: 'WH-R9270-C60 · front', tag: 'Wheel', spec: 'Carbon Tubeless Disc brake E-thru' },
        { code: 'EWHR8170C60LRED', model: 'WH-R8170-C60 · rear', tag: 'Wheel', spec: 'Tubeless Disc Brake E-thru' },
        { code: 'EWHR8170C60LFED', model: 'WH-R8170-C60 · front', tag: 'Wheel', spec: 'Tubeless Disc Brake E-thru' },
        { code: 'EWHR9270C50LREDX', model: 'WH-R9270-C50 · rear', tag: 'Wheel', spec: 'Carbon Tubeless Disc brake E-thru' },
        { code: 'EWHR9270C50LFEDX', model: 'WH-R9270-C50 · front', tag: 'Wheel', spec: 'Carbon Tubeless Disc brake E-thru' }
      ]
    },
    'Cables': {
      title: 'Top Picks',
      sub: 'Best sellers · 2026',
      picks: [
        { code: 'ISMBH90JKSSL170', model: 'SM-BH90-JK-SSR', tag: 'Brake hose', spec: '1700mm Black' },
        { code: 'Y63Z27000', model: 'ST-9000', tag: 'Cable cap', spec: 'w/ Short Nose' },
        { code: 'ISMBH90JKSSL100', model: 'SM-BH90-JK-SSR', tag: 'Brake hose', spec: '1000mm Black' },
        { code: 'ISMBH90SBL170', model: 'SM-BH90-SB', tag: 'Brake hose', spec: '1700mm Black' },
        { code: 'ISMBH59SBL170', model: 'SM-BH59-SB', tag: 'Disc brake hose', spec: '1700mm' },
        { code: 'ESMBH59JKL100', model: 'SM-BH59', tag: 'Brake hose', spec: '1000mm Black' },
        { code: 'ISMBH90BOX01', model: 'SM-BH90', tag: 'Brake hose', spec: '30m · Black' },
        { code: 'ISMBH90SBL100', model: 'SM-BH90-SB', tag: 'Brake hose', spec: '1000mm Black' },
        { code: 'ISMBH90SBSL170', model: 'SM-BH90-SBS', tag: 'Brake hose', spec: '1700mm Black · ZEE' },
        { code: 'ISMBH90SBLSL200', model: 'SM-BH90-SBLS', tag: 'Brake hose', spec: '2000mm Black · Saint' }
      ]
    },
    'Brake Sets': {
      title: 'Top Picks',
      sub: 'Best sellers · 2026',
      picks: [
        { code: 'ESMRTAD05', model: 'SM-RTAD05', tag: 'Rotor adapter', spec: 'for 6 Bolt Disc' },
        { code: 'EMT201KLFPRA100', model: 'BR-MT200 · front', tag: 'MTB · Altus', spec: 'Front set' },
        { code: 'EMT201KRRXRA170', model: 'BR-MT200 · rear', tag: 'MTB · Altus', spec: 'Rear set' },
        { code: 'EBLMT200RL', model: 'BL-MT200', tag: 'Brake lever · right', spec: '3-fgr Black · Altus Disc Brake' },
        { code: 'IR8170DRRDSC170F', model: 'BR-R8170 · rear', tag: 'Disc brake set', spec: 'ST-R8170 lever set' },
        { code: 'IR8170DLF6SC100F', model: 'BR-R8170 · front', tag: 'Disc brake set', spec: 'ST-R8170 lever set' },
        { code: 'IR7170DRRDSC170E', model: 'BR-7170 · rear', tag: 'Disc brake set', spec: 'ST-R7170 lever set' },
        { code: 'IR7170DLF6SC100E', model: 'BR-7170 · front', tag: 'Disc brake set', spec: 'ST-R7170 lever set' },
        { code: 'IR9270DRRDSC170F', model: 'BR-R9270 · rear', tag: 'Disc brake set', spec: 'ST-R9270 lever set' },
        { code: 'EBLMT200LL', model: 'BL-MT200', tag: 'Brake lever · left', spec: '3-fgr Black · Altus Disc Brake' }
      ]
    },
    'Brake Shoes': {
      title: 'Top Picks',
      sub: 'Best sellers · 2026',
      picks: [
        { code: 'Y8BM9810A', model: 'BR-MX70', tag: 'Brake shoes', spec: 'M70T3 · Deore 1 pair' },
        { code: 'Y8BM9803A', model: 'BR-MX70', tag: 'Brake shoes', spec: 'M70T4 · Deore 1 pair' },
        { code: 'Y8PP98060', model: 'BR-R9100', tag: 'Brake Shoes R55C4 Carbon', spec: 'Dura-Ace 1 pair' },
        { code: 'Y8L298070', model: 'BR-9000', tag: 'Brake Shoes R55C4 Carbon', spec: '/7900 Dura-Ace 1 pair' },
        { code: 'Y8L298062', model: 'BR-9000', tag: 'Brake Shoes R55C4 Cart-t', spec: '/7900 Dura-Ace 2 pairs' },
        { code: 'Y2J398010', model: 'BR-R8100', tag: 'Brake shoes', spec: 'R55C4 · Ultegra 1 pair' },
        { code: 'Y88T98020', model: 'BR-5800', tag: 'Brake shoes', spec: 'Set R55C4 Cart-type · Black 105 1 pair' },
        { code: 'Y8L298050', model: 'BR-9000', tag: 'Brake shoes', spec: 'Set R55C4 Cart-type · Dura-Ace 1 pair' },
        { code: 'Y2J498010', model: 'BR-R8110', tag: 'Brake shoes', spec: 'R55C4 · Ultegra 1 pair' },
        { code: 'Y8GP9810A', model: 'BR-M420', tag: 'Brake shoes', spec: 'S65T · 10 pairs' }
      ]
    },
    'DI2': {
      title: 'Top Picks',
      sub: 'Best sellers · 2026',
      picks: [
        { code: 'IEWEC300A', model: 'EW-EC300', tag: 'Charging cable', spec: '1500mm' },
        { code: 'IEWSD300L120', model: 'EW-SD300 · 1200mm', tag: 'Di2 wire', spec: 'External routing' },
        { code: 'IEWSD300L140', model: 'EW-SD300', tag: 'Di2 wire', spec: '1400mm Black · External Routing' },
        { code: 'IEWSD300L160', model: 'EW-SD300', tag: 'Di2 wire', spec: '1600mm Black · External Routing' },
        { code: 'IEWSD300L100', model: 'EW-SD300 · 1000mm', tag: 'Di2 wire', spec: 'External routing' },
        { code: 'IEWSD300L090', model: 'EW-SD300', tag: 'Di2 wire', spec: '900mm Black · External Routing' },
        { code: 'IEWSD300L080', model: 'EW-SD300 · 800mm', tag: 'Di2 wire', spec: 'External routing' },
        { code: 'IEWAD305', model: 'EW-AD305', tag: 'Adapter', spec: '' },
        { code: 'IEWSD300L060', model: 'EW-SD300 · 600mm', tag: 'Di2 wire', spec: 'External routing' },
        { code: 'IEWSD300L050', model: 'EW-SD300 · 500mm', tag: 'Di2 wire', spec: 'External routing' }
      ]
    },
    'Battery Charger': {
      title: 'Top Picks',
      sub: 'Best sellers · 2026',
      picks: [
        { code: 'ISMBCR2', model: 'SM-BCR2', tag: 'Charger', spec: 'For SM-BTR2' },
        { code: 'IECDN100A', model: 'EC-DN100', tag: 'Charger', spec: 'Di2 / STEPS' },
        { code: 'IECE6002D', model: 'EC-E8004-1', tag: 'Charger', spec: 'STEPS' },
        { code: 'IECE80041A', model: 'EC-E6002', tag: 'Charger', spec: 'STEPS' }
      ]
    },
    'SHIMANO TOOLS': {
      title: 'Top Picks',
      sub: 'Best sellers · 2026',
      picks: [
        { code: 'Y12009230', model: 'TL-LR15', tag: 'Lock Ring Tool w/ Guide Pin', spec: 'for SM-RT96/RT77' },
        { code: 'Y13098630', model: 'TL-BR', tag: 'Disc Brake Bleed Kit Prof', spec: '' },
        { code: 'Y13098570', model: 'TL-BH62', tag: 'Disc Brake Hose Cut & Set Tool', spec: '' },
        { code: 'Y6RT68000', model: 'Tool A', tag: 'E-Ring Removal Tool for ST', spec: '' },
        { code: 'Y6RT66000', model: 'Tool B', tag: 'E-Ring Removal Tool for ST', spec: '' },
        { code: 'Y46098630', model: 'TL-PD63', tag: 'Pedal Cone Adjusting Tool', spec: '' },
        { code: 'Y40098020', model: 'TL-PD400', tag: 'Cone Adjusting Tool Set', spec: '' },
        { code: 'Y25U15000', model: 'TL-LR20', tag: 'Lock Ring Tool', spec: 'for SM-RT80' },
        { code: 'Y13000090', model: 'TL-BR002', tag: 'Funnel Unit', spec: 'for Shift Brake Lever' },
        { code: 'Y0T498030', model: 'TL-LR21', tag: 'Lock Ring Tool', spec: '' }
      ]
    },
    'Parktool': {
      title: 'Top Picks',
      sub: 'Best sellers · 2026',
      picks: [
        { code: 'PT100523', model: 'GP-2C', tag: 'Super Patch Kit', spec: 'Pre-Glued' },
        { code: 'PTRC1', model: 'RC-1', tag: 'Press Fit Retain Comp', spec: 'Bottle 100ml' },
        { code: 'PTFR52GT', model: 'FR-5.2GT', tag: 'Cassette LockringTool', spec: 'with 12mm Guide Pin' },
        { code: 'PT1960', model: '1960', tag: 'Replacement JawCovers', spec: 'Set of 2' },
        { code: 'PT1586K', model: '1586K', tag: 'Head Seal Kit', spec: 'for INF Shop Inflators' },
        { code: 'PTBKM12', model: 'BKM-1.2', tag: 'Hydraul BrakeBleedKit', spec: 'Mineral' },
        { code: 'PTBCB42', model: 'BCB-4.2', tag: 'Bike Cleaning Set', spec: 'Brush' },
        { code: 'PTTW52', model: 'TW-5.2', tag: 'Torque Wrench', spec: 'Ratcheting Click-Type' },
        { code: 'PT100053', model: 'AWS-10', tag: 'Hex Wrench Set', spec: 'Fold-Up' },
        { code: 'PT0MLP1', model: 'MLP-1.2', tag: 'Pliers', spec: 'Master Link' }
      ]
    },
    'Vittoria': {
      title: 'Top Picks',
      sub: 'Best sellers · 2026',
      picks: [
        { code: '1TA00012', model: '700x20/28c', tag: 'Standard inner tube', spec: 'Presta 80mm' },
        { code: '1TA00011', model: '700x20/28c', tag: 'Standard inner tube', spec: 'Presta 60mm RVC' },
        { code: '1TA00010', model: '700x20/28c', tag: 'Standard inner tube', spec: 'Presta 48mm RVC' },
        { code: '1TA00038', model: '29x1.95/2.50', tag: 'Standard inner tube', spec: 'Presta 48mm' },
        { code: '1TA00002', model: '700x25/28c', tag: 'Competition Latex inner tube', spec: 'Presta 48mm RVC' },
        { code: '1TA00075', model: '700x28/42c', tag: 'Standard inner tube', spec: 'Presta 48mm RVC' },
        { code: '1TA00032', model: '27.5x1.95/2.5', tag: 'Standard inner tube', spec: 'Presta 48mm' },
        { code: '1TA00028', model: '26x1.95/2.50', tag: 'Standard inner tube', spec: 'Presta 48mm' },
        { code: '1TA00018', model: '20x1.95/2.125', tag: 'Standard inner tube', spec: 'Presta 48mm' },
        { code: '1AA00093', model: 'Valve Alloy Blk', tag: 'Tubeless valve', spec: '80mm (2pcs)' }
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
