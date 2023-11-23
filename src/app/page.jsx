"use client"

import styles from './page.module.css'
import { useState } from 'react';

const positions = [
  {
    "name": "Goalkeeper - defend",
    "text": "gkd_key=( Agi + Ref );gkd_green=( Aer + Cmd + Han + Kic + Cnt + Pos );gkd_blue=( 1v1 + Thr + Ant + Dec );gkd=( ( ( gkd_key * 5) + (gkd_green * 3) + (gkd_blue * 1) ) / 32);"
  },
  {
    "name": "Sweeper keeper - defend",
    "text": "skd_key=( Agi + Ref );skd_green=( Cmd + Kic + 1v1 + Ant + Cnt + Pos );skd_blue=( Aer + Fir + Han + Pas + TRO + Dec + Vis + Acc );skd=( ( ( skd_key * 5) + (skd_green * 3) + (skd_blue * 1) ) / 36);"
  },
  {
    "name": "Sweeper keeper - support",
    "text": "sks_key=( Agi + Ref );sks_green=( Cmd + Kic + 1v1 + Ant + Cnt + Pos );sks_blue=( Aer + Fir + Han + Pas + TRO + Dec + Vis + Acc );sks=( ( ( sks_key * 5) + (sks_green * 3) + (sks_blue * 1) ) / 36);",
  },
  {
    "name": "Sweeper keeper - attack",
    "text": "ska_key=( Agi + Ref );ska_green=( Cmd + Kic + 1v1 + Ant + Cnt + Pos );ska_blue=( Aer + Fir + Han + Pas + TRO + Dec + Vis + Acc );ska=( ( ( ska_key * 5) + (ska_green * 3) + (ska_blue * 1) ) / 36);",
  },
  {
    "name": "Ball playing defender - defend",
    "text": "bpdd_key=( Acc + Pac + Jum + Cmp );bpdd_green=( Hea + Mar + Pas + Tck + Pos + Str );bpdd_blue=( Fir + Tec + Agg + Ant + Bra + Cnt + Dec + Vis );bpdd=( ( ( bpdd_key * 5) + (bpdd_green * 3) + (bpdd_blue * 1) ) / 46);",
  },
  {
    "name": "Ball playing defender - stopper",
    "text": "bpds_key=( Acc + Pac + Jum + Cmp );bpds_green=( Hea + Pas + Tck + Pos + Str + Agg + Bra + Dec );bpds_blue=( Fir + Tec + Ant + Cnt + Vis + Mar );bpds=( ( ( bpds_key * 5) + (bpds_green * 3) + (bpds_blue * 1) ) / 50);",
  },
  {
    "name": "Ball playing defender - cover",
    "text": "bpdc_key=( Acc + Pac + Jum + Cmp );bpdc_green=( Mar + Pas + Tck + Pos + Ant + Cnt + Dec );bpdc_blue=( Fir + Tec + Bra + Vis + Str + Hea );bpdc=( ( ( bpdc_key * 5) + (bpdc_green * 3) + (bpdc_blue * 1) ) / 47);",
  },
  {
    "name": "Central defender - defend",
    "text": "cdd_key=( Acc + Pac + Jum + Cmp );cdd_green=( Hea + Mar + Tck + Pos + Str );cdd_blue=( Agg + Ant + Bra + Cnt + Dec );cdd=( ( ( cdd_key * 5) + (cdd_green * 3) + (cdd_blue * 1) ) / 40);",
  },
  {
    "name": "Central defender - stopper",
    "text": "cds_key=( Acc + Pac + Jum + Cmp );cds_green=( Hea + Tck + Agg + Bra + Dec + Pos + Str );cds_blue=( Mar + Ant + Cnt );cds=( ( ( cds_key * 5) + (cds_green * 3) + (cds_blue * 1) ) / 44);",
  },
  {
    "name": "Central defender - cover",
    "text": "cdc_key=( Acc + Pac + Jum + Cmp );cdc_green=( Mar + Tck + Ant + Cnt + Dec + Pos );cdc_blue=( Hea + Bra + Str );cdc=( ( ( cdc_key * 5) + (cdc_green * 3) + (cdc_blue * 1) ) / 41);",
  },
  {
    "name": "Complete wing back - support",
    "text": "cwbs_key=( Acc + Pac + Sta + Wor );cwbs_green=( Cro + Dri + Tec + OtB + Tea );cwbs_blue=( Fir + Mar + Pas + Tck + Ant + Dec + Fla + Pos + Agi + Bal );cwbs=( ( ( cwbs_key * 5) + (cwbs_green * 3) + (cwbs_blue * 1) ) / 45);",
  },
  {
    "name": "Complete wing back - attack",
    "text": "cwba_key=( Acc + Pac + Sta + Wor );cwba_green=( Cro + Dri + Tec + Fla + OtB + Tea );cwba_blue=( Fir + Mar + Pas + Tck + Ant + Dec + Pos + Agi + Bal );cwba=( ( ( cwba_key * 5) + (cwba_green * 3) + (cwba_blue * 1) ) / 47);",
  },
  {
    "name": "Full back - defend",
    "text": "fbd_key=( Acc + Pac + Sta + Wor );fbd_green=( Mar + Tck + Ant + Cnt + Pos + Pos );fbd_blue=( Cro + Pas + Dec + Tea );fbd=( ( ( fbd_key * 5) + (fbd_green * 3) + (fbd_blue * 1) ) / 42);",
  },
  {
    "name": "Full back - support",
    "text": "fbs_key=( Acc + Pac + Sta + Wor );fbs_green=( Mar + Tck + Ant + Cnt + Pos + Tea );fbs_blue=( Cro + Dri + Pas + Tec + Dec );fbs=( ( ( fbs_key * 5) + (fbs_green * 3) + (fbs_blue * 1) ) / 43);",
  },
  {
    "name": "Full back - attack",
    "text": "fba_key=( Acc + Pac + Sta + Wor );fba_green=( Cro + Mar + Tck + Ant + Pos + Tea );fba_blue=( Dri + Fir + Pas + Tec + Cnt + Dec + OtB + Agi );fba=( ( ( fba_key * 5) + (fba_green * 3) + (fba_blue * 1) ) / 46);",
  },
  {
    "name": "Inverted full back - defend",
    "text": "ifbd_key=( Acc + Pac + Sta + Wor );ifbd_green=( Hea + Mar + Tck + Pos + Str );ifbd_blue=( Dri + Fir + Pas + Tec + Agg + Ant + Bra + Cmp + Cnt + Dec + Agi + Jum );ifbd=( ( ( ifbd_key * 5) + (ifbd_green * 3) + (ifbd_blue * 1) ) / 47);",
  },
  {
    "name": "Inverted wing back - defend",
    "text": "iwbd_key=( Acc + Pac + Sta + Wor );iwbd_green=( Pas + Tck + Ant + Dec + Pos + Tea );iwbd_blue=( Fir + Mar + Tec + Cmp + Cnt + OtB + Agi );iwbd=( ( ( iwbd_key * 5) + (iwbd_green * 3) + (iwbd_blue * 1) ) / 45);",
  },
  {
    "name": "Inverted wing back - support",
    "text": "iwbs_key=( Acc + Pac + Sta + Wor );iwbs_green=( Fir + Pas + Tck + Cmp + Dec + Tea );iwbs_blue=( Mar + Tec + Ant + Cnt + OtB + Pos + Vis + Agi );iwbs=( ( ( iwbs_key * 5) + (iwbs_green * 3) + (iwbs_blue * 1) ) / 46);",
  },
  {
    "name": "Inverted wing back - attack",
    "text": "iwba_key=( Acc + Pac + Sta + Wor );iwba_green=( Fir + Pas + Tck + Tec + Cmp + Dec + OtB + Tea + Vis );iwba_blue=( Cro + Dri + Lon + Mar + Ant + Cnt + Fla + Pos + Agi );iwba=( ( ( iwba_key * 5) + (iwba_green * 3) + (iwba_blue * 1) ) / 56);",
  },
  {
    "name": "Libero - defend",
    "text": "ld_key=( Acc + Pac + Jum + Cmp );ld_green=( Fir + Hea + Mar + Pas + Tck + Tec + Dec + Pos + Tea + Str );ld_blue=( Ant + Bra + Cnt + Sta );ld=( ( ( ld_key * 5) + (ld_green * 3) + (ld_blue * 1) ) / 54);",
  },
  {
    "name": "Libero - support",
    "text": "ls_key=( Acc + Pac + Jum + Cmp );ls_green=( Fir + Hea + Mar + Pas + Tck + Tec + Dec + Pos + Tea + Str );ls_blue=( Dri + Ant + Bra + Cnt + Vis + Sta );ls=( ( ( ls_key * 5) + (ls_green * 3) + (ls_blue * 1) ) / 56);",
  },
  {
    "name": "No-nonsense centre back - defend",
    "text": "ncbd_key=( Acc + Pac + Jum + Cmp );ncbd_green=( Hea + Mar + Tck + Pos + Str );ncbd_blue=( Agg + Ant + Bra + Cnt );ncbd=( ( ( ncbd_key * 5) + (ncbd_green * 3) + (ncbd_blue * 1) ) / 39);",
  },
  {
    "name": "No-nonsense centre back - stopper",
    "text": "ncbs_key=( Acc + Pac + Jum + Cmp );ncbs_green=( Hea + Tck + Agg + Bra + Pos + Str );ncbs_blue=( Mar + Ant + Cnt );ncbs=( ( ( ncbs_key * 5) + (ncbs_green * 3) + (ncbs_blue * 1) ) / 41);",
  },
  {
    "name": "No-nonsense centre back - cover",
    "text": "ncbc_key=( Acc + Pac + Jum + Cmp );ncbc_green=( Mar + Tck + Ant + Cnt + Pos );ncbc_blue=( Hea + Bra + Str );ncbc=( ( ( ncbc_key * 5) + (ncbc_green * 3) + (ncbc_blue * 1) ) / 38);",
  },
  {
    "name": "No-nonsense full back - defend",
    "text": "nfbd_key=( Acc + Pac + Sta + Wor );nfbd_green=( Mar + Tck + Ant + Pos + Str );nfbd_blue=( Hea + Agg + Bra + Cnt + Tea );nfbd=( ( ( nfbd_key * 5) + (nfbd_green * 3) + (nfbd_blue * 1) ) / 40);",
  },
  {
    "name": "Wide centre back - defend",
    "text": "wcbd_key=( Acc + Pac + Jum + Cmp );wcbd_green=( Hea + Mar + Tck + Pos + Str );wcbd_blue=( Dri + Fir + Pas + Tec + Agg + Ant + Bra + Cnt + Dec + Wor + Agi );wcbd=( ( ( wcbd_key * 5) + (wcbd_green * 3) + (wcbd_blue * 1) ) / 46);",
  },
  {
    "name": "Wide centre back - support",
    "text": "wcbs_key=( Acc + Pac + Jum + Cmp );wcbs_green=( Dri + Hea + Mar + Tck + Pos + Str );wcbs_blue=( Cro + Fir + Pas + Tec + Agg + Ant + Bra + Cnt + Dec + OtB + Wor + Agi + Sta );wcbs=( ( ( wcbs_key * 5) + (wcbs_green * 3) + (wcbs_blue * 1) ) / 51);",
  },
  {
    "name": "Wide centre back - attack",
    "text": "wcba_key=( Acc + Pac + Jum + Cmp );wcba_green=( Cro + Dri + Hea + Mar + Tck + OtB + Sta + Str );wcba_blue=( Fir + Pas + Tec + Agg + Ant + Bra + Cnt + Dec + Pos + Wor + Agi );wcba=( ( ( wcba_key * 5) + (wcba_green * 3) + (wcba_blue * 1) ) / 55);",
  },
  {
    "name": "Wing back - defend",
    "text": "wbd_key=( Acc + Pac + Sta + Wor );wbd_green=( Mar + Tck + Ant + Pos + Tea );wbd_blue=( Cro + Dri + Fir + Pas + Tec + Cnt + Dec + OtB + Agi + Bal );wbd=( ( ( wbd_key * 5) + (wbd_green * 3) + (wbd_blue * 1) ) / 45);",
  },
  {
    "name": "Wing back - support",
    "text": "wbs_key=( Acc + Pac + Sta + Wor );wbs_green=( Cro + Dri + Mar + Tck + OtB + Tea );wbs_blue=( Fir + Pas + Tec + Ant + Cnt + Dec + Pos + Agi + Bal );wbs=( ( ( wbs_key * 5) + (wbs_green * 3) + (wbs_blue * 1) ) / 47);",
  },
  {
    "name": "Wing back - attack",
    "text": "wba_key=( Acc + Pac + Sta + Wor );wba_green=( Cro + Dri + Tck + Tec + OtB + Tea );wba_blue=( Fir + Mar + Pas + Ant + Cnt + Dec + Fla + Pos + Agi + Bal );wba=( ( ( wba_key * 5) + (wba_green * 3) + (wba_blue * 1) ) / 48);",
  },
  {
    "name": "Advanced playmaker - support",
    "text": "aps_key=( Acc + Pac + Sta + Wor );aps_green=( Fir + Pas + Tec + Cmp + Dec + OtB + Tea + Vis );aps_blue=( Dri + Ant + Fla + Agi );aps=( ( ( aps_key * 5) + (aps_green * 3) + (aps_blue * 1) ) / 48);",
  },
  {
    "name": "Advanced playmaker - attack",
    "text": "apa_key=( Acc + Pac + Sta + Wor );apa_green=( Fir + Pas + Tec + Cmp + Dec + OtB + Tea + Vis );apa_blue=( Dri + Ant + Fla + Agi );apa=( ( ( apa_key * 5) + (apa_green * 3) + (apa_blue * 1) ) / 48);",
  },
  {
    "name": "Anchor - defend",
    "text": "ad_key=( Wor + Sta + Acc + Pac );ad_green=( Mar + Tck + Ant + Cnt + Dec + Pos );ad_blue=( Cmp + Tea + Str );ad=( ( ( ad_key * 5) + (ad_green * 3) + (ad_blue * 1) ) / 41);",
  },
  {
    "name": "Attacking midfielder - support",
    "text": "ams_key=( Acc + Pac + Sta + Wor );ams_green=( Fir + Lon + Pas + Tec + Ant + Dec + Fla + OtB );ams_blue=( Dri + Cmp + Vis + Agi );ams=( ( ( ams_key * 5) + (ams_green * 3) + (ams_blue * 1) ) / 48);",
  },
  {
    "name": "Attacking midfielder - attack",
    "text": "ama_key=( Acc + Pac + Sta + Wor );ama_green=( Dri + Fir + Lon + Pas + Tec + Ant + Dec + Fla + OtB );ama_blue=( Fin + Cmp + Vis + Agi );ama=( ( ( ama_key * 5) + (ama_green * 3) + (ama_blue * 1) ) / 51);",
  },
  {
    "name": "Ball winning midfielder - defend",
    "text": "bwmd_key=( Wor + Sta + Acc + Pac );bwmd_green=( Tck + Agg + Ant + Tea );bwmd_blue=( Mar + Bra + Cnt + Pos + Agi + Str );bwmd=( ( ( bwmd_key * 5) + (bwmd_green * 3) + (bwmd_blue * 1) ) / 38);",
  },
  {
    "name": "Ball winning midfielder - support",
    "text": "bwms_key=( Wor + Sta + Acc + Pac );bwms_green=( Tck + Agg + Ant + Tea );bwms_blue=( Mar + Pas + Bra + Cnt + Agi + Str );bwms=( ( ( bwms_key * 5) + (bwms_green * 3) + (bwms_blue * 1) ) / 38);",
  },
  {
    "name": "Box to box midfielder - support",
    "text": "b2bs_key=( Acc + Pac + Sta + Wor );b2bs_green=( Pas + Tck + OtB + Tea );b2bs_blue=( Dri + Fin + Fir + Lon + Tec + Agg + Ant + Cmp + Dec + Pos + Bal + Str );b2bs=( ( ( b2bs_key * 5) + (b2bs_green * 3) + (b2bs_blue * 1) ) / 44);",
  },
  {
    "name": "Carrilero - support",
    "text": "cars_key=( Wor + Sta + Acc + Pac );cars_green=( Fir + Pas + Tck + Dec + Pos + Tea );cars_blue=( Tec + Ant + Cmp + Cnt + OtB + Vis );cars=( ( ( cars_key * 5) + (cars_green * 3) + (cars_blue * 1) ) / 44);",
  },
  {
    "name": "Central midfielder - defend",
    "text": "cmd_key=( Acc + Pac + Sta + Wor );cmd_green=( Tck + Cnt + Dec + Pos + Tea );cmd_blue=( Fir + Mar + Pas + Tec + Agg + Ant + Cmp );cmd=( ( ( cmd_key * 5) + (cmd_green * 3) + (cmd_blue * 1) ) / 42);",
  },
  {
    "name": "Central midfielder - support",
    "text": "cms_key=( Acc + Pac + Sta + Wor );cms_green=( Fir + Pas + Tck + Dec + Tea );cms_blue=( Tec + Ant + Cmp + Cnt + OtB + Vis );cms=( ( ( cms_key * 5) + (cms_green * 3) + (cms_blue * 1) ) / 41);",
  },
  {
    "name": "Central midfielder - attack",
    "text": "cma_key=( Acc + Pac + Sta + Wor );cma_green=( Fir + Pas + Dec + OtB );cma_blue=( Lon + Tck + Tec + Ant + Cmp + Tea + Vis );cma=( ( ( cma_key * 5) + (cma_green * 3) + (cma_blue * 1) ) / 39);",
  },
  {
    "name": "Deep lying playmaker - defend",
    "text": "dlpd_key=( Wor + Sta + Acc + Pac );dlpd_green=( Fir + Pas + Tec + Cmp + Dec + Tea + Vis );dlpd_blue=( Tck + Ant + Pos + Bal );dlpd=( ( ( dlpd_key * 5) + (dlpd_green * 3) + (dlpd_blue * 1) ) / 45);",
  },
  {
    "name": "Deep lying playmaker - support",
    "text": "dlps_key=( Wor + Sta + Acc + Pac );dlps_green=( Fir + Pas + Tec + Cmp + Dec + Tea + Vis );dlps_blue=( Ant + OtB + Pos + Bal );dlps=( ( ( dlps_key * 5) + (dlps_green * 3) + (dlps_blue * 1) ) / 45);",
  },
  {
    "name": "Defensive midfielder - defend",
    "text": "dmd_key=( Wor + Sta + Acc + Pac );dmd_green=( Tck + Ant + Cnt + Pos + Tea );dmd_blue=( Mar + Pas + Agg + Cmp + Str + Dec );dmd=( ( ( dmd_key * 5) + (dmd_green * 3) + (dmd_blue * 1) ) / 41);",
  },
  {
    "name": "Defensive midfielder - support",
    "text": "dms_key=( Wor + Sta + Acc + Pac );dms_green=( Tck + Ant + Cnt + Pos + Tea );dms_blue=( Fir + Mar + Pas + Agg + Cmp + Dec + Str );dms=( ( ( dms_key * 5) + (dms_green * 3) + (dms_blue * 1) ) / 42);",
  },
  {
    "name": "Defensive winger - defend",
    "text": "dwd_key=( Acc + Pac + Sta + Wor );dwd_green=( Tec + Ant + OtB + Pos + Tea );dwd_blue=( Cro + Dri + Fir + Mar + Tck + Agg + Cnt + Dec );dwd=( ( ( dwd_key * 5) + (dwd_green * 3) + (dwd_blue * 1) ) / 43);",
  },
  {
    "name": "Defensive winger - support",
    "text": "dws_key=( Acc + Pac + Sta + Wor );dws_green=( Cro + Pas + Tec + OtB + Tea );dws_blue=( Dri + Fir + Mar + Pas + Tck + Agg + Ant + Cmp + Cnt + Dec + Pos );dws=( ( ( dws_key * 5) + (dws_green * 3) + (dws_blue * 1) ) / 46);",
  },
  {
    "name": "Enganche - support",
    "text": "engs_key=( Acc + Pac + Sta + Wor );engs_green=( Fir + Pas + Tec + Cmp + Dec + Vis );engs_blue=( Dri + Ant + Fla + OtB + Tea + Agi );engs=( ( ( engs_key * 5) + (engs_green * 3) + (engs_blue * 1) ) / 44);",
  },
  {
    "name": "Half back - defend",
    "text": "hbd_key=( Wor + Sta + Acc + Pac );hbd_green=( Mar + Tck + Ant + Cmp + Cnt + Dec + Pos + Tea );hbd_blue=( Fir + Pas + Agg + Bra + Jum + Str );hbd=( ( ( hbd_key * 5) + (hbd_green * 3) + (hbd_blue * 1) ) / 50);",
  },
  {
    "name": "Inside forward - support",
    "text": "ifs_key=( Acc + Pac + Sta + Wor );ifs_green=( Dri + Fin + Fir + Tec + OtB + Agi );ifs_blue=( Lon + Pas + Ant + Cmp + Fla + Vis + Bal );ifs=( ( ( ifs_key * 5) + (ifs_green * 3) + (ifs_blue * 1) ) / 45);",
  },
  {
    "name": "Inside forward - attack",
    "text": "ifa_key=( Acc + Pac + Sta + Wor );ifa_green=( Dri + Fin + Fir + Tec + Ant + OtB + Agi );ifa_blue=( Lon + Pas + Cmp + Fla + Bal );ifa=( ( ( ifa_key * 5) + (ifa_green * 3) + (ifa_blue * 1) ) / 46);",
  },
  {
    "name": "Inverted winger - support",
    "text": "iws_key=( Acc + Pac + Sta + Wor );iws_green=( Cro + Dri + Pas + Tec + Agi );iws_blue=( Fir + Lon + Cmp + Dec + OtB + Vis + Bal );iws=( ( ( iws_key * 5) + (iws_green * 3) + (iws_blue * 1) ) / 42);",
  },
  {
    "name": "Inverted winger - attack",
    "text": "iwa_key=( Acc + Pac + Sta + Wor );iwa_green=( Cro + Dri + Pas + Tec + Agi );iwa_blue=( Fir + Lon + Ant + Cmp + Dec + Fla + OtB + Vis + Bal );iwa=( ( ( iwa_key * 5) + (iwa_green * 3) + (iwa_blue * 1) ) / 44);",
  },
  {
    "name": "Mezzala - support",
    "text": "mezs_key=( Acc + Pac + Sta + Wor );mezs_green=( Pas + Tec + Dec + OtB );mezs_blue=( Dri + Fir + Lon + Tck + Ant + Cmp + Vis + Bal );mezs=( ( ( mezs_key * 5) + (mezs_green * 3) + (mezs_blue * 1) ) / 40);",
  },
  {
    "name": "Mezzala - attack",
    "text": "meza_key=( Acc + Pac + Sta + Wor );meza_green=( Dri + Pas + Tec + Dec + OtB + Vis );meza_blue=( Fin + Fir + Lon + Ant + Cmp + Fla + Bal );meza=( ( ( meza_key * 5) + (meza_green * 3) + (meza_blue * 1) ) / 45);",
  },
  {
    "name": "Raumdeuter - attack",
    "text": "raua_key=( Acc + Pac + Sta + Wor );raua_green=( Fin + Ant + Cmp + Cnt + Dec + OtB + Bal );raua_blue=( Fir + Tec );raua=( ( ( raua_key * 5) + (raua_green * 3) + (raua_blue * 1) ) / 43);",
  },
  {
    "name": "Regista - support",
    "text": "regs_key=( Wor + Sta + Acc + Pac );regs_green=( Fir + Pas + Tec + Cmp + Dec + Fla + OtB + Tea + Vis );regs_blue=( Dri + Lon + Ant + Bal );regs=( ( ( regs_key * 5) + (regs_green * 3) + (regs_blue * 1) ) / 51);",
  },
  {
    "name": "Roaming playmaker - support",
    "text": "rps_key=( Acc + Pac + Sta + Wor );rps_green=( Fir + Pas + Tec + Ant + Cmp + Dec + OtB + Tea + Vis );rps_blue=( Dri + Lon + Cnt + Pos + Agi + Bal );rps=( ( ( rps_key * 5) + (rps_green * 3) + (rps_blue * 1) ) / 53);",
  },
  {
    "name": "Segundo volante - support",
    "text": "svs_key=( Wor + Sta + Acc + Pac );svs_green=( Mar + Pas + Tck + OtB + Pos );svs_blue=( Fin + Fir + Lon + Ant + Cmp + Cnt + Dec + Bal + Str );svs=( ( ( svs_key * 5) + (svs_green * 3) + (svs_blue * 1) ) / 44);",
  },
  {
    "name": "Segundo volante - attack",
    "text": "sva_key=( Wor + Sta + Acc + Pac );sva_green=( Fin + Lon + Pas + Tck + Ant + OtB + Pos );sva_blue=( Fir + Mar + Cmp + Cnt + Dec + Bal );sva=( ( ( sva_key * 5) + (sva_green * 3) + (sva_blue * 1) ) / 47);",
  },
  {
    "name": "Shadow striker - attack",
    "text": "ssa_key=( Acc + Pac + Sta + Wor );ssa_green=( Dri + Fin + Fir + Ant + Cmp + OtB );ssa_blue=( Pas + Tec + Cnt + Dec + Agi + Bal );ssa=( ( ( ssa_key * 5) + (ssa_green * 3) + (ssa_blue * 1) ) / 44);",
  },
  {
    "name": "Wide midfielder - defend",
    "text": "wmd_key=( Acc + Pac + Sta + Wor );wmd_green=( Pas + Tck + Cnt + Dec + Pos + Tea );wmd_blue=( Cro + Fir + Mar + Tec + Ant + Cmp );wmd=( ( ( wmd_key * 5) + (wmd_green * 3) + (wmd_blue * 1) ) / 44);",
  },
  {
    "name": "Wide midfielder - support",
    "text": "wms_key=( Acc + Pac + Sta + Wor );wms_green=( Pas + Tck + Dec + Tea );wms_blue=( Cro + Fir + Tec + Ant + Cmp + Cnt + OtB + Pos + Vis );wms=( ( ( wms_key * 5) + (wms_green * 3) + (wms_blue * 1) ) / 41);",
  },
  {
    "name": "Wide midfielder - attack",
    "text": "wma_key=( Acc + Pac + Sta + Wor );wma_green=( Cro + Fir + Pas + Dec + Tea );wma_blue=( Tck + Tec + Ant + Cmp + OtB + Vis );wma=( ( ( wma_key * 5) + (wma_green * 3) + (wma_blue * 1) ) / 41);",
  },
  {
    "name": "Wide playmaker - support",
    "text": "wps_key=( Acc + Pac + Sta + Wor );wps_green=( Fir + Pas + Tec + Cmp + Dec + Tea + Vis );wps_blue=( Dri + OtB + Agi );wps=( ( ( wps_key * 5) + (wps_green * 3) + (wps_blue * 1) ) / 44);",
  },
  {
    "name": "Wide playmaker - attack",
    "text": "wpa_key=( Acc + Pac + Sta + Wor );wpa_green=( Dri + Fir + Pas + Tec + Cmp + Dec + OtB + Tea + Vis );wpa_blue=( Ant + Fla + Agi );wpa=( ( ( wpa_key * 5) + (wpa_green * 3) + (wpa_blue * 1) ) / 50);",
  },
  {
    "name": "Wide target forward - support",
    "text": "wtfs_key=( Acc + Pac + Sta + Wor );wtfs_green=( Hea + Bra + Tea + Jum + Str );wtfs_blue=( Cro + Fir + Ant + OtB + Bal );wtfs=( ( ( wtfs_key * 5) + (wtfs_green * 3) + (wtfs_blue * 1) ) / 40);",
  },
  {
    "name": "Wide target forward - attack",
    "text": "wtfa_key=( Acc + Pac + Sta + Wor );wtfa_green=( Hea + Bra + OtB + Jum + Str );wtfa_blue=( Cro + Fin + Fir + Ant + Tea + Bal );wtfa=( ( ( wtfa_key * 5) + (wtfa_green * 3) + (wtfa_blue * 1) ) / 41);",
  },
  {
    "name": "Winger - support",
    "text": "ws_key=( Acc + Pac + Sta + Wor );ws_green=( Cro + Dri + Tec + Agi );ws_blue=( Fir + Pas + OtB + Bal );ws=( ( ( ws_key * 5) + (ws_green * 3) + (ws_blue * 1) ) / 36);",
  },
  {
    "name": "Winger - attack",
    "text": "wa_key=( Acc + Pac + Sta + Wor );wa_green=( Cro + Dri + Tec + Agi );wa_blue=( Fir + Pas + Ant + Fla + OtB + Bal );wa=( ( ( wa_key * 5) + (wa_green * 3) + (wa_blue * 1) ) / 38);",
  },
  {
    "name": "Advanced forward - attack",
    "text": "afa_key=( Acc + Pac + Fin );afa_green=( Dri + Fir + Tec + Cmp + OtB );afa_blue=( Pas + Ant + Dec + Wor + Agi + Bal + Sta );afa=( ( ( afa_key * 5) + (afa_green * 3) + (afa_blue * 1) ) / 37);",
  },
  {
    "name": "Complete forward - support",
    "text": "cfs_key=( Acc + Pac + Fin );cfs_green=( Dri + Fir + Hea + Lon + Pas + Tec + Ant + Cmp + Dec + OtB + Vis + Agi + Str );cfs_blue=( Tea + Wor + Bal + Jum + Sta );cfs=( ( ( cfs_key * 5) + (cfs_green * 3) + (cfs_blue * 1) ) / 59);",
  },
  {
    "name": "Complete forward - attack",
    "text": "cfa_key=( Acc + Pac + Fin );cfa_green=( Dri + Fir + Hea + Tec + Ant + Cmp + OtB + Agi + Str );cfa_blue=( Lon + Pas + Dec + Tea + Vis + Wor + Bal + Jum + Sta );cfa=( ( ( cfa_key * 5) + (cfa_green * 3) + (cfa_blue * 1) ) / 51);",
  },
  {
    "name": "Deep lying forward - support",
    "text": "dlfs_key=( Acc + Pac + Fin );dlfs_green=( Fir + Pas + Tec + Cmp + Dec + OtB + Tea );dlfs_blue=( Ant + Fla + Vis + Bal + Str );dlfs=( ( ( dlfs_key * 5) + (dlfs_green * 3) + (dlfs_blue * 1) ) / 41);",
  },
  {
    "name": "Deep lying forward - attack",
    "text": "dlfa_key=( Acc + Pac + Fin );dlfa_green=( Fir + Pas + Tec + Cmp + Dec + OtB + Tea );dlfa_blue=( Dri + Ant + Fla + Vis + Bal + Str );dlfa=( ( ( dlfa_key * 5) + (dlfa_green * 3) + (dlfa_blue * 1) ) / 42);",
  },
  {
    "name": "False nine - support",
    "text": "f9s_key=( Acc + Pac + Fin );f9s_green=( Dri + Fir + Pas + Tec + Cmp + Dec + OtB + Vis + Agi );f9s_blue=( Ant + Fla + Tea + Bal );f9s=( ( ( f9s_key * 5) + (f9s_green * 3) + (f9s_blue * 1) ) / 46);",
  },
  {
    "name": "Poacher - attack",
    "text": "pa_key=( Acc + Pac + Fin );pa_green=( Ant + Cmp + OtB );pa_blue=( Fir + Hea + Tec + Dec );pa=( ( ( pa_key * 5) + (pa_green * 3) + (pa_blue * 1) ) / 28);",
  },
  {
    "name": "Pressing forward - defend",
    "text": "pfd_key=( Acc + Pac + Fin );pfd_green=( Agg + Ant + Bra + Dec + Tea + Wor + Sta );pfd_blue=( Fir + Cmp + Cnt + Agi + Bal + Str );pfd=( ( ( pfd_key * 5) + (pfd_green * 3) + (pfd_blue * 1) ) / 42);",
  },
  {
    "name": "Pressing forward - support",
    "text": "pfs_key=( Acc + Pac + Fin );pfs_green=( Agg + Ant + Bra + Dec + Tea + Wor + Sta );pfs_blue=( Fir + Pas + Cmp + Cnt + OtB + Agi + Bal + Str );pfs=( ( ( pfs_key * 5) + (pfs_green * 3) + (pfs_blue * 1) ) / 44);",
  },
  {
    "name": "Pressing forward - attack",
    "text": "pfa_key=( Acc + Pac + Fin );pfa_green=( Agg + Ant + Bra + OtB + Tea + Wor + Sta );pfa_blue=( Fir + Cmp + Cnt + Dec + Agi + Bal + Str );pfa=( ( ( pfa_key * 5) + (pfa_green * 3) + (pfa_blue * 1) ) / 43);",
  },
  {
    "name": "Target forward - support",
    "text": "tfs_key=( Acc + Pac + Fin );tfs_green=( Hea + Bra + Tea + Bal + Jum + Str );tfs_blue=( Fir + Agg + Ant + Cmp + Dec + OtB );tfs=( ( ( tfs_key * 5) + (tfs_green * 3) + (tfs_blue * 1) ) / 39);",
  },
  {
    "name": "Target forward - attack",
    "text": "tfa_key=( Acc + Pac + Fin );tfa_green=( Hea + Bra + Cmp + OtB + Bal + Jum + Str );tfa_blue=( Fir + Agg + Ant + Dec + Tea );tfa=( ( ( tfa_key * 5) + (tfa_green * 3) + (tfa_blue * 1) ) / 41);",
  },
  {
    "name": "Trequartista - attack",
    "text": "trea_key=( Acc + Pac + Fin );trea_green=( Dri + Fir + Pas + Tec + Cmp + Dec + Fla + OtB + Vis );trea_blue=( Ant + Agi + Bal );trea=( ( ( trea_key * 5) + (trea_green * 3) + (trea_blue * 1) ) / 45);",
  }
]

