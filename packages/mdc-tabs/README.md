# MDC Tab Bar

The MDC Tab Bar component is a spec-aligned tabbed navigation component adhering to the
[Material Design tabs guidelines](https://material.io/guidelines/components/tabs.html).

## Installation

```
npm install --save @material/tab-bar
```

## Tab Bar usage

Tab Bar allow users to explore and switch between different views.
MDC-Tab-Bar can be used as a CSS only component, or a more dynamic JavaScript
component.

There are also three different permutations of tab labels. These include text,
icon-only, and text with icon. An example of each is available on the demo site.

#### Tab Bar with text labels
```html
<nav id="basic-tab-bar" class="mdc-tab-bar">
  <a class="mdc-tab mdc-tab--active" href="#one">Home</a>
  <a class="mdc-tab" href="#two">Merchandise</a>
  <a class="mdc-tab" href="#three">About Us</a>
  <span class="mdc-tab-bar__indicator"></span>
</nav>
```

#### Tab Bar with icon labels
```html
<nav class="mdc-tab-bar mdc-tab-bar--icon-tab-bar">
  <a class="mdc-tab mdc-tab--active" href="#recents">
    <i class="material-icons mdc-tab__icon" aria-label="Recents">phone</i>
  </a>
  <a class="mdc-tab" href="#favorites">
    <i class="material-icons mdc-tab__icon" aria-label="Favorites">favorite</i>
  </a>
  <a class="mdc-tab" href="#nearby">
    <i class="material-icons mdc-tab__icon" aria-label="nearby">person_pin</i>
  </a>
  <span class="mdc-tab-bar__indicator"></span>
</nav>
```

#### Tab Bar with icon and text labels
```html
<nav id="icon-text-tab-bar" class="mdc-tab-bar mdc-tab-bar--icons-with-text">
  <a class="mdc-tab mdc-tab--active" href="#recents">
    <i class="material-icons mdc-tab__icon" aria-hidden="true">phone</i>
    <span class="mdc-tab__icon-text">Recents</span>
  </a>
  <a class="mdc-tab" href="#favorites">
    <i class="material-icons mdc-tab__icon" aria-hidden="true">favorite</i>
    <span class="mdc-tab__icon-text">Favorites</span>
  </a>
  <a class="mdc-tab" href="#nearby">
    <i class="material-icons mdc-tab__icon" aria-hidden="true">person_pin</i>
    <span class="mdc-tab__icon-text">Nearby</span>
  </a>
  <span class="mdc-tab-bar__indicator"></span>
</nav>
```

#### RTL Support

Tab Bars will reverse the order of their tabs if they are placed within an
ancestor element with attribute `dir="rtl"`. This applies to all tabs regardless
of type (`tab-bar`, `tab-bar-scroller`).

```html
<html dir="rtl">
  <!--...-->
  <nav id="basic-tab-bar" class="mdc-tab-bar">
    <a class="mdc-tab mdc-tab--active" href="#one">Home</a>
    <a class="mdc-tab" href="#two">Merchandise</a>
    <a class="mdc-tab" href="#three">About Us</a>
    <span class="mdc-tab-bar__indicator"></span>
  </nav>
</html>
```

#### Dark Mode Support

Like other MDC-Web components, tabs support dark mode either when an
`mdc-tab--theme-dark` class is attached to the root element, or the element has
an ancestor with class `mdc-theme--dark`.

```html
<html class="mdc-theme--dark">
  <!-- ... -->
  <nav id="basic-tab-bar" class="mdc-tab-bar">
    <a class="mdc-tab mdc-tab--active" href="#one">Home</a>
    <a class="mdc-tab" href="#two">Merchandise</a>
    <a class="mdc-tab" href="#three">About Us</a>
    <span class="mdc-tab-bar__indicator"></span>
  </nav>
</html>
```


### Dynamic view switching

While facilitating the view switching is left up to the developer, the demo site
provides a minimal example of how to do so using JavaScript, also shown below.

#### Markup:
```html
<section id="dynamic-demo-toolbar">  
  <nav id="dynamic-tab-bar" class="mdc-tab-bar mdc-tab-bar--indicator-accent" role="tablist">
    <a role="tab" aria-controls="panel-1"
       class="mdc-tab mdc-tab--active" href="#panel-1">Item One</a>
    <a role="tab" aria-controls="panel-2"
       class="mdc-tab" href="#panel-2">Item Two</a>
    <a role="tab" aria-controls="panel-3"
       class="mdc-tab" href="#panel-3">Item Three</a>
    <span class="mdc-tab-bar__indicator"></span>
  </nav>
</section>
<section>
  <div class="panels">
    <p class="panel active" id="panel-1" role="tabpanel" aria-hidden="false">Item One</p>
    <p class="panel" id="panel-2" role="tabpanel" aria-hidden="true">Item Two</p>
    <p class="panel" id="panel-3" role="tabpanel" aria-hidden="true">Item Three</p>
  </div>
  <div class="dots">
    <a class="dot active" data-trigger="panel-1" href="#panel-1"></a>
    <a class="dot" data-trigger="panel-2" href="#panel-2"></a>
    <a class="dot" data-trigger="panel-3" href="#panel-3"></a>
  </div>
</section>
```

#### Script:
```js
var dynamicTabBar = window.dynamicTabBar = new mdc.tabBar.MDCTabBar(document.querySelector('#dynamic-tab-bar'));
var dots = document.querySelector('.dots');
var panels = document.querySelector('.panels');

dynamicTabBar.preventDefaultOnClick = true;

function updateDot(index) {
  var activeDot = dots.querySelector('.dot.active');
  if (activeDot) {
    activeDot.classList.remove('active');
  }
  var newActiveDot = dots.querySelector('.dot:nth-child(' + (index + 1) + ')');
  if (newActiveDot) {
    newActiveDot.classList.add('active');
  }
}

function updatePanel(index) {
  var activePanel = panels.querySelector('.panel.active');
  if (activePanel) {
    activePanel.classList.remove('active');
  }
  var newActivePanel = panels.querySelector('.panel:nth-child(' + (index + 1) + ')');
  if (newActivePanel) {
    newActivePanel.classList.add('active');
  }
}

dynamicTabs.root_.addEventListener('MDCTabBar:change', function ({detail: tabs}) {
  var nthChildIndex = tabs.activeTabIndex;

  updatePanel(nthChildIndex);
  updateDot(nthChildIndex);
});

dots.addEventListener('click', function (evt) {
  if (!evt.target.classList.contains('dot')) {
    return;
  }

  evt.preventDefault();

  var dotIndex = [].slice.call(dots.querySelectorAll('.dot')).indexOf(evt.target);

  if (dotIndex >= 0) {
    dynamicTabBar.foundation_.switchToTabAtIndex(dotIndex, false);
  }
  updatePanel(dotIndex);
  updateDot(dotIndex);
})
```

### Using the CSS-Only Component

`mdc-tab-bar` ships with css for styling a tab layout according to the Material
Design spec. To use CSS only tab bars, simply use the available class names.
Note the available `mdc-tab--active` modifier class. This is used to denote the
currently active tab.

```html
<nav class="mdc-tab-bar">
  <a class="mdc-tab mdc-tab--active" href="#one">Item One</a>
  <a class="mdc-tab" href="#two">Item Two</a>
  <a class="mdc-tab" href="#three">Three</a>
  <span class="mdc-tab-bar__indicator"></span>
</nav>
```

### Using the JavaScript Component

`mdc-tab-bar` ships with a Component / Foundation combo for `mdc-tab` (a tab),
`mdc-tab-bar`(a collection components of type MDC-Tab), and
`mdc-tab-bar-scroller` (provides a set of controls to horizontally scroll
through tabs that have overflowed their available width).

#### Including in code

##### ES2015

```javascript
import {MDCTab, MDCTabFoundation} from 'mdc-tab';
import {MDCTabBar, MDCTabBarFoundation} from 'mdc-tab-bar';
import {MDCTabBarScroller, MDCTabBarScrollerFoundation} from 'mdc-tab-bar-scroller';
```

##### CommonJS

```javascript
const mdcTab = require('mdc-tabs/tab');
const MDCTab = mdcTab.MDCTab;
const MDCTabFoundation = mdcTab.MDCTabFoundation;

const mdcTabBar = require('mdc-tabs/tab-bar');
const MDCTabBar = mdcTabBar.MDCTabBar;
const MDCTabBarFoundation = mdcTabBar.MDCTabBarFoundation;

const mdcTabBarScroller = require('mdc-tabs/tab-bar-scroller');
const MDCTabBarScroller = mdcTabBarScroller.MDCTabBarScroller;
const MDCTabBarScrollerFoundation = mdcTabBarScroller.MDCTabBarScrollerFoundation;
```

##### AMD

```javascript
require(['path/to/mdc-tabs/tab'], mdcTab => {
  const MDCTab = mdcTab.MDCTab;
  const MDCTabFoundation = mdcTab.MDCTabFoundation;
});

require(['path/to/mdc-tabs/tab-bar'], mdcTabBar => {
  const MDCTabBar = mdcTabBar.MDCTabBar;
  const MDCTabBarFoundation = mdcTabBar.MDCTabBarFoundation;
});

require(['path/to/mdc-tabs/tab-bar-scroller'], mdcTabBarScroller => {
  const MDCTabBarScroller = mdcTabBarScroller.MDCTabBarScroller;
  const MDCTabBarScrollerFoundation = mdcTabBarScroller.MDCTabBarScrollerFoundation;
});
```

##### Global

```javascript
const MDCTab = mdc.tabs.MDCTab;
const MDCTabFoundation = mdc.tab.MDCTabFoundation;

const MDCTabBar = mdc.tabBar.MDCTabBar;
const MDCTabBarFoundation = mdc.tabBar.MDCTabBarFoundation;

const MDCTabBarScroller = mdc.tabBar.MDCTabBarScroller;
const MDCTabBarScrollerFoundation = mdc.tabBarScroller.MDCTabBarScrollerFoundation;
```

#### Automatic Instantiation

If you do not care about retaining the component instance for the tabs, simply
call `attachTo()` and pass it a DOM element.

```javascript
mdc.tabBar.MDCTabBar.attachTo(document.querySelector('#my-mdc-tab-bar'));
```

#### Manual Instantiation

Tabs can easily be initialized using their default constructors as well, similar
to `attachTo`. This process involves a factory to create an instance of MDCTab
from each tab Element inside of the `mdc-tab-bar` node, e.g.:

```html
<nav id="my-mdc-tab-bar" class="mdc-tab-bar">
  <a class="mdc-tab mdc-tab--active" href="#one">Item One</a>
  <a class="mdc-tab" href="#two">Item Two</a>
  <a class="mdc-tab" href="#three">Three</a>
  <span class="mdc-tab-bar__indicator"></span>
</nav>
```

```javascript
import {MDCTabBar} from 'mdc-tab-bar';

const tabBar = new MDCTabBar(document.querySelector('#my-mdc-tab-bar'));
```

## Tab Section

### Tab component API

#### MDCTab.destroy() => void

Cleans up ripple when tab is destroyed

### Tab Events

#### MDCTab:selected

Broadcast when a user actions on the tab.


### Using the Foundation Class

MDC Tab ships with an `MDCTabFoundation` class that external frameworks and libraries can
use to integrate the component. As with all foundation classes, an adapter object must be provided.

> **NOTE**: Components themselves must manage adding ripples to dialog buttons, should they choose to
do so. We provide instructions on how to add ripples to buttons within the [mdc-button README](https://github.com/material-components/material-components-web/tree/master/packages/mdc-button#adding-ripples-to-buttons).

### Adapter API

| Method Signature | Description |
| --- | --- |
| `addClass(className: string) => void` | Adds a class to the root element. |
| `removeClass(className: string) => void` | Removes a class from the root element. |
| `registerInteractionHandler(evt: string, handler: EventListener) => void` | Adds an event listener to the root element, for the specified event name. |
| `deregisterInteractionHandler(evt: string, handler: EventListener) => void` | Removes an event listener from the root element, for the specified event name. |
| `getOffsetWidth() => number` | Return the width of the tab |
| `getOffsetLeft() => number` | Return distance between left edge of tab and left edge of its parent element |
| `notifySelected() => {}` | Broadcasts an event denoting that the user has actioned on the tab |


### The full foundation API

#### MDCTabFoundation.getComputedWidth() => number

Return computed width for tab

#### MDCTabFoundation.getComputedLeft() => number

Return computed left offset for tab

#### MDCTabFoundation.isActive() => boolean

Return true if tab is active

#### MDCTabFoundation.setActive(isActive = false) => void

Set tab to active. If `isActive` is true, adds the active modifier class, otherwise removes it.

#### MDCTabFoundation.preventsDefaultOnClick() => boolean

Return true if the tab prevents the default click action

#### MDCTabFoundation.setPreventDefaultOnClick(preventDefaultOnClick = false) => void

Sets tabs `preventDefaultOnClick` property to the value of the `preventDefaultOnClick` argument passed.

#### MDCTabFoundation.measureSelf() => void

Sets `computedWidth_` and `computedLeft_` for a tab.


## Tab Bar Section

### Tab Bar component API

#### MDCTabBar.initialize() => void

Gathers instances of MDC Tab.

#### MDCTabBar.initialSyncWithDOM() => void

Syncs with tab selected in DOM

### Tab Bar Events

#### MDCTabBar:change

Broadcast when a user actions on a tab, causing a change in selected tab.


### Using the Foundation Class

MDC Tab Bar ships with an `MDCTabBarFoundation` class that external frameworks
and libraries can use to integrate the component. As with all foundation
classes, an adapter object must be provided.


### Adapter API

| Method Signature | Description |
| --- | --- |
| `addClass(className: string) => void` | Adds a class to the root element. |
| `removeClass(className: string) => void` | Removes a class from the root element. |
| `bindOnMDCTabSelectedEvent() => void` | Adds `MDCTab:selected` event listener to root |
| `unbindOnMDCTabSelectedEvent() => void` | Removes `MDCTab:selected` event listener from root |
| `registerResizeHandler(handler: EventListener) => void` | Adds an event listener to the root element, for a resize event. |
| `deregisterResizeHandler(handler: EventListener) => void` | Removes an event listener from the root element, for a resize event. |
| `getOffsetWidth() => number` | Returns width of root element. |
| `setStyleForIndicator(propertyName: string, value: string) => void` | Sets style property for indicator. |
| `getOffsetWidthForIndicator() => number` | Returns width of indicator. |
| `notifyChange(evtData: Object) => void` | Emits `MDCTabBar:change` event, passes evtData. |
| `getNumberOfTabs() => number` | Returns number of tabs in MDC Tabs instance. |
| `getActiveTab() => MDCTab` | Returns the instance of MDCTab that is currently active. |
| `isTabActiveAtIndex(index: number) => boolean` | Returns true if tab at index is active. |
| `setTabActiveAtIndex(index: number) => void` | Sets tab active at given index. |
| `isDefaultPreventedOnClickForTabAtIndex(index: number) => boolean` | Returns true if tab does not prevent default click action. |
| `setPreventDefaultOnClickForTabAtIndex(index: number, preventDefaultOnClick: boolean)` | Sets preventDefaultOnClick for tab at given index |
| `measureTabAtIndex(index: number) => void` | sets measurements (width, left offset) for tab at given index. |
| `getComputedWidthForTabAtIndex(index: number) => number` | Returns width of tab at given index. |
| `getComputedLeftForTabAtIndex(index: number) => number` | Returns left offset of tab at given index. |


### The full foundation API

#### MDCTabBarFoundation.layout() => void

Sets layout for the Tab Bar component.

#### MDCTabBarFoundation.getActiveTabIndex() => number

Returns index of currently active tab

#### MDCTabBarFoundation.getComputedWidth() => number

Returns the width of the element containing the tabs.

#### MDCTabBarFoundation.switchToTabAtIndex(index, shouldNotify) => void

Updates the active tab to be the tab at the given index, emits `MDCTabBar:change` if `shouldNotify` is true.


## Tab Bar Scroller Section

### Tab Bar Scroller component API

#### MDCTabBarScroller.initialize() => void

Sets data regarding which instance of MDC Tab Bar will be scrollable.

### Using the Foundation Class

MDC Tab Bar Scroller ships with an `MDCTabBarScrollerFoundation` class that
external frameworks and libraries can use to integrate the component. As with
all foundation classes, an adapter object must be provided.


### Adapter API

| Method Signature | Description |
| --- | --- |
| `isRTL() => boolean` | Returns true if the component exists within an RTL context. |
| `registerLeftIndicatorInteractionHandler(handler: EventHandler) => void` | Registers an event listener on the shift left indicator. |
| `deregisterLeftIndicatorInteractionHandler(handler: EventHandler) => void` | Deregisters an event listener from the shift left indicator. |
| `registerRightIndicatorInteractionHandler(handler: EventHandler) => void` | Registers an event listener on the shift right indicator. |
| `deregisterRightIndicatorInteractionHandler(handler: EventHandler) => void` | Deregisters an event listener from the shift right indicator. |
| `registerFocusInteractionHandler(handler: EventHandler) => void` | Registers a focus event listener on the component. |
| `deregisterFocusInteractionHandler(handler: EventHandler) => void` | Deregisters a focus event event listener from the component. |
| `registerWindowResizeHandler(handler) => void` | Registers an `resize` event listener on the `window` |
| `deregisterWindowResizeHandler(handler) => void` | Deregisters an `resize` event listener from the `window` |
| `triggerNewLayout() => void` | Triggers a new layout render |
| `numberOfTabs() => number` | Returns the number of tabs in the tab bar |
| `rtlNormalizedOffsetLeftForTabAtIndex(index: number) => number` | Returns an RTL normalized offsetLeft for a tab at a given index |
| `rtlNormalizedOffsetLeftForFocusedTarget(target: Element) => number` | Returns an RTL normalized offsetLeft for a given tab. |
| `computedWidthForTabAtIndex(index: number) => number` | Returns the width for a tab at a given index. |
| `computedLeftForTabAtIndex(index: number) => number` | Returns the left offset for a tab at a given index. |
| `computedScrollFrameWidth() => number` | Returns the width of the scroll frame. |
| `updateScrollTargetToTabAtIndex(index: number) => void` | Sets the scroll target to a tab at the given index. |
| `currentTranslateOffset() => number` | Returns the current translate offset, e.g.: how far the tabs are currently scrolled. |
| `scrollToTab() => void` | Scrolls tabs such that the `currentScrollTarget` becomes the left most tab. |
| `setFocusedTarget(target: Element) => void` | Sets the `currentFocusedTarget` to be the currently focused tab. |
| `focusedTarget() => Element` | Returns the currently focused tab. |
| `focusedTargetComputedWidth() => number` | Returns the width of the currently focused tab. |
| `focusedTargetComputedLeft() => number` | Returns the left offset of the currently focused tab. |


### The full foundation API

#### MDCTabBarScrollerFoundation.scrollBack() => void

Scrolls the tabs such that the tab which was previously cut off on the _back_ side of the scroll frame is fully visible.

#### MDCTabBarScrollerFoundation.scrollForward() => void

Scrolls the tabs such that the tab which was previously cut off on the _forward_ side of the scroll frame is fully visible.

#### MDCTabBarScrollerFoundation.isRTL() => boolean

Returns the true if the component exists within an RTL context. False otherwise.
