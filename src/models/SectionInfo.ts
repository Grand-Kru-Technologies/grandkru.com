import type { Component } from "vue";

export default class SectionInfo {
  private _id: string;
  private _component: Component;
  private _name: string;
  private _faIcon: string;

  constructor(
    id: string,
    component: Component,
    name = "",
    faIcon = ""
  ) {
    this._id = id;
    this._component = component;

    if (!this._id || !this._component) {
      throw new Error(
        "You must specify an ID and a component for every SectionInfo object!"
      );
    }

    this._name = name;
    this._faIcon = faIcon;
  }

  get id(): string {
    return this._id;
  }

  get name(): string | null {
    return this._name || null;
  }

  get faIcon(): string {
    return this._faIcon || "fa-solid fa-circle";
  }

  get component(): Component {
    return this._component;
  }

  get hash(): string {
    return `#${this.id}`;
  }
}