const Parser = require('expr-eval').Parser;

const rowParser = (text, row) =>  {

  const parser = new Parser();

  const lines = text.split(";");
  for (let i=0; i < lines.length -1; i++) {
    const lineSplit = lines[i].split("=");
    const varName = lineSplit[0];

    const formula = lineSplit[1].replace("1v1", "onevone");
    const expr = parser.parse(formula);

    try {
      const res = expr.evaluate(row);
      row[varName] = res;
    } catch (e) {
      alert("Formula evaluation failed. Might be due to a missing variable or malformed numerical input.");
    }
  }
  return row;
};

const Table = ({values, titles, sortFunc}) => {
  return (
    <table>
      <thead>
        <tr>
          {
            titles.map((t, i) => <th key={i} onClick={() => sortFunc(t)}>{ t === 'onevone' ? '1v1': t }</th>)
          }
        </tr>
      </thead>
      <tbody>
         {
           values.map((v,i) => <tr key={i}>{titles.map((t,j) => <td key={j}>{v[t]}</td>)}</tr>)
         }
      </tbody>
    </table>
  )
};

export default function Home() {

  const [values, setValues] = useState([]);
  const [titles, setTitles] = useState([]);
  const [file, setFile] = useState(null);
  const [formula, setFormula] = useState('');

  const selectPreloaded = (event) => {
    setFormula(event.target.value);
  }

  const sortFunc = (col) => {
      const vals = [...values];
      vals.sort((a, b) => b[col] - a[col]);
      setValues(vals);
  }

  const formulaChange = (event) => {
    setFormula(event.target.value);
  }

  const uploadToClient = (event) => {
    if (formula == '') {
       window.alert('Formula cannot be blank');
       return;
    } else {
      if (event.target.files && event.target.files[0]) {
	setFile(event.target.files[0]);
      }
    }
  }

  const run = () => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
	const contents = reader.result;
	const parser = new DOMParser();
	const parsedDocument = parser.parseFromString(contents, "text/html");
	const table = parsedDocument.getElementsByTagName("table");

	const data = {}

	const tableHeaders = parsedDocument.getElementsByTagName("th");
	const titles = [];
	for (let i = 0; i < tableHeaders.length; i++) {
	  const headerInner = tableHeaders[i].innerText;
	  if (headerInner === "1v1") {
	    titles.push("onevone");
	  } else {
	    titles.push(headerInner);
	  }
	}

	const values = [];
	const tableRows = parsedDocument.getElementsByTagName("tr");
	for (let i = 1; i < tableRows.length; i++) {
	  const tableRowValues = tableRows[i].getElementsByTagName("td");
	  const tmp = {};
	  for (let j = 0; j < tableRowValues.length; j++) {
	    tmp[titles[j]] = tableRowValues[j].innerText;
	  }
	  values.push(tmp);
	}

	values.map(val => rowParser(formula, val));
	setValues(values);
	setTitles(Object.keys(values[0]));
      },
      false,
    );
    reader.readAsText(file);
  };

  return (
    <main>
      <div>
        <textarea name="formula" rows={4} cols={40} value={formula} onChange={formulaChange} />
      </div>
      <div>
	<label htmlFor="preloaded-formula">Preloaded formula by position</label>
	<select id="preloaded-formula" name="preloaded-formula" onChange={selectPreloaded}>
	  {
	    positions.map((pos,i) => <option key={i} value={pos.text}>{pos.name}</option>)
	    
          }
	</select>
      </div>
      <div>
        <ul>
          <li>Do not use any spaces</li>
          <li>Formula must start with variable name and then equals</li>
          <li>Every formula must end with semi-colon</li>
          <li>Will only work with numerical columns, does not include transfer value</li>
          <li>Example: test=Acc+Agi;test2=Nat/Pac;test3=(test*2)*test2;</li>
          <li>Click column title to sort in descending order</li>
          <li>Must export HTML format files</li>
        </ul>
      </div>
      <div>
	<input type="file" accept="html" name="data" onChange={uploadToClient} />
	<button onClick={() => run()}>Run</button>
      </div>
      <div>
	{
	   values ? (<Table titles={titles} values={values} sortFunc={sortFunc} />) : null
	}
      </div>
    </main>
  )
}
