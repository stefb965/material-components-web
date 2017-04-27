/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import MDCFoundation from '@material/base/foundation';

import {cssClasses, strings} from './constants';

export default class MDCTabBarScrollerFoundation extends MDCFoundation {
  static get cssClasses() {
    return cssClasses;
  }

  static get strings() {
    return strings;
  }

  static get defaultAdapter() {
    return {
      isRTL: () => /* boolean */ false,
      registerBackIndicatorInteractionHandler: (/* handler: EventListener */) => {},
      deregisterBackIndicatorInteractionHandler: (/* handler: EventListener */) => {},
      registerForwardIndicatorInteractionHandler: (/* handler: EventListener */) => {},
      deregisterForwardIndicatorInteractionHandler: (/* handler: EventListener */) => {},
      registerFocusInteractionHandler: (/* handler: EventListener */) => {},
      deregisterFocusInteractionHandler: (/* handler: EventListener */) => {},
      registerWindowResizeHandler: (/* handler: EventListener */) => {},
      deregisterWindowResizeHandler: (/* handler: EventListener */) => {},
      triggerNewLayout: () => {},
      numberOfTabs: () => {},
      rtlNormalizedOffsetLeftForTabAtIndex: () => {},
      rtlNormalizedOffsetLeftForFocusedTarget: () => {},
      computedWidthForTabAtIndex: () => {},
      computedLeftForTabAtIndex: () => {},
      computedScrollFrameWidth: () => {},
      updateScrollTargetToTabAtIndex: () => {},
      currentTranslateOffset: () => {},
      scrollToTab: () => {},
      setFocusedTarget: () => {},
      focusedTarget: () => {},
      focusedTargetComputedWidth: () => {},
      focusedTargetComputedLeft: () => {},
    };
  }

  constructor(adapter) {
    super(Object.assign(MDCTabBarScrollerFoundation.defaultAdapter, adapter));

    this.currentTranslateOffset_ = 0;
    this.forwardIndicatorClickHandler = () => this.scrollForward();
    this.backIndicatorClickHandler = () => this.scrollBack();
    this.focusHandler = (evt) => this.checkForNewLayout_(evt);
  }

  init() {
    this.adapter_.registerBackIndicatorInteractionHandler(this.backIndicatorClickHandler);
    this.adapter_.registerForwardIndicatorInteractionHandler(this.forwardIndicatorClickHandler);
    this.adapter_.registerWindowResizeHandler(this.adapter_.triggerNewLayout);
    this.adapter_.registerFocusInteractionHandler(this.focusHandler);
  }

  destroy() {
    this.adapter_.deregisterBackIndicatorInteractionHandler(this.backIndicatorClickHandler);
    this.adapter_.deregisterForwardIndicatorInteractionHandler(this.forwardIndicatorClickHandler);
    this.adapter_.deregisterWindowResizeHandler(this.adapter_.triggerNewLayout);
    this.adapter_.deregisterFocusInteractionHandler(this.focusEventHandler);
  }

  scrollBack() {
    let tabWidthAccumulator = 0;
    let foundScrollTarget = false;

    for (let i = this.adapter_.numberOfTabs() - 1; i > 0; i--) {
      const tabOffsetX = this.adapter_.isRTL() ?
        this.adapter_.rtlNormalizedOffsetLeftForTabAtIndex(i) :
        this.adapter_.computedLeftForTabAtIndex(i);

      if (tabOffsetX >= this.adapter_.currentTranslateOffset()) {
        continue;
      }

      tabWidthAccumulator += this.adapter_.computedWidthForTabAtIndex(i);

      if (tabWidthAccumulator > this.adapter_.computedScrollFrameWidth()) {
        this.adapter_.updateScrollTargetToTabAtIndex(i + 1);
        foundScrollTarget = true;

        break;
      }
    }

    if (!foundScrollTarget) {
      this.adapter_.updateScrollTargetToTabAtIndex(0);
      this.adapter_.scrollToTab();
    }

    this.adapter_.scrollToTab();
  }

  scrollForward() {
    const tabsOffset = this.adapter_.computedScrollFrameWidth() + this.adapter_.currentTranslateOffset();
    let foundScrollTarget = false;

    for (let i = 0; i < this.adapter_.numberOfTabs(); i++) {
      const tabOffsetX = this.adapter_.isRTL() ?
        this.adapter_.rtlNormalizedOffsetLeftForTabAtIndex(i) :
        this.adapter_.computedLeftForTabAtIndex(i);

      if (tabOffsetX + this.adapter_.computedWidthForTabAtIndex(i) >= tabsOffset) {
        this.adapter_.updateScrollTargetToTabAtIndex(i);
        foundScrollTarget = true;

        break;
      }
    }

    if (!foundScrollTarget) {
      return;
    }

    this.adapter_.scrollToTab();
  }

  checkForNewLayout_(evt) {
    if (!evt.target.classList.contains(cssClasses.TAB)) {
      return;
    }

    this.adapter_.setFocusedTarget(evt.target);

    const focusOffset = this.adapter_.focusedTargetComputedLeft() + this.adapter_.focusedTargetComputedWidth();
    const translateOffset = this.adapter_.currentTranslateOffset();

    if (this.adapter_.isRTL()) {
      if (this.adapter_.rtlNormalizedOffsetLeftForFocusedTarget(this.adapter_.focusedTarget()) +
          this.adapter_.focusedTargetComputedWidth() > translateOffset) {
        this.scrollForward();
      }

      if (this.adapter_.rtlNormalizedOffsetLeftForFocusedTarget(this.adapter_.focusedTarget()) < this.adapter_.currentTranslateOffset()) {
        this.scrollBack();
      }
    }
    else {
      if (this.adapter_.focusedTargetComputedLeft() > translateOffset) {
        this.scrollForward();
      }

      if (this.adapter_.focusedTargetComputedLeft() < this.adapter_.currentTranslateOffset()) {
        this.scrollBack();
      }
    }
  }

  isRTL() {
    return this.adapter_.isRTL();
  }
}
