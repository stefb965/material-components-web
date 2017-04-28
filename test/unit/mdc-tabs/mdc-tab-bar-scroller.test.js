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

import {assert} from 'chai';
import bel from 'bel';
import domEvents from 'dom-events';
import td from 'testdouble';
import {createMockRaf} from '../helpers/raf';
import {MDCTabBarScroller} from '../../../packages/mdc-tabs/tab-bar-scroller';

function getFixture() {
  return bel`
    <div>
      <div id="tabs-scroller" class="mdc-tab-bar-scroller">
        <div class="mdc-tab-bar-scroller__indicator mdc-tab-bar-scroller__indicator--back">
          <a class="mdc-tab-bar-scroller__indicator__inner material-icons" href="#" aria-label="scroll back button">
            keyboard-arrow-left
          </a>
        </div>
        <div class="mdc-tab-bar-scroller__scroll-frame">
          <nav id="scrollable-tab-bar" class="mdc-tab-bar mdc-tab-bar-scroller__scroll-frame__tabs">
            <a class="mdc-tab mdc-tab--active" href="#one">Item One</a>
            <a class="mdc-tab" href="#two">Item Two</a>
            <a class="mdc-tab" href="#three">Item Three</a>
            <a class="mdc-tab" href="#four">Item Four</a>
            <a class="mdc-tab" href="#five">Item Five</a>
            <a class="mdc-tab" href="#six">Item Six</a>
            <a class="mdc-tab" href="#seven">Item Seven</a>
            <a class="mdc-tab" href="#eight">Item Eight</a>
            <a class="mdc-tab" href="#nine">Item Nine</a>
            <span class="mdc-tab-bar__indicator"></span>
          </nav>
        </div>
        <div class="mdc-tab-bar-scroller__indicator mdc-tab-bar-scroller__indicator--forward">
          <a class="mdc-tab-bar-scroller__indicator__inner material-icons" href="#" aria-label="scroll forward button">
            keyboard-arrow-right
          </a>
        </div>
      </div>
    </div>`;
}

function setupTest() {
  const fixture = getFixture();
  const root = fixture.querySelector('.mdc-tab-bar-scroller');
  const tabs = fixture.querySelector('.mdc-tab-bar-scroller__scroll-frame__tabs');
  const iterableTabs = [].slice.call(tabs.querySelectorAll('.mdc-tab'));
  const backIndicator =
    fixture.querySelector('.mdc-tab-bar-scroller__indicator--back');
  const forwardIndicator =
    fixture.querySelector('.mdc-tab-bar-scroller__indicator--forward');
  const scrollFrame =
    fixture.querySelector('.mdc-tab-bar-scroller__scroll-frame');

  const component = new MDCTabBarScroller(root);

  return {fixture, root, backIndicator, forwardIndicator, scrollFrame, tabs, iterableTabs, component};
}

suite('MDCTabBarScroller');

test('attachTo returns a component instance', () => {
  const {root} = setupTest();

  assert.isTrue(MDCTabBarScroller.attachTo(root) instanceof MDCTabBarScroller);
});

// TODO: sheehana add for rtl context
test('adapter#isRTL returns false if not in RTL context', () => {
  const {component} = setupTest();

  assert.isFalse(component.getDefaultFoundation().adapter_.isRTL());
});

test('adapter#registerBackIndicatorInteractionHandler', () => {
  const {component, backIndicator} = setupTest();
  const handler = td.func('eventHandler');

  component.getDefaultFoundation().adapter_.registerBackIndicatorInteractionHandler(handler);
  domEvents.emit(backIndicator, 'click');

  td.verify(handler(td.matchers.anything()));
});

test('adapter#registerForwardIndicatorInteractionHandler', () => {
  const {component, forwardIndicator} = setupTest();
  const handler = td.func('eventHandler');

  component.getDefaultFoundation().adapter_.registerForwardIndicatorInteractionHandler(handler);
  domEvents.emit(forwardIndicator, 'click');

  td.verify(handler(td.matchers.anything()));
});

test('adapter#registerFocusInteractionHandler adds focus listener to the component', () => {
  const {component, root} = setupTest();
  const handler = td.func('focusHandler');

  component.getDefaultFoundation().adapter_.registerFocusInteractionHandler(handler);
  domEvents.emit(root, 'focus');

  td.verify(handler(td.matchers.anything()));
});

test('adapter#deregisterFocusInteractionHandler removes focus listener from the component', () => {
  const {component} = setupTest();
  const handler = td.func('focusHandler');

  component.root_.addEventListener('focus', handler);
  component.getDefaultFoundation().adapter_.deregisterFocusInteractionHandler(handler);
  domEvents.emit(window, 'focus');

  td.verify(handler(td.matchers.anything()), {times: 0});
});

