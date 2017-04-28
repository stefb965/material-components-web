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
 * See the License for the specific language governing permissions and * limitations under the License.
 */

import {assert} from 'chai';
import td from 'testdouble';

import {setupFoundationTest} from '../helpers/setup';
import {verifyDefaultAdapter} from '../helpers/foundation';

import MDCTabBarScrollerFoundation from '../../../packages/mdc-tabs/tab-bar-scroller/foundation';

suite('MDCTabBarScrollerFoundation');

test('exports cssClasses', () => {
  assert.isOk('cssClasses' in MDCTabBarScrollerFoundation);
});

test('default adapter returns a complete adapter implementation', () => {
  verifyDefaultAdapter(MDCTabBarScrollerFoundation, [
    'isRTL', 'registerBackIndicatorInteractionHandler',
    'deregisterBackIndicatorInteractionHandler',
    'registerForwardIndicatorInteractionHandler',
    'deregisterForwardIndicatorInteractionHandler',
    'registerFocusInteractionHandler', 'deregisterFocusInteractionHandler',
    'registerWindowResizeHandler', 'deregisterWindowResizeHandler',
    'triggerNewLayout', 'numberOfTabs', 'rtlNormalizedOffsetLeftForTabAtIndex',
    'rtlNormalizedOffsetLeftForFocusedTarget', 'computedWidthForTabAtIndex',
    'computedLeftForTabAtIndex', 'computedScrollFrameWidth',
    'updateScrollTargetToTabAtIndex', 'currentTranslateOffset', 'scrollToTab',
    'setFocusedTarget', 'focusedTarget', 'focusedTargetComputedWidth',
    'focusedTargetComputedLeft',
  ]);
});

function setupTest() {
  const {foundation, mockAdapter} = setupFoundationTest(MDCTabBarScrollerFoundation);
  const {FRAME_SELECTOR, TABS_SELECTOR, INDICATOR_FORWARD_SELECTOR,
    INDICATOR_BACK_SELECTOR} = MDCTabBarScrollerFoundation.strings;

  return {foundation, mockAdapter, FRAME_SELECTOR, TABS_SELECTOR,
    INDICATOR_FORWARD_SELECTOR, INDICATOR_BACK_SELECTOR};
}

test('#init registers interaction and resize handlers', () => {
  const {foundation, mockAdapter} = setupTest();
  const {isA} = td.matchers;

  foundation.init();

  td.verify(mockAdapter.registerBackIndicatorInteractionHandler(isA(Function)));
  td.verify(mockAdapter.registerForwardIndicatorInteractionHandler(isA(Function)));
  td.verify(mockAdapter.registerWindowResizeHandler(isA(Function)));
  td.verify(mockAdapter.registerFocusInteractionHandler(isA(Function)));
});

test('#destroy deregisters interaction and resize handlers', () => {
  const {foundation, mockAdapter} = setupTest();
  const {isA} = td.matchers;

  foundation.destroy();

  td.verify(mockAdapter.deregisterBackIndicatorInteractionHandler(isA(Function)));
  td.verify(mockAdapter.deregisterForwardIndicatorInteractionHandler(isA(Function)));
  td.verify(mockAdapter.deregisterWindowResizeHandler(isA(Function)));
  td.verify(mockAdapter.deregisterFocusInteractionHandler(isA(Function)));
});

// // TODO: sheehana test scrollBack, scrollForward
// if (supportsCssVariables(window)) {
//   test.only('#scrollBack decreases translateX of tab group', () => {
//     const {component, scrollFrame} = setupTest();
//     const rtlContext = false;
//     const raf = createMockRaf();
//
//     scrollFrame.style.width = '40px';
//     component.getDefaultFoundation().adapter_.triggerNewLayout();
//     raf.flush();
//
//     component.getDefaultFoundation().adapter_.scrollForward(rtlContext);
//     raf.flush();
//
//     assert.isTrue(component.tabs.style.webkitTransform === 'translateX(0px)');
//     raf.restore();
//
//     component.getDefaultFoundation().adapter_.scrollBack(rtlContext);
//     raf.flush();
//
//     assert.isTrue(component.tabs.style.webkitTransform === 'translateX(0px)');
//     raf.restore();
//   });
//
//   test('#scrollForward increases translateX of tab group', () => {
//     const {component} = setupTest();
//     const rtlContext = false;
//     const raf = createMockRaf();
//
//     component.getDefaultFoundation().adapter_.scrollForward(rtlContext);
//     raf.flush();
//
//     assert.isTrue(component.tabs.style.webkitTransform === 'translateX(0px)');
//     raf.restore();
//   });
// }
