# MDC Tabs

The MDC Tabs component is a spec-aligned tabbed navigation component adhering to the
[Material Design tabs guidelines](https://material.io/guidelines/components/tabs.html).

## Installation

```
npm install --save @material/tabs
```

## Tabs usage

Tabs allow users to explore and switch between different views.
MDC-Tabs can be used as a CSS only component, or a more dynamic JavaScript component.
There are three different permutations of tab content. These include text, icon-only, and text with icon. An example of each is available on the demo site.

#### Text Tabs
```html
<nav id="basic-tabs" class="mdc-tabs">
  <a class="mdc-tab mdc-tab--active" href="#one">Home</a>
  <a class="mdc-tab" href="#two">Merchandise</a>
  <a class="mdc-tab" href="#three">About Us</a>
  <span class="mdc-tabs__indicator"></span>
</nav>
```

#### Icon Tabs
```html
<nav class="mdc-tabs mdc-tabs--icon-tabs">
  <a class="mdc-tab mdc-tab--active" href="#recents">
    <i class="material-icons mdc-tab__icon" aria-label="Recents">phone</i>
  </a>
  <a class="mdc-tab" href="#favorites">
    <i class="material-icons mdc-tab__icon" aria-label="Favorites">favorite</i>
  </a>
  <a class="mdc-tab" href="#nearby">
    <i class="material-icons mdc-tab__icon" aria-label="nearby">person_pin</i>
  </a>
  <span class="mdc-tabs__indicator"></span>
</nav>
```

#### Text + Icon Tabs
```html
<nav id="icon-text-tabs" class="mdc-tabs mdc-tabs--icons-with-text">
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
  <span class="mdc-tabs__indicator"></span>
</nav>
```

#### RTL Support

Tabs will reverse their order if they are placed within an ancestor element containing a dir attribute with value "rtl". This applies to all tabs regardless of type.

```html
<html dir="rtl">
  <!--...-->
  <nav id="basic-tabs" class="mdc-tabs">
    <a class="mdc-tab mdc-tab--active" href="#one">Home</a>
    <a class="mdc-tab" href="#two">Merchandise</a>
    <a class="mdc-tab" href="#three">About Us</a>
    <span class="mdc-tabs__indicator"></span>
  </nav>
</html>
```

#### Dark Mode Support

Like other MDC-Web components, tabs support dark mode either when an mdc-tab--theme-dark class is attached to the root element, or the element has an ancestor with class mdc-theme--dark.

```html
<html class="mdc-theme--dark">
  <!-- ... -->
  <nav id="basic-tabs" class="mdc-tabs">
    <a class="mdc-tab mdc-tab--active" href="#one">Home</a>
    <a class="mdc-tab" href="#two">Merchandise</a>
    <a class="mdc-tab" href="#three">About Us</a>
    <span class="mdc-tabs__indicator"></span>
  </nav>
</html>
```


### Dynamic view switching

While facilitating the view switching is left up to the developer, the demo site provides a minimal example of how to do so using JavaScript, also shown below.

#### Markup:
```html
<section id="dynamic-demo-toolbar">  
  <nav id="dynamic-tabs" class="mdc-tabs mdc-tabs--indicator-accent" role="tablist">
    <a role="tab" aria-controls="panel-1"
       class="mdc-tab mdc-tab--active" href="#panel-1">Item One</a>
    <a role="tab" aria-controls="panel-2"
       class="mdc-tab" href="#panel-2">Item Two</a>
    <a role="tab" aria-controls="panel-3"
       class="mdc-tab" href="#panel-3">Item Three</a>
    <span class="mdc-tabs__indicator"></span>
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
var dynamicTabs = window.dynamicTabs = new mdc.tabs.MDCTabs(document.querySelector('#dynamic-tabs'));
var dots = document.querySelector('.dots');
var panels = document.querySelector('.panels');

dynamicTabs.preventDefaultOnClick = true;

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

dynamicTabs.root_.addEventListener('MDCTabs:change', function ({detail: tabs}) {
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
    dynamicTabs.foundation_.switchToTabAtIndex(dotIndex, false);
  }
  updatePanel(dotIndex);
  updateDot(dotIndex);
})
```

### Using the CSS-Only Component

`mdc-tabs` ships with css for styling a tabs layout according to the Material Design spec.
To use CSS only tabs, simply use the available class names. Note the available `mdc-tab--active` modifier class.
This is used to denote the currently active tab.

```html
<nav class="mdc-tabs">
  <a class="mdc-tab mdc-tab--active" href="#one">Item One</a>
  <a class="mdc-tab" href="#two">Item Two</a>
  <a class="mdc-tab" href="#three">Three</a>
  <span class="mdc-tabs__indicator"></span>
</nav>
```

### Using the JavaScript Component

`mdc-tabs` ships with a Component / Foundation combo for `mdc-tab` (a tab), `mdc-tabs`
(a collection of type MDC-Tab), and `mdc-tabs-scroller` (used when one or more tabs in
`mdc-tabs` overflows the available width).

#### Including in code

##### ES2015

```javascript
import {MDCTab, MDCTabFoundation} from 'mdc-tab';
import {MDCTabs, MDCTabsFoundation} from 'mdc-tabs';
import {MDCTabsScroller, MDCTabsScrollerFoundation} from 'mdc-tabs-scroller';
```

##### CommonJS

```javascript
const mdcTab = require('mdc-tabs/tab');
const MDCTab = mdcTab.MDCTab;
const MDCTabFoundation = mdcTab.MDCTabFoundation;

const mdcTabs = require('mdc-tabs/tabs');
const MDCTabs = mdcTabs.MDCTabs;
const MDCTabsFoundation = mdcTabs.MDCTabsFoundation;

const mdcTabsScroller = require('mdc-tabs/tabs-scroller');
const MDCTabsScroller = mdcTabsScroller.MDCTabsScroller;
const MDCTabsScrollerFoundation = mdcTab.MDCTabsScrollerFoundation;
```

##### AMD

```javascript
require(['path/to/mdc-tabs/tab'], mdcTab => {
  const MDCTab = mdcTab.MDCTab;
  const MDCTabFoundation = mdcTab.MDCTabFoundation;
});

require(['path/to/mdc-tabs/tabs'], mdcTabs => {
  const MDCTabs = mdcTabs.MDCTabs;
  const MDCTabsFoundation = mdcTabs.MDCTabsFoundation;
});

require(['path/to/mdc-tabs/tabs-scroller'], mdcTabsScroller => {
  const MDCTabsScroller = mdcTabsScroller.MDCTabsScroller;
  const MDCTabsScrollerFoundation = mdcTabsScroller.MDCTabsScrollerFoundation;
});
```

##### Global

```javascript
const MDCTab = mdc.tabs.MDCTab;
const MDCTabFoundation = mdc.tab.MDCTabFoundation;

const MDCTabs = mdc.tabs.MDCTabs;
const MDCTabsFoundation = mdc.tabs.MDCTabsFoundation;

const MDCTabsScroller = mdc.tabs.MDCTabsScroller;
const MDCTabsScrollerFoundation = mdc.tabsScroller.MDCTabsScrollerFoundation;
```

#### Automatic Instantiation

If you do not care about retaining the component instance for the tabs, simply call `attachTo()`
and pass it a DOM element.

```javascript
mdc.tabs.MDCTabs.attachTo(document.querySelector('#my-mdc-tabs'));
```

#### Manual Instantiation

Tabs can easily be initialized using their default constructors as well, similar to `attachTo`. This process involves a factory to create an instance of MDCTab from each tab Element inside of the `mdc-tabs` node, e.g.:

```html
<nav id="my-mdc-tabs" class="mdc-tabs">
  <a class="mdc-tab mdc-tab--active" href="#one">Item One</a>
  <a class="mdc-tab" href="#two">Item Two</a>
  <a class="mdc-tab" href="#three">Three</a>
  <span class="mdc-tabs__indicator"></span>
</nav>
```

```javascript
import {MDCTabs} from 'mdc-tabs';

const tabs = new MDCTabs(document.querySelector('#my-mdc-tabs'));
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


## Tabs Section

### Tabs component API

#### MDCTabs.initialize() => void

Gathers instances of MDC Tab.

#### MDCTabs.initialSyncWithDOM() => void

Syncs with tab selected in DOM

### Tabs Events

#### MDCTabs:change

Broadcast when a user actions on the tabs, causing a change in selected tab.


### Using the Foundation Class

MDC Tabs ships with an `MDCTabsFoundation` class that external frameworks and libraries can
use to integrate the component. As with all foundation classes, an adapter object must be provided.


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
| `notifyChange(evtData: Object) => void` | Emits `MDCTabs:change` event, passes evtData. |
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

#### MDCTabsFoundation.layout() => void

Sets layout for Tabs component.

#### MDCTabFoundation.getActiveTabIndex() => number

Returns index of currently active tab

#### MDCTabFoundation.getComputedWidth() => number

Returns the width of the element containing the tabs.

#### MDCTabFoundation.switchToTabAtIndex(index, shouldNotify) => void

Updates the active tab to be the tab at the given index, emits `MDCTabs:change` if `shouldNotify` is true.


## Tabs Scroller Section

### Tabs Scroller component API

#### MDCTabsScroller.initialize() => void

initializes instance of MDC Tabs to be used.

#### MDCTabs.layout() => void

Lays out left and right indicators, prepares logic for shifting tabs in the scroll frame.

#### MDCTabs.scrollLeft() => void

Scrolls tabs left. If clicked, tabs will shift to the left, revealing tabs previously overflowed to the right.
This reverses if tabs are in an RTL context.

#### MDCTabs.scrollRight() => void

Scrolls tabs right. If clicked, tabs will shift to the right, revealing tabs previously overflowed to the left.
This reverses if tabs are in an RTL context.

#### MDCTabs.scrollToTab(tab: MDCTab) => void

Shifts to a given tab.


### Using the Foundation Class

MDC Tabs Scroller ships with an `MDCTabsScrollerFoundation` class that external frameworks and libraries can
use to integrate the component. As with all foundation classes, an adapter object must be provided.


### Adapter API

| Method Signature | Description |
| --- | --- |
| `isRTL() => boolean` | Returns true if the component exists within an RTL context. |
| `registerLeftIndicatorInteractionHandler(handler: EventHandler) => void` | Registers an event listener on the shift left indicator. |
| `deregisterLeftIndicatorInteractionHandler(handler: EventHandler) => void` | Deregisters an event listener from the shift left indicator. |
| `registerRightIndicatorInteractionHandler(handler: EventHandler) => void` | Registers an event listener on the shift right indicator. |
| `deregisterRightIndicatorInteractionHandler(handler: EventHandler) => void` | Deregisters an event listener from the shift right indicator. |
| `registerWindowResizeHandler(handler) => void` | Registers an `resize` event listener on the `window` |
| `deregisterWindowResizeHandler(handler) => void` | Deregisters an `resize` event listener from the `window` |
| `triggerNewLayout() => void` | Triggers a new layout render |
| `scrollLeft(isRTL: boolean) => void` | Scrolls left if isRTL is false. Scrolls right otherwise |
| `scrollRight(isRTL: boolean) => void` | Scrolls right if isRTL is false. Scrolls left otherwise |


### The full foundation API

#### MDCTabsFoundation.scrollRight(isRTL) => void

Calls the adapters `scrollRight()` method and passes RTL context as an argument.

#### MDCTabsFoundation.scrollLeft(isRTL) => void

Calls the adapters `scrollLeft()` method and passes RTL context as an argument.
