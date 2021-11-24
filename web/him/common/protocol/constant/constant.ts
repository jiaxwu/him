/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "constant";

/** 终端 */
export enum Terminal {
  /** TerminalUnknown - 未知 */
  TerminalUnknown = 0,
  /** TerminalApp - App */
  TerminalApp = 1,
  /** TerminalPC - PC */
  TerminalPC = 2,
  /** TerminalWeb - Web */
  TerminalWeb = 3,
  UNRECOGNIZED = -1,
}

export function terminalFromJSON(object: any): Terminal {
  switch (object) {
    case 0:
    case "TerminalUnknown":
      return Terminal.TerminalUnknown;
    case 1:
    case "TerminalApp":
      return Terminal.TerminalApp;
    case 2:
    case "TerminalPC":
      return Terminal.TerminalPC;
    case 3:
    case "TerminalWeb":
      return Terminal.TerminalWeb;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Terminal.UNRECOGNIZED;
  }
}

export function terminalToJSON(object: Terminal): string {
  switch (object) {
    case Terminal.TerminalUnknown:
      return "TerminalUnknown";
    case Terminal.TerminalApp:
      return "TerminalApp";
    case Terminal.TerminalPC:
      return "TerminalPC";
    case Terminal.TerminalWeb:
      return "TerminalWeb";
    default:
      return "UNKNOWN";
  }
}

/** 性别 */
export enum Gender {
  /** GenderUnknown - 未知 */
  GenderUnknown = 0,
  /** GenderMale - 男性 */
  GenderMale = 1,
  /** GenderFemale - 女性 */
  GenderFemale = 2,
  UNRECOGNIZED = -1,
}

export function genderFromJSON(object: any): Gender {
  switch (object) {
    case 0:
    case "GenderUnknown":
      return Gender.GenderUnknown;
    case 1:
    case "GenderMale":
      return Gender.GenderMale;
    case 2:
    case "GenderFemale":
      return Gender.GenderFemale;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Gender.UNRECOGNIZED;
  }
}

export function genderToJSON(object: Gender): string {
  switch (object) {
    case Gender.GenderUnknown:
      return "GenderUnknown";
    case Gender.GenderMale:
      return "GenderMale";
    case Gender.GenderFemale:
      return "GenderFemale";
    default:
      return "UNKNOWN";
  }
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
