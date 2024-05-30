export class DataClass {
  static dreams = [];
  static cards = {};
  static scenarios = {};

  static setData = (data) => {
    DataClass.dreams = data?.dreams || [];
    DataClass.scenarios = data?.scenarios || {};
    DataClass.cards = data?.cards || {};
  };
}

