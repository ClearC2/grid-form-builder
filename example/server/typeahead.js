const utils = require('./utils')

const returnTypeaheadValues = (name, search) => {
  // build up some logic to return realistic typeahead results here
  return {
    'data': [
      {
        'meta_universalid': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ012345',
        'companyname': `Test API Response - ${search}`,
        'ups_am_name': 'Jacob Allen',
        'label': `Test API Response - ${search}`,
        'value': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ012345'
      },
      {
        'meta_universalid': '013FE8E8528BB34FA6EFAE4283CFF365',
        'companyname': 'Acme General Contracting Services',
        'ups_am_name': 'Chris Owen',
        'label': 'Acme General Contracting Services::C',
        'value': '013FE8E8528BB34FA6EFAE4283CFF365'
      },
      {
        'meta_universalid': '0E29E0407341E301BEF0FBC34796C110',
        'companyname': 'API Company',
        'ups_am_name': 'Allen Swope',
        'label': 'API Company::C',
        'value': '0E29E0407341E301BEF0FBC34796C110'
      },
      {
        'meta_universalid': '144BD17E974C2D3F9F5FAC5597606016',
        'companyname': 'QQ-Mail Merge',
        'ups_am_name': '',
        'label': 'QQ-Mail Merge::C',
        'value': '144BD17E974C2D3F9F5FAC5597606016'
      },
      {
        'meta_universalid': '144F5991F01F217A1FF6AC16906145F1',
        'companyname': 'Conference Management Grp',
        'ups_am_name': '',
        'label': 'Conference Management Grp::C',
        'value': '144F5991F01F217A1FF6AC16906145F1'
      },
      {
        'meta_universalid': '1D2FABDD8B8580A59E7D5C6C2B321D4C',
        'companyname': 'Jacy\'s New Fake Company',
        'ups_am_name': 'Chris Owen',
        'label': 'Jacy\'s New Fake Company::C',
        'value': '1D2FABDD8B8580A59E7D5C6C2B321D4C'
      },
      {
        'meta_universalid': '1E3ABD313893730EBE022FA2B106461E',
        'companyname': 'API Company',
        'ups_am_name': 'Allen Swope',
        'label': 'API Company::C',
        'value': '1E3ABD313893730EBE022FA2B106461E'
      },
      {
        'meta_universalid': '2053159BA94CC21462D107734CC49B76',
        'companyname': 'AB Data Ltd',
        'ups_am_name': 'Mickey Patton',
        'label': 'AB Data Ltd::C',
        'value': '2053159BA94CC21462D107734CC49B76'
      },
      {
        'meta_universalid': '2126453CE74D7D67389EE78D562000B7',
        'companyname': 'Stapleton Inc.',
        'ups_am_name': 'Chantaye Patton',
        'label': 'Stapleton Inc.::C',
        'value': '2126453CE74D7D67389EE78D562000B7'
      },
      {
        'meta_universalid': '256D336DAAB9F0D7DAE66E6B751783F4',
        'companyname': 'Endress Hauser',
        'ups_am_name': '',
        'label': 'Endress Hauser::C',
        'value': '256D336DAAB9F0D7DAE66E6B751783F4'
      },
      {
        'meta_universalid': '2A3A65F7839CD52239D6696B2B3DF53E',
        'companyname': 'YYYY_Mail Merge Company',
        'ups_am_name': 'Chris Owen',
        'label': 'YYYY_Mail Merge Company::P',
        'value': '2A3A65F7839CD52239D6696B2B3DF53E'
      },
      {
        'meta_universalid': '2CD39213B1400A73B90C70E5D1F39C32',
        'companyname': 'Ezanga',
        'ups_am_name': '',
        'label': 'Ezanga::P',
        'value': '2CD39213B1400A73B90C70E5D1F39C32'
      },
      {
        'meta_universalid': '2E2EF7E71C6C9553289937151A2C64BE',
        'companyname': 'Paydata',
        'ups_am_name': '',
        'label': 'Paydata::C',
        'value': '2E2EF7E71C6C9553289937151A2C64BE'
      },
      {
        'meta_universalid': '3444FBE8ACDAE9E3AED3B893C818BB33',
        'companyname': 'Covington Sales & Service Inc.',
        'ups_am_name': 'Charlie Spaneas',
        'label': 'Covington Sales & Service Inc.::C',
        'value': '3444FBE8ACDAE9E3AED3B893C818BB33'
      },
      {
        'meta_universalid': '3B1E174A9F5CD79B60DFE0F594BC5740',
        'companyname': 'Arcade Rentals',
        'ups_am_name': 'David Adams',
        'label': 'Arcade Rentals::P',
        'value': '3B1E174A9F5CD79B60DFE0F594BC5740'
      },
      {
        'meta_universalid': '3B9F45F635C1991C6165CE4929BEB45A',
        'companyname': 'Voyager Ltd',
        'ups_am_name': '',
        'label': 'Voyager Ltd::C',
        'value': '3B9F45F635C1991C6165CE4929BEB45A'
      },
      {
        'meta_universalid': '40D3ED12812BFFD8DC6930090A103066',
        'companyname': 'ASC Construction Equipment',
        'ups_am_name': 'Mickey Patton',
        'label': 'ASC Construction Equipment::C',
        'value': '40D3ED12812BFFD8DC6930090A103066'
      },
      {
        'meta_universalid': '418BE89FE69DE47CBD741A6E24B2393E',
        'companyname': 'Zz-Merge Company 10-3',
        'ups_am_name': '',
        'label': 'Zz-Merge Company 10-3::C',
        'value': '418BE89FE69DE47CBD741A6E24B2393E'
      },
      {
        'meta_universalid': '4B4C0862E5CA38397A6CB17181140FCA',
        'companyname': 'American Seating',
        'ups_am_name': 'Kevin R Bull',
        'label': 'American Seating::C',
        'value': '4B4C0862E5CA38397A6CB17181140FCA'
      },
      {
        'meta_universalid': '5457A15579185D3A5C820FDD180B70DB',
        'companyname': 'zzz-Owen\'s Irrigation',
        'ups_am_name': 'Chris Owen',
        'label': 'zzz-Owen\'s Irrigation::C',
        'value': '5457A15579185D3A5C820FDD180B70DB'
      },
      {
        'meta_universalid': '54AD00E35AF6BCD1F86040D77B9A320B',
        'companyname': 'Utopian Sign Company',
        'ups_am_name': 'Nick Swope',
        'label': 'Utopian Sign Company::C',
        'value': '54AD00E35AF6BCD1F86040D77B9A320B'
      },
      {
        'meta_universalid': '58D763B3103830C6B3C42407786E6440',
        'companyname': 'Canadian Bearings Ltd',
        'ups_am_name': 'Allen Swope',
        'label': 'Canadian Bearings Ltd::P',
        'value': '58D763B3103830C6B3C42407786E6440'
      },
      {
        'meta_universalid': '5CAB6401CC92B6A34C985D50C07807C8',
        'companyname': 'Bullman Consulting',
        'ups_am_name': 'Kevin R Bull',
        'label': 'Bullman Consulting::P',
        'value': '5CAB6401CC92B6A34C985D50C07807C8'
      },
      {
        'meta_universalid': '600AB312A7951C2A8A433CD485E19457',
        'companyname': 'Canadian Bearings LLC',
        'ups_am_name': 'Allen Swope',
        'label': 'Canadian Bearings LLC::C',
        'value': '600AB312A7951C2A8A433CD485E19457'
      },
      {
        'meta_universalid': '634762FDBDEC0F19FA5EF9EAF40C8143',
        'companyname': 'Fujitec America',
        'ups_am_name': '',
        'label': 'Fujitec America::C',
        'value': '634762FDBDEC0F19FA5EF9EAF40C8143'
      },
      {
        'meta_universalid': '650D2B827916CE8570FF95F665DA8E98',
        'companyname': 'Mount Pleasant Legal Services',
        'ups_am_name': 'Mickey Patton',
        'label': 'Mount Pleasant Legal Services::C',
        'value': '650D2B827916CE8570FF95F665DA8E98'
      },
      {
        'meta_universalid': '65CF8DD9B9906B34483E971AD7DF31C3',
        'companyname': 'jacob abc',
        'ups_am_name': '',
        'label': 'jacob abc::C',
        'value': '65CF8DD9B9906B34483E971AD7DF31C3'
      },
      {
        'meta_universalid': '688485E7B0AB0D0AAB668BAB579EF2C6',
        'companyname': 'Gettysburg Address Co.',
        'ups_am_name': 'Charlie Spaneas',
        'label': 'Gettysburg Address Co.::P',
        'value': '688485E7B0AB0D0AAB668BAB579EF2C6'
      },
      {
        'meta_universalid': '699A25672E93D0513AC1FB6CB1EBAE87',
        'companyname': 'JCDECAUX',
        'ups_am_name': '',
        'label': 'JCDECAUX::C',
        'value': '699A25672E93D0513AC1FB6CB1EBAE87'
      },
      {
        'meta_universalid': '6ABE0DEBEC154FC54391D62FBA885065',
        'companyname': 'BBB-Walton Consulting',
        'ups_am_name': 'Chris Owen',
        'label': 'BBB-Walton Consulting::C',
        'value': '6ABE0DEBEC154FC54391D62FBA885065'
      },
      {
        'meta_universalid': '6B20597DD19F5683801D8BA1BE414AA2',
        'companyname': 'Midas International',
        'ups_am_name': '',
        'label': 'Midas International::C',
        'value': '6B20597DD19F5683801D8BA1BE414AA2'
      },
      {
        'meta_universalid': '7453AF0577089861B8486F6F6A601133',
        'companyname': 'Jacobs 160219',
        'ups_am_name': 'c2CRM Administrator',
        'label': 'Jacobs 160219::C',
        'value': '7453AF0577089861B8486F6F6A601133'
      },
      {
        'meta_universalid': '81F38A3DCFD3A8B8BBAB52FC80D262B7',
        'companyname': 'Jacy\'s New Fake Company',
        'ups_am_name': 'Chris Owen',
        'label': 'Jacy\'s New Fake Company::C',
        'value': '81F38A3DCFD3A8B8BBAB52FC80D262B7'
      },
      {
        'meta_universalid': '82D0201FDD608BEA3D6128BF562AE70F',
        'companyname': 'Terrorist Chaser, Inc.',
        'ups_am_name': '',
        'label': 'Terrorist Chaser, Inc.::P',
        'value': '82D0201FDD608BEA3D6128BF562AE70F'
      },
      {
        'meta_universalid': '8300ABC63D0996E2BD8FBD2A034CDDE8',
        'companyname': 'Bay Of Pigs, LTD.',
        'ups_am_name': 'Chris Owen',
        'label': 'Bay Of Pigs, LTD.::V',
        'value': '8300ABC63D0996E2BD8FBD2A034CDDE8'
      },
      {
        'meta_universalid': '853AC3CE0F50CB4B26C4A4DB6992A923',
        'companyname': 'Jacy\'s New Fake Company',
        'ups_am_name': 'Jacy Robb',
        'label': 'Jacy\'s New Fake Company::C',
        'value': '853AC3CE0F50CB4B26C4A4DB6992A923'
      },
      {
        'meta_universalid': '8901D3B00C4E387818EEF2ED9636D49D',
        'companyname': 'Shafer Equipment Co.',
        'ups_am_name': 'Charlie Spaneas',
        'label': 'Shafer Equipment Co.::C',
        'value': '8901D3B00C4E387818EEF2ED9636D49D'
      },
      {
        'meta_universalid': '8E10973E224DDD9A23696CB2A096C7E0',
        'companyname': 'Low Country Mortgage Corp.',
        'ups_am_name': 'Mickey Patton',
        'label': 'Low Country Mortgage Corp.::C',
        'value': '8E10973E224DDD9A23696CB2A096C7E0'
      },
      {
        'meta_universalid': '91BA200232741A940FD8F323355E4D42',
        'companyname': 'Sloan Valve Company',
        'ups_am_name': 'Charlie Spaneas',
        'label': 'Sloan Valve Company::C',
        'value': '91BA200232741A940FD8F323355E4D42'
      },
      {
        'meta_universalid': '945349F97377A40E29810FEE4B510A9E',
        'companyname': 'Lund International',
        'ups_am_name': '',
        'label': 'Lund International::P',
        'value': '945349F97377A40E29810FEE4B510A9E'
      },
      {
        'meta_universalid': '94F6ED179D2AC0B32C938E0DBC128AC6',
        'companyname': 'Merge test company one',
        'ups_am_name': 'Rick Bensema',
        'label': 'Merge test company one::C',
        'value': '94F6ED179D2AC0B32C938E0DBC128AC6'
      },
      {
        'meta_universalid': '94FC7591C3B99997B59752C1FE6E0120',
        'companyname': 'Family Insurance inc.',
        'ups_am_name': 'Chantaye Patton',
        'label': 'Family Insurance inc.::P',
        'value': '94FC7591C3B99997B59752C1FE6E0120'
      },
      {
        'meta_universalid': '9878C683BC20BD400BDD7C3D5A186FA7',
        'companyname': 'Redwood Accounting Services',
        'ups_am_name': 'Mickey Patton',
        'label': 'Redwood Accounting Services::C',
        'value': '9878C683BC20BD400BDD7C3D5A186FA7'
      },
      {
        'meta_universalid': 'A1D5C83B8DCF017E7B2AC83A790FBE2E',
        'companyname': 'Voyager Ltd',
        'ups_am_name': 'Chris Owen',
        'label': 'Voyager Ltd::C',
        'value': 'A1D5C83B8DCF017E7B2AC83A790FBE2E'
      },
      {
        'meta_universalid': 'A3A97741934D2B20A28531027A65EAC6',
        'companyname': 'Menard Inc',
        'ups_am_name': '',
        'label': 'Menard Inc::C',
        'value': 'A3A97741934D2B20A28531027A65EAC6'
      },
      {
        'meta_universalid': 'A5B00B183470645A740A7CA5CEF2DA4D',
        'companyname': 'API Company',
        'ups_am_name': 'Allen Swope',
        'label': 'API Company::C',
        'value': 'A5B00B183470645A740A7CA5CEF2DA4D'
      },
      {
        'meta_universalid': 'A5B5E77ED227F9B4593D652247846558',
        'companyname': 'Grainger',
        'ups_am_name': '',
        'label': 'Grainger::C',
        'value': 'A5B5E77ED227F9B4593D652247846558'
      },
      {
        'meta_universalid': 'A9971E25931DDD9D4354FC1B9C5508CD',
        'companyname': 'New Deal, Inc.',
        'ups_am_name': 'Chris Owen',
        'label': 'New Deal, Inc.::P',
        'value': 'A9971E25931DDD9D4354FC1B9C5508CD'
      },
      {
        'meta_universalid': 'AB66811A1F18F69F38193DB4816BA35F',
        'companyname': 'API Company',
        'ups_am_name': 'Allen Swope',
        'label': 'API Company::C',
        'value': 'AB66811A1F18F69F38193DB4816BA35F'
      },
      {
        'meta_universalid': 'AB8A57CE19BF25267AF059A021496DA9',
        'companyname': 'Demo Company',
        'ups_am_name': 'Rick Bensema',
        'label': 'Demo Company::C',
        'value': 'AB8A57CE19BF25267AF059A021496DA9'
      },
      {
        'meta_universalid': 'B37F4A915563CEF2194CD506A2A5FED3',
        'companyname': 'Berlin Wall Demolition Co.',
        'ups_am_name': 'Mickey Patton',
        'label': 'Berlin Wall Demolition Co.::C',
        'value': 'B37F4A915563CEF2194CD506A2A5FED3'
      },
      {
        'meta_universalid': 'B380D3A792843FFBB10DB94AFCFB395A',
        'companyname': 'American Seating Company',
        'ups_am_name': 'Allen Swope',
        'label': 'American Seating Company::C',
        'value': 'B380D3A792843FFBB10DB94AFCFB395A'
      },
      {
        'meta_universalid': 'B5F410524065500D01148B02E0227112',
        'companyname': 'zzz-Owen\'s Auto',
        'ups_am_name': '',
        'label': 'zzz-Owen\'s Auto::C',
        'value': 'B5F410524065500D01148B02E0227112'
      },
      {
        'meta_universalid': 'C0B4EE4A57B54CF2EE825551C7F3977E',
        'companyname': 'Guyer Band',
        'ups_am_name': 'Chris Owen',
        'label': 'Guyer Band::V',
        'value': 'C0B4EE4A57B54CF2EE825551C7F3977E'
      },
      {
        'meta_universalid': 'C2363049F60723FDA30D893FA5320E58',
        'companyname': 'Global Enterprises, Inc.',
        'ups_am_name': 'Charlie Spaneas',
        'label': 'Global Enterprises, Inc.::C',
        'value': 'C2363049F60723FDA30D893FA5320E58'
      },
      {
        'meta_universalid': 'CAD71A8606036E5FFE7B2F263D8A0E08',
        'companyname': 'Debebhams Retail PLC',
        'ups_am_name': '',
        'label': 'Debebhams Retail PLC::C',
        'value': 'CAD71A8606036E5FFE7B2F263D8A0E08'
      },
      {
        'meta_universalid': 'D1592A890538FC6ED9A8905E3E9F1F0F',
        'companyname': 'Social Justice, Inc.',
        'ups_am_name': 'Charlie Spaneas',
        'label': 'Social Justice, Inc.::P',
        'value': 'D1592A890538FC6ED9A8905E3E9F1F0F'
      },
      {
        'meta_universalid': 'DABA52460F611BFC91F77369CC189A96',
        'companyname': 'Hi-Way Equipment Co.',
        'ups_am_name': '',
        'label': 'Hi-Way Equipment Co.::C',
        'value': 'DABA52460F611BFC91F77369CC189A96'
      },
      {
        'meta_universalid': 'DDAF7745A45C6F8860E8AEC1C0EEB19F',
        'companyname': 'Pioneer Metal Finishing',
        'ups_am_name': '',
        'label': 'Pioneer Metal Finishing::C',
        'value': 'DDAF7745A45C6F8860E8AEC1C0EEB19F'
      },
      {
        'meta_universalid': 'DE956A3C4769F2CB893896A80D9A9FEA',
        'companyname': 'Ivy Tech State College',
        'ups_am_name': '',
        'label': 'Ivy Tech State College::C',
        'value': 'DE956A3C4769F2CB893896A80D9A9FEA'
      },
      {
        'meta_universalid': 'DF67F2BBCEFF355DC564295DE532E9A7',
        'companyname': 'General Atomics',
        'ups_am_name': 'Mickey Patton',
        'label': 'General Atomics::P',
        'value': 'DF67F2BBCEFF355DC564295DE532E9A7'
      },
      {
        'meta_universalid': 'E066CB619556CF6781B698EE8460AD7D',
        'companyname': 'CSO-Voyager Ltd',
        'ups_am_name': 'Chris Owen',
        'label': 'CSO-Voyager Ltd::P',
        'value': 'E066CB619556CF6781B698EE8460AD7D'
      },
      {
        'meta_universalid': 'E1A4ECDE0112211DD96E4750287846B3',
        'companyname': 'Hammer Equipment Ltd',
        'ups_am_name': '',
        'label': 'Hammer Equipment Ltd::C',
        'value': 'E1A4ECDE0112211DD96E4750287846B3'
      },
      {
        'meta_universalid': 'E61FDBD23C5C1B563BF74DF5472D3E80',
        'companyname': 'Nick\'s Fake Company',
        'ups_am_name': 'Nick Swope',
        'label': 'Nick\'s Fake Company::P',
        'value': 'E61FDBD23C5C1B563BF74DF5472D3E80'
      },
      {
        'meta_universalid': 'E8D8468CCCF5056C7975503AC6201199',
        'companyname': 'The Chestand Group',
        'ups_am_name': '',
        'label': 'The Chestand Group::C',
        'value': 'E8D8468CCCF5056C7975503AC6201199'
      },
      {
        'meta_universalid': 'EC93B3A87653A3A0843734095BF87151',
        'companyname': 'American Family Insurance',
        'ups_am_name': 'Chantaye Patton',
        'label': 'American Family Insurance::C',
        'value': 'EC93B3A87653A3A0843734095BF87151'
      },
      {
        'meta_universalid': 'F1FA3FF9D3580B37A818A6138C9940DB',
        'companyname': 'Encephalo Associates',
        'ups_am_name': '',
        'label': 'Encephalo Associates::C',
        'value': 'F1FA3FF9D3580B37A818A6138C9940DB'
      },
      {
        'meta_universalid': 'FA2D8BA758BBE342A1BC0172529D904D',
        'companyname': 'WWW-Target company',
        'ups_am_name': '',
        'label': 'WWW-Target company::C',
        'value': 'FA2D8BA758BBE342A1BC0172529D904D'
      },
      {
        'meta_universalid': 'FB7FCE73583C109C8C9A8062E48378E7',
        'companyname': 'Warwick Communications Inc',
        'ups_am_name': '',
        'label': 'Warwick Communications Inc::C',
        'value': 'FB7FCE73583C109C8C9A8062E48378E7'
      },
      {
        'meta_universalid': 'FE957E4EA2F378E8DE110C5FE8690CAF',
        'companyname': 'Frank',
        'ups_am_name': 'Jake Allen',
        'label': 'Frank::C',
        'value': 'FE957E4EA2F378E8DE110C5FE8690CAF'
      },
      {
        'meta_universalid': 'FEAB137F0482AD154BDE321FE822F363',
        'companyname': 'VVVV-Mail Merge Company',
        'ups_am_name': '',
        'label': 'VVVV-Mail Merge Company::C',
        'value': 'FEAB137F0482AD154BDE321FE822F363'
      }
    ]
  }
}

module.exports = function (app) {
  app.get(`/api/typeahead/name/:name/search/:search`, function (req, res) {
    const name = req.params.name
    const search = req.params.search
    if (!utils.ensureParameter(name, res)) return
    if (!utils.ensureParameter(search, res)) return
    return utils.sendJSON(res, returnTypeaheadValues(name, search))
  })
}