test('adapter#registerWindowResizeHandler adds resize listener to the component', () => {
  const {component} = setupTest();
  const handler = td.func('resizeHandler');

  component.getDefaultFoundation().adapter_.registerWindowResizeHandler(handler);
  domEvents.emit(window, 'resize');

  td.verify(handler(td.matchers.anything()));
});

test('adapter#deregisterWindowResizeHandler removes resize listener from component', () => {
  const {component} = setupTest();
  const handler = td.func('resizeHandler');

  window.addEventListener('resize', handler);
  component.getDefaultFoundation().adapter_.deregisterWindowResizeHandler(handler);
  domEvents.emit(window, 'resize');

  td.verify(handler(td.matchers.anything()), {times: 0});
});

test('adapter#triggerNewLayout lays out scroller components', () => {});

test('adapter#numberOfTabs returns the number of tabs in tab bar', () => {
  const {component} = setupTest();

  assert.equal(component.getDefaultFoundation().adapter_.numberOfTabs(), 9);
});

// TODO: sheehana
// test('adapter#rtlNormalizedOffsetLeftForTabAtIndex returns distance between ' +
//   'right edge of tab and right edge of container', () => {
//   const {component} = setupTest();
//   const tabIndex = 0;
// });
//
// test('adapter#rtlNormalizedOffsetLeftForFocusedTarget returns distance between ' +
//           'right edge of tab and right edge of container', () => {
//   const {component} = setupTest();
// });

test('adapter#computedWidthForTabAtIndex returns the width for the tab at ' +
  'a given index', () => {
  const {component, iterableTabs} = setupTest();
  const tabIndex = 0;

  assert.equal(component.getDefaultFoundation().adapter_.computedWidthForTabAtIndex(tabIndex),
    iterableTabs[tabIndex].offsetWidth);
});

test('adapter#computedLeftForTabAtIndex returns the left offset for the tab at' +
  'a given index', () => {
  const {component, iterableTabs} = setupTest();
  const tabIndex = 0;

  assert.equal(component.getDefaultFoundation().adapter_.computedLeftForTabAtIndex(tabIndex),
    iterableTabs[tabIndex].offsetLeft);
});

test('adapter#computedScrollFrameWidth returns the width of the scroll frame', () => {
  const {component, scrollFrame} = setupTest();

  assert.equal(component.getDefaultFoundation().adapter_.computedScrollFrameWidth(), scrollFrame.offsetWidth);
});

test('adapter#updateScrollTargetToTabAtIndex sets scroll target', () => {
  const {component, iterableTabs} = setupTest();
  const tabIndex = 1;

  component.getDefaultFoundation().adapter_.updateScrollTargetToTabAtIndex(tabIndex);
  assert.equal(component.scrollTarget, iterableTabs[tabIndex]);
});

test('adapter#currentTranslateOffset returns the current translateOffset', () => {
  const {component} = setupTest();

  assert.equal(component.getDefaultFoundation().adapter_.currentTranslateOffset(), component.currentTranslateOffset);
});

test('adapter#scrollToTab scrolls to the current scroll target', () => {
  const {component, iterableTabs} = setupTest();
  const raf = createMockRaf();

  component.getDefaultFoundation().adapter_.updateScrollTargetToTabAtIndex(1);
  component.getDefaultFoundation().adapter_.scrollToTab();
  raf.flush();

  assert.equal(component.currentTranslateOffset, iterableTabs[1].offsetLeft);
  raf.restore();
});

test('adapter#setFocusedTarget sets currentFocusedTarget to a given target', () => {
  const {component, iterableTabs} = setupTest();

  component.getDefaultFoundation().adapter_.setFocusedTarget(iterableTabs[1]);
  assert.equal(component.currentFocusedTarget, iterableTabs[1]);
});

test('adapter#focusedTarget returns the currently focused target', () => {
  const {component, iterableTabs} = setupTest();

  component.getDefaultFoundation().adapter_.setFocusedTarget(iterableTabs[1]);
  assert.equal(component.getDefaultFoundation().adapter_.focusedTarget(), iterableTabs[1]);
});

test('adapter#focusedTargetComputedWidth returns width of focused target', () => {
  const {component, iterableTabs} = setupTest();

  component.getDefaultFoundation().adapter_.setFocusedTarget(iterableTabs[1]);
  assert.equal(component.getDefaultFoundation().adapter_.focusedTargetComputedWidth(), iterableTabs[1].offsetWidth);
});

test('adapter#focusedTargetComputedLeft returns left offset of focused target', () => {
  const {component, iterableTabs} = setupTest();

  component.getDefaultFoundation().adapter_.setFocusedTarget(iterableTabs[1]);
  assert.equal(component.getDefaultFoundation().adapter_.focusedTargetComputedLeft(), iterableTabs[1].offsetLeft);
});
