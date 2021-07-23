export const registerSettings = function () {

  game.settings.register("add1e", "initiative", {
    name: game.i18n.localize("ADD1E.Setting.Initiative"),
    hint: game.i18n.localize("ADD1E.Setting.InitiativeHint"),
    default: "group",
    scope: "world",
    type: String,
    config: true,
    choices: {
      individual: "ADD1E.Setting.InitiativeIndividual",
      group: "ADD1E.Setting.InitiativeGroup",
    },
    onChange: _ => window.location.reload()
  });

  game.settings.register("add1e", "rerollInitiative", {
    name: game.i18n.localize("ADD1E.Setting.RerollInitiative"),
    hint: game.i18n.localize("ADD1E.Setting.RerollInitiativeHint"),
    default: "reset",
    scope: "world",
    type: String,
    config: true,
    choices: {
      keep: "ADD1E.Setting.InitiativeKeep",
      reset: "ADD1E.Setting.InitiativeReset",
      reroll: "ADD1E.Setting.InitiativeReroll",
    }
  });

  game.settings.register("add1e", "ascendingAC", {
    name: game.i18n.localize("ADD1E.Setting.AscendingAC"),
    hint: game.i18n.localize("ADD1E.Setting.AscendingACHint"),
    default: false,
    scope: "world",
    type: Boolean,
    config: true,
    onChange: _ => window.location.reload()
  });

  game.settings.register("add1e", "morale", {
    name: game.i18n.localize("ADD1E.Setting.Morale"),
    hint: game.i18n.localize("ADD1E.Setting.MoraleHint"),
    default: false,
    scope: "world",
    type: Boolean,
    config: true,
  });

  game.settings.register("add1e", "encumbranceOption", {
    name: game.i18n.localize("ADD1E.Setting.Encumbrance"),
    hint: game.i18n.localize("ADD1E.Setting.EncumbranceHint"),
    default: "detailed",
    scope: "world",
    type: String,
    config: true,
    choices: {
      disabled: "ADD1E.Setting.EncumbranceDisabled",
      basic: "ADD1E.Setting.EncumbranceBasic",
      detailed: "ADD1E.Setting.EncumbranceDetailed",
      complete: "ADD1E.Setting.EncumbranceComplete",
    },
    onChange: _ => window.location.reload()
  });

  game.settings.register("add1e", "significantTreasure", {
    name: game.i18n.localize("ADD1E.Setting.SignificantTreasure"),
    hint: game.i18n.localize("ADD1E.Setting.SignificantTreasureHint"),
    default: 800,
    scope: "world",
    type: Number,
    config: true,
    onChange: _ => window.location.reload()
  });

  game.settings.register("add1e", "languages", {
    name: game.i18n.localize("ADD1E.Setting.Languages"),
    hint: game.i18n.localize("ADD1E.Setting.LanguagesHint"),
    default: "",
    scope: "world",
    type: String,
    config: true,
    onChange: _ => window.location.reload()
  });
};
