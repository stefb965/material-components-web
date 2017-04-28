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

import MDCComponent from '@material/base/component';

import MDCTabBarScrollerFoundation from './foundation';

export {MDCTabBarScrollerFoundation};

export class MDCTabBarScroller extends MDCComponent {
  static attachTo(root) {
    return new MDCTabBarScroller(root);
  }

  get isRTL() {
    return this.foundation_.isRTL();
  }

  get currentTranslateOffset() {
    return this.currentTranslateOffset_;
  }

  set currentTranslateOffset(offset) {
    this.currentTranslateOffset_ = offset;
  }

  get scrollTarget() {
    return this.scrollTarget_;
  }

  set scrollTarget(tab) {
    this.scrollTarget_ = tab;
  }

  get currentFocusedTarget() {
    return this.currentFocusedTarget_;
  }

  set currentFocusedTarget(target) {
    this.currentFocusedTarget_ = target;
  }

  initialize() {
    this.scrollTarget_;
    this.currentTranslateOffset_ = 0;
    this.computedFrameWidth_ = 0;
    this.scrollFrame = this.root_.querySelector(MDCTabBarScrollerFoundation.strings.FRAME_SELECTOR);
    this.tabs = this.root_.querySelector(MDCTabBarScrollerFoundation.strings.TABS_SELECTOR);
    this.iterableTabs = [].slice.call(this.root_.querySelectorAll(MDCTabBarScrollerFoundation.strings.TAB_SELECTOR));
    this.shiftBackTarget = this.root_.querySelector(MDCTabBarScrollerFoundation.strings.INDICATOR_BACK_SELECTOR);
    this.shiftForwardTarget = this.root_.querySelector(MDCTabBarScrollerFoundation.strings.INDICATOR_FORWARD_SELECTOR);

    requestAnimationFrame(() => this.layout_());
  }

  getDefaultFoundation() {
    return new MDCTabBarScrollerFoundation({
      isRTL: () =>
        getComputedStyle(this.root_).getPropertyValue('direction') === 'rtl',
      registerBackIndicatorInteractionHandler: (handler) =>
        this.shiftBackTarget.addEventListener('click', handler),
      deregisterBackIndicatorInteractionHandler: (handler) =>
        this.shiftBackTarget.removeEventListener('click', handler),
      registerForwardIndicatorInteractionHandler: (handler) =>
        this.shiftForwardTarget.addEventListener('click', handler),
      deregisterForwardIndicatorInteractionHandler: (handler) =>
        this.shiftForwardTarget.removeEventListener('click', handler),
      registerFocusInteractionHandler: (handler) =>
        this.root_.addEventListener('focus', handler, true),
      deregisterFocusInteractionHandler: (handler) =>
        this.root_.removeEventListener('focus', handler, true),
      registerWindowResizeHandler: (handler) =>
        window.addEventListener('resize', handler),
      deregisterWindowResizeHandler: (handler) =>
        window.removeEventListener('resize', handler),
      triggerNewLayout: () => requestAnimationFrame(() => this.layout_()),
      numberOfTabs: () => this.iterableTabs.length,
      rtlNormalizedOffsetLeftForTabAtIndex: (index) =>
        this.getRTLNormalizedOffsetLeftForTab_(this.iterableTabs[index]),
      rtlNormalizedOffsetLeftForFocusedTarget: (target) =>
        this.getRTLNormalizedOffsetLeftForTab_(target),
      computedWidthForTabAtIndex: (index) => this.iterableTabs[index].offsetWidth,
      computedLeftForTabAtIndex: (index) => this.iterableTabs[index].offsetLeft,
      computedScrollFrameWidth: () => this.computedFrameWidth_,
      updateScrollTargetToTabAtIndex: (index) => this.setScrollTargetWithIndex_(index),
      currentTranslateOffset: () => this.currentTranslateOffset,
      scrollToTab: () => this.scrollToTab_(),
      setFocusedTarget: (target) => (this.currentFocusedTarget = target),
      focusedTarget: () => this.currentFocusedTarget,
      focusedTargetComputedWidth: () => this.currentFocusedTarget.offsetWidth,
      focusedTargetComputedLeft: () => this.currentFocusedTarget.offsetLeft,
    });
  }

  layout_() {
    this.computedFrameWidth_ = this.scrollFrame.offsetWidth;
    const isOverflowing = this.tabs.offsetWidth > this.computedFrameWidth_;

    if (isOverflowing) {
      this.tabs.classList.add(MDCTabBarScrollerFoundation.cssClasses.VISIBLE);
    } else {
      this.tabs.classList.remove(MDCTabBarScrollerFoundation.cssClasses.VISIBLE);
      this.currentTranslateOffset_ = 0;
      this.shiftFrame_();
    }

    this.updateIndicatorEnabledStates_();
  }

  scrollToTab_() {
    this.currentTranslateOffset = this.isRTL ?
      this.tabs.offsetWidth - (this.scrollTarget.offsetLeft + this.scrollTarget.offsetWidth) :
      this.scrollTarget.offsetLeft;

    requestAnimationFrame(() => this.shiftFrame_());
  }

  getRTLNormalizedOffsetLeftForTab_(tab) {
    return this.tabs.offsetWidth - (tab.offsetLeft + tab.offsetWidth);
  }

  setScrollTargetWithIndex_(index) {
    this.scrollTarget = this.iterableTabs[index];
  }

  shiftFrame_() {
    const shiftAmount = this.isRTL ?
      this.currentTranslateOffset :
      -this.currentTranslateOffset + this.scrollFrame.scrollLeft;

    this.tabs.style.transform =
      this.tabs.style.webkitTransform = `translateX(${shiftAmount}px)`;

    this.updateIndicatorEnabledStates_();
  }

  updateIndicatorEnabledStates_() {
    if (this.currentTranslateOffset === 0) {
      this.shiftBackTarget.classList.add(MDCTabBarScrollerFoundation.cssClasses.INDICATOR_DISABLED);
    } else {
      this.shiftBackTarget.classList.remove(MDCTabBarScrollerFoundation.cssClasses.INDICATOR_DISABLED);
    }

    if (this.currentTranslateOffset + this.scrollFrame.offsetWidth > this.tabs.offsetWidth) {
      this.shiftForwardTarget.classList.add(MDCTabBarScrollerFoundation.cssClasses.INDICATOR_DISABLED);
    } else {
      this.shiftForwardTarget.classList.remove(MDCTabBarScrollerFoundation.cssClasses.INDICATOR_DISABLED);
    }
  }
}
