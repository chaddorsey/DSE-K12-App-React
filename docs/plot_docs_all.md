
# docs/api.md

<script setup>

import {data} from "./data/api.data";

</script>

# API index

## Methods

<ul :class="$style.oneline">
  <li v-for="({name, href, comment}) in data.methods">
    <span><a :href="`${href}#${name}`">{{ name }}</a> - {{ comment }}</span>
  </li>
</ul>

## Options

<ul>
  <li v-for="[name, contexts] in data.options">
    <b>{{ name }}</b> - <span v-for="({name: context, href}, index) in contexts"><a :href="href">{{ context }}</a><span v-if="index < contexts.length - 1">, </span></span>
  </li>
</ul>

<style module>

ul.oneline span {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>

# docs/community.md

# Community 🏠 {#community}

Learning Plot? Love data visualization? Don’t go it alone! Join our community to get help, be inspired, and do the same for others.

## Staying up-to-date

:::tip
Please star ⭐️ our [GitHub repo](https://github.com/observablehq/plot) to show your support for us on GitHub!
:::

Plot is getting better all the time; catch up on [recent releases](https://github.com/observablehq/plot/releases) by reading our [CHANGELOG](https://github.com/observablehq/plot/blob/main/CHANGELOG.md).

And of course, follow us on [Observable](https://observablehq.com/@observablehq?tab=profile), [Mastodon](https://vis.social/@observablehq), [Twitter](https://twitter.com/observablehq), and [LinkedIn](https://www.linkedin.com/company/observable)!

## Getting help

We recommend asking for help on [GitHub discussions](https://github.com/observablehq/plot/discussions).

We encourage you to share your work, no matter how messy, on [Observable](https://observablehq.com). Sharing live code is the easiest way to let people see what you see, and to debug your problem. Strive for a [minimal, reproducible example](https://stackoverflow.com/help/minimal-reproducible-example) — it helps people hone in on your problem more quickly.

When asking for help, don’t just post your code and ask people to fix it. Provide context, and say what you want help with. For example:

- What are you trying to achieve? What is your goal?
- What other solutions have you tried?
- What behavior are you currently seeing?
- Is the current behavior not what you expect?

If you think you’ve found a bug in Plot, please file a [GitHub issue](https://github.com/observablehq/plot/issues). But don’t use an issue to ask for help — you’ll have better luck on the forum or Slack.

## Getting involved

We’d love for you to join the community! Here are some ways to participate:

* Share your work on [Observable](https://observablehq.com). Working in public is a great way to help others learn and be inspired. Don’t worry if your code is messy or unfinished; sharing drafts normalizes the challenges that everyone experiences doing data visualization.

* Upvote 👍 or comment on [GitHub issues](https://github.com/observablehq/plot/issues). We’d love your input on what to build next. If your desired feature isn’t already there, or if you’ve found a bug, file an issue and tell us about it.

* Answer questions or participate in discussions on [GitHub](https://github.com/observablehq/plot/discussions). You’ll help others, and might learn something yourself, too.

* Join the [Observable community Slack](https://observablehq.com/slack/join) to meet others using Plot.

* Open a pull request! Read our [guide to contributing](https://github.com/observablehq/plot/blob/main/CONTRIBUTING.md).

Please help us maintain a positive environment for all by adhering to our [code of conduct](https://github.com/observablehq/.github/blob/master/CODE_OF_CONDUCT.md). Thank you!

# docs/features/accessibility.md

# Accessibility

Plot uses [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) to make plots more **accessible** through assistive technology such as screen readers, browser add-ons, and browser developer tools.

The [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) and [aria-description](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-description) attributes on the root SVG element can be set via the top-level **ariaLabel** and **ariaDescription** [plot options](./plots.md). These default to null.

[Marks](./marks.md) automatically generate an aria-label attribute on the rendered SVG G element; this attribute includes the mark’s type, such as “dot”. The [axis mark](../marks/axis.md) and [grid mark](../marks/grid.md) also include the associated scale’s name, such as “y-axis tick”, “y-axis label”, or “x-grid”.

Use the **ariaLabel** mark option to apply per-instance aria-label attributes (*e.g.*, on individual dots in a scatterplot), say for a short, human-readable textual representation of each displayed data point. Use the **ariaDescription** mark option for a longer description; this is applied to the mark’s G element. These options both default to null.

Setting the **ariaHidden** mark option to true hides the mark from the accessibility tree. This is useful for decorative or redundant marks (such as rules or lines between dots).

# docs/features/curves.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref} from "vue";

const curve = ref("catmull-rom");
const numbers = d3.range(20).map(d3.randomLcg(42));

</script>

# Curves

A **curve** defines how to turn a discrete representation of a line as a sequence of points [[*x₀*, *y₀*], [*x₁*, *y₁*], [*x₂*, *y₂*], …] into a continuous path; *i.e.*, how to interpolate between points. Curves are used by the [line](../marks/line.md), [area](../marks/area.md), and [link](../marks/link.md) marks, and are implemented by [d3-shape](https://d3js.org/d3-shape/curve).

<p>
  <label class="label-input">
    Curve:
    <select v-model="curve">
      <option>basis</option>
      <option>basis-open</option>
      <option>basis-closed</option>
      <option>bump-x</option>
      <option>bump-y</option>
      <option>bundle</option>
      <option>cardinal</option>
      <option>cardinal-open</option>
      <option>cardinal-closed</option>
      <option>catmull-rom</option>
      <option>catmull-rom-open</option>
      <option>catmull-rom-closed</option>
      <option>linear</option>
      <option>linear-closed</option>
      <option>monotone-x</option>
      <option>monotone-y</option>
      <option>natural</option>
      <option>step</option>
      <option>step-after</option>
      <option>step-before</option>
    </select>
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-curve-option
```js-vue
Plot.plot({
  marks: [
    Plot.lineY(numbers, {curve: "{{curve}}"}),
    Plot.dotY(numbers, {x: (d, i) => i})
  ]
})
```
:::

The supported curve options are:

* **curve** - the curve method, either a string or a function
* **tension** - the curve tension (for fine-tuning)

The following named curve methods are supported:

* *basis* - a cubic basis spline (repeating the end points)
* *basis-open* - an open cubic basis spline
* *basis-closed* - a closed cubic basis spline
* *bump-x* - a Bézier curve with horizontal tangents
* *bump-y* - a Bézier curve with vertical tangents
* *bundle* - a straightened cubic basis spline (suitable for lines only, not areas)
* *cardinal* - a cubic cardinal spline (with one-sided differences at the ends)
* *cardinal-open* - an open cubic cardinal spline
* *cardinal-closed* - an closed cubic cardinal spline
* *catmull-rom* - a cubic Catmull–Rom spline (with one-sided differences at the ends)
* *catmull-rom-open* - an open cubic Catmull–Rom spline
* *catmull-rom-closed* - a closed cubic Catmull–Rom spline
* *linear* - a piecewise linear curve (*i.e.*, straight line segments)
* *linear-closed* - a closed piecewise linear curve (*i.e.*, straight line segments)
* *monotone-x* - a cubic spline that preserves monotonicity in *x*
* *monotone-y* - a cubic spline that preserves monotonicity in *y*
* *natural* - a natural cubic spline
* *step* - a piecewise constant function where *y* changes at the midpoint of *x*
* *step-after* - a piecewise constant function where *y* changes after *x*
* *step-before* - a piecewise constant function where *x* changes after *y*
* *auto* - like *linear*, but use the (possibly spherical) [projection](./projections.md), if any <VersionBadge version="0.6.1" />

If **curve** is a function, it will be invoked with a given *context* in the same fashion as a [D3 curve factory](https://d3js.org/d3-shape/curve#custom-curves). The *auto* curve is only available for the [line mark](../marks/line.md) and [link mark](../marks/link.md) and is typically used in conjunction with a spherical [projection](./projections.md) to interpolate along [geodesics](https://en.wikipedia.org/wiki/Geodesic).

The tension option only has an effect on bundle, cardinal and Catmull–Rom splines (*bundle*, *cardinal*, *cardinal-open*, *cardinal-closed*, *catmull-rom*, *catmull-rom-open*, and *catmull-rom-closed*). For bundle splines, it corresponds to [beta](https://d3js.org/d3-shape/curve#curveBundle_beta); for cardinal splines, [tension](https://d3js.org/d3-shape/curve#curveCardinal_tension); for Catmull–Rom splines, [alpha](https://d3js.org/d3-shape/curve#curveCatmullRom_alpha).

# docs/features/facets.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import anscombe from "../data/anscombe.ts";
import barley from "../data/barley.ts";
import industries from "../data/bls-industry-unemployment.ts";
import penguins from "../data/penguins.ts";

const olympians = shallowRef([
  {weight: 31, height: 1.21, sex: "female"},
  {weight: 170, height: 2.21, sex: "male"}
]);

const scheme = Plot.scale({color: {type: "categorical"}}).range;

onMounted(() => {
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
});

</script>

# Facets

Faceting partitions data by ordinal or categorical value and then repeats a plot for each partition (each **facet**), producing [small multiples](https://en.wikipedia.org/wiki/Small_multiple) for comparison. Faceting is typically enabled by declaring the horizontal↔︎ facet channel **fx**, the vertical↕︎ facet channel **fy**, or both for two-dimensional faceting.

For example, below we recreate the Trellis display (“reminiscent of garden trelliswork”) of [Becker *et al.*](https://hci.stanford.edu/courses/cs448b/papers/becker-trellis-jcgs.pdf) using the dot’s **fy** channel to declare vertical↕︎ facets, showing the yields of several varieties of barley across several sites for the years <span :style="{borderBottom: `solid 2px ${scheme[0]}`}">1931</span> and <span :style="{borderBottom: `solid 2px ${scheme[1]}`}">1932</span>.

:::plot https://observablehq.com/@observablehq/plot-trellis
```js
Plot.plot({
  height: 800,
  marginRight: 90,
  marginLeft: 110,
  grid: true,
  x: {nice: true},
  y: {inset: 5},
  color: {type: "categorical"},
  marks: [
    Plot.frame(),
    Plot.dot(barley, {
      x: "yield",
      y: "variety",
      fy: "site",
      stroke: "year",
      sort: {y: "-x", fy: "-x", reduce: "median"}
    })
  ]
})
```
:::

:::tip
This plot uses the [**sort** mark option](./scales.md#sort-mark-option) to order the *y* and *fy* scale domains by descending median yield (the associated *x* values). Without this option, the domains would be sorted alphabetically.
:::

:::tip
Use the [frame mark](../marks/frame.md) for stronger visual separation of facets.
:::

The chart above reveals a likely data collection error: the years appear to be reversed for the Morris site as it is the only site where the yields in <span :style="{borderBottom: `solid 2px ${scheme[1]}`}">1932</span> were higher than in <span :style="{borderBottom: `solid 2px ${scheme[0]}`}">1931</span>. The anomaly in Morris is more obvious if we use directed arrows to show the year-over-year change. The [group transform](../transforms/group.md) groups the observations by site and variety to compute the change.

:::plot defer https://observablehq.com/@observablehq/plot-trellis-anomaly
```js
Plot.plot({
  height: 800,
  marginLeft: 110,
  grid: true,
  x: {nice: true},
  y: {inset: 5},
  color: {scheme: "spectral", label: "Change in yield", tickFormat: "+f", legend: true},
  facet: {marginRight: 90},
  marks: [
    Plot.frame(),
    Plot.arrow(barley, Plot.groupY({
      x1: "first",
      x2: "last",
      stroke: ([x1, x2]) => x2 - x1 // year-over-year difference
    }, {
      x: "yield",
      y: "variety",
      fy: "site",
      stroke: "yield",
      strokeWidth: 2,
      sort: {y: "-x1", fy: "-x1", reduce: "median"}
    }))
  ]
})
```
:::

:::info
Here the sort order has changed slightly: the *y* and *fy* domains are sorted by the median **x1** values, which are the yields for 1931.
:::

Faceting requires ordinal or categorical data because there are a discrete number of facets; the associated *fx* and *fy* scales are [band scales](./scales.md#discrete-scales). Quantitative or temporal data can be made ordinal by binning, say using [Math.floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor). Or, use the [**interval** scale option](./scales.md#scale-transforms) on the *fx* or *fy* scale. Below, we produce a [box plot](../marks/box.md) of the weights (in kilograms) of Olympic athletes, faceted by height binned at a 10cm (0.1 meter) interval.

:::plot defer https://observablehq.com/@observablehq/plot-olympians-box-plot
```js
Plot.plot({
  fy: {
    grid: true,
    tickFormat: ".1f",
    interval: 0.1, // 10cm
    reverse: true
  },
  marks: [
    Plot.boxX(olympians.filter((d) => d.height), {x: "weight", fy: "height"})
  ]
})
```
:::

:::tip
If you are interested in automatic faceting for quantitative data, please upvote [#14](https://github.com/observablehq/plot/issues/14).
:::

When both **fx** and **fy** channels are specified, two-dimensional faceting results, as in the faceted scatterplot of penguin culmen measurements below. The horizontal↔︎ facet shows sex (with the rightmost column representing penguins whose *sex* field is null, indicating missing data), while the vertical↕︎ facet shows species.

:::plot defer https://observablehq.com/@observablehq/plot-two-dimensional-faceting
```js
Plot.plot({
  grid: true,
  marginRight: 60,
  facet: {label: null},
  marks: [
    Plot.frame(),
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      fx: "sex",
      fy: "species"
    })
  ]
})
```
:::

You can mix-and-match faceted and non-faceted marks within the same plot. The non-faceted marks will be repeated across all facets. This is useful for decoration marks, such as a [frame](../marks/frame.md), and also for context: below, the entire population of penguins is repeated in each facet as small gray dots, making it easier to see how each facet compares to the whole.

:::plot defer https://observablehq.com/@observablehq/plot-non-faceted-marks
```js
Plot.plot({
  grid: true,
  marginRight: 60,
  facet: {label: null},
  marks: [
    Plot.frame(),
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      fill: "#aaa",
      r: 1
    }),
    Plot.dot(penguins, {
      x: "culmen_length_mm",
      y: "culmen_depth_mm",
      fx: "sex",
      fy: "species"
    })
  ]
})
```
:::

:::tip
Set the [**facet** mark option](#mark-facet-options) to *exclude* to draw only the dots *not* in the current facet.
:::

When there are many facets, facets may be small and hard to read; you may need to increase the plot’s **width** or **height**. Alternatively, you can wrap facets by computing a row and column number as **fy** and **fx**. Below, small multiples of varying unemployment counts across industries are shown in a three-column display.

:::plot defer https://observablehq.com/@observablehq/plot-facet-wrap
```js
Plot.plot((() => {
  const n = 3; // number of facet columns
  const keys = Array.from(d3.union(industries.map((d) => d.industry)));
  const index = new Map(keys.map((key, i) => [key, i]));
  const fx = (key) => index.get(key) % n;
  const fy = (key) => Math.floor(index.get(key) / n);
  return {
    height: 300,
    axis: null,
    y: {insetTop: 10},
    fx: {padding: 0.03},
    marks: [
      Plot.areaY(industries, Plot.normalizeY("extent", {
        x: "date",
        y: "unemployed",
        fx: (d) => fx(d.industry),
        fy: (d) => fy(d.industry)
      })),
      Plot.text(keys, {fx, fy, frameAnchor: "top-left", dx: 6, dy: 6}),
      Plot.frame()
    ]
  };
})())
```
:::

:::tip
If you are interested in automatic facet wrapping, please upvote [#277](https://github.com/observablehq/plot/issues/277).
:::

:::info
This example uses an [immediately-invoked function expression (IIFE)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) to declare local variables.
:::

The above chart also demonstrates faceted annotations, using a [text mark](../marks/text.md) to label the facet in lieu of facet axes. Below, we apply a single text annotation to the *Adelie* facet by setting the **fy** channel to a single-element array parallel to the data.

:::plot defer https://observablehq.com/@observablehq/plot-annotated-facets
```js
Plot.plot({
  marginLeft: 60,
  marginRight: 60,
  grid: true,
  y: {label: null},
  fy: {label: null},
  color: {legend: true},
  marks: [
    Plot.barX(penguins, Plot.groupY({x: "count"}, {fy: "species", y: "island", fill: "sex"})),
    Plot.text([`While Chinstrap and Gentoo penguins were each observed on only one island, Adelie penguins were observed on all three islands.`], {
      fy: ["Adelie"],
      frameAnchor: "top-right",
      lineWidth: 18,
      dx: -6,
      dy: 6
    }),
    Plot.frame()
  ]
})
```
:::

## Mark facet options

Facets can be defined for each mark via the **fx** or **fy** channels. <VersionBadge version="0.6.1" /> The **fx** and **fy** channels are computed prior to the [mark’s transform](./transforms.md), if any (*i.e.*, facet channels are not transformed). Alternatively, the [**facet** plot option](#plot-facet-options) allows top-level faceting based on data.

Faceting can be explicitly enabled or disabled on a mark with the **facet** option, which accepts the following values:

* *auto* (default) - automatically determine if this mark should be faceted
* *include* (or true) - draw the subset of the mark’s data in the current facet
* *exclude* - draw the subset of the mark’s data *not* in the current facet
* *super* - draw this mark in a single frame that covers all facets
* null (or false) - repeat this mark’s data across all facets (*i.e.*, no faceting)

When mark-level faceting is used, the default *auto* setting is equivalent to *include*: the mark will be faceted if either the **fx** or **fy** channel option (or both) is specified. The null or false option will disable faceting, while *exclude* draws the subset of the mark’s data *not* in the current facet. When a mark uses *super* faceting, it is not allowed to use position scales (*x*, *y*, *fx*, or *fy*); *super* faceting is intended for decorations, such as labels and legends.

The **facetAnchor** option<a id="facetAnchor" href="#facetAnchor" aria-label="Permalink to &quot;facetAnchor&quot;"></a> <VersionBadge version="0.6.3" /> controls the placement of the mark with respect to the facets. Based on the value, the mark will be displayed on:

* null - non-empty facets
* *top*, *right*, *bottom*, or *left* - the given side
* *top-empty*, *right-empty*, *bottom-empty*, or *left-empty* - adjacent empty facet or side
* *empty* - empty facets

The **facetAnchor** option defaults to null for all marks except axis marks, whose default depends on the axis orientation and associated scale.

When using top-level faceting, if the mark data is parallel to the facet data (*i.e.*, it has the same length and order), but is not strictly equal (`===`), you can enable faceting by specifying the **facet** option to *include* (or equivalently true). Likewise you can disable faceting by setting the **facet** option to null or false. Finally, the **facet** option supports the _exclude_ option to select all data points that are _not_ part of the current facet, allowing “background” marks for context.

When top-level faceting is used, the default *auto* setting is equivalent to *include* when the mark data is strictly equal to the top-level facet data; otherwise it is equivalent to null. When the *include* or *exclude* facet mode is chosen, the mark data must be parallel to the top-level facet data: the data must have the same length and order. If the data are not parallel, then the wrong data may be shown in each facet. The default *auto* therefore requires strict equality (`===`) for safety, and using the facet data as mark data is recommended when using the *exclude* facet mode. (To construct parallel data safely, consider using [*array*.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) on the facet data.)

## Plot facet options

The **facet** plot option provides addition control over facet position scales and axes:

* **marginTop** - the top margin
* **marginRight** - the right margin
* **marginBottom** - the bottom margin
* **marginLeft** - the left margin
* **margin** - shorthand for the four margins
* **grid** - if true, draw grid lines for each facet
* **label** - if null, disable default facet axis labels

The **facet** margin options behave largely the same as the margin [plot options](./plots.md); the only difference is the positioning of the associated scale label for the *x* and *y* scales. Likewise, the **grid** and **label** options have the same meaning as the plot options, except the facet options only apply to the *fx* and *fy* scales.

The **facet** plot option is also an alternative to the **fx** and **fy** mark options. It is useful when multiple marks share the same data; the **x** and **y** facet channels are then shared by all marks that use the facet data. (Other marks will be repeated across facets.) For example, we can visualize the famous [Anscombe’s quartet](https://en.wikipedia.org/wiki/Anscombe's_quartet) as a scatterplot with horizontal facets.

:::plot https://observablehq.com/@observablehq/plot-anscombes-quartet
```js
Plot.plot({
  grid: true,
  aspectRatio: 0.5,
  facet: {data: anscombe, x: "series"},
  marks: [
    Plot.frame(),
    Plot.line(anscombe, {x: "x", y: "y"}),
    Plot.dot(anscombe, {x: "x", y: "y"})
  ]
})
```
:::

For top-level faceting, these **facet** options determine the facets:

* **data** - the data to be faceted
* **x** - the horizontal↔︎ position; bound to the *fx* scale
* **y** - the vertical↕︎ position; bound to the *fy* scale

With top-level faceting, any mark that uses the specified facet data will be faceted by default, whereas marks that use different data will be repeated across all facets. Use the mark **facet** option to change the behavior.

## Facet scales

When faceting, two additional [band scales](./scales.md#discrete-scales) may be configured:

* *fx* - the horizontal↔︎ position, a *band* scale
* *fy* - the vertical↕︎ position, a *band* scale

You can adjust the space between facets using the **padding**, **round**, and **align** scale options.

# docs/features/formats.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

</script>

# Formats

These helper functions are provided for convenience as a **tickFormat** option for the [axis mark](../marks/axis.md), as the **text** option for a [text mark](../marks/text.md), or other use. See also [d3-format](https://d3js.org/d3-format), [d3-time-format](https://d3js.org/d3-time-format), and JavaScript’s built-in [date formatting](https://observablehq.com/@mbostock/date-formatting) and [number formatting](https://observablehq.com/@mbostock/number-formatting).

## formatNumber(*locale*) <VersionBadge version="0.6.15" pr="2078" /> {#formatNumber}

```js
Plot.formatNumber("en-US")(Math.PI) // "3.142"
```

Returns a function that formats a given number according to the specified *locale*. The *locale* is a [BCP 47 language tag](https://tools.ietf.org/html/bcp47) and defaults to U.S. English.

## formatIsoDate(*date*) {#formatIsoDate}

```js
Plot.formatIsoDate(new Date("2020-01-01T00:00:00.000Z")) // "2020-01-01"
```

Given a *date*, returns the shortest equivalent ISO 8601 UTC string. If the given *date* is not valid, returns `"Invalid Date"`. See [isoformat](https://github.com/mbostock/isoformat).

## formatWeekday(*locale*, *format*) {#formatWeekday}

:::plot https://observablehq.com/@observablehq/plot-format-helpers
```js
Plot.textX(d3.range(7)).plot({x: {tickFormat: Plot.formatWeekday()}})
```
:::

```js
Plot.formatWeekday("es-MX", "long")(0) // "domingo"
```

Returns a function that formats a given week day number (from 0 = Sunday to 6 = Saturday) according to the specified *locale* and *format*. The *locale* is a [BCP 47 language tag](https://tools.ietf.org/html/bcp47) and defaults to U.S. English. The *format* is a [weekday format](https://tc39.es/ecma402/#datetimeformat-objects): either *narrow*, *short*, or *long*; if not specified, it defaults to *short*.

## formatMonth(*locale*, *format*) {#formatMonth}

:::plot https://observablehq.com/@observablehq/plot-format-helpers
```js
Plot.textX(d3.range(12)).plot({x: {tickFormat: Plot.formatMonth(), ticks: 12}})
```
:::

```js
Plot.formatMonth("es-MX", "long")(0) // "enero"
```

Returns a function that formats a given month number (from 0 = January to 11 = December) according to the specified *locale* and *format*. The *locale* is a [BCP 47 language tag](https://tools.ietf.org/html/bcp47) and defaults to U.S. English. The *format* is a [month format](https://tc39.es/ecma402/#datetimeformat-objects): either *2-digit*, *numeric*, *narrow*, *short*, *long*; if not specified, it defaults to *short*.

# docs/features/interactions.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";

const olympians = shallowRef([
  {weight: 31, height: 1.21, sex: "female"},
  {weight: 170, height: 2.21, sex: "male"}
]);

onMounted(() => {
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
});

</script>

# Interactions

Interaction allows reading values out of a plot (details on demand), or fluidly changing a view of data without editing code (zoom and filter). There are a variety of ways to achieve interaction with Plot, including built-in interaction features and development techniques with frameworks such as Observable and React.

## Pointing

When looking at a scatterplot, the reader may wonder, *what abstract values does this dot represent?*

The [pointer transform](../interactions/pointer.md) can provide an answer: it dynamically [filters](../transforms/filter.md) a mark such that only the data closest to the pointer (such as the mouse) is rendered. The pointer transform is often paired with the [tip mark](../marks/tip.md) for interactive tooltips, revealing exact values as the pointer moves over the plot. The tip can show additional fields not otherwise visible, such as the *name* and *sport* of Olympic athletes below.

:::plot defer https://observablehq.com/@observablehq/scatterplot-with-interactive-tips
```js
Plot.dot(olympians, {
  x: "weight",
  y: "height",
  stroke: "sex",
  channels: {name: "name", sport: "sport"},
  tip: true
}).plot()
```
:::

The [crosshair mark](../interactions/crosshair.md) uses the pointer transform internally to display a [rule](../marks/rule.md) and a [text](../marks/text.md) showing the **x** (horizontal↔︎ position) and **y** (vertical↕︎ position) value of the nearest data.

:::plot defer https://observablehq.com/@observablehq/plot-crosshair
```js
Plot.plot({
  marks: [
    Plot.dot(olympians, {x: "weight", y: "height", stroke: "sex"}),
    Plot.crosshair(olympians, {x: "weight", y: "height"})
  ]
})
```
:::

These values are displayed atop the axes on the edge of the frame; unlike the tip mark, the crosshair mark will not obscure other marks in the plot.

## Selecting

Support for selecting points within a plot through direct manipulation is under development. If you are interested in this feature, please upvote [#5](https://github.com/observablehq/plot/issues/5). See [#721](https://github.com/observablehq/plot/pull/721) for some early work on brushing.

## Zooming

Support for interactive panning and zooming is planned for a future release. If you are interested in this feature, please upvote [#1590](https://github.com/observablehq/plot/issues/1590).

## Animation

Support for declarative animation is planned for a future release. If you are interested in this feature, please upvote [#166](https://github.com/observablehq/plot/issues/166). See [#995](https://github.com/observablehq/plot/pull/995) for some early work on a **time** channel.

## Custom reactivity

With the exception of render transforms (see the [pointer transform](https://github.com/observablehq/plot/blob/main/src/interactions/pointer.js) implementation), Plot does not currently provide incremental re-rendering (partial updates to previously-rendered plots) or animated transitions between views.

That said, you can simply throw away an old plot and replace it with a new one! This allows plotting of dynamic data: data which can change in real-time as it streams in, or because it is derived in response to external inputs such as range sliders and search boxes.

On Observable, you can use [viewof](https://observablehq.com/@observablehq/views) in conjunction with [Observable Inputs](https://observablehq.com/@observablehq/inputs) (or other plots!) for interactivity. If your cell references another cell, it will automatically re-run whenever the upstream cell’s value changes. For example, try dragging the slider in this [hexbin example](https://observablehq.com/@observablehq/plot-hexbin-binwidth). In React, use [useEffect](https://react.dev/reference/react/useEffect) and [useRef](https://react.dev/reference/react/useRef) to re-render the plot when data changes. In Vue, use [ref](https://vuejs.org/api/reactivity-core.html#ref). For more, see our [getting started guide](../getting-started.md).

You can also manipulate the SVG that Plot creates, if you are comfortable using lower-level APIs; see examples by [Mike Freeman](https://observablehq.com/@mkfreeman/plot-animation) and [Philippe Rivière](https://observablehq.com/@fil/plot-animate-a-bar-chart).

# docs/features/intervals.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

</script>

# Intervals <VersionBadge version="0.6.15" pr="2075" />

Plot provides several built-in interval implementations for use with the **tick** option for [scales](./scales.md), as the **thresholds** option for a [bin transform](../transforms/bin.md), or other use. See also [d3-time](https://d3js.org/d3-time). You can also implement custom intervals.

At a minimum, intervals implement *interval*.**floor** and *interval*.**offset**. Range intervals additionally implement *interval*.**range**, and nice intervals additionally implement *interval*.**ceil**. These latter implementations are required in some contexts; see Plot’s TypeScript definitions for details.

The *interval*.**floor** method takes a *value* and returns the corresponding value representing the greatest interval boundary less than or equal to the specified *value*. For example, for the “day” time interval, it returns the preceding midnight:

```js
Plot.utcInterval("day").floor(new Date("2013-04-12T12:34:56Z")) // 2013-04-12
```

The *interval*.**offset** method takes a *value* and returns the corresponding value equal to *value* plus *step* intervals. If *step* is not specified it defaults to 1. If *step* is negative, then the returned value will be less than the specified *value*. For example:

```js
Plot.utcInterval("day").offset(new Date("2013-04-12T12:34:56Z"), 1) // 2013-04-13T12:34:56Z
Plot.utcInterval("day").offset(new Date("2013-04-12T12:34:56Z"), -2) // 2013-04-10T12:34:56Z
```

The *interval*.**range** method returns an array of values representing every interval boundary greater than or equal to *start* (inclusive) and less than *stop* (exclusive). The first value in the returned array is the least boundary greater than or equal to *start*; subsequent values are offset by intervals and floored.

```js
Plot.utcInterval("week").range(new Date("2013-04-12T12:34:56Z"), new Date("2013-05-12T12:34:56Z")) // [2013-04-14, 2013-04-21, 2013-04-28, 2013-05-05, 2013-05-12]
```

The *interval*.**ceil** method returns the value representing the least interval boundary value greater than or equal to the specified *value*. For example, for the “day” time interval, it returns the preceding midnight:

```js
Plot.utcInterval("day").ceil(new Date("2013-04-12T12:34:56Z")) // 2013-04-13
```

## numberInterval(*period*) {#numberInterval}

```js
Plot.numberInterval(2)
```

Given a number *period*, returns a corresponding range interval implementation. If *period* is a negative number, the resulting interval uses 1 / -*period*; this allows more precise results when *period* is a negative integer. The returned interval implements the *interval*.range, *interval*.floor, and *interval*.offset methods.

## timeInterval(*period*) {#timeInterval}

```js
Plot.timeInterval("2 days")
```

Given a string *period* describing a local time interval, returns a corresponding nice interval implementation. The period can be *second*, *minute*, *hour*, *day*, *week*, *month*, *quarter*, *half*, *year*, *monday*, *tuesday*, *wednesday*, *thursday*, *friday*, *saturday*, or *sunday*, or a skip interval consisting of a number followed by the interval name (possibly pluralized), such as *3 months* or *10 years*. The returned interval implements the *interval*.range, *interval*.floor, *interval*.ceil, and *interval*.offset methods.

## utcInterval(*period*) {#utcInterval}

```js
Plot.utcInterval("2 days")
```

Given a string *period* describing a UTC time interval, returns a corresponding nice interval implementation. The period can be *second*, *minute*, *hour*, *day*, *week*, *month*, *quarter*, *half*, *year*, *monday*, *tuesday*, *wednesday*, *thursday*, *friday*, *saturday*, or *sunday*, or a skip interval consisting of a number followed by the interval name (possibly pluralized), such as *3 months* or *10 years*. The returned interval implements the *interval*.range, *interval*.floor, *interval*.ceil, and *interval*.offset methods.

# docs/features/legends.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";

const penguins = shallowRef([]);

const olympians = shallowRef([
  {weight: 31, height: 1.21, sex: "female"},
  {weight: 170, height: 2.21, sex: "male"}
]);

const gistemp = shallowRef([
  {Date: new Date("1880-01-01"), Anomaly: -0.78},
  {Date: new Date("2016-12-01"), Anomaly: 1.35}
]);

onMounted(() => {
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
  d3.csv("../data/gistemp.csv", d3.autoType).then((data) => (gistemp.value = data));
  d3.csv("../data/penguins.csv", d3.autoType).then((data) => (penguins.value = data));
});

</script>

# Legends <VersionBadge version="0.3.0" />

Plot can generate **legends** for *color*, *opacity*, and *symbol* [scales](./scales.md). For example, the scatterplot below of body measurements of Olympic athletes includes a legend for its *color* scale, allowing the meaning of color to be interpreted by the reader. (The axes similarly document the meaning of the *x* and *y* position scales.)

:::plot defer https://observablehq.com/@observablehq/plot-olympians-scatterplot
```js
Plot.plot({
  color: {legend: true},
  marks: [
    Plot.dot(olympians, {x: "weight", y: "height", stroke: "sex"})
  ]
})
```
:::

The legend above is a *swatches* legend because the *color* scale is *ordinal* (with a *categorical* scheme). When the *color* scale is continuous, a *ramp* legend with a smooth gradient is generated instead. The plot below of global average surface temperature ([GISTEMP](https://data.giss.nasa.gov/gistemp/)) uses a *diverging* *color* scale to indicate the deviation from the 1951–1980 average in degrees Celsius.

:::plot defer https://observablehq.com/@observablehq/plot-diverging-color-scatterplot
```js
Plot.plot({
  color: {
    scheme: "BuRd",
    legend: true
  },
  marks: [
    Plot.ruleY([0]),
    Plot.dot(gistemp, {x: "Date", y: "Anomaly", stroke: "Anomaly"})
  ]
})
```
:::

When an ordinal *color* scale is used redundantly with a *symbol* scale, the *symbol* legend will incorporate the color encoding. This is more accessible than using color alone, particularly for readers with color vision deficiency.

:::plot defer https://observablehq.com/@observablehq/plot-symbol-channel
```js
Plot.plot({
  grid: true,
  x: {label: "Body mass (g)"},
  y: {label: "Flipper length (mm)"},
  symbol: {legend: true},
  marks: [
    Plot.dot(penguins, {x: "body_mass_g", y: "flipper_length_mm", stroke: "species", symbol: "species"})
  ]
})
```
:::

Plot does not yet generate legends for the *r* (radius) scale or the *length* scale. If you are interested in this feature, please upvote [#236](https://github.com/observablehq/plot/issues/236). In the meantime, you can implement a legend using marks as demonstrated in the [spike map](https://observablehq.com/@observablehq/plot-spike) example.

## Legend options

If the **legend** [scale option](./scales.md#scale-options) is true, the default legend will be produced for the scale; otherwise, the meaning of the **legend** option depends on the scale: for quantitative color scales, it defaults to *ramp* but may be set to *swatches* for a discrete scale (most commonly for *threshold* color scales); for *ordinal* *color* scales and *symbol* scales, only the *swatches* value is supported.

<!-- TODO Describe the color and opacity options. -->

Categorical and ordinal color legends are rendered as swatches, unless the **legend** option is set to *ramp*. The swatches can be configured with the following options:

* **tickFormat** - a format function for the labels
* **swatchSize** - the size of the swatch (if square)
* **swatchWidth** - the swatches’ width
* **swatchHeight** - the swatches’ height
* **columns** - the number of swatches per row
* **marginLeft** - the legend’s left margin
* **className** - a class name, that defaults to a randomly generated string scoping the styles
* **opacity** - the swatch fill opacity <VersionBadge version="0.6.5" />
* **width** - the legend’s width (in pixels)

Symbol legends are rendered as swatches and support the options above in addition to the following options:

* **fill** - the symbol fill color
* **fillOpacity** - the symbol fill opacity; defaults to 1
* **stroke** - the symbol stroke color
* **strokeOpacity** - the symbol stroke opacity; defaults to 1
* **strokeWidth** - the symbol stroke width; defaults to 1.5
* **r** - the symbol radius; defaults to 4.5 pixels

The **fill** and **stroke** symbol legend options can be specified as “color” to apply the color scale when the symbol scale is a redundant encoding. The **fill** defaults to none. The **stroke** defaults to currentColor if the fill is none, and to none otherwise. The **fill** and **stroke** options may also be inherited from the corresponding options on an associated dot mark.

Continuous color legends are rendered as a ramp, and can be configured with the following options:

* **label** - the scale’s label
* **ticks** - the desired number of ticks, or an array of tick values
* **tickFormat** - a format function for the legend’s ticks
* **tickSize** - the tick size
* **round** - if true (default), round tick positions to pixels
* **width** - the legend’s width
* **height** - the legend’s height
* **marginTop** - the legend’s top margin
* **marginRight** - the legend’s right margin
* **marginBottom** - the legend’s bottom margin
* **marginLeft** - the legend’s left margin
* **opacity** - the ramp’s fill opacity

The **style** legend option allows custom styles to override Plot’s defaults; it has the same behavior as in Plot’s top-level [plot options](./plots.md). The **className** option is suffixed with *-ramp* or *-swatches*, reflecting the **legend** type.

## legend(*options*) {#legend}

Renders a standalone legend for the scale defined by the given *options* object, returning a SVG or HTML figure element. This element can then be inserted into the page as described in the [getting started guide](../getting-started.md). The *options* object must define at least one scale; see [scale options](./scales.md) for how to define a scale.

For example, here is a *ramp* legend of a *linear* *color* scale with the default domain of [0, 1] and default scheme *turbo*:

<PlotRender :options='{color: {type: "linear"}}' defer method="legend" />

```js
Plot.legend({color: {type: "linear"}})
```

The *options* object may also include any additional legend options described in the previous section. For example, to make the above legend slightly wider:

<PlotRender :options='{width: 320, color: {type: "linear"}}' defer method="legend" />

```js
Plot.legend({width: 320, color: {type: "linear"}})
```

# docs/features/markers.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref} from "vue";
import crimea from "../data/crimea.ts";

const marker = ref("circle");

</script>

# Markers

A **marker** defines a graphic drawn on vertices of a [line](../marks/line.md) or [link](../marks/link.md) mark.

<p>
  <label class="label-input">
    Marker:
    <select v-model="marker">
      <option>none</option>
      <option>arrow</option>
      <option>arrow-reverse</option>
      <option>dot</option>
      <option>circle</option>
      <option>circle-stroke</option>
      <option>tick</option>
      <option>tick-x</option>
      <option>tick-y</option>
    </select>
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-line-chart-with-markers
```js-vue
Plot.plot({
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(crimea, {x: "date", y: "deaths", stroke: "cause", marker: "{{marker}}"})
  ]
})
```
:::

The supported marker options are:

* **markerStart** - the marker for the starting point of a line segment
* **markerMid** - the marker for any intermediate point of a line segment
* **markerEnd** - the marker for the end point of a line segment
* **marker** - shorthand for setting the marker on all points

The following named markers are supported:

* *none* (default) - no marker
* *arrow* - an arrowhead with *auto* orientation
* *arrow-reverse* - an arrowhead with *auto-start-reverse* orientation
* *dot* - a filled *circle* without a stroke and 2.5px radius
* *circle*, equivalent to *circle-fill* - a filled circle with a white stroke and 3px radius
* *circle-stroke* - a hollow circle with a colored stroke and a white fill and 3px radius
* *tick* <VersionBadge version="0.6.12" pr="1872" /> - a small opposing line
* *tick-x* <VersionBadge version="0.6.12" pr="1872" /> - a small horizontal line
* *tick-y* <VersionBadge version="0.6.12" pr="1872" /> - a small vertical line

If **marker** is true, it defaults to *circle*. If **marker** is a function, it will be called with a given *color* and must return an [SVG marker element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker).

The primary color of a marker is inherited from the *stroke* of the associated mark. The *arrow* marker is [automatically oriented](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/orient) such that it points in the tangential direction of the path at the position the marker is placed. The *circle* markers are centered around the given vertex.

For lines whose [curve](./curves.md) is not *linear*, markers are not necessarily drawn at the data positions given by **x** and **y**; marker placement is determined by the (possibly Bézier) path segments generated by the curve. To ensure that symbols are drawn at a given **x** and **y** position, consider using a [dot mark](../marks/dot.md) instead.

# docs/features/marks.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as htl from "htl";
import {computed, ref, shallowRef, onMounted} from "vue";
import alphabet from "../data/alphabet.ts";
import gistemp from "../data/gistemp.ts";

const sales = [
  {units: 10, fruit: "peach"},
  {units: 20, fruit: "pear"},
  {units: 40, fruit: "plum"},
  {units: 30, fruit: "plum"}
];

const linedata = [
  {hour: 0, value: 8, sensor: "A"},
  {hour: 0, value: 6, sensor: "B"},
  {hour: 1, value: 7, sensor: "A"},
  {hour: 1, value: 5, sensor: "B"},
  {hour: 2, value: 3, sensor: "A"},
  {hour: 2, value: 0, sensor: "B"},
  {hour: 3, value: 9, sensor: "A"},
  {hour: 3, value: 2, sensor: "B"}
];

const timeseries = [
  {year: 2014, population: 7295.290765},
  {year: 2015, population: 7379.797139},
  {year: 2016, population: 7464.022049},
  {year: 2017, population: 7547.858925},
  // {year: 2018, population: 7631.091040},
  {year: 2019, population: 7713.468100},
  {year: 2020, population: 7794.798739}
];

const area = ref(true);
const aapl = shallowRef([]);
const goog = shallowRef([]);
const bls = shallowRef([]);

onMounted(() => {
  d3.csv("../data/aapl.csv", d3.autoType).then((data) => (aapl.value = data));
  d3.csv("../data/goog.csv", d3.autoType).then((data) => (goog.value = data));
  d3.csv("../data/bls-metro-unemployment.csv", d3.autoType).then((data) => (bls.value = data));
});

</script>

# Marks {#Marks}

:::tip
If you aren’t yet up and running with Plot, please read our [getting started guide](../getting-started.md) first. Tinkering with the code below will give a better sense of how Plot works.
:::

Plot doesn’t have chart types; instead, you construct charts by layering **marks**.

## Marks are geometric shapes

Plot provides a variety of mark types. Think of marks as the “visual vocabulary” — the painter’s palette 🎨, but of shapes instead of colors — that you pull from when composing a chart. Each mark type produces a certain type of geometric shape.

For example, the [dot mark](../marks/dot.md) draws stroked circles (by default).

:::plot https://observablehq.com/@observablehq/plot-temporal-scatterplot
```js
Plot.dot(gistemp, {x: "Date", y: "Anomaly"}).plot()
```
:::

The [line mark](../marks/line.md) draws connected line segments (also known as a *polyline* or *polygonal chain*).

:::plot https://observablehq.com/@observablehq/plot-temporal-line-chart
```js
Plot.lineY(gistemp, {x: "Date", y: "Anomaly"}).plot()
```
:::

And the [bar mark](../marks/bar.md) draws rectangular bars in either a horizontal (barX→) or vertical (barY↑) orientation.

:::plot https://observablehq.com/@observablehq/plot-alphabet-bar-chart
```js
Plot.barX(alphabet, {x: "frequency", y: "letter"}).plot()
```
:::

So instead of looking for a chart type, consider the shape of the primary graphical elements in your chart, and look for the corresponding mark type. If a chart has only a single mark, the mark type *is* effectively the chart type: the bar mark is used to make a bar chart, the area mark is used to make an area chart, and so on.

## Marks are layered

The big advantage of mark types over chart types is that you can compose multiple marks of different types into a single [plot](./plots.md). For example, below an [area](../marks/area.md) and [line](../marks/line.md) are used to plot the same sequence of values, while a [rule](../marks/rule.md) emphasizes *y* = 0.

:::plot defer https://observablehq.com/@observablehq/plot-layered-marks-2
```js
Plot.plot({
  marks: [
    Plot.ruleY([0]),
    Plot.areaY(aapl, {x: "Date", y: "Close", fillOpacity: 0.2}),
    Plot.lineY(aapl, {x: "Date", y: "Close"})
  ]
})
```
:::

Each mark supplies its own data; a quick way to combine multiple datasets into a chart is to declare a separate mark for each. You can even use [*array*.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to create multiple marks from nested data.

:::plot defer https://observablehq.com/@observablehq/plot-layered-marks-2
```js
Plot.plot({
  marks: [
    [goog, aapl].map((stock) => Plot.lineY(stock, {x: "Date", y: "Close"}))
  ]
})
```
:::

Marks may also be a function which returns an [SVG element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element), if you wish to insert arbitrary content. (Here we use [Hypertext Literal](https://github.com/observablehq/htl) to generate an SVG gradient.)

:::plot defer https://observablehq.com/@observablehq/plot-gradient-bars
```js
Plot.plot({
  marks: [
    () => htl.svg`<defs>
      <linearGradient id="gradient" gradientTransform="rotate(90)">
        <stop offset="15%" stop-color="purple" />
        <stop offset="75%" stop-color="red" />
        <stop offset="100%" stop-color="gold" />
      </linearGradient>
    </defs>`,
    Plot.barY(alphabet, {x: "letter", y: "frequency", fill: "url(#gradient)"}),
    Plot.ruleY([0])
  ]
})
```
:::

And marks may be null or undefined, which produce no output; this is useful for showing marks conditionally (*e.g.*, when a box is checked).

<p>
  <label class="label-input">
    Show area:
    <input type="checkbox" v-model="area">
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-optional-marks
```js
Plot.plot({
  marks: [
    Plot.ruleY([0]),
    area ? Plot.areaY(aapl, {x: "Date", y: "Close", fillOpacity: 0.2}) : null,
    Plot.lineY(aapl, {x: "Date", y: "Close"})
  ]
})
```
:::

## Marks use scales

Marks are (typically) not positioned in literal pixels, or colored in literal colors, as in a conventional graphics system. Instead you provide abstract values such as time and temperature — marks are drawn “in data space” — and [scales](./scales.md) encode these into visual values such as position and color. And best of all, Plot automatically creates [axes](../marks/axis.md) and [legends](./legends.md) to document the scales’ encodings.

Data is passed through scales automatically during rendering; the mark controls which scales are used. The **x** and **y** options are typically bound to the *x* and *y* scales, respectively, while the **fill** and **stroke** options are typically bound to the *color* scale. Changing a scale’s definition, say by overriding its **domain** (the extent of abstract input values) or **type**, affects the appearance of all marks that use the scale.

:::plot defer https://observablehq.com/@observablehq/plot-aapl-log-scale
```js {2-6}
Plot.plot({
  y: {
    type: "log",
    domain: [30, 300],
    grid: true
  },
  marks: [
    Plot.lineY(aapl, {x: "Date", y: "Close"})
  ]
})
```
:::

## Marks have tidy data

A single mark can draw multiple shapes. A mark generally produces a shape — such as a rectangle or circle — for each element in the data.

:::plot defer https://observablehq.com/@observablehq/plot-tidy-data
```js
Plot.dot(aapl, {x: "Date", y: "Close"}).plot()
```
:::

It’s more complicated than that, though, since some marks produce shapes that incorporate *multiple* data points. Pass the same data to a [line](../marks/line.md) and you’ll get a single polyline.

:::plot defer https://observablehq.com/@observablehq/plot-tidy-data
```js
Plot.lineY(aapl, {x: "Date", y: "Close"}).plot()
```
:::

And a line mark isn’t even guaranteed to produce a single polyline — there can be multiple polylines, as in a line chart with multiple series (using **z**).

:::plot defer https://observablehq.com/@observablehq/plot-multiple-series-line-chart
```js
Plot.lineY(bls, {x: "date", y: "unemployment", z: "division"}).plot()
```
:::

Plot favors [tidy data](http://vita.had.co.nz/papers/tidy-data.html) structured as an array of objects, where each object represents an observation (a row), and each object property represents an observed value; all objects in the array should have the same property names (the columns).

For example, say we have hourly readings from two sensors *A* and *B*. You can represent the sensor log as an array of objects like so:

```js
linedata = [
  {hour: 0, value: 8, sensor: "A"},
  {hour: 0, value: 6, sensor: "B"},
  {hour: 1, value: 7, sensor: "A"},
  {hour: 1, value: 5, sensor: "B"},
  {hour: 2, value: 3, sensor: "A"},
  {hour: 2, value: 0, sensor: "B"},
  {hour: 3, value: 9, sensor: "A"},
  {hour: 3, value: 2, sensor: "B"}
]
```

:::tip
For larger datasets, you can more efficiently pass data using an [Apache Arrow](https://arrow.apache.org/docs/js/) table as a columnar data representation. <VersionBadge version="0.6.16" pr="2115" />
:::

Then you can pass the data to the line mark, and extract named columns from the data for the desired options:

:::plot https://observablehq.com/@observablehq/plot-accessors
```js
Plot.lineY(linedata, {x: "hour", y: "value", stroke: "sensor"}).plot()
```
:::

Another common way to extract a column from tabular data is an accessor function. This function is invoked for each element in the data (each row), and returns the corresponding observed value, as with [*array*.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

:::plot https://observablehq.com/@observablehq/plot-accessors
```js
Plot.lineY(linedata, {
  x: (d) => d.hour,
  y: (d) => d.value,
  stroke: (d) => d.sensor
}).plot()
```
:::

For greater efficiency, Plot also supports columnar data: you can use an [Apache Arrow](https://arrow.apache.org/docs/js/) table as data instead of an array of objects. <VersionBadge version="0.6.16" pr="2115" /> You can even pass parallel arrays of values, or Apache Arrow vectors, to each channel.

```js
Plot.lineY({length: linedata.length}, {
  x: linedata.map((d) => d.hour),
  y: linedata.map((d) => d.value),
  stroke: linedata.map((d) => d.sensor)
}).plot()
```

:::tip
Note that when accessor functions or parallel arrays are used instead of field names, automatic axis labels (*hour* and *value*) are lost. These can be restored using the **label** option on the *x* and *y* scales.
:::

## Marks imply data types

Data comes in different types: quantitative (or temporal) values can be subtracted, ordinal values can be ordered, and nominal (or categorical) values can only be the same or different.

:::info
Because nominal values often need some arbitrary order for display purposes — often alphabetical — Plot uses the term *ordinal* to refer to both ordinal and nominal data.
:::

Some marks work with any type of data, while other marks have certain requirements or assumptions of data. For example, a line should only be used when both *x* and *y* are quantitative or temporal, and when the data is in a meaningful order (such as chronological). This is because the line mark will interpolate between adjacent points to draw line segments. If *x* or *y* is nominal — say the names of countries — it doesn’t make sense to use a line because there is no half-way point between two nominal values.

:::plot https://observablehq.com/@observablehq/plot-dont-do-this
```js
Plot.lineY(["please", "don’t", "do", "this"]).plot() // 🌶️
```
:::

:::warning
While Plot aspires to give good defaults and helpful warnings, Plot won’t prevent you from creating a meaningless chart. *Only you* can prevent bogus charts!
:::

In particular, beware the simple “bar”! A bar mark is used for a bar chart, but a rect mark is needed for a histogram. Plot has four different mark types for drawing rectangles:

- use [rect](../marks/rect.md) when both *x* and *y* are quantitative
- use [barX](../marks/bar.md) when *x* is quantitative and *y* is ordinal
- use [barY](../marks/bar.md) when *x* is ordinal and *y* is quantitative
- use [cell](../marks/cell.md) when both *x* and *y* are ordinal

Plot encourages you to think about data types as you visualize because data types often imply semantics. For example, do you notice anything strange about the bar chart below?

:::plot https://observablehq.com/@observablehq/plot-the-missing-bar
```js
Plot
  .barY(timeseries, {x: "year", y: "population"}) // 🌶️
  .plot({x: {tickFormat: ""}})
```
:::

Here’s the underlying data:

```js
timeseries = [
  {year: 2014, population: 7295.290765},
  {year: 2015, population: 7379.797139},
  {year: 2016, population: 7464.022049},
  {year: 2017, population: 7547.858925},
  {year: 2019, population: 7713.468100},
  {year: 2020, population: 7794.798739}
]
```

The data is missing the population for the year 2018! Because the barY mark implies an ordinal *x* scale, the gap is hidden. Switching to the rectY mark (with the **interval** option to indicate that these are annual observations) reveals the missing data.

:::plot https://observablehq.com/@observablehq/plot-the-missing-bar
```js
Plot
  .rectY(timeseries, {x: "year", y: "population", interval: 1})
  .plot({x: {tickFormat: ""}})
```
:::

Alternatively, you can keep the barY mark and apply the **interval** option to the *x* scale.

:::plot https://observablehq.com/@observablehq/plot-the-missing-bar
```js
Plot
  .barY(timeseries, {x: "year", y: "population"})
  .plot({x: {tickFormat: "", interval: 1}})
```
:::

## Marks have options

When constructing a mark, you can specify options to change the mark’s appearance. These options are passed as a second argument to the mark constructor. (The first argument is the required data.) For example, if you want filled dots instead of stroked ones, pass the desired color to the **fill** option:

:::plot https://observablehq.com/@observablehq/plot-marks-have-options
```js
Plot.dot(gistemp, {x: "Date", y: "Anomaly", fill: "red"}).plot()
```
:::

As the name suggests, options are generally optional; Plot tries to provide good defaults for whatever you don’t specify. Plot even has [shorthand](./shorthand.md) for various common forms of data. Below, we extract an array of numbers from the `gistemp` dataset, and use the line mark shorthand to set *x* = index and *y* = identity.

:::plot https://observablehq.com/@observablehq/plot-marks-have-options
```js
Plot.lineY(gistemp.map((d) => d.Anomaly)).plot()
```
:::

Some marks even provide default [transforms](./transforms.md), say for [stacking](../transforms/stack.md)!

:::tip
Because Plot strives to be concise, there are many default behaviors, some of which can be subtle. If Plot isn’t doing what you expect, try disabling the defaults by specifying options explicitly.
:::

In addition to the standard options such as **fill** and **stroke** that are supported by all mark types, each mark type can support options unique to that type. For example, the dot mark takes a **symbol** option so you can draw things other than circles. See the documentation for each mark type to see what it supports.

## Marks have channels

Channels are mark options that can be used to encode data. These options allow the value to vary with the data, such as a different position or color for each dot. To use a channel, supply it with a column of data, typically as:

* a field (column) name,
* an accessor function, or
* an array of values of the same length and order as the data.

Not all mark options can be expressed as channels. For example, **stroke** can be a channel but **strokeDasharray** cannot. This is mostly a pragmatic limitation — it would be harder to implement Plot if every option were expressible as a channel — but it also serves to guide you towards options that are intended for encoding data.

:::tip
To vary the definition of a constant option with data, create multiple marks with your different constant options, and then filter the data for each mark to achieve the desired result.
:::

Some options can be either a channel or a constant depending on the provided value. For example, if you set the **fill** option to *purple*, Plot interprets it as a literal color.

:::plot https://observablehq.com/@observablehq/plot-marks-have-channels
```js
Plot
  .barX(timeseries, {x: "population", y: "year", fill: "purple"})
  .plot({y: {label: null, tickFormat: ""}})
```
:::

Whereas if the **fill** option is a string but *not* a valid CSS color, Plot assumes you mean the corresponding column of the data and interprets it as a channel.

:::plot https://observablehq.com/@observablehq/plot-marks-have-channels
```js
Plot
  .barX(timeseries, {x: "population", y: "year", fill: "year"})
  .plot({y: {label: null, tickFormat: ""}})
```
:::

If the **fill** option is a function, it is interpreted as a channel.

:::plot https://observablehq.com/@observablehq/plot-marks-have-channels
```js
Plot
  .barX(timeseries, {x: "population", y: "year", fill: (d) => d.year})
  .plot({y: {label: null, tickFormat: ""}})
```
:::

Lastly, note that while channels are normally bound to a [scale](#marks-use-scales), you can bypass the *color* scale here by supplying literal color values to the **fill** channel.

:::plot https://observablehq.com/@observablehq/plot-marks-have-channels
```js
Plot
  .barX(timeseries, {x: "population", y: "year", fill: (d) => d.year & 1 ? "red" : "currentColor"})
  .plot({y: {label: null, tickFormat: ""}})
```
:::

But rather than supplying literal values, it is more semantic to provide abstract values and use scales. In addition to centralizing the encoding definition (if used by multiple marks), it allows Plot to generate a legend.

:::plot https://observablehq.com/@observablehq/plot-marks-have-channels
```js
Plot
  .barX(timeseries, {x: "population", y: "year", fill: (d) => d.year & 1 ? "odd" : "even"})
  .plot({y: {label: null, tickFormat: ""}, color: {legend: true}})
```
:::

You can then specify the *color* scale’s **domain** and **range** to control the encoding.

## Mark options

Mark constructors take two arguments: **data** and **options**. Together these describe a tabular dataset and how to visualize it. Option values that must be the same for all of a mark’s generated shapes are known as *constants*, whereas option values that may vary across a mark’s generated shapes are known as *channels*. Channels are typically bound to [scales](./scales.md) and encode abstract data values, such as time or temperature, as visual values, such as position or color. (Channels can also be used to order ordinal domains; see the [**sort** option](./scales.md#sort-mark-option).)

A mark’s data is most commonly an array of objects representing a tabular dataset, such as the result of loading a CSV file, while a mark’s options bind channels (such as *x* and *y*) to columns in the data (such as *units* and *fruit*).

```js
sales = [
  {units: 10, fruit: "peach"},
  {units: 20, fruit: "pear"},
  {units: 40, fruit: "plum"},
  {units: 30, fruit: "plum"}
]
```
```js
Plot.dot(sales, {x: "units", y: "fruit"})
```

While a column name such as `"units"` is the most concise way of specifying channel values, values can also be specified as functions for greater flexibility, say to transform data or derive a new column on the fly. Channel functions are invoked for each datum (*d*) in the data and return the corresponding channel value. (This is similar to how D3’s [*selection*.attr](https://d3js.org/d3-selection/modifying#selection_attr) accepts functions, though note that Plot channel functions should return abstract values, not visual values.)

```js
Plot.dot(sales, {x: (d) => d.units * 1000, y: (d) => d.fruit})
```

Plot also supports columnar data for greater efficiency with bigger datasets; for example, data can be specified as any array of the appropriate length (or any iterable or value compatible with [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)), and then separate arrays of values can be passed as *options*.

```js
index = [0, 1, 2, 3]
```
```js
units = [10, 20, 40, 30]
```
```js
fruits = ["peach", "pear", "plum", "plum"]
```
```js
Plot.dot(index, {x: units, y: fruits})
```

Channel values can also be specified as numbers for constant values, say for a fixed baseline with an [area](../marks/area.md).

```js
Plot.area(aapl, {x1: "Date", y1: 0, y2: "Close"})
```

Missing and invalid data are handled specifically for each mark type and channel. In most cases, if the provided channel value for a given datum is null, undefined, or (strictly) NaN, the mark will implicitly filter the datum and not generate a corresponding output. In some cases, such as the radius (*r*) of a dot, the channel value must additionally be positive. Plot.line and Plot.area will stop the path before any invalid point and start again at the next valid point, thus creating interruptions rather than interpolating between valid points. Titles will only be added if they are non-empty.

All marks support the following style options:

* **fill** - fill color
* **fillOpacity** - fill opacity (a number between 0 and 1)
* **stroke** - stroke color
* **strokeWidth** - stroke width (in pixels)
* **strokeOpacity** - stroke opacity (a number between 0 and 1)
* **strokeLinejoin** - how to join lines (*bevel*, *miter*, *miter-clip*, or *round*)
* **strokeLinecap** - how to cap lines (*butt*, *round*, or *square*)
* **strokeMiterlimit** - to limit the length of *miter* joins
* **strokeDasharray** - a comma-separated list of dash lengths (typically in pixels)
* **strokeDashoffset** - the [stroke dash offset](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset) (typically in pixels)
* **opacity** - object opacity (a number between 0 and 1)
* **mixBlendMode** - the [blend mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode) (*e.g.*, *multiply*)
* **imageFilter** - a CSS [filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) (*e.g.*, *blur(5px)*) <VersionBadge version="0.6.7" />
* **shapeRendering** - the [shape-rendering mode](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering) (*e.g.*, *crispEdges*)
* **paintOrder** - the [paint order](https://developer.mozilla.org/en-US/docs/Web/CSS/paint-order) (*e.g.*, *stroke*)
* **dx** - horizontal offset (in pixels; defaults to 0)
* **dy** - vertical offset (in pixels; defaults to 0)
* **target** - link target (e.g., “_blank” for a new window); for use with the **href** channel
* **className** - the [class attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class), if any (defaults to null) <VersionBadge version="0.6.16" pr="1098" />
* **ariaDescription** - a textual description of the mark’s contents
* **ariaHidden** - if true, hide this content from the accessibility tree
* **pointerEvents** - the [pointer events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events) (*e.g.*, *none*)
* **clip** - whether and how to clip the mark
* **tip** - whether to generate an implicit [pointer](../interactions/pointer.md) [tip](../marks/tip.md) <VersionBadge version="0.6.7" />

If the **clip** option<a id="clip" href="#clip" aria-label="Permalink to &quot;clip&quot;"></a> is *frame* (or equivalently true), the mark is clipped to the frame’s dimensions. If the **clip** option is null (or equivalently false), the mark is not clipped. If the **clip** option is *sphere*, the mark will be clipped to the projected sphere (_e.g._, the front hemisphere when using the orthographic projection); a [geographic projection](./projections.md) is required in this case. Lastly if the **clip** option is a GeoJSON object <VersionBadge version="0.6.17" pr="2243" />, the mark will be clipped to the projected geometry.

If the **tip** option is true, a [tip mark](../marks/tip.md) with the [pointer transform](../interactions/pointer.md) will be derived from this mark and placed atop all other marks, offering details on demand. If the **tip** option is set to an options object, these options will be passed to the derived tip mark. If the **tip** option (or, if an object, its **pointer** option) is set to *x*, *y*, or *xy*, [pointerX](../interactions/pointer.md#pointerX), [pointerY](../interactions/pointer.md#pointerY), or [pointer](../interactions/pointer.md#pointer) will be used, respectively; otherwise the pointing mode will be chosen automatically. (If the **tip** mark option is truthy, the **title** channel is no longer applied using an SVG title element as this would conflict with the tip mark.)

For all marks except [text](../marks/text.md), the **dx** and **dy** options are rendered as a transform property, possibly including a 0.5px offset on low-density screens.

All marks support the following optional channels:

* **fill** - a fill color; bound to the *color* scale
* **fillOpacity** - a fill opacity; bound to the *opacity* scale
* **stroke** - a stroke color; bound to the *color* scale
* **strokeOpacity** - a stroke opacity; bound to the *opacity* scale
* **strokeWidth** - a stroke width (in pixels)
* **opacity** - an object opacity; bound to the *opacity* scale
* **title** - an accessible, short-text description (a string of text, possibly with newlines)
* **href** - a URL to link to
* **ariaLabel** - a short label representing the value in the accessibility tree

The **fill**, **fillOpacity**, **stroke**, **strokeWidth**, **strokeOpacity**, and **opacity** options can be specified as either channels or constants. When the fill or stroke is specified as a function or array, it is interpreted as a channel; when the fill or stroke is specified as a string, it is interpreted as a constant if a valid CSS color and otherwise it is interpreted as a column name for a channel. Similarly when the fill opacity, stroke opacity, object opacity, stroke width, or radius is specified as a number, it is interpreted as a constant; otherwise it is interpreted as a channel.

The scale associated with any channel can be overridden by specifying the channel as an object with a *value* property specifying the channel values and a *scale* property specifying the desired scale name or null for an unscaled channel. For example, to force the **stroke** channel to be unscaled, interpreting the associated values as literal color strings:

```js
Plot.dot(data, {stroke: {value: "fieldName", scale: null}})
```

To instead force the **stroke** channel to be bound to the *color* scale regardless of the provided values, say:

```js
Plot.dot(data, {stroke: {value: "fieldName", scale: "color"}})
```

The color channels (**fill** and **stroke**) are bound to the *color* scale by default, unless the provided values are all valid CSS color strings or nullish, in which case the values are interpreted literally and unscaled.

In addition to functions of data, arrays, and column names, channel values can be specified as an object with a *transform* method; this transform method is passed the mark’s array of data and must return the corresponding array of channel values. (Whereas a channel value specified as a function is invoked repeatedly for each element in the mark’s data, similar to *array*.map, the transform method is invoked only once being passed the entire array of data.) For example, to pass the mark’s data directly to the **x** channel, equivalent to [Plot.identity](./transforms.md#identity):

```js
Plot.dot(numbers, {x: {transform: (data) => data}})
```

The **title**, **href**, and **ariaLabel** options can *only* be specified as channels. When these options are specified as a string, the string refers to the name of a column in the mark’s associated data. If you’d like every instance of a particular mark to have the same value, specify the option as a function that returns the desired value, *e.g.* `() => "Hello, world!"`.

For marks that support the **frameAnchor** option, it may be specified as one of the four sides (*top*, *right*, *bottom*, *left*), one of the four corners (*top-left*, *top-right*, *bottom-right*, *bottom-left*), or the *middle* of the frame.

All marks support the following [transform](./transforms.md) options:

* **filter** - apply the [filter transform](../transforms/filter.md)
* **sort** - apply the [sort transform](../transforms/sort.md)
* **reverse** - apply the [reverse transform](../transforms/sort.md#reverse)
* **transform** - apply a [custom transform](./transforms.md#custom-transforms)
* **initializer** - apply a [custom initializer](./transforms.md#custom-initializers)

The **sort** option, when not specified as a channel value (such as a field name or an accessor function), can also be used to [impute ordinal scale domains](./scales.md#sort-mark-option).

### Insets

Rect-like marks support insets: a positive inset moves the respective side in (towards the opposing side), whereas a negative inset moves the respective side out (away from the opposing side). Insets are specified in pixels using the following options:

* **inset** - shorthand for all four insets
* **insetTop** - inset the top edge
* **insetRight** - inset the right edge
* **insetBottom** - inset the bottom edge
* **insetLeft** - inset the left edge

Insets default to zero. Insets are commonly used to create a one-pixel gap between adjacent bars in histograms; the [bin transform](../transforms/bin.md) provides default insets. (Note that the [band scale padding](./scales.md#position-scale-options) defaults to 0.1 as an alternative to insets.)

### Rounded corners

Rect-like marks support rounded corners. Each corner (or side) is individually addressable <VersionBadge version="0.6.16" pr="2099" /> using the following options:

* **r** - the radius for all four corners
* **rx1** - the radius for the **x1**-**y1** and **x1**-**y2** corners
* **rx2** - the radius for the **x2**-**y1** and **x2**-**y2** corners
* **ry1** - the radius for the **x1**-**y1** and **x2**-**y1** corners
* **ry2** - the radius for the **x1**-**y2** and **x2**-**y2** corners
* **rx1y1** - the radius for the **x1**-**y1** corner
* **rx1y2** - the radius for the **x1**-**y2** corner
* **rx2y1** - the radius for the **x2**-**y1** corner
* **rx2y2** - the radius for the **x2**-**y2** corner
* **rx** - the [*x*-radius](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx) for elliptical corners
* **ry** - the [*y*-radius](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/ry) for elliptical corners

Corner radii are specified in either pixels or, for **rx** and **ry**, as percentages (strings) or the keyword *auto*. If the corner radii are too big, they are reduced proportionally.

## marks(...*marks*) <VersionBadge version="0.2.0" /> {#marks}

```js
Plot.marks(
  Plot.ruleY([0]),
  Plot.areaY(data, {fill: color, fillOpacity, ...options}),
  Plot.lineY(data, {stroke: color, ...options})
)
```

A convenience method for composing a mark from a series of other marks. Returns an array of marks that implements the *mark*.plot function. See the [box mark](../marks/box.md) implementation for an example.

# docs/features/plots.md

---
prev:
  text: Getting started
  link: /getting-started
---

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as htl from "htl";
import {computed, ref, shallowRef, onMounted} from "vue";
import alphabet from "../data/alphabet.ts";

const marginTop = ref(20);
const marginRight = ref(20);
const marginBottom = ref(30);
const marginLeft = ref(40);
const fixed = ref(true);
const aapl = shallowRef([]);
const goog = shallowRef([]);
const penguins = shallowRef([]);
const stocks = computed(() => [...aapl.value.map((d) => ({...d, Symbol: "AAPL"})), ...goog.value.map((d) => ({...d, Symbol: "GOOG"}))]);

onMounted(() => {
  d3.csv("../data/aapl.csv", d3.autoType).then((data) => (aapl.value = data));
  d3.csv("../data/goog.csv", d3.autoType).then((data) => (goog.value = data));
  d3.csv("../data/penguins.csv", d3.autoType).then((data) => (penguins.value = data));
});

</script>

# Plots

To render a **plot** in Observable Plot, call [plot](#plot) (typically as `Plot.plot`), passing in the desired *options*. This function returns an SVG or HTML figure element.

:::plot https://observablehq.com/@observablehq/plot-hello-world
```js
Plot.plot({
  marks: [
    Plot.frame(),
    Plot.text(["Hello, world!"], {frameAnchor: "middle"})
  ]
})
```
:::

:::tip
The returned plot element is detached; it must be inserted into the page to be visible. For help, see the [getting started guide](../getting-started.md).
:::

## Marks option

The **marks** option specifies an array of [marks](./marks.md) to render. Above, there are two marks: a [frame](../marks/frame.md) to draw the outline of the plot frame, and a [text](../marks/text.md) to say hello. 👋

Each mark supplies its own tabular data. For example, the table below shows the first five rows of a daily dataset of Apple stock price (`aapl`).

| Date       | Open      | High      | Low       | Close     | Volume    |
| ---------- | --------: | --------: | --------: | --------: | --------: |
| 2013-05-13 | 64.501427 | 65.414284 | 64.500000 | 64.962860 |  79237200 |
| 2013-05-14 | 64.835716 | 65.028572 | 63.164288 | 63.408573 | 111779500 |
| 2013-05-15 | 62.737144 | 63.000000 | 60.337143 | 61.264286 | 185403400 |
| 2013-05-16 | 60.462856 | 62.549999 | 59.842857 | 62.082859 | 150801000 |
| 2013-05-17 | 62.721428 | 62.869999 | 61.572857 | 61.894287 | 106976100 |

In JavaScript, we can represent tabular data as an array of objects. Each object records a daily observation, with properties *Date*, *Open*, *High*, and so on. This is known as a “row-based” format since each object corresponds to a row in the table.

```js-vue
aapl = [
  {Date: new Date("2013-05-13"), Open: 64.501427, High: 65.414284, Low: 64.500000, Close: 64.962860, Volume: 79237200},
  {Date: new Date("2013-05-14"), Open: 64.835716, High: 65.028572, Low: 63.164288, Close: 63.408573, Volume: 111779500},
  {Date: new Date("2013-05-15"), Open: 62.737144, High: 63.000000, Low: 60.337143, Close: 61.264286, Volume: 185403400},
  {Date: new Date("2013-05-16"), Open: 60.462856, High: 62.549999, Low: 59.842857, Close: 62.082859, Volume: 150801000},
  {Date: new Date("2013-05-17"), Open: 62.721428, High: 62.869999, Low: 61.572857, Close: 61.894287, Volume: 106976100}
]
```

:::tip
Rather than baking data into JavaScript, use [JSON](https://en.wikipedia.org/wiki/JSON) or [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) files to store data. You can use [d3.json](https://d3js.org/d3-fetch#json), [d3.csv](https://d3js.org/d3-fetch#csv), or [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to load a file. On Observable, you can also use a [file attachment](https://observablehq.com/@observablehq/file-attachments) or [SQL cell](https://observablehq.com/@observablehq/sql-cell).
:::

To use data with Plot, pass the data as the first argument to the mark constructor. We can then assign columns of data such as *Date* and *Close* to visual properties of the mark (or “channels”) such as horizontal↔︎ position **x** and vertical↕︎ position **y**.

:::plot defer https://observablehq.com/@observablehq/plot-first-line-chart
```js
Plot.plot({
  marks: [
    Plot.lineY(aapl, {x: "Date", y: "Close"})
  ]
})
```
:::

A plot can have multiple marks, and each mark has its own data. For example, say we had a similar table `goog` representing the daily price of Google stock for the same period. Below, the <span style="border-bottom: solid 2px var(--vp-c-red);">red</span> line represents Google stock, while the <span style="border-bottom: solid 2px var(--vp-c-blue);">blue</span> line represents Apple stock.

:::plot defer https://observablehq.com/@observablehq/plot-layered-marks
```js
Plot.plot({
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(goog, {x: "Date", y: "Close", stroke: "red"}),
    Plot.lineY(aapl, {x: "Date", y: "Close", stroke: "blue"})
  ]
})
```
:::

:::tip
When comparing the performance of different stocks, we typically want to normalize the return relative to a purchase price. See the [normalize transform](../transforms/normalize.md) for an example.
:::

Alternatively, the tables can be combined, say with a *Symbol* column to distinguish AAPL from GOOG. This allows the use of a categorical *color* scale and legend.

:::plot defer https://observablehq.com/@observablehq/plot-stocks-multiline-chart
```js
Plot.plot({
  color: {legend: true},
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(stocks, {x: "Date", y: "Close", stroke: "Symbol"})
  ]
})
```
:::

Each mark has its own options, and different mark types support different options. See the respective mark type (such as [bar](../marks/bar.md) or [dot](../marks/dot.md)) for details.

Marks are drawn in the given order, with the last mark drawn on top. For example, below <span style="border-bottom: solid 2px var(--vp-c-green);">green</span> bars are drawn on top of <span style="border-bottom: solid 2px;">{{$dark ? "white" : "black"}}</span> bars.

:::plot https://observablehq.com/@observablehq/plot-marks-z-order
```js
Plot.plot({
  x: {padding: 0.4},
  marks: [
    Plot.barY(alphabet, {x: "letter", y: "frequency", dx: 2, dy: 2}),
    Plot.barY(alphabet, {x: "letter", y: "frequency", fill: "green", dx: -2, dy: -2})
  ]
})
```
:::

## Layout options

The layout options determine the overall size of the plot; all are specified as numbers in pixels:

* **marginTop** - the top margin
* **marginRight** - the right margin
* **marginBottom** - the bottom margin
* **marginLeft** - the left margin
* **margin** - shorthand for the four margins
* **width** - the outer width of the plot (including margins)
* **height** - the outer height of the plot (including margins)

Experiment with the margins by adjusting the sliders below. Note that because the *x* scale is a *band* scale, the **round** option defaults to true, so the bars may jump when you adjust the horizontal margins to snap to crisp edges.

<p>
  <label class="label-input" style="display: flex;">
    <span style="display: inline-block; width: 7em;">marginTop:</span>
    <input type="range" v-model.number="marginTop" min="0" max="60" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{marginTop}}</span>
  </label>
  <label class="label-input" style="display: flex;">
    <span style="display: inline-block; width: 7em;">marginRight:</span>
    <input type="range" v-model.number="marginRight" min="0" max="60" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{marginRight}}</span>
  </label>
  <label class="label-input" style="display: flex;">
    <span style="display: inline-block; width: 7em;">marginBottom:</span>
    <input type="range" v-model.number="marginBottom" min="0" max="60" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{marginBottom}}</span>
  </label>
  <label class="label-input" style="display: flex;">
    <span style="display: inline-block; width: 7em;">marginLeft:</span>
    <input type="range" v-model.number="marginLeft" min="0" max="60" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{marginLeft}}</span>
  </label>
</p>

:::plot hidden defer
```js
Plot.plot({
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  grid: true,
  marks: [
    Plot.frame({
      stroke: "var(--vp-c-text-2)",
      strokeOpacity: 0.5,
      insetTop: -marginTop,
      insetRight: -marginRight,
      insetBottom: -marginBottom,
      insetLeft: -marginLeft,
    }),
    Plot.barY(alphabet, {x: "letter", y: "frequency", fill: "green"}),
    Plot.frame()
  ]
})
```
:::

```js-vue
Plot.plot({
  marginTop: {{marginTop}},
  marginRight: {{marginRight}},
  marginBottom: {{marginBottom}},
  marginLeft: {{marginLeft}},
  grid: true,
  marks: [
    Plot.barY(alphabet, {x: "letter", y: "frequency", fill: "green"}),
    Plot.frame()
  ]
})
```

:::info
To assist the explanation, the plot above is drawn with a light gray border.
:::

The default **width** is 640. On Observable, the width can be set to the [standard width](https://github.com/observablehq/stdlib/blob/main/README.md#width) to make responsive plots. The default **height** is chosen automatically based on the plot’s associated scales; for example, if *y* is linear and there is no *fy* scale, it might be 396. The default margins depend on the maximum margins of the plot’s constituent [marks](#marks-option). While most marks default to zero margins (because they are drawn inside the chart area), Plot’s [axis mark](../marks/axis.md) has non-zero default margins.

:::tip
Plot does not adjust margins automatically to make room for long tick labels. If your *y* axis labels are too long, you can increase the **marginLeft** to make more room. Also consider using a different **tickFormat** for short labels (*e.g.*, `s` for SI prefix notation), or a scale **transform** (say to convert units to millions or billions).
:::

The **aspectRatio** option<a id="aspectRatio" href="#aspectRatio" aria-label="Permalink to &quot;aspectRatio&quot;"></a> <VersionBadge version="0.6.4" />, if not null, computes a default **height** such that a variation of one unit in the *x* dimension is represented by the corresponding number of pixels as a variation in the *y* dimension of one unit. The **aspectRatio** option is recommended only when *x* and *y* domains share the same units, such as millimeters. When a position scale is [ordinal](./scales.md#discrete-scales) (*point* or *band*), consecutive domain values are treated as one unit length apart; for example, if both *x* and *y* are ordinal, then an aspect ratio of one produces a square grid.

<p>
  <label class="label-input">
    Use fixed aspect ratio:
    <input type="checkbox" v-model="fixed">
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-intro-to-aspectratio
```js
Plot.plot({
  grid: true,
  inset: 10,
  aspectRatio: fixed ? 1 : undefined,
  color: {legend: true},
  marks: [
    Plot.frame(),
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", stroke: "species"})
  ]
})
```
:::

:::tip
When using facets, set the *fx* and *fy* scales’ **round** option to false if you need an exact aspect ratio.
:::

## Other options

By default, [plot](#plot) returns an SVG element; however, if the plot includes a title, subtitle, [legend](./legends.md), or caption, plot wraps the SVG element with an HTML figure element. You can also force Plot to generate a figure element by setting the **figure** option <VersionBadge version="0.6.10" pr="1761" /> to true.

The **title** & **subtitle** options <VersionBadge version="0.6.10" pr="1761" /> and the **caption** option accept either a string or an HTML element. If given an HTML element, say using the [`html` tagged template literal](http://github.com/observablehq/htl), the title and subtitle are used as-is while the caption is wrapped in a figcaption element; otherwise, the specified text will be escaped and wrapped in an h2, h3, or figcaption, respectively.

:::plot https://observablehq.com/@observablehq/plot-caption
```js
Plot.plot({
  title: "For charts, an informative title",
  subtitle: "Subtitle to follow with additional context",
  caption: "Figure 1. A chart with a title, subtitle, and caption.",
  marks: [
    Plot.frame(),
    Plot.text(["Titles, subtitles, captions, and annotations assist inter­pretation by telling the reader what’s interesting. Don’t make the reader work to find what you already know."], {lineWidth: 30, frameAnchor: "middle"})
  ]
})
```
:::

The **style** option allows custom styles to override Plot’s defaults. It may be specified either as a string of inline styles (*e.g.*, `"color: red;"`, in the same fashion as assigning [*element*.style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style)) or an object of properties (*e.g.*, `{color: "red"}`, in the same fashion as assigning [*element*.style properties](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration)). By default, the returned plot has a max-width of 100%, and the system-ui font. Plot’s marks and axes default to [currentColor](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword), meaning that they will inherit the surrounding content’s color.

:::warning CAUTION
Unitless numbers ([quirky lengths](https://www.w3.org/TR/css-values-4/#deprecated-quirky-length)) such as `{padding: 20}` are not supported by some browsers; you should instead specify a string with units such as `{padding: "20px"}`.
:::

The generated SVG element has a class name which applies a default stylesheet. Use the top-level **className** option to specify that class name.

The **clip** option <VersionBadge version="0.6.10" pr="1792" /> determines the default clipping behavior if the [mark **clip** option](./marks.md#mark-options) is not specified; set it to true to enable clipping. This option does not affect [axis](../marks/axis.md), [grid](../marks/grid.md), and [frame](../marks/frame.md) marks, whose **clip** option defaults to false.

The **document** option specifies the [document](https://developer.mozilla.org/en-US/docs/Web/API/Document) used to create plot elements. It defaults to window.document, but can be changed to another document, say when using a virtual DOM implementation for server-side rendering in Node.

## plot(*options*) {#plot}

```js
Plot.plot({
  height: 200,
  marks: [
    Plot.barY(alphabet, {x: "letter", y: "frequency"})
  ]
})
```

Renders a new plot with the specified *options*, returning a SVG or HTML figure element. This element can then be inserted into the page as described in the [getting started guide](../getting-started.md).

## *mark*.plot(*options*) {#mark_plot}

```js
Plot.barY(alphabet, {x: "letter", y: "frequency"}).plot({height: 200})
```

Given a [*mark*](./marks.md), this is a convenience shorthand for calling [plot](#plot) where the **marks** option includes this *mark*. Any additional **marks** in *options* are drawn on top of this *mark*.

## *plot*.scale(*name*) {#plot_scale}

```js
const plot = Plot.plot(options); // render a plot
const color = plot.scale("color"); // get the color scale
console.log(color.range); // inspect the scale’s range
```

Returns the [scale object](./scales.md#scale-options) for the scale with the specified *name* (such as *x* or *color*) on the given *plot*, where *plot* is a rendered plot element returned by [plot](#plot). If the associated *plot* has no scale with the given *name*, returns undefined.

## *plot*.legend(*name*, *options*) {#plot_legend}

```js
const plot = Plot.plot(options); // render a plot
const legend = plot.legend("color"); // render a color legend
```

Renders a standalone legend for the scale with the specified *name* (such as *x* or *color*) on the given *plot*, where *plot* is a rendered plot element returned by [plot](#plot), returning a SVG or HTML figure element. This element can then be inserted into the page as described in the [getting started guide](../getting-started.md). If the associated *plot* has no scale with the given *name*, returns undefined. Legends are currently only supported for *color*, *opacity*, and *symbol* scales.

# docs/features/projections.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, ref, shallowRef, onMounted} from "vue";

const longitude = ref(90);
const radius = ref(30);
const circle = computed(() => d3.geoCircle().center([9, 34]).radius(radius.value)());
const projection = ref("equirectangular");
const westport = shallowRef({type: null});
const earthquakes = shallowRef([]);
const walmarts = shallowRef([]);
const world = shallowRef(null);
const land = computed(() => world.value ? topojson.feature(world.value, world.value.objects.land) : {type: null});
const us = shallowRef(null);
const nation = computed(() => us.value ? topojson.feature(us.value, us.value.objects.nation) : {type: null});
const statemesh = computed(() => us.value ? topojson.mesh(us.value, us.value.objects.states, (a, b) => a !== b) : {type: null});

onMounted(() => {
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson").then((data) => (earthquakes.value = data.features.map((f) => ({longitude: f.geometry.coordinates[0], latitude: f.geometry.coordinates[1], magnitude: f.properties.mag}))));
  d3.json("../data/countries-110m.json").then((data) => (world.value = data));
  d3.tsv("../data/walmarts.tsv", d3.autoType).then((data) => (walmarts.value = data));
  d3.json("../data/westport-house.json").then((data) => (westport.value = data));
  d3.json("../data/us-counties-10m.json").then((data) => (us.value = data));
});

</script>

# Projections <VersionBadge version="0.6.1" />

A **projection** maps abstract coordinates in *x* and *y* to pixel positions on screen. Most often, abstract coordinates are spherical (degrees longitude and latitude), as when rendering a geographic map. For example, below we show earthquakes in the last seven days with a magnitude of 2.5 or higher as reported by the [USGS](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php). Use the slider to adjust the *orthographic* projection’s center of longitude.

<p>
  <label class="label-input">
    Longitude:
    <input type="range" v-model.number="longitude" min="-180" max="180" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{longitude}}°</span>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-earthquake-globe
```js
Plot.plot({
  projection: {type: "orthographic", rotate: [-longitude, -30]},
  r: {transform: (d) => Math.pow(10, d)}, // convert Richter to amplitude
  marks: [
    Plot.geo(land, {fill: "currentColor", fillOpacity: 0.2}),
    Plot.sphere(),
    Plot.dot(earthquakes, {x: "longitude", y: "latitude", r: "magnitude", stroke: "red", fill: "red", fillOpacity: 0.2})
  ]
})
```
:::

Above, a [geo mark](../marks/geo.md) draws polygons representing land and a [sphere mark](../marks/geo.md#sphere) draws the outline of the globe. A [dot mark](../marks/dot.md) draws earthquakes as circles sized by magnitude.

The geo mark is “projection aware” so that it can handle all the nuances of projecting spherical polygons to the screen — leaning on [d3-geo](https://d3js.org/d3-geo) to provide [adaptive sampling](https://observablehq.com/@d3/adaptive-sampling) with configurable precision, [antimeridian cutting](https://observablehq.com/@d3/antimeridian-cutting), and clipping. The dot mark is not; instead, Plot applies the projection in place of the *x* and *y* scales. Hence, projections work with any mark that consumes continuous **x** and **y** channels — as well as marks that use **x1** & **y1** and **x2** & **y2**. Each mark implementation decides whether to handle projections specially or to treat the projection as any other position scale. (For example, the [line mark](../marks/line.md) is projection-aware to draw geodesics.)

:::info
Marks that require *band* scales (bars, cells, and ticks) cannot be used with projections. Likewise one-dimensional marks such as rules cannot be used, though see [#1164](https://github.com/observablehq/plot/issues/1164).
:::

Plot provides a variety of built-in projections. And as above, all world projections can be rotated to show a different aspect.

<p>
  <label class="label-input">
    Projection:
    <select v-model="projection">
      <!-- <option>albers-usa</option> -->
      <!-- <option>albers</option> -->
      <option>azimuthal-equal-area</option>
      <option>azimuthal-equidistant</option>
      <!-- <option>conic-conformal</option> -->
      <option>conic-equal-area</option>
      <option>conic-equidistant</option>
      <option>equal-earth</option>
      <option>equirectangular</option>
      <option>gnomonic</option>
      <!-- <option>identity</option> -->
      <!-- <option>reflect-y</option> -->
      <option>mercator</option>
      <option>orthographic</option>
      <option>stereographic</option>
      <option>transverse-mercator</option>
    </select>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-world-projections
```js-vue
Plot.plot({
  projection: "{{projection}}",
  marks: [
    Plot.graticule(),
    Plot.geo(land, {fill: "currentColor"}),
    Plot.sphere()
  ]
})
```
:::

Why so many? Each projection has its strengths and weaknesses:

- _conformal_ projections preserve angles and local shape,
- _equal-area_ projections preserve area (use these for choropleths),
- _equidistant_ projections preserve distance from one (or two) points,
- _azimuthal_ projections expand radially from a central feature,
- _cylindrical_ projections have symmetry around the axis of rotation,
- the _stereographic_ projection preserves circles, and
- the _gnomonic_ projection displays all great circles as straight lines!

No single projection is best at everything. It is impossible, for example, for a projection to be both conformal and equal-area.

In addition to world projections, Plot provides the U.S.-centric *albers-usa* conic equal-area projection with an inset of Alaska and Hawaii. (Note that the scale for Alaska is diminished: it is projected at 0.35× its true relative area.)

:::plot defer https://observablehq.com/@observablehq/plot-albers-usa-projection
```js
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(nation),
    Plot.geo(statemesh, {strokeOpacity: 0.2})
  ]
})
```
:::

:::tip
Use the *albers-usa* projection for U.S.-centric choropleth maps.
:::

For maps that focus on a specific region, use the **domain** option to zoom in. This object should be a GeoJSON object. For example, you can use [d3.geoCircle](https://d3js.org/d3-geo/shape#geoCircle) to generate a circle of a given radius centered at a given longitude and latitude. You can also use the **inset** options for a bit of padding around the **domain**.

<p>
  <label class="label-input">
    Radius:
    <input type="range" v-model.number="radius" min="10" max="50" step="0.1">
    <span style="font-variant-numeric: tabular-nums;">{{radius.toFixed(1)}}°</span>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-projection-domain
```js
Plot.plot({
  projection: {
    type: "azimuthal-equidistant",
    rotate: [-9, -34],
    domain: circle,
    inset: 10
  },
  marks: [
    Plot.graticule(),
    Plot.geo(land, {fill: "currentColor", fillOpacity: 0.3}),
    Plot.geo(circle, {stroke: "red", strokeWidth: 2}),
    Plot.frame()
  ]
})
```

```js
circle = d3.geoCircle().center([9, 34]).radius(radius)()
```

If none of Plot’s built-in projections meet your needs, you can use any of [D3’s extended projections](https://github.com/d3/d3-geo-projection) by specifying the **projection** option as a function that returns a D3 projection. Below, a map of Antarctica in a polar aspect of the *azimuthal-equidistant* projection.

:::plot defer https://observablehq.com/@observablehq/plot-polar-projection
```js
Plot.plot({
  width: 688,
  height: 688,
  projection: ({width, height}) => d3.geoAzimuthalEquidistant()
    .rotate([0, 90])
    .translate([width / 2, height / 2])
    .scale(width)
    .clipAngle(40),
  marks: [
    Plot.graticule(),
    Plot.geo(land, {fill: "currentColor"}),
    Plot.frame()
  ]
})
```
:::

While this notebook mostly details spherical projections, you can use the *identity* projection to display planar geometry. For example, below we draw a schematic of the second floor of the [Westport House](https://en.wikipedia.org/wiki/Westport_House) in Dundee, Ireland.

:::plot defer https://observablehq.com/@observablehq/plot-floor-plan
```js
Plot.geo(westport).plot({projection: {type: "identity", domain: westport}})
```
:::

:::tip
There’s also a *reflect-y* projection in case *y* points up↑, which is often the case with [projected reference systems](https://en.wikipedia.org/wiki/Projected_coordinate_system).
:::

Naturally, Plot’s projection system is compatible with its [faceting system](./facets.md). Below, a comic strip of sorts shows the locations of Walmart store openings in past decades.

:::plot defer https://observablehq.com/@observablehq/plot-map-small-multiples
```js
Plot.plot({
  marginLeft: 0,
  marginRight: 0,
  projection: "albers",
  fx: {
    interval: "10 years",
    tickFormat: (d) => `${d.getUTCFullYear()}’s`,
    label: null
  },
  marks: [
    Plot.geo(statemesh, {strokeOpacity: 0.1}),
    Plot.geo(nation),
    Plot.dot(walmarts, {fx: "date", x: "longitude", y: "latitude", r: 1, fill: "currentColor"})
  ]
})
```
:::

:::info
This uses the [**interval** scale option](./scales.md#scale-transforms) to bin temporal data into facets by decade.
:::

To learn more about mapping with Plot, see our hands-on tutorials:

* [Build your first map with Observable Plot](https://observablehq.com/@observablehq/build-your-first-map-with-observable-plot)
* [Build your first choropleth map with Observable Plot](https://observablehq.com/@observablehq/build-your-first-choropleth-map-with-observable-plot)

## Projection options

The **projection** [plot option](./plots.md) applies a two-dimensional (often geographic) projection in place of **x** and **y** scales. It is typically used in conjunction with a [geo mark](../marks/geo.md) to produce a map, but can be used with any mark that supports **x** and **y** channels, such as [dot](../marks/dot.md), [text](../marks/text.md), [arrow](../marks/arrow.md), and [rect](../marks/rect.md). For marks that use **x1**, **y1**, **x2**, and **y2** channels, the two projected points are ⟨*x1*, *y1*⟩ and ⟨*x2*, *y2*⟩; otherwise, the projected point is ⟨*x*, *y*⟩.

The following built-in named projections are supported:

* *equirectangular* - the equirectangular, or *plate carrée*, projection
* *orthographic* - the orthographic projection
* *stereographic* - the stereographic projection
* *mercator* - the Mercator projection
* *equal-earth* - the [Equal Earth projection](https://en.wikipedia.org/wiki/Equal_Earth_projection) by Šavrič *et al.*
* *azimuthal-equal-area* - the azimuthal equal-area projection
* *azimuthal-equidistant* - the azimuthal equidistant projection
* *conic-conformal* - the conic conformal projection
* *conic-equal-area* - the conic equal-area projection
* *conic-equidistant* - the conic equidistant projection
* *gnomonic* - the gnomonic projection
* *transverse-mercator* - the transverse Mercator projection
* *albers* - the Albers’ conic equal-area projection
* *albers-usa* - a composite Albers conic equal-area projection suitable for the United States
* *identity* - the identity projection for planar geometry
* *reflect-y* - like the identity projection, but *y* points up
* null (default) - the null projection for pre-projected geometry in screen coordinates

In addition to these named projections, the **projection** option may be specified as a [D3 projection](https://d3js.org/d3-geo/projection), or any custom projection that implements [*projection*.stream](https://d3js.org/d3-geo/stream), or a function that receives a configuration object ({*width*, *height*, ...*options*}) and returns such a projection. In the last case, the width and height represent the frame dimensions minus any insets.

If the **projection** option is specified as an object, the following additional projection options are supported:

* **type** - one of the projection names above
* **parallels** - the [standard parallels](https://d3js.org/d3-geo/conic#conic_parallels) (for conic projections only)
* **precision** - the [sampling threshold](https://d3js.org/d3-geo/projection#projection_precision)
* **rotate** - a two- or three- element array of Euler angles to rotate the sphere
* **domain** - a GeoJSON object to fit in the center of the (inset) frame
* **inset** - inset by the given amount in pixels when fitting to the frame (default zero)
* **insetLeft** - inset from the left edge of the frame (defaults to inset)
* **insetRight** - inset from the right edge of the frame (defaults to inset)
* **insetTop** - inset from the top edge of the frame (defaults to inset)
* **insetBottom** - inset from the bottom edge of the frame (defaults to inset)
* **clip** - the projection clipping method

The following projection clipping methods are supported for **clip**:

* *frame* or true (default) - clip to the extent of the frame (including margins but not insets)
* a number - clip to a great circle of the given radius in degrees centered around the origin
* null or false - do not clip

Whereas the **clip** [mark option](./marks.md#mark-options) is implemented using SVG clipping, the **clip** projection option affects the generated geometry and typically produces smaller SVG output.

# docs/features/scales.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref, shallowRef, onMounted} from "vue";
import gistemp from "../data/gistemp.ts";

const intervaled = ref(true);
const padding = ref(0.1);
const align = ref(0.5);
const radius = ref(8);
const schemeq = ref("turbo");
const schemed = ref("rdbu");
const schemeo = ref("Observable10");
const interpolateq = ref("rgb");
const anomaly = gistemp.map((d) => d.Anomaly);
const aapl = shallowRef([]);
const goog = shallowRef([]);
const sftemp = shallowRef([]);

onMounted(() => {
  d3.csv("../data/aapl.csv", d3.autoType).then((data) => (aapl.value = data));
  d3.csv("../data/goog.csv", d3.autoType).then((data) => (goog.value = data));
  d3.csv("../data/sf-temperatures.csv", d3.autoType).then((data) => (sftemp.value = data));
});

</script>

# Scales

**Scales** convert an abstract value such as time or temperature to a visual value such as *x*→ or *y*↑ position or color. For example, say we have a dataset (`gistemp`) containing monthly observations of [global average surface temperature](https://data.giss.nasa.gov/gistemp/) from 1880 to 2016, represented as the “anomaly” (or difference) relative to the 1951–1980 average. The first few rows are:

| Date       | Anomaly |
|------------|--------:|
| 1880-01-01 | -0.3    |
| 1880-02-01 | -0.21   |
| 1880-03-01 | -0.18   |
| 1880-04-01 | -0.27   |
| 1880-05-01 | -0.14   |
| 1880-06-01 | -0.29   |

When visualizing this data with a [line](../marks/line.md), the *x* scale is responsible for mapping dates to horizontal↔︎ positions. For example, 1880-01-01 might be mapped to *x* = 40 (on the left) and 2016-12-01 might be mapped to *x* = 620 (on the right). Likewise, the *y* scale maps temperature anomalies to vertical↕︎ positions.

:::plot https://observablehq.com/@observablehq/plot-scales-intro
```js
Plot.lineY(gistemp, {x: "Date", y: "Anomaly"}).plot()
```
:::

In Plot, the [mark](./marks.md) binds channels to scales; for example, the line’s **x** channel is bound to the *x* scale. The channel name and the scale name are often the same, but not always; for example, an area’s **y1** and **y2** channels are both bound to the *y* scale. (You can opt-out of a scale for a particular channel using [scale overrides](./marks.md#mark-options) if needed.)

Think of a scale as a function that takes an abstract value and returns the corresponding visual value. For the *y* scale above, that might look like this:

```js
function y(anomaly) {
  const t = (anomaly - minAnomaly) / (maxAnomaly - minAnomaly); // t in [0, 1]
  return height - marginBottom - t * (height - marginTop - marginBottom);
}
```

The function `y` depends on a few additional details: the chart’s size and margins, and the minimum and maximum temperatures in the data:

```js
const marginTop = 20;
const marginBottom = 30;
const height = 400;
const minAnomaly = d3.min(gistemp, (d) => d.Anomaly);
const maxAnomaly = d3.max(gistemp, (d) => d.Anomaly);
```

Scales aren’t limited to horizontal and vertical position. They can also output to color, radius, length, opacity, and more. For example if we switch to a [rule](../marks/rule.md) and use the **stroke** channel instead of **y**, we get a one-dimensional heatmap:

:::plot https://observablehq.com/@observablehq/plot-scales-intro
```js
Plot.ruleX(gistemp, {x: "Date", stroke: "Anomaly"}).plot()
```
:::

While the resulting chart looks different, the *color* scale here behaves similarly to the `y` function above — the only difference is that it interpolates colors (using [d3.interpolateTurbo](https://d3js.org/d3-scale-chromatic/sequential#interpolateTurbo)) instead of numbers (the top and bottom sides of the plot frame):

```js
function color(anomaly) {
  const t = (anomaly - minAnomaly) / (maxAnomaly - minAnomaly); // t in [0, 1]
  return d3.interpolateTurbo(t);
}
```

Within a given [plot](./plots.md), marks share scales. For example, if a plot has two line marks, such as the lines below visualizing the daily closing price of <span style="border-bottom: solid 2px var(--vp-c-red);">Google</span> and <span style="border-bottom: solid 2px var(--vp-c-blue);">Apple</span> stock, both share the same *x* and *y* scales for a consistent encoding.

:::plot defer https://observablehq.com/@observablehq/plot-layered-marks
```js
Plot.plot({
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(goog, {x: "Date", y: "Close", stroke: "red"}),
    Plot.lineY(aapl, {x: "Date", y: "Close", stroke: "blue"})
  ]
})
```
:::

:::tip
When comparing the performance of different stocks, we typically want to normalize the return relative to a purchase price; see the [normalize transform](../transforms/normalize.md) for an example. Also, not that we recommend them, but if you are interested in dual-axis charts, please upvote [#147](https://github.com/observablehq/plot/issues/147).
:::

Plot has many different scales; we categorize them by their _input_ (**domain**) and _output_ (**range**).

The **domain** is the abstract values that the scale expects as input. For quantitative or temporal data, it is typically expressed as an extent such as [*start*, *end*], [*cold*, *hot*], or [*min*, *max*]. For ordinal or nominal data, it is an array of values such as names or categories. The type of input values corresponds to the **type** scale option (_e.g._, *linear* or *ordinal*).

The **range** is the visual values that the scale generates as output. For position scales, it is typically an extent such as [*left*, *right*] or [*bottom*, *top*]; for color scales, it might be a continuous extent [*blue*, *red*] or an array of discrete colors. The type of values that a scale outputs corresponds to the *name* of the scale (_e.g._, *x* or *color*).

<!-- Position, color, radius, length, angle. In many cases this is just what the underlying interpolator is. For position, the output is a number, so we interpolate from the left to the right side. Whereas for color, the output is a color, we need a color space such as RGB or LCh to interpolate, or a fixed color ramp such as *turbo*.  -->

<!-- There are also some special transforms we can apply as part of the visual encoding. For example, continuous transforms such as log and sqrt. And sometimes converting continuous values into discrete values, with quantile, quantize, threshold. The latter transforms especially are usually for color. -->

Let’s look at some examples to make this less abstract.

## Continuous scales

The domain of a quantitative scale is a continuous extent [*min*, *max*] where *min* and *max* are numbers, such as temperatures. Below, the first domain value (*x* = 0) corresponds to the left side of the plot while the second (*x* = 100) corresponds to the right side.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales
```js
Plot.plot({x: {domain: [0, 100], grid: true}})
```
:::

Flipping the domain reverses the scale so that +*x* points ←left instead of right→.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales
```js
Plot.plot({x: {domain: [100, 0], grid: true}})
```
:::

Alternatively, use the **reverse** option; this is convenient when the domain is implied from data rather than specified explicitly.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales
```js
Plot.plot({x: {domain: [0, 100], reverse: true, grid: true}})
```
:::

If the domain is dates, Plot will default to a UTC scale. This is a linear scale with ticks based on the Gregorian calendar.

<!-- Plot doesn’t parse dates; convert your strings to [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) instances with [d3.utcParse](https://d3js.org/d3-time-format#utcParse) or [d3.autoType](https://d3js.org/d3-dsv#autoType). -->

:::plot https://observablehq.com/@observablehq/plot-continuous-scales
```js
Plot.plot({x: {domain: [new Date("2021-01-01"), new Date("2022-01-01")], grid: true}})
```
:::

To force a UTC scale, say when the data is milliseconds since UNIX epoch rather than Date instances, pass *utc* as the **type** option. Though we recommend coercing strings and numbers to more specific types when you load data, rather than relying on scales to do it.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales
```js
Plot.plot({x: {type: "utc", domain: [1609459200000, 1640995200000], grid: true}})
```
:::

If the scale **type** is *time*, the ticks will be in local time — as with the dates below — rather than UTC.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales
```js
Plot.plot({x: {type: "time", domain: [new Date(2021, 0, 1), new Date(2022, 0, 1)], grid: true}})
```
:::

When plotting values that vary widely, such as the luminosity of stars in an [HR diagram](https://observablehq.com/@mbostock/hertzsprung-russell-diagram), a *log* scale may improve readability. Log scales default to base-10 ticks with SI-prefix notation.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales
```js
Plot.plot({x: {type: "log", domain: [1e0, 1e5], grid: true}})
```
:::

If you prefer conventional notation, you can specify the **tickFormat** option to change the behavior of the axis. The **tickFormat** option can either be a [d3.format](https://d3js.org/d3-format) string or a function that takes a tick value and returns the corresponding string. Note, however, that this may result in overlapping text.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales
```js
Plot.plot({x: {type: "log", domain: [1e0, 1e5], tickFormat: ",", grid: true}})
```
:::

Log scales also support a **base** option, say for powers of two. This does not affect the scale’s encoding, but it does change where ticks are shown.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales
```js
Plot.plot({x: {type: "log", base: 2, domain: [1e0, 1e4], ticks: 20, grid: true}})
```
:::

The domain of a log scale cannot include (or cross) zero; for this, consider a [bi-symmetric log](https://d3js.org/d3-scale/symlog) scale instead.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales
```js
Plot.plot({x: {type: "symlog", domain: [-10, 10], grid: true}})
```
:::

Power scales and square-root scales are also supported. The *pow* scale supports the **exponent** option, which defaults to 1 (for a linear scale). The *sqrt* scale is shorthand for a *pow* scale with exponent 0.5.

:::plot https://observablehq.com/@observablehq/plot-continuous-scales
```js
Plot.plot({x: {type: "sqrt", domain: [0, 100], grid: true}})
```
:::

:::plot https://observablehq.com/@observablehq/plot-continuous-scales
```js
Plot.plot({x: {type: "pow", exponent: 1 / 3, domain: [0, 100], grid: true}})
```
:::

Continuous scales also support a **clamp** option which, if true, clamps input values to the scale’s domain before scaling. This is useful for preventing marks from escaping the chart area.

Continuous scales support an **interpolate** option specified either as a function that takes a single argument *t* in [0, 1] and returns the corresponding value from the **range**, or as a two-argument function that takes a pair of values [*start*, *end*] from the range and returns the corresponding interpolator from [0, 1], typically mapping 0 to *start*, and 1 to *end*.

Continuous scales support a piecewise **domain** specified as an array of _n_ domain values (with _n_ greater than or equal to two), with a corresponding **range** having the same number of values; each segment of the domain is mapped to the matching segment of the range using the scale’s interpolator. When the domain has *n*&nbsp;&gt;&nbsp;2 elements and the range has two elements (for example, when using the default range on a *x* or *y* scale), the latter is automatically split into _n_&nbsp;&minus;&nbsp;1 segments of equal size. Note that in addition to the domain, you must specify the scale’s continuous **type** since a scale specified with a domain having more than two elements otherwise defaults to an ordinal scale. (You will often have to specify the **ticks** manually, too.) For an example, see the [Polylinear axis](https://observablehq.com/@observablehq/polylinear-axis) notebook.

## Discrete scales

Sadly, not all data is continuous: some data is merely ordinal, such as t-shirt sizes; and some categorical (*a.k.a.* nominal), such as brands of clothing. To encode such data as position, a *point* or *band* scale is required.

A *point* scale divides space into uniformly-spaced discrete values. It is commonly used for scatterplots (a [dot mark](../marks/dot.md)) of ordinal data. It is the default scale type for ordinal data on the *x* and *y* scale.

:::plot https://observablehq.com/@observablehq/plot-discrete-scales
```js
Plot.plot({x: {type: "point", domain: "ABCDEFGHIJ", grid: true}})
```
:::

A band scale divides space into uniformly-spaced and -sized discrete intervals. It is commonly used for bar charts (bar marks). To show the bands below, we use a [cell](../marks/cell.md) instead of a [grid](../marks/grid.md).

:::plot https://observablehq.com/@observablehq/plot-discrete-scales
```js
Plot
  .cell("ABCDEFGHIJ", {x: Plot.identity, stroke: "currentColor", strokeOpacity: 0.1})
  .plot({x: {type: "band", domain: "ABCDEFGHIJ"}})
```
:::

While *point* and *band* scales appear visually similar when only the grid is visible, the two are not identical — they differ respective to padding. Play with the options below to get a sense of their effect on the scale’s behavior.

<p>
  <label class="label-input">
    <span>Padding:</span>
    <input type="range" v-model.number="padding" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{padding.toFixed(2)}}</span>
  </label>
  <label class="label-input">
    <span>Align:</span>
    <input type="range" v-model.number="align" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{align.toFixed(2)}}</span>
  </label>
</p>

:::plot hidden https://observablehq.com/@observablehq/plot-discrete-scales
```js
Plot.plot({
  grid: true,
  marginTop: 0.5,
  x: {
    padding,
    align,
    round: false
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.tickX("ABCDEFGHIJ", {x: Plot.identity, stroke: "currentColor"})
  ]
})
```
:::

:::plot hidden https://observablehq.com/@observablehq/plot-discrete-scales
```js
Plot.plot({
  grid: true,
  marginTop: 0.5,
  x: {
    padding,
    align,
    round: false
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.cell("ABCDEFGHIJ", {x: Plot.identity, stroke: "currentColor"})
  ]
})
```
:::

Position scales also have a **round** option which forces the scale to snap to integer pixels. This defaults to true for point and band scales, and false for quantitative scales. Use caution with high-cardinality ordinal domains (*i.e.*, a point or band scale used to encode many different values), as rounding can lead to “wasted” space or even zero-width bands.

## Color scales

While position is the most salient (and important) encoding, color matters too! The default quantitative color scale **type** is *linear*, and the default **scheme** is [*turbo*](https://ai.googleblog.com/2019/08/turbo-improved-rainbow-colormap-for.html). A wide variety of sequential, diverging, and cyclical schemes are supported, including ColorBrewer and [*viridis*](http://bids.github.io/colormap/).

<p>
  <label class="label-input">
    Color scheme:
    <select v-model="schemeq">
      <optgroup label="sequential, single-hue">
        <option value="blues">Blues</option>
        <option value="greens">Greens</option>
        <option value="greys">Greys</option>
        <option value="purples">Purples</option>
        <option value="reds">Reds</option>
        <option value="oranges">Oranges</option>
      </optgroup>
      <optgroup label="sequential, multi-hue">
        <option value="turbo" selected>Turbo</option>
        <option value="viridis">Viridis</option>
        <option value="magma">Magma</option>
        <option value="inferno">Inferno</option>
        <option value="plasma">Plasma</option>
        <option value="cividis">Cividis</option>
        <option value="cubehelix">Cubehelix</option>
        <option value="warm">Warm</option>
        <option value="cool">Cool</option>
        <option value="bugn">BuGn</option>
        <option value="bupu">BuPu</option>
        <option value="gnbu">GnBu</option>
        <option value="orrd">OrRd</option>
        <option value="pubugn">PuBuGn</option>
        <option value="pubu">PuBu</option>
        <option value="purd">PuRd</option>
        <option value="rdpu">RdPu</option>
        <option value="ylgnbu">YlGnBu</option>
        <option value="ylgn">YlGn</option>
        <option value="ylorbr">YlOrBr</option>
        <option value="ylorrd">YlOrRd</option>
      </optgroup>
      <optgroup label="cyclical">
        <option value="rainbow">Rainbow</option>
        <option value="sinebow">Sinebow</option>
      </optgroup>
    </select>
  </label>
</p>

:::plot hidden
```js
Plot.plot({
  axis: null,
  padding: 0,
  color: {
    scheme: schemeq
  },
  marks: [
    Plot.cell(d3.range(40), {x: Plot.identity, fill: Plot.identity, inset: -0.5})
  ]
})
```
:::

You can implement a custom color scheme by specifying the scale’s **range**, or by passing an **interpolate** function that takes a parameter *t* in [0, 1]. The **interpolate** option can specify a color space such as *rgb*, or a two-argument function that takes a pair of values from the range.

<p>
  <label class="label-input">
    Color interpolate:
    <select v-model="interpolateq">
      <option value="rgb">rgb</option>
      <option value="lab">lab</option>
      <option value="hcl">hcl</option>
      <option value="hsl">hsl</option>
      <option value="rgb-gamma">d3.interpolateRgb.gamma(2)</option>
      <option value="angry-rainbow">(t) => `hsl(${t * 360},100%,50%)`</option>
    </select>
  </label>
</p>

:::plot hidden
```js
Plot.plot({
  axis: null,
  padding: 0,
  color: {
    type: "linear",
    ...interpolateq === "angry-rainbow"
      ? {interpolate: (t) => `hsl(${t * 360},100%,50%)`}
      : interpolateq === "rgb-gamma"
      ? {range: ["steelblue", "orange"], interpolate: d3.interpolateRgb.gamma(2)}
      : {range: ["steelblue", "orange"], interpolate: interpolateq}
  },
  marks: [
    Plot.cell(d3.range(40), {x: Plot.identity, fill: Plot.identity, inset: -0.5})
  ]
})
```
:::

And like position scales, you can apply a *sqrt*, *pow*, *log*, or *symlog* transform; these are often useful when working with non-uniformly distributed data.

Diverging color scales are intended to show positive and negative values, or more generally values above or below some **pivot** value. Diverging color scales default to the *RdBu* (red–blue) color scheme. The pivot defaults to zero, but you can change it with the **pivot** option, which should ideally be a value near the middle of the domain.

<p>
  <label class="label-input">
    Color scheme:
    <select v-model="schemed">
      <optgroup label="diverging">
        <option value="brbg">BrBG</option>
        <option value="prgn">PRGn</option>
        <option value="piyg">PiYG</option>
        <option value="puor">PuOr</option>
        <option value="rdbu">RdBu</option>
        <option value="rdgy">RdGy</option>
        <option value="rdylbu">RdYlBu</option>
        <option value="rdylgn">RdYlGn</option>
        <option value="spectral">Spectral</option>
        <option value="burd">BuRd</option>
        <option value="buylrd">BuYlRd</option>
      </optgroup>
    </select>
  </label>
</p>

:::plot hidden
```js
Plot.plot({
  axis: null,
  padding: 0,
  color: {
    type: "linear",
    scheme: schemed
  },
  marks: [
    Plot.cell(d3.range(40), {x: Plot.identity, fill: Plot.identity, inset: -0.5})
  ]
})
```
:::

Below we again show observed global surface temperatures. The reversed *BuRd* color scheme is used since <span :style="{borderBottom: `solid 2px ${d3.interpolateRdBu(0.9)}`}">blue</span> and <span :style="{borderBottom: `solid 2px ${d3.interpolateRdBu(0.1)}`}">red</span> are semantically associated with cold and hot, respectively.

:::plot https://observablehq.com/@observablehq/plot-diverging-color-scatterplot
```js
Plot.plot({
  grid: true,
  color: {
    type: "diverging",
    scheme: "BuRd"
  },
  marks: [
    Plot.ruleY([0]),
    Plot.dot(gistemp, {x: "Date", y: "Anomaly", stroke: "Anomaly"})
  ]
})
```
:::

Plot also provides color schemes for discrete data. Use the *categorical* type for categorical (nominal) unordered data, and the *ordinal* type for ordered data.

<p>
  <label class="label-input">
    Color scheme:
    <select v-model="schemeo">
      <optgroup label="categorical">
        <option>Accent</option>
        <option>Category10</option>
        <option>Dark2</option>
        <option>Observable10</option>
        <option>Paired</option>
        <option>Pastel1</option>
        <option>Pastel2</option>
        <option>Set1</option>
        <option>Set2</option>
        <option>Set3</option>
        <option>Tableau10</option>
      </optgroup>
      <optgroup label="sequential, single-hue">
        <option value="blues">Blues</option>
        <option value="greens">Greens</option>
        <option value="greys">Greys</option>
        <option value="purples">Purples</option>
        <option value="reds">Reds</option>
        <option value="oranges">Oranges</option>
      </optgroup>
      <optgroup label="sequential, multi-hue">
        <option value="turbo" selected>Turbo</option>
        <option value="viridis">Viridis</option>
        <option value="magma">Magma</option>
        <option value="inferno">Inferno</option>
        <option value="plasma">Plasma</option>
        <option value="cividis">Cividis</option>
        <option value="cubehelix">Cubehelix</option>
        <option value="warm">Warm</option>
        <option value="cool">Cool</option>
        <option value="bugn">BuGn</option>
        <option value="bupu">BuPu</option>
        <option value="gnbu">GnBu</option>
        <option value="orrd">OrRd</option>
        <option value="pubugn">PuBuGn</option>
        <option value="pubu">PuBu</option>
        <option value="purd">PuRd</option>
        <option value="rdpu">RdPu</option>
        <option value="ylgnbu">YlGnBu</option>
        <option value="ylgn">YlGn</option>
        <option value="ylorbr">YlOrBr</option>
        <option value="ylorrd">YlOrRd</option>
      </optgroup>
      <optgroup label="cyclical">
        <option value="rainbow">Rainbow</option>
        <option value="sinebow">Sinebow</option>
      </optgroup>
    </select>
  </label>
</p>

:::plot hidden
```js
Plot.plot({
  color: {
    type: "ordinal",
    scheme: schemeo
  },
  marks: [
    Plot.cell("ABCDEFGHIJ", {x: Plot.identity, fill: Plot.identity})
  ]
})
```
:::

:::warning CAUTION
Discrete color schemes are intended for data that has only a few unique values. If the size of the categorical domain exceeds the number of colors in the scheme, colors will be reused; combining values into an “other” category is recommended.
:::

## Other scales

But wait, there’s more! 😅 Plot has *opacity*, *r*, *symbol*, and *length* scales, too. For example, the *r* scale **type** defaults to *sqrt* such that when used with the [dot mark](../marks/dot.md), the resulting area is proportional to the **r** channel value. You can adjust the effective dot size by specifying an explicit **range**, as below.

<p>
  <label class="label-input">
    Radius:
    <input type="range" v-model.number="radius" min="1" max="20" step="0.1">
    <span style="font-variant-numeric: tabular-nums;">{{radius.toFixed(1)}}</span>
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-radius-scale-range
```js
Plot.plot({
  r: {range: [0, radius]},
  marks: [
    Plot.dot(d3.range(1, 11), {x: Plot.identity, r: Plot.identity, fill: "currentColor"})
  ]
})
```
:::

The default **range** for the associated *r* scale is constructed such that a zero value maps to zero for an accurate areal encoding, while the first quartile of values is mapped to a radius of three pixels; this tends to be more stable with varying data.

## Type inference

Plot strives to be concise: rather than you laboriously specifying everything, Plot can guess by inspecting the data so you don’t have to set the **type**, **domain**, and **range** (and for color, **scheme**) of scales explicitly. But for Plot’s guesses to be accurate, your data must match Plot’s expectations. Here they are.

A scale’s **type** is most often inferred from associated marks’ channel values: strings and booleans imply an *ordinal* scale; dates imply a *utc* scale; anything else is *linear*. Plot assumes that your data is consistently typed, so inference is based solely on the first non-null, non-undefined value. We recommend typed CSV (passing `{typed: true}` to Observable’s FileAttachment csv method) or explicitly coercing types when loading data (*e.g.*, d3.autoType).

If a scale’s **domain** is specified explicitly, the scale’s **type** is inferred from the **domain** values rather than channels as described above. However, if the **domain** or **range** has more than two elements, the *ordinal* type (or *point* for position scales) is used.

Finally, some marks declare the scale **type** for associated channels. For example, [barX](../marks/bar.md) requires *y* to be a *band* scale. Further, the facet scales *fx* and *fy* are always *band* scales, and the *r* (radius) scale is implicitly a *sqrt* scale.

If you don’t specify a quantitative scale’s **domain**, it is the extent (minimum and maximum) of associated channel values, except for the *r* (radius) scale where it goes from zero to the maximum. A quantitative domain can be extended to “nice” human-readable values with the **nice** option. For an ordinal scale, the domain defaults to the sorted union (all distinct values in natural order) of associated values; see the [**sort** mark option](#sort-mark-option) to change the order.

All position scales (*x*, *y*, *fx*, and *fy*) have implicit automatic ranges based on the chart dimensions. The *x* scale ranges from the left to right edge, while the *y* scale ranges from the bottom to top edge, accounting for margins.

## Scale transforms

The **transform** scale option allows you to apply a function to all values before they are passed through the scale. This is convenient for transforming a scale’s data, say to convert to thousands or between temperature units.

:::plot defer https://observablehq.com/@observablehq/plot-fahrenheit-to-celsius-scale-transform
```js{5}
Plot.plot({
  y: {
    grid: true,
    label: "Temperature (°C)",
    transform: (f) => (f - 32) * (5 / 9) // convert Fahrenheit to Celsius
  },
  marks: [
    Plot.ruleY([32]), // 32°F
    Plot.lineY(sftemp, Plot.windowY(7, {x: "date", y: "high"}))
  ]
})
```
:::

The **percent** scale option is shorthand for a **transform** that multiplies values by 100; it also adds a percent symbol (%) to the default label.

:::plot https://observablehq.com/@observablehq/plot-percent-scale-transform
```js{2}
Plot.plot({
  y: {percent: true}, // convert proportion [0, 1] to percent [0, 100]
  color: {scheme: "BuRd"},
  marks: [
    Plot.rectY(gistemp, Plot.binX({y: "proportion", fill: "x"}, {x: "Anomaly", fill: "Anomaly"})),
    Plot.ruleY([0])
  ]
})
```
:::

:::warning CAUTION
[Mark transforms](./transforms.md) typically consume values *before* they are passed through scales (_e.g._, when binning). In this case the mark transforms will see the values prior to the scale transform as input, and the scale transform will apply to the *output* of the mark transform.
:::

The **interval** scale option<a id="interval" href="#interval" aria-label="Permalink to &quot;interval&quot;"></a> <VersionBadge version="0.5.1" /> sets an ordinal scale’s **domain** to the start of every interval within the extent of the data. In addition, it implicitly sets the **transform** of the scale to *interval*.floor, rounding values down to the start of each interval. For example, below we generate a time-series bar chart; when an **interval** is specified, missing days are visible.

<p>
  <label class="label-input">
    Use interval:
    <input type="checkbox" v-model="intervaled">
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-band-scale-interval
```js
Plot.plot({
  marginBottom: 80,
  x: {
    tickRotate: -90,
    interval: intervaled ? "day" : null,
    label: null
  },
  y: {
    transform: (d) => d / 1e6,
    label: "Daily trade volume (millions)"
  },
  marks: [
    Plot.barY(aapl.slice(-40), {x: "Date", y: "Volume"}),
    Plot.ruleY([0])
  ]
})
```
:::

:::tip
As an added bonus, the **fontVariant** and **type** options are no longer needed because Plot now understands that the *x* scale, despite being *ordinal*, represents daily observations.
:::

While the example above relies on the **interval** being promoted to the scale’s **transform**, the [stack](../transforms/stack.md), [bin](../transforms/bin.md), and [group](../transforms/group.md) transforms are also interval-aware: they apply the scale’s **interval**, if any, *before* grouping values. (This results in the interval being applied twice, both before and after the mark transform, but the second application has no effect since interval application is idempotent.)

The **interval** option can also be used for quantitative and temporal scales. This enforces uniformity, say rounding timed observations down to the nearest hour, which may be helpful for the [stack transform](../transforms/stack.md) among other uses.

## Scale options

Each scale’s options are specified as a nested options object with the corresponding scale name within the top-level [plot options](./plots.md):

* **x** - horizontal position
* **y** - vertical position
* **r** - radius (size)
* **color** - fill or stroke
* **opacity** - fill or stroke opacity
* **length** - linear length (for [vectors](../marks/vector.md))
* **symbol** - categorical symbol (for [dots](../marks/dot.md))

For example, to set the domain for the *x* scale:

:::plot
```js
Plot.plot({x: {domain: [new Date("1880-01-01"), new Date("2016-11-01")]}})
```
:::

Plot supports many scale types. Some scale types are for quantitative data: values that can be added or subtracted, such as temperature or time. Other scale types are for ordinal or categorical data: unquantifiable values that can only be ordered, such as t-shirt sizes, or values with no inherent order that can only be tested for equality, such as types of fruit. Some scale types are further intended for specific visual encodings: for example, as position or color.

You can set the scale type explicitly via the **type** scale option, though typically the scale type is inferred automatically. Some marks mandate a particular scale type: for example, [barY](../marks/bar.md) requires that the *x* scale is a *band* scale. Some scales have a default type: for example, the *r* (radius) scale defaults to *sqrt* and the *opacity* scale defaults to *linear*. Most often, the scale type is inferred from associated data, pulled either from the domain (if specified) or from associated channels. Strings and booleans imply an ordinal scale; dates imply a UTC scale; and anything else is linear. Unless they represent text, we recommend explicitly converting strings to more specific types when loading data (*e.g.*, with d3.autoType or Observable’s FileAttachment). For simplicity’s sake, Plot assumes that data is consistently typed; type inference is based solely on the first non-null, non-undefined value.

For quantitative data (*i.e.* numbers), a mathematical transform may be applied to the data by changing the scale type:

* *linear* (default) - linear transform (translate and scale)
* *pow* - power (exponential) transform
* *sqrt* - square-root transform (*pow* transform with exponent = 0.5)
* *log* - logarithmic transform
* *symlog* - bi-symmetric logarithmic transform per [Webber *et al.*](https://www.researchgate.net/publication/233967063_A_bi-symmetric_log_transformation_for_wide-range_data)

The appropriate transform depends on the data’s distribution and what you wish to know. A *sqrt* transform exaggerates differences between small values at the expense of large values; it is a special case of the *pow* transform which has a configurable *scale*.**exponent** (0.5 for *sqrt*). A *log* transform is suitable for comparing orders of magnitude and can only be used when the domain does not include zero. The base defaults to 10 and can be specified with the *scale*.**base** option; note that this only affects the axis ticks and not the scale’s behavior. A *symlog* transform is more elaborate, but works well with wide-range values that include zero; it can be configured with the *scale*.**constant** option (default 1).

For temporal data (*i.e.* dates), two variants of a *linear* scale are also supported:

* *utc* (default, recommended) - UTC time
* *time* - local time

UTC is recommended over local time as charts in UTC time are guaranteed to appear consistently to all viewers whereas charts in local time will depend on the viewer’s time zone. Due to limitations in JavaScript’s Date class, Plot does not yet support an explicit time zone other than UTC.

For ordinal data (*e.g.*, strings), use the *ordinal* scale type or the *point* or *band* position scale types. The *categorical* scale type is also supported; it is equivalent to *ordinal* except as a color scale, where it provides a different default color scheme. (Since position is inherently ordinal or even quantitative, categorical data must be assigned an effective order when represented as position, and hence *categorical* and *ordinal* may be considered synonymous in context.)

You can opt-out of a scale using the *identity* scale type. This is useful if you wish to specify literal colors or pixel positions within a mark channel rather than relying on the scale to convert abstract values into visual values. For position scales (*x* and *y*), an *identity* scale is still quantitative and may produce an axis, yet unlike a *linear* scale the domain and range are fixed based on the plot layout.

:::tip
To opt-out of a scale for a single channel, you can specify the channel values as a `{value, scale}` object; see [mark options](./marks.md#mark-options).
:::

Quantitative scales, as well as identity position scales, coerce channel values to numbers; both null and undefined are coerced to NaN. Similarly, time scales coerce channel values to dates; numbers are assumed to be milliseconds since UNIX epoch, while strings are assumed to be in [ISO 8601 format](https://github.com/mbostock/isoformat/blob/main/README.md#parsedate-fallback).

A scale’s domain (the extent of its inputs, abstract values) and range (the extent of its outputs, visual values) are typically inferred automatically. You can set them explicitly using these options:

* **domain** - typically [*min*, *max*], or an array of ordinal or categorical values
* **range** - typically [*min*, *max*], or an array of ordinal or categorical values
* **unknown** - the desired output value (defaults to undefined) for invalid input values
* **reverse** - reverses the domain (or the range), say to flip the chart along *x* or *y*
* **interval** - an interval or time interval (for interval data; see below)

For most quantitative scales, the default domain is the [*min*, *max*] of all values associated with the scale. For the *radius* and *opacity* scales, the default domain is [0, *max*] to ensure a meaningful value encoding. For ordinal scales, the default domain is the set of all distinct values associated with the scale in natural ascending order; for a different order, set the domain explicitly or add a [**sort** option](#sort-mark-option) to an associated mark. For threshold scales, the default domain is [0] to separate negative and non-negative values. For quantile scales, the default domain is the set of all defined values associated with the scale. If a scale is reversed, it is equivalent to setting the domain as [*max*, *min*] instead of [*min*, *max*].

The default range depends on the scale: for position scales (*x*, *y*, *fx*, and *fy*), the default range depends on the [plot’s size and margins](./plots.md). For color scales, there are default color schemes for quantitative, ordinal, and categorical data. For opacity, the default range is [0, 1]. And for radius, the default range is designed to produce dots of “reasonable” size assuming a *sqrt* scale type for accurate area representation: zero maps to zero, the first quartile maps to a radius of three pixels, and other values are extrapolated. This convention for radius ensures that if the scale’s data values are all equal, dots have the default constant radius of three pixels, while if the data varies, dots will tend to be larger.

The behavior of the **unknown** scale option depends on the scale type. For quantitative and temporal scales, the unknown value is used whenever the input value is undefined, null, or NaN. For ordinal or categorical scales, the unknown value is returned for any input value outside the domain. For band or point scales, the unknown option has no effect; it is effectively always equal to undefined. If the unknown option is set to undefined (the default), or null or NaN, then the affected input values will be considered undefined and filtered from the output.

For data at regular intervals, such as integer values or daily samples, the [**interval** option](#scale-transforms) can be used to enforce uniformity. The specified *interval* — such as d3.utcMonth — must expose an *interval*.floor(*value*), *interval*.offset(*value*), and *interval*.range(*start*, *stop*) functions. The option can also be specified as a number, in which case it will be promoted to a numeric interval with the given step. The option can alternatively be specified as a string (*second*, *minute*, *hour*, *day*, *week*, *month*, *quarter*, *half*, *year*, *monday*, *tuesday*, *wednesday*, *thursday*, *friday*, *saturday*, *sunday*) <VersionBadge version="0.6.2" /> naming the corresponding time interval, or a skip interval consisting of a number followed by the interval name (possibly pluralized), such as *3 months* or *10 years*. This option sets the default *scale*.transform to the given interval’s *interval*.floor function. In addition, the default *scale*.domain is an array of uniformly-spaced values spanning the extent of the values associated with the scale.

Quantitative scales can be further customized with additional options:

* **clamp** - if true, clamp input values to the scale’s domain
* **nice** - if true (or a tick count), extend the domain to nice round values
* **zero** - if true, extend the domain to include zero if needed
* **percent** - if true, transform proportions in [0, 1] to percentages in [0, 100]

Clamping is typically used in conjunction with setting an explicit domain since if the domain is inferred, no values will be outside the domain. Clamping is useful for focusing on a subset of the data while ensuring that extreme values remain visible, but use caution: clamped values may need an annotation to avoid misinterpretation. Top-level **clamp**, **nice**, and **zero** options are supported as shorthand for setting the respective option on all scales.

The **transform** option allows you to apply a function to all values before they are passed through the scale. This is convenient for transforming a scale’s data, say to convert to thousands or between temperature units.

```js
Plot.plot({
  y: {
    label: "Temperature (°F)",
    transform: (f) => f * 9 / 5 + 32 // convert Celsius to Fahrenheit
  },
  marks: …
})
```

### Color scale options

The normal scale types — *linear*, *sqrt*, *pow*, *log*, *symlog*, and *ordinal* — can be used to encode color. In addition, Plot supports special scale types for color:

* *categorical* - like *ordinal*, but defaults to *observable10*
* *sequential* - like *linear*
* *cyclical* - like *linear*, but defaults to *rainbow*
* *threshold* - discretizes using thresholds given as the **domain**; defaults to *rdylbu*
* *quantile* - discretizes by computing quantile thresholds; defaults to *rdylbu*
* *quantize* - discretizes by computing uniform thresholds; defaults to *rdylbu* <VersionBadge version="0.4.3" />
* *diverging* - like *linear*, but with a pivot; defaults to *rdbu*
* *diverging-log* - like *log*, but with a pivot that defaults to 1; defaults to *rdbu*
* *diverging-pow* - like *pow*, but with a pivot; defaults to *rdbu*
* *diverging-sqrt* - like *sqrt*, but with a pivot; defaults to *rdbu*
* *diverging-symlog* - like *symlog*, but with a pivot; defaults to *rdbu*

For a *threshold* scale, the **domain** represents *n* (typically numeric) thresholds which will produce a **range** of *n* + 1 output colors; the *i*th color of the **range** applies to values that are smaller than the *i*th element of the domain and larger or equal to the *i* - 1th element of the domain. For a *quantile* scale, the **domain** represents all input values to the scale, and the **n** option specifies how many quantiles to compute from the **domain**; **n** quantiles will produce **n** - 1 thresholds, and an output range of **n** colors. For a *quantize* scale, the domain will be transformed into approximately **n** quantized values, where **n** is an option that defaults to 5.

By default, all diverging color scales are symmetric around the pivot; set **symmetric** to false if you want to cover the whole extent on both sides.

Color scales support two additional options:

* **scheme** - a named color scheme in lieu of a range, such as *reds*
* **interpolate** - in conjunction with a range, how to interpolate colors

For quantile and quantize color scales, the **scheme** option is used in conjunction with **n**, which determines how many quantiles or quantized values to compute, and thus the number of elements in the scale’s range; it defaults to 5 (for quintiles in the case of a quantile scale).

The following sequential scale schemes are supported for both quantitative and ordinal data:

:::plot defer hidden
```js
Plot.plot({
  width: 322,
  height: 25 * 27,
  margin: 0,
  marginRight: 70,
  padding: 0,
  x: {axis: null},
  y: {axis: "right", tickSize: 0},
  color: {type: "identity"},
  marks: [
    Plot.cell([
      ["Blues", d3.interpolateBlues],
      ["Greens", d3.interpolateGreens],
      ["Greys", d3.interpolateGreys],
      ["Purples", d3.interpolatePurples],
      ["Reds", d3.interpolateReds],
      ["Oranges", d3.interpolateOranges],
      ["Turbo", d3.interpolateTurbo],
      ["Viridis", d3.interpolateViridis],
      ["Magma", d3.interpolateMagma],
      ["Inferno", d3.interpolateInferno],
      ["Plasma", d3.interpolatePlasma],
      ["Cividis", d3.interpolateCividis],
      ["Cubehelix", d3.interpolateCubehelixDefault],
      ["Warm", d3.interpolateWarm],
      ["Cool", d3.interpolateCool],
      ["BuGn", d3.interpolateBuGn],
      ["BuPu", d3.interpolateBuPu],
      ["GnBu", d3.interpolateGnBu],
      ["OrRd", d3.interpolateOrRd],
      ["PuBuGn", d3.interpolatePuBuGn],
      ["PuBu", d3.interpolatePuBu],
      ["PuRd", d3.interpolatePuRd],
      ["RdPu", d3.interpolateRdPu],
      ["YlGnBu", d3.interpolateYlGnBu],
      ["YlGn", d3.interpolateYlGn],
      ["YlOrBr", d3.interpolateYlOrBr],
      ["YlOrRd", d3.interpolateYlOrRd],
    ].flatMap(([name, i]) => d3.ticks(0, 1, 20).map((t) => [t, name, String(i(t))])), {fill: "2", insetTop: 0.5, insetBottom: 0.5})
  ]
})
```
:::

The default color scheme, *turbo*, was chosen primarily to ensure high-contrast visibility. Color schemes such as *blues* make low-value marks difficult to see against a white background, for better or for worse. To use a subset of a continuous color scheme (or any single-argument *interpolate* function), set the *scale*.range property to the corresponding subset of [0, 1]; for example, to use the first half of the *rainbow* color scheme, use a range of [0, 0.5]. By default, the full range [0, 1] is used. If you wish to encode a quantitative value without hue, consider using *opacity* rather than *color* (e.g., use Plot.dot’s *strokeOpacity* instead of *stroke*).

The following diverging scale schemes are supported:

:::plot defer hidden
```js
Plot.plot({
  width: 322,
  height: 25 * 11,
  margin: 0,
  marginRight: 70,
  padding: 0,
  x: {axis: null},
  y: {axis: "right", tickSize: 0},
  color: {type: "identity"},
  marks: [
    Plot.cell([
      ["BrBG", d3.interpolateBrBG],
      ["PRGn", d3.interpolatePRGn],
      ["PiYG", d3.interpolatePiYG],
      ["PuOr", d3.interpolatePuOr],
      ["RdBu", d3.interpolateRdBu],
      ["RdGy", d3.interpolateRdGy],
      ["RdYlBu", d3.interpolateRdYlBu],
      ["RdYlGn", d3.interpolateRdYlGn],
      ["Spectral", d3.interpolateSpectral],
      ["BuRd", (t) => d3.interpolateRdBu(1 - t)],
      ["BuYlRd", (t) => d3.interpolateRdYlBu(1 - t)],
    ].flatMap(([name, i]) => d3.ticks(0, 1, 30).map((t) => [t, name, String(i(t))])), {fill: "2", insetTop: 0.5, insetBottom: 0.5})
  ]
})
```
:::

Picking a diverging color scheme name defaults the scale type to *diverging*; set the scale type to *linear* to treat the color scheme as sequential instead. Diverging color scales support a *scale*.**pivot** option, which defaults to zero. Values below the pivot will use the lower half of the color scheme (*e.g.*, reds for the *rdgy* scheme), while values above the pivot will use the upper half (grays for *rdgy*).

The following cylical color schemes are supported:

:::plot defer hidden
```js
Plot.plot({
  width: 322,
  height: 25 * 2,
  margin: 0,
  marginRight: 70,
  padding: 0,
  x: {axis: null},
  y: {axis: "right", tickSize: 0},
  color: {type: "identity"},
  marks: [
    Plot.cell([
      ["rainbow", d3.interpolateRainbow],
      ["sinebow", d3.interpolateSinebow],
    ].flatMap(([name, i]) => d3.ticks(0, 1, 30).map((t) => [t, name, String(i(t))])), {fill: "2", insetTop: 0.5, insetBottom: 0.5})
  ]
})
```
:::

The following categorical color schemes are supported:

:::plot defer hidden
```js
Plot.plot({
  width: 322,
  height: 25 * 10,
  margin: 0,
  marginRight: 70,
  padding: 0,
  x: {axis: null},
  y: {axis: "right", tickSize: 0},
  color: {type: "identity"},
  marks: [
    Plot.cell([
      ["Accent", d3.schemeAccent],
      ["Category10", d3.schemeCategory10],
      ["Dark2", d3.schemeDark2],
      ["Observable10", Plot.scale({color: {type: "categorical"}}).range],
      ["Paired", d3.schemePaired],
      ["Pastel1", d3.schemePastel1],
      ["Pastel2", d3.schemePastel2],
      ["Set1", d3.schemeSet1],
      ["Set2", d3.schemeSet2],
      ["Set3", d3.schemeSet3],
      ["Tableau10", d3.schemeTableau10],
    ].flatMap(([name, scheme]) => scheme.map((s, i) => [i, name, s])), {fill: "2", inset: 0.5})
  ]
})
```
:::

The following color interpolators are supported:

* *rgb* - RGB (red, green, blue)
* *hsl* - HSL (hue, saturation, lightness)
* *lab* - CIELAB (*a.k.a.* “Lab”)
* *hcl* - CIELCh<sub>ab</sub> (*a.k.a.* “LCh” or “HCL”)

### Position scale options

The position scales (*x*, *y*, *fx*, and *fy*) support additional options:

* **inset** - inset the default range by the specified amount in pixels
* **round** - round the output value to the nearest integer (whole pixel)

The *x* and *fx* scales support asymmetric insets for more precision. Replace inset by:

* **insetLeft** - insets the start of the default range by the specified number of pixels
* **insetRight** - insets the end of the default range by the specified number of pixels

Similarly, the *y* and *fy* scales support asymmetric insets with:

* **insetTop** - insets the top of the default range by the specified number of pixels
* **insetBottom** - insets the bottom of the default range by the specified number of pixels

The inset scale options can provide “breathing room” to separate marks from axes or the plot’s edge. For example, in a scatterplot with a Plot.dot with the default 3-pixel radius and 1.5-pixel stroke width, an inset of 5 pixels prevents dots from overlapping with the axes. The *scale*.round option is useful for crisp edges by rounding to the nearest pixel boundary.

In addition to the generic *ordinal* scale type, which requires an explicit output range value for each input domain value, Plot supports special *point* and *band* scale types for encoding ordinal data as position. These scale types accept a [*min*, *max*] range similar to quantitative scales, and divide this continuous interval into discrete points or bands based on the number of distinct values in the domain (*i.e.*, the domain’s cardinality). If the associated marks have no effective width along the ordinal dimension — such as a dot, rule, or tick — then use a *point* scale; otherwise, say for a bar, use a *band* scale.

Ordinal position scales support additional options, all specified as proportions in [0, 1]:

* **padding** - how much of the range to reserve to inset first and last point or band
* **align** - where to distribute points or bands (0 = at start, 0.5 = at middle, 1 = at end)

For a *band* scale, you can further fine-tune padding:

* **paddingInner** - how much of the range to reserve to separate adjacent bands
* **paddingOuter** - how much of the range to reserve to inset first and last band

Align defaults to 0.5 (centered). Band scale padding defaults to 0.1 (10% of available space reserved for separating bands), while point scale padding defaults to 0.5 (the gap between the first point and the edge is half the distance of the gap between points, and likewise for the gap between the last point and the opposite edge). Note that rounding and mark insets (e.g., for bars and rects) also affect separation between adjacent marks.

Plot implicitly generates an [axis mark](../marks/axis.md) for position scales if one is not explicitly declared. (For more control, declare the axis mark explicitly.) The following [axis mark options](../marks/axis.md#axis-options) are also available as scale options, applying to the implicit axis:

* **axis** - the axis **anchor**: *top*, *bottom* (*x* or *fx*); *left*, *right* (*y* or *fy*); *both*; null to suppress
* **ticks** - the approximate number of ticks to generate, or interval, or array of values
* **tickSpacing** - the approximate number of pixels between ticks (if **ticks** is not specified)
* **tickSize** - the length of each tick (in pixels; default 6 for *x* and *y*, or 0 for *fx* and *fy*)
* **tickPadding** - the separation between the tick and its label (in pixels; default 3)
* **tickFormat** - either a function or specifier string to format tick values; see [Formats](./formats.md)
* **tickRotate** - whether to rotate tick labels (an angle in degrees clockwise; default 0)
* **fontVariant** - the font-variant attribute; defaults to *tabular-nums* if quantitative
* **label** - a string to label the axis
* **labelAnchor** - the label anchor: *top*, *right*, *bottom*, *left*, or *center*
* **labelArrow** - the label arrow: *auto* (default), *up*, *right*, *down*, *left*, *none*, or true <VersionBadge version="0.6.7" />
* **labelOffset** - the label position offset (in pixels; default depends on margins and orientation)
* **ariaLabel** - a short label representing the axis in the accessibility tree
* **ariaDescription** - a textual description for the axis

For an implicit [grid mark](../marks/grid.md), use the **grid** option. For an implicit [frame mark](../marks/frame.md) along one edge of the frame, use the **line** option.

* **grid** - whether to draw grid lines across the plot for each tick
* **line** - if true, draw the axis line (only for *x* and *y*)

Top-level options are also supported as shorthand: **grid** (for *x* and *y* only; see [facets](./facets.md)), **label**, **axis**, **inset**, **round**, **align**, and **padding**. If the **grid** option is true, show a grid using *currentColor*; if specified as a string, show a grid with the specified color; if an approximate number of ticks, an interval, or an array of tick values, show corresponding grid lines.

## Sort mark option <VersionBadge version="0.2.0" />

If an ordinal scale’s domain is not set, it defaults to natural ascending order; to order the domain by associated values in another dimension, either compute the domain manually (consider [d3.groupSort](https://d3js.org/d3-array/group#groupSort)) or use an associated mark’s **sort** option. For example, to sort bars by ascending frequency rather than alphabetically by letter:

```js
Plot.barY(alphabet, {x: "letter", y: "frequency", sort: {x: "y"}})
```

The sort option is an object whose keys are ordinal scale names, such as *x* or *fx*, and whose values are mark channel names, such as **y**, **y1**, or **y2**. By specifying an existing channel rather than a new value, you avoid repeating the order definition and can refer to channels derived by [transforms](./transforms.md) (such as [stack](../transforms/stack.md) or [bin](../transforms/bin.md)). When sorting the *x* domain, if no **x** channel is defined, **x2** will be used instead if available, and similarly for *y* and **y2**; this is useful for marks that implicitly stack such as [area](../marks/area.md), [bar](../marks/bar.md), and [rect](../marks/rect.md). A sort value may also be specified as *width* or *height* <VersionBadge version="0.4.2" />, representing derived channels |*x2* - *x1*| and |*y2* - *y1*| respectively.

Note that there may be multiple associated values in the secondary dimension for a given value in the primary ordinal dimension. The secondary values are therefore grouped for each associated primary value, and each group is then aggregated by applying a reducer. The default reducer is *max*, but may be changed by specifying the **reduce** option. Lastly the primary values are by default sorted based on the associated reduced value in natural ascending order to produce the domain. The above code is shorthand for:

```js
Plot.barY(alphabet, {x: "letter", y: "frequency", sort: {x: "y", reduce: "max", order: "ascending"}})
```

Generally speaking, a reducer only needs to be specified when there are multiple secondary values for a given primary value. See the [group transform](../transforms/group.md) for the list of supported reducers.

For descending rather than ascending order, set the **order** option to *descending*:

```js
Plot.barY(alphabet, {x: "letter", y: "frequency", sort: {x: "y", order: "descending"}})
```

Alternatively, the *-channel* shorthand option, which changes the default **order** to *descending*:

```js
Plot.barY(alphabet, {x: "letter", y: "frequency", sort: {x: "-y"}})
```

Setting **order** to null will disable sorting, preserving the order of the data. (When an aggregating transform is used, such as [group](../transforms/group.md) or [bin](../transforms/bin.md), note that the data may already have been sorted and thus the order may differ from the input data.)

Alternatively, set the **reverse** option to true. This produces a different result than descending order for null or unorderable values: descending order puts nulls last, whereas reversed ascending order puts nulls first.

```js
Plot.barY(alphabet, {x: "letter", y: "frequency", sort: {x: "y", reverse: true}})
```

An additional **limit** option truncates the domain to the first *n* values after ordering. If **limit** is negative, the last *n* values are used instead. Hence, a positive **limit** with **reverse** = true will return the top *n* values in descending order. If **limit** is an array [*lo*, *hi*], the *i*th values with *lo* ≤ *i* < *hi* will be selected. (Note that like the [basic filter transform](../transforms/filter.md), limiting the *x* domain here does not affect the computation of the *y* domain, which is computed independently without respect to filtering.)

```js
Plot.barY(alphabet, {x: "letter", y: "frequency", sort: {x: "y", limit: 5}})
```

If different sort options are needed for different ordinal scales, the channel name can be replaced with a *value* object with additional per-scale options.

```js
Plot.barY(alphabet, {x: "letter", y: "frequency", sort: {x: {value: "y", order: "descending"}}})
```

If the input channel is *data*, then the reducer is passed groups of the mark’s data; this is typically used in conjunction with a custom reducer function, as when the built-in single-channel reducers are insufficient.

Note: when the value of the sort option is a string or a function, it is interpreted as a mark [sort transform](../transforms/sort.md). To use both sort options and a mark sort transform, use [Plot.sort](../transforms/sort.md#sort).

## scale(*options*) <VersionBadge version="0.4.0" /> {#scale}

You can also create a standalone scale with Plot.**scale**(*options*). The *options* object must define at least one scale; see [Scale options](#scale-options) for how to define a scale. For example, here is a categorical color scale with the *Tableau10* color scheme and a domain of fruits:

```js
const color = Plot.scale({color: {scheme: "Tableau10", domain: ["apple", "orange", "pear"]}});
```

Both [*plot*.scale](./plots.md#plot_scale) and [Plot.scale](#scale) return scale objects. These objects represent the actual (or “materialized”) scale options used by Plot, including the domain, range, interpolate function, *etc.* The scale’s label, if any, is also returned; however, note that other axis properties are not currently exposed. Point and band scales also expose their materialized bandwidth and step.

```js
color.domain // ["apple", "orange", "pear"]
```

For convenience, scale objects expose a *scale*.**apply**(*input*) method which returns the scale’s output for the given *input* value. When applicable, scale objects also expose a *scale*.**invert**(*output*) method which returns the corresponding input value from the scale’s domain for the given *output* value.

```js
color.apply("apple") // "#4e79a7"
```

To apply a standalone scale object to a plot, pass it to Plot.plot as the corresponding scale options, such as **color**:

:::plot
```js
Plot.cellX(["apple", "apple", "orange", "pear", "orange"]).plot({color})
```
:::

As another example, below are two plots with different options where the second plot uses the *color* scale from the first plot:

```js
const plot1 = Plot.plot({...options1});
const plot2 = Plot.plot({...options2, color: plot1.scale("color")});
```

# docs/features/shorthand.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

const numbers = [
  170.16, 172.53, 172.54, 173.44, 174.35, 174.55, 173.16, 174.59, 176.18, 177.90,
  176.15, 179.37, 178.61, 177.30, 177.30, 177.25, 174.51, 172.00, 170.16, 165.53,
  166.87, 167.17, 166.00, 159.10, 154.83, 163.09, 160.29, 157.07, 158.50, 161.95,
  163.04, 169.79, 172.36, 172.05, 172.83, 171.80, 173.67, 176.35, 179.10, 179.26
];

const timeSeries = [
  [new Date("2018-01-02"), 170.160004],
  [new Date("2018-01-03"), 172.529999],
  [new Date("2018-01-04"), 172.539993],
  [new Date("2018-01-05"), 173.440002],
  [new Date("2018-01-08"), 174.350006],
  [new Date("2018-01-09"), 174.550003],
  [new Date("2018-01-10"), 173.160004],
  [new Date("2018-01-11"), 174.589996],
  [new Date("2018-01-12"), 176.179993],
  [new Date("2018-01-16"), 177.899994],
  [new Date("2018-01-17"), 176.149994],
  [new Date("2018-01-18"), 179.369995],
  [new Date("2018-01-19"), 178.610001],
  [new Date("2018-01-22"), 177.300003],
  [new Date("2018-01-23"), 177.300003],
  [new Date("2018-01-24"), 177.250000],
  [new Date("2018-01-25"), 174.509995],
  [new Date("2018-01-26"), 172.000000],
  [new Date("2018-01-29"), 170.160004],
  [new Date("2018-01-30"), 165.529999],
  [new Date("2018-01-31"), 166.869995],
  [new Date("2018-02-01"), 167.169998],
  [new Date("2018-02-02"), 166.000000],
  [new Date("2018-02-05"), 159.100006],
  [new Date("2018-02-06"), 154.830002],
  [new Date("2018-02-07"), 163.089996],
  [new Date("2018-02-08"), 160.289993],
  [new Date("2018-02-09"), 157.070007],
  [new Date("2018-02-12"), 158.500000],
  [new Date("2018-02-13"), 161.949997],
  [new Date("2018-02-14"), 163.039993],
  [new Date("2018-02-15"), 169.789993],
  [new Date("2018-02-16"), 172.360001],
  [new Date("2018-02-20"), 172.050003],
  [new Date("2018-02-21"), 172.830002],
  [new Date("2018-02-22"), 171.800003],
  [new Date("2018-02-23"), 173.669998],
  [new Date("2018-02-26"), 176.350006],
  [new Date("2018-02-27"), 179.100006],
  [new Date("2018-02-28"), 179.259995]
];

const matrix = [
  ["Jacob", "Olivia"],
  ["Mia", "Noah"],
  ["Noah", "Ava"],
  ["Ava", "Mason"],
  ["Olivia", "Noah"],
  ["Jacob", "Emma"],
  ["Ava", "Noah"],
  ["Noah", "Jacob"],
  ["Olivia", "Ava"],
  ["Mason", "Emma"],
  ["Jacob", "Mia"],
  ["Mia", "Jacob"],
  ["Emma", "Jacob"]
];

const gene = "AAAAGAGTGAAGATGCTGGAGACGAGTGAAGCATTCACTTTAGGGAAAGCGAGGCAAGAGCGTTTCAGAAGACGAAACCTGGTAGGTGCACTCACCACAG";

</script>

# Shorthand <VersionBadge version="0.4.2" />

The most concise form of Plot is its **shorthand** syntax where no options are specified — only data. To use this shorthand, the data must have a specific structure: either a one-dimensional array of values [*v₀*, *v₁*, *v₂*, …] or a two-dimensional array of tuples [[*x₀*, *y₀*], [*x₁*, *y₁*], [*x₂*, *y₂*], …].

While none of these charts are particularly groundbreaking, we hope you find this shorthand convenient the next time you want a quick look at some data. And if the shorthand view is useful, you can then enhance it by adding options!

## One dimension

Let’s start with the one-dimensional form: an array of numbers.

```js
numbers = [
  170.16, 172.53, 172.54, 173.44, 174.35, 174.55, 173.16, 174.59, 176.18, 177.90,
  176.15, 179.37, 178.61, 177.30, 177.30, 177.25, 174.51, 172.00, 170.16, 165.53,
  166.87, 167.17, 166.00, 159.10, 154.83, 163.09, 160.29, 157.07, 158.50, 161.95,
  163.04, 169.79, 172.36, 172.05, 172.83, 171.80, 173.67, 176.35, 179.10, 179.26
]
```

These numbers represent the daily opening price of Apple stock starting on January 1, 2018. For a simple line chart, we can pass the data to [Plot.lineY](../marks/line.md) to construct a line mark, and then call *line*.plot.

:::plot https://observablehq.com/@observablehq/plot-shorthand-one-dimensional-line
```js
Plot.lineY(numbers).plot()
```
:::

The *y*-axis above represents price in U.S. dollars. The *x*-axis represents the index of the data: the first value {{numbers[0]}} is shown at *x* = 0, the second value {{numbers[1]}} at *x* = 1, and so on. In other words, *x* represents the number of (trading) days since January 1, 2018. It’d be nicer to have an *x*-axis that shows dates here, but it’s still convenient to see the trend in stock price quickly.

If we pass the numbers to [Plot.areaY](../marks/area.md) instead, we’ll get a simple area chart with a baseline implicitly at *y* = 0.

:::plot https://observablehq.com/@observablehq/plot-shorthand-one-dimensional-area
```js
Plot.areaY(numbers).plot()
```
:::

Similarly if we use [Plot.rectY](../marks/rect.md), we’ll get a series of vertical bars. This implicitly uses the [interval transform](../transforms/interval.md) such that the first rect spans from *x* = 0 to *x* = 1, the second from *x* = 1 to *x* = 2, and so on, with a horizontal inset to separate adjacent rects.

:::plot https://observablehq.com/@observablehq/plot-shorthand-one-dimensional-rect
```js
Plot.rectY(numbers).plot()
```
:::

[Plot.barY](../marks/bar.md) produces a visually similar result but with different semantics: *x* is now ordinal (a *band* scale) rather than quantitative (*linear*). An ordinal axis labels every tick, which appear at the middle of each bar rather than between rects.

:::plot https://observablehq.com/@observablehq/plot-shorthand-one-dimensional-bar
```js
Plot.barY(numbers).plot()
```
:::

Like Plot.barY, [Plot.cellX](../marks/cell.md) implies that *x* is ordinal. But now instead of a *y* channel the numeric value is encoded as the *fill* color. The default quantitative color scheme is *turbo*; higher values are reddish, and lower values blueish.

:::plot https://observablehq.com/@observablehq/plot-shorthand-one-dimensional-cell
```js
Plot.cellX(numbers).plot()
```
:::

If we don’t care about the order of our data and we instead just want to look at the one-dimensional distribution of values, we can use [Plot.dotX](../marks/dot.md).

:::plot https://observablehq.com/@observablehq/plot-shorthand-one-dimensional-dot
```js
Plot.dotX(numbers).plot()
```
:::

Alternatively, we can use [Plot.ruleX](../marks/rule.md) to draw a vertical rule at each value. In this case, Plot.ruleX behaves identically to [Plot.tickX](../marks/tick.md). (If there *were* a *y* channel, then Plot.tickX would imply that *y* is ordinal whereas Plot.ruleX would imply that *y* is quantitative.) It is common to use the rule shorthand to annotate special *x* or *y* values in plots, such as *y* = 0, in conjunction with other marks.

:::plot https://observablehq.com/@observablehq/plot-shorthand-one-dimensional-rule
```js
Plot.ruleX(numbers).plot()
```
:::

:::plot https://observablehq.com/@observablehq/plot-shorthand-one-dimensional-tick
```js
Plot.tickX(numbers).plot()
```
:::

We could even use [Plot.vectorX](../marks/vector.md) here to draw little up-pointing arrows. (Typically the vector mark is used in conjunction with the **rotate** and **length** options to control the direction and magnitude of each vector.)

:::plot https://observablehq.com/@observablehq/plot-shorthand-one-dimensional-vector
```js
Plot.vectorX(numbers).plot()
```
:::

While not particularly readable due to occlusion, we can use [Plot.textX](../marks/text.md) to draw a label at each value, too.

:::plot https://observablehq.com/@observablehq/plot-shorthand-one-dimensional-text
```js
Plot.textX(numbers).plot()
```
:::

For a more formal method of summarizing a one-dimensional distribution, we can use [Plot.boxX](../marks/box.md) to create a horizontal boxplot. The gray band represents the interquartile range; the black whiskers show the extrema (not including outliers); and the thick black stroke represents the median; any outliers (none in this dataset) are drawn as dots.

:::plot https://observablehq.com/@observablehq/plot-shorthand-box
```js
Plot.boxX(numbers).plot()
```
:::

Some of Plot’s transforms support shorthand syntax, too. For example, we can use Plot.rectY with [Plot.binX](../transforms/bin.md) to generate a histogram — another common way to visualize a one-dimensional distribution.

:::plot https://observablehq.com/@observablehq/plot-shorthand-histogram
```js
Plot.rectY(numbers, Plot.binX()).plot()
```
:::

Similarly [Plot.groupX](../transforms/group.md) can be used to group and count ordinal data, such as the frequency of bases in a random DNA sequence.

```js
gene = "AAAAGAGTGAAGATGCTGGAGACGAGTGAAGCATTCACTTTAGGGAAAGCGAGGCAAGAGCGTTTCAGAAGACGAAACCTGGTAGGTGCACTCACCACAG"
```

:::plot https://observablehq.com/@observablehq/plot-shorthand-group
```js
Plot.barY(gene, Plot.groupX()).plot()
```
:::

And here’s the [dodge transform](../transforms/dodge.md) for a beeswarm plot:

:::plot https://observablehq.com/@observablehq/plot-shorthand-dodge
```js
Plot.dotX(numbers, Plot.dodgeY()).plot()
```
:::

## Two dimensions

Now let’s switch to a two-dimensional array of tuples [[*x₀*, *y₀*], [*x₁*, *y₁*], [*x₂*, *y₂*], …]. The *x*-values here are times (Date instances at UTC midnight); the *y*-values again are the daily opening price of Apple stock.

```js
timeSeries = [
  [new Date("2018-01-02"), 170.160004],
  [new Date("2018-01-03"), 172.529999],
  [new Date("2018-01-04"), 172.539993],
  [new Date("2018-01-05"), 173.440002],
  [new Date("2018-01-08"), 174.350006],
  [new Date("2018-01-09"), 174.550003],
  [new Date("2018-01-10"), 173.160004],
  [new Date("2018-01-11"), 174.589996],
  [new Date("2018-01-12"), 176.179993],
  [new Date("2018-01-16"), 177.899994],
  [new Date("2018-01-17"), 176.149994],
  [new Date("2018-01-18"), 179.369995],
  [new Date("2018-01-19"), 178.610001],
  [new Date("2018-01-22"), 177.300003],
  [new Date("2018-01-23"), 177.300003],
  [new Date("2018-01-24"), 177.250000],
  [new Date("2018-01-25"), 174.509995],
  [new Date("2018-01-26"), 172.000000],
  [new Date("2018-01-29"), 170.160004],
  [new Date("2018-01-30"), 165.529999],
  [new Date("2018-01-31"), 166.869995],
  [new Date("2018-02-01"), 167.169998],
  [new Date("2018-02-02"), 166.000000],
  [new Date("2018-02-05"), 159.100006],
  [new Date("2018-02-06"), 154.830002],
  [new Date("2018-02-07"), 163.089996],
  [new Date("2018-02-08"), 160.289993],
  [new Date("2018-02-09"), 157.070007],
  [new Date("2018-02-12"), 158.500000],
  [new Date("2018-02-13"), 161.949997],
  [new Date("2018-02-14"), 163.039993],
  [new Date("2018-02-15"), 169.789993],
  [new Date("2018-02-16"), 172.360001],
  [new Date("2018-02-20"), 172.050003],
  [new Date("2018-02-21"), 172.830002],
  [new Date("2018-02-22"), 171.800003],
  [new Date("2018-02-23"), 173.669998],
  [new Date("2018-02-26"), 176.350006],
  [new Date("2018-02-27"), 179.100006],
  [new Date("2018-02-28"), 179.259995]
]
```

If we pass this to Plot.line (*not* Plot.lineY as before), we’ll get another line chart, but now the *x*-axis shows the date rather than the zero-based index. Also, the *x*-values are no longer uniformly spaced, as there are gaps on the weekends and holidays when the markets are closed.

:::plot https://observablehq.com/@observablehq/plot-shorthand-temporal-line
```js
Plot.line(timeSeries).plot()
```
:::

Similarly Plot.area will produce the equivalent area chart, again with an implicit baseline at *y* = 0.

:::plot https://observablehq.com/@observablehq/plot-shorthand-temporal-area
```js
Plot.area(timeSeries).plot()
```
:::

There’s currently no two-dimensional shorthand for rect or bar, though you can use these marks to display time series data with options.

Plot.dot will produce a scatterplot…

:::plot https://observablehq.com/@observablehq/plot-shorthand-temporal-dot
```js
Plot.dot(timeSeries).plot()
```
:::

As will Plot.vector…

:::plot https://observablehq.com/@observablehq/plot-shorthand-temporal-vector
```js
Plot.vector(timeSeries).plot()
```
:::

Plot.text also produces a scatterplot with labels showing the zero-based index of the data. Perhaps not very useful, but it at least shows the data’s order.

:::plot https://observablehq.com/@observablehq/plot-shorthand-temporal-text
```js
Plot.text(timeSeries).plot()
```
:::

Plot.cell also supports two-dimensional shorthand. As we saw above, Plot.cell implies that *x* and *y* are ordinal, so we shouldn’t pass temporal (dates) and quantitative (numbers) data; here’s a matrix diagram that shows which pairs exist in the dataset. You might use this, for example, to visualize who reviewed whose code.

```js
matrix = [
  ["Jacob", "Olivia"],
  ["Mia", "Noah"],
  ["Noah", "Ava"],
  ["Ava", "Mason"],
  ["Olivia", "Noah"],
  ["Jacob", "Emma"],
  ["Ava", "Noah"],
  ["Noah", "Jacob"],
  ["Olivia", "Ava"],
  ["Mason", "Emma"],
  ["Jacob", "Mia"],
  ["Mia", "Jacob"],
  ["Emma", "Jacob"]
]
```

:::plot https://observablehq.com/@observablehq/plot-shorthand-cell
```js
Plot.cell(matrix).plot()
```
:::

## Caveats

Plot has a few marks that don’t currently provide meaningful shorthand. The [arrow](../marks/arrow.md) and [link](../marks/link.md) marks both require a start (*x1*, *y1*) and end (*x2*, *y2*) point; and the [image](../marks/image.md) mark requires a source URL (*src*).

# docs/features/transforms.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {computed, shallowRef, onMounted} from "vue";
import penguins from "../data/penguins.ts";

const bls = shallowRef([]);
const olympians = shallowRef([]);
const traffic = shallowRef(["Saarbrücken-Neuhaus", "Oldenburg (Holstein)", "Holz", "Göttelborn", "Riegelsberg", "Kastel", "Neustadt i. H.-Süd", "Nettersheim", "Hasborn", "Laufeld", "Otzenhausen", "Nonnweiler", "Kirschheck", "AS Eppelborn", "Bierfeld", "Von der Heydt", "Illingen", "Hetzerath", "Groß Ippener", "Bockel", "Ladbergen", "Dibbersen", "Euskirchen/Bliesheim", "Hürth", "Lotte", "Ascheberg", "Bad Schwartau", "Schloss Burg", "Uphusen", "HB-Silbersee", "Barsbüttel", "HB-Mahndorfer See", "Glüsingen", "HB-Weserbrücke", "Hengsen", "Köln-Nord", "Hagen-Vorhalle", "Unna"].map((location, i) => ({location, date: new Date(Date.UTC(2000, 0, 1, i)), vehicles: (10 + i) ** 2.382})));
const bins = computed(() => d3.bin().thresholds(80).value((d) => d.weight)(olympians.value));

const scheme = Plot.scale({color: {type: "categorical"}}).range;

onMounted(() => {
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
  d3.csv("../data/bls-metro-unemployment.csv", d3.autoType).then((data) => (bls.value = data));
  d3.csv("../data/traffic.csv", d3.autoType).then((data) => (traffic.value = data));
});

</script>

# Transforms

**Transforms** derive data as part of the plot specification. This accelerates what is often the most onerous task in visualization: getting data into the right shape.

For example, given a [dataset of highway traffic](https://gist.github.com/chrtze/c74efb46cadb6a908bbbf5227934bfea) measured as vehicles per hour by location, plotting every observation is straightforward: use a [tick](../marks/tick.md) (or [dot](../marks/dot.md)) and assign **x** = vehicles per hour and **y** = location. But to draw a quantifiable insight, we may want a summary statistic such as the *median* traffic by location. 👩‍💻 Below we use the [group transform](../transforms/group.md) to group by location and apply a *median* reducer to position the <span style="border-bottom: solid 2px var(--vp-c-red);">red</span> tick.

:::plot defer https://observablehq.com/@observablehq/plot-sorted-groups
```js
Plot.plot({
  marginLeft: 120,
  x: {label: "Vehicles per hour (thousands)", transform: (x) => x / 1000},
  y: {label: null},
  marks: [
    Plot.ruleX([0]),
    Plot.tickX(
      traffic,
      {x: "vehicles", y: "location", strokeOpacity: 0.3}
    ),
    Plot.tickX(
      traffic,
      Plot.groupY(
        {x: "median"},
        {x: "vehicles", y: "location", stroke: "red", strokeWidth: 4, sort: {y: "x"}}
      )
    )
  ]
})
```
:::

As you might expect, traffic varies significantly throughout the day, so perhaps it would be better to look at the median by hour by location? Instead of grouping only by **y**, we can group by both **x** and **y** to produce a heatmap.

:::plot defer https://observablehq.com/@observablehq/plot-sorted-heatmap
```js-vue
Plot.plot({
  marginLeft: 120,
  padding: 0,
  y: {label: null},
  color: {scheme: "{{$dark ? "turbo" : "YlGnBu"}}", legend: true, zero: true},
  marks: [
    Plot.cell(
      traffic,
      Plot.group(
        {fill: "median"},
        {x: (d) => d.date.getUTCHours(), y: "location", fill: "vehicles", inset: 0.5, sort: {y: "fill"}}
      )
    )
  ]
})
```
:::

Plot includes many useful transforms! For example, you can compute a [rolling average](../transforms/window.md) to smooth a noisy signal, [stack layers](../transforms/stack.md) for a streamgraph, or [dodge dots](../transforms/dodge.md) for a beeswarm. Plot’s various built-in transforms include: [bin](../transforms/bin.md), [centroid](../transforms/centroid.md), [dodge](../transforms/dodge.md), [filter](../transforms/filter.md), [group](../transforms/group.md), [hexbin](../transforms/hexbin.md), [interval](../transforms/interval.md), [map](../transforms/map.md), [normalize](../transforms/normalize.md), [reverse](../transforms/sort.md#reverse), [select](../transforms/select.md), [shuffle](../transforms/sort.md#shuffle), [sort](../transforms/sort.md), [stack](../transforms/stack.md), [tree](../transforms/tree.md), and [window](../transforms/window.md). If these don’t meet your needs, you can even implement a [custom transform](#custom-transforms).

Transforms are never required — you can always aggregate and derive data yourself outside of Plot, and then pass in the binned values. For example, we could use [d3.bin](https://d3js.org/d3-array/bin) to compute a histogram of athletes’ weights as an array of {*x0*, *x1*, *length*} objects.

```js
bins = d3.bin().thresholds(80).value((d) => d.weight)(olympians)
```

We can then pass that to the [rect mark](../marks/rect.md), assigning to the **x1**, **x2**, and **y2** channels:

:::plot defer
```js
Plot.rectY(bins, {x1: "x0", x2: "x1", y2: "length"}).plot()
```
:::

:::info
This is for demonstration only; you wouldn’t normally bin “by hand” as shown here.
:::

But Plot’s transforms are often more convenient, especially in conjunction with Plot’s other features such as [faceting](./facets.md) and automatic grouping by **z**. For example, if we want to add a color encoding to our histogram, we simply add the **fill** option and the bin transform partitions each bin accordingly; doing this with d3.bin would be a lot more work!

:::plot defer https://observablehq.com/@observablehq/plot-vertical-histogram
```js
Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", fill: "sex"})).plot({color: {legend: true}})
```
:::

Plot’s transforms typically take two *options* objects as arguments: the first object contains the *transform* options (above, `{y: "count"}`), while the second object contains *mark* options to be “passed through” to the mark (`{x: "weight", fill: "sex"}`). The transform returns a new options object representing the *transformed* mark options to be passed to a mark.

Breaking down the above code:

```js
const options = {x: "weight", fill: "sex"}; // initial mark options
const binOptions = {y: "count"}; // bin transform options
const binned = Plot.binX(binOptions, options); // transformed mark options
const rect = Plot.rectY(olympians, binned); // rect mark
const plot = rect.plot({color: {legend: true}}); // plot!
```

:::tip
If a transform isn’t doing what you expect, try inspecting the options object returned by the transform. Does it contain the options you expect?
:::

Transforms can derive channels (such as **y** above) as well as changing the default options. For example, the bin transform sets default insets for a one-pixel gap between adjacent rects.

Transforms are composable: you can pass *options* through more than one transform before passing it to a mark. For example, above it’s a bit difficult to compare the weight distribution by sex because there are fewer <span :style="{borderBottom: `solid 2px ${scheme[0]}`}">female</span> than <span :style="{borderBottom: `solid 2px ${scheme[1]}`}">male</span> athletes in the data. We can remove this effect using the [normalize transform](../transforms/normalize.md) with the *sum* reducer.

:::plot defer https://observablehq.com/@observablehq/plot-overlapping-relative-histogram
```js-vue
Plot.plot({
  y: {percent: true},
  marks: [
    Plot.rectY(
      olympians,
      Plot.normalizeY(
        "sum", // normalize each series by the sum per series
        Plot.binX(
          {y2: "count"}, // disable implicit stack transform
          {x: "weight", fill: "sex", mixBlendMode: "{{$dark ? "screen" : "multiply"}}"}
        )
      )
    )
  ]
})
```
:::

And, as you may have wondered above, many of Plot’s [marks](./marks.md) provide implicit transforms: for example, the [rectY mark](../marks/rect.md) applies an implicit [stackY transform](../transforms/stack.md) if you use the **y** option, and the [dot mark](../marks/dot.md) applies an implicit [sort transform](../transforms/sort.md) to mitigate the effect of occlusion by drawing the smallest dots on top.

## Custom transforms

For greater control, you can also implement a custom **transform** function, allowing data, indexes, or channels to be derived prior to rendering. Custom transforms are rarely implemented directly; see the built-in transforms above. For example, below we implement the [filter transform](../transforms/filter.md) “by hand” as a custom transform to show the unemployment rates only in Michigan metropolitan divisions.

:::plot defer https://observablehq.com/@observablehq/plot-custom-transform-example
```js{16-23}
Plot.plot({
  y: {
    grid: true,
    label: "Unemployment (%)"
  },
  color: {
    domain: [false, true],
    range: ["#ccc", "red"]
  },
  marks: [
    Plot.ruleY([0]),
    Plot.line(bls, {
      x: "date",
      y: "unemployment",
      z: "division",
      transform: (data, facets) => ({
        data,
        facets: facets.map((facet) => {
          return facet.filter((i) => {
            return /, MI /.test(data[i].division);
          });
        })
      })
    })
  ]
})
```
:::

The **transform** function is passed three arguments, *data*, *facets*, and *options* representing the mark’s data and facet indexes, and the plot’s options; it must then return a {*data*, *facets*} object with the transformed data and facet indexes. The *facets* are represented as a nested array of arrays such as [[0, 1, 3, …], [2, 5, 10, …], …]; each element in *facets* specifies the zero-based indexes of elements in *data* that are in a given facet (*i.e.*, have a distinct value in the associated *fx* or *fy* dimension).

If the **transform** option is specified, it supersedes any basic transforms (*i.e.*, the **filter**, **sort** and **reverse** options are ignored). However, the **transform** option is rarely used directly; instead one of Plot’s built-in transforms are used, and these transforms automatically compose with the basic **filter**, **sort** and **reverse** transforms.

While transform functions often produce new *data* or *facets*, they may return the passed-in *data* and *facets* as-is, and often have a side effect of constructing derived channels. For example, the count of elements in a [groupX transform](../transforms/group.md) might be returned as a new *y* channel. In this case, the transform is typically expressed as an options transform: a function that takes a mark *options* object and returns a new, transformed options object, where the returned options object implements the **transform** option. Transform functions should not mutate the input *data* or *facets*. Likewise options transforms should not mutate the input *options* object.

When implementing a custom transform for generic usage, keep in mind that it needs to be compatible with Plot’s [faceting system](./facets.md), which partitions the original dataset into discrete subsets.

## Custom initializers <VersionBadge version="0.5.0" />

Initializers are a special class of transform; whereas transforms operate in abstract data space, initializers operate in screen space such as pixel coordinates and colors. For example, initializers can modify a marks’ positions to avoid occlusion. Initializers are invoked *after* the initial scales are constructed and can modify the channels or derive new channels; these in turn may (or may not, as desired) be passed to scales. Plot’s [hexbin](../transforms/hexbin.md) and [dodge](../transforms/dodge.md) transforms are initializers.

You can specify a custom initializer by specifying a function as the mark **initializer** option. This function is called after the scales have been computed, and receives as inputs the (possibly transformed) array of *data*, the *facets* index of elements of this array that belong to each facet, the input *channels* (as an object of named channels), the *scales*, and the *dimensions*. The mark itself is the *this* context. The initializer function must return an object with *data*, *facets*, and new *channels*. Any new channels are merged with existing channels, replacing channels of the same name.

If an initializer desires a channel that is not supported by the downstream mark, additional channels can be declared using the mark **channels** option.

## transform(*options*, *transform*) <VersionBadge version="0.4.3" /> {#transform}

```js
Plot.transform(options, (data, facets) => {
  return {
    data,
    facets: facets.map((I) => I.filter(() => Math.random() > 0.5))
  };
})
```
Given an *options* object that may specify some basic transforms (**filter**, **sort**, or **reverse**) or a custom **transform** function, composes those transforms if any with the given *transform* function, returning a new *options* object. If a custom **transform** function is present on the given *options*, any basic transforms are ignored. Any additional input *options* are passed through in the returned *options* object. This method facilitates applying the basic transforms prior to applying the given custom *transform* and is used internally by Plot’s built-in transforms.

## initializer(*options*, *initializer*) <VersionBadge version="0.5.0" /> {#initializer}

This helper composes the *initializer* function with any other transforms present in the *options*, and returns a new *options* object. It is used internally by Plot’s built-in initializer transforms.

## valueof(*data*, *value*, *type*) {#valueof}

```js
Plot.valueof(aapl, "Close")
```

Given an iterable *data* and some *value* accessor, returns an array (a column) of the specified *type* with the corresponding value of each element of the data. The *value* accessor may be one of the following types:

* a string - corresponding to the field accessor (`(d) => d[value]`)
* an accessor function - called as *type*.from(*data*, *value*)
* a number, Date, or boolean — resulting in an array uniformly filled with the *value*
* an object with a **transform** method — called as *value*.transform(*data*)
* an array of values - returning the same
* null or undefined - returning the same

If *type* is specified, it must be Array or a similar class that implements the [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) interface such as a typed array. When *type* is Array or a typed array class, the return value of valueof will be an instance of the same (or null or undefined). When *type* is a typed array, values will be implicitly coerced numbers, and if *type* is Float64Array, Float32Array, or a subclass of the same, null values will be implicitly replaced with NaN. If *type* is not specified, valueof may return either an array or a typed array (or null or undefined).

valueof is not guaranteed to return a new array. When a transform method is used, or when the given *value* is an array that is compatible with the requested *type*, the array may be returned as-is without making a copy.

## column(*source*) <VersionBadge version="0.4.3" /> {#column}

```js
const [X, setX] = Plot.column();
```

This helper for constructing derived columns returns a [*column*, *setColumn*] array. The *column* object implements *column*.transform, returning whatever value was most recently passed to *setColumn*. If *setColumn* is not called, then *column*.transform returns undefined. If a *source* is specified, then *column*.label exposes the given *source*’s label, if any: if *source* is a string as when representing a named field of data, then *column*.label is *source*; otherwise *column*.label propagates *source*.label. This allows derived columns to propagate a human-readable axis or legend label.

This method is used by Plot’s transforms to derive channels; the associated columns are populated (derived) when the **transform** option function is invoked.

## identity <VersionBadge version="0.6.2" /> {#identity}

```js
Plot.contour(data, {width: w, height: h, fill: Plot.identity})
```

This channel helper returns a source array as-is, avoiding an extra copy when defining a channel as being equal to the data.

## indexOf <VersionBadge version="0.6.6" /> {#indexOf}

```js
Plot.lineY(numbers, {x: Plot.indexOf, y: Plot.identity})
```

This channel helper returns an array of numbers [0, 1, 2, 3, …]. It is used internally by marks with zero-based index defaults for channels.

# docs/getting-started.md

---
next:
  text: Plots
  link: /features/plots
---

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

</script>

# Getting started

Observable Plot supports a variety of environments.

## Try Plot online

The fastest way to get started (and get help) with Observable Plot is on [Observable](https://observablehq.com)! Plot is available by default in notebooks as part of Observable’s standard library. To use Plot, simply return the generated plot from a cell like so:

:::plot https://observablehq.com/@observablehq/plot-normal-histogram
```js
Plot.rectY({length: 10000}, Plot.binX({y: "count"}, {x: d3.randomNormal()})).plot()
```
:::

Observable includes a variety of Plot snippets when you click **+** to add a cell, as well as convenient [sample datasets](https://observablehq.com/@observablehq/sample-datasets) to try out Plot features. Or upload a CSV or JSON file to start playing with your data. You can even use [Observable’s chart cell](https://observablehq.com/@observablehq/chart-cell), which uses Plot’s [auto mark](./marks/auto.md) under the hood, to create quick charts without writing code! You can then eject to JavaScript by clicking **+** to see the equivalent Plot code.

<figure>
  <video autoplay loop muted playsinline style="width: 688px; max-width: 100%; aspect-ratio: 688 / 488; border: solid 1px var(--vp-c-text-3); display: inline;">
    <source src="https://videos.ctfassets.net/uklh5xrq1p2j/14CmTWsGQifvA5jZ8s0Usw/6efc7defa063038f8eb65bb269cb3823/Chart_Cell_Demo_Take_2_shorter.mp4" type="video/mp4">
  </video>
  <figcaption>Observable’s chart cell lets you quickly create charts and then eject to Plot code.</figcaption>
</figure>

Observable is free for public use. Sign up for a [Pro account](https://observablehq.com/pricing) to connect to private databases, collaborate on private notebooks, and more.

## Plot in vanilla HTML

In vanilla HTML, you can load Plot from a CDN such as jsDelivr or you can download it locally. We recommend using the CDN-hosted ES module bundle as it automatically loads Plot’s dependency on [D3](https://d3js.org). But for those who need it, we also provide a UMD bundle that exports the `Plot` global when loaded as a plain script.

:::code-group
```html [ESM + CDN]
<!DOCTYPE html>
<div id="myplot"></div>
<script type="module">

import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

const plot = Plot.rectY({length: 10000}, Plot.binX({y: "count"}, {x: Math.random})).plot();
const div = document.querySelector("#myplot");
div.append(plot);

</script>
```

```html [UMD + CDN]
<!DOCTYPE html>
<div id="myplot"></div>
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script src="https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6"></script>
<script type="module">

const plot = Plot.rectY({length: 10000}, Plot.binX({y: "count"}, {x: Math.random})).plot();
const div = document.querySelector("#myplot");
div.append(plot);

</script>
```

```html [UMD + local]
<!DOCTYPE html>
<div id="myplot"></div>
<script src="d3.js"></script>
<script src="plot.js"></script>
<script type="module">

const plot = Plot.rectY({length: 10000}, Plot.binX({y: "count"}, {x: Math.random})).plot();
const div = document.querySelector("#myplot");
div.append(plot);

</script>
```
:::

Plot returns a detached DOM element — either an [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) or [HTML figure](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) element. In vanilla web development, this means you need to insert the generated plot into the page to see it. Typically this is done by selecting a DOM element (such as a DIV with a unique identifier, like `myplot` above), and then calling [*element*.append](https://developer.mozilla.org/en-US/docs/Web/API/Element/append).

If you’d prefer to run Plot locally (or entirely offline), you can download the UMD bundle of Plot along with its dependency, D3, here:

- <a href="./d3.js" download>d3.js</a>
- <a href="./plot.js" download>plot.js</a>

Then, create an `index.html` file as shown above in the **UMD + local** tab. If you prefer smaller minified files, you can download <a href="./d3.min.js" download>d3.min.js</a> and <a href="./plot.min.js" download>plot.min.js</a>, and then update the `src` attributes above accordingly.

## Installing from npm

If you’re developing a web application using Node, you can install Plot via yarn, npm, pnpm, or your preferred package manager.

:::code-group

```bash [yarn]
yarn add @observablehq/plot
```

```bash [npm]
npm install @observablehq/plot
```

```bash [pnpm]
pnpm add @observablehq/plot
```

:::

You can then load Plot into your app as:

```js
import * as Plot from "@observablehq/plot";
```

You can instead import specific symbols if you prefer:

```js
import {barY, groupX} from "@observablehq/plot";
```

Plot includes TypeScript declarations with extensive documentation. We highly recommend using an editor with enhanced code completion such as Visual Studio Code or Observable.

<figure>
  <img style="border: solid 1px var(--vp-c-text-3); display: inline; width: 688px; max-width: 100%; aspect-ratio: 420 / 197;" src="./ts-property.png">
  <figcaption>Modern editors surface documentation and type hints as you write Plot code.</figcaption>
</figure>

## Plot in React

We recommend two approaches for Plot in React depending on your needs.

The first is to server-side render (SSR) plots. This minimizes distracting reflow on page load, improving the user experience. For this approach, use the [**document** plot option](./features/plots.md) to tell Plot to render with React’s virtual DOM. For example, here is a PlotFigure component:

:::code-group
```js [PlotFigure.js]
import * as Plot from "@observablehq/plot";
import {createElement as h} from "react";

export default function PlotFigure({options}) {
  return Plot.plot({...options, document: new Document()}).toHyperScript();
}
```
:::

:::info
For brevity, the virtual `Document` implementation is not shown. You’ll find it linked below.
:::

Then, to use:

:::code-group
```jsx [App.jsx]
import * as Plot from "@observablehq/plot";
import PlotFigure from "./PlotFigure.js";
import penguins from "./penguins.json";

export default function App() {
  return (
    <div>
      <h1>Penguins</h1>
      <PlotFigure
        options={{
          marks: [
            Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm"})
          ]
        }}
      />
    </div>
  );
}
```
:::

See our [Plot + React CodeSandbox](https://codesandbox.io/s/plot-react-f1jetw?file=/src/App.js) for details.

Server-side rendering is only practical for simple plots of small data; complex plots, such as geographic maps or charts with thousands of elements, are better rendered on the client because the serialized SVG is large. For this second approach, use [useRef](https://react.dev/reference/react/useRef) to get a reference to a DOM element, and then [useEffect](https://react.dev/reference/react/useEffect) to generate and insert your plot.

:::code-group
```jsx [App.jsx]
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {useEffect, useRef, useState} from "react";

export default function App() {
  const containerRef = useRef();
  const [data, setData] = useState();

  useEffect(() => {
    d3.csv("/gistemp.csv", d3.autoType).then(setData);
  }, []);

  useEffect(() => {
    if (data === undefined) return;
    const plot = Plot.plot({
      y: {grid: true},
      color: {scheme: "burd"},
      marks: [
        Plot.ruleY([0]),
        Plot.dot(data, {x: "Date", y: "Anomaly", stroke: "Anomaly"})
      ]
    });
    containerRef.current.append(plot);
    return () => plot.remove();
  }, [data]);

  return <div ref={containerRef} />;
}
```
:::

This example also demonstrates asynchronously loading CSV data with [useState](https://react.dev/reference/react/useState). If you want to update your plot, say because your data has changed, simply throw away the old plot using [*element*.remove](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) and then replace it with a new one. That’s done above in the useEffect’s cleanup function.

## Plot in Vue

As with React, you can use either server- or client-side rendering with Plot and Vue.

For server-side rendering (SSR), use the [**document** plot option](./features/plots.md) to render to Vue’s virtual DOM. For example, here is a PlotFigure component:

:::code-group
```js [PlotFigure.js]
import * as Plot from "@observablehq/plot";
import {h} from "vue";

export default {
  props: {
    options: Object
  },
  render() {
    return Plot.plot({
      ...this.options,
      document: new Document()
    }).toHyperScript();
  }
};
```
:::

:::info
For brevity, the virtual `Document` implementation is not shown. You’ll find it linked below.
:::

Then, to use:

:::code-group
```vue [App.vue]
<script setup>
import * as Plot from "@observablehq/plot";
import PlotFigure from "./components/PlotFigure.js";
import penguins from "./assets/penguins.json";
</script>

<template>
  <h1>Plot + Vue</h1>
  <PlotFigure
    :options="{
      marks: [
        Plot.dot(penguins, {x: 'culmen_length_mm', y: 'culmen_depth_mm'}),
      ],
    }"
  />
</template>
```
:::

See our [Plot + Vue CodeSandbox](https://codesandbox.io/p/sandbox/plot-vue-jlgg2w?file=/src/App.vue) for details.

For client-side rendering, use a [render function](https://vuejs.org/guide/extras/render-function.html) with a [mounted](https://vuejs.org/api/options-lifecycle.html#mounted) lifecycle directive. After the component mounts, render the plot and then insert it into the page.

```js
import * as Plot from "@observablehq/plot";
import {h, withDirectives} from "vue";

export default {
  props: ["options"],
  render() {
    const {options} = this;
    return withDirectives(h("div"), [
      [
        {
          mounted(el) {
            el.append(Plot.plot(options));
          }
        }
      ]
    ]);
  }
};
```

As with React, to update your plot for whatever reason, simply render a new one and replace the old one. You can find more examples on [our GitHub](https://github.com/observablehq/plot/tree/main/docs) as this documentation site is built with VitePress and uses both client- and server-side rendering for plots!

## Plot in Svelte

Here’s an example of client-side rendering in Svelte. For server-side rendering, see [#1759](https://github.com/observablehq/plot/discussions/1759).

:::code-group
```svelte [App.svelte]
<script lang="ts">
  import * as Plot from '@observablehq/plot';
  import * as d3 from 'd3';

  let div: HTMLElement | undefined = $state();
  let data = $state(d3.ticks(-2, 2, 200).map(Math.sin));

  function onMousemove(event: MouseEvent) {
    const [x, y] = d3.pointer(event);
    data = data.slice(-200).concat(Math.atan2(x, y));
  }

  $effect(() => {
    div?.firstChild?.remove(); // remove old chart, if any
    div?.append(Plot.lineY(data).plot({ grid: true })); // add the new chart
  });
</script>

<div onmousemove={onMousemove} bind:this={div} role="img"></div>
```
:::

See our [Plot + Svelte REPL](https://svelte.dev/playground/e65b5c87ae7e44239cef41ec3df28f52?version=5.2.7) for details.

## Plot in Node.js

You can use Plot to server-side render SVG or PNG in Node.js. Use [JSDOM](https://github.com/jsdom/jsdom) for a DOM implementation via the **document** option, then serialize the generated plot using **outerHTML**.

```js
import {readFile} from "node:fs/promises";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {JSDOM} from "jsdom";

const penguins = d3.csvParse(await readFile("./penguins.csv", "utf-8"), d3.autoType);

const plot = Plot.plot({
  document: new JSDOM("").window.document,
  marks: [
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", stroke: "species"})
  ]
});

plot.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
plot.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

process.stdout.write(plot.outerHTML);
```

To rasterize SVG as PNG, you could use [canvg](https://github.com/canvg/canvg) and [node-canvas](https://github.com/Automattic/node-canvas), or [sharp](https://sharp.pixelplumbing.com/):

```js
process.stdout.write(await sharp(Buffer.from(plot.outerHTML, "utf-8")).png().toBuffer());
```

For better font rendering, consider [Puppeteer](https://pptr.dev/).

# docs/index.md

---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
titleTemplate: "The JavaScript library for exploratory data visualization"

head:
  - - link
    - rel: canonical
      href: https://observablehq.com/plot/
  - - meta
    - name: title
      content: Observable Plot
  - - meta
    - name: description
      content: The JavaScript library for exploratory data visualization
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:site
      content: "@observablehq"
  - - meta
    - property: og:description
      content: The JavaScript library for exploratory data visualization
  - - meta
    - property: og:image
      content: https://static.observableusercontent.com/thumbnail/64f414fef8a91248865f5759641b0cf537bc87c0aaf57dc368ffe673013eccaa.jpg
  - - meta
    - property: og:site_name
      content: Observable
  - - meta
    - property: og:title
      content: Observable Plot
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:url
      content: https://observablehq.com/plot/

hero:
  name: "Observable Plot"
  text: "The JavaScript library for exploratory data visualization"
  tagline: "Create expressive charts with concise code"
  image:
    src: /plot.svg
    alt: Observable Plot
  actions:
    - theme: brand
      text: Get started
      link: /getting-started
    - theme: alt
      text: What is Plot?
      link: /what-is-plot
    - theme: alt
      text: Examples
      link: https://observablehq.com/@observablehq/plot-gallery

features:
  - title: Marks
    details: "Plot doesn’t have chart types. Instead, it has layered geometric shapes such as bars, dots, and lines."
    link: /features/marks
  - title: Scales
    details: "Scales map an abstract value such as time or temperature to a visual value such as position or color."
    link: /features/scales
  - title: Transforms
    details: "Derive data on-the-fly while plotting, say to bin quantitative values or compute a rolling average."
    link: /features/transforms
  - title: Facets
    details: "Small multiples facilitate comparison by repeating a plot across partitions of data."
    link: /features/facets
  - title: Projections
    details: "Plot supports GeoJSON and D3’s spherical projection system for geographic maps."
    link: /features/projections
  - title: Built with D3
    details: "Plot is built by the same team as D3. If you know some D3, you’ll be right at home with Plot."
    link: https://d3js.org
    linkText: Visit D3
  - title: Plot without code
    details: With Observable’s chart cell, quickly create plots with a GUI, then eject to code to customize.
    link: https://observablehq.com/@observablehq/chart-cell
    linkText: Try chart cell
  - title: Built by Observable
    details: Plot is developed by Observable, the platform for collaborative data analysis.
    link: https://observablehq.com
    linkText: Visit Observable
---

<style>

:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(-30deg, var(--hero-brand-contrast), var(--vp-c-brand-1));
}

:root.dark .VPHero .VPImage {
  filter: drop-shadow(0 4px 8px black);
}

</style>

<script setup>

import {onMounted} from "vue";

onMounted(() => {
  const p = document.querySelector(".VPHero .text");
  const s = document.querySelector("#hero-text");
  if (!p || !s) return;
  while (p.lastChild) p.lastChild.remove();
  p.append(s);
});

</script>

<template>
  <div id="hero-text">The JavaScript library for
  <span style="display: inline-block; position: relative;">exploratory<svg style="color: var(--vp-c-brand-3); position: absolute; z-index: -1; top: 1em; left: 0.2em; width: calc(100% - 0.7em); height: auto;" width="240" height="11" viewBox="0 0 240 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.766 10.187c.939-.024.386-.885.552-1.401 1.105-.301.553.626.962 1.061.685-.263 1.171-1.1 1.696-1.085.044.144.15.191.044.378.697-.736 2.21-.134 2.995-1.052a.55.55 0 0 1 .127.215 3.35 3.35 0 0 1-.204-1.204c.42-.034.751-.593.94 0-.255 0-.266.23-.377.416l.426-.273c.448.813-.586.316-.553.927.84-.306 1.802-1.037 2.476-.831.182.803-1.525.339-.608 1.023l-1.033-.268c.85 1.248-.625-.057.171 1.276 1.348.177 1.47-.478 2.818-.3.276-.479-.132-.66.144-1.124 1.857-.885 1.602 1.984 2.94.846.337-.555.42-1.582 1.442-1.08l-.276.889c1.298.038.668-1.348 2.06-.784-.226.368-1.005.344-.8.444.917.689.59-.545 1.27-.569l.16.827c1.371-.181 2.863-.827 4.388-1.037-.072.249-.326.512.044.746 1.912-.478 4.123-.058 6.007.368l.68-.727c.05.015.095.04.132.074a.275.275 0 0 1 .077.118c.014.044.015.091.004.136a.27.27 0 0 1-.07.122c.74.243 0-.445.354-.732.414-.062.552.383.315.603 1.248-.636 3.586-1.401 4.973-.694l-.254.22c1.06.249 1.105-1.477 2.127-.855l-.182.129c2.293.23 4.785-.478 6.564.52.293-1.017 2.272.393 2.365-1.022 1.327.664.967.927 2.813 1.348.492.052.702-.899 1.299-1.061l.044.731.79-.794.47.87.552-.205a.66.66 0 0 1-.332-.2.517.517 0 0 1-.132-.33c.873-.354 2.177.477 2.21.831l2.078-.679c-.039.301-.387.411-.657.607 1.105-.779.226.77 1.232.053-.144-.163.06-.44.077-.588.553.435 1.691.416 2.547.205l-.149.512c1.558.1 3.271-.31 5.018-.335-.636-.224-.514-1.109 0-1.204l.226.774c.32-.478-.552-.282.122-.884.652.076.464.875.094 1.138l.784-.287c.056.23-.127.358-.165.655.309-.478 1.387.75 1.834-.096l.05.23c1.746-.03 2.53-.316 3.95-.383 0-.674.553-.535.984-1.085 1.05.196 2.21.707 3.482.63.878-.343.243-.568.635-.955.077.612 1.332.535.69.985a15.353 15.353 0 0 0 3.83-.68c-.21-.243-.447-.353-.331-.563a.738.738 0 0 1 .275.01c.09.02.173.058.245.11a.58.58 0 0 1 .169.188c.04.072.061.151.062.232l-.088.067c2.127-.956 4.973 1.706 6.669.41l-.099.068 1.763-.684c.817.1-.481.478.127.842 1.9-1.043 3.022.12 4.586-.574 1.243 1.793 4.327-.167 5.979.956l-.1-.42c.426-.421.52.234.835.33-.05-.33-.464-.378-.205-.613 3.598-.545 7.438.598 11.129.956 1.348.11.757-2.203 2.465-1.195l-.481.794c2.719-.956 5.564 0 8.233-.77-.154.182-.16.416-.425.416.552.574 2.083.034 2.094-.435.42.053.1.425.354.665.552.339 1.42-.732 1.718-.158.05.09-.16.186-.265.23.37-.278 1.719.076 1.365-.589 1 .32 1.917-.287 2.713.105.553-.736 1.713.364 1.884-.683-.077 1.08 1.752.875 2.387.377-.215.326.553.345.299.794.718 0 1.381-.206 1.265-.76 1.315 1.305 2.686-1.018 3.415.645a45.888 45.888 0 0 1 6.078-1.17c-.082 1.075-2.138.09-2.066 1.218 1.834-.425 2.906-1.343 4.719-1.066.47.153-.276.478-.437.65 1.835-.43 3.537.148 5.172-.42 0 .1-.182.21-.348.291.321-.033.741.167.713-.325l-.315.13c-.497-.718 1.304-1.468 1.365-1.841-.553 1.396 1.602.377.707 2.137a.73.73 0 0 0 .337-.263.58.58 0 0 0 .1-.383c.315.1.409.297.083.665 1.155-.254.757-.78 1.801-.75 0 .233-.221.324-.337.601.553-.478 1.078-.908 1.951-.697-.056.143.044.33-.216.325 1.509-.048 2.603-1.195 4.249-.722-.513 1.023.553.349.625 1.243l.895-.254-.348-.44c.785.034 1.492-.602 2.155-.296l-.591.354 1.47-.139-.824-.354c.807-.444-.055-1.132.978-.86-.21.086.785.029 1.177.56.398-.278.801-.57 1.376-.335.138.291-.149.984-.055 1.176.398-.736 1.834-.168 2.337-.956-.143.227-.192.49-.138.745l.337-.597c.359.2.409.296.337.669 1.105.134-.309-1.138.967-.626-.105.048-.055.138-.27.23 1.287.277 2.519-.335 3.702 0 .326.903-1.05.195-.669.955 1.724-.129 3.592-.999 5.25-.74l-.31-.106c.277-1.262 1.221.66 2.083.086-.21.086-.298.693-.237.555 1.105.234 2.343-.249 4.083-.603l-.226.32c.657.311 1.763.216 2.481.383.226-.315.641-.253.403-.731 2.166 1.912 4.305-.89 6.228.726-.238 0-.553.268-.387.273l1.702-.244c-.111-.554-.21-.34-.553-.784.124-.163.292-.298.489-.392.198-.094.419-.145.644-.148-.774.34-.028.884.287 1.205-.049-.173.072-.354.05-.526.846 1.008.199-1.11 1.376-.407l-.077.287c.458-.134.889-.478 1.37-.401.177.645-.492.282-.552.803.685 0 1.403-1.162 1.994-.507-.298.167-.718.158-1.016.325.641.77.729.583 1.221.717h-.044l1.138.378-.282-.21c.928-1.635 1.752-.25 2.951-1.3-1.166.994-.21.592-.332 1.309.288.21.724.454.586.65.553-.564.89.478 1.696-.34 0 .235.581.044.431.627.713-.163-.149-.411-.077-.703 1.133-.76 2.514 1.061 4.139.029 1.376-.397 1.658-1.171 2.94-1.515.403.392-.393.836-.393.836.267.161.581.255.906.27a1.97 1.97 0 0 0 .934-.184c-.138.196 0 .373.172.64.519-.038.386-.831 1.05-.477a3.24 3.24 0 0 1-.553.918c.619-.192 1.243-.603 1.884-.79.149.412-.409.603-.646.856.718-.153 1.851-.296 2.105-.927l-.442-.248c.26 0 .105.559-.094.669-.63.478-.862-.258-.884-.478l.459-.134c-.387-1.382-1.818.148-2.719.033l.431-.956-.973.784c-.182-.263-.287-.822.166-.956-.624-.516-.591.33-1.105-.239-.055-.086-.028-.134.033-.172l-.646.273c.132-.201-.072-.703.309-.545-1.105-.617-1.873.674-2.26-.096l.099-.057c-1.596.272-.193.721-1.414 1.534l-.713-1.83-.188.721c-.16-.033-.481-.1-.409-.387-.63.478.089.32-.287.78-.752-.699-2.172.229-2.293-.957-.31.545.729.478-.127.813-.183-1.258-.978.181-1.658-.416.254-.636.917-.273.226-.875-.486 1.076-1.386-.282-2-.096-.066.87-1.332.32-2.354.579.078-.292-1.89-.54-2.818-.885l.033-.148c-.221.87-1.182.674-1.901.832a.906.906 0 0 1 .132-.55c.102-.169.258-.31.449-.406h-.669a.979.979 0 0 1-.34.327 1.167 1.167 0 0 1-.478.151l.194-.65c-.885 0-1.813.712-2.94.244-.083.607.84 1.725-.381 2.103-.034-.335-.056-.899.27-1.028-.105.043-.381.263-.585.12l.502-.545c-.508-.258-.287.478-.701.397 0-.478-.293-.35-.221-.722.11-.038.359.205.525 0a1.931 1.931 0 0 1-.691-.264 1.649 1.649 0 0 1-.503-.487c.028.268-.028.636-.37.684-.89 0-.282-.574-.79-.832-.227.325-.78-.033-.824.674-.259 0-.293-.34-.387-.535-.469.3-2.149.033-1.657.793l.116.053s-.05 0-.078.033c-1.525.66-3.105-.478-4.608-.224V3.34c-.895.244-1.984.106-2.636.593a.711.711 0 0 1-.402-.28.553.553 0 0 1-.084-.442c-.691.158-.774.416-1.746 0 .701-.396-.221-.373.713-.287-.879-.224-1.067-.607-2.039 0 .342-.597-.641-.774-1.067-.602l.608.445c-.436.053-.88.039-1.31-.043l.254-.794c-1.784-1.004-3.315 1.578-4.647-.067-.497.545.973.411.553 1.052-.829-.124-1.658-1.286-1.929-1.29-1.132-.479-1.105 1.137-2.282.812a.818.818 0 0 1 .031.774.938.938 0 0 1-.264.323 1.11 1.11 0 0 1-.397.198c-.829-.124-.994-1.214-.464-1.434.205 0 .299.072.288.168.27-.096.629-.21.303-.526l-.116.282c-.403-.297-1.552-.292-1.271-.75-.635.257-.281.477.183.616-1.061-.435-1.658-.053-2.763-.344.171.162.326.478.155.478-1.608-.378-.724.526-1.824.636-.608-.445.249-1.033-.862-.684-.668-.306-.127-.755.149-.985-1.016.536-1.867-.387-2.442-.478l.553-.22a1.892 1.892 0 0 1-.846.12l.293.573c-.309-.105-.553-.11-.553-.348-.326.368.227.956-.42 1.434-.403-.297-1.265.286-1.392-.478 1.298.272-.127-.76.978-.866a1.102 1.102 0 0 1-.851.024c-.044-.086.044-.157.133-.2-1.233-.689-.592.846-1.879.807.171-.42-.287-.808-.497-.721.519 0 .237.712-.249 1.027-.823-.34-.906.235-1.337.187l.491.162c-.176.426-.585.364-1.165.478-.045-.33.524-.22.326-.368-.652.736-1.437-.793-2.338-.306-.409-.291-.027-.798-.387-.999-1.011.54-1.077-.588-2.133-.148.293.574.349.435-.403.985l1.735-.387-1.105.822c.525 0 1.105-.35 1.42-.249-.553.478-.481.316-.238.794-.701-.86-1.425.478-2.21-.1l.044-1.41c-1.232-.641-2.21.702-3.823.334l.513.248c-.221.56-.994.072-1.519.292.055-.478-.271-.645-.492-.956.028.349-1.177-.043-1.337.899l-.707-.627c-1.305-.267-1.503 1.33-2.763 1.157.381-.507-.183-.846.657-1.21-.414 0-.79-.095-.801.23-.276-.263-1.199.646-1.575.215-.182.206-.243.698-.713.655a.337.337 0 0 1 0-.234c0 .234-.735.31-.331.837-1.271-1.478-3.592.095-4.708-1.172-.936.165-1.883.277-2.835.335.05-.139 0-.234.16-.186-1.143-.44-.707 1.352-2.005.86-.664-.765.69-.411.276-.703-.171-1.553-1.564.21-2.437-.702l.21-.091c-.663-.555-1.608.564-2.713.454a.326.326 0 0 0 0-.234c-.746.784-2.155 1.051-3.205 1.271.326-.607.475-.32.276-.956-.47.091.138.99-.801 1.167-.304-.33-.984-.622-1.078-1.282l.89-.019c-.459-.85-1.149.034-1.613-.114l.055-.368c-1.36.124-1.376 1.06-2.835.999l.155.282c-.796.956-.674-.521-1.465.172l-.248-.956c-.871.453-1.797.82-2.763 1.094.552-.698 1.658-1.06 2.315-1.477-.519 0-1.774.072-2.044.54.21-.09.475-.325.685-.181a2.832 2.832 0 0 1-1.094.83 3.298 3.298 0 0 1-1.42.27c.171-1.832-2.713-.455-3.482-1.865-1.834.693-3.652-.258-5.796-.13.774 1.435-.625.049-.481 1.507-.497.1-.685.076-.729 0l-1.525-.86c-.365-.421.469-.326.42-.65-1.106-.106-.465-.618-1.194-1 .155.521-.37.75-1 .56l.901.659c-1.52.793-1.338-1.214-2.868-.43l.48-.478c-.79.277-2.917 0-3.674 1.204-.144-.167-.332-.564 0-.674-1.89-.148-4.183 1.31-5.664.612l.138-.358c-.348.105-.602.678-1.05.325 0-.148.138-.359 0-.378-.182.124-.923.64-1.392.44l.386-.411c-1.85-.44-2.807 1.023-4.343 1.29 0-1.051-1.475-1.376-2.21-1.53V.685c-2.15-.086-3.625.956-5.598 1.4-1.265-1.118-4.188-.392-6.194-.99.31.182 0 .818-.37.957-.475-.206-1.266.755-1.221-.21h.165c-.375-.957-1.326-.67-2.072-.675l-.083 1.267c-2.006-1.778-5.106.813-6.227-.803-.459.33-1.045.34-1.498.67v-.68a12.396 12.396 0 0 0-3.575 0l.31-.478c-.912 0-1.072 1.98-1.912 2.042l-.288-1c-1.591.053-3.232-.774-4.763.192 0-.148.055-.445.31-.478-.746 0-2.918-.588-2.587.788-.06-.903-1.657-.038-2.48.388l.104-.689c-.685.875-.701 1.11-1.696 1.377-.243-.076-.238-.526.088-.368-.812-.32-.59.655-1.574.33l.342-.435c-.823-.029-.746.2-1.177.707-.503.287-1.564-.114-1.713-.712-.094.368-.52.875-1.011.717a.38.38 0 0 1 .013-.245.442.442 0 0 1 .164-.2c-1.393-.406-2 .851-2.973.235a.553.553 0 0 0-.182-.392 9.431 9.431 0 0 1 1.89.028c0-.616-.912-.688-.255-1.563-.685.478-1.845 1.54-2.713 1.286a.84.84 0 0 1-.1-.215l.061-.072a.668.668 0 0 0-.295 0 .61.61 0 0 0-.257.125 1.992 1.992 0 0 0-.718-.158c-.128-.507-1.023-.234-1.465-.244.072.67-.508.583.06 1.119-.07-.048.078-.086.366-.125a.528.528 0 0 0 .188-.076l-.028.062c.287-.033.663-.062 1.105-.09-.332.358-.68.654-1.183.3-.204.445-.43.894-.552 1.11-.647-.914-1.83-1.377-2.022-1.946-1.321.43-3.145.368-3.918 1.663-.376.177-.459-.344-.614-.535.216-.139.476-.13.586-.316-.74.354-2.249.216-2.381 1.105-.984-.364.491-.837-.818-.636l.166-.277c-2.675-1.291-4.09 2.433-7.068.755.204.105.304.148.354.296-3.316-.645-6.709 1.038-10.018-.062-.94-.205-1 .359-1.531.818l-.249-.713-.906.88c-1.315.679-2.47-1.65-4.117-.411l.254.478c-.624-.058-1.939.387-1.873-.177-.055.09-.166.516-.425.272l-.044-.372-1.487.712c-1.199-.215.078-1.506-1.658-1.492C.895 5.105-.22 6.114.04 6.362c.178.01.347.073.478.179a.645.645 0 0 1 .24.4l-.558.225C.17 8.279-.194 9.44 1.304 10.144l.917-.732.36.521-.818.1c.513.479.784 0 1.105-.305.07.225.233.42.458.55l.907-1.114c.149.43-.376.884.292 1.094.426-.516-.502-.956.233-1.314.513.478.403.898.933.44a.447.447 0 0 1 .012.336.525.525 0 0 1-.233.27c.476-.367 1.304-.214 1.525-.817.553.598 1.658-.248 1.691.808.29-.433.74-.77 1.277-.956-.752 1.3 1.724 0 1.591 1.348.553-1.162 2.21-.617 3.255-1.3-.055.095-.16.282-.265.23.624.061.823.391 1.237.592 0-.956.967-1.195 1.448-1.797.812.87-.392 1.118-.1 1.974-.082-.755 1.272-.813.973-1.434.614.53.514.248.862 1.008.028-1.17.553-.22.962-.956.873.54.282 1.086 1.182.689.453.354-.342.808-.342.808Zm21.793-2.93-.447.057.447-.058Zm1.818-.091a7.552 7.552 0 0 0-.801 0c-.072-.23 0-.478.171-.478-.083.186.348.305.63.478Zm-4.128-4.49c.288-.109.393 0 .442.159-.172.02-.343.053-.508.1v.081a.973.973 0 0 1 .066-.34Z"/></svg>
  </span> data visualization</div>
</template>

# docs/interactions/crosshair.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import alphabet from "../data/alphabet.ts";
import aapl from "../data/aapl.ts";
import penguins from "../data/penguins.ts";

</script>

# Crosshair mark <VersionBadge version="0.6.7" />

The **crosshair mark** shows the *x* (horizontal↔︎ position) and *y* (vertical↕︎ position) value of the point closest to the [pointer](./pointer.md) on the bottom and left sides of the frame, respectively.

:::plot defer https://observablehq.com/@observablehq/plot-crosshair
```js
Plot.plot({
  marks: [
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", stroke: "sex"}),
    Plot.crosshair(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm"})
  ]
})
```
:::

For charts which have a “dominant” dimension, such as time in a time-series chart, use the crosshairX or crosshairY mark for the [pointerX](./pointer.md#pointerX) or [pointerY](./pointer.md#pointerY) transform as appropriate.

:::plot defer https://observablehq.com/@observablehq/plot-crosshairx
```js
Plot.plot({
  marks: [
    Plot.lineY(aapl, {x: "Date", y: "Close"}),
    Plot.crosshairX(aapl, {x: "Date", y: "Close"})
  ]
})
```
:::

If either **x** or **y** is not specified, the crosshair is one-dimensional.

:::plot defer https://observablehq.com/@observablehq/plot-one-dimensional-crosshair
```js
Plot.plot({
  marks: [
    Plot.tickX(penguins, {x: "body_mass_g"}),
    Plot.crosshairX(penguins, {x: "body_mass_g"})
  ]
})
```
:::

The **color** option sets the fill color of the text and the stroke color of the rule. This option can be specified as a channel to reinforce a color encoding.

:::plot defer https://observablehq.com/@observablehq/plot-color-crosshair
```js
Plot.plot({
  marks: [
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", stroke: "sex"}),
    Plot.crosshair(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", color: "sex", opacity: 0.5})
  ]
})
```
:::

The crosshair mark does not currently support any format options; values are displayed with the default format. If you are interested in this feature, please upvote [#1596](https://github.com/observablehq/plot/issues/1596). In the meantime, you can implement a custom crosshair using the [pointer transform](./pointer.md) and a [text mark](../marks/text.md).

## Crosshair options

The following options are supported:

- **x** - the horizontal position; bound to the *x* scale
- **y** - the vertical position; bound to the *y* scale
- **color** - shorthand for setting both **ruleStroke** and **textFill**
- **opacity** - shorthand for setting **ruleStrokeOpacity**
- **ruleStroke** - the rule stroke color
- **ruleStrokeOpacity** - the rule stroke opacity; defaults to 0.2
- **ruleStrokeWidth** - the rule stroke width; defaults to 1
- **textFill** - the text fill color
- **textFillOpacity** - the text fill opacity
- **textStroke** - the text stroke color; defaults to *white* to improve legibility
- **textStrokeOpacity** - the text stroke opacity; defaults to 1
- **textStrokeWidth** - the text stroke width; defaults to 5
- **maxRadius** - the maximum pointing distance, in pixels; defaults to 40

The crosshair mark supports faceting, but most other mark options are ignored.

## crosshair(*data*, *options*) {#crosshair}

```js
Plot.crosshair(cars, {x: "economy (mpg)", y: "cylinders"})
```

Returns a new crosshair for the given *data* and *options*, drawing horizontal and vertical rules. The corresponding **x** and **y** values are also drawn just outside the bottom and left sides of the frame, respectively, typically on top of the axes. If either **x** or **y** is not specified, the crosshair will be one-dimensional.

## crosshairX(*data*, *options*) {#crosshairX}

```js
Plot.crosshairX(aapl, {x: "Date", y: "Close"})
```

Like crosshair, but using [pointerX](./pointer.md#pointerX) when *x* is the dominant dimension, like time in a time-series chart.

## crosshairY(*data*, *options*) {#crosshairY}

```js
Plot.crosshairY(aapl, {x: "Date", y: "Close"})
```

Like crosshair, but using [pointerY](./pointer.md#pointerY) when *y* is the dominant dimension.

# docs/interactions/pointer.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref, shallowRef, onMounted} from "vue";

const pointered = ref(true);
const aapl = shallowRef([]);
const industries = shallowRef([]);
const olympians = shallowRef([]);
const penguins = shallowRef([]);
const linetip = ref("x");
const recttip = ref("x");

onMounted(() => {
  d3.csv("../data/aapl.csv", d3.autoType).then((data) => (aapl.value = data));
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
  d3.csv("../data/bls-industry-unemployment.csv", d3.autoType).then((data) => (industries.value = data));
  d3.csv("../data/penguins.csv", d3.autoType).then((data) => (penguins.value = data));
});

</script>

# Pointer transform <VersionBadge version="0.6.7" />

The **pointer transform** filters a mark interactively such that only the point closest to the pointer is rendered. It is typically used to show details on hover, often with a [tip](../marks/tip.md) or [crosshair](./crosshair.md) mark, but it can be paired with any mark.

To demonstrate, below the pointer transform filters a filled <span style="border-bottom: solid 2px var(--vp-c-red);">red</span> dot behind a stroked <span style="border-bottom: solid 2px currentColor;">{{ $dark ? "white" : "black"}}</span> dot. As you hover the chart, only the closest red dot to the pointer is rendered. If you remove the pointer transform by toggling the checkbox, all the red dots will be visible.

<p>
  <label class="label-input">
    Use pointer:
    <input type="checkbox" v-model="pointered">
  </label>
</p>

:::plot defer hidden https://observablehq.com/@observablehq/plot-pointer-transform
```js
Plot.plot({
  marks: [
    Plot.dot(penguins, (pointered ? Plot.pointer : (o) => o)({x: "culmen_length_mm", y: "culmen_depth_mm", fill: "red", r: 8})),
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm"})
  ]
})
```
:::

<div v-if="pointered">

```js-vue
Plot.plot({
  marks: [
    Plot.dot(penguins, Plot.pointer({x: "culmen_length_mm", y: "culmen_depth_mm", fill: "red", r: 8})),
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm"})
  ]
})
```

</div>
<div v-else>

```js-vue
Plot.plot({
  marks: [
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", fill: "red", r: 8}),
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm"})
  ]
})
```

</div>

The pointer transform is similar to the [filter](../transforms/filter.md) and [select](../transforms/select.md) transforms: it filters the mark’s index to show a subset of the data. The difference is that the pointer transform is *interactive*: it listens to [pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) and re-renders the mark as the closest point changes. Since the mark is lazily rendered during interaction, it is fast: only the visible elements are rendered as needed. And, like the filter and select transforms, unfiltered channel values are incorporated into default scale domains.

The pointer transform supports both one- and two-dimensional pointing modes. The two-dimensional mode, [pointer](#pointer), is used above and is suitable for scatterplots and the general case: it finds the point closest to the pointer by measuring distance in *x* and *y*. The one-dimensional modes, [pointerX](#pointerX) and [pointerY](#pointerY), in contrast only consider distance in one dimension; this is desirable when a chart has a “dominant” dimension, such as time in a time-series chart, the binned quantitative dimension in a histogram, or the categorical dimension of a bar chart.

Try the different modes on the line chart below to get a feel for their behavior.

<p>
  <span class="label-input">
    Pointing mode:
    <label style="margin-left: 0.5em;"><input type="radio" name="linetip" value="xy" v-model="linetip" /> pointer</label>
    <label style="margin-left: 0.5em;"><input type="radio" name="linetip" value="x" v-model="linetip" /> pointerX</label>
    <label style="margin-left: 0.5em;"><input type="radio" name="linetip" value="y" v-model="linetip" /> pointerY</label>
  </span>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-pointer-modes-x-y-and-xy
```js-vue
Plot.lineY(aapl, {x: "Date", y: "Close", tip: "{{linetip}}"}).plot()
```
:::

“One-dimensional” is a slight misnomer: the pointerX and pointerY transforms consider distance in both dimensions, but the distance along the non-dominant dimension is divided by 100. Below, the pointerX transform is applied to a multi-series line chart; the closest point in *x* is chosen, while *y* is used to “break ties” such that you can focus different series by moving the mouse vertically.

:::plot defer https://observablehq.com/@observablehq/plot-multi-series-line-chart-interactive-tips
```js
Plot.plot({
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(industries, {x: "date", y: "unemployed", stroke: "industry", tip: "x"})
  ]
})
```
:::

One-dimensional pointing makes even small bars or rects easily hoverable. If you switch the histogram below to two-dimensional pointing, you must hover near a rect’s centroid (shown in <span style="border-bottom: solid 2px var(--vp-c-red);">red</span>) to trigger a tip, whereas one-dimensional pointing triggers the tip anywhere in the chart.

<p>
  <span class="label-input">
    Pointing mode:
    <label style="margin-left: 0.5em;"><input type="radio" name="recttip" value="xy" v-model="recttip" /> pointer</label>
    <label style="margin-left: 0.5em;"><input type="radio" name="recttip" value="x" v-model="recttip" /> pointerX</label>
  </span>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-one-dimensional-pointing
```js-vue
Plot.plot({
  x: {label: "Daily volume (log₁₀)"},
  marks: [
    Plot.rectY(aapl, Plot.binX({y: "count"}, {x: (d) => Math.log10(d.Volume), thresholds: 40, tip: "{{recttip}}"})),
    Plot.dot(aapl, Plot.stackY(Plot.binX({y: "count"}, {x: (d) => Math.log10(d.Volume), thresholds: 40, stroke: "red"})))
  ]
})
```
:::

This reveals an important caveat: the pointer transform understands only points and not the arbitrary geometry of marks. By default, the pointer transform only focuses the closest point if it is within 40 pixels of the pointer (in either one or two dimensions, depending on the pointing mode). With large marks, there may be “dead spots” that do not trigger pointing even when the pointer is within the displayed mark. You can mitigate dead spots either by switching to one-dimensional pointing, if appropriate, or by setting the **maxRadius** option to increase the pointing distance cutoff.

Another caveat is that since the pointer transform only focuses one point at a time, if points are coincident (or nearly so), some points may not be focusable. In the future, the pointer transform might allow focusing multiple points simultaneously, or some method of cycling through nearby points. If you are interested in this feature, please upvote [#1621](https://github.com/observablehq/plot/issues/1621).

The pointer transform will prefer the midpoint of the **x1** and **x2** channels, if present, to the **x** channel, and likewise for **y1**, **y2**, and **y**; this allows the pointer transform to be applied to a rect, bar, area, or other mark with paired channels. It also enables these marks to support the **tip** mark option. (If no *x* or *y* channels are specified, the pointer transform respects the **frameAnchor** option.)

The **px** and **py** channels may be used to specify pointing target positions independent of the displayed mark. Below, text in the top-left corner shows the focused date and closing price. The focused point is also highlighted with a red dot and rule.

:::plot defer https://observablehq.com/@observablehq/plot-pointer-target-position
```js
Plot.plot({
  height: 160,
  y: {axis: "right", grid: true, nice: true},
  marks: [
    Plot.lineY(aapl, {x: "Date", y: "Close"}),
    Plot.ruleX(aapl, Plot.pointerX({x: "Date", py: "Close", stroke: "red"})),
    Plot.dot(aapl, Plot.pointerX({x: "Date", y: "Close", stroke: "red"})),
    Plot.text(aapl, Plot.pointerX({px: "Date", py: "Close", dy: -17, frameAnchor: "top-left", fontVariant: "tabular-nums", text: (d) => [`Date ${Plot.formatIsoDate(d.Date)}`, `Close ${d.Close.toFixed(2)}`].join("   ")}))
  ]
})
```
:::

As the above chart shows, a plot can have multiple pointer transforms. Each pointer transform functions independently (with the exception of *click-to-stick*, described next), though we recommend configuring them with the same target positions and pointing mode so that the same point is focused across marks.

The pointer transform supports “click-to-stick”: clicking on the chart locks the currently-focused point until you click again. By locking the pointer, you can select text from the tip for copy and paste. If a plot has multiple pointer transforms, clicking will lock all pointer transforms.

The pointer transform emits an [*input* event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event) whenever the focused points changes, and sets the value of the plot element to the focused data. This allows you to use a plot as an [Observable view](https://observablehq.com/@observablehq/views) (viewof), or to register an *input* event listener to react to pointing.

```js
const plot = Plot.plot(options);

plot.addEventListener("input", (event) => {
  console.log(plot.value);
});
```

## Pointer options

The following options control the pointer transform:

- **px** - the horizontal↔︎ target position; bound to the *x* scale
- **py** - the vertical↕︎ target position; bound to the *y* scale
- **x** - the fallback horizontal↔︎ target position; bound to the *x* scale
- **y** - the fallback vertical↕︎ target position; bound to the *y* scale
- **x1** - the starting horizontal↔︎ target position; bound to the *x* scale
- **y1** - the starting vertical↕︎ target position; bound to the *y* scale
- **x2** - the ending horizontal↔︎ target position; bound to the *x* scale
- **y2** - the ending vertical↕︎ target position; bound to the *y* scale
- **maxRadius** - the reach, or maximum distance, in pixels; defaults to 40
- **frameAnchor** - how to position the target within the frame; defaults to *middle*

To resolve the horizontal target position, the pointer transform applies the following order of precedence:

1. the **px** channel, if present;
2. the midpoint of the **x1** and **x2** channels, if both are present;
3. the **x** channel, if present;
4. the **x1** channel, if present;
5. and lastly the position given by the **frameAnchor**.

The same precedence applies to the **py**, **y**, **y1**, and **y2** channels.

## pointer(*options*) {#pointer}

```js
Plot.tip(penguins, Plot.pointer({x: "culmen_length_mm", y: "culmen_depth_mm"}))
```

Applies the pointer render transform to the specified *options* to filter the mark index such that only the point closest to the pointer is rendered; the mark will re-render interactively in response to pointer events.

## pointerX(*options*) {#pointerX}

```js
Plot.tip(aapl, Plot.pointerX({x: "Date", y: "Close"}))
```

Like [pointer](#pointer), except the determination of the closest point considers mostly the *x* (horizontal↔︎) position; this should be used for plots where *x* is the dominant dimension, such as time in a time-series chart, the binned quantitative dimension in a histogram, or the categorical dimension of a bar chart.

## pointerY(*options*) {#pointerY}

```js
Plot.tip(alphabet, Plot.pointerY({x: "frequency", y: "letter"}))
```

Like [pointer](#pointer), except the determination of the closest point considers mostly the *y* (vertical↕︎) position; this should be used for plots where *y* is the dominant dimension, such as time in a time-series chart, the binned quantitative dimension in a histogram, or the categorical dimension of a bar chart.

# docs/marks/area.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import aapl from "../data/aapl.ts";
import industries from "../data/bls-industry-unemployment.ts";
import sftemp from "../data/sf-temperatures.ts";

</script>

# Area mark

The **area mark** draws the region between a baseline (**x1**, **y1**) and a topline (**x2**, **y2**) as in an area chart. Often the baseline represents *y* = 0, and because the area mark interpolates between adjacent data points, typically both the *x* and *y* scales are quantitative or temporal.

:::plot https://observablehq.com/@observablehq/plot-area-simple
```js
Plot.areaY(aapl, {x: "Date", y: "Close"}).plot()
```
:::

The area mark has three constructors: [areaY](#areaY) for when the baseline and topline share *x* values, as in a time-series area chart where time goes right→ (or ←left); [areaX](#areaX) for when the baseline and topline share *y* values, as in a time-series area chart where time goes up↑ (or down↓); and lastly the rarely-used [area](#area) where the baseline and topline share neither *x* nor *y* values.

The area mark is often paired with a [line](./line.md) and [rule](./rule.md) mark to accentuate the topline and baseline.

:::plot https://observablehq.com/@observablehq/plot-area-and-line
```js
Plot.plot({
  y: {
    grid: true
  },
  marks: [
    Plot.areaY(aapl, {x: "Date", y: "Close", fillOpacity: 0.3}),
    Plot.lineY(aapl, {x: "Date", y: "Close"}),
    Plot.ruleY([0])
  ]
})
```
:::

With the default definitions of **x** = index and **y** = [identity](../features/transforms.md#identity), you can pass an array of numbers as data. Below, a random walk is constructed with [d3.cumsum](https://observablehq.com/@d3/d3-cumsum?collection=@d3/d3-array) and [d3.randomNormal](https://observablehq.com/@d3/d3-random?collection=@d3/d3-random).

:::plot defer https://observablehq.com/@observablehq/plot-random-walk-area
```js
Plot.areaY(d3.cumsum({length: 600}, d3.randomNormal())).plot()
```
:::

As with [lines](./line.md), points in areas are connected in input order: the first point is connected to the second point, the second is connected to the third, and so on. Area data is typically in chronological order. Unsorted data may produce gibberish.

:::plot defer https://observablehq.com/@observablehq/plot-area-sort
```js
Plot.areaY(d3.shuffle(aapl.slice()), {x: "Date", y: "Close"}).plot() // 🌶️
```
:::

If your data isn’t sorted, use the [sort transform](../transforms/sort.md).

:::plot defer https://observablehq.com/@observablehq/plot-area-sort
```js
Plot.areaY(d3.shuffle(aapl.slice()), {x: "Date", y: "Close", sort: "Date"}).plot()
```
:::

When the baseline is not *y* = 0 but instead represents another dimension of data as in a band chart, specify **y1** and **y2** instead of **y**.

:::plot defer https://observablehq.com/@observablehq/plot-temperature-band
```js
Plot.plot({
  y: {
    label: "Temperature (°F)",
    grid: true
  },
  marks: [
    Plot.areaY(sftemp, {x: "date", y1: "low", y2: "high"})
  ]
})
```
:::

:::tip
Since **y1** and **y2** refer to different fields here, a *y*-scale label is specified to improve readability. Also, the band above is spiky; you can smooth it by applying a [window transform](../transforms/window.md).
:::

While charts typically put *y* = 0 on the bottom edge, such that the area grows up↑, this is not required; reversing the *y* scale will produce a “hanging” area that grows down↓.

:::plot defer https://observablehq.com/@observablehq/plot-top-down-area-chart
```js
Plot.plot({
  x: {
    label: null
  },
  y: {
    grid: true,
    reverse: true
  },
  marks: [
    Plot.areaY(aapl, {x: "Date", y: "Close", fillOpacity: 0.3}),
    Plot.lineY(aapl, {x: "Date", y: "Close"}),
    Plot.ruleY([0])
  ]
})
```
:::

For a vertically-oriented baseline and topline, such as when time goes up↑ instead of right→, use [areaX](#areaX) instead of [areaY](#areaY) and swap **x** and **y**.

:::plot defer https://observablehq.com/@observablehq/plot-vertical-area-chart
```js
Plot.plot({
  x: {
    grid: true
  },
  marks: [
    Plot.areaX(aapl, {y: "Date", x: "Close", fillOpacity: 0.3}),
    Plot.lineX(aapl, {y: "Date", x: "Close"}),
    Plot.ruleX([0])
  ]
})
```
:::

If some channel values are undefined (or null or NaN), gaps will appear between adjacent points. To demonstrate, below we set the **y** value to NaN for the first three months of each year.

:::plot defer https://observablehq.com/@observablehq/plot-area-chart-with-missing-data
```js
Plot.plot({
  y: {
    grid: true
  },
  marks: [
    Plot.areaY(aapl, {x: "Date", y: (d) => d.Date.getUTCMonth() < 3 ? NaN : d.Close, fillOpacity: 0.3}),
    Plot.lineY(aapl, {x: "Date", y: (d) => d.Date.getUTCMonth() < 3 ? NaN : d.Close}),
    Plot.ruleY([0])
  ]
})
```
:::

Supplying undefined values is not the same as filtering the data: the latter will interpolate between the data points. Observe the conspicuous straight lines below!

:::plot defer
```js
Plot.plot({
  y: {
    grid: true
  },
  marks: [
    Plot.areaY(aapl, {filter: (d) => d.Date.getUTCMonth() >= 3, x: "Date", y: "Close", fillOpacity: 0.3}),
    Plot.lineY(aapl, {x: "Date", y: (d) => d.Date.getUTCMonth() < 3 ? NaN : d.Close}),
    Plot.ruleY([0])
  ]
})
```
:::

If a **fill** channel is specified, it is assumed to be ordinal or nominal; data is grouped into series and then implicitly [stacked](../transforms/stack.md).

:::plot defer https://observablehq.com/@observablehq/plot-stacked-areas
```js
Plot.plot({
  y: {
    transform: (d) => d / 1000,
    label: "Unemployed (thousands)"
  },
  marks: [
    Plot.areaY(industries, {x: "date", y: "unemployed", fill: "industry"}),
    Plot.ruleY([0])
  ]
})
```
:::

:::warning CAUTION
This area chart uses color but does not include a [legend](../features/legends.md). This should usually be avoided because color cannot be interpreted without a legend, titles, or labels.
:::

Or, as a streamgraph with the **offset** stack transform option:

:::plot defer https://observablehq.com/@observablehq/plot-centered-streamgraph
```js
Plot.plot({
  y: {
    transform: (d) => d / 1000,
    label: "Unemployed (thousands)"
  },
  marks: [
    Plot.areaY(industries, {x: "date", y: "unemployed", fill: "industry", offset: "wiggle"}),
  ]
})
```
:::

The **z** channel determines how data is grouped: if the **z** channel is not specified, but a varying **fill** channel is, the **fill** channel is used for **z**; the **z** channel will further fallback to a varying **stroke** channel if needed.

The **z** channel (either implicitly or explicitly) is typically used with the [stack transform](../transforms/stack.md) for a stacked area chart or streamgraph. You can disable the implicit stack transform and produce overlapping areas by setting **y2** instead of **y**.

:::plot defer https://observablehq.com/@observablehq/plot-overlapping-areas
```js
Plot.plot({
  marks: [
    Plot.areaY(industries, {x: "date", y2: "unemployed", z: "industry", fillOpacity: 0.1}),
    Plot.lineY(industries, {x: "date", y: "unemployed", z: "industry", strokeWidth: 1})
  ]
})
```
:::

To vary **fill** within a single series, set the **z** option to null.

:::plot defer https://observablehq.com/@observablehq/plot-variable-fill-area
```js
Plot.plot({
  color: {
    type: "log",
    legend: true
  },
  marks: [
    Plot.areaY(aapl, {x: "Date", y: "Close", fill: "Volume", z: null}),
    Plot.ruleY([0])
  ]
})
```
:::

As an alternative to overlapping or stacking, [faceting](../features/facets.md) will produce small multiples, here arranged vertically with a shared *x*-axis.

:::plot defer https://observablehq.com/@observablehq/plot-faceted-areas
```js
Plot.plot({
  height: 720,
  axis: null,
  marks: [
    Plot.areaY(industries, {x: "date", y: "unemployed", fy: "industry"}),
    Plot.text(industries, Plot.selectFirst({text: "industry", fy: "industry", frameAnchor: "top-left", dx: 6, dy: 6})),
    Plot.frame()
  ]
})
```
:::

:::tip
Above, smaller industries such as agriculture and mining & extraction are dwarfed by larger industries such as wholesale & retail trade. To emphasize each industry’s trend, instead of comparing absolute numbers across industries, you could use the [normalize transform](../transforms/normalize.md).
:::

Or, as a [horizon chart](https://observablehq.com/@observablehq/plot-horizon), where the area is repeated at different scales with different colors, showing both small-scale variation in position and large-scale variation in color:

:::plot defer https://observablehq.com/@observablehq/plot-unemployment-horizon-chart
```js-vue
Plot.plot((() => {
  const bands = 7;
  const step = d3.max(industries, (d) => d.unemployed) / bands;
  return {
    height: 720,
    axis: null,
    y: {domain: [0, step]},
    color: {scheme: "{{$dark ? "viridis" : "YlGnBu"}}"},
    facet: {data: industries, y: "industry"},
    marks: [
      d3.range(bands).map((i) => Plot.areaY(industries, {x: "date", y: (d) => d.unemployed - i * step, fill: i, clip: true})),
      Plot.text(industries, Plot.selectFirst({text: "industry", frameAnchor: "top-left", dx: 6, dy: 6})),
      Plot.frame()
    ]
  };
})())
```
:::

See also the [ridgeline chart](https://observablehq.com/@observablehq/plot-ridgeline) example.

Interpolation is controlled by the [**curve** option](../features/curves.md). The default curve is *linear*, which draws straight line segments between pairs of adjacent points. A *step* curve is nice for emphasizing when the value changes, while *basis* and *catmull–rom* are nice for smoothing.

## Area options

The following channels are required:

* **x1** - the horizontal position of the baseline; bound to the *x* scale
* **y1** - the vertical position of the baseline; bound to the *y* scale

In addition to the [standard mark options](../features/marks.md#mark-options), the following optional channels are supported:

* **x2** - the horizontal position of the topline; bound to the *x* scale
* **y2** - the vertical position of the topline; bound to the *y* scale
* **z** - a categorical value to group data into series

If **x2** is not specified, it defaults to **x1**. If **y2** is not specified, it defaults to **y1**. These defaults facilitate sharing *x* or *y* coordinates between the baseline and topline. See also the implicit stack transform and shorthand **x** and **y** options supported by [areaY](#areaY) and [areaX](#areaX).

By default, the data is assumed to represent a single series (*i.e.*, a single value that varies over time). If the **z** channel is specified, data is grouped by **z** to form separate series. Typically **z** is a categorical value such as a series name. If **z** is not specified, it defaults to **fill** if a channel, or **stroke** if a channel.

The **stroke** defaults to *none*. The **fill** defaults to *currentColor* if the stroke is *none*, and to *none* otherwise. If the fill is defined as a channel, the area will be broken into contiguous overlapping segments when the fill color changes; the fill color will apply to the interval spanning the current data point and the following data point. This behavior also applies to the **fillOpacity**, **stroke**, **strokeOpacity**, **strokeWidth**, **opacity**, **href**, **title**, and **ariaLabel** channels. When any of these channels are used, setting an explicit **z** channel (possibly to null) is strongly recommended. The **strokeLinecap** and **strokeLinejoin** default to *round*, and the **strokeMiterlimit** defaults to 1.

Points along the baseline and topline are connected in input order. Likewise, if there are multiple series via the **z**, **fill**, or **stroke** channel, the series are drawn in input order such that the last series is drawn on top. Typically, the data is already in sorted order, such as chronological for time series; if sorting is needed, consider a [sort transform](../transforms/sort.md).

The area mark supports [curve options](../features/curves.md) to control interpolation between points. If any of the **x1**, **y1**, **x2**, or **y2** values are invalid (undefined, null, or NaN), the baseline and topline will be interrupted, resulting in a break that divides the area shape into multiple segments. (See [d3-shape’s *area*.defined](https://d3js.org/d3-shape/area#area_defined) for more.) If an area segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps. In addition, some curves such as *cardinal-open* only render a visible segment if it contains multiple points.

## areaY(*data*, *options*) {#areaY}

```js
Plot.areaY(aapl, {x: "Date", y: "Close"})
```

Returns a new area with the given *data* and *options*. This constructor is used when the baseline and topline share *x* values, as in a time-series area chart where time goes right→. If neither the **y1** nor **y2** option is specified, the **y** option may be specified as shorthand to apply an implicit [stackY transform](../transforms/stack.md); this is the typical configuration for an area chart with a baseline at *y* = 0. If the **y** option is not specified, it defaults to the identity function. The **x** option specifies the **x1** channel; and the **x1** and **x2** options are ignored.

If the **interval** option is specified, the [binX transform](../transforms/bin.md) is implicitly applied to the specified *options*. The reducer of the output *y* channel may be specified via the **reduce** option, which defaults to *first*. To default to zero instead of showing gaps in data, as when the observed value represents a quantity, use the *sum* reducer.

```js
Plot.areaY(observations, {x: "date", y: "temperature", interval: "day"})
```

The **interval** option is recommended to “regularize” sampled data; for example, if your data represents timestamped temperature measurements and you expect one sample per day, use "day" as the interval.

The **areaY** mark draws the region between a baseline (*y1*) and a topline (*y2*) as in an area chart. When the baseline is *y* = 0, the *y* channel can be specified instead of *y1* and *y2*.

## areaX(*data*, *options*) {#areaX}

```js
Plot.areaX(aapl, {y: "Date", x: "Close"})
```

Returns a new area with the given *data* and *options*. This constructor is used when the baseline and topline share *y* values, as in a time-series area chart where time goes up↑. If neither the **x1** nor **x2** option is specified, the **x** option may be specified as shorthand to apply an implicit [stackX transform](../transforms/stack.md); this is the typical configuration for an area chart with a baseline at *x* = 0. If the **x** option is not specified, it defaults to the identity function. The **y** option specifies the **y1** channel; and the **y1** and **y2** options are ignored.

If the **interval** option is specified, the [binY transform](../transforms/bin.md) is implicitly applied to the specified *options*. The reducer of the output *x* channel may be specified via the **reduce** option, which defaults to *first*. To default to zero instead of showing gaps in data, as when the observed value represents a quantity, use the *sum* reducer.

```js
Plot.areaX(observations, {y: "date", x: "temperature", interval: "day"})
```

The **interval** option is recommended to “regularize” sampled data; for example, if your data represents timestamped temperature measurements and you expect one sample per day, use "day" as the interval.

## area(*data*, *options*) {#area}

```js
Plot.area(aapl, {x1: "Date", y1: 0, y2: "Close"})
```

Returns a new area with the given *data* and *options*. This method is rarely used directly; it is only needed when the baseline and topline have neither common **x** nor **y** values. [areaY](#areaY) is used in the common horizontal orientation where the baseline and topline share **x** values, while [areaX](#areaX) is used in the vertical orientation where the baseline and topline share **y** values.

# docs/marks/arrow.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import metros from "../data/metros.ts";
import miserables from "../data/miserables.ts";

const markov = (() => {
  const matrix = [[3, 2, 5], [1, 7, 2], [1, 1, 8]];
  const nodes = matrix.map((m, i) => d3.pointRadial(((2 - i) * 2 * Math.PI) / matrix.length, 100));
  const edges = matrix.flatMap((m, i) => m.map((value, j) => ([nodes[i], nodes[j], value])));
  return {nodes, edges};
})();

function samegroup({source, target}) {
  source = miserables.groups.get(source);
  target = miserables.groups.get(target);
  return source === target ? source : null;
}

</script>

# Arrow mark <VersionBadge version="0.4.0" />

:::tip
See also the [vector mark](./vector.md), which draws arrows of a given length and direction.
:::

The **arrow mark** draws arrows between two points [**x1**, **y1**] and [**x2**, **y2**] in quantitative dimensions. It is similar to the [link mark](./link.md), except it draws an arrowhead and is suitable for directed edges. With the **bend** option, it can be swoopy.⤵︎

For example, below we show the rising inequality (and population) in various U.S. cities from 1980 to 2015. Each arrow represents two observations of a city: the city’s population (**x**) and inequality (**y**) in 1980, and the same in 2015. The arrow’s **stroke** redundantly encodes the change in inequality: red indicates rising inequality, while blue (there are only four) indicates declining inequality.

:::plot defer https://observablehq.com/@observablehq/plot-arrow-variation-chart
```js
Plot.plot({
  grid: true,
  inset: 10,
  x: {
    type: "log",
    label: "Population"
  },
  y: {
    label: "Inequality",
    ticks: 4
  },
  color: {
    scheme: "BuRd",
    label: "Change in inequality from 1980 to 2015",
    legend: true,
    tickFormat: "+f"
  },
  marks: [
    Plot.arrow(metros, {
      x1: "POP_1980",
      y1: "R90_10_1980",
      x2: "POP_2015",
      y2: "R90_10_2015",
      bend: true,
      stroke: (d) => d.R90_10_2015 - d.R90_10_1980
    }),
    Plot.text(metros, {
      x: "POP_2015",
      y: "R90_10_2015",
      filter: "highlight",
      text: "nyt_display",
      fill: "currentColor",
      stroke: "var(--vp-c-bg)",
      dy: -6
    })
  ]
})
```
:::

The arrow mark is also useful for drawing directed graph edges, say representing transition frequencies in a finite state machine.

:::plot https://observablehq.com/@observablehq/plot-finite-state-machine
```js
Plot.plot({
  inset: 60,
  aspectRatio: 1,
  axis: null,
  marks: [
    Plot.dot(markov.nodes, {r: 40}),
    Plot.arrow(markov.edges, {
      x1: ([[x1]]) => x1,
      y1: ([[, y1]]) => y1,
      x2: ([, [x2]]) => x2,
      y2: ([, [, y2]]) => y2,
      bend: true,
      strokeWidth: ([,, value]) => value,
      strokeLinejoin: "miter",
      headLength: 24,
      inset: 48
    }),
    Plot.text(markov.nodes, {text: ["A", "B", "C"], dy: 12}),
    Plot.text(markov.edges, {
      x: ([[x1, y1], [x2, y2]]) => (x1 + x2) / 2 + (y1 - y2) * 0.15,
      y: ([[x1, y1], [x2, y2]]) => (y1 + y2) / 2 - (x1 - x2) * 0.15,
      text: ([,, value]) => value
    })
  ]
})
```
:::

For undirected edges, as in the arc diagram of character co-occurrence in *Les Misérables* below, set the **sweep** option to the desired orientation: *-y* for right-bulging links whose endpoints are vertically separated.

:::plot https://observablehq.com/@observablehq/plot-arc-diagram
```js
Plot.plot({
  height: 1080,
  marginLeft: 100,
  axis: null,
  x: {domain: [0, 1]}, // see https://github.com/observablehq/plot/issues/1541
  color: {domain: d3.range(10), unknown: "#ccc"},
  marks: [
    Plot.dot(miserables.nodes, {x: 0, y: "id", fill: "group", sort: {y: "fill"}}),
    Plot.text(miserables.nodes, {x: 0, y: "id", text: "id", textAnchor: "end", dx: -6, fill: "group"}),
    Plot.arrow(miserables.links, {x: 0, y1: "source", y2: "target", sweep: "-y", bend: 90, headLength: 0, stroke: samegroup, sort: samegroup, reverse: true})
  ]
})
```
:::

## Arrow options

The following channels are required:

* **x1** - the starting horizontal position; bound to the *x* scale
* **y1** - the starting vertical position; bound to the *y* scale
* **x2** - the ending horizontal position; bound to the *x* scale
* **y2** - the ending vertical position; bound to the *y* scale

For vertical or horizontal arrows, the **x** option can be specified as shorthand for **x1** and **x2**, and the **y** option can be specified as shorthand for **y1** and **y2**, respectively.

The arrow mark supports the [standard mark options](../features/marks.md#mark-options). The **stroke** defaults to *currentColor*. The **fill** defaults to *none*. The **strokeWidth** defaults to 1.5, and the **strokeMiterlimit** defaults to 1. The following additional options are supported:

* **bend** - the bend angle, in degrees; defaults to 0°; true for 22.5°
* **headAngle** - the arrowhead angle, in degrees; defaults to 60°
* **headLength** - the arrowhead scale; defaults to 8
* **insetEnd** - inset at the end of the arrow (useful if the arrow points to a dot)
* **insetStart** - inset at the start of the arrow
* **inset** - shorthand for the two insets
* **sweep** - the sweep order

The **bend** option sets the angle between the straight line connecting the two points and the outgoing direction of the arrow from the start point. It must be within ±90°. A positive angle will produce a clockwise curve; a negative angle will produce a counterclockwise curve; zero will produce a straight line. The **headAngle** determines how pointy the arrowhead is; it is typically between 0° and 180°. The **headLength** determines the scale of the arrowhead relative to the stroke width. Assuming the default of stroke width 1.5px, the **headLength** is the length of the arrowhead’s side in pixels.

The **sweep** option <VersionBadge version="0.6.10" pr="1740" /> controls the bend orientation. It defaults to 1 indicating a positive (clockwise) bend angle; -1 indicates a negative (anticlockwise) bend angle; 0 effectively clears the bend angle. If *-x*, the bend angle is flipped when the ending point is to the left of the starting point — ensuring all arrows bulge up (down if bend is negative); if *-y*, the bend angle is flipped when the ending point is above the starting point — ensuring all arrows bulge right (left if bend is negative); the sign is negated for *+x* and *+y*.

## arrow(*data*, *options*) {#arrow}

```js
Plot.arrow(inequality, {x1: "POP_1980", y1: "R90_10_1980", x2: "POP_2015", y2: "R90_10_2015", bend: true})
```

Returns a new arrow with the given *data* and *options*.

# docs/marks/auto.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import aapl from "../data/aapl.ts";
import industries from "../data/bls-industry-unemployment.ts";
import penguins from "../data/penguins.ts";

const olympians = shallowRef([{weight: 31, height: 1.21, sex: "female"}, {weight: 170, height: 2.21, sex: "male"}]);

onMounted(() => {
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
});

</script>

# Auto mark <VersionBadge version="0.6.3" />

The magic ✨ **auto mark** automatically selects a mark type that best represents the given dimensions of the data according to some simple heuristics. The auto mark — which powers [Observable’s chart cell](https://observablehq.com/@observablehq/chart-cell) — is intended to support fast exploratory analysis where the goal is to get a useful plot as quickly as possible. For example, two quantitative dimensions make a scatterplot:

:::plot https://observablehq.com/@observablehq/plot-auto-mark-scatterplot
```js
Plot.auto(penguins, {x: "body_mass_g", y: "flipper_length_mm"}).plot()
```
:::

:::tip
The auto mark is supposed to be fast and fluid, so don’t overthink it. If you need precise control, use explicit marks instead.
:::

:::warning CAUTION
While the auto mark will respect the options you provide, you shouldn’t rely on its behavior being stable over time. The auto mark may get smarter and take advantage of new features.
Because its heuristics are likely to evolve, they are not explicitly documented; see the [source code](https://github.com/observablehq/plot/blob/main/src/marks/auto.js) for details.
:::

A monotonically increasing dimension (here *Date*, as the data is ordered chronologically), paired with a numeric column (*Close*), makes a line chart:

:::plot https://observablehq.com/@observablehq/plot-auto-mark-line-chart
```js
Plot.auto(aapl, {x: "Date", y: "Close"}).plot()
```
:::

Given only one dimension of data, it makes a histogram:

:::plot defer https://observablehq.com/@observablehq/plot-auto-mark-quantitative-histogram
```js
Plot.auto(olympians, {x: "weight"}).plot()
```
:::

:::plot https://observablehq.com/@observablehq/plot-auto-mark-ordinal-histogram
```js
Plot.auto(penguins, {x: "island"}).plot()
```
:::

This is easier than deciding whether to use bin and rect, or group and bar: the auto mark chooses the right one based on whether the data is quantitative or ordinal.

If you’d like to explicitly avoid grouping the data, you can opt out of the reducer, and get a one-dimensional plot:

:::plot https://observablehq.com/@observablehq/plot-auto-mark-barcode
```js
Plot.auto(penguins, {x: "body_mass_g", y: {reduce: null}}).plot()
```
:::

As you can see from that **reduce** property, the auto mark has some special syntax that lets you specify a reducer without explicitly specifying a transform. For example, the scatterplot above can be made into a heatmap by adding a color reducer. You can pass the name of a reducer to that property, or pass a shorthand string:

:::plot defer https://observablehq.com/@observablehq/plot-auto-mark-heatmap
```js
Plot.auto(olympians, {x: "weight", y: "height", color: "count"}).plot()
```
:::

That’s equivalent to this:

```js
Plot.rect(olympians, Plot.bin({fill: "count"}, {x: "weight", y: "height"})).plot()
```

Notice that the code above makes you think about nested functions and two different options objects, which the auto mark flattens. The auto mark infers that it should use a [rect](./rect.md); that it should [bin](../transforms/bin.md) on **x** and **y**; that the kind of color should be a **fill**; and that **fill** is an “output” of the reducer, whereas **x** and **y** are “inputs”.

This saves you a little bit of typing, but, more importantly, it means that switching from showing one dimension to another only involves changing _one thing_. In the code above, if you change **y** from *weight* to *sex*, it’ll break, because *sex* is ordinal instead of quantitative. (You’d also have to change [rect](./rect.md) to [barX](./bar.md#barX), and [bin](../transforms/bin.md#bin) to [binX](../transforms/bin.md#binX).) With the auto mark, it just works:

:::plot defer https://observablehq.com/@observablehq/plot-auto-mark-heatmap-2
```js
Plot.auto(olympians, {x: "weight", y: "sex", color: "count"}).plot()
```
:::

Similarly, with explicit marks and transforms, changing a vertical histogram to a horizontal histogram involves switching [rectY](./rect.md#rectY) to [rectX](./rect.md#rectX), [binX](../transforms/bin.md#binX) to [binY](../transforms/bin.md#binY), **x** to **y**, and **y** to **x**. With the auto mark, just specify **y** instead of **x**:

:::plot https://observablehq.com/@observablehq/plot-auto-mark-horizontal-histogram
```js
Plot.auto(penguins, {y: "island"}).plot()
```
:::

For the sake of seamless switching, the auto mark has just one color channel, which it assigns to either **fill** or **stroke** depending on the mark. We can see that clearly by overriding a line chart with the **mark** option to make an area chart:

:::plot https://observablehq.com/@observablehq/plot-auto-mark-color-channel
```js
Plot.auto(industries, {x: "date", y: "unemployed", color: "industry"}).plot()
```
:::

:::plot
```js
Plot.auto(industries, {x: "date", y: "unemployed", color: "industry", mark: "area"}).plot()
```
:::

The **mark** override option supports [dot](./dot.md), [line](./line.md), [area](./area.md), [rule](./rule.md), and [bar](./bar.md) (which automatically chooses among barX, barY, rectX, rectY, rect, and cell).

You can get a more elaborate aggregated chart by passing an object with both a **value** (the input dimension) and a **reduce** (the reducer). For example, here’s the average heights of Olympians over time by sex:

:::plot defer https://observablehq.com/@observablehq/plot-auto-mark-with-value-and-reduce
```js
Plot
  .auto(olympians, {x: "date_of_birth", y: {value: "height", reduce: "mean"}, color: "sex", mark: "line"})
  .plot({color: {legend: true}})
```
:::

You can similarly pass a **zero** option to indicate that zero is meaningful for either **x** or **y**. This adds a corresponding rule to the returned mark.

:::plot https://observablehq.com/@observablehq/plot-auto-mark-zero-option
```js
Plot.auto(industries, {x: "date", y: {value: "unemployed", zero: true}, color: "industry"}).plot()
```
:::

The auto mark has a **size** channel, which (currently) always results in a dot. For now, it’s an alias for the dot’s **r** channel; in the future it will also represent a vector’s **length** channel.

:::plot https://observablehq.com/@observablehq/plot-auto-mark-size-channel
```js
Plot.auto(aapl, {x: "Date", y: "Close", size: "Volume"}).plot()
```
:::

Like with any other mark, you can also use **fx** or **fy**, and pass additional global options in the plot method.

:::plot defer https://observablehq.com/@observablehq/plot-auto-mark-faceted
```js
Plot.auto(penguins, {
  x: "body_mass_g",
  y: "culmen_length_mm",
  fx: "island",
  fy: "species"
}).plot({
  grid: true,
  x: {ticks: 5},
  marginRight: 70
})
```
:::

:::warning Caution
You can combine the auto mark with other marks, but the combination may be brittle because the auto mark may pick encodings that don’t play well with others.
:::

## Auto options

The auto mark currently supports only a subset of the standard [mark options](../features/marks.md#mark-options). You must provide at least one position channel:

* **x** - horizontal position
* **y** - vertical position

You may also provide one or more visual encoding channels:

* **color** - corresponds to **stroke** or **fill** (depending on the chosen mark type)
* **size** - corresponds to **r** (and in future, possibly **length**)

And you may specify the standard mark-level facet channels:

* **fx** - horizontal facet position (column)
* **fy** - vertical facet position (row)

In addition to channel values, the **x**, **y**, **color**, and **size** options may specify reducers. Setting a reducer on **x** implicitly groups or bins on **y**, and likewise setting a reducer on **y** implicitly groups or bins on **x**. Setting a reducer on **color** or **size** groups or bins in both **x** and **y**. Setting a reducer on both **x** and **y** throws an error. To specify a reducer, simply pass the reducer name to the corresponding option. For example:

```js
Plot.auto(penguins, {x: "body_mass_g", y: "count"})
```

To pass both a value and a reducer, or to disambiguate whether the given string represents a field name or a reducer name, the **x**, **y**, **color**, and **size** options can also be specified as an object with separate **value** and **reduce** properties. For example, to compute the total weight of the penguins in each bin:

```js
Plot.auto(penguins, {x: "body_mass_g", y: {value: "body_mass_g", reduce: "sum"}})
```

If the **color** channel is specified as a string that is also a valid CSS color, it is interpreted as a constant color. For example, for red bars:

```js
Plot.auto(penguins, {x: "body_mass_g", color: "red"})
```

This is shorthand for:

```js
Plot.auto(penguins, {x: "body_mass_g", color: {color: "red"}})
```

To reference a field name instead as a variable color encoding, specify the **color** option as an object with a **value** property:

```js
Plot.auto(penguins, {x: "body_mass_g", color: {value: "red"}})
```

Alternatively, you can specify a function of data or an array of values, as with a standard mark channel.

The auto mark chooses the mark type automatically based on several simple heuristics. For more control, you can specify the desired mark type using the **mark** option, which supports the following names:

* *area* - areaY or areaX (or sometimes area)
* *bar* - barY or barX; or rectY, rectX, or rect; or cell
* *dot* - dot
* *line* - lineY or lineX (or sometimes line)
* *rule* - ruleY or ruleX

The chosen mark type depends both on the options you provide (*e.g.*, whether you specified **x** or **y** or both) and the inferred type of the corresponding data values (whether the associated dimension of data is quantitative, categorical, monotonic, *etc.*).

## auto(*data*, *options*) {#auto}

```js
Plot.auto(olympians, {x: "weight", y: "height", color: "count"}) // equivalent to rect + bin, say
```

Returns an automatically-chosen mark with the given *data* and *options*, suitable for a quick view of the data.

## autoSpec(*data*, *options*) <VersionBadge version="0.6.4" /> {#autoSpec}

```js
Plot.autoSpec(olympians, {x: "weight", y: "height", color: "count"})
```

Returns an auto mark *options* object with no option undefined; the mark type, reducers, and other options are all populated.

# docs/marks/axis.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref} from "vue";
import aapl from "../data/aapl.ts";
import alphabet from "../data/alphabet.ts";
import penguins from "../data/penguins.ts";

const anchor = ref("bottom");
const facetAnchor = ref("auto");

const responses = [
  {name: "Family in feud with Zucker­bergs", value: 0.17},
  {name: "Committed 671 birthdays to memory", value: 0.19},
  {name: "Ex is doing too well", value: 0.10},
  {name: "High school friends all dead now", value: 0.15},
  {name: "Discovered how to “like” things mentally", value: 0.27},
  {name: "Not enough politics", value: 0.12}
];

</script>

# Axis mark <VersionBadge version="0.6.3" />

The **axis mark** conveys the meaning of a position [scale](../features/scales.md): _x_ or _y_, and _fx_ or _fy_ when [faceting](../features/facets.md). Plot automatically adds default axis marks as needed, but you can customize the appearance of axes either through scale options or by explicitly declaring an axis mark.

For example, the **axis** scale option specifies the side of the frame to draw the axis. Setting it to *both* will repeat the axis on both sides.

:::plot https://observablehq.com/@observablehq/plot-axis-both
```js
Plot.plot({
  x: {percent: true, grid: true, axis: "both"},
  marks: [
    Plot.barX(alphabet, {x: "frequency", y: "letter"}),
    Plot.ruleX([0])
  ]
})
```
:::

The above is equivalent to declaring two explicit axis marks, one with the *top* **anchor** and the other with the *bottom* **anchor**, and one explicit [grid mark](./grid.md). A benefit of declaring explicit axes is that you can draw them atop other marks.

:::plot https://observablehq.com/@observablehq/plot-axis-both
```js
Plot.plot({
  x: {percent: true},
  marks: [
    Plot.axisX({anchor: "top"}),
    Plot.axisX({anchor: "bottom", label: null}),
    Plot.barX(alphabet, {x: "frequency", y: "letter"}),
    Plot.gridX({interval: 1, stroke: "var(--vp-c-bg)", strokeOpacity: 0.5}),
    Plot.ruleX([0])
  ]
})
```
:::

:::info
The **interval** option above instructs the grid lines to be drawn at unit intervals, _i.e._ whole percentages. As an alternative, you can use the **ticks** option to specify the desired number of ticks or the **tickSpacing** option to specify the desired separation between adjacent ticks in pixels.
:::

If you don’t declare an axis mark for a position scale, Plot will implicitly add one for you below (before) all other marks. To disable an implicit axis, set the _scale_.**axis** option to null for the corresponding scale; or, set the top-level **axis** option to null to disable all implicit axes.

Plot’s axis mark is a composite mark comprised of:

* a [vector](./vector.md) for ticks
* a [text](./text.md) for tick labels
* a [text](./text.md) for an axis label

As such, you can take advantage of the full capabilities of these marks. For example, you can use the text mark’s **lineWidth** option to wrap long tick labels (and even soft hyphens). Note this option is expressed in ems, not pixels, and you may have to reserve additional **marginBottom** to make room for multiple lines.

:::plot https://observablehq.com/@observablehq/plot-wrap-tick-labels
```js
Plot.plot({
  y: {percent: true},
  marks: [
    Plot.axisX({label: null, lineWidth: 8, marginBottom: 40}),
    Plot.axisY({label: "Responses (%)"}),
    Plot.barY(responses, {x: "name", y: "value"}),
    Plot.ruleY([0])
  ]
})
```
:::

Or, you can use the **textAnchor** option to extend the *y*-axis tick labels to the right and into the frame, and the **fill** option to specify the color of the text.

:::plot https://observablehq.com/@observablehq/plot-anchor-tick-labels
```js
Plot.plot({
  marginTop: 0,
  marginLeft: 4,
  x: {ticks: 4, label: "Yield (kg)"},
  marks: [
    Plot.barX([42, 17, 32], {y: ["🍌 banana", "🍎 apple", "🍐 pear"]}),
    Plot.axisY({textAnchor: "start", fill: "var(--vp-c-bg)", dx: 14})
  ]
})
```
:::

Layering several marks makes it possible to create [ggplot2-style axes](https://ggplot2.tidyverse.org/reference/guide_axis.html) with a filled [frame](./frame.md) and white grid lines.

:::plot https://observablehq.com/@observablehq/plot-ggplot2-style-axes
```js
Plot.plot({
  inset: 10,
  marks: [
    Plot.frame({fill: "#eaeaea"}),
    Plot.gridY({stroke: "white", strokeOpacity: 1}),
    Plot.gridX({stroke: "white", strokeOpacity: 1}),
    Plot.line(aapl, {x: "Date", y: "Close", stroke: "black"})
  ]
})
```
:::

Or you could emulate the style of *The New York Times*, with tick labels above dashed grid lines, and a custom tick format to show units (here dollars) on the first tick.

:::plot https://observablehq.com/@observablehq/plot-nyt-style-axes
```js
Plot.plot({
  round: true,
  marginLeft: 0, // don’t need left-margin since labels are inset
  x: {label: null, insetLeft: 36}, // reserve space for inset labels
  marks: [
    Plot.gridY({
      strokeDasharray: "0.75,2", // dashed
      strokeOpacity: 1 // opaque
    }),
    Plot.axisY({
      tickSize: 0, // don’t draw ticks
      dx: 38, // offset right
      dy: -6, // offset up
      lineAnchor: "bottom", // draw labels above grid lines
      tickFormat: (d, i, _) => (i === _.length - 1 ? `$${d}` : d)
    }),
    Plot.ruleY([0]),
    Plot.line(aapl, {x: "Date", y: "Close", markerEnd: "dot"})
  ]
})
```
:::

Time axes default to a consistent multi-line tick format <VersionBadge version="0.6.9" />, [à la Datawrapper](https://blog.datawrapper.de/new-axis-ticks/), for example showing the first month of each quarter, and the year:

:::plot https://observablehq.com/@observablehq/plot-datawrapper-style-date-axis
```js
Plot.plot({
  marks: [
    Plot.ruleY([0]),
    Plot.axisX({ticks: "3 months"}),
    Plot.gridX(),
    Plot.line(aapl, {x: "Date", y: "Close"})
  ]
})
```
:::

The format is inferred from the tick interval, and consists of two fields (*e.g.*, month and year, day and month, minutes and hours); when a tick has the same second field value as the previous tick (*e.g.*, “19 Jan” after “17 Jan”), only the first field (“19”) is shown for brevity. Alternatively, you can specify multiple explicit axes with options for hierarchical time intervals, here showing weeks, months, and years.

:::plot https://observablehq.com/@observablehq/plot-multiscale-date-axis
```js
Plot.plot({
  x: {round: true, nice: d3.utcWeek},
  y: {inset: 6},
  marks: [
    Plot.frame({fill: "currentColor", fillOpacity: 0.1}),
    Plot.frame({anchor: "bottom"}),
    Plot.axisX({ticks: "year", tickSize: 28, tickPadding: -11, tickFormat: "  %Y", textAnchor: "start"}),
    Plot.axisX({ticks: "month", tickSize: 16, tickPadding: -11, tickFormat: "  %b", textAnchor: "start"}),
    Plot.gridX({ticks: "week", stroke: "var(--vp-c-bg)", strokeOpacity: 1, insetBottom: -0.5}),
    Plot.line(aapl.slice(-340, -10), {x: "Date", y: "Close", curve: "step"})
  ]
})
```
:::

You can even style an axis dynamically based on data! The data associated with an axis or grid mark are the tick values sampled from the associated scale’s domain. If you don’t specify the data explicitly, the ticks will be chosen through a combination of the **ticks**, **tickSpacing**, and **interval** options.

:::plot https://observablehq.com/@observablehq/plot-data-based-axis
```js
Plot.plot({
  marginRight: 0,
  marks: [
    Plot.ruleY([0]),
    Plot.line(aapl, {x: "Date", y: "Close"}),
    Plot.gridY({x: (y) => aapl.find((d) => d.Close >= y)?.Date, insetLeft: -6}),
    Plot.axisY({x: (y) => aapl.find((d) => d.Close >= y)?.Date, insetLeft: -6, textStroke: "var(--vp-c-bg)"})
  ]
})
```
:::

The color of an axis can be controlled with the **color**, **stroke**, and **fill** options, which affect the axis’ component marks differently. The **stroke** option affects the tick vector; the **fill** option affects the label texts. The **color** option is shorthand for setting both **fill** and **stroke**. While these options are typically set to constant colors (such as _red_ or the default _currentColor_), they can be specified as channels to assign colors dynamically based on the associated tick value.

:::plot https://observablehq.com/@observablehq/plot-axes-with-color
```js
Plot.axisX(d3.ticks(0, 1, 10), {color: "red"}).plot() // text fill and tick stroke
```
:::

:::plot https://observablehq.com/@observablehq/plot-axes-with-color
```js
Plot.axisX(d3.ticks(0, 1, 10), {stroke: Plot.identity, strokeWidth: 3, tickSize: 10}).plot() // tick stroke
```
:::

:::plot https://observablehq.com/@observablehq/plot-axes-with-color
```js
Plot.axisX(d3.ticks(0, 1, 10), {fill: "red"}).plot() // text fill
```
:::

To draw an outline around the tick labels, say to improve legibility when drawing an axes atop other marks, use the **textStroke** (default _none_), **textStrokeWidth** (default 3), and **textStrokeOpacity**  (default 1) options.

:::plot https://observablehq.com/@observablehq/plot-axes-with-color
```js
Plot.plot({
  height: 40,
  style: "background: #777;",
  x: {domain: [0, 100]},
  marks: [
    Plot.axisX({
      fill: "black",
      stroke: "white",
      textStroke: "white",
      textStrokeWidth: 3,
      textStrokeOpacity: 0.6
    })
  ]
})
```
:::

When faceting, the *x*- and *y*-axes are typically repeated across facets. A *bottom*-anchored *x*-axis is by default drawn on any facet _with empty space below it_; conversely, a *top*-anchored *x*-axis is drawn on any facet _with empty space above it_. Similarly, a *left*-anchored *y*-axis is drawn on facets with empty space to the left, and a *right*-anchored *y*-axis is drawn on facets with empty space to the right.

If the default behavior isn’t what you want, use the *mark*.**facetAnchor** option to control which facets show an axis. (This option applies not just to Plot’s axis and grid mark, but any mark; for example, you can use it to place a text mark at the bottom of each facet column.) The supported values for this option are:

* _top_ - show only on the top facets
* _right_ - show only on the right facets
* _bottom_ - show only on the bottom facets
* _left_ - show only on the left facets
* _top-empty_ - show on any facet with space above (a superset of _top_)
* _right-empty_ - show on any facet with space to the right (a superset of _right_)
* _bottom-empty_ - show on any facet with space to below (a superset of _below_)
* _left-empty_ - show on any facet with space to the left (a superset of _left_)
* null - show on every facet

The interactive chart below shows the different possibilities. Note that we place the facet *fx*-axis (in <span style="border-bottom: solid 2px var(--vp-c-blue);">blue</span>) opposite the *x*-axis (in <span style="border-bottom: solid 2px var(--vp-c-red);">red</span>).

<p>
  <label class="label-input">
    anchor:
    <select v-model="anchor">
      <option>bottom</option>
      <option>top</option>
    </select>
  </label>
  <label class="label-input">
    facetAnchor:
    <select v-model="facetAnchor">
      <option>auto</option>
      <option>bottom-empty</option>
      <option>bottom</option>
      <option>top-empty</option>
      <option>top</option>
      <option>null</option>
    </select>
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-facetanchor
```js
Plot.plot({
  facet: {marginRight: 80},
  grid: true,
  marks: [
    Plot.frame(),
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", fx: "sex", fy: "species"}),
    Plot.axisX({color: "red", anchor, facetAnchor: facetAnchor === "auto" ? undefined : facetAnchor === "null" ? null : facetAnchor}),
    Plot.axisFx({color: "blue", anchor: anchor === "top" ? "bottom" : "top"}) // place fx axis opposite x
  ]
})
```
:::

The **labelAnchor** option controls the position of the axis label. For the *x* or *fx* axis, the label anchor may be *left*, *center*, or *right*. It defaults to *center* for ordinal scales and *right* for quantitative scales.

:::plot https://observablehq.com/@observablehq/plot-labelanchor
```js
Plot.plot({
  height: 80,
  grid: true,
  x: {type: "linear"},
  marks: [
    Plot.axisX({anchor: "top", label: "top-left", labelAnchor: "left"}),
    Plot.axisX({anchor: "top", label: "top-center", labelAnchor: "center", ticks: []}),
    Plot.axisX({anchor: "top", label: "top-right", labelAnchor: "right", ticks: []}),
    Plot.axisX({anchor: "bottom", label: "bottom-left", labelAnchor: "left"}),
    Plot.axisX({anchor: "bottom", label: "bottom-center", labelAnchor: "center", ticks: []}),
    Plot.axisX({anchor: "bottom", label: "bottom-right", labelAnchor: "right", ticks: []})
  ]
})
```
:::

For the *y* and *fy* axis, the label anchor may be *top*, *center*, or *bottom*. It defaults to *center* for ordinal scales and *top* for quantitative scales. When the label anchor is *center*, the label is rotated by 90° to fit, though you may need to adjust the margins to avoid overlap between the tick labels and the axis label.

:::plot https://observablehq.com/@observablehq/plot-labelanchor
```js
Plot.plot({
  grid: true,
  y: {type: "linear"},
  marks: [
    Plot.axisY({anchor: "left", label: "left-top", labelAnchor: "top"}),
    Plot.axisY({anchor: "left", label: "left-center", labelAnchor: "center", ticks: []}),
    Plot.axisY({anchor: "left", label: "left-bottom", labelAnchor: "bottom", ticks: []}),
    Plot.axisY({anchor: "right", label: "right-top", labelAnchor: "top"}),
    Plot.axisY({anchor: "right", label: "right-center", labelAnchor: "center", ticks: []}),
    Plot.axisY({anchor: "right", label: "right-bottom", labelAnchor: "bottom", ticks: []})
  ]
})
```
:::

## Axis options

By default, the *data* for an axis mark are tick values sampled from the associated scale’s domain. If desired, you can specify the *data* explicitly (_e.g._ as an array of numbers), or use one of the following options:

* **ticks** - the approximate number of ticks to generate, or interval, or array of values
* **tickSpacing** - the approximate number of pixels between ticks (if **ticks** is not specified)
* **interval** - an interval or time interval

Note that when an axis mark is declared explicitly (via the [**marks** plot option](../features/plots.md#marks-option), as opposed to an implicit axis), the corresponding scale’s *scale*.ticks and *scale*.tickSpacing options are not automatically inherited by the axis mark; however, the *scale*.interval option *is* inherited, as is the *scale*.label option. You can declare multiple axis marks for the same scale with different ticks, and styles, as desired.

In addition to the [standard mark options](../features/marks.md), the axis mark supports the following options:

* **anchor** - the axis orientation: *top* or *bottom* for *x* or *fx*; *left* or *right* for *y* or *fy*
* **tickSize** - the length of the tick vector (in pixels; default 6 for *x* or *y*, or 0 for *fx* or *fy*)
* **tickPadding** - the separation between the tick vector and its label (in pixels; default 3)
* **tickFormat** - either a function or specifier string to format tick values; see [Formats](../features/formats.md)
* **tickRotate** - whether to rotate tick labels (an angle in degrees clockwise; default 0)
* **fontVariant** - the ticks’ font-variant; defaults to *tabular-nums* for quantitative axes
* **label** - a string to label the axis; defaults to the scale’s label, perhaps with an arrow
* **labelAnchor** - the label anchor: *top*, *right*, *bottom*, *left*, or *center*
* **labelArrow** - the label arrow: *auto* (default), *up*, *right*, *down*, *left*, *none*, or true <VersionBadge version="0.6.7" />
* **labelOffset** - the label position offset (in pixels; default depends on margins and orientation)
* **color** - the color of the ticks and labels (defaults to *currentColor*)
* **textStroke** - the color of the stroke around tick labels (defaults to *none*)
* **textStrokeOpacity** - the opacity of the stroke around tick labels
* **textStrokeWidth** - the thickness of the stroke around tick labels (in pixels)

The **labelArrow** option controls the arrow (↑, →, ↓, or ←) added to the axis label indicating the direction of ascending value; for example, horizontal position *x* typically increases in value going right→, while vertical position *y* typically increases in value going up↑. If *auto* (the default), the arrow will be added only if the scale is quantitative or temporal; if true, the arrow will also apply to ordinal scales, provided the domain is consistently ordered.

As a composite mark, the **stroke** option affects the color of the tick vector, while the **fill** option affects the color the text labels; both default to the **color** option, which defaults to *currentColor*. The **x** and **y** channels, if specified, position the ticks; if not specified, the tick positions depend on the axis **anchor**. The orientation of the tick labels likewise depends on the **anchor**. See the [text mark](./text.md) for details on available options for the tick and axis labels.

The axis mark’s [**facetAnchor**](../features/facets.md) option defaults to *top-empty* if anchor is *top*, *right-empty* if anchor is *right*, *bottom-empty* if anchor is *bottom*, and *left-empty* if anchor is *left*. This ensures the proper positioning of the axes with respect to empty facets.

The axis mark’s default margins depend on its orientation (**anchor**) as follows, in order of **marginTop**, **marginRight**, **marginBottom**, and **marginLeft**, in pixels:

* *top* - 30, 20, 0, 20
* *right* - 20, 40, 20, 0
* *bottom* - 0, 20, 30, 20
* *left* - 20, 0, 20, 40

For simplicity’s sake and for consistent layout across plots, axis margins are not automatically sized to make room for tick labels; instead, shorten your tick labels (for example using the *k* SI-prefix tick format, or setting a *scale*.transform to show thousands or millions, or setting the **textOverflow** option to *ellipsis* and the **lineWidth** option to clip long labels) or increase the margins as needed.

## axisX(*data*, *options*) {#axisX}

```js
Plot.axisX({anchor: "bottom", tickSpacing: 80})
```

Returns a new *x* axis with the given *options*.

## axisY(*data*, *options*) {#axisY}

```js
Plot.axisY({anchor: "left", tickSpacing: 35})
```

Returns a new *y* axis with the given *options*.

## axisFx(*data*, *options*) {#axisFx}

```js
Plot.axisFx({anchor: "top", label: null})
```

Returns a new *fx* axis with the given *options*.

## axisFy(*data*, *options*) {#axisFy}

```js
Plot.axisFy({anchor: "right", label: null})
```

Returns a new *fy* axis with the given *options*.

# docs/marks/bar.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref} from "vue";
import alphabet from "../data/alphabet.ts";
import civilizations from "../data/civilizations.ts";
import hadcrut from "../data/hadcrut.ts";
import penguins from "../data/penguins.ts";
import statepop from "../data/us-state-population-2010-2019.ts";

const checked = ref(true);

const timeseries = [
  {year: 2014, population: 7295.290765},
  {year: 2015, population: 7379.797139},
  {year: 2016, population: 7464.022049},
  {year: 2017, population: 7547.858925},
  // {year: 2018, population: 7631.091040},
  {year: 2019, population: 7713.468100},
  {year: 2020, population: 7794.798739}
];

</script>

# Bar mark

:::tip
The bar mark is a variant of the [rect mark](./rect.md) for use when one dimension is ordinal and the other is quantitative. See also the [cell mark](./cell.md).
:::

The **bar mark** comes in two orientations: [barY](#barY) extends vertically↑ as in a vertical bar chart or column chart, while [barX](#barX) extends horizontally→. For example, the bar chart below shows the frequency of letters in the English language.

:::plot https://observablehq.com/@observablehq/plot-vertical-bars
```js
Plot.barY(alphabet, {x: "letter", y: "frequency"}).plot()
```
:::

Ordinal domains are sorted naturally (alphabetically) by default. Either set the [scale **domain**](../features/scales.md) explicitly to change the order, or use the mark [**sort** option](../features/scales.md#sort-mark-option) to derive the scale domain from a channel. For example, to sort **x** by descending **y**:

:::plot https://observablehq.com/@observablehq/plot-vertical-bars
```js
Plot.barY(alphabet, {x: "letter", y: "frequency", sort: {x: "-y"}}).plot()
```
:::

There is typically one ordinal value associated with each bar, such as a name (or above, letter), and two quantitative values defining a lower and upper bound; the lower bound is often not specified (as above) because it defaults to zero. For barY, **x** is ordinal and **y1** & **y2** are quantitative, whereas for barX, **y** is ordinal and **x1** & **x2** are quantitative.

Above, since **y** was specified instead of **y1** and **y2**, the bar spans from zero to the given *y* value: if you only specify a single quantitative value, barY applies an implicit [stackY transform](../transforms/stack.md) and likewise barX implicitly applies stackX. The stacked horizontal bar chart below draws one bar (of unit width in **x**) per penguin, colored and sorted by the penguin’s body mass, and grouped by species along **y**.

:::plot defer https://observablehq.com/@observablehq/plot-stacked-unit-chart
```js
Plot.plot({
  marginLeft: 60,
  x: {label: "Frequency"},
  y: {label: null},
  color: {legend: true},
  marks: [
    Plot.barX(penguins, {y: "species", x: 1, inset: 0.5, fill: "body_mass_g", sort: "body_mass_g"}),
    Plot.ruleX([0])
  ]
})
```
:::

:::tip
The [group transform](../transforms/group.md) with the *count* reducer could be used to produce one bar per species.
:::

You can opt-out of the implicit stack transform by specifying the bar’s extent with two quantitative values: **x1** and **x2** for barX, or **y1** and **y2** for barY. For example, here is a historical timeline of civilizations, where each has a beginning and an end.

:::plot https://observablehq.com/@observablehq/plot-civilizations-timeline
```js
Plot.plot({
  marginLeft: 130,
  axis: null,
  x: {
    axis: "top",
    grid: true,
    tickFormat: (x) => x < 0 ? `${-x} BC` : `${x} AD`
  },
  marks: [
    Plot.barX(civilizations, {
      x1: "start",
      x2: "end",
      y: "civilization",
      sort: {y: "x1"}
    }),
    Plot.text(civilizations, {
      x: "start",
      y: "civilization",
      text: "civilization",
      textAnchor: "end",
      dx: -3
    })
  ]
})
```
:::

:::tip
This uses a [text mark](../marks/text.md) to label the bars directly instead of a *y* axis. It also uses a custom tick format for the *x* axis to show the calendar era.
:::

For a diverging bar chart, simply specify a negative value. The chart below shows change in population from 2010 to 2019. States whose population increased are <span :style="{borderBottom: `solid ${d3.schemePiYG[3][2]} 3px`}">green</span>, while states whose population decreased are <span :style="{borderBottom: `solid ${d3.schemePiYG[3][0]} 3px`}">pink</span>. (Puerto Rico’s population declined sharply after hurricanes Maria and Irma.)

:::plot https://observablehq.com/@observablehq/plot-state-population-change
```js
Plot.plot({
  label: null,
  x: {
    axis: "top",
    label: "← decrease · Change in population, 2010–2019 (%) · increase →",
    labelAnchor: "center",
    tickFormat: "+",
    percent: true
  },
  color: {
    scheme: "PiYg",
    type: "ordinal"
  },
  marks: [
    Plot.barX(statepop, {y: "State", x: (d) => (d[2019] - d[2010]) / d[2010], fill: (d) => Math.sign(d[2019] - d[2010]), sort: {y: "x"}}),
    Plot.gridX({stroke: "var(--vp-c-bg)", strokeOpacity: 0.5}),
    Plot.axisY({x: 0}),
    Plot.ruleX([0])
  ]
})
```
:::

:::tip
The **percent** scale option is useful for showing percentages; it applies a [scale transform](../features/scales.md#scale-transforms) that multiplies associated channel values by 100.
:::

When ordinal data is regular, such as the yearly observations of the time-series bar chart of world population below, use the **interval** option to enforce uniformity and show gaps for missing data. It can be set to a named interval such as *hour* or *day*, a number for numeric intervals, a [d3-time interval](https://d3js.org/d3-time#_interval), or a custom implementation.

<p>
  <label class="label-input">
    Use interval:
    <input type="checkbox" v-model="checked">
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-ordinal-scale-interval
```js
Plot
  .barY(timeseries, {x: "year", y: "population"})
  .plot({x: {tickFormat: "", interval: checked ? 1 : undefined}})
```
:::

:::tip
You can also make a time-series bar chart with a [rect mark](./rect.md), possibly with the [bin transform](../transforms/bin.md) to bin observations at regular intervals.
:::

A bar’s ordinal dimension is optional; if missing, the bar spans the chart along this dimension. Such bars typically also have a color encoding. For example, here are [warming stripes](https://showyourstripes.info/) showing the increase in average temperature globally over the last 172 years.

:::plot https://observablehq.com/@observablehq/plot-warming-stripes-2
```js
Plot.plot({
  x: {round: true, tickFormat: "d"},
  color: {scheme: "BuRd"},
  marks: [
    Plot.barX(hadcrut, {
      x: "year",
      fill: "anomaly",
      interval: 1, // annual observations
      inset: 0 // no gaps
    })
  ]
})
```
:::

With the [stack transform](../transforms/stack.md), a one-dimensional bar can show the proportions of each value relative to the whole, as a compact alternative to a pie or donut chart.

:::plot https://observablehq.com/@observablehq/plot-stacked-percentages
```js
Plot.plot({
  x: {percent: true},
  marks: [
    Plot.barX(alphabet, Plot.stackX({x: "frequency", fillOpacity: 0.3, inset: 0.5})),
    Plot.textX(alphabet, Plot.stackX({x: "frequency", text: "letter", inset: 0.5})),
    Plot.ruleX([0, 1])
  ]
})
```
:::

:::tip
Although barX applies an implicit stackX transform, [textX](./text.md) does not; this example uses an explicit stackX transform in both cases for clarity.
:::

For a grouped bar chart, use [faceting](../features/facets.md). The chart below uses **fy** to partition the bar chart of penguins by island.

:::plot defer https://observablehq.com/@observablehq/plot-grouped-unit-chart
```js
Plot.plot({
  marginLeft: 60,
  marginRight: 60,
  label: null,
  x: {label: "Frequency"},
  y: {padding: 0},
  marks: [
    Plot.barX(penguins, {fy: "island", y: "sex", x: 1, inset: 0.5}),
    Plot.ruleX([0])
  ]
})
```
:::

## Bar options

For required channels, see [barX](#barX) and [barY](#barY). The bar mark supports the [standard mark options](../features/marks.md), including [insets](../features/marks.md#insets) and [rounded corners](../features/marks.md#rounded-corners). The **stroke** defaults to *none*. The **fill** defaults to *currentColor* if the stroke is *none*, and to *none* otherwise.

## barX(*data*, *options*) {#barX}

```js
Plot.barX(alphabet, {y: "letter", x: "frequency"})
```

Returns a new horizontal→ bar with the given *data* and *options*. The following channels are required:

* **x1** - the starting horizontal position; bound to the *x* scale
* **x2** - the ending horizontal position; bound to the *x* scale

The following optional channels are supported:

* **y** - the vertical position; bound to the *y* scale, which must be *band*

If neither the **x1** nor **x2** option is specified, the **x** option may be specified as shorthand to apply an implicit [stackX transform](../transforms/stack.md); this is the typical configuration for a horizontal bar chart with bars aligned at *x* = 0. If the **x** option is not specified, it defaults to [identity](../features/transforms.md#identity). If *options* is undefined, then it defaults to **x2** as identity and **y** as the zero-based index [0, 1, 2, …]; this allows an array of numbers to be passed to barX to make a quick sequential bar chart. If the **y** channel is not specified, the bar will span the full vertical extent of the plot (or facet).

If an **interval** is specified, such as d3.utcDay, **x1** and **x2** can be derived from **x**: *interval*.floor(*x*) is invoked for each *x* to produce *x1*, and *interval*.offset(*x1*) is invoked for each *x1* to produce *x2*. If the interval is specified as a number *n*, *x1* and *x2* are taken as the two consecutive multiples of *n* that bracket *x*. Named UTC intervals such as *day* are also supported; see [scale options](../features/scales.md#scale-options).

## barY(*data*, *options*) {#barY}

```js
Plot.barY(alphabet, {x: "letter", y: "frequency"})
```

Returns a new vertical↑ bar with the given *data* and *options*. The following channels are required:

* **y1** - the starting vertical position; bound to the *y* scale
* **y2** - the ending vertical position; bound to the *y* scale

The following optional channels are supported:

* **x** - the horizontal position; bound to the *x* scale, which must be *band*

If neither the **y1** nor **y2** option is specified, the **y** option may be specified as shorthand to apply an implicit [stackY transform](../transforms/stack.md); this is the typical configuration for a vertical bar chart with bars aligned at *y* = 0. If the **y** option is not specified, it defaults to [identity](../features/transforms.md#identity). If *options* is undefined, then it defaults to **y2** as identity and **x** as the zero-based index [0, 1, 2, …]; this allows an array of numbers to be passed to barY to make a quick sequential bar chart. If the **x** channel is not specified, the bar will span the full horizontal extent of the plot (or facet).

If an **interval** is specified, such as d3.utcDay, **y1** and **y2** can be derived from **y**: *interval*.floor(*y*) is invoked for each *y* to produce *y1*, and *interval*.offset(*y1*) is invoked for each *y1* to produce *y2*. If the interval is specified as a number *n*, *y1* and *y2* are taken as the two consecutive multiples of *n* that bracket *y*. Named UTC intervals such as *day* are also supported; see [scale options](../features/scales.md#scale-options).

# docs/marks/bollinger.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref} from "vue";
import aapl from "../data/aapl.ts";

const n = ref(20);
const k = ref(2);

</script>

# Bollinger mark <VersionBadge version="0.6.10" pr="1772" />

The **bollinger mark** is a [composite mark](../features/marks.md#marks) consisting of a [line](./line.md) representing a moving average and an [area](./area.md) representing volatility as a band; the band thickness is proportional to the deviation of nearby values. The bollinger mark is often used to [analyze the price](https://en.wikipedia.org/wiki/Bollinger_Bands) of financial instruments such as stocks.

For example, the chart below shows the price of Apple stock from 2013 to 2018, with a window size *n* of {{n}} days and radius *k* of {{k}} standard deviations.

<p>
  <label class="label-input">
    <span>Window size (n):</span>
    <input type="range" v-model.number="n" min="1" max="100" step="1" />
    <span style="font-variant-numeric: tabular-nums;">{{n.toLocaleString("en-US")}}</span>
  </label>
  <label class="label-input">
    <span>Radius (k):</span>
    <input type="range" v-model.number="k" min="0" max="10" step="0.1" />
    <span style="font-variant-numeric: tabular-nums;">{{k.toLocaleString("en-US")}}</span>
  </label>
</p>

:::plot hidden
```js
Plot.bollingerY(aapl, {x: "Date", y: "Close", n, k}).plot()
```
:::

```js-vue
Plot.bollingerY(aapl, {x: "Date", y: "Close", n: {{n}}, k: {{k}}}).plot()
```

For more control, you can also use the [bollinger map method](#bollinger) directly with the [map transform](../transforms/map.md).

:::plot
```js
Plot.plot({
  marks: [
    Plot.lineY(aapl, Plot.mapY(Plot.bollinger({n: 20, k: -2}), {x: "Date", y: "Close", stroke: "red"})),
    Plot.lineY(aapl, Plot.mapY(Plot.bollinger({n: 20, k: 2}), {x: "Date", y: "Close", stroke: "green"})),
    Plot.lineY(aapl, {x: "Date", y: "Close"})
  ]
})
```
:::

Below a candlestick chart is constructed from two [rule marks](./rule.md), with a bollinger mark underneath to emphasize the days when the stock was more volatile.

:::plot
```js
Plot.plot({
  x: {domain: [new Date("2014-01-01"), new Date("2014-06-01")]},
  y: {domain: [68, 92], grid: true},
  color: {domain: [-1, 0, 1], range: ["red", "black", "green"]},
  marks: [
    Plot.bollingerY(aapl, {x: "Date", y: "Close", stroke: "none", clip: true}),
    Plot.ruleX(aapl, {x: "Date", y1: "Low", y2: "High", strokeWidth: 1, clip: true}),
    Plot.ruleX(aapl, {x: "Date", y1: "Open", y2: "Close", strokeWidth: 3, stroke: (d) => Math.sign(d.Close - d.Open), clip: true})
  ]
})
```
:::

The bollinger mark has two constructors: the common [bollingerY](#bollingerY) for when time goes right→ (or ←left); and the rare [bollingerX](#bollingerX) for when time goes up↑ (or down↓).

:::plot
```js
Plot.bollingerX(aapl, {y: "Date", x: "Close"}).plot()
```
:::

As [shorthand](../features/shorthand.md), you can pass an array of numbers as data. Below, the *x* axis represents the zero-based index into the data (*i.e.*, trading days since May 13, 2013).

:::plot
```js
Plot.bollingerY(aapl.map((d) => d.Close)).plot()
```
:::

## Bollinger options

The bollinger mark is a [composite mark](../features/marks.md#marks) consisting of two marks:

* an [area](../marks/area.md) representing volatility as a band, and
* a [line](../marks/line.md) representing a moving average

The bollinger mark supports the following special options:

* **n** - the window size (the window transform’s **k** option), an integer; defaults to 20
* **k** - the band radius, a number representing a multiple of standard deviations; defaults to 2
* **color** - the fill color of the area, and the stroke color of the line; defaults to *currentColor*
* **opacity** - the fill opacity of the area; defaults to 0.2
* **fill** - the fill color of the area; defaults to **color**
* **fillOpacity** - the fill opacity of the area; defaults to **opacity**
* **stroke** - the stroke color of the line; defaults to **color**
* **strokeOpacity** - the stroke opacity of the line; defaults to 1
* **strokeWidth** - the stroke width of the line in pixels; defaults to 1.5

Any additional options are passed through to the underlying [line mark](./line.md), [area mark](./area.md), and [window transform](../transforms/window.md). Unlike the window transform, the **strict** option defaults to true, and the **anchor** option defaults to *end* (which assumes that the data is in chronological order).

## bollingerX(*data*, *options*) {#bollingerX}

```js
Plot.bollingerX(aapl, {y: "Date", x: "Close"})
```

Returns a bollinger mark for when time goes up↑ (or down↓). If the **x** option is not specified, it defaults to the identity function, as when *data* is an array of numbers [*x₀*, *x₁*, *x₂*, …]. If the **y** option is not specified, it defaults to [0, 1, 2, …].

## bollingerY(*data*, *options*) {#bollingerY}

```js
Plot.bollingerY(aapl, {x: "Date", y: "Close"})
```

Returns a bollinger mark for when time goes right→ (or ←left). If the **y** option is not specified, it defaults to the identity function, as when *data* is an array of numbers [*y₀*, *y₁*, *y₂*, …]. If the **x** option is not specified, it defaults to [0, 1, 2, …].

## bollinger(*options*) {#bollinger}

```js
Plot.lineY(data, Plot.map({y: Plot.bollinger({n: 20})}, {x: "Date", y: "Close"}))
```

Returns a bollinger map method for use with the [map transform](../transforms/map.md). The **k** option here defaults to zero instead of two.

# docs/marks/box.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import morley from "../data/morley.ts";

const diamonds = shallowRef([]);

onMounted(() => {
  d3.csv("../data/diamonds.csv", d3.autoType).then((data) => (diamonds.value = data));
});

</script>

# Box mark <VersionBadge version="0.4.2" />

The **box mark** summarizes one-dimensional distributions as boxplots. It is a [composite mark](../features/marks.md#marks) consisting of a [rule](./rule.md) to represent the extreme values (not including outliers), a [bar](./bar.md) to represent the interquartile range (trimmed to the data), a [tick](./tick.md) to represent the median value, and a [dot](./dot.md) to represent any outliers. The [group transform](../transforms/group.md) is used to group and aggregate data.

For example, the boxplot below shows [A.A. Michelson’s experimental measurements](https://stat.ethz.ch/R-manual/R-devel/library/datasets/html/morley.html) of the speed of light. (Speed is in km/sec minus 299,000.)

:::plot https://observablehq.com/@observablehq/plot-vertical-box-plot
```js
Plot.plot({
  y: {
    grid: true,
    inset: 6
  },
  marks: [
    Plot.boxY(morley, {x: "Expt", y: "Speed"})
  ]
})
```
:::

[boxY](#boxY) produces vertical boxplots; for horizontal boxplots, use [boxX](#boxX) and swap **x** and **y**.

:::plot https://observablehq.com/@observablehq/plot-horizontal-box-plot
```js
Plot.plot({
  x: {
    grid: true,
    inset: 6
  },
  marks: [
    Plot.boxX(morley, {x: "Speed", y: "Expt"})
  ]
})
```
:::

As [shorthand](../features/shorthand.md), you can pass an array of numbers for a single boxplot.

:::plot https://observablehq.com/@observablehq/plot-shorthand-box-plot
```js
Plot.boxX([0, 3, 4.4, 4.5, 4.6, 5, 7]).plot()
```
:::

Since the box mark uses the [group transform](../transforms/group.md), the secondary dimension must be ordinal. To group quantitative values, bin manually, say with [Math.floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor); see [#1330](https://github.com/observablehq/plot/issues/1330).

:::plot defer https://observablehq.com/@observablehq/plot-binned-box-plot
```js
Plot.plot({
  marginLeft: 60,
  y: {
    grid: true,
    label: "Price"
  },
  x: {
    interval: 0.5,
    label: "Carats",
    labelAnchor: "right",
    tickFormat: (x) => x.toFixed(1)
  },
  marks: [
    Plot.ruleY([0]),
    Plot.boxY(diamonds, {x: (d) => Math.floor(d.carat * 2) / 2, y: "price"})
  ]
})
```
:::

This chart is slightly easier to construct with [faceting](../features/facets.md) using the [**interval** scale option](../features/scales.md#scale-transforms) on the *fx* scale. (This technique cannot be used with the *x* scale above because the scale interval transform is applied *after* the box mark applies the group transform.)

:::plot defer https://observablehq.com/@observablehq/plot-binned-box-plot
```js
Plot.plot({
  marginLeft: 60,
  y: {
    grid: true,
    label: "Price"
  },
  fx: {
    interval: 0.5,
    label: "Carats",
    labelAnchor: "right",
    tickFormat: (x) => x.toFixed(1)
  },
  marks: [
    Plot.ruleY([0]),
    Plot.boxY(diamonds, {fx: "carat", y: "price"})
  ]
})
```
:::

## Box options

The box mark is a [composite mark](../features/marks.md#marks) consisting of four marks:

* a [rule](../marks/rule.md) representing the extreme values (not including outliers)
* a [bar](../marks/bar.md) representing the interquartile range (trimmed to the data)
* a [tick](../marks/tick.md) representing the median value, and
* a [dot](../marks/dot.md) representing outliers, if any

The given *options* are passed through to these underlying marks, with the exception of the following options:

* **fill** - the fill color of the bar; defaults to #ccc
* **fillOpacity** - the fill opacity of the bar; defaults to 1
* **stroke** - the stroke color of the rule, tick, and dot; defaults to *currentColor*
* **strokeOpacity** - the stroke opacity of the rule, tick, and dot; defaults to 1
* **strokeWidth** - the stroke width of the tick; defaults to 1
* **r** - the radius of the dot; defaults to 3

## boxX(*data*, *options*) {#boxX}

```js
Plot.boxX(simpsons.map((d) => d.imdb_rating))
```

Returns a horizontal box mark. If the **x** option is not specified, it defaults to the identity function, as when *data* is an array of numbers. If the **y** option is not specified, it defaults to null; if the **y** option is specified, it should represent an ordinal (discrete) value.

## boxY(*data*, *options*) {#boxY}

```js
Plot.boxY(simpsons.map((d) => d.imdb_rating))
```

Returns a vertical box mark. If the **y** option is not specified, it defaults to the identity function, as when *data* is an array of numbers. If the **x** option is not specified, it defaults to null; if the **x** option is specified, it should represent an ordinal (discrete) value.

# docs/marks/cell.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import alphabet from "../data/alphabet.ts";
import hadcrut from "../data/hadcrut.ts";

const dji = shallowRef([]);
const seattle = shallowRef([]);
const simpsons = shallowRef(d3.cross(d3.range(1, 29), d3.range(1, 26), (x, y) => ({season: x, number_in_season: y})));

onMounted(() => {
  d3.csv("../data/dji.csv", d3.autoType).then((data) => (dji.value = data));
  d3.csv("../data/seattle-weather.csv", d3.autoType).then((data) => (seattle.value = data));
  d3.csv("../data/simpsons.csv", d3.autoType).then((data) => (simpsons.value = data));
});

</script>

# Cell mark

:::tip
The cell mark is a variant of the [rect mark](./rect.md) for use when both dimensions are ordinal. See also the [bar mark](./bar.md).
:::

The **cell mark** draws rectangles positioned in two ordinal dimensions. Hence, the plot’s *x* and *y* scales are [band scales](../features/scales.md). Cells typically also have a **fill** color encoding.

For example, the heatmap below shows the decline of *The Simpsons* after Season 9: high IMDb ratings are dark green, while low ratings are dark pink. (The worst episode ever — cue Comic Book Guy — is season 23’s [“Lisa Goes Gaga”](https://en.wikipedia.org/wiki/Lisa_Goes_Gaga).)

:::plot defer https://observablehq.com/@observablehq/plot-simpsons-ratings
```js
Plot.plot({
  padding: 0,
  grid: true,
  x: {axis: "top", label: "Season"},
  y: {label: "Episode"},
  color: {type: "linear", scheme: "PiYG"},
  marks: [
    Plot.cell(simpsons, {x: "season", y: "number_in_season", fill: "imdb_rating", inset: 0.5}),
    Plot.text(simpsons, {x: "season", y: "number_in_season", text: (d) => d.imdb_rating?.toFixed(1), fill: "black", title: "title"})
  ]
})
```
:::

With [faceting](../features/facets.md), we can produce a calendar of multiple years, where **x** represents week-of-year and **y** represents day-of-week. Below shows almost twenty years of daily changes of the Dow Jones Industrial Average.

:::plot defer https://observablehq.com/@observablehq/plot-dow-jones-calendar
```js
Plot.plot({
  padding: 0,
  x: {axis: null},
  y: {tickFormat: Plot.formatWeekday("en", "narrow"), tickSize: 0},
  fy: {tickFormat: ""},
  color: {scheme: "PiYG"},
  marks: [
    Plot.cell(dji, {
      x: (d) => d3.utcWeek.count(d3.utcYear(d.Date), d.Date),
      y: (d) => d.Date.getUTCDay(),
      fy: (d) => d.Date.getUTCFullYear(),
      fill: (d, i) => i > 0 ? (d.Close - dji[i - 1].Close) / dji[i - 1].Close : NaN,
      title: (d, i) => i > 0 ? ((d.Close - dji[i - 1].Close) / dji[i - 1].Close * 100).toFixed(1) : NaN,
      inset: 0.5
    })
  ]
})
```
:::

The cell mark can be combined with the [group transform](../transforms/group.md), which groups data by ordinal value. (The [bin transform](../transforms/bin.md), on the other hand, is intended for quantitative data and is typically paired with the [rect mark](./rect.md).) The heatmap below shows the maximum observed temperature by month (**y**) and date (**x**) in Seattle from 2012 through 2015.

:::plot defer https://observablehq.com/@observablehq/plot-seattle-temperature-heatmap
```js
Plot.plot({
  padding: 0,
  y: {tickFormat: Plot.formatMonth("en", "short")},
  marks: [
    Plot.cell(seattle, Plot.group({fill: "max"}, {
      x: (d) => d.date.getUTCDate(),
      y: (d) => d.date.getUTCMonth(),
      fill: "temp_max",
      inset: 0.5
    }))
  ]
})
```
:::

A one-dimensional cell is produced by specifying only **x** or only **y**. The plot below collapses the history of *The Simpsons* to a single line.

:::plot defer https://observablehq.com/@observablehq/plot-simpsons-barcode
```js
Plot.plot({
  x: {
    ticks: simpsons.filter((d) => d.number_in_season === 1).map((d) => d.id),
    tickFormat: (x) => simpsons.find((d) => d.id === x).season,
    label: "Season",
    labelAnchor: "right",
    labelArrow: true
  },
  color: {
    type: "linear",
    scheme: "PiYG"
  },
  marks: [
    Plot.cell(simpsons, {x: "id", fill: "imdb_rating"})
  ]
})
```
:::

:::info
Here the *x*-scale domain contains the *id* of every episode. An ordinal scale by default draws a tick for every domain value; setting **ticks** to just the first episode of each season prevents overlapping labels. The **tickFormat** function finds the row corresponding to the episode id and returns the corresponding *season* number.
:::

One-dimensional cells can be a compact alternative to a bar chart, where the *fill* color of the cell replaces the length of the bar. However, position is a more salient encoding and should be preferred to color if space is available.

:::plot https://observablehq.com/@observablehq/plot-color-cells
```js
Plot.cell(alphabet, {x: "letter", fill: "frequency"}).plot()
```
:::

When ordinal data is regular, such as the yearly observations of the warming stripes below, use the **interval** scale option to enforce uniformity and show gaps for missing data. It can be set to a named interval such as *hour* or *day*, a number for numeric intervals, a [d3-time interval](https://d3js.org/d3-time#_interval), or a custom implementation.

:::plot https://observablehq.com/@observablehq/plot-ordinal-scale-interval-2
```js{5}
Plot.plot({
  x: {
    ticks: d3.ticks(...d3.extent(hadcrut, (d) => d.year), 10),
    tickFormat: "d",
    interval: 1, // recommended in case of missing data
    label: null
  },
  color: {
    scheme: "BuRd"
  },
  marks: [
    Plot.cell(hadcrut, {x: "year", fill: "anomaly"})
  ]
})
```
:::

:::tip
When an ordinal scale domain has high cardinality, the **ticks** scale option can be used to specify which ticks to label. Alternatively, consider using a quantitative or temporal scale instead, as by switching to a [bar mark](./bar.md).
:::

## Cell options

In addition to the [standard mark options](../features/marks.md#mark-options), including [insets](../features/marks.md#insets) and [rounded corners](../features/marks.md#rounded-corners), the following optional channels are supported:

* **x** - the horizontal position; bound to the *x* scale, which must be *band*
* **y** - the vertical position; bound to the *y* scale, which must be *band*

If **x** is not specified, the cell will span the full horizontal extent of the plot (or facet). Likewise if **y** is not specified, the cell will span the full vertical extent of the plot (or facet). Typically either **x**, **y**, or both are specified; use a [frame mark](./frame.md) to decorate the plot’s frame.

The **stroke** defaults to *none*. The **fill** defaults to *currentColor* if the stroke is *none*, and to *none* otherwise.

## cell(*data*, *options*) {#cell}

```js
Plot.cell(simpsons, {x: "number_in_season", y: "season", fill: "imdb_rating"})
```

Returns a new cell with the given *data* and *options*. If neither the **x** nor **y** options are specified, *data* is assumed to be an array of pairs [[*x₀*, *y₀*], [*x₁*, *y₁*], [*x₂*, *y₂*], …] such that **x** = [*x₀*, *x₁*, *x₂*, …] and **y** = [*y₀*, *y₁*, *y₂*, …].

## cellX(*data*, *options*) {#cellX}

```js
Plot.cellX(simpsons.map((d) => d.imdb_rating))
```

Equivalent to [cell](#cell), except that if the **x** option is not specified, it defaults to [0, 1, 2, …], and if the **fill** option is not specified and **stroke** is not a channel, the fill defaults to the identity function and assumes that *data* = [*x₀*, *x₁*, *x₂*, …].

## cellY(*data*, *options*) {#cellY}

```js
Plot.cellY(simpsons.map((d) => d.imdb_rating))
```

Equivalent to [cell](#cell), except that if the **y** option is not specified, it defaults to [0, 1, 2, …], and if the **fill** option is not specified and **stroke** is not a channel, the fill defaults to the identity function and assumes that *data* = [*y₀*, *y₁*, *y₂*, …].

# docs/marks/contour.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import volcano from "../data/volcano.ts";

const ca55 = shallowRef([]);
const vapor = shallowRef([]);
const grid = {"width": 10, "height": 10, "values": d3.cross(d3.range(10), d3.range(10), (x, y) => x * y)};

onMounted(() => {
  d3.csv("../data/ca55-south.csv", d3.autoType).then((data) => (ca55.value = data));
  d3.text("../data/MYDAL2_M_SKY_WV_2022-11-01_rgb_360x180.csv").then((text) => (vapor.value = d3.csvParseRows(text).flat().map((x) => (x === "99999.0" ? NaN : +x))));
});

function mandelbrot(x, y) {
  for (let n = 0, zr = 0, zi = 0; n < 80; ++n) {
    [zr, zi] = [zr * zr - zi * zi + x, 2 * zr * zi + y];
    if (zr * zr + zi * zi > 4) return n;
  }
}

</script>

# Contour mark <VersionBadge version="0.6.2" />

:::tip
To produce a heatmap instead of contours, see the [raster mark](./raster.md). For contours of estimated point density, see the [density mark](./density.md).
:::

The **contour mark** draws [isolines](https://en.wikipedia.org/wiki/Contour_line) to delineate regions above and below a particular continuous value. These contours are computed by applying the [marching squares algorithm](https://en.wikipedia.org/wiki/Marching_squares) to a discrete grid. Like the [raster mark](./raster.md), the grid can be constructed either by [interpolating spatial samples](./raster.md#spatial-interpolators) (arbitrary points in **x** and **y**) or by sampling a continuous function *f*(*x*,*y*) along the grid.

For example, the contours below show the topography of the [Maungawhau volcano](https://en.wikipedia.org/wiki/Maungawhau), produced from a {{volcano.width}}×{{volcano.height}} grid of elevation samples.

:::plot defer https://observablehq.com/@observablehq/plot-stroked-contours
```js
Plot.contour(volcano.values, {width: volcano.width, height: volcano.height}).plot()
```
:::

Whereas the **value** option produces isolines suitable for stroking, the **fill** option produces filled contours. Setting the **fill** to [identity](../features/transforms.md#identity) will apply a color encoding to the contour values, allowing the contour values to be read via a *color* legend.

:::plot defer https://observablehq.com/@observablehq/plot-filled-contours
```js
Plot.plot({
  color: {
    legend: true,
    label: "Elevation (m)"
  },
  marks: [
    Plot.contour(volcano.values, {
      width: volcano.width,
      height: volcano.height,
      fill: Plot.identity,
      stroke: "black"
    })
  ]
})
```
:::

:::info
Contours are drawn in ascending value order, with the highest value on top; hence, filled contour polygons overlap! If you are interested in isobands, please upvote [#1420](https://github.com/observablehq/plot/issues/1420).
:::

The grid (`volcano.values` above) is a list of numbers `[103, 104, 104, …]`. The first number `103` is the elevation of the bottom-left corner. This grid is in [row-major order](https://en.wikipedia.org/wiki/Row-_and_column-major_order), meaning that the elevations of the first row are followed by the second row, then the third, and so on. Here’s a smaller grid to demonstrate the concept.

```js
grid = ({
  "width": 10,
  "height": 10,
  "values": [
     0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
     0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
     0,  2,  4,  6,  8, 10, 12, 14, 16, 18,
     0,  3,  6,  9, 12, 15, 18, 21, 24, 27,
     0,  4,  8, 12, 16, 20, 24, 28, 32, 36,
     0,  5, 10, 15, 20, 25, 30, 35, 40, 45,
     0,  6, 12, 18, 24, 30, 36, 42, 48, 54,
     0,  7, 14, 21, 28, 35, 42, 49, 56, 63,
     0,  8, 16, 24, 32, 40, 48, 56, 64, 72,
     0,  9, 18, 27, 36, 45, 54, 63, 72, 81
  ]
})
```

We can visualize this small grid directly with a [text mark](./text.md) using the same color encoding. Notice that the image below is flipped vertically relative to the data: the first row of the data is the *bottom* of the image because below *y* points up↑.

:::plot https://observablehq.com/@observablehq/plot-small-grid-contours
```js
Plot.plot({
  grid: true,
  x: {domain: [0, grid.width], label: "column"},
  y: {domain: [0, grid.height], label: "row"},
  marks: [
    Plot.text(grid.values, {
      text: Plot.identity,
      fill: Plot.identity,
      x: (d, i) => i % grid.width + 0.5,
      y: (d, i) => Math.floor(i / grid.width) + 0.5
    })
  ]
})
```
:::

Also notice that the grid points are offset by 0.5: they represent the *middle* of each pixel rather than the corner. Below, the contour mark is laid under the text mark to show filled contours.

:::plot defer https://observablehq.com/@observablehq/plot-small-grid-contours
```js
Plot.plot({
  marks: [
    Plot.contour(grid.values, {
      width: grid.width,
      height: grid.height,
      fill: Plot.identity,
      interval: 5
    }),
    Plot.text(grid.values, {
      text: Plot.identity,
      fill: "white",
      x: (d, i) => i % grid.width + 0.5,
      y: (d, i) => Math.floor(i / grid.width) + 0.5
    })
  ]
})
```
:::

Similar to the [bin transform](../transforms/bin.md), contour levels can be specified either with the **interval** option (above, a contour at each multiple of 5) or with the **thresholds** option (either a count of thresholds or an explicit array of values).

While the contour mark provides convenient shorthand for strictly gridded data, as above, it *also* works with samples in arbitrary positions and arbitrary order. For example, in 1955 the [Great Britain aeromagnetic survey](https://www.bgs.ac.uk/datasets/gb-aeromagnetic-survey/) measured the Earth’s magnetic field by plane. Each sample recorded the longitude and latitude alongside the strength of the [IGRF](https://www.ncei.noaa.gov/products/international-geomagnetic-reference-field) in [nanoteslas](https://en.wikipedia.org/wiki/Tesla_(unit)).

```
LONGITUDE,LATITUDE,MAG_IGRF90
-2.36216,51.70945,7
-2.36195,51.71727,6
-2.36089,51.72404,9
-2.35893,51.73758,12
-2.35715,51.7532,18
-2.35737,51.76636,24
```

Using a [dot mark](./dot.md), we can make a quick scatterplot to see the irregular grid. We’ll use a *diverging* color scale to distinguish positive and negative values.

:::plot defer https://observablehq.com/@observablehq/plot-igrf90-dots
```js
Plot.dot(ca55, {x: "LONGITUDE", y: "LATITUDE", fill: "MAG_IGRF90"}).plot({color: {type: "diverging"}})
```
:::

Pass the same arguments to the contour mark for continuous contours.

:::plot defer https://observablehq.com/@observablehq/plot-igrf90-contours
```js
Plot.contour(ca55, {x: "LONGITUDE", y: "LATITUDE", fill: "MAG_IGRF90"}).plot({color: {type: "diverging"}})
```
:::

As with the raster mark, the **blur** option applies a Gaussian blur to the underlying raster grid, resulting in smoother contours.

:::plot defer https://observablehq.com/@observablehq/plot-blurred-contours
```js
Plot.contour(ca55, {x: "LONGITUDE", y: "LATITUDE", fill: "MAG_IGRF90", blur: 4}).plot({color: {type: "diverging"}})
```
:::

:::tip
The contour mark also supports the **interpolate** option for control over [spatial interpolation](./raster.md#spatial-interpolators).
:::

The contour mark supports Plot’s [projection system](../features/projections.md). The chart below shows global atmospheric water vapor measurements from [NASA Earth Observations](https://neo.gsfc.nasa.gov/view.php?datasetId=MYDAL2_M_SKY_WV).

:::plot defer https://observablehq.com/@observablehq/plot-contours-projection
```js
Plot.plot({
  projection: "equal-earth",
  color: {
    scheme: "BuPu",
    domain: [0, 6],
    legend: true,
    label: "Water vapor (cm)"
  },
  marks: [
    Plot.contour(vapor, {
      fill: Plot.identity,
      width: 360,
      height: 180,
      x1: -180,
      y1: 90,
      x2: 180,
      y2: -90,
      blur: 1,
      stroke: "black",
      strokeWidth: 0.5,
      clip: "sphere"
    }),
    Plot.sphere({stroke: "black"})
  ]
})
```
:::

As an alternative to interpolating discrete samples, you can supply values as a continuous function *f*(*x*,*y*); the contour mark will invoke this function for the midpoint of each pixel in the raster grid, similar to a WebGL fragment shader. For example, below we visualize the trigonometric function sin(*x*) cos(*y*), producing a checkerboard-like pattern.

:::plot defer https://observablehq.com/@observablehq/plot-function-contour-2
```js
Plot.plot({
  aspectRatio: 1,
  x: {tickSpacing: 80, label: "x"},
  y: {tickSpacing: 80, label: "y"},
  color: {type: "diverging", legend: true, label: "sin(x) cos(y)"},
  marks: [
    Plot.contour({
      fill: (x, y) => Math.sin(x) * Math.cos(y),
      x1: 0,
      y1: 0,
      x2: 6 * Math.PI,
      y2: 4 * Math.PI
    })
  ]
})
```
:::

:::tip
When faceting, the sample function *f*(*x*,*y*) is passed a third argument of the facet values {*fx*, *fy*}.
:::

## Contour options

If *data* is provided, it represents discrete samples in abstract coordinates **x** and **y**; the **value** channel specifies further abstract quantitative values (_e.g._, height in a topographic map) to be [spatially interpolated](./raster.md#spatial-interpolators) to produce the underlying raster grid.

```js
Plot.contour(volcano.values, {width: volcano.width, height: volcano.height, value: Plot.identity})
```

The **value** channel may alternatively be specified as a continuous function *f*(*x*,*y*) to be evaluated at each pixel centroid of the raster grid (without interpolation).

```js
Plot.contour({x1: 0, y1: 0, x2: 4, y2: 4, value: (x, y) => Math.sin(x) * Math.cos(y)})
```

The resolution of the raster grid may be specified with the following options:

* **width** - the number of pixels on each horizontal line
* **height** - the number of lines; a positive integer

Alternatively, the raster dimensions may be imputed from the extent of *x* and *y* and a pixel size:

* **x1** - the starting horizontal position; bound to the *x* scale
* **x2** - the ending horizontal position; bound to the *x* scale
* **y1** - the starting vertical position; bound to the *y* scale
* **y2** - the ending vertical position; bound to the *y* scale
* **pixelSize** - the screen size of a raster pixel; defaults to 1

If **width** is specified, **x1** defaults to 0 and **x2** defaults to **width**; likewise, if **height** is specified, **y1** defaults to 0 and **y2** defaults to **height**. Otherwise, if **data** is specified, **x1**, **y1**, **x2**, and **y2** respectively default to the frame’s left, top, right, and bottom coordinates. Lastly, if **data** is not specified (as when **value** is a function of *x* and *y*), you must specify all of **x1**, **x2**, **y1**, and **y2** to define the raster domain (see below).

The contour mark shares many options with the [raster mark](./raster.md). The **interpolate** option is ignored when the **value** channel is a continuous function of *x* and *y*, and otherwise defaults to *nearest*. For smoother contours, the **blur** option (default 0) specifies a non-negative pixel radius for smoothing prior to applying marching squares. The **smooth** option (default true) specifies whether to apply linear interpolation after marching squares when computing contour polygons. The **thresholds** and **interval** options specify the contour thresholds; see the [bin transform](../transforms/bin.md) for details.

With the exception of the **x**, **y**, **x1**, **y1**, **x2**, **y2**, and **value** channels, the contour mark’s channels are not evaluated on the initial *data* but rather on the contour multipolygons generated in the initializer. For example, to generate filled contours where the color corresponds to the contour threshold value:

```js
Plot.contour(volcano.values, {width: volcano.width, height: volcano.height, value: Plot.identity, fill: "value"})
```

As shorthand, a single channel may be specified, in which case it is promoted to the *value* channel.

```js
Plot.contour(volcano.values, {width: volcano.width, height: volcano.height, fill: Plot.identity})
```

## contour(*data*, *options*) {#contour}

```js
Plot.contour(volcano.values, {width: volcano.width, height: volcano.height, fill: Plot.identity})
```

Returns a new contour mark with the given (optional) *data* and *options*.

# docs/marks/delaunay.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, ref, shallowRef, onMounted} from "vue";
import penguins from "../data/penguins.ts";

const walmarts = shallowRef([]);
const us = shallowRef(null);
const nation = computed(() => us.value ? topojson.feature(us.value, us.value.objects.nation) : {type: null});

onMounted(() => {
  d3.tsv("../data/walmarts.tsv", d3.autoType).then((data) => (walmarts.value = data));
  d3.json("../data/us-counties-10m.json").then((data) => (us.value = data));
});

</script>

# Delaunay marks <VersionBadge version="0.5.1" />

Given set of points in **x** and **y**, the **Delaunay marks** compute the [Delaunay triangulation](https://en.wikipedia.org/wiki/Delaunay_triangulation), its dual the [Voronoi tessellation](https://en.wikipedia.org/wiki/Voronoi_diagram), and the [convex hull](https://en.wikipedia.org/wiki/Convex_hull).

The [voronoi mark](#voronoi) computes the region closest to each point (its *Voronoi cell*). The cell can be empty if another point shares the exact same coordinates. Together, the cells cover the entire plot. Voronoi diagrams can group related points with color, for example.

:::plot https://observablehq.com/@observablehq/plot-voronoi-scatterplot
```js
Plot.plot({
  color: {legend: true},
  marks: [
    Plot.voronoi(penguins, {x: "culmen_depth_mm", y: "culmen_length_mm", fill: "species", fillOpacity: 0.2, stroke: "var(--vp-c-bg)"}),
    Plot.frame(),
    Plot.dot(penguins, {x: "culmen_depth_mm", y: "culmen_length_mm", fill: "species"})
  ]
})
```
:::

Each cell is associated with a particular data point, and channels such as **stroke**, **fill**, **fillOpacity**, **strokeOpacity**, **href**, _etc._, work as they do on other marks, such as [dots](./dot.md).

To show the local density of a scatterplot, one can draw the whole boundary at once with [voronoiMesh](#voronoiMesh). Whereas the [voronoi mark](#voronoi) will draw shared cell boundaries twice, the mesh will draw them only once.

:::plot https://observablehq.com/@observablehq/plot-voronoi-mesh
```js
Plot.plot({
  marks: [
    Plot.voronoiMesh(penguins, {x: "culmen_depth_mm", y: "culmen_length_mm"}),
    Plot.dot(penguins, {x: "culmen_depth_mm", y: "culmen_length_mm", fill: "species"})
  ]
})
```
:::

The boundary between two neighboring Voronoi cells is a line segment defined by equal distance from their two respective points. The construction of the Voronoi diagram involves the computation of the Delaunay graph, which defines these neighbors. Use [delaunayMesh](#delaunayMesh) to draw the graph.

:::plot https://observablehq.com/@observablehq/plot-delaunay-mesh
```js
Plot.plot({
  marks: [
    Plot.delaunayMesh(penguins, {x: "culmen_depth_mm", y: "culmen_length_mm", z: "species", stroke: "species", strokeOpacity: 0.5}),
    Plot.dot(penguins, {x: "culmen_depth_mm", y: "culmen_length_mm", fill: "species"})
  ]
})
```
:::

As shown above, the Delaunay graph is computed separately for each color; specifying **z**, **stroke**, or **fill** creates independent series.

Another derivative of the Delaunay graph is the convex hull of a set of points: the polygon with the minimum perimeter that contains all the points. The [hull mark](#hull) will draw this hull.

:::plot defer https://observablehq.com/@observablehq/plot-convex-hull
```js
Plot.plot({
  marks: [
    Plot.hull(penguins, {x: "culmen_depth_mm", y: "culmen_length_mm", fill: "species", fillOpacity: 0.2}),
    Plot.dot(penguins, {x: "culmen_depth_mm", y: "culmen_length_mm", stroke: "species"})
  ]
})
```
:::

Using independent series is not recommended in the case of the voronoi and voronoiMesh marks as it will result in an unreadable chart due to overlapping Voronoi diagrams, but it can be useful to color the links of the Delaunay graph based on some property of data, such as the body mass of penguins below.

:::plot defer https://observablehq.com/@observablehq/plot-delaunay-links
```js
Plot.plot({
  color: {legend: true},
  marks: [
    Plot.delaunayLink(penguins, {x: "culmen_depth_mm", y: "culmen_length_mm", stroke: "body_mass_g", strokeWidth: 1.5})
  ]
})
```
:::

:::warning CAUTION
The link color is driven by one arbitrary extremity of each edge; this might change in the future.
:::

The Delaunay marks can be one-dimensional, too.

:::plot defer https://observablehq.com/@observablehq/plot-one-dimensional-voronoi
```js
Plot.plot({
  marks: [
    Plot.voronoi(penguins, {x: "body_mass_g", fill: "species"}),
    Plot.voronoiMesh(penguins, {x: "body_mass_g", stroke: "white", strokeOpacity: 1})
  ]
})
```
:::

The [Delaunay marks](../marks/delaunay.md) also work with Plot’s [projection system](../features/projections.md), as in this Voronoi diagram showing the distribution of Walmart stores in the contiguous United States.

:::plot defer https://observablehq.com/@observablehq/plot-walmart-voronoi
```js
Plot.plot({
  projection: "albers",
  marks: [
    Plot.geo(nation),
    Plot.dot(walmarts, {x: "longitude", y: "latitude", fill: "currentColor", r: 1}),
    Plot.voronoiMesh(walmarts, {x: "longitude", y: "latitude"})
  ]
})
```
:::

:::warning CAUTION
Distances between projected points are not exactly proportional to the corresponding distances on the sphere. This [creates a discrepancy](https://observablehq.com/@observablehq/planar-vs-spherical-voronoi) between the planar Voronoi diagram and its spherical counterpart. For greater accuracy, use [d3-geo-voronoi](https://github.com/Fil/d3-geo-voronoi) with the [geo mark](../marks/geo.md).
:::


## delaunayLink(*data*, *options*) {#delaunayLink}

```js
Plot.delaunayLink(penguins, {x: "culmen_depth_mm", y: "culmen_length_mm"})
```

Draws links for each edge of the Delaunay triangulation of the points given by the **x** and **y** channels. Supports the same options as the [link mark](./link.md), except that **x1**, **y1**, **x2**, and **y2** are derived automatically from **x** and **y**. When an aesthetic channel is specified (such as **stroke** or **strokeWidth**), the link inherits the corresponding channel value from one of its two endpoints arbitrarily.

If a **z** channel is specified, the input points are grouped by *z*, and separate Delaunay triangulations are constructed for each group.

## delaunayMesh(*data*, *options*) {#delaunayMesh}

```js
Plot.delaunayMesh(penguins, {x: "culmen_depth_mm", y: "culmen_length_mm"})
```

Draws a mesh of the Delaunay triangulation of the points given by the **x** and **y** channels. The **stroke** option defaults to _currentColor_, and the **strokeOpacity** defaults to 0.2. The **fill** option is not supported. When an aesthetic channel is specified (such as **stroke** or **strokeWidth**), the mesh inherits the corresponding channel value from one of its constituent points arbitrarily.

If a **z** channel is specified, the input points are grouped by *z*, and separate Delaunay triangulations are constructed for each group.

## hull(*data*, *options*) {#hull}

```js
Plot.hull(penguins, {x: "culmen_depth_mm", y: "culmen_length_mm"})
```

Draws a convex hull around the points given by the **x** and **y** channels. The **stroke** option defaults to _currentColor_ and the **fill** option defaults to _none_. When an aesthetic channel is specified (such as **stroke** or **strokeWidth**), the hull inherits the corresponding channel value from one of its constituent points arbitrarily.

If a **z** channel is specified, the input points are grouped by *z*, and separate convex hulls are constructed for each group. If the **z** channel is not specified, it defaults to either the **fill** channel, if any, or the **stroke** channel, if any.

## voronoi(*data*, *options*) {#voronoi}

```js
Plot.voronoi(penguins, {x: "culmen_depth_mm", y: "culmen_length_mm"})
```

Draws polygons for each cell of the Voronoi tessellation of the points given by the **x** and **y** channels.

If a **z** channel is specified, the input points are grouped by *z*, and separate Voronoi tessellations are constructed for each group.

## voronoiMesh(*data*, *options*) {#voronoiMesh}

```js
Plot.voronoiMesh(penguins, {x: "culmen_depth_mm", y: "culmen_length_mm"})
```

Draws a mesh for the cell boundaries of the Voronoi tessellation of the points given by the **x** and **y** channels. The **stroke** option defaults to _currentColor_, and the **strokeOpacity** defaults to 0.2. The **fill** option is not supported. When an aesthetic channel is specified (such as **stroke** or **strokeWidth**), the mesh inherits the corresponding channel value from one of its constituent points arbitrarily.

If a **z** channel is specified, the input points are grouped by *z*, and separate Voronoi tessellations are constructed for each group.

# docs/marks/density.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, ref, shallowRef, onMounted} from "vue";
import faithful from "../data/faithful.ts";
import penguins from "../data/penguins.ts";

const walmarts = shallowRef([]);
const us = shallowRef(null);
const nation = computed(() => us.value ? topojson.feature(us.value, us.value.objects.nation) : {type: null});
const statemesh = computed(() => us.value ? topojson.mesh(us.value, us.value.objects.states, (a, b) => a !== b) : {type: null});
const skew = ref(0);
const bandwidth = ref(20);
const thresholds = ref(20);
const diamonds = shallowRef([]);

onMounted(() => {
  d3.csv("../data/diamonds.csv", d3.autoType).then((data) => (diamonds.value = data));
  d3.tsv("../data/walmarts.tsv", d3.autoType).then((data) => (walmarts.value = data));
  d3.json("../data/us-counties-10m.json").then((data) => (us.value = data));
});

</script>

# Density mark <VersionBadge version="0.5.1" />

:::tip
For contours of spatially-distributed quantitative values, see the [contour mark](./contour.md).
:::

The **density mark** shows the [estimated density](https://en.wikipedia.org/wiki/Multivariate_kernel_density_estimation) of two-dimensional point clouds. Contours guide the eye towards the local peaks of concentration of the data, much like a topographic map does with elevation. This is especially useful given overplotting in dense datasets.

:::plot https://observablehq.com/@observablehq/plot-point-cloud-density
```js
Plot.plot({
  inset: 10,
  marks: [
    Plot.density(faithful, {x: "waiting", y: "eruptions", stroke: "blue", strokeWidth: 0.25}),
    Plot.density(faithful, {x: "waiting", y: "eruptions", stroke: "blue", thresholds: 4}),
    Plot.dot(faithful, {x: "waiting", y: "eruptions", fill: "currentColor", r: 1.5})
  ]
})
```
:::

The **bandwidth** option specifies the radius of the [Gaussian kernel](https://en.wikipedia.org/wiki/Gaussian_function) describing the influence of each point as a function of distance; this kernel is summed over a discrete grid covering the plot, and then contours (*isolines*) are derived for values between 0 (exclusive) and the maximum density (exclusive) using the [marching squares algorithm](https://en.wikipedia.org/wiki/Marching_squares).

<p>
  <label class="label-input">
    Bandwidth:
    <input type="range" v-model.number="bandwidth" min="0" max="40" step="0.2">
    <span style="font-variant-numeric: tabular-nums;">{{bandwidth.toLocaleString("en-US", {minimumFractionDigits: 1})}}</span>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-density-options
```js
Plot.plot({
  inset: 20,
  marks: [
    Plot.density(faithful, {x: "waiting", y: "eruptions", bandwidth}),
    Plot.dot(faithful, {x: "waiting", y: "eruptions"})
  ]
})
```
:::

The **thresholds** option specifies the number of contour lines (minus one) to be computed, or an explicit array of threshold values. For example, with 4 thresholds and a maximum density of 10, contour lines would be drawn for the values 2.5, 5, and 7.5. The default number of thresholds is 20.

<p>
  <label class="label-input">
    Thresholds:
    <input type="range" v-model.number="thresholds" min="1" max="40" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{thresholds}}</span>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-density-options
```js
Plot.plot({
  inset: 20,
  marks: [
    Plot.density(faithful, {x: "waiting", y: "eruptions", thresholds}),
    Plot.dot(faithful, {x: "waiting", y: "eruptions"})
  ]
})
```
:::

The density mark also works with one-dimensional values:

:::plot defer https://observablehq.com/@observablehq/plot-one-dimensional-density
```js
Plot.plot({
  height: 100,
  inset: 10,
  marks: [
    Plot.density(faithful, {x: "waiting", stroke: "blue", strokeWidth: 0.25, bandwidth: 10}),
    Plot.density(faithful, {x: "waiting", stroke: "blue", thresholds: 4, bandwidth: 10}),
    Plot.dot(faithful, {x: "waiting", fill: "currentColor", r: 1.5})
  ]
})
```
:::

The density mark supports Plot’s [projection system](../features/projections.md), as in this heatmap showing the density of Walmart stores across the contiguous United States (which is a decent proxy for population density).

:::plot defer https://observablehq.com/@observablehq/plot-walmart-density
```js-vue
Plot.plot({
  projection: "albers",
  color: {scheme: "{{$dark ? "turbo" : "YlGnBu"}}"},
  marks: [
    Plot.density(walmarts, {x: "longitude", y: "latitude", bandwidth: 10, fill: "density"}),
    Plot.geo(statemesh, {strokeOpacity: 0.3}),
    Plot.geo(nation),
    Plot.dot(walmarts, {x: "longitude", y: "latitude", r: 1, fill: "currentColor"})
  ]
})
```
:::

:::tip
Use an equal-area projection with the density mark.
:::

By using the _density_ keyword as a **fill** or **stroke** color, you can draw regions with a sequential color encoding.

:::plot defer https://observablehq.com/@observablehq/plot-density-stroke
```js
Plot.plot({
  inset: 10,
  grid: true,
  x: {type: "log"},
  y: {type: "log"},
  marks: [
    Plot.density(diamonds, {x: "carat", y: "price", stroke: "density"})
  ]
})
```
:::

To facilitate comparison across facets (**fx** or **fy**) and series (**z**, **stroke**, or **fill**), the thresholds are determined by the series with the highest density. For instance, the chart below shows the highest concentration of penguins, arranged by flipper length and culmen length, on Biscoe island; the contours in the other facets use the same thresholds.

<!-- ```js
Plot.plot({
  axis: null,
  marks: [
    Plot.dot(penguins, {x: "flipper_length_mm", y: "culmen_length_mm"}),
    Plot.density(penguins, {x: "flipper_length_mm", y: "culmen_length_mm"})
  ]
})
``` -->

:::plot defer https://observablehq.com/@observablehq/plot-density-faceted
```js
Plot.plot({
  marks: [
    Plot.density(penguins, {fx: "island", x: "flipper_length_mm", y: "culmen_length_mm", stroke: "density", clip: true}),
    Plot.frame()
  ]
})
```
:::

<!-- With the default settings, the density is the local average number of dots on an area of ${tex`100\text{px}^2`} — a square of 10px by 10px. This can be multiplied by the dots’ weights. -->

The **weight** channel specifies the contribution of each data point to the estimated density; it defaults to 1, weighing each point equally. This can be used to give some points more influence than others. Try adjusting the skew slider below to transition between female- and male-weighted density.

<p>
  <label class="label-input">
    Skew (-F/+M):
    <input type="range" v-model.number="skew" min="-1" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{skew.toLocaleString("en-US", {minimumFractionDigits: 2, signDisplay: "always"})}}</span>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-density-weighted
```js
Plot.plot({
  inset: 10,
  color: {legend: true},
  marks: [
    Plot.density(penguins.filter((d) => d.sex), {
      weight: (d) => d.sex === "FEMALE" ? 1 - skew : 1 + skew,
      x: "flipper_length_mm",
      y: "culmen_length_mm",
      strokeOpacity: 0.5,
      clip: true
    }),
    Plot.dot(penguins.filter((d) => d.sex), {
      x: "flipper_length_mm",
      y: "culmen_length_mm",
      stroke: "sex",
      strokeOpacity: (d) => d.sex === "FEMALE" ? 1 - skew : 1 + skew
    }),
    Plot.frame()
  ]
})
```
:::

You can specify a negative weight for points that the density contours should avoid, resulting in regions of influence that do not overlap.

:::plot defer https://observablehq.com/@observablehq/plot-non-overlapping-density-regions
```js
Plot.plot({
  inset: 10,
  color: {legend: true},
  marks: [
    d3.groups(penguins, (d) => d.species).map(([s]) =>
      Plot.density(penguins, {
        x: "flipper_length_mm",
        y: "culmen_length_mm",
        weight: (d) => d.species === s ? 1 : -1,
        fill: () => s,
        fillOpacity: 0.2,
        thresholds: [0.05]
      })
    ),
    Plot.dot(penguins, {
      x: "flipper_length_mm",
      y: "culmen_length_mm",
      stroke: "species"
    }),
    Plot.frame()
  ]
})
```
:::

## Density options

In addition to the [standard mark options](../features/marks.md#mark-options), the following optional channels are supported:

* **x** - the horizontal position; bound to the *x* scale
* **y** - the vertical position; bound to the *y* scale
* **weight** - the contribution to the estimated density

If either of the **x** or **y** channels are not specified, the corresponding position is controlled by the **frameAnchor** option.

The **thresholds** option, which defaults to 20, specifies one more than the number of contours that will be computed at uniformly-spaced intervals between 0 (exclusive) and the maximum density (exclusive). The **thresholds** option may also be specified as an array or iterable of explicit density values. The **bandwidth** option, which defaults to 20, specifies the standard deviation of the Gaussian kernel used for estimation in pixels.

If a **z**, **stroke** or **fill** channel is specified, the input points are grouped by series, and separate sets of contours are generated for each series. If the **stroke** or **fill** is specified as *density*, a color channel is constructed with values representing the density threshold value of each contour.

## density(*data*, *options*) {#density}

```js
Plot.density(faithful, {x: "waiting", y: "eruptions"})
```

Returns a new density mark for the given *data* and *options*.

# docs/marks/difference.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {computed, shallowRef, onMounted} from "vue";

const aapl = shallowRef([]);
const gistemp = shallowRef([]);
const tsa = shallowRef([{Date: new Date("2020-01-01")}]);
const temperature = shallowRef([{date: new Date("2020-01-01")}]);

onMounted(() => {
  d3.csv("../data/aapl.csv", d3.autoType).then((data) => (aapl.value = data));
  d3.csv("../data/gistemp.csv", d3.autoType).then((data) => (gistemp.value = data));
  d3.csv("../data/tsa.csv",d3.autoType).then((data) => (tsa.value = data));
  d3.csv("../data/sf-sj-temperatures.csv", d3.autoType).then((data) => (temperature.value = data.filter((d) => d.date.getUTCFullYear() === 2020)));
});

</script>

# Difference mark <VersionBadge version="0.6.12" pr="1896" />

The **difference mark** puts a metric in context by comparing it. Like the [area mark](./area.md), the region between two lines is filled; unlike the area mark, alternating color shows when the metric is above or below the comparison value.

In the simplest case, the difference mark compares a metric to a constant. For example, the plot below shows the [global surface temperature anomaly](https://data.giss.nasa.gov/gistemp/) from 1880–2016; 0° represents the 1951–1980 average; above-average temperatures are in <span style="border-bottom: solid var(--vp-c-red) 3px;">red</span>, while below-average temperatures are in <span style="border-bottom: solid var(--vp-c-blue) 3px;">blue</span>. (It’s getting hotter.)

:::plot
```js
Plot.differenceY(gistemp, {
  x: "Date",
  y: "Anomaly",
  positiveFill: "red",
  negativeFill: "blue",
  tip: true
}).plot({y: {grid: true}})
```
:::

A 24-month [moving average](../transforms/window.md) improves readability by smoothing out the noise.

:::plot
```js
Plot.differenceY(
  gistemp,
  Plot.windowY(12 * 2, {
    x: "Date",
    y: "Anomaly",
    positiveFill: "red",
    negativeFill: "blue",
    tip: true
  })
).plot({y: {grid: true}})
```
:::

More powerfully, the difference mark compares two metrics. For example, the plot below shows the number of travelers per day through TSA checkpoints in 2020 compared to 2019. (This in effect compares a metric against itself, but as the data represents each year as a separate column, it is equivalent to two metrics.) In the first two months of 2020, there were on average <span style="border-bottom: solid #01ab63 3px;">more travelers</span> per day than 2019; yet when COVID-19 hit, there were many <span style="border-bottom: solid #4269d0 3px;">fewer travelers</span> per day, dropping almost to zero.

:::plot
```js
Plot.plot({
  x: {tickFormat: "%b"},
  y: {grid: true, label: "Travelers"},
  marks: [
    Plot.axisY({label: "Travelers per day (thousands, 2020 vs. 2019)", tickFormat: (d) => d / 1000}),
    Plot.ruleY([0]),
    Plot.differenceY(tsa, {x: "Date", y1: "2019", y2: "2020", tip: {format: {x: "%B %-d"}}})
  ]
})
```
:::

If the data is “tall” rather than “wide” — that is, if the two metrics we wish to compare are represented by separate *rows* rather than separate *columns* — we can use the [group transform](../transforms/group.md) with the [find reducer](../transforms/group.md#find): group the rows by **x** (date), then find the desired **y1** and **y2** for each group. The plot below shows daily minimum temperature for San Francisco compared to San Jose. Notice how the insulating fog keeps San Francisco <span style="border-bottom: solid #01ab63 3px;">warmer</span> in winter and <span style="border-bottom: solid #4269d0 3px;">cooler</span> in summer, reducing seasonal variation.

:::plot
```js
Plot.plot({
  x: {tickFormat: "%b"},
  y: {grid: true},
  marks: [
    Plot.ruleY([32]),
    Plot.differenceY(
      temperature,
      Plot.windowY(
        14,
        Plot.groupX(
          {
            y1: Plot.find((d) => d.station === "SJ"),
            y2: Plot.find((d) => d.station === "SF")
          },
          {
            x: "date",
            y: "tmin",
            tip: true
          }
        )
      )
    )
  ]
})
```
:::

The difference mark can also be used to compare a metric to itself using the [shift transform](../transforms/shift.md). The chart below shows year-over-year growth in the price of Apple stock.

:::plot
```js
Plot.differenceY(aapl, Plot.shiftX("+1 year", {x: "Date", y: "Close"})).plot({y: {grid: true}})
```
:::

For most of the covered time period, you would have <span style="border-bottom: solid #01ab63 3px;">made a profit</span> by holding Apple stock for a year; however, if you bought in 2015 and sold in 2016, you would likely have <span style="border-bottom: solid #4269d0 3px;">lost money</span>.

## Difference options

The following channels are required:

* **x2** - the horizontal position of the metric; bound to the *x* scale
* **y2** - the vertical position of the metric; bound to the *y* scale

In addition to the [standard mark options](../features/marks.md#mark-options), the following optional channels are supported:

* **x1** - the horizontal position of the comparison; bound to the *x* scale
* **y1** - the vertical position of the comparison; bound to the *y* scale

If **x1** is not specified, it defaults to **x2**. If **y1** is not specified, it defaults to 0 if **x1** and **x2** are equal, and to **y2** otherwise. These defaults facilitate sharing *x* or *y* coordinates between the metric and its comparison.

The standard **fill** option is ignored; instead, there are separate channels based on the sign of the difference:

* **positiveFill** - the color for when the metric is greater, defaults to <span style="border-bottom:solid #01ab63 3px;">green</span>
* **negativeFill** - the color for when the comparison is greater, defaults to <span style="border-bottom:solid #4269d0 3px;">blue</span>
* **fillOpacity** - the areas’ opacity, defaults to 1
* **positiveFillOpacity** - the positive area’s opacity, defaults to *opacity*
* **negativeFillOpacity** - the negative area’s opacity, defaults to *opacity*
* **stroke** - the metric line’s stroke color, defaults to currentColor
* **strokeOpacity** - the metric line’s opacity, defaults to 1

These options are passed to the underlying area and line marks; in particular, when they are defined as a channel, the underlying marks are broken into contiguous overlapping segments when the values change. When any of these channels are used, setting an explicit **z** channel (possibly to null) is strongly recommended.

## differenceY(*data*, *options*) {#differenceY}

```js
Plot.differenceY(gistemp, {x: "Date", y: "Anomaly"})
```

Returns a new vertical difference with the given *data* and *options*. The mark is a composite of a positive area, negative area, and line. The positive area extends from the bottom of the frame to the line, and is clipped by the area extending from the comparison to the top of the frame. The negative area conversely extends from the top of the frame to the line, and is clipped by the area extending from the comparison to the bottom of the frame.

## differenceX(*data*, *options*) <VersionBadge version="0.6.16" pr="1922" /> {#differenceX}

```js
Plot.differenceX(gistemp, {y: "Date", x: "Anomaly"})
```

Returns a new horizontal difference with the given *data* and *options*. See [differenceY](#differenceY) for more.

# docs/marks/dot.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, ref, shallowRef, onMounted} from "vue";
import alphabet from "../data/alphabet.ts";
import cars from "../data/cars.ts";
import penguins from "../data/penguins.ts";

const sorted = ref(true);
const aapl = shallowRef([]);
const congress = shallowRef([]);
const diamonds = shallowRef([]);
const gistemp = shallowRef([{Date: new Date("1880-01-01"), Anomaly: -0.78}, {Date: new Date("2016-12-01"), Anomaly: 1.35}]);
const stateage = shallowRef([]);
const us = shallowRef(null);
const statemesh = computed(() => us.value ? topojson.mesh(us.value, us.value.objects.states) : {type: null});
const counties = computed(() => us.value ? topojson.feature(us.value, us.value.objects.counties).features : []);

const xy = Plot.normalizeX({basis: "sum", z: "state", x: "population", y: "state"});

onMounted(() => {
  d3.csv("../data/aapl.csv", d3.autoType).then((data) => (aapl.value = data));
  d3.csv("../data/us-congress-2023.csv", d3.autoType).then((data) => (congress.value = data));
  d3.csv("../data/diamonds.csv", d3.autoType).then((data) => (diamonds.value = data));
  d3.csv("../data/gistemp.csv", d3.autoType).then((data) => (gistemp.value = data));
  Promise.all([
    d3.json("../data/us-counties-10m.json"),
    d3.csv("../data/us-county-population.csv")
  ]).then(([_us, _population]) => {
    const map = new Map(_population.map((d) => [d.state + d.county, +d.population]));
    _us.objects.counties.geometries.forEach((g) => (g.properties.population = map.get(g.id)));
    us.value = _us;
  });
  d3.csv("../data/us-population-state-age.csv", d3.autoType).then((data) => {
    const ages = data.columns.slice(1); // convert wide data to tidy data
    stateage.value = Object.assign(ages.flatMap((age) => data.map((d) => ({state: d.name, age, population: d[age]}))), {ages});
  });
});

</script>

# Dot mark

The **dot mark** draws circles or other symbols positioned in **x** and **y** as in a scatterplot. For example, the chart below shows the roughly-inverse relationship between car horsepower in *y*↑ and fuel efficiency in miles per gallon in *x*→.

:::plot https://observablehq.com/@observablehq/plot-basic-scatterplot
```js
Plot.dot(cars, {x: "economy (mpg)", y: "power (hp)"}).plot({grid: true})
```
:::

Using a function for **x**, we can instead plot the roughly-linear relationship when fuel efficiency is represented as gallons per 100 miles. (For fans of the metric system, 1 gallon per 100 miles is roughly 2.4 liters per 100 km.)

:::plot https://observablehq.com/@observablehq/plot-derived-value-scatterplot
```js
Plot.plot({
  grid: true,
  inset: 10,
  x: {label: "Fuel consumption (gallons per 100 miles)"},
  y: {label: "Horsepower"},
  marks: [
    Plot.dot(cars, {x: (d) => 100 / d["economy (mpg)"], y: "power (hp)"})
  ]
})
```
:::

Dots support **stroke** and **fill** channels in addition to position along **x** and **y**. Below, color is used as a redundant encoding to emphasize the rising trend in average global surface temperatures. A *diverging* color scale encodes values below zero blue and above zero red.

:::plot defer https://observablehq.com/@observablehq/plot-diverging-color-scatterplot
```js
Plot.plot({
  y: {
    grid: true,
    tickFormat: "+f",
    label: "Surface temperature anomaly (°F)"
  },
  color: {
    scheme: "BuRd"
  },
  marks: [
    Plot.ruleY([0]),
    Plot.dot(gistemp, {x: "Date", y: "Anomaly", stroke: "Anomaly"})
  ]
})
```
:::

Dots also support an **r** channel allowing dot size to represent quantitative value. Below, each dot represents a day of trading; the *x*-position represents the day’s change, while the *y*-position and area (**r**) represent the day’s trading volume. As you might expect, days with higher volatility have higher trading volume.

:::plot defer https://observablehq.com/@observablehq/plot-proportional-symbol-scatterplot
```js
Plot.plot({
  grid: true,
  x: {
    label: "Daily change (%)",
    tickFormat: "+f",
    percent: true
  },
  y: {
    type: "log",
    label: "Daily trading volume"
  },
  marks: [
    Plot.ruleX([0]),
    Plot.dot(aapl, {x: (d) => (d.Close - d.Open) / d.Open, y: "Volume", r: "Volume"})
  ]
})
```
:::

With the [bin transform](../transforms/bin.md), sized dots can also be used as an alternative to a [rect-based](./rect.md) heatmap to show a two-dimensional distribution.

:::plot defer https://observablehq.com/@observablehq/plot-proportional-dot-heatmap
```js
Plot.plot({
  height: 640,
  marginLeft: 60,
  grid: true,
  x: {label: "Carats"},
  y: {label: "Price ($)"},
  r: {range: [0, 20]},
  marks: [
    Plot.dot(diamonds, Plot.bin({r: "count"}, {x: "carat", y: "price", thresholds: 100}))
  ]
})
```
:::

:::tip
For hexagonal binning, use the [hexbin transform](../transforms/hexbin.md) instead of the bin transform.
:::

While dots are typically positioned in two dimensions (**x** and **y**), one-dimensional dots (only **x** or only **y**) are also supported. Below, dot area is used to represent the frequency of letters in the English language as a compact alternative to a bar chart.

:::plot https://observablehq.com/@observablehq/plot-dot-area-chart
```js
Plot.dot(alphabet, {x: "letter", r: "frequency"}).plot()
```
:::

Dots, together with [rules](./rule.md), can be used as a stylistic alternative to [bars](./bar.md) to produce a lollipop 🍭 chart. (Sadly these lollipops cannot be eaten.)

:::plot https://observablehq.com/@observablehq/plot-lollipop
```js
Plot.plot({
  x: {label: null, tickPadding: 6, tickSize: 0},
  y: {percent: true},
  marks: [
    Plot.ruleX(alphabet, {x: "letter", y: "frequency", strokeWidth: 2}),
    Plot.dot(alphabet, {x: "letter", y: "frequency", fill: "currentColor", r: 4})
  ]
})
```
:::

A dot may have an ordinal dimension on either **x** and **y**, as in the plot below comparing the demographics of states: color represents age group, **y** represents the state, and **x** represents the proportion of the state’s population in that age group. The [normalize transform](../transforms/normalize.md) is used to compute the relative proportion of each age group within each state, while the [group transform](../transforms/group.md) is used to pull out the *min* and *max* values for each state for a horizontal [rule](./rule.md).

:::plot defer https://observablehq.com/@observablehq/plot-dot-plot
```js
Plot.plot({
  height: 660,
  axis: null,
  grid: true,
  x: {
    axis: "top",
    label: "Population (%)",
    percent: true
  },
  color: {
    scheme: "spectral",
    domain: stateage.ages, // in age order
    legend: true
  },
  marks: [
    Plot.ruleX([0]),
    Plot.ruleY(stateage, Plot.groupY({x1: "min", x2: "max"}, {...xy, sort: {y: "x1"}})),
    Plot.dot(stateage, {...xy, fill: "age", title: "age"}),
    Plot.text(stateage, Plot.selectMinX({...xy, textAnchor: "end", dx: -6, text: "state"}))
  ]
})
```
:::

```js
xy = Plot.normalizeX("sum", {x: "population", y: "state", z: "state"})
```

:::tip
To reduce code duplication, pull shared options out into an object (here `xy`) and then merge them into each mark’s options using the spread operator (`...`).
:::

To improve accessibility, particularly for readers with color vision deficiency, the **symbol** channel can be used in addition to color (or instead of it) to represent ordinal data.

:::plot defer https://observablehq.com/@observablehq/plot-symbol-channel
```js
Plot.plot({
  grid: true,
  x: {label: "Body mass (g)"},
  y: {label: "Flipper length (mm)"},
  symbol: {legend: true},
  marks: [
    Plot.dot(penguins, {x: "body_mass_g", y: "flipper_length_mm", stroke: "species", symbol: "species"})
  ]
})
```
:::

Plot uses the following default symbols for filled dots:

:::plot
```js
Plot.dotX([
  "circle",
  "cross",
  "diamond",
  "square",
  "star",
  "triangle",
  "wye"
], {fill: "currentColor", symbol: Plot.identity}).plot()
```
:::

There is a separate set of default symbols for stroked dots:

:::plot
```js
Plot.dotX([
  "circle",
  "plus",
  "times",
  "triangle2",
  "asterisk",
  "square2",
  "diamond2",
], {stroke: "currentColor", symbol: Plot.identity}).plot()
```
:::

:::info
The stroked symbols are based on [Heman Robinson’s research](https://www.tandfonline.com/doi/abs/10.1080/10618600.2019.1637746). There is also a *hexagon* symbol; it is primarily intended for the [hexbin transform](../transforms/hexbin.md). You can even specify a D3 or custom symbol type as an object that implements the [*symbol*.draw(*context*, *size*)](https://d3js.org/d3-shape/symbol#symbolType_draw) method.
:::

The dot mark can be combined with the [stack transform](../transforms/stack.md). The diverging stacked dot plot below shows the age and gender distribution of the U.S. Congress in 2023.

:::plot defer https://observablehq.com/@observablehq/plot-stacked-dots
```js
Plot.plot({
  aspectRatio: 1,
  x: {label: "Age (years)"},
  y: {
    grid: true,
    label: "← Women · Men →",
    labelAnchor: "center",
    tickFormat: Math.abs
  },
  marks: [
    Plot.dot(
      congress,
      Plot.stackY2({
        x: (d) => 2023 - d.birthday.getUTCFullYear(),
        y: (d) => d.gender === "M" ? 1 : -1,
        fill: "gender",
        title: "full_name"
      })
    ),
    Plot.ruleY([0])
  ]
})
```
:::

:::info
The stackY2 transform places each dot at the upper bound of the associated stacked interval, rather than the middle of the interval as when using stackY. Hence, the first male dot is placed at *y* = 1, and the first female dot is placed at *y* = -1.
:::

:::tip
The [dodge transform](../transforms/dodge.md) can also be used to produce beeswarm plots; this is particularly effective when dots have varying radius.
:::

Dots are sorted by descending radius by default <VersionBadge version="0.5.0" /> to mitigate occlusion; the smallest dots are drawn on top. Set the **sort** option to null to draw them in input order. Use the checkbox below to see the effect of sorting on a bubble map of U.S. county population.

<p>
  <label class="label-input">
    Use default sort:
    <input type="checkbox" v-model="sorted">
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-dot-sort
```js
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(statemesh, {strokeOpacity: 0.4}),
    Plot.dot(counties, Plot.geoCentroid({
      r: (d) => d.properties.population,
      fill: "currentColor",
      stroke: "var(--vp-c-bg)",
      strokeWidth: 1,
      sort: sorted ? undefined : null
    }))
  ]
})
```
:::

The dot mark can also be used to construct a [quantile-quantile (QQ) plot](https://observablehq.com/@observablehq/qq-plot) for comparing two univariate distributions.

## Dot options

In addition to the [standard mark options](../features/marks.md#mark-options), the following optional channels are supported:

* **x** - the horizontal position; bound to the *x* scale
* **y** - the vertical position; bound to the *y* scale
* **r** - the radius (area); bound to the *r* (radius) scale, which defaults to *sqrt*
* **rotate** - the rotation angle in degrees clockwise
* **symbol** - the categorical symbol; bound to the *symbol* scale <VersionBadge version="0.4.0" />

If either of the **x** or **y** channels are not specified, the corresponding position is controlled by the **frameAnchor** option.

The following dot-specific constant options are also supported:

* **r** - the effective radius (length); a number in pixels
* **rotate** - the rotation angle in degrees clockwise; defaults to 0
* **symbol** - the categorical symbol; defaults to *circle* <VersionBadge version="0.4.0" />
* **frameAnchor** - how to position the dot within the frame; defaults to *middle*

The **r** option can be specified as either a channel or constant. When the radius is specified as a number, it is interpreted as a constant; otherwise it is interpreted as a channel. The radius defaults to 4.5 pixels when using the **symbol** channel, and otherwise 3 pixels. Dots with a nonpositive radius are not drawn.

The **stroke** defaults to *none*. The **fill** defaults to *currentColor* if the stroke is *none*, and to *none* otherwise. The **strokeWidth** defaults to 1.5. The **rotate** and **symbol** options can be specified as either channels or constants. When rotate is specified as a number, it is interpreted as a constant; otherwise it is interpreted as a channel. When symbol is a valid symbol name or symbol object (implementing the draw method), it is interpreted as a constant; otherwise it is interpreted as a channel. If the **symbol** channel’s values are all symbols, symbol names, or nullish, the channel is unscaled (values are interpreted literally); otherwise, the channel is bound to the *symbol* scale.

## dot(*data*, *options*) {#dot}

```js
Plot.dot(sales, {x: "units", y: "fruit"})
```

Returns a new dot with the given *data* and *options*. If neither the **x** nor **y** nor **frameAnchor** options are specified, *data* is assumed to be an array of pairs [[*x₀*, *y₀*], [*x₁*, *y₁*], [*x₂*, *y₂*], …] such that **x** = [*x₀*, *x₁*, *x₂*, …] and **y** = [*y₀*, *y₁*, *y₂*, …].

## dotX(*data*, *options*) {#dotX}

```js
Plot.dotX(cars.map((d) => d["economy (mpg)"]))
```

Equivalent to [dot](#dot) except that if the **x** option is not specified, it defaults to the identity function and assumes that *data* = [*x₀*, *x₁*, *x₂*, …].

If an **interval** is specified, such as d3.utcDay, **y** is transformed to (*interval*.floor(*y*) + *interval*.offset(*interval*.floor(*y*))) / 2. If the interval is specified as a number *n*, *y* will be the midpoint of two consecutive multiples of *n* that bracket *y*. Named UTC intervals such as *day* are also supported; see [scale options](../features/scales.md#scale-options).

## dotY(*data*, *options*) {#dotY}

```js
Plot.dotY(cars.map((d) => d["economy (mpg)"]))
```

Equivalent to [dot](#dot) except that if the **y** option is not specified, it defaults to the identity function and assumes that *data* = [*y₀*, *y₁*, *y₂*, …].

If an **interval** is specified, such as d3.utcDay, **x** is transformed to (*interval*.floor(*x*) + *interval*.offset(*interval*.floor(*x*))) / 2. If the interval is specified as a number *n*, *x* will be the midpoint of two consecutive multiples of *n* that bracket *x*. Named UTC intervals such as *day* are also supported; see [scale options](../features/scales.md#scale-options).

## circle(*data*, *options*) <VersionBadge version="0.5.0" /> {#circle}

Equivalent to [dot](#dot) except that the **symbol** option is set to *circle*.

## hexagon(*data*, *options*) <VersionBadge version="0.5.0" /> {#hexagon}

Equivalent to [dot](#dot) except that the **symbol** option is set to *hexagon*.

# docs/marks/frame.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref, shallowRef, onMounted} from "vue";
import penguins from "../data/penguins.ts";

const framed = ref(true);

const faithful = shallowRef([]);

onMounted(() => {
  d3.tsv("../data/faithful.tsv", d3.autoType).then((data) => (faithful.value = data));
});

</script>

# Frame mark

The **frame mark** draws a rectangle around the plot area.

:::plot
```js
Plot.frame().plot({x: {domain: [0, 1], grid: true}})
```
:::

Frames are most commonly used in conjunction with facets to provide better separation (Gestalt grouping) of faceted marks. Without a frame, it can be hard to tell where one facet ends and the next begins.

<p>
  <label class="label-input">
    Show frame:
    <input type="checkbox" v-model="framed">
  </label>
</p>

:::plot
```js
Plot.plot({
  grid: true,
  inset: 10,
  marks: [
    framed ? Plot.frame() : null,
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", fill: "#eee"}),
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", fx: "species"})
  ]
})
```
:::

Unlike most marks, a frame never takes *data*; the first argument to [frame](#frame) is the *options* object. (For data-driven rectangles, see the [rect mark](./rect.md).)

:::plot
```js
Plot.frame({stroke: "red"}).plot({x: {domain: [0, 1], grid: true}})
```
:::

While options are often specified in literal values, such as <span style="border-bottom: solid 2px var(--vp-c-red);">*red*</span> above, the standard [mark channels](../features/marks.md#mark-options) such as **fill** and **stroke** can also be specified as abstract values. For example, in the density heatmap below comparing the delay between eruptions of the Old Faithful geyser (*waiting*) in *x*→ and the duration of the eruption (*eruptions*) in *y*↑, both in minutes, we fill the frame with <span :style="{borderBottom: `solid 2px ${d3.interpolateTurbo(0)}`}">black</span> representing zero density.

:::plot defer
```js
Plot.plot({
  inset: 30,
  marks: [
    Plot.frame({fill: 0}),
    Plot.density(faithful, {x: "waiting", y: "eruptions", fill: "density"})
  ]
})
```
:::

:::tip
This is equivalent to a [rect](./rect.md): `Plot.rect({length: 1}, {fill: 0})`.
:::

You can also place a frame on a specific facet using the **fx** or **fy** option. Below, a frame emphasizes the *Gentoo* facet, say to draw attention to how much bigger they are. 🐧

:::plot
```js
Plot.plot({
  marginLeft: 80,
  inset: 10,
  marks: [
    Plot.frame({fy: "Gentoo"}),
    Plot.dot(penguins, {x: "body_mass_g", fy: "species"})
  ]
})
```
:::

:::tip
Or: `Plot.rect({length: 1}, {fy: ["Gentoo"], stroke: "currentColor"})`.
:::

The **anchor** option <VersionBadge version="0.6.3" />, if specified to a value of *left*, *right*, *top* or *bottom*, draws only that side of the frame. In that case, the **fill** and **rx**, **ry** options are ignored.

:::plot
```js
Plot.plot({
  x: {
    domain: [0, 1],
    grid: true
  },
  marks: [
    Plot.frame({stroke: "red", anchor: "bottom"})
  ]
})
```
:::

## Frame options

The frame mark supports the [standard mark options](../features/marks.md#mark-options), including [insets](../features/marks.md#insets) and [rounded corners](../features/marks.md#rounded-corners). It does not accept any data. The default **stroke** is *currentColor*, and the default **fill** is *none*.

If the **anchor** option is specified as one of *left*, *right*, *top*, or *bottom*, that side is rendered as a single line (and the **fill**, **fillOpacity**, **rx**, and **ry** options are ignored).

## frame(*options*) {#frame}

```js
Plot.frame({stroke: "red"})
```

Returns a new frame mark with the specified *options*.

# docs/marks/geo.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, shallowRef, onMounted} from "vue";

const us = shallowRef(null);
const earthquakes = shallowRef([]);
const walmarts = shallowRef({type: "FeatureCollection", features: []});
const world = shallowRef(null);
const statemesh = computed(() => us.value ? topojson.mesh(us.value, us.value.objects.states, (a, b) => a !== b) : {type: null});
const nation = computed(() => us.value ? topojson.feature(us.value, us.value.objects.nation) : {type: null});
const states = computed(() => us.value ? topojson.feature(us.value, us.value.objects.states) : {type: null});
const counties = computed(() => us.value ? topojson.feature(us.value, us.value.objects.counties) : {type: null});
const land = computed(() => world.value ? topojson.feature(world.value, world.value.objects.land) : {type: null});

onMounted(() => {
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson").then((data) => (earthquakes.value = data));
  d3.json("../data/countries-110m.json").then((data) => (world.value = data));
  d3.tsv("../data/walmarts.tsv", d3.autoType).then((data) => (walmarts.value = {type: "FeatureCollection", features: data.map((d) => ({type: "Feature", properties: {date: d.date}, geometry: {type: "Point", coordinates: [d.longitude, d.latitude]}}))}));
  Promise.all([
    d3.json("../data/us-counties-10m.json"),
    d3.csv("../data/us-county-unemployment.csv")
  ]).then(([_us, _unemployment]) => {
    const map = new Map(_unemployment.map((d) => [d.id, +d.rate]));
    _us.objects.counties.geometries.forEach((g) => (g.properties.unemployment = map.get(g.id)));
    us.value = _us;
  });
});

</script>

# Geo mark <VersionBadge version="0.6.1" />

The **geo mark** draws geographic features — polygons, lines, points, and other geometry — often as thematic maps. It works with Plot’s [projection system](../features/projections.md). For example, the [choropleth map](https://en.wikipedia.org/wiki/Choropleth_map) below shows unemployment by county in the United States.

:::plot defer https://observablehq.com/@observablehq/plot-us-choropleth
```js
Plot.plot({
  projection: "albers-usa",
  color: {
    type: "quantile",
    n: 9,
    scheme: "blues",
    label: "Unemployment (%)",
    legend: true
  },
  marks: [
    Plot.geo(counties, {
      fill: "unemployment",
      title: (d) => `${d.properties.name} ${d.properties.unemployment}%`,
      tip: true
    })
  ]
})
```
:::

A geo mark’s data is typically [GeoJSON](https://geojson.org/). You can pass a single GeoJSON object, a feature or geometry collection, or an array or iterable of GeoJSON objects; Plot automatically normalizes these into an array of features or geometries. When a mark’s data is GeoJSON, Plot will look for the specified field name (such as _unemployment_ above, for **fill**) in the GeoJSON object’s `properties` if the object does not have this property directly. <VersionBadge version="0.6.16" pr="2092" />

The size of Point and MultiPoint geometries is controlled by the **r** option. For example, below we show earthquakes in the last seven days with a magnitude of 2.5 or higher as reported by the [USGS](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php). As with the [dot mark](./dot.md), the effective radius is controlled by the *r* scale, which is by default a *sqrt* scale such that the area of a point is proportional to its value. And likewise point geometries are by default sorted by descending radius to reduce occlusion, drawing the smallest circles on top. Set the **sort** option to null to use input order instead.

:::plot defer https://observablehq.com/@observablehq/plot-live-earthquake-map
```js
Plot.plot({
  projection: "equirectangular",
  r: {transform: (r) => Math.pow(10, r)}, // Richter to amplitude
  marks: [
    Plot.geo(land, {fill: "currentColor", fillOpacity: 0.2}),
    Plot.sphere(),
    Plot.geo(earthquakes, {
      r: "mag",
      fill: "red",
      fillOpacity: 0.2,
      stroke: "red",
      title: "title",
      href: "url",
      target: "_blank"
    })
  ]
})
```
:::

:::tip
Click on any of the earthquakes above to see details.
:::

The [graticule](#graticule) helper draws a uniform grid of meridians (lines of constant longitude) and parallels (lines of constant latitude) every 10° between ±80° latitude; for the polar regions, meridians are drawn every 90°. The [sphere](#sphere) helper draws the outline of the projected sphere.

:::plot https://observablehq.com/@observablehq/plot-sphere-and-graticule
```js
Plot.plot({
  inset: 2,
  projection: {type: "orthographic", rotate: [0, -30, 20]},
  marks: [
    Plot.sphere({fill: "var(--vp-c-bg-alt)", stroke: "currentColor"}),
    Plot.graticule({strokeOpacity: 0.3})
  ]
})
```
:::

The geo mark’s **geometry** channel can be used to generate geometry from a non-GeoJSON data source. For example, below we visualize the shockwave created by the explosion of the [Hunga Tonga–Hunga Haʻapai volcano](https://en.wikipedia.org/wiki/2021–22_Hunga_Tonga–Hunga_Haʻapai_eruption_and_tsunami) on January 15, 2022 with a series of geodesic circles of increasing radius.

:::plot defer https://observablehq.com/@observablehq/plot-shockwave
```js
Plot.plot({
  projection: {
    type: "equal-earth",
    rotate: [90, 0]
  },
  color: {
    legend: true,
    label: "Distance from Tonga (km)",
    transform: (d) => 111.2 * d, // degrees to km
    zero: true
  },
  marks: [
    Plot.geo(land),
    Plot.geo([0.5, 179.5].concat(d3.range(10, 171, 10)), {
      geometry: d3.geoCircle().center([-175.38, -20.57]).radius((r) => r),
      stroke: (r) => r,
      strokeWidth: 2
    }),
    Plot.sphere()
  ]
})
```
:::

By default, the geo mark doesn’t have **x** and **y** channels; when you use the [**tip** option](./tip.md), the [centroid transform](../transforms/centroid.md) is implicitly applied on the geometries to compute the tip position by generating **x** and **y** channels. <VersionBadge version="0.6.16" pr="2088" /> You can alternatively specify these channels explicitly. The centroids are shown below in red.

:::plot defer https://observablehq.com/@observablehq/plot-state-centroids
```js
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(states, {strokeOpacity: 0.1, tip: true, title: "name"}),
    Plot.geo(nation),
    Plot.dot(states, Plot.centroid({fill: "red", stroke: "var(--vp-c-bg-alt)"}))
  ]
})
```
:::

The geo mark supports [faceting](../features/facets.md). Below, a comic strip of sorts shows the locations of Walmart store openings in past decades.

:::plot defer https://observablehq.com/@observablehq/plot-map-large-multiples
```js
Plot.plot({
  margin: 0,
  padding: 0,
  projection: "albers",
  fy: {interval: "10 years"},
  marks: [
    Plot.geo(statemesh, {strokeOpacity: 0.2}),
    Plot.geo(nation),
    Plot.geo(walmarts, {fy: "date", r: 1.5, fill: "blue", tip: true, title: "date"}),
    Plot.axisFy({frameAnchor: "top", dy: 30, tickFormat: (d) => `${d.getUTCFullYear()}’s`})
  ]
})
```
:::

:::info
This uses the [**interval** scale option](../features/scales.md#scale-transforms) to bin temporal data into facets by decade.
:::

Lastly, the geo mark is not limited to spherical geometries! [Plot’s projection system](../features/projections.md) includes planar projections, which allow you to work with shapes — such as contours — generated on an arbitrary flat surface.

## Geo options

The **geometry** channel specifies the geometry (GeoJSON object) to draw; if not specified, the mark’s *data* is assumed to be GeoJSON.

In addition to the [standard mark options](../features/marks.md#mark-options), the **r** option controls the size of Point and MultiPoint geometries. It can be specified as either a channel or constant. When **r** is specified as a number, it is interpreted as a constant radius in pixels; otherwise it is interpreted as a channel and the effective radius is controlled by the *r* scale. If the **r** option is not specified it defaults to 3 pixels. Geometries with a nonpositive radius are not drawn. If **r** is a channel, geometries will be sorted by descending radius by default.

The **x** and **y** position channels may also be specified in conjunction with the **tip** option. <VersionBadge version="0.6.16" pr="2088" /> These are bound to the *x* and *y* scale (or projection), respectively.

## geo(*data*, *options*) {#geo}

```js
Plot.geo(counties, {fill: "rate"})
```

Returns a new geo mark with the given *data* and *options*. If *data* is a GeoJSON feature collection, then the mark’s data is *data*.features; if *data* is a GeoJSON geometry collection, then the mark’s data is *data*.geometries; if *data* is some other GeoJSON object, then the mark’s data is the single-element array [*data*]. If the **geometry** option is not specified, *data* is assumed to be a GeoJSON object or an iterable of GeoJSON objects.

## sphere(*options*) <VersionBadge version="0.6.1" /> {#sphere}

```js
Plot.sphere()
```

Returns a new geo mark with a *Sphere* geometry object and the given *options*.

## graticule(*options*) <VersionBadge version="0.6.1" /> {#graticule}

```js
Plot.graticule()
```

Returns a new geo mark with a [10° global graticule](https://d3js.org/d3-geo/shape#geoGraticule10) geometry object and the given *options*.

# docs/marks/grid.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref} from "vue";
import alphabet from "../data/alphabet.ts";

const atop = ref(true);

</script>

# Grid mark <VersionBadge version="0.6.3" />

The **grid mark** is a specially-configured [rule](./rule.md) for drawing an axis-aligned grid. Like the [axis mark](./axis.md), a grid mark is automatically generated by Plot when you use the **grid** scale option. But you can also declare a grid mark explicitly, for example to draw grid lines atop rather than below bars.

<p>
  <label class="label-input">
    Show grid on top:
    <input type="checkbox" v-model="atop">
  </label>
</p>

:::plot
```js
Plot.plot({
  x: {axis: "top", percent: true, grid: !atop},
  marks: [
    Plot.barX(alphabet, {x: "frequency", y: "letter", sort: {y: "width"}}),
    atop ? Plot.gridX({interval: 1, stroke: "var(--vp-c-bg)", strokeOpacity: 0.5}) : null,
    Plot.ruleX([0])
  ]
})
```
:::

The **interval** option above instructs the grid lines to be drawn at unit intervals, _i.e._ whole percentages. As an alternative, you can use the **ticks** option to specify the desired number of ticks or the **tickSpacing** option to specify the desired separation between adjacent ticks in pixels.

:::plot
```js
Plot.gridX().plot({x: {type: "linear"}})
```
:::

The color of the grid lines can be controlled with the **stroke** option (or the alias **color**). While this option is are typically set to a constant color (such as _red_ or the default _currentColor_), it can be specified as a channel to assign colors dynamically based on the associated tick value.

:::plot
```js
Plot.gridX(d3.range(101), {stroke: Plot.identity, strokeOpacity: 1}).plot()
```
:::

You can set other [stroke options](../features/marks.md#mark-options) to further customize the appearance, say for dashed strokes.

:::plot
```js
Plot.gridX({strokeDasharray: "2", strokeOpacity: 1}).plot({x: {type: "linear"}})
```
:::

See the [axis mark](./axis.md) for more details and examples.

## Grid options

The optional *data* is an array of tick values — it defaults to the scale’s ticks. The grid mark draws a line for each tick value, across the whole frame.

The following options are supported:

* **strokeDasharray** - the [stroke dasharray](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray) for dashed lines, defaults to null

The following options are supported as constant or data-driven channels:

* **stroke** - the grid color, defaults to *currentColor*
* **strokeWidth** - the grid’s line width, defaults to 1
* **strokeOpacity** - the stroke opacity, defaults to 0.1
* **y1** - the start of the line, a channel of *y* positions
* **y2** - the end of the line, a channel of *y* positions

All the other common options are supported when applicable (*e.g.*, **title**).

## gridX(*data*, *options*) {#gridX}

```js
Plot.gridX({strokeDasharray: "5,3"})
```

Returns a new *x* grid with the given *options*.

## gridY(*data*, *options*) {#gridY}

```js
Plot.gridY({strokeDasharray: "5,3"})
```

Returns a new *y* grid with the given *options*.

## gridFx(*data*, *options*) {#gridFx}

```js
Plot.gridFx({strokeDasharray: "5,3"})
```

Returns a new *fx* grid with the given *options*.

## gridFy(*data*, *options*) {#gridFy}

```js
Plot.gridFy({strokeDasharray: "5,3"})
```

Returns a new *fy* grid with the given *options*.

# docs/marks/hexgrid.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import penguins from "../data/penguins.ts";

</script>

# Hexgrid mark <VersionBadge version="0.5.0" />

The **hexgrid mark** draws a hexagonal grid spanning the frame. It can be used with the [hexbin transform](../transforms/hexbin.md) to show how points are binned. The **binWidth** option specifies the distance between centers of neighboring hexagons in pixels; it defaults to 20, matching the hexbin transform.

:::plot https://observablehq.com/@observablehq/plot-hexgrid-example
```js
Plot.plot({
  marks: [
    Plot.hexgrid(),
    Plot.dot(penguins, Plot.hexbin({r: "count"}, {x: "culmen_length_mm", y: "culmen_depth_mm", fill: "currentColor"}))
  ]
})
```
:::

## Hexgrid options

The hexgrid mark supports the [standard mark options](../features/marks.md#mark-options). It does not accept any data or support channels. The default **stroke** is *currentColor*, the default **strokeOpacity** is 0.1, and the default **clip** is true. The **binWidth** defaults to 20, matching the [hexbin transform](../transforms/hexbin.md). The **fill** option is not supported, but a [frame mark](./frame.md) can be used to the same effect.

## hexgrid(*options*) {#hexgrid}

```js
Plot.hexgrid({stroke: "red"})
```

Returns a new hexgrid mark with the specified *options*.

# docs/marks/image.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import penguins from "../data/penguins.ts";

const presidents = shallowRef([]);

onMounted(() => {
  d3.csv("../data/us-president-favorability.csv", d3.autoType).then((data) => (presidents.value = data));
});

</script>

# Image mark <VersionBadge version="0.3.0" />

The **image mark** draws images centered at the given position in **x** and **y**. It is often used to construct scatterplots in place of a [dot mark](./dot.md). For example, the chart below, based on one by [Robert Lesser](https://observablehq.com/@rlesser/when-presidents-fade-away), shows the favorability of U.S. presidents over time alongside their portraits.

:::plot defer https://observablehq.com/@observablehq/plot-image-scatterplot
```js
Plot.plot({
  inset: 20,
  x: {label: "First inauguration date"},
  y: {grid: true, label: "Net favorability (%)", tickFormat: "+f"},
  marks: [
    Plot.ruleY([0]),
    Plot.image(presidents, {
      x: "First Inauguration Date",
      y: (d) => d["Very Favorable %"] + d["Somewhat Favorable %"] - d["Very Unfavorable %"] - d["Somewhat Unfavorable %"],
      src: "Portrait URL",
      width: 40,
      title: "Name"
    })
  ]
})
```
:::

Images are drawn in input order by default. This dataset is ordered chronologically, and hence above the more recent presidents are drawn on top. You can change the order with the [sort transform](../transforms/sort.md).

With the **r** option, images will be clipped to circles of the given radius. Use the [**preserveAspectRatio** option](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio) to control which part of the image appears within the circle; below, we favor the top part of the image to show the presidential head.

:::plot defer https://observablehq.com/@observablehq/plot-image-medals
```js
Plot.plot({
  x: {inset: 20, label: "First inauguration date"},
  y: {insetTop: 4, grid: true, label: "Any opinion (%)", tickFormat: "+f"},
  marks: [
    Plot.ruleY([0]),
    Plot.image(presidents, {
      x: "First Inauguration Date",
      y: (d) => d["Very Favorable %"] + d["Somewhat Favorable %"] + d["Very Unfavorable %"] + d["Somewhat Unfavorable %"],
      src: "Portrait URL",
      r: 20,
      preserveAspectRatio: "xMidYMin slice",
      title: "Name"
    })
  ]
})
```
:::

:::tip
You can also use the **r** channel as a size encoding, and the **rotate** channel, as with dots.
:::

The **r** option works well with the [dodge transform](../transforms/dodge.md) for an image beeswarm plot. This chart isn’t particularly interesting because new presidents are inaugurated at a fairly consistent rate, but at least it avoids overlapping portraits.

:::plot defer https://observablehq.com/@observablehq/plot-image-dodge
```js
Plot.plot({
  inset: 20,
  height: 280,
  marks: [
    Plot.image(
      presidents,
      Plot.dodgeY({
        x: "First Inauguration Date",
        r: 20, // clip to a circle
        preserveAspectRatio: "xMidYMin slice", // try not to clip heads
        src: "Portrait URL",
        title: "Name"
      })
    )
  ]
})
```
:::

The default size of an image is only 16×16 pixels. This may be acceptable if the image is a small glyph, such as a categorical symbol in a scatterplot. But often you will want to set **width**, **height**, or **r** to increase the image size.

:::plot defer https://observablehq.com/@observablehq/plot-image-scatterplot-2
```js
Plot.plot({
  aspectRatio: 1,
  grid: true,
  x: {label: "Favorable opinion (%)"},
  y: {label: "Unfavorable opinion (%)"},
  marks: [
    Plot.ruleY([0]),
    Plot.ruleX([0]),
    Plot.image(presidents, {
      x: (d) => d["Very Favorable %"] + d["Somewhat Favorable %"],
      y: (d) => d["Very Unfavorable %"] + d["Somewhat Unfavorable %"],
      src: "Portrait URL",
      title: "Name"
    })
  ]
})
```
:::

If — *for reasons* — you want to style the plot with a background image, you can do that using the top-level **style** option rather than an image mark. Below, Kristen Gorman’s penguins dataset is visualized atop her photograph of sea ice near Palmer Station on the Antarctic peninsula, where she collected the measurements.

:::plot defer https://observablehq.com/@observablehq/plot-background-image
```js
Plot.plot({
  margin: 30,
  inset: 10,
  grid: true,
  style: {
    padding: "10px",
    color: "black",
    background: "url(../sea-ice.jpg)",
    backgroundSize: "cover"
  },
  marks: [
    Plot.frame(),
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", fill: "white", stroke: "black"})
  ]
})
```
:::

## Image options

The required **src** option specifies the URL (or relative path) of each image. If **src** is specified as a string that starts with a dot, slash, or URL protocol (*e.g.*, “https:”) it is assumed to be a constant; otherwise it is interpreted as a channel.

In addition to the [standard mark options](../features/marks.md#mark-options), the following optional channels are supported:

* **x** - the horizontal position; bound to the *x* scale
* **y** - the vertical position; bound to the *y* scale
* **width** - the image width (in pixels)
* **height** - the image height (in pixels)
* **r** - the image radius; bound to the *r* scale <VersionBadge version="0.6.6" />
* **rotate** - the rotation angle in degrees clockwise <VersionBadge version="0.6.6" />

If either of the **x** or **y** channels are not specified, the corresponding position is controlled by the **frameAnchor** option.

The **width** and **height** options default to 16 pixels (unless **r** is specified) and can be specified as either a channel or constant. When the width or height is specified as a number, it is interpreted as a constant; otherwise it is interpreted as a channel. Images with a nonpositive width or height are not drawn. If a **width** is specified but not a **height**, or vice versa, the one defaults to the other. Images do not support either a fill or a stroke.

The **r** option, if not null (the default), enables circular clipping; it may be specified as a constant in pixels or a channel. Use the **preserveAspectRatio** option to control which part of the image is clipped. Also defaults the **width** and **height** to twice the effective radius.

The following image-specific constant options are also supported:

* **frameAnchor** - how to position the image within the frame; defaults to *middle*
* **preserveAspectRatio** - the [aspect ratio](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio); defaults to *xMidYMid meet*
* **crossOrigin** - the [cross-origin](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/crossorigin) behavior
* **imageRendering** - the [image-rendering attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/image-rendering); defaults to *auto* (bilinear) <VersionBadge version="0.6.4" />

To crop the image instead of scaling it to fit, set **preserveAspectRatio** to *xMidYMid slice*. The **imageRendering** option may be set to *pixelated* to disable bilinear interpolation on enlarged images; however, note that this is not supported in WebKit.

Images are drawn in input order, with the last data drawn on top. If sorting is needed, say to mitigate overplotting, consider a [sort transform](../transforms/sort.md).

## image(*data*, *options*) {#image}

```js
Plot.image(presidents, {x: "inauguration", y: "favorability", src: "portrait"})
```

Returns a new image with the given *data* and *options*. If neither the **x** nor **y** nor **frameAnchor** options are specified, *data* is assumed to be an array of pairs [[*x₀*, *y₀*], [*x₁*, *y₁*], [*x₂*, *y₂*], …] such that **x** = [*x₀*, *x₁*, *x₂*, …] and **y** = [*y₀*, *y₁*, *y₂*, …].

# docs/marks/line.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, shallowRef, onMounted} from "vue";
import aapl from "../data/aapl.ts";
import driving from "../data/driving.ts";
import sftemp from "../data/sf-temperatures.ts";
import tdf from "../data/tdf.ts";

const beagle = shallowRef([]);
const bls = shallowRef([]);
const stateage = shallowRef([]);
const stocks = shallowRef([]);
const world = shallowRef(null);
const land = computed(() => world.value ? topojson.feature(world.value, world.value.objects.land) : {type: null});

onMounted(() => {
  d3.text("../data/beagle.csv").then((text) => (beagle.value = d3.csvParseRows(text).map(d3.autoType)));
  d3.csv("../data/bls-metro-unemployment.csv", d3.autoType).then((data) => (bls.value = data));
  d3.json("../data/countries-110m.json").then((data) => (world.value = data));
  d3.csv("../data/us-population-state-age.csv", d3.autoType).then((data) => {
    const ages = data.columns.slice(1); // convert wide data to tidy data
    stateage.value = Object.assign(ages.flatMap((age) => data.map((d) => ({state: d.name, age, population: d[age]}))), {ages});
  });
  Promise.all([
    d3.csv("../data/amzn.csv", d3.autoType),
    d3.csv("../data/goog.csv", d3.autoType),
    d3.csv("../data/ibm.csv", d3.autoType)
  ]).then((datas) => {
    stocks.value = d3.zip(["AAPL", "AMZN", "GOOG", "IBM"], [aapl].concat(datas)).flatMap(([Symbol, data]) => data.map((d) => ({Symbol, ...d})));
  });
});

</script>

# Line mark

The **line mark** draws two-dimensional lines as in a line chart. Because the line mark interpolates between adjacent data points, typically both the *x* and *y* scales are quantitative or temporal. For example, below is a line chart of the closing price of Apple stock.

:::plot https://observablehq.com/@observablehq/plot-simple-line-chart
```js
Plot.line(aapl, {x: "Date", y: "Close"}).plot({y: {grid: true}})
```
:::

If the **x** and **y** options are not defined, the line mark assumes that the data is an iterable of points [[*x₁*, *y₁*], [*x₂*, *y₂*], …], allowing for [shorthand](../features/shorthand.md).

:::plot https://observablehq.com/@observablehq/plot-shorthand-line-chart
```js
Plot.line(aapl.map((d) => [d.Date, d.Close])).plot()
```
:::

:::tip
This shorthand loses the automatic *x*- and *y*-axis labels, reducing legibility. Use the **label** [scale option](../features/scales.md) to restore them.
:::

The [lineY constructor](#lineY) provides default channel definitions of **x** = index and **y** = [identity](../features/transforms.md#identity), letting you pass an array of numbers as data. The [lineX constructor](#lineX) similarly provides **x** = identity and **y** = index defaults for lines that go up↑ instead of to the right→. Below, a random walk is made using [d3.cumsum](https://observablehq.com/@d3/d3-cumsum?collection=@d3/d3-array) and [d3.randomNormal](https://observablehq.com/@d3/d3-random?collection=@d3/d3-random).

:::plot defer https://observablehq.com/@observablehq/plot-shorthand-liney
```js
Plot.lineY(d3.cumsum({length: 600}, d3.randomNormal())).plot()
```
:::

As with [areas](./area.md), points in lines are connected in input order: the first point is connected to the second point, the second is connected to the third, and so on. Line data is typically in chronological order. Unsorted data may produce gibberish.

:::plot defer https://observablehq.com/@observablehq/plot-line-sort
```js
Plot.lineY(d3.shuffle(aapl.slice()), {x: "Date", y: "Close"}).plot() // 🌶️
```
:::

If your data isn’t sorted, use the [sort transform](../transforms/sort.md).

:::plot defer https://observablehq.com/@observablehq/plot-line-sort
```js
Plot.lineY(d3.shuffle(aapl.slice()), {x: "Date", y: "Close", sort: "Date"}).plot()
```
:::

While the *x* scale of a line chart often represents time, this is not required. For example, we can plot the elevation profile of a Tour de France stage — and imagine how tiring it must be to start a climb after riding 160km! ⛰🚴💦

:::plot defer https://observablehq.com/@observablehq/plot-tour-de-france-elevation-profile
```js
Plot.plot({
  x: {
    label: "Distance from stage start (km)"
  },
  y: {
    label: "Elevation (m)",
    grid: true
  },
  marks: [
    Plot.ruleY([0]),
    Plot.line(tdf, {x: "distance", y: "elevation"})
  ]
})
```
:::

There is no requirement that **y** be dependent on **x**; lines can be used in connected scatterplots to show two independent (but often correlated) variables. (See also [phase plots](https://en.wikipedia.org/wiki/Phase_portrait).) The chart below recreates Hannah Fairfield’s [“Driving Shifts Into Reverse”](http://www.nytimes.com/imagepages/2010/05/02/business/02metrics.html) from 2009.

:::plot defer https://observablehq.com/@observablehq/plot-connected-scatterplot
```js
Plot.plot({
  inset: 10,
  grid: true,
  x: {label: "Miles driven (per person-year)"},
  y: {label: "Cost of gasoline ($ per gallon)"},
  marks: [
    Plot.line(driving, {x: "miles", y: "gas", curve: "catmull-rom", marker: true}),
    Plot.text(driving, {filter: (d) => d.year % 5 === 0, x: "miles", y: "gas", text: (d) => `${d.year}`, dy: -8})
  ]
})
```
:::

To draw multiple lines, use the **z** channel to group [tidy data](https://r4ds.had.co.nz/tidy-data.html) into series. For example, the chart below shows unemployment rates of various metro areas from the Bureau of Labor Statistics; the **z** value is the metro division name.

:::plot defer https://observablehq.com/@observablehq/plot-multiple-line-chart
```js
Plot.plot({
  y: {
    grid: true,
    label: "Unemployment (%)"
  },
  marks: [
    Plot.ruleY([0]),
    Plot.line(bls, {x: "date", y: "unemployment", z: "division"})
  ]
})
```
:::

:::tip
If your data is not tidy, you can use [*array*.flatMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) to pivot.
:::

<!-- Below, we load additional CSV files for other stocks to compare their performance. -->

If a **stroke** (or **fill**) channel is specified, the **z** option defaults to the same, automatically grouping series. For this reason, both **stroke** and **z** are typically ordinal or categorical.

:::plot defer https://observablehq.com/@observablehq/plot-index-chart
```js
Plot.plot({
  y: {
    type: "log",
    grid: true,
    label: "Change in price (%)",
    tickFormat: ((f) => (x) => f((x - 1) * 100))(d3.format("+d"))
  },
  marks: [
    Plot.ruleY([1]),
    Plot.line(stocks, Plot.normalizeY({
      x: "Date",
      y: "Close",
      stroke: "Symbol"
    })),
    Plot.text(stocks, Plot.selectLast(Plot.normalizeY({
      x: "Date",
      y: "Close",
      z: "Symbol",
      text: "Symbol",
      textAnchor: "start",
      dx: 3
    })))
  ]
})
```
:::

:::info
Here the [normalize transform](../transforms/normalize.md) normalizes each time series (**z**) relative to its initial value, while the [select transform](../transforms/select.md) extracts the last point for labeling. A custom tick format converts multiples to percentage change (*e.g.*, 1.6× = +60%).
:::

Varying-color lines are supported. If the **stroke** value varies within series, the line will be segmented by color. (The same behavior applies to other channels, such as **strokeWidth** and **title**.) Specifying the **z** channel (say to null for a single series) is recommended.

:::plot defer https://observablehq.com/@observablehq/plot-varying-stroke-line
```js
Plot.plot({
  x: {
    label: null
  },
  y: {
    grid: true,
    label: "Unemployment (%)"
  },
  marks: [
    Plot.ruleY([0]),
    Plot.line(bls, {
      x: "date",
      y: "unemployment",
      z: "division",
      stroke: "unemployment"
    })
  ]
})
```
:::

Color encodings can also be used to highlight specific series, such as here to emphasize high unemployment in Michigan.

:::plot defer https://observablehq.com/@observablehq/plot-multiple-line-highlight
```js
Plot.plot({
  y: {
    grid: true,
    label: "Unemployment (%)"
  },
  color: {
    domain: [false, true],
    range: ["#ccc", "red"]
  },
  marks: [
    Plot.ruleY([0]),
    Plot.line(bls, {
      x: "date",
      y: "unemployment",
      z: "division",
      stroke: (d) => /, MI /.test(d.division),
      sort: {channel: "stroke"}
    })
  ]
})
```
:::

When using **z**, lines are drawn in input order. The [sort transform](../transforms/sort.md) above places the red lines on top of the gray ones to improve readability.

As an alternative to **z**, you can render multiple lines using multiple marks. While more verbose, this allows you to choose different options for each line. For example, below we plot the a 14-day moving average of the daily highs and lows in temperate San Francisco using the [window transform](../transforms/window.md).

:::plot defer https://observablehq.com/@observablehq/plot-moving-average-line
```js
Plot.plot({
  y: {
    grid: true,
    label: "Temperature (°F)"
  },
  marks: [
    Plot.line(sftemp, Plot.windowY(14, {x: "date", y: "low", stroke: "#4e79a7"})),
    Plot.line(sftemp, Plot.windowY(14, {x: "date", y: "high", stroke: "#e15759"})),
    Plot.ruleY([32]) // freezing
  ]
})
```
:::

If some channel values are undefined (or null or NaN), gaps will appear between adjacent points. To demonstrate, below we set the **y** value to NaN for the first three months of each year.

:::plot defer https://observablehq.com/@observablehq/plot-line-chart-with-gaps
```js
Plot.plot({
  y: {
    grid: true
  },
  marks: [
    Plot.lineY(aapl, {x: "Date", y: (d) => d.Date.getUTCMonth() < 3 ? NaN : d.Close})
  ]
})
```
:::

Supplying undefined values is not the same as filtering the data: the latter will interpolate between the data points. Observe the conspicuous straight lines below!

:::plot defer https://observablehq.com/@observablehq/plot-line-chart-with-gaps
```js
Plot.plot({
  y: {
    grid: true
  },
  marks: [
    Plot.lineY(aapl, {filter: (d) => d.Date.getUTCMonth() >= 3, x: "Date", y: "Close", strokeOpacity: 0.3}),
    Plot.lineY(aapl, {x: "Date", y: (d) => d.Date.getUTCMonth() < 3 ? NaN : d.Close})
  ]
})
```
:::

While uncommon, you can draw a line with ordinal position values. For example below, each line represents a U.S. state; **x** represents an (ordinal) age group while **y** represents the proportion of the state’s population in that age group. This chart emphasizes the overall age distribution of the United States, while giving a hint to variation across states.

:::plot defer https://observablehq.com/@observablehq/plot-ordinal-line
```js
Plot.plot({
  x: {
    domain: stateage.ages, // in age order
    label: "Age range (years)",
    labelAnchor: "right",
    labelArrow: true
  },
  y: {
    label: "Population (%)",
    percent: true,
    grid: true
  },
  marks: [
    Plot.ruleY([0]),
    Plot.line(stateage, Plot.normalizeY("sum", {x: "age", y: "population", z: "state", strokeWidth: 1}))
  ]
})
```
:::

With a [spherical projection](../features/projections.md), line segments become [geodesics](https://en.wikipedia.org/wiki/Great-circle_distance), taking the shortest path between two points on the sphere and wrapping around the antimeridian at 180° longitude. The line below shows Charles Darwin’s voyage on HMS _Beagle_. (Data via [Benjamin Schmidt](https://observablehq.com/@bmschmidt/data-driven-projections-darwins-world).)

:::plot defer https://observablehq.com/@observablehq/plot-spherical-line
```js
Plot.plot({
  projection: "equirectangular",
  marks: [
    Plot.geo(land), // MultiPolygon
    Plot.line(beagle, {stroke: "red"}), // [[lon, lat], …]
    Plot.geo({type: "Point", coordinates: [-0.13, 51.5]}, {fill: "red"}) // London
  ]
})
```
:::

:::tip
Disable spherical interpolation by setting the **curve** option to *linear* instead of the default *auto*.
:::

A projected line can use varying color, too. Below, color reveals the westward direction of the Beagle’s journey around the world, starting and ending in London.

:::plot defer https://observablehq.com/@observablehq/plot-spherical-line-with-a-varying-stroke
```js
Plot.plot({
  projection: "equirectangular",
  marks: [
    Plot.geo(land),
    Plot.line(beagle, {stroke: (d, i) => i, z: null})
  ]
})
```
:::

:::info
Setting **z** to null forces a single line; we want the **stroke** to vary within the line instead of producing a separate line for each color.
:::

Interpolation is controlled by the [**curve** option](../features/curves.md). The default curve is *linear*, which draws straight line segments between pairs of adjacent points. A *step* curve is nice for emphasizing when the value changes, while *basis* and *catmull–rom* are nice for smoothing.

## Line options

The following channels are required:

* **x** - the horizontal position; bound to the *x* scale
* **y** - the vertical position; bound to the *y* scale

In addition to the [standard mark options](../features/marks.md#mark-options), the following optional channels are supported:

* **z** - a categorical value to group data into series

By default, the data is assumed to represent a single series (a single value that varies over time, *e.g.*). If the **z** channel is specified, data is grouped by **z** to form separate series. Typically **z** is a categorical value such as a series name. If **z** is not specified, it defaults to **stroke** if a channel, or **fill** if a channel.

The **fill** defaults to *none*. The **stroke** defaults to *currentColor* if the fill is *none*, and to *none* otherwise. If the stroke is defined as a channel, the line will be broken into contiguous overlapping segments when the stroke color changes; the stroke color will apply to the interval spanning the current data point and the following data point. This behavior also applies to the **fill**, **fillOpacity**, **strokeOpacity**, **strokeWidth**, **opacity**, **href**, **title**, and **ariaLabel** channels. When any of these channels are used, setting an explicit **z** channel (possibly to null) is strongly recommended. The **strokeWidth** defaults to 1.5, the **strokeLinecap** and **strokeLinejoin** default to *round*, and the **strokeMiterlimit** defaults to 1.

Points along the line are connected in input order. Likewise, if there are multiple series via the **z**, **fill**, or **stroke** channel, the series are drawn in input order such that the last series is drawn on top. Typically, the data is already in sorted order, such as chronological for time series; if sorting is needed, consider a [sort transform](../transforms/sort.md).

The line mark supports [curve options](../features/curves.md) to control interpolation between points, and [marker options](../features/markers.md) to add a marker (such as a dot or an arrowhead) on each of the control points. The default curve is *auto*, which is equivalent to *linear* if there is no [projection](../features/projections.md), and otherwise uses the associated projection. If any of the **x** or **y** values are invalid (undefined, null, or NaN), the line will be interrupted, resulting in a break that divides the line shape into multiple segments. (See [d3-shape’s *line*.defined](https://d3js.org/d3-shape/line#line_defined) for more.) If a line segment consists of only a single point, it may appear invisible unless rendered with rounded or square line caps. In addition, some curves such as *cardinal-open* only render a visible segment if it contains multiple points.

## line(*data*, *options*) {#line}

```js
Plot.line(aapl, {x: "Date", y: "Close"})
```

Returns a new line with the given *data* and *options*. If neither the **x** nor **y** options are specified, *data* is assumed to be an array of pairs [[*x₀*, *y₀*], [*x₁*, *y₁*], [*x₂*, *y₂*], …] such that **x** = [*x₀*, *x₁*, *x₂*, …] and **y** = [*y₀*, *y₁*, *y₂*, …].

## lineX(*data*, *options*) {#lineX}

```js
Plot.lineX(aapl.map((d) => d.Close))
```

Similar to [line](#line) except that if the **x** option is not specified, it defaults to the identity function and assumes that *data* = [*x₀*, *x₁*, *x₂*, …]. If the **y** option is not specified, it defaults to [0, 1, 2, …].

If the **interval** option is specified, the [binY transform](../transforms/bin.md) is implicitly applied to the specified *options*. The reducer of the output *x* channel may be specified via the **reduce** option, which defaults to *first*. To default to zero instead of showing gaps in data, as when the observed value represents a quantity, use the *sum* reducer.

```js
Plot.lineX(observations, {y: "date", x: "temperature", interval: "day"})
```

The **interval** option is recommended to “regularize” sampled data; for example, if your data represents timestamped temperature measurements and you expect one sample per day, use "day" as the interval.

## lineY(*data*, *options*) {#lineY}

```js
Plot.lineY(aapl.map((d) => d.Close))
```

Similar to [line](#line) except that if the **y** option is not specified, it defaults to the identity function and assumes that *data* = [*y₀*, *y₁*, *y₂*, …]. If the **x** option is not specified, it defaults to [0, 1, 2, …].

If the **interval** option is specified, the [binX transform](../transforms/bin.md) is implicitly applied to the specified *options*. The reducer of the output *y* channel may be specified via the **reduce** option, which defaults to *first*. To default to zero instead of showing gaps in data, as when the observed value represents a quantity, use the *sum* reducer.

```js
Plot.lineY(observations, {x: "date", y: "temperature", interval: "day"})
```

The **interval** option is recommended to “regularize” sampled data; for example, if your data represents timestamped temperature measurements and you expect one sample per day, use "day" as the interval.

# docs/marks/linear-regression.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref} from "vue";
import cars from "../data/cars.ts";
import penguins from "../data/penguins.ts";

const m = ref(0);

</script>

# Linear regression mark <VersionBadge version="0.5.1" />

The **linear regression** mark draws [linear regression](https://en.wikipedia.org/wiki/Linear_regression) lines with confidence bands, representing the estimated linear relation of a dependent variable (typically **y**) on an independent variable (typically **x**). Below we can see that, in this example dataset at least, the weight of a car is a good linear predictor of its power.

:::plot https://observablehq.com/@observablehq/plot-cars-linear-regression
```js
Plot.plot({
  marks: [
    Plot.dot(cars, {x: "weight (lb)", y: "power (hp)"}),
    Plot.linearRegressionY(cars, {x: "weight (lb)", y: "power (hp)", stroke: "red"})
  ]
})
```
:::

A linear model posits that _y_ is determined by an underlying affine function *y* = *a* ﹢ *b&thinsp;x*, where _a_ is a constant (intercept of the line on the _y_-axis when _x_ = 0) and _b_ is the slope. Given a set of points in **x** and **y**, the linear regression method returns the most likely parameters _a_ and _b_ for the linear model, as well as a confidence band showing the range where these parameters lie with a certain probability, called **ci** (for confidence interval), which defaults to 0.95.

:::info
The regression line is fit using the [least squares](https://en.wikipedia.org/wiki/Least_squares) approach. See Torben Jansen’s [“Linear regression with confidence bands”](https://observablehq.com/@toja/linear-regression-with-confidence-bands) and [this StatExchange question](https://stats.stackexchange.com/questions/101318/understanding-shape-and-calculation-of-confidence-bands-in-linear-regression) for details.
:::

Use the slider below to build a linear model from a subset of the data with **m** points. As you can see, the model gives a line as soon as two points are available, and gets more refined and stable as the size of the subset increases.

<p>
  <label class="label-input">
    Number of points (m):
    <input type="range" v-model.number="m" min="0" :max="cars.length" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{m.toLocaleString("en-US")}}</span>
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-linear-regression-confidence-band
```js
Plot.plot({
  marks: [
    Plot.dot(cars, {x: "weight (lb)", y: "power (hp)", fill: "currentColor", fillOpacity: 0.2}),
    Plot.dot(cars.slice(0, m), {x: "weight (lb)", y: "power (hp)"}),
    Plot.linearRegressionY(cars.slice(0, m), {x: "weight (lb)", y: "power (hp)", stroke: "red"})
  ]
})
```
:::

:::tip
When operating on a subset of the data (the “training dataset”, in machine learning parlance), randomly shuffling the data can reduce bias.
:::

This type of model is regularly criticized for pushing people to the wrong conclusions about their data when the actual underlying structure or process is nonlinear. For example, if you measure the relationship between culmen depth and length in a mixed population of penguins, it is positively correlated in each of the three species (bigger penguins with the longer culmens also tend to have the deeper ones); however, the Gentoo population has a smaller aspect ratio of depth against length, and the overall correlation across the three species is negative. This is called [Simpson’s paradox](https://en.wikipedia.org/wiki/Simpson%27s_paradox), and it applies to any data that contains underlying populations with different properties or outcomes.

:::plot https://observablehq.com/@observablehq/plot-linear-regression-simpson
```js
Plot.plot({
  grid: true,
  color: {legend: true},
  marks: [
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", fill: "species"}),
    Plot.linearRegressionY(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", stroke: "species"}),
    Plot.linearRegressionY(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm"})
  ]
})
```
:::

Finally, note that regression is not a symmetric method: the model computed to express _y_ as a function of _x_ (linearRegressionY) doesn’t give the same result as the regression of _x_ as a function of _y_ (linearRegressionX) unless the points are all perfectly aligned. In the worst case, where the two variables are statistically independent, the linear regression of _y_ against _x_ is an horizontal line, whereas the linear regression of _x_ against _y_ is a vertical line.

:::plot https://observablehq.com/@observablehq/plot-linear-regression-is-not-symmetric
```js
Plot.plot({
  marks: [
    Plot.dot(cars, {x: "weight (lb)", y: "power (hp)", strokeOpacity: 0.5, r: 2}),
    Plot.linearRegressionY(cars, {x: "weight (lb)", y: "power (hp)", stroke: "steelblue"}),
    Plot.linearRegressionX(cars, {x: "weight (lb)", y: "power (hp)", stroke: "orange"})
  ]
})
```
:::

## Linear regression options

The given *options* are passed through to these underlying marks, with the exception of the following options:

* **stroke** - the stroke color of the regression line; defaults to *currentColor*
* **fill** - the fill color of the confidence band; defaults to the line’s *stroke*
* **fillOpacity** - the fill opacity of the confidence band; defaults to 0.1
* **ci** - the confidence interval in [0, 1), or 0 to hide bands; defaults to 0.95
* **precision** - the distance (in pixels) between samples of the confidence band; defaults to 4

Multiple regressions can be defined by specifying **z**, **fill**, or **stroke**.

## linearRegressionX(*data*, *options*) {#linearRegressionX}

```js
Plot.linearRegressionX(mtcars, {y: "wt", x: "hp"})
```

Returns a linear regression mark where **x** is the dependent variable and **y** is the independent variable. (This is the uncommon orientation.)

## linearRegressionY(*data*, *options*) {#linearRegressionY}

```js
Plot.linearRegressionY(mtcars, {x: "wt", y: "hp"})
```

Returns a linear regression mark where **y** is the dependent variable and **x** is the independent variable. (This is the common orientation.)

# docs/marks/link.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, shallowRef, onMounted} from "vue";
import income from "../data/income-gender.ts";
import metros from "../data/metros.ts";

const xy = {x1: -122.4194, y1: 37.7749, x2: 2.3522, y2: 48.8566};
const gods = ["Chaos/Gaia/Mountains", "Chaos/Gaia/Pontus", "Chaos/Gaia/Uranus", "Chaos/Eros", "Chaos/Erebus", "Chaos/Tartarus"];
const world = shallowRef(null);
const land = computed(() => world.value ? topojson.feature(world.value, world.value.objects.land) : null);

onMounted(() => {
  d3.json("../data/countries-110m.json").then((data) => (world.value = data));
});

</script>

# Link mark

The **link mark** draws straight lines between two points [**x1**, **y1**] and [**x2**, **y2**] in quantitative dimensions. It is similar to the [arrow mark](./arrow.md), except it draws a straight line — or geodesic when used with a [spherical projection](../features/projections.md).

For example, the chart below shows the rising inequality (and population) in various U.S. cities from 1980 to 2015. Each link represents two observations of a city: the city’s population (**x**) and inequality (**y**) in 1980, and the same in 2015. The link’s **stroke** redundantly encodes the change in inequality: red indicates rising inequality, while blue (there are only four) indicates declining inequality.

:::plot defer https://observablehq.com/@observablehq/plot-link-variation-chart
```js
Plot.plot({
  grid: true,
  inset: 10,
  x: {
    type: "log",
    label: "Population"
  },
  y: {
    label: "Inequality",
    ticks: 4
  },
  color: {
    scheme: "BuRd",
    label: "Change in inequality from 1980 to 2015",
    legend: true,
    tickFormat: "+f"
  },
  marks: [
    Plot.link(metros, {
      x1: "POP_1980",
      y1: "R90_10_1980",
      x2: "POP_2015",
      y2: "R90_10_2015",
      stroke: (d) => d.R90_10_2015 - d.R90_10_1980,
      markerEnd: "arrow"
    }),
    Plot.text(metros, {
      x: "POP_2015",
      y: "R90_10_2015",
      filter: "highlight",
      text: "nyt_display",
      fill: "currentColor",
      stroke: "var(--vp-c-bg)",
      dy: -8
    })
  ]
})
```
:::

The link mark is used by the composite [tree mark](./tree.md) to render a link from parent to child in a hierarchy. The [treeLink transform](../transforms/tree.md) sets the default [curve option](../features/curves.md) to *bump-x*.

:::plot https://observablehq.com/@observablehq/plot-tree-and-link
```js
Plot.plot({
  axis: null,
  height: 120,
  inset: 20,
  insetRight: 120,
  marks: [
    Plot.link(gods, Plot.treeLink({stroke: "node:internal"})),
    Plot.dot(gods, Plot.treeNode({fill: "node:internal"})),
    Plot.text(gods, Plot.treeNode({text: "node:name", stroke: "var(--vp-c-bg)", fill: "currentColor", dx: 6}))
  ]
})
```
:::

In this example, `gods` is an array of slash-separated paths representing the ancestry of mythological Greek gods.

```js
gods = [
  "Chaos/Gaia/Mountains",
  "Chaos/Gaia/Pontus",
  "Chaos/Gaia/Uranus",
  "Chaos/Eros",
  "Chaos/Erebus",
  "Chaos/Tartarus"
]
```

With a [spherical projection](../features/projections.md) and the default [*auto* curve](../features/curves.md), the link mark will render a geodesic: the shortest path between two points on the surface of the sphere. Setting the **curve** to *linear* will instead draw a straight line between the projected points. For example, below we draw two links from San Francisco to Paris.

:::plot defer https://observablehq.com/@observablehq/plot-projected-link
```js
Plot.plot({
  projection: "equal-earth",
  marks: [
    Plot.sphere(),
    Plot.geo(land, {fill: "currentColor", fillOpacity: 0.3}),
    Plot.link({length: 1}, {curve: "linear", stroke: "red", ...xy}),
    Plot.link({length: 1}, {markerStart: "dot", markerEnd: "arrow", strokeWidth: 1.5, ...xy})
  ]
})
```
:::

```js
xy = ({x1: -122.4194, y1: 37.7749, x2: 2.3522, y2: 48.8566})
```

Like a [rule](./rule.md), a link can also serve as annotation. Whereas a rule is strictly horizontal or vertical, however, a link can generate [diagonal lines](http://kelsocartography.com/blog/?p=2074). The following chart depicts the gender gap in wages, segmented by education and age, in the U.S. A regular grid would make the gender disparity much less clear, even with the domains explicitly set to be equal.

:::plot https://observablehq.com/@observablehq/plot-gender-income-inequality
```js
Plot.plot({
  aspectRatio: 1,
  marginRight: 40,
  x: {
    label: "Median annual income (men, thousands)",
    transform: (d) => d / 1000,
    tickSpacing: 60
  },
  y: {
    label: "Median annual income (women, thousands)",
    transform: (d) => d / 1000,
    tickSpacing: 60
  },
  marks: [
    Plot.link([0.6, 0.7, 0.8, 0.9, 1], {
      x1: 0,
      y1: 0,
      x2: 102000,
      y2: (k) => 102000 * k,
      strokeOpacity: (k) => k === 1 ? 1 : 0.2
    }),
    Plot.text([0.6, 0.7, 0.8, 0.9, 1], {
      x: 102000,
      y: (k) => 102000 * k,
      text: ((f) => (k) => k === 1 ? "Equal" : f(k - 1))(d3.format("+.0%")),
      textAnchor: "start",
      dx: 6
    }),
    Plot.dot(income, {x: "m", y: "f"})
  ]
})
```
:::

## Link options

The following channels are required:

* **x1** - the starting horizontal position; bound to the *x* scale
* **y1** - the starting vertical position; bound to the *y* scale
* **x2** - the ending horizontal position; bound to the *x* scale
* **y2** - the ending vertical position; bound to the *y* scale

For vertical or horizontal links, the **x** option can be specified as shorthand for **x1** and **x2**, and the **y** option can be specified as shorthand for **y1** and **y2**, respectively.

The link mark supports the [standard mark options](../features/marks.md). The **stroke** defaults to currentColor. The **fill** defaults to none. The **strokeWidth** and **strokeMiterlimit** default to one.

The link mark supports [curve options](../features/curves.md) to control interpolation between points, and [marker options](../features/markers.md) to add a marker (such as a dot or an arrowhead) on each of the control points. Since a link always has two points by definition, only the following curves (or a custom curve) are recommended: *linear*, *step*, *step-after*, *step-before*, *bump-x*, or *bump-y*. Note that the *linear* curve is incapable of showing a fill since a straight line has zero area. For a curved link, you can use a bent [arrow](./arrow.md) (with no arrowhead, if desired).

## link(*data*, *options*) {#link}

```js
Plot.link(inequality, {x1: "POP_1980", y1: "R90_10_1980", x2: "POP_2015", y2: "R90_10_2015"})
```

Returns a new link with the given *data* and *options*.

# docs/marks/raster.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import penguins from "../data/penguins.ts";
import volcano from "../data/volcano.ts";

const ca55 = shallowRef([]);
const vapor = shallowRef([]);
const grid = {"width": 10, "height": 10, "values": d3.cross(d3.range(10), d3.range(10), (x, y) => x * y)};

onMounted(() => {
  d3.csv("../data/ca55-south.csv", d3.autoType).then((data) => (ca55.value = data));
  d3.text("../data/MYDAL2_M_SKY_WV_2022-11-01_rgb_360x180.csv").then((text) => (vapor.value = d3.csvParseRows(text).flat().map((x) => (x === "99999.0" ? NaN : +x))));
});

function mandelbrot(x, y) {
  for (let n = 0, zr = 0, zi = 0; n < 80; ++n) {
    [zr, zi] = [zr * zr - zi * zi + x, 2 * zr * zi + y];
    if (zr * zr + zi * zi > 4) return n;
  }
}

</script>

# Raster mark <VersionBadge version="0.6.2" />

:::tip
To produce contours instead of a heatmap, see the [contour mark](./contour.md).
:::

The **raster mark** renders a [raster image](https://en.wikipedia.org/wiki/Raster_graphics) — that is, an image formed by discrete pixels in a grid, not a vector graphic like other marks. And whereas the [image mark](./image.md) shows an *existing* image, the raster mark *creates* one from abstract data, either by [interpolating spatial samples](#spatial-interpolators) (arbitrary points in **x** and **y**) or by sampling a function *f*(*x*,*y*) along the grid.

For example, the heatmap below shows the topography of the [Maungawhau volcano](https://en.wikipedia.org/wiki/Maungawhau), produced from a {{volcano.width}}×{{volcano.height}} grid of elevation samples.

:::plot defer https://observablehq.com/@observablehq/plot-volcano-raster
```js
Plot.plot({
  color: {label: "Elevation (m)", legend: true},
  marks: [
    Plot.raster(volcano.values, {width: volcano.width, height: volcano.height})
  ]
})
```
:::

The grid (`volcano.values` above) is a list of numbers `[103, 104, 104, …]`. The first number `103` is the elevation of the bottom-left corner. This grid is in [row-major order](https://en.wikipedia.org/wiki/Row-_and_column-major_order), meaning that the elevations of the first row are followed by the second row, then the third, and so on. Here’s a smaller grid to demonstrate the concept.

```js
grid = ({
  "width": 10,
  "height": 10,
  "values": [
     0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
     0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
     0,  2,  4,  6,  8, 10, 12, 14, 16, 18,
     0,  3,  6,  9, 12, 15, 18, 21, 24, 27,
     0,  4,  8, 12, 16, 20, 24, 28, 32, 36,
     0,  5, 10, 15, 20, 25, 30, 35, 40, 45,
     0,  6, 12, 18, 24, 30, 36, 42, 48, 54,
     0,  7, 14, 21, 28, 35, 42, 49, 56, 63,
     0,  8, 16, 24, 32, 40, 48, 56, 64, 72,
     0,  9, 18, 27, 36, 45, 54, 63, 72, 81
  ]
})
```

We can visualize this small grid directly with a [text mark](./text.md) using the same color encoding. Notice that the image below is flipped vertically relative to the data: the first row of the data is the *bottom* of the image because below *y* points up↑.

:::plot https://observablehq.com/@observablehq/plot-small-grid-raster
```js
Plot.plot({
  grid: true,
  x: {domain: [0, grid.width], label: "column"},
  y: {domain: [0, grid.height], label: "row"},
  marks: [
    Plot.text(grid.values, {
      text: Plot.identity,
      fill: Plot.identity,
      x: (d, i) => i % grid.width + 0.5,
      y: (d, i) => Math.floor(i / grid.width) + 0.5
    })
  ]
})
```
:::

Also notice that the grid points are offset by 0.5: they represent the *middle* of each pixel rather than the corner. Below, the raster mark is laid under the text mark to show the raster image.

:::plot defer https://observablehq.com/@observablehq/plot-small-grid-raster
```js
Plot.plot({
  marks: [
    Plot.raster(grid.values, {
      width: grid.width,
      height: grid.height,
      imageRendering: "pixelated" // to better show the grid
    }),
    Plot.text(grid.values, {
      text: Plot.identity,
      fill: "white",
      x: (d, i) => i % grid.width + 0.5,
      y: (d, i) => Math.floor(i / grid.width) + 0.5
    })
  ]
})
```
:::

:::warning CAUTION
Safari does not currently support the **imageRendering** option.
:::

While the raster mark provides convenient shorthand for strictly gridded data, as above, it *also* works with samples in arbitrary positions and arbitrary order. For example, in 1955 the [Great Britain aeromagnetic survey](https://www.bgs.ac.uk/datasets/gb-aeromagnetic-survey/) measured the Earth’s magnetic field by plane. Each sample recorded the longitude and latitude alongside the strength of the [IGRF](https://www.ncei.noaa.gov/products/international-geomagnetic-reference-field) in [nanoteslas](https://en.wikipedia.org/wiki/Tesla_(unit)).

```
LONGITUDE,LATITUDE,MAG_IGRF90
-2.36216,51.70945,7
-2.36195,51.71727,6
-2.36089,51.72404,9
-2.35893,51.73758,12
-2.35715,51.7532,18
-2.35737,51.76636,24
```

Using a [dot mark](./dot.md), we can make a quick scatterplot to see the irregular grid. We’ll use a *diverging* color scale to distinguish positive and negative values.

:::plot defer https://observablehq.com/@observablehq/plot-igrf90-dots
```js
Plot.dot(ca55, {x: "LONGITUDE", y: "LATITUDE", fill: "MAG_IGRF90"}).plot({color: {type: "diverging"}})
```
:::

And using a [line mark](./line.md), we can connect the line segments to reveal the flight paths.

:::plot defer https://observablehq.com/@observablehq/plot-igrf90-flight-paths
```js
Plot.line(ca55, {x: "LONGITUDE", y: "LATITUDE", stroke: "MAG_IGRF90", z: "LINE_NUMB-SEG"}).plot({color: {type: "diverging"}})
```
:::

The image above starts to be readable, but it would be frustrating to not do more with this data given all the effort that went into collecting it! Fortunately the raster mark’s **interpolate** option can quickly produce a continuous image.

The *nearest* interpolator assigns the value of each pixel in the grid using the nearest sample in the data. In effect, this produces a Voronoi diagram.

:::plot defer https://observablehq.com/@observablehq/plot-igfr90-raster
```js
Plot.raster(ca55, {x: "LONGITUDE", y: "LATITUDE", fill: "MAG_IGRF90", interpolate: "nearest"}).plot({color: {type: "diverging"}})
```
:::

:::tip
You can also make this Voronoi diagram with the [voronoi mark](./delaunay.md).
:::

If the observed phenomenon is continuous, we can use the _barycentric_ interpolator. This constructs a Delaunay triangulation of the samples, and then paints each triangle by interpolating the values of the triangle’s vertices in [barycentric coordinates](https://en.wikipedia.org/wiki/Barycentric_coordinate_system). (Points outside the convex hull are extrapolated.)

:::plot defer https://observablehq.com/@observablehq/plot-igfr90-barycentric
```js
Plot.raster(ca55, {x: "LONGITUDE", y: "LATITUDE", fill: "MAG_IGRF90", interpolate: "barycentric"}).plot({color: {type: "diverging"}})
```
:::

Finally, the _random-walk_ interpolator assigns the value at each grid location simply by taking a random walk that stops after reaching a minimum distance from any sample! The interpolator uses the [walk on spheres](https://observablehq.com/@fil/walk-on-spheres) algorithm, limited to 2 consecutive jumps.

:::plot defer https://observablehq.com/@observablehq/plot-igrf90-random-walk
```js
Plot.raster(ca55, {x: "LONGITUDE", y: "LATITUDE", fill: "MAG_IGRF90", interpolate: "random-walk"}).plot({color: {type: "diverging"}})
```
:::

With the _random-walk_ method, the image is grainy, reflecting the uncertainty of the random walk. Use the **blur** option to make it smoother.

:::plot defer https://observablehq.com/@observablehq/plot-igrf90-random-walk
```js
Plot.raster(ca55, {x: "LONGITUDE", y: "LATITUDE", fill: "MAG_IGRF90", interpolate: "random-walk", blur: 5}).plot({color: {type: "diverging"}})
```
:::

:::tip
If none of the built-in [spatial interpolators](#spatial-interpolators) suffice, you can write your own as a custom function!
:::

The raster mark can interpolate categorical values, too! Below, this creates an interesting “map” of penguin species in the space of culmen length _vs._ depth.

:::plot defer https://observablehq.com/@observablehq/plot-nominal-random-walk
```js
Plot.plot({
  color: {legend: true},
  marks: [
    Plot.raster(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", fill: "species", interpolate: "random-walk"}),
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm"})
  ]
})
```
:::

As an alternative to interpolating discrete samples, you can supply values as a continuous function *f*(*x*,*y*); the raster mark will invoke this function for the midpoint of each pixel in the raster grid, similar to a WebGL fragment shader. For example, below we visualize the [Mandelbrot set](https://en.wikipedia.org/wiki/Mandelbrot_set) by counting the number of iterations needed until the point “escapes”.

:::plot defer https://observablehq.com/@observablehq/plot-mandelbrot-set
```js
Plot.raster({fill: mandelbrot, x1: -2, x2: 1, y1: -1.164, y2: 1.164}).plot({aspectRatio: 1})
```
:::

```js
function mandelbrot(x, y) {
  for (let n = 0, zr = 0, zi = 0; n < 80; ++n) {
    [zr, zi] = [zr * zr - zi * zi + x, 2 * zr * zi + y];
    if (zr * zr + zi * zi > 4) return n;
  }
}
```

Or to visualize the arctangent function:

:::plot defer https://observablehq.com/@observablehq/plot-arctangent-raster
```js
Plot.raster({x1: -1, x2: 1, y1: -1, y2: 1, fill: (x, y) => Math.atan2(y, x)}).plot()
```
:::

:::tip
When faceting, the sample function *f*(*x*,*y*) is passed a third argument of the facet values {*fx*, *fy*}.
:::

The raster mark supports Plot’s [projection system](../features/projections.md). The chart below shows global atmospheric water vapor measurements from [NASA Earth Observations](https://neo.gsfc.nasa.gov/view.php?datasetId=MYDAL2_M_SKY_WV).

:::plot defer https://observablehq.com/@observablehq/plot-raster-projection
```js
Plot.plot({
  projection: "equal-earth",
  color: {
    scheme: "BuPu",
    domain: [0, 6],
    legend: true,
    label: "Water vapor (cm)"
  },
  marks: [
    Plot.raster(vapor, {
      fill: Plot.identity,
      width: 360,
      height: 180,
      x1: -180,
      y1: 90,
      x2: 180,
      y2: -90,
      interpolate: "barycentric",
      clip: "sphere"
    }),
    Plot.sphere({stroke: "black"})
  ]
})
```
:::

## Raster options

If *data* is provided, it represents discrete samples in abstract coordinates **x** and **y**; the **fill** and **fillOpacity** channels specify further abstract values (_e.g._, height in a topographic map) to be [spatially interpolated](#spatial-interpolators) to produce an image.

```js
Plot.raster(volcano.values, {width: volcano.width, height: volcano.height})
```

The **fill** and **fillOpacity** channels may alternatively be specified as continuous functions *f*(*x*,*y*) to be evaluated at each pixel centroid of the raster grid (without interpolation).

```js
Plot.raster({x1: -1, x2: 1, y1: -1, y2: 1, fill: (x, y) => Math.atan2(y, x)})
```

The resolution of the rectangular raster image may be specified with the following options:

* **width** - the number of pixels on each horizontal line
* **height** - the number of lines; a positive integer

The raster dimensions may also be imputed from the extent of *x* and *y* and a pixel size:

* **x1** - the starting horizontal position; bound to the *x* scale
* **x2** - the ending horizontal position; bound to the *x* scale
* **y1** - the starting vertical position; bound to the *y* scale
* **y2** - the ending vertical position; bound to the *y* scale
* **pixelSize** - the screen size of a raster pixel; defaults to 1

If **width** is specified, **x1** defaults to 0 and **x2** defaults to **width**; likewise, if **height** is specified, **y1** defaults to 0 and **y2** defaults to **height**. Otherwise, if **data** is specified, **x1**, **y1**, **x2**, and **y2** respectively default to the frame’s left, top, right, and bottom coordinates. Lastly, if **data** is not specified (as when **fill** or **fillOpacity** is a function of *x* and *y*), you must specify all of **x1**, **x2**, **y1**, and **y2** to define the raster domain (see below). The **pixelSize** may be set to the inverse of the devicePixelRatio for a sharper image.

The following raster-specific constant options are supported:

* **interpolate** - the [spatial interpolation method](#spatial-interpolators)
* **imageRendering** - the [image-rendering attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/image-rendering); defaults to *auto* (bilinear)
* **blur** - a non-negative pixel radius for smoothing; defaults to 0

The **imageRendering** option may be set to *pixelated* for a sharper image. The **interpolate** option is ignored when **fill** or **fillOpacity** is a function of *x* and *y*.

## raster(*data*, *options*) {#raster}

```js
Plot.raster(volcano.values, {width: volcano.width, height: volcano.height})
```

Returns a new raster mark with the given (optional) *data* and *options*.

## Spatial interpolators

The [raster](#raster-mark) and [contour](./contour.md) marks use **spatial interpolators** to populate a raster grid from a discrete set of (often ungridded) spatial samples. The **interpolate** option controls how these marks compute the raster grid. The following built-in methods are provided:

* *none* (or null) - assign each sample to the containing pixel
* *nearest* - assign each pixel to the closest sample’s value (Voronoi diagram)
* *barycentric* - apply barycentric interpolation over the Delaunay triangulation
* *random-walk* - apply a random walk from each pixel, stopping when near a sample

The **interpolate** option can also be specified as a function with the following arguments:

* *index* - an array of numeric indexes into the channels *x*, *y*, *value*
* *width* - the width of the raster grid; a positive integer
* *height* - the height of the raster grid; a positive integer
* *x* - an array of values representing the *x*-position of samples
* *y* - an array of values representing the *y*-position of samples
* *value* - an array of values representing the sample’s observed value

So, *x*[*index*[0]] represents the *x*-position of the first sample, *y*[*index*[0]] its *y*-position, and *value*[*index*[0]] its value (*e.g.*, the observed height for a topographic map).

## interpolateNone(*index*, *width*, *height*, *x*, *y*, *value*) {#interpolateNone}

```js
Plot.raster(ca55, {x: "LONGITUDE", y: "LATITUDE", fill: "MAG_IGRF90", interpolate: Plot.interpolateNone})
```

Applies a simple forward mapping of samples, binning them into pixels in the raster grid without any blending or interpolation. If multiple samples map to the same pixel, the last one wins; this can introduce bias if the points are not in random order, so use [Plot.shuffle](../transforms/sort.md#shuffle) to randomize the input if needed.

## interpolateNearest(*index*, *width*, *height*, *x*, *y*, *value*) {#interpolateNearest}

```js
Plot.raster(ca55, {x: "LONGITUDE", y: "LATITUDE", fill: "MAG_IGRF90", interpolate: Plot.interpolateNearest})
```

Assigns each pixel in the raster grid the value of the closest sample; effectively a Voronoi diagram.

## interpolatorBarycentric(*options*) {#interpolatorBarycentric}

```js
Plot.raster(ca55, {x: "LONGITUDE", y: "LATITUDE", fill: "MAG_IGRF90", interpolate: Plot.interpolatorBarycentric()})
```

Constructs a Delaunay triangulation of the samples, and then for each pixel in the raster grid, determines the triangle that covers the pixel’s centroid and interpolates the values associated with the triangle’s vertices using [barycentric coordinates](https://en.wikipedia.org/wiki/Barycentric_coordinate_system). If the interpolated values are ordinal or categorical (_i.e._, anything other than numbers or dates), then one of the three values will be picked randomly weighted by the barycentric coordinates; the given **random** number generator will be used, which defaults to a [linear congruential generator](https://d3js.org/d3-random#randomLcg) with a fixed seed (for deterministic results).

## interpolatorRandomWalk(*options*) {#interpolatorRandomWalk}

```js
Plot.raster(ca55, {x: "LONGITUDE", y: "LATITUDE", fill: "MAG_IGRF90", interpolate: Plot.interpolatorRandomWalk()})
```

For each pixel in the raster grid, initiates a random walk, stopping when either the walk is within a given distance (**minDistance**) of a sample or the maximum allowable number of steps (**maxSteps**) have been taken, and then assigning the current pixel the closest sample’s value. The random walk uses the “walk on spheres” algorithm in two dimensions described by [Sawhney and Crane](https://www.cs.cmu.edu/~kmcrane/Projects/MonteCarloGeometryProcessing/index.html), SIGGRAPH 2020; the given **random** number generator will be used, which defaults to a [linear congruential generator](https://d3js.org/d3-random#randomLcg) with a fixed seed (for deterministic results).

# docs/marks/rect.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, ref, shallowRef, onMounted} from "vue";

const r = ref(4);
const diamonds = shallowRef([]);
const seattle = shallowRef([]);
const olympians = shallowRef([{weight: 31, height: 1.21, sex: "female"}, {weight: 170, height: 2.21, sex: "male"}]);
const povcalnet = shallowRef([]);
const us = shallowRef(null);
const counties = computed(() => us.value ? topojson.feature(us.value, us.value.objects.counties).features : []);
const countyboxes = computed(() => counties.value.map((d) => d3.geoBounds(d).flat()));
const bins = d3.bin()(d3.range(1000).map(d3.randomNormal.source(d3.randomLcg(42))()));

onMounted(() => {
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
  d3.csv("../data/diamonds.csv", d3.autoType).then((data) => (diamonds.value = data));
  d3.csv("../data/seattle-weather.csv", d3.autoType).then((data) => (seattle.value = data));
  d3.csv("../data/povcalnet.csv", d3.autoType).then((data) => (povcalnet.value = data));
  d3.json("../data/us-counties-10m.json").then((data) => (us.value = data));
});

</script>

# Rect mark

The **rect mark** draws axis-aligned rectangles defined by **x1**, **y1**, **x2**, and **y2**. For example, here we display geographic bounding boxes of U.S. counties represented as [*x1*, *y1*, *x2*, *y2*] tuples, where *x1* & *x2* are degrees longitude and *y1* & *y2* are degrees latitude.

:::plot defer https://observablehq.com/@observablehq/plot-county-boxes
```js
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.rect(countyboxes, {
      x1: "0", // or ([x1]) => x1
      y1: "1", // or ([, y1]) => y1
      x2: "2", // or ([,, x2]) => x2
      y2: "3", // or ([,,, y2]) => y2
      stroke: "currentColor"
    })
  ]
})
```
:::

The rect mark is often used to produce histograms or heatmaps of quantitative data. For example, given some binned observations computed by [d3.bin](https://d3js.org/d3-array/bin), we can produce a basic histogram with [rectY](#rectY) as follows:

:::plot https://observablehq.com/@observablehq/plot-rects-and-bins
```js
Plot.rectY(bins, {x1: "x0", x2: "x1", y: "length"}).plot({round: true})
```
:::

```js
bins = d3.bin()(d3.range(1000).map(d3.randomNormal()))
```

:::info
d3.bin uses *x0* and *x1* to represent the lower and upper bound of each bin, whereas the rect mark uses **x1** and **x2**. The *length* field is the count of values in each bin, which is encoded as **y**.
:::

More commonly, the rect mark is paired with the [bin transform](../transforms/bin.md) to bin quantitative values automatically. As an added bonus, this sets default [inset options](../features/marks.md#mark-options) for a 1px gap separating adjacent rects, improving readability.

:::plot https://observablehq.com/@observablehq/plot-rects-and-bins
```js
Plot.rectY(d3.range(1000).map(d3.randomNormal()), Plot.binX()).plot()
```
:::

Like the [bar mark](./bar.md), the rect mark has two convenience constructors for common orientations: [rectX](#rectX) is for horizontal→ rects with an implicit [stackX transform](../transforms/stack.md#stackX), while [rectY](#rectY) is for vertical↑ rects with an implicit [stackY transform](../transforms/stack.md#stackY).

:::plot defer https://observablehq.com/@observablehq/plot-vertical-histogram
```js
Plot.plot({
  color: {legend: true},
  marks: [
    Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", fill: "sex"})),
    Plot.ruleY([0])
  ]
})
```
:::

For overlapping rects, you can opt-out of the implicit stack transform by specifying either **x1** or **x2** for rectX, and likewise either **y1** or **y2** for rectY.

:::plot defer https://observablehq.com/@observablehq/plot-overlapping-histogram
```js-vue
Plot.plot({
  round: true,
  color: {legend: true},
  marks: [
    Plot.rectY(olympians, Plot.binX({y2: "count"}, {x: "weight", fill: "sex", mixBlendMode: "{{$dark ? "screen" : "multiply"}}"})),
    Plot.ruleY([0])
  ]
})
```
:::

:::warning CAUTION
While the **mixBlendMode** option is useful for mitigating occlusion, it can be slow to render if there are many elements. More than two overlapping histograms may also be hard to read.
:::

The rect mark and bin transform naturally support [faceting](../features/facets.md), too.

:::plot defer https://observablehq.com/@observablehq/plot-overlapping-histogram
```js
Plot.plot({
  marks: [
    Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", fy: "sex"})),
    Plot.ruleY([0])
  ]
})
```
:::

The [rect constructor](#rect), again with the [bin transform](../transforms/bin.md), can produce two-dimensional histograms (heatmaps) where density is represented by the **fill** color encoding.

:::plot defer https://observablehq.com/@observablehq/plot-continuous-dimensions-heatmap
```js-vue
Plot.plot({
  height: 640,
  marginLeft: 60,
  color: {
    scheme: "{{$dark ? "turbo" : "YlGnBu"}}",
    type: "symlog"
  },
  marks: [
    Plot.rect(diamonds, Plot.bin({fill: "count"}, {x: "carat", y: "price", thresholds: 100}))
  ]
})
```
:::

:::tip
A similar plot can be made with the [dot mark](./dot.md), if you’d prefer a size encoding.
:::

Below we recreate an uncommon [chart by Max Roser](https://ourworldindata.org/poverty-minimum-growth-needed) that visualizes global poverty. Each rect represents a country: *x* encodes the country’s population, while *y* encodes the proportion of that population living in poverty; hence area represents the number of people living in poverty. Rects are [stacked](../transforms/stack.md) along *x* in order of descending *y*.

:::plot defer https://observablehq.com/@observablehq/plot-cumulative-distribution-of-poverty
```js
Plot.plot({
  x: {label: "Population (millions)"},
  y: {percent: true, label: "Proportion living on less than $30 per day (%)"},
  marks: [
    Plot.rectY(povcalnet, Plot.stackX({
      filter: (d) => ["N", "A"].includes(d.CoverageType),
      x: "ReqYearPopulation",
      order: "HeadCount",
      reverse: true,
      y2: "HeadCount", // y2 to avoid stacking by y
      title: (d) => `${d.CountryName}\n${(d.HeadCount * 100).toFixed(1)}%`,
      insetLeft: 0.2,
      insetRight: 0.2
    })),
    Plot.ruleY([0])
  ]
})
```
:::

The [interval transform](../transforms/interval.md) may be used to convert a single value in **x** or **y** (or both) into an extent. (Unlike the bin transform, the interval transform will produce overlapping rects if multiple points have the same position.) The chart below shows the observed daily maximum temperature in Seattle for the year 2015. The day-in-month and month-in-year numbers are expanded to unit intervals by setting the **interval** option to 1.

:::plot defer https://observablehq.com/@observablehq/plot-seattle-heatmap-quantitative
```js
Plot.plot({
  aspectRatio: 1,
  y: {ticks: 12, tickFormat: Plot.formatMonth("en", "narrow")},
  marks: [
    Plot.rect(seattle.filter((d) => d.date.getUTCFullYear() === 2015), {
      x: (d) => d.date.getUTCDate(),
      y: (d) => d.date.getUTCMonth(),
      interval: 1,
      fill: "temp_max",
      inset: 0.5
    })
  ]
})
```
:::

:::tip
A similar chart could be made with the [cell mark](./cell.md) using ordinal *x* and *y* scales instead, or with the [dot mark](./dot.md) as a scatterplot.
:::

To round corners, use the **r** option. If the combined corner radii exceed the width or height of the rect, the radii are proportionally reduced to produce a pill shape with circular caps. Try increasing the radii below.

<p>
  <label class="label-input" style="display: flex;">
    <span style="display: inline-block; width: 7em;">r:</span>
    <input type="range" v-model.number="r" min="0" max="25" step="0.2">
    <span style="font-variant-numeric: tabular-nums;">{{r}}</span>
  </label>
</p>

:::plot hidden defer https://observablehq.com/@observablehq/plot-rounded-rects
```js
Plot.plot({
  marks: [
    Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", r, thresholds: 10})),
    Plot.ruleY([0])
  ]
})
```
:::

```js-vue
Plot.plot({
  marks: [
    Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", r: {{r}}, thresholds: 10})),
    Plot.ruleY([0])
  ]
})
```

To round corners on a specific side, use the **rx1**, **ry1**, **rx2**, or **ry2** options. When stacking rounded rects vertically, use a positive **ry2** and a corresponding negative **ry1**; likewise for stacking rounded rects horizontally, use a positive **rx2** and a negative **rx1**. Use the **clip** option to hide the “wings” below zero.

:::plot defer https://observablehq.com/@observablehq/plot-rounded-rects
```js
Plot.plot({
  color: {legend: true},
  marks: [
    Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", fill: "sex", ry2: 4, ry1: -4, clip: "frame"})),
    Plot.ruleY([0])
  ]
})
```
:::

You can even round specific corners using the **rx1y1**, **rx2y1**, **rx2y2**, and **rx1y2** options.

:::plot defer https://observablehq.com/@observablehq/plot-rounded-rects
```js
Plot.plot({
  color: {legend: true},
  marks: [
    Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", fill: "sex", rx1y2: 10, rx1y1: -10, clip: "frame"})),
    Plot.ruleY([0])
  ]
})
```
:::

## Rect options

The following channels are optional:

* **x1** - the starting horizontal position; bound to the *x* scale
* **y1** - the starting vertical position; bound to the *y* scale
* **x2** - the ending horizontal position; bound to the *x* scale
* **y2** - the ending vertical position; bound to the *y* scale

If **x1** is specified but **x2** is not specified, then *x* must be a *band* scale; if **y1** is specified but **y2** is not specified, then *y* must be a *band* scale.

If an **interval** is specified, such as d3.utcDay, **x1** and **x2** can be derived from **x**: *interval*.floor(*x*) is invoked for each **x** to produce **x1**, and *interval*.offset(*x1*) is invoked for each **x1** to produce **x2**. The same is true for **y**, **y1**, and **y2**, respectively. If the interval is specified as a number *n*, **x1** and **x2** are taken as the two consecutive multiples of *n* that bracket **x**. Named UTC intervals such as *day* are also supported; see [scale options](../features/scales.md#scale-options).

The rect mark supports the [standard mark options](../features/marks.md#mark-options), including [insets](../features/marks.md#insets) and [rounded corners](../features/marks.md#rounded-corners). The **stroke** defaults to *none*. The **fill** defaults to *currentColor* if the stroke is *none*, and to *none* otherwise.

## rect(*data*, *options*) {#rect}

```js
Plot.rect(olympians, Plot.bin({fill: "count"}, {x: "weight", y: "height"}))
```

Returns a new rect with the given *data* and *options*.

## rectX(*data*, *options*) {#rectX}

```js
Plot.rectX(olympians, Plot.binY({x: "count"}, {y: "weight"}))
```

Equivalent to [rect](#rect), except that if neither the **x1** nor **x2** option is specified, the **x** option may be specified as shorthand to apply an implicit [stackX transform](../transforms/stack.md); this is the typical configuration for a histogram with horizontal→ rects aligned at *x* = 0. If the **x** option is not specified, it defaults to the identity function.

## rectY(*data*, *options*) {#rectY}

```js
Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight"}))
```

Equivalent to [rect](#rect), except that if neither the **y1** nor **y2** option is specified, the **y** option may be specified as shorthand to apply an implicit [stackY transform](../transforms/stack.md); this is the typical configuration for a histogram with vertical↑ rects aligned at *y* = 0. If the **y** option is not specified, it defaults to the identity function.

# docs/marks/rule.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import aapl from "../data/aapl.ts";
import alphabet from "../data/alphabet.ts";

const seattle = shallowRef([]);
const simpsons = shallowRef(d3.cross(d3.range(1, 29), d3.range(1, 26), (x, y) => ({season: x, number_in_season: y})));

onMounted(() => {
  d3.csv("../data/seattle-weather.csv", d3.autoType).then((data) => (seattle.value = data));
  d3.csv("../data/simpsons.csv", d3.autoType).then((data) => (simpsons.value = data));
});

</script>

# Rule mark

:::tip
The rule mark is one of two marks in Plot for drawing horizontal or vertical lines; it should be used when the secondary position dimension, if any, is quantitative. When it is ordinal, use a [tick](./tick.md).
:::

The **rule mark** comes in two orientations: [ruleY](#ruleY) draws a horizontal↔︎ line with a given *y* value, while [ruleX](#ruleX) draws a vertical↕︎ line with a given *x* value. Rules are often used as annotations, say to mark the *y* = 0 baseline (in red below for emphasis) in a line chart.

:::plot https://observablehq.com/@observablehq/plot-rule-zero
```js
Plot.plot({
  y: {
    grid: true
  },
  marks: [
    Plot.ruleY([0], {stroke: "red"}),
    Plot.line(aapl, {x: "Date", y: "Close"})
  ]
})
```
:::

As annotations, rules often have a hard-coded array of literal values as data. This [shorthand](../features/shorthand.md) utilizes the default [identity](../features/transforms.md#identity) definition of the rule’s position (**y** for ruleY and **x** for ruleX).

:::plot https://observablehq.com/@observablehq/plot-rule-one
```js
Plot.plot({
  y: {
    type: "log",
    grid: true,
    label: "Change in price (%)",
    tickFormat: ((f) => (d) => f((d - 1) * 100))(d3.format("+d"))
  },
  marks: [
    Plot.ruleY([1], {stroke: "red"}),
    Plot.line(aapl, Plot.normalizeY("first", {x: "Date", y: "Close"}))
  ]
})
```
:::

Yet rules can also be used to visualize data. Below, a random normal distribution is plotted with rules, looking a bit like the [emission spectrum of Hydrogen](https://en.wikipedia.org/wiki/Hydrogen_spectral_series).

:::plot https://observablehq.com/@observablehq/plot-rule-random
```js
Plot.plot({
  x: {domain: [-4, 4]},
  marks: [
    Plot.ruleX({length: 500}, {x: d3.randomNormal(), strokeOpacity: 0.2})
  ]
})
```
:::

:::tip
Reducing opacity allows better perception of density when rules overlap.
:::

Rules can also serve as an alternative to an [area mark](./area.md) as in a band chart, provided the data is sufficiently dense: you can limit the extent of a rule along the secondary dimension (**y1** and **y2** channels for ruleX, and **x1** and **x2** channels for ruleY) rather than having it span the frame. And rules support a **stroke** color encoding. The rules below plot the daily minimum and maximum temperature for Seattle.

:::plot defer
```js
Plot.plot({
  y: {grid: true, label: "Temperature (°C)"},
  color: {scheme: "BuRd"},
  marks: [
    Plot.ruleY([0]),
    Plot.ruleX(seattle, {x: "date", y1: "temp_min", y2: "temp_max", stroke: "temp_min"})
  ]
})
```
:::

In the dense [candlestick chart](https://observablehq.com/@observablehq/observable-plot-candlestick) below, three rules are drawn for each trading day: a gray rule spans the chart, showing gaps for weekends and holidays; a <span style="border-bottom: solid 2px currentColor;">{{$dark ? "white" : "black"}}</span> rule spans the day’s low and high; and a <span style="border-bottom: solid 2px var(--vp-c-green);">green</span> or <span style="border-bottom: solid 2px var(--vp-c-red);">red</span> rule spans the day’s open and close.

:::plot defer https://observablehq.com/@observablehq/plot-candlestick-chart
```js
Plot.plot({
  inset: 6,
  label: null,
  y: {grid: true, label: "Stock price ($)"},
  color: {type: "threshold", range: ["red", "green"]},
  marks: [
    Plot.ruleX(aapl, {x: "Date", y1: "Low", y2: "High"}),
    Plot.ruleX(aapl, {x: "Date", y1: "Open", y2: "Close", stroke: (d) => d.Close - d.Open, strokeWidth: 4})
  ]
})
```
:::

Rules can be used to connect graphical elements, such as in the [dot plot](./dot.md) below showing the decline of *The Simpsons*. The rules indicate the extent (minimum and maximum) for each season, computed via the [group transform](../transforms/group.md), while a red line shows the median rating trend.

:::plot defer https://observablehq.com/@observablehq/plot-simpsons-decline
```js
Plot.plot({
  marks: [
    Plot.ruleX(simpsons, Plot.groupX({y1: "min", y2: "max"}, {x: "season", y: "imdb_rating"})),
    Plot.dot(simpsons, {x: "season", y: "imdb_rating", fill: "currentColor", stroke: "var(--vp-c-bg)"}),
    Plot.lineY(simpsons, Plot.groupX({y: "median"}, {x: "season", y: "imdb_rating", stroke: "red"}))
  ]
})
```
:::

Rules can indicate uncertainty or error by setting the [**marker** option](../features/markers.md) to *tick*; this draws a small perpendicular line at the start and end of the rule. For example, to simulate ±10% error:

:::plot
```js
Plot.plot({
  x: {label: null},
  y: {percent: true},
  marks: [
    Plot.barY(alphabet, {x: "letter", y: "frequency", fill: "blue"}),
    Plot.ruleX(alphabet, {x: "letter", y1: (d) => d.frequency * 0.9, y2: (d) => d.frequency * 1.1, marker: "tick"}),
    Plot.ruleY([0])
  ]
})
```
:::

Rules can also be a stylistic choice, as in the lollipop 🍭 chart below, serving the role of a skinny [bar](./bar.md) topped with a [*dot* marker](../features/markers.md).

:::plot https://observablehq.com/@observablehq/plot-lollipop
```js
Plot.plot({
  x: {label: null, tickPadding: 6, tickSize: 0},
  y: {percent: true},
  marks: [
    Plot.ruleX(alphabet, {x: "letter", y: "frequency", strokeWidth: 2, markerEnd: "dot"})
  ]
})
```
:::

Rules are also used by the [grid mark](./grid.md) to draw grid lines.

## Rule options

For the required channels, see [ruleX](#ruleX) and [ruleY](#ruleY). The rule mark supports the [standard mark options](../features/marks.md#mark-options), including insets along its secondary dimension, and [marker options](../features/markers.md) to add a marker (such as a dot or an arrowhead) to the start or end of the rule. The **stroke** defaults to *currentColor*.

## ruleX(*data*, *options*) {#ruleX}

```js
Plot.ruleX([0]) // as annotation
```
```js
Plot.ruleX(alphabet, {x: "letter", y: "frequency"}) // like barY
```

Returns a new vertical↕︎ rule with the given *data* and *options*. The following channels are optional:

* **x** - the horizontal position; bound to the *x* scale
* **y1** - the starting vertical position; bound to the *y* scale
* **y2** - the ending vertical position; bound to the *y* scale

If **x** is not specified, it defaults to [identity](../features/transforms.md#identity) and assumes that *data* = [*x₀*, *x₁*, *x₂*, …]. If **x** is null, the rule will be centered horizontally in the plot frame.

If **y** is specified, it is shorthand for **y2** with **y1** equal to zero; this is the typical configuration for a vertical lollipop chart with rules aligned at *y* = 0. If **y1** is not specified, the rule will start at the top of the plot (or facet). If **y2** is not specified, the rule will end at the bottom of the plot (or facet).

If an **interval** is specified, such as d3.utcDay, **y1** and **y2** can be derived from **y**: *interval*.floor(*y*) is invoked for each *y* to produce *y1*, and *interval*.offset(*y1*) is invoked for each *y1* to produce *y2*. If the interval is specified as a number *n*, *y1* and *y2* are taken as the two consecutive multiples of *n* that bracket *y*. Named UTC intervals such as *day* are also supported; see [scale options](../features/scales.md#scale-options).

## ruleY(*data*, *options*) {#ruleY}

```js
Plot.ruleY([0]) // as annotation
```
```js
Plot.ruleY(alphabet, {y: "letter", x: "frequency"}) // like barX
```

Returns a new horizontal↔︎ rule with the given *data* and *options*. The following channels are optional:

* **y** - the vertical position; bound to the *y* scale
* **x1** - the starting horizontal position; bound to the *x* scale
* **x2** - the ending horizontal position; bound to the *x* scale

If **y** is not specified, it defaults to [identity](../features/transforms.md#identity) and assumes that *data* = [*y₀*, *y₁*, *y₂*, …]. If **y** is null, the rule will be centered vertically in the plot frame.

If **x** is specified, it is shorthand for **x2** with **x1** equal to zero; this is the typical configuration for a horizontal lollipop chart with rules aligned at *x* = 0. If **x1** is not specified, the rule will start at the left edge of the plot (or facet). If **x2** is not specified, the rule will end at the right edge of the plot (or facet).

If an **interval** is specified, such as d3.utcDay, **x1** and **x2** can be derived from **x**: *interval*.floor(*x*) is invoked for each *x* to produce *x1*, and *interval*.offset(*x1*) is invoked for each *x1* to produce *x2*. If the interval is specified as a number *n*, *x1* and *x2* are taken as the two consecutive multiples of *n* that bracket *x*. Named UTC intervals such as *day* are also supported; see [scale options](../features/scales.md#scale-options).

# docs/marks/text.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import alphabet from "../data/alphabet.ts";
import caltrain from "../data/caltrain.ts";
import driving from "../data/driving.ts";

const travelers = shallowRef([]);

onMounted(() => {
  d3.csv("../data/travelers.csv", d3.autoType).then((data) => (travelers.value = data));
});

</script>

# Text mark

The **text mark** draws text at the given position in **x** and **y**. It is often used to label other marks, such as to show the value of a [bar](./bar.md). When space is available, direct labeling can allow faster and more accurate reading of values than an axis alone (or a tooltip).

:::plot https://observablehq.com/@observablehq/plot-labeled-bars
```js
Plot.plot({
  label: null,
  y: {
    grid: true,
    label: "Frequency (%)",
    percent: true
  },
  marks: [
    Plot.barY(alphabet, {x: "letter", y: "frequency"}),
    Plot.text(alphabet, {x: "letter", y: "frequency", text: (d) => (d.frequency * 100).toFixed(1), dy: -6, lineAnchor: "bottom"}),
    Plot.ruleY([0])
  ]
})
```
:::

:::tip
For formatting numbers and dates, consider [*number*.toLocaleString](https://observablehq.com/@mbostock/number-formatting), [*date*.toLocaleString](https://observablehq.com/@mbostock/date-formatting), [d3-format](https://d3js.org/d3-format), or [d3-time-format](https://d3js.org/d3-time-format).
:::

If there are too many data points, labels may overlap, making them hard to read. Use the [filter transform](../transforms/filter.md) to choose which points to label. In the connected scatterplot below, recreating Hannah Fairfield’s [“Driving Shifts Into Reverse”](http://www.nytimes.com/imagepages/2010/05/02/business/02metrics.html) from 2009, every fifth year is labeled.

:::plot https://observablehq.com/@observablehq/plot-connected-scatterplot
```js
Plot.plot({
  inset: 10,
  grid: true,
  x: {label: "Miles driven (per person-year)"},
  y: {label: "Cost of gasoline ($ per gallon)"},
  marks: [
    Plot.line(driving, {x: "miles", y: "gas", curve: "catmull-rom", marker: true}),
    Plot.text(driving, {filter: (d) => d.year % 5 === 0, x: "miles", y: "gas", text: (d) => `${d.year}`, dy: -6, lineAnchor: "bottom"})
  ]
})
```
:::

:::tip
If you’d like automatic labeling, please upvote [#27](https://github.com/observablehq/plot/issues/27).
:::

For line charts with multiple series, you may wish to label only the start or end of each series; this can be done using the [select transform](../transforms/select.md), as shown in the chart below comparing the number of daily travelers at airports in the U.S. between 2019 and 2020. The impact of the COVID-19 pandemic is dramatic.

:::plot defer https://observablehq.com/@observablehq/plot-labeled-line-chart
```js
Plot.plot({
  y: {
    grid: true,
    label: "Travelers per day (millions)",
    transform: (d) => d / 1e6 // convert to millions
  },
  marks: [
    Plot.ruleY([0]),
    Plot.line(travelers, {x: "date", y: "previous", strokeOpacity: 0.5}),
    Plot.line(travelers, {x: "date", y: "current"}),
    Plot.text(travelers, Plot.selectFirst({x: "date", y: "previous", text: ["2019"], fillOpacity: 0.5, lineAnchor: "bottom", dy: -6})),
    Plot.text(travelers, Plot.selectFirst({x: "date", y: "current", text: ["2020"], lineAnchor: "top", dy: 6}))
  ]
})
```
:::

:::warning CAUTION
The select transform uses input order, not natural order by value, to determine the meaning of *first* and *last*. Since this dataset is in reverse chronological order, the first element is the most recent.
:::

A text mark can also be used to visualize data directly, similar to a [dot mark](./dot.md) in a scatterplot. Below a “stem and leaf” plot of Caltrain’s Palo Alto station schedule uses [stacked](../transforms/stack.md) text. The **fill** channel provides a color encoding to distinguish trains that make every stop (<span style="border-bottom: solid currentColor 3px;">N</span>), limited trains that make fewer stops (<span style="border-bottom: solid peru 3px;">L</span>), and “baby bullet” trains that make the fewest stops (<span style="border-bottom: solid brown 3px;">B</span>).

:::plot https://observablehq.com/@observablehq/plot-caltrain-schedule
```js
Plot.plot({
  width: 240,
  axis: null,
  x: {type: "point"},
  y: {type: "point", domain: d3.range(4, 25)},
  color: {domain: "NLB", range: ["currentColor", "peru", "brown"], legend: true},
  marks: [
    Plot.text([[0.5, 4]], {text: ["Northbound"], textAnchor: "start", dx: 16}),
    Plot.text([[-0.5, 4]], {text: ["Southbound"], textAnchor: "end", dx: -16}),
    Plot.text(d3.range(5, 25), {x: 0, y: Plot.identity, text: (y) => `${y % 12 || 12}${y % 24 >= 12 ? "p": "a"}`}),
    Plot.text(caltrain, Plot.stackX2({x: (d) => d.orientation === "N" ? 1 : -1, y: "hours", fill: "type", text: "minutes"})),
    Plot.ruleX([-0.5, 0.5])
  ]
})
```
:::

:::info
Since the **textAnchor** option is a constant rather than a channel, separate text marks are used for the *Northbound* and *Southbound* labels.
:::

The **x** and **y** channels are optional; a one-dimensional text mark can be produced by specifying only one position dimension. If both **x** and **y** are not defined, the text mark assumes that the data is an iterable of points [[*x₁*, *y₁*], [*x₂*, *y₂*], …], allowing for [shorthand](../features/shorthand.md). Furthermore, the default **text** channel is the associated datum’s index. (This is rarely what you want, but at least it gets something on the screen.)

:::plot https://observablehq.com/@observablehq/plot-text-spiral
```js
Plot.plot({
  aspectRatio: 1,
  inset: 10,
  grid: true,
  marks: [
    Plot.text(d3.range(151).map((i) => [
      Math.sqrt(i) * Math.sin(i / 10),
      Math.sqrt(i) * Math.cos(i / 10)
    ]))
  ]
})
```
:::

The text mark will generate multiple lines if the **text** contains newline characters (`\n`). This may be useful for longer annotations.

:::plot https://observablehq.com/@observablehq/plot-this-is-just-to-say
```js
Plot.plot({
  height: 200,
  marks: [
    Plot.frame(),
    Plot.text([`This Is Just To Say
William Carlos Williams, 1934

I have eaten
the plums
that were in
the icebox

and which
you were probably
saving
for breakfast

Forgive me
they were delicious
so sweet
and so cold`], {frameAnchor: "middle"})
  ]
})
```
:::

Alternatively, the **lineWidth** option enables automatic line wrapping. This option must be specified as a number in [ems](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units). When a word contains a [soft-hyphen](https://en.wikipedia.org/wiki/Soft_hyphen) (`\xad`), it may be replaced by a hyphen when wrapping. The **textOverflow** option can also be used to truncate lines that exceed the specified line width, like in the incipit of Herman Melville’s *Moby-Dick* (1851).

:::plot https://observablehq.com/@observablehq/plot-moby-dick
```js
Plot.plot({
  height: 320,
  x: {type: "point", align: 0, axis: "top", tickSize: 0},
  marks: [
    Plot.text(
      [
        "Call me Ishmael. Some years ago — never mind how long precisely — having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before cof\xadfin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off — then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.",
        "There now is your insular city of the Manhattoes, belted round by wharves as Indian isles by coral reefs — commerce surrounds it with her surf. Right and left, the streets take you waterward. Its extreme downtown is the battery, where that noble mole is washed by waves, and cooled by breezes, which a few hours previous were out of sight of land. Look at the crowds of water-gazers there.",
        "Circumambulate the city of a dreamy Sabbath afternoon. Go from Corlears Hook to Coenties Slip, and from thence, by Whitehall, northward. What do you see? — Posted like silent sentinels all around the town, stand thousands upon thousands of mortal men fixed in ocean reveries. Some leaning against the spiles; some seated upon the pier-heads; some looking over the bulwarks of ships from China; some high aloft in the rigging, as if striving to get a still better seaward peep. But these are all landsmen; of week days pent up in lath and plaster — tied to counters, nailed to benches, clinched to desks. How then is this? Are the green fields gone? What do they here?"
      ],
      {
        x: (d, i) => 1 + i, // paragraph number
        lineWidth: 20,
        frameAnchor: "top",
        textAnchor: "start"
      }
    )
  ]
})
```
:::

:::warning CAUTION
For performance and simplicity, Plot does not measure text exactly and instead uses an approximate heuristic. If Plot’s automatic wrapping is not doing what you want, consider hard wrapping with manual newlines (`\n`) instead. There is also a **monospace** option suitable for fixed-width fonts.
:::

## Text options

The following channels are required:

* **text** - the text contents (a string, possibly with multiple lines)

If the **text** contains `\n`, `\r\n`, or `\r`, it will be rendered as multiple lines. If the **text** is specified as numbers or dates, a default formatter will automatically be applied, and the **fontVariant** will default to *tabular-nums* instead of *normal*. If **text** is not specified, it defaults to [identity](../features/transforms.md#identity) for primitive data (such as numbers, dates, and strings), and to the zero-based index [0, 1, 2, …] for objects (so that something identifying is visible by default).

In addition to the [standard mark options](../features/marks.md#mark-options), the following optional channels are supported:

* **x** - the horizontal position; bound to the *x* scale
* **y** - the vertical position; bound to the *y* scale
* **fontSize** - the font size in pixels
* **rotate** - the rotation angle in degrees clockwise

If either of the **x** or **y** channels are not specified, the corresponding position is controlled by the **frameAnchor** option.

The following text-specific constant options are also supported:

* **textAnchor** - the [text anchor](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor) for horizontal position; *start*, *end*, or *middle*
* **lineAnchor** - the line anchor for vertical position; *top*, *bottom*, or *middle*
* **lineHeight** - the line height in ems; defaults to 1
* **lineWidth** - the line width in ems, for wrapping; defaults to Infinity
* **textOverflow** - how to wrap or clip lines longer than the specified line width <VersionBadge version="0.6.4" />
* **monospace** - if true, changes the default **fontFamily** and metrics to monospace
* **fontFamily** - the font name; defaults to [*system-ui*](https://drafts.csswg.org/css-fonts-4/#valdef-font-family-system-ui)
* **fontSize** - the font size in pixels; defaults to 10
* **fontStyle** - the [font style](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style); defaults to *normal*
* **fontVariant** - the [font variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant); defaults to *normal*
* **fontWeight** - the [font weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight); defaults to *normal*
* **frameAnchor** - how to position the text within the frame; defaults to *middle*
* **rotate** - the rotation angle in degrees clockwise; defaults to 0

If a **lineWidth** is specified, input text values will be wrapped as needed to fit while preserving existing newlines. The line wrapping implementation is rudimentary: it replaces the space before the word that overflows with a line feed (`\n`). Lines might also be split on words that contain a soft-hyphen (`\xad`), replacing it with a hyphen (-). For non-ASCII, non-U.S. English text, or for when a different font is used, you may get better results by hard-wrapping the text yourself (by supplying line feeds in the input). If the **monospace** option is truthy, the default **fontFamily** changes to monospace and the **lineWidth** option is interpreted as characters (ch) rather than ems.

The **textOverflow** option can be used to truncate lines of text longer than the given **lineWidth**. If the mark does not have a **title** channel, a title with the non-truncated text is also added. The following **textOverflow** values are supported:

* null (default) - preserve overflowing characters
* *clip* or *clip-end* - remove characters from the end
* *clip-start* - remove characters from the start
* *ellipsis* or *ellipsis-end* - replace characters from the end with an ellipsis (…)
* *ellipsis-start* - replace characters from the start with an ellipsis (…)
* *ellipsis-middle* - replace characters from the middle with an ellipsis (…)

The **fontSize** and **rotate** options can be specified as either channels or constants. When fontSize or rotate is specified as a number, it is interpreted as a constant; otherwise it is interpreted as a channel.

If the **frameAnchor** option is not specified, then **textAnchor** and **lineAnchor** default to middle. Otherwise, **textAnchor** defaults to start if **frameAnchor** is on the left, end if **frameAnchor** is on the right, and otherwise middle. Similarly, **lineAnchor** defaults to top if **frameAnchor** is on the top, bottom if **frameAnchor** is on the bottom, and otherwise middle.

The **paintOrder** option defaults to *stroke* and the **strokeWidth** option defaults to 3. By setting **fill** to the foreground color and **stroke** to the background color (such as *black* and *white*, respectively), you can surround text with a “halo” which may improve legibility against a busy background.

## text(*data*, *options*) {#text}

```js
Plot.text(driving, {x: "miles", y: "gas", text: "year"})
```

Returns a new text mark with the given *data* and *options*. If neither the **x** nor **y** nor **frameAnchor** options are specified, *data* is assumed to be an array of pairs [[*x₀*, *y₀*], [*x₁*, *y₁*], [*x₂*, *y₂*], …] such that **x** = [*x₀*, *x₁*, *x₂*, …] and **y** = [*y₀*, *y₁*, *y₂*, …].

## textX(*data*, *options*) {#textX}

```js
Plot.textX(alphabet.map((d) => d.frequency))
```

Equivalent to [text](#text), except **x** defaults to [identity](../features/transforms.md#identity) and assumes that *data* = [*x₀*, *x₁*, *x₂*, …].

If an **interval** is specified, such as d3.utcDay, **y** is transformed to (*interval*.floor(*y*) + *interval*.offset(*interval*.floor(*y*))) / 2. If the interval is specified as a number *n*, *y* will be the midpoint of two consecutive multiples of *n* that bracket *y*. Named UTC intervals such as *day* are also supported; see [scale options](../features/scales.md#scale-options).

## textY(*data*, *options*) {#textY}

```js
Plot.textY(alphabet.map((d) => d.frequency))
```

Equivalent to [text](#text), except **y** defaults to [identity](../features/transforms.md#identity) and assumes that *data* = [*y₀*, *y₁*, *y₂*, …].

If an **interval** is specified, such as d3.utcDay, **x** is transformed to (*interval*.floor(*x*) + *interval*.offset(*interval*.floor(*x*))) / 2. If the interval is specified as a number *n*, *x* will be the midpoint of two consecutive multiples of *n* that bracket *x*. Named UTC intervals such as *day* are also supported; see [scale options](../features/scales.md#scale-options).

# docs/marks/tick.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import aapl from "../data/aapl.ts";
import alphabet from "../data/alphabet.ts";

const stateage = shallowRef([]);

onMounted(() => {
  d3.csv("../data/us-population-state-age.csv", d3.autoType).then((data) => {
    const ages = data.columns.slice(1); // convert wide data to tidy data
    stateage.value = Object.assign(ages.flatMap((age) => data.map((d) => ({state: d.name, age, population: d[age]}))), {ages});
  });
});

</script>

# Tick mark

:::tip
The tick mark is one of two marks in Plot for drawing horizontal or vertical lines; it should be used when the secondary position dimension, if any, is ordinal. When it is quantitative, use a [rule](./rule.md).
:::

The **tick mark** comes in two orientations: [tickY](#tickY) draws a horizontal↔︎ line with a given *y* value, while [tickX](#tickX) draws a vertical↕︎ line with a given *x* value. Ticks have an optional secondary position dimension (**x** for tickY and **y** for tickX); this second dimension is ordinal, unlike a [rule](./rule.md), and requires a corresponding [band scale](../features/scales.md).

Ticks are often used to show one-dimensional distributions, as in the “barcode” plot below showing the proportion of the population in each age bracket across U.S. states.

:::plot defer https://observablehq.com/@observablehq/plot-barcode
```js
Plot.plot({
  x: {
    grid: true,
    label: "Population (%)",
    percent: true
  },
  y: {
    domain: stateage.ages, // in age order
    reverse: true,
    label: "Age (years)",
    labelAnchor: "top"
  },
  marks: [
    Plot.ruleX([0]),
    Plot.tickX(stateage, Plot.normalizeX("sum", {z: "state", x: "population", y: "age"}))
  ]
})
```
:::

Both ticks and [bars](./bar.md) have an ordinal secondary position dimension; a tick is therefore convenient for stroking the upper bound of a bar for emphasis, as in the bar chart below. A separate [rule](./rule.md) is also used to denote *y* = 0.

:::plot https://observablehq.com/@observablehq/plot-bar-and-tick
```js
Plot.plot({
  x: {label: null},
  y: {percent: true},
  marks: [
    Plot.barY(alphabet, {x: "letter", y: "frequency", fillOpacity: 0.2}),
    Plot.tickY(alphabet, {x: "letter", y: "frequency"}),
    Plot.ruleY([0])
  ]
})
```
:::

When there is no secondary position dimension, a tick behaves identically to a [rule](./rule.md). While a one-dimensional rule and tick are equivalent, a one-dimensional rule is generally preferred, if only because the name “rule” is more descriptive. But as an example below, a random normal distribution is plotted below with ticks.

:::plot https://observablehq.com/@observablehq/plot-random-ticks
```js
Plot.plot({
  x: {domain: [-4, 4]},
  marks: [
    Plot.tickX({length: 500}, {x: d3.randomNormal(), strokeOpacity: 0.2})
  ]
})
```
:::

:::tip
Reducing opacity allows better perception of density when ticks overlap.
:::

Ticks are also used by the [box mark](./box.md) to denote the median value for each group.

## Tick options

For the required channels, see [tickX](#tickX) and [tickY](#tickY). The tick mark supports the [standard mark options](../features/marks.md#mark-options), including insets, and [marker options](../features/markers.md) to add a marker (such as a dot or an arrowhead) to the start or end of the rule. The **stroke** defaults to *currentColor*.

## tickX(*data*, *options*) {#tickX}

```js
Plot.tickX(stateage, {x: "population", y: "age"})
```

Returns a new vertical↕︎ tick with the given *data* and *options*. The following channels are required:

* **x** - the horizontal position; bound to the *x* scale

The following optional channels are supported:

* **y** - the vertical position; bound to the *y* scale, which must be *band*

If the **y** channel is not specified, the tick will span the full vertical extent of the frame.

## tickY(*data*, *options*) {#tickY}

```js
Plot.tickY(stateage, {y: "population", x: "age"})
```

Returns a new horizontal↔︎ tick with the given *data* and *options*. The following channels are required:

* **y** - the vertical position; bound to the *y* scale

The following optional channels are supported:

* **x** - the horizontal position; bound to the *x* scale, which must be *band*

If the **x** channel is not specified, the tick will span the full vertical extent of the frame.

# docs/marks/tip.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, shallowRef, onMounted} from "vue";

const aapl = shallowRef([]);
const us = shallowRef(null);
const states = computed(() => us.value ? topojson.feature(us.value, us.value.objects.states).features : []);

const olympians = shallowRef([
  {weight: 31, height: 1.21, sex: "female"},
  {weight: 170, height: 2.21, sex: "male"}
]);

const scheme = Plot.scale({color: {type: "categorical"}}).range;

onMounted(() => {
  d3.csv("../data/aapl.csv", d3.autoType).then((data) => (aapl.value = data));
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
  d3.json("../data/us-counties-10m.json").then((data) => (us.value = data)); // TODO us-states?
});

</script>

# Tip mark <VersionBadge version="0.6.7" />

The **tip mark** displays text, or several name-value pairs, in a floating box anchored to a given position in **x** and **y**. The tip mark is often paired with the [pointer transform](../interactions/pointer.md) to reveal details on demand when hovering over a chart, as in this line chart of Apple stock price:

:::plot defer https://observablehq.com/@observablehq/plot-line-chart-interactive-tip
```js
Plot.lineY(aapl, {x: "Date", y: "Close", tip: true}).plot({y: {grid: true}})
```
:::

The above code uses the **tip** [mark option](../features/marks.md#mark-options); the code can be written more explicitly with a tip mark and a pointer transform.

```js
Plot.plot({
  y: {grid: true},
  marks: [
    Plot.lineY(aapl, {x: "Date", y: "Close"}),
    Plot.tip(aapl, Plot.pointerX({x: "Date", y: "Close"}))
  ]
})
```

The tip mark can also be used for static annotations, say to draw attention to elements of interest or to add context. The tip text is supplied via the **title** channel. If the tip mark‘s data is an array of strings, the **title** channel defaults to [identity](../features/transforms.md#identity).

:::plot defer https://observablehq.com/@observablehq/plot-static-annotations
```js
Plot.plot({
  y: {grid: true},
  marks: [
    Plot.lineY(aapl, {x: "Date", y: "Close"}),
    Plot.tip(
      [`Apple stock reaches a new high of $133 on Feb. 23, 2015. The release of the first Apple Watch, slated for April, is hotly anticipated.`],
      {x: new Date("2015-02-23"), y: 133, dy: -3, anchor: "bottom"}
    ),
    Plot.tip(
      [`Apple stock drops 8% after the company misses Q2 revenue targets and reports declining iPhone sales. It reaches a two-year low of $90.34 on May 12.`],
      {x: new Date("2016-05-12"), y: 90.34, dy: 3, anchor: "top"}
    )
  ]
})
```
:::

When using the **title** channel, the tip mark wraps text to 20 ems by default, and preserves newlines in the provided text. Use the **lineWidth** option to adjust the width, along with other text options such as **lineHeight**, **textOverflow**, **fontFamily**, and **fontSize**; see the [text mark](../marks/text.md) for more details.

The **title** channel can be used with interactive tips, too. If you have a few moments, hover the chart below to read about various athletes who competed at Rio 2016.

:::plot defer https://observablehq.com/@observablehq/plot-tips-longer-text
```js
Plot.plot({
  grid: true,
  marks: [
    Plot.dot(olympians, {
      x: "weight",
      y: "height",
      fy: "sex",
      sort: (d) => !!d.info,
      stroke: (d) => d.info ? "currentColor" : "#aaa"
    }),
    Plot.tip(olympians, Plot.pointer({
      x: "weight",
      y: "height",
      fy: "sex",
      filter: (d) => d.info,
      title: (d) => [d.name, d.info].join("\n\n")
    }))
  ]
})
```
:::

If no **title** channel is supplied, the tip mark displays all channel values. You can supply additional name-value pairs by registering extra channels using the **channels** mark option. In the scatterplot of Olympic athletes below, you can hover to see the *name* and *sport* of each athlete. This is helpful for noticing patterns — tall basketball players, giant weightlifters and judoka, diminutive gymnasts — and for seeing individuals.

:::plot defer https://observablehq.com/@observablehq/plot-tips-additional-channels
```js
Plot.dot(olympians, {
  x: "weight",
  y: "height",
  stroke: "sex",
  channels: {name: "name", sport: "sport"},
  tip: true
}).plot()
```
:::

:::info
The tallest athlete in this dataset, swimmer [Kevin Cordes](https://en.wikipedia.org/wiki/Kevin_Cordes), is likely an error: his official height is 1.96m (6′ 5″) not 2.21m (7′ 3″). Basketball player [Li Muhao](https://en.wikipedia.org/wiki/Li_Muhao) is likely the true tallest.
:::

If a channel is bound to the *color* or *opacity* scale, the tip mark displays a swatch to reinforce the encoding, such as female <span :style="{color: scheme[0]}">■</span> or male <span :style="{color: scheme[1]}">■</span>.

The tip mark recognizes that **x1** & **x2** and **y1** & **y2** are paired channels. Below, observe that the *weight* shown in the tip is a range such as 64–66 kg; however, the *frequency* is shown as the difference between the **y1** and **y2** channels. The latter is achieved by the stack transform setting a channel hint to indicate that **y1** and **y2** represent a length.

:::plot defer https://observablehq.com/@observablehq/plot-tips-paired-channels
```js
Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", fill: "sex", tip: true})).plot()
```
:::

This even works when stacking negative values, say to mirror the histogram instead of stacking it. (The tip displays negative frequency, but this is consistent with the *y* axis.)

:::plot defer https://observablehq.com/@observablehq/plot-tips-paired-channels
```js
Plot.rectY(olympians, Plot.binX({y: "sum"}, {x: "weight", y: (d) => d.sex === "male" ? 1 : -1, fill: "sex", tip: true})).plot({y: {label: "Frequency"}})
```
:::

The order and formatting of channels in the tip can be customized with the **format** option <VersionBadge version="0.6.11" pr="1823" />, which accepts a key-value object mapping channel names to formats. Each [format](../features/formats.md) can be a string (for number or time formats), a function that receives the value as input and returns a string, true to use the default format, and null or false to suppress. The order of channels in the tip follows their order in the format object followed by any additional channels. When using the **title** channel, the **format** option may be specified as a string or a function; the given format will then apply to the **title** channel. <VersionBadge version="0.6.15" pr="2074" />

A channel’s label can be specified alongside its value as a {value, label} object; if a channel label is not specified, the associated scale’s label is used, if any; if there is no associated scale, or if the scale has no label, the channel name is used instead.

:::plot defer https://observablehq.com/@observablehq/plot-tip-format
```js
Plot.dot(olympians, {
  x: "weight",
  y: "height",
  stroke: "sex",
  channels: {
    name: "name",
    nationality: {
      value: "nationality",
      label: "country"
    },
    sport: "sport"
  },
  tip: {
    format: {
      name: true,
      sport: true,
      nationality: true,
      y: (d) => `${d}m`,
      x: (d) => `${d}kg`,
      stroke: false
    }
  }
}).plot()
```
:::

The tip mark supports nine different orientations specified by the **anchor** option: the four sides (*top*, *right*, *bottom*, *left*), the four corners (*top-left*, *top-right*, *bottom-right*, *bottom-left*), and *middle*. Note that when *middle* is used, the tip will obscure its anchor point.

:::plot defer
```js
Plot.plot({
  height: 160,
  marks: [
    Plot.frame({strokeOpacity: 0.2}),
    [
      "top", "right", "bottom", "left", // sides
      "top-left", "top-right", "bottom-right", "bottom-left", // corners
      "middle"
    ].map((anchor) => [
      Plot.dot({length: 1}, {frameAnchor: anchor, fill: "blue"}),
      Plot.tip([anchor], {frameAnchor: anchor, anchor})
    ])
  ]
})
```
:::

If you don’t specify an explicit **anchor**, the tip mark will choose one automatically, using the **preferredAnchor** <VersionBadge version="0.6.12" pr="1872" /> if it fits. The preferred anchor defaults to *bottom*, except when using the **tip** option and the [pointerY pointing mode](../interactions/pointer.md), in which case it defaults to *left*. In some cases, it may not be possible to fit the tip within the plot’s frame; consider setting the plot’s **style** to `overflow: visible;` to prevent the tip from being truncated.

The tip mark is compatible with transforms that derive **x** and **y** dynamically from data, such as the [centroid transform](../transforms/centroid.md) which computes polygon centroids. Below, a map of the United States shows state names. We reduce the size of the tips by setting the **textPadding** option to 3 pixels instead of the default 8.

:::plot defer https://observablehq.com/@observablehq/plot-maps-tips
```js
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(states),
    Plot.tip(states, Plot.geoCentroid({title: (d) => d.properties.name, anchor: "bottom", textPadding: 3}))
  ]
})
```
:::

:::tip
When multiple tips are visible simultaneously, some may collide; consider using the pointer interaction to show only the one closest to the pointer, or use multiple tip marks and adjust the **anchor** option for each to minimize occlusion.
:::

## Tip options

The following position options are supported:

- **x**, **x1**, or **x2** - the horizontal↔︎ position channel
- **y**, **y1**, or **y2** - the vertical↕︎ position channel
- **frameAnchor** - fallback position if *x* or *y* are otherwise unspecified

To resolve the anchor position, the tip mark applies the following order of precedence:

1. the midpoint of **x1** and **x2**, if both are present;
2. otherwise **x**, if present;
3. otherwise **x1**, if present;
4. and lastly the position given by the **frameAnchor**.

The same precedence applies to the **y**, **y1**, and **y2** channels.

These tip-specific options control the tip appearance:

- **anchor** - *top*, *right*, *bottom*, *left*, *top-left*, *top-right*, *bottom-right*, *bottom-left*, or *middle*
- **pointerSize** - the size of the tip’s pointer in pixels; defaults to 12
- **pathFilter** - the image filter for the tip’s box; defaults to a drop shadow
- **textPadding** - the padding around the text in pixels; defaults to 8

The tip mark does not support the [standard style channels](../features/marks.md#mark-options) such as varying **fill** or **stroke**; channels are used exclusively to control the displayed values rather than the tip’s appearance. You can however use the these options for a constant **fill**, **fillOpacity**, **stroke**, **strokeOpacity**, or **strokeWidth** on the path element surrounding the tip text.

:::plot defer
```js
Plot.tip(["Danger! This tip is red."], {
  anchor: "bottom",
  frameAnchor: "bottom",
  fill: "red"
}).plot()
```
:::

These [standard text options](./text.md#text-options) control the display of text within the tip:

- **monospace** - if true, changes the default **fontFamily** and metrics to monospace
- **fontFamily** - the font name; defaults to [*system-ui*](https://drafts.csswg.org/css-fonts-4/#valdef-font-family-system-ui)
- **fontSize** - the font size in pixels; defaults to 10
- **fontStyle** - the [font style](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style); defaults to *normal*
- **fontVariant** - the [font variant](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant); defaults to *normal*
- **fontWeight** - the [font weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight); defaults to *normal*
- **textAnchor** - the [text anchor](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor) for horizontal position; *start*, *end*, or *middle*
- **lineHeight** - the line height in ems; defaults to 1
- **lineWidth** - the line width in ems, for wrapping; defaults to Infinity
- **textOverflow** - how to wrap or clip lines longer than the specified line width

## tip(*data*, *options*) {#tip}

```js
Plot.tip(aapl, {x: "Date", y: "Close"})
```

Returns a new tip mark with the given *data* and *options*.

# docs/marks/tree.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";

const flare = shallowRef([{name: "empty"}]);

const gods = [
  "Chaos/Gaia/Mountains",
  "Chaos/Gaia/Pontus",
  "Chaos/Gaia/Uranus",
  "Chaos/Eros",
  "Chaos/Erebus",
  "Chaos/Tartarus"
];

onMounted(() => {
  d3.csv("../data/flare.csv", d3.autoType).then((data) => (flare.value = data));
});

function indent() {
  return (root) => {
    root.eachBefore((node, i) => {
      node.y = node.depth;
      node.x = i;
    });
  };
}

</script>

# Tree mark <VersionBadge version="0.4.3" />

The **tree mark** produces tree diagrams using the [tree transform](../transforms/tree.md). It is a [composite mark](../features/marks.md#marks), consisting of a [link](./link.md) to render links from parent to child, an optional [dot](./dot.md) for nodes, and one or two [text](./text.md) for node labels. The link mark uses the [treeLink transform](../transforms/tree.md#treeLink), while the dot and text marks use the [treeNode transform](../transforms/tree.md#treeNode).

For example, here is a little family tree of Greek gods.

:::plot https://observablehq.com/@observablehq/plot-tree-and-link
```js
Plot.plot({
  axis: null,
  height: 100,
  margin: 10,
  marginLeft: 40,
  marginRight: 120,
  marks: [
    Plot.tree(gods, {textStroke: "var(--vp-c-bg)"})
  ]
})
```
:::

Here `gods` is an array of slash-separated paths, similar to paths in a file system. Each path represents the hierarchical position of a node in the tree.

```js-vue
gods = {{JSON.stringify(gods, null, 2)}}
```

As a more complete example, here is a visualization of a software package hierarchy.

:::plot defer https://observablehq.com/@observablehq/plot-tree-flare
```js
Plot.plot({
  axis: null,
  margin: 10,
  marginLeft: 30,
  marginRight: 160,
  width: 688,
  height: 1800,
  marks: [
    Plot.tree(flare, {path: "name", delimiter: ".", textStroke: "var(--vp-c-bg)"})
  ]
})
```
:::

The **treeLayout** option specifies the layout algorithm. The tree mark uses the Reingold–Tilford “tidy” tree algorithm, [d3.tree](https://d3js.org/d3-hierarchy/tree), by default. The [cluster](#cluster) convenience method sets **treeLayout** to [d3.cluster](https://d3js.org/d3-hierarchy/cluster), aligning the leaf nodes.

:::plot https://observablehq.com/@observablehq/plot-cluster-flare
```js
Plot.plot({
  axis: null,
  margin: 10,
  marginLeft: 30,
  marginRight: 160,
  width: 688,
  height: 2400,
  marks: [
    Plot.cluster(flare, {path: "name", treeSort: "node:height", delimiter: ".", textStroke: "var(--vp-c-bg)"})
  ]
})
```
:::

Here is an example of a custom **treeLayout** implementation, assigning *node*.x and *node*.y.

```js
function indent() {
  return (root) => {
    root.eachBefore((node, i) => {
      node.y = node.depth;
      node.x = i;
    });
  };
}
```

This produces an indented tree layout.

:::plot defer https://observablehq.com/@observablehq/plot-custom-tree-layout
```js
Plot.plot({
  axis: null,
  inset: 10,
  insetRight: 120,
  round: true,
  width: 200,
  height: 3600,
  marks: Plot.tree(flare, {
    path: "name",
    delimiter: ".",
    treeLayout: indent,
    strokeWidth: 1,
    curve: "step-before",
    textStroke: "none"
  })
})
```
:::

The tree mark currently does not inform the default layout; you may find it necessary to set the **height** and **margin** [layout options](../features/plots.md#layout-options) for readability.

## Tree options

The following options are supported:

* **fill** - the dot and text fill color; defaults to *node:internal*
* **stroke** - the link stroke color; inherits **fill** by default
* **strokeWidth** - the link stroke width
* **strokeOpacity** - the link stroke opacity
* **strokeLinejoin** - the link stroke linejoin
* **strokeLinecap** - the link stroke linecap
* **strokeMiterlimit** - the link stroke miter limit
* **strokeDasharray** - the link stroke dash array
* **strokeDashoffset** - the link stroke dash offset
* **marker** - the link start and end marker
* **markerStart** - the link start marker
* **markerEnd** - the link end marker
* **dot** - if true, whether to render a dot; defaults to false if no link marker
* **title** - the text and dot title; defaults to *node:path*
* **text** - the text label; defaults to *node:name*
* **textStroke** - the text stroke; defaults to *white*
* **textLayout** - the text anchoring layout
* **dx** - the text horizontal offset; defaults to 6
* **dy** - the text vertical offset; defaults to 0

Any additional *options* are passed through to the constituent link, dot, and text marks and their corresponding treeLink or treeNode transform.

The **textLayout** option <VersionBadge version="0.6.9" /> controls how text labels are anchored to the node. Two layouts are supported:

* *mirrored* - leaf-node labels are left-anchored, and non-leaf nodes right-anchored
* *normal* - all labels are left-anchored

If the **treeLayout** is d3.tree or d3.cluster, the **textLayout** defaults to *mirrored*; otherwise it defaults to *normal*.

## tree(*data*, *options*) {#tree}

```js
Plot.tree(flare, {path: "name", delimiter: "."})
```

Returns a new tree mark with the given *data* and *options*.

## cluster(*data*, *options*) {#cluster}

```js
Plot.cluster(flare, {path: "name", delimiter: "."})
```

Like [tree](#tree), except sets the **treeLayout** option to [d3.cluster](https://d3js.org/d3-hierarchy/cluster), aligning leaf nodes, and defaults the **textLayout** option to *mirrored*.

# docs/marks/vector.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, shallowRef, onMounted} from "vue";
import {poisson} from "../components/poisson.js";
import {octave, perlin2} from "../components/perlin.js";

const noise = octave(perlin2, 2);
const wind = shallowRef([{longitude: -9.875, latitude: 45.125}, {longitude: 9.875, latitude: 59.875}, {u: 0, v: 0}, {u: 0, v: 12.184501776503668}]);
const us = shallowRef(null);
const nation = computed(() => us.value ? topojson.mesh(us.value, us.value.objects.nation) : {type: null});
const statemesh = computed(() => us.value ? topojson.mesh(us.value, us.value.objects.states, (a, b) => a !== b) : {type: null});
const counties = computed(() => us.value ? topojson.feature(us.value, us.value.objects.counties).features : []);

onMounted(() => {
  d3.csv("../data/wind.csv", d3.autoType).then((data) => (wind.value = data));
  Promise.all([
    d3.json("../data/us-counties-10m.json"),
    d3.csv("../data/us-county-population.csv"),
    d3.csv("../data/us-presidential-election-2020.csv")
  ]).then(([_us, _population, _election]) => {
    const population = new Map(_population.map((d) => [d.state + d.county, +d.population]));
    const election = new Map(_election.map((d) => [d.fips, d]));
    for (const g of _us.objects.counties.geometries) {
      g.properties.population = population.get(g.id);
      const e = election.get(g.id);
      if (e) {
        g.properties.margin2020 = +e.margin2020;
        g.properties.votes = +e.votes;
      }
    }
    us.value = _us;
  });
});

</script>

# Vector mark <VersionBadge version="0.4.0" />

:::tip
See also the [arrow mark](./arrow.md), which draws arrows between two points.
:::

The **vector mark** draws little arrows, typically positioned in **x** and **y** quantitative dimensions, with an optional magnitude (**length**) and direction (**rotate**), as in a vector field. For example, the chart below, based on a [LitVis example](https://github.com/gicentre/litvis/blob/main/examples/windVectors.md), shows wind speed and direction for a section of western Europe.

:::plot defer https://observablehq.com/@observablehq/plot-wind-map
```js
Plot.plot({
  inset: 10,
  aspectRatio: 1,
  color: {label: "Speed (m/s)", zero: true, legend: true},
  marks: [
    Plot.vector(wind, {
      x: "longitude",
      y: "latitude",
      rotate: ({u, v}) => Math.atan2(u, v) * 180 / Math.PI,
      length: ({u, v}) => Math.hypot(u, v),
      stroke: ({u, v}) => Math.hypot(u, v)
    })
  ]
})
```
:::

:::info
Regarding this data, [Remote Sensing Systems](https://www.remss.com/measurements/ccmp/) says: *“Standard U and V coordinates apply, meaning the positive U is to the right and positive V is above the axis. U and V are relative to true north. CCMP winds are expressed using the oceanographic convention, meaning a wind blowing toward the Northeast has a positive U component and a positive V component… Longitude is given in degrees East from 0.125 to 359.875 and latitude is given in degrees North with negative values representing southern locations.”*
:::

Vectors can be used with Plot’s [projection system](../features/projections.md). The map below shows the margin by which the winner of the US presidential election of 2020 won the vote in each county. The arrow’s length encodes the difference in votes, and the orientation and color show who won (<svg width=12 height=12 viewBox="-11 -11 12 12" style="display: inline-block"><path d="M0,0l-10,-6m1,3.28l-1,-3.28l3.28,-1" stroke="var(--vp-c-blue)" stroke-width="1.5"></path></svg> for the Democratic candidate, and <svg width=12 height=12 viewBox="0 -11 12 12" style="display: inline-block"><path d="M0,0l10,-6m-1,3.28l1,-3.28l-3.28,-1" stroke="var(--vp-c-red)" stroke-width="1.5"></path></svg> for the Republican candidate).

:::plot defer https://observablehq.com/@observablehq/plot-election-wind-map
```js
Plot.plot({
  projection: "albers-usa",
  length: {type: "sqrt", transform: Math.abs},
  marks: [
    Plot.geo(statemesh, {strokeWidth: 0.5}),
    Plot.geo(nation),
    Plot.vector(
      counties,
      Plot.centroid({
        anchor: "start",
        length: (d) => d.properties.margin2020 * d.properties.votes,
        stroke: (d) => d.properties.margin2020 > 0 ? "red" : "blue",
        rotate: (d) => d.properties.margin2020 > 0 ? 60 : -60
      })
    )
  ]
})
```
:::

The **shape** option <VersionBadge version="0.6.2" /> controls the vector’s appearance, while the **anchor** option positions the vector relative to its anchor point specified in **x** and **y**. The [spike constructor](#spike) sets the **shape** to *spike* and the **anchor** to *start*. For example, this can be used to produce a [spike map](https://observablehq.com/@observablehq/plot-spike) of U.S. county population.

:::plot defer https://observablehq.com/@observablehq/plot-spike-map-example
```js
Plot.plot({
  width: 688,
  projection: "albers-usa",
  length: {range: [0, 200]},
  marks: [
    Plot.geo(statemesh, {strokeOpacity: 0.5}),
    Plot.geo(nation),
    Plot.spike(counties, Plot.geoCentroid({length: (d) => d.properties.population, stroke: "green"}))
  ]
})
```
:::

You can even implement a custom **shape** by supplying an object with a **draw** method. This method takes a *context* for drawing paths and the *length* of the vector. See the [moon phase calendar](https://observablehq.com/@observablehq/plot-phases-of-the-moon) for an example.

Lastly, here is an example showing a Perlin noise field, just because it’s pretty:

:::plot defer https://observablehq.com/@observablehq/plot-perlin-noise
```js
Plot.plot({
  inset: 6,
  width: 1024,
  aspectRatio: 1,
  axis: null,
  marks: [
    Plot.vector(poisson([0, 0, 2, 2], 4000), {
      length: ([x, y]) => (noise(x + 2, y) + 0.5) * 24,
      rotate: ([x, y]) => noise(x, y) * 360
    })
  ]
})
```
:::

This example uses a noise(*x*, *y*) function defined as:

```js
noise = octave(perlin2, 2)
```

See Mike Bostock’s [Perlin Noise](https://observablehq.com/@mbostock/perlin-noise) and [Poisson Disk Sampling](https://observablehq.com/@mbostock/poisson-disk-sampling) notebooks for source code.

## Vector options

In addition to the [standard mark options](../features/marks.md#mark-options), the following optional channels are supported:

* **x** - the horizontal position; bound to the *x* scale
* **y** - the vertical position; bound to the *y* scale
* **length** - the length in pixels; bound to the *length* scale; defaults to 12
* **rotate** - the rotation angle in degrees clockwise; defaults to 0

If either of the **x** or **y** channels are not specified, the corresponding position is controlled by the **frameAnchor** option.

The following constant options are also supported:

* **shape** - the shape of the vector; defaults to *arrow*
* **r** - a radius in pixels; defaults to 3.5
* **anchor** - one of *start*, *middle*, or *end*; defaults to *middle*
* **frameAnchor** - how to position the vector within the frame; defaults to *middle*

The **shape** option controls the visual appearance (path geometry) of the vector and supports the following values:

* *arrow* (default) - an arrow with head size proportional to its length
* *spike* - an isosceles triangle with open base
* any object with a **draw** method; it receives a *context*, *length*, and *radius*

If the **anchor** is *start*, the arrow will start at the given *xy* position and point in the direction given by the rotation angle. If the **anchor** is *end*, the arrow will maintain the same orientation, but be positioned such that it ends in the given *xy* position. If the **anchor** is *middle*, the arrow will be likewise be positioned such that its midpoint intersects the given *xy* position.

If the **x** channel is not specified, vectors will be horizontally centered in the plot (or facet). Likewise if the **y** channel is not specified, vectors will be vertically centered in the plot (or facet). Typically either *x*, *y*, or both are specified.

The **rotate** and **length** options can be specified as either channels or constants. When specified as a number, it is interpreted as a constant; otherwise it is interpreted as a channel. The length defaults to 12 pixels, and the rotate defaults to 0 degrees (pointing up↑). Vectors with a negative length will be drawn inverted. Positive angles proceed clockwise from noon.

The **stroke** defaults to *currentColor*. The **strokeWidth** defaults to 1.5, and the **strokeLinecap** defaults to *round*.

Vectors are drawn in input order, with the last data drawn on top. If sorting is needed, say to mitigate overplotting by drawing the smallest vectors on top, consider a [sort transform](../transforms/sort.md).

## vector(*data*, *options*) {#vector}

```js
Plot.vector(wind, {x: "longitude", y: "latitude", length: "speed", rotate: "direction"})
```

Returns a new vector with the given *data* and *options*. If neither the **x** nor **y** options are specified, *data* is assumed to be an array of pairs [[*x₀*, *y₀*], [*x₁*, *y₁*], [*x₂*, *y₂*], …] such that **x** = [*x₀*, *x₁*, *x₂*, …] and **y** = [*y₀*, *y₁*, *y₂*, …].

## vectorX(*data*, *options*) {#vectorX}

```js
Plot.vectorX(cars.map((d) => d["economy (mpg)"]))
```

Equivalent to [vector](#vector) except that if the **x** option is not specified, it defaults to the identity function and assumes that *data* = [*x₀*, *x₁*, *x₂*, …].

## vectorY(*data*, *options*) {#vectorY}

```js
Plot.vectorY(cars.map((d) => d["economy (mpg)"]))
```

Equivalent to [vector](#vector) except that if the **y** option is not specified, it defaults to the identity function and assumes that *data* = [*y₀*, *y₁*, *y₂*, …].

## spike(*data*, *options*) <VersionBadge version="0.6.2" /> {#spike}

```js
Plot.spike(counties, Plot.geoCentroid({length: (d) => d.properties.population}))
```

Equivalent to [vector](#vector) except that the **shape** defaults to *spike*, the **stroke** defaults to *currentColor*, the **strokeWidth** defaults to 1, the **fill** defaults to **stroke**, the **fillOpacity** defaults to 0.3, and the **anchor** defaults to *start*.

# docs/marks/waffle.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref, shallowRef, onMounted} from "vue";

const apples = ref(512);
const unit = ref(10);

const olympians = shallowRef([
  {weight: 31, height: 1.21, sex: "female"},
  {weight: 170, height: 2.21, sex: "male"}
]);

const survey = [
  {question: "don’t go out after dark", yes: 96},
  {question: "do no activities other than school", yes: 89},
  {question: "engage in political discussion and social movements, including online", yes: 10},
  {question: "would like to do activities but are prevented by safety concerns", yes: 73}
];

onMounted(() => {
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
});

</script>

# Waffle mark <VersionBadge version="0.6.16" pr="2040" />

The **waffle mark** is similar to the [bar mark](./bar.md) in that it displays a quantity (or quantitative extent) for a given category; but unlike a bar, a waffle is subdivided into square cells that allow easier counting. Waffles are useful for reading exact quantities. How quickly can you count the pears 🍐 below? How many more apples 🍎 are there than bananas 🍌?

:::plot https://observablehq.com/@observablehq/plot-simple-waffle
```js
Plot.waffleY([212, 207, 315, 11], {x: ["apples", "bananas", "oranges", "pears"]}).plot({height: 420})
```
:::

The waffle mark is often used with the [group transform](../transforms/group.md) to compute counts. The chart below compares the number of female and male athletes in the 2012 Olympics.

:::plot https://observablehq.com/@observablehq/plot-waffle-group
```js
Plot.waffleY(olympians, Plot.groupX({y: "count"}, {x: "sex"})).plot({x: {label: null}})
```
:::

:::info
Waffles are rendered using SVG patterns, making them more performant than alternatives such as the [dot mark](./dot.md) for rendering many points.
:::

The **unit** option determines the quantity each waffle cell represents; it defaults to one. The unit may be set to a value greater than one for large quantities, or less than one (but greater than zero) for small fractional quantities. Try changing the unit below to see its effect.

<p>
  <span class="label-input">
    Unit:
    <label style="margin-left: 0.5em;"><input type="radio" name="unit" value="1" v-model="unit" /> 1</label>
    <label style="margin-left: 0.5em;"><input type="radio" name="unit" value="2" v-model="unit" /> 2</label>
    <label style="margin-left: 0.5em;"><input type="radio" name="unit" value="5" v-model="unit" /> 5</label>
    <label style="margin-left: 0.5em;"><input type="radio" name="unit" value="10" v-model="unit" /> 10</label>
    <label style="margin-left: 0.5em;"><input type="radio" name="unit" value="25" v-model="unit" /> 25</label>
    <label style="margin-left: 0.5em;"><input type="radio" name="unit" value="50" v-model="unit" /> 50</label>
    <label style="margin-left: 0.5em;"><input type="radio" name="unit" value="100" v-model="unit" /> 100</label>
  </span>
</p>

:::plot https://observablehq.com/@observablehq/plot-waffle-unit
```js
Plot.waffleY(olympians, Plot.groupZ({y: "count"}, {fx: "date_of_birth", unit})).plot({fx: {interval: "5 years", label: null}})
```
:::

:::tip
Use [faceting](../features/facets.md) as an alternative to supplying an ordinal channel (_i.e._, *fx* instead of *x* for a vertical waffleY). The facet scale’s **interval** option then allows grouping by a quantitative or temporal variable, such as the athlete’s year of birth in the chart below.
:::

While waffles typically represent integer quantities, say to count people or days, they can also encode fractional values with a partial first or last cell. Set the **round** option to true to disable partial cells, or to Math.ceil or Math.floor to round up or down.

Like bars, waffles can be [stacked](../transforms/stack.md), and implicitly apply the stack transform when only a single quantitative channel is supplied.

:::plot https://observablehq.com/@observablehq/plot-stacked-waffles
```js
Plot.waffleY(olympians, Plot.groupZ({y: "count"}, {fill: "sex", sort: "sex", fx: "weight", unit: 10})).plot({fx: {interval: 10}, color: {legend: true}})
```
:::

Waffles can also be used to highlight a proportion of the whole. The chart below recreates a graphic of survey responses from [“Teens in Syria”](https://www.economist.com/graphic-detail/2015/08/19/teens-in-syria) by _The Economist_ (August 19, 2015); positive responses are in orange, while negative responses are in gray. The **rx** option is used to produce circles instead of squares.

:::plot https://observablehq.com/@observablehq/plot-survey-waffle
```js
Plot.plot({
  axis: null,
  label: null,
  height: 260,
  marginTop: 20,
  marginBottom: 70,
  title: "Subdued",
  subtitle: "Of 120 surveyed Syrian teenagers:",
  marks: [
    Plot.axisFx({lineWidth: 10, anchor: "bottom", dy: 20}),
    Plot.waffleY({length: 1}, {y: 120, fillOpacity: 0.4, rx: "100%"}),
    Plot.waffleY(survey, {fx: "question", y: "yes", rx: "100%", fill: "orange"}),
    Plot.text(survey, {fx: "question", text: (d) => (d.yes / 120).toLocaleString("en-US", {style: "percent"}), frameAnchor: "bottom", lineAnchor: "top", dy: 6, fill: "orange", fontSize: 24, fontWeight: "bold"})
  ]
})
```
:::

The waffle mark comes in two orientations: waffleY extends vertically↑, while waffleX extends horizontally→. The waffle mark automatically determines the appropriate number of cells per row or per column (depending on orientation) such that the cells are square, don’t overlap, and are consistent with position scales.

<p>
  <label class="label-input">
    <span>Apples:</span>
    <input type="range" v-model.number="apples" min="10" max="1028" step="1" />
    <span style="font-variant-numeric: tabular-nums;">{{apples}}</span>
  </label>
</p>

:::plot
```js
Plot.waffleX([apples], {y: ["apples"]}).plot({height: 240})
```
:::

:::info
The number of rows in the waffle above is guaranteed to be an integer, but it might not be a multiple or factor of the *x*-axis tick interval. For example, the waffle might have 15 rows while the *x*-axis shows ticks every 100 units.
:::
:::tip
To set the number of rows (or columns) directly, use the **multiple** option, though note that manually setting the multiple may result in non-square cells if there isn’t enough room. Alternatively, you can bias the automatic multiple while preserving square cells by setting the **padding** option on the corresponding band scale: padding defaults to 0.1; a higher value may produce more rows, while a lower (or zero) value may produce fewer rows.
:::

## Waffle options

For required channels, see the [bar mark](./bar.md). The waffle mark supports the [standard mark options](../features/marks.md), including [insets](../features/marks.md#insets) and [rounded corners](../features/marks.md#rounded-corners). The **stroke** defaults to *none*. The **fill** defaults to *currentColor* if the stroke is *none*, and to *none* otherwise.

The waffle mark supports a few additional options to control the rendering of cells:

* **unit** - the quantity each cell represents; defaults to 1
* **multiple** - the number of cells per row (or column); defaults to undefined
* **gap** - the separation between adjacent cells, in pixels; defaults to 1
* **round** - whether to round values to avoid partial cells; defaults to false

If **multiple** is undefined (the default), the waffle mark will use as many cells per row (or column) that fits within the available bandwidth while ensuring that the cells are square, or one cell per row if square cells are not possible. You can change the rounding behavior by specifying **round** as a function, such as Math.floor or Math.ceil; true is equivalent to Math.round.

## waffleX(*data*, *options*) {#waffleX}

```js
Plot.waffleX(olympians, Plot.groupY({x: "count"}, {y: "sport"}))
```

Returns a new horizontal→ waffle with the given *data* and *options*. The following channels are required:

* **x1** - the starting horizontal position; bound to the *x* scale
* **x2** - the ending horizontal position; bound to the *x* scale

The following optional channels are supported:

* **y** - the vertical position; bound to the *y* scale, which must be *band*

If neither the **x1** nor **x2** option is specified, the **x** option may be specified as shorthand to apply an implicit [stackX transform](../transforms/stack.md); this is the typical configuration for a horizontal waffle chart with columns aligned at *x* = 0. If the **x** option is not specified, it defaults to [identity](../features/transforms.md#identity). If *options* is undefined, then it defaults to **x2** as identity and **y** as the zero-based index [0, 1, 2, …]; this allows an array of numbers to be passed to waffleX to make a quick sequential waffle chart. If the **y** channel is not specified, the column will span the full vertical extent of the plot (or facet).

If an **interval** is specified, such as d3.utcDay, **x1** and **x2** can be derived from **x**: *interval*.floor(*x*) is invoked for each *x* to produce *x1*, and *interval*.offset(*x1*) is invoked for each *x1* to produce *x2*. If the interval is specified as a number *n*, *x1* and *x2* are taken as the two consecutive multiples of *n* that bracket *x*. Named UTC intervals such as *day* are also supported; see [scale options](../features/scales.md#scale-options).

## waffleY(*data*, *options*) {#waffleY}

```js
Plot.waffleY(olympians, Plot.groupX({y: "count"}, {x: "sport"}))
```

Returns a new vertical↑ waffle with the given *data* and *options*. The following channels are required:

* **y1** - the starting vertical position; bound to the *y* scale
* **y2** - the ending vertical position; bound to the *y* scale

The following optional channels are supported:

* **x** - the horizontal position; bound to the *x* scale, which must be *band*

If neither the **y1** nor **y2** option is specified, the **y** option may be specified as shorthand to apply an implicit [stackY transform](../transforms/stack.md); this is the typical configuration for a vertical waffle chart with columns aligned at *y* = 0. If the **y** option is not specified, it defaults to [identity](../features/transforms.md#identity). If *options* is undefined, then it defaults to **y2** as identity and **x** as the zero-based index [0, 1, 2, …]; this allows an array of numbers to be passed to waffleY to make a quick sequential waffle chart. If the **x** channel is not specified, the column will span the full horizontal extent of the plot (or facet).

If an **interval** is specified, such as d3.utcDay, **y1** and **y2** can be derived from **y**: *interval*.floor(*y*) is invoked for each *y* to produce *y1*, and *interval*.offset(*y1*) is invoked for each *y1* to produce *y2*. If the interval is specified as a number *n*, *y1* and *y2* are taken as the two consecutive multiples of *n* that bracket *y*. Named UTC intervals such as *day* are also supported; see [scale options](../features/scales.md#scale-options).

# docs/transforms/bin.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {computed, ref, shallowRef, onMounted} from "vue";

const cumulatives = ref("+1");
const cumulative = computed(() => +cumulatives.value);
const olympians = shallowRef([{weight: 31, height: 1.21, sex: "female"}, {weight: 170, height: 2.21, sex: "male"}]);

onMounted(() => {
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
});

</script>

# Bin transform

:::tip
The bin transform is for aggregating quantitative or temporal data. For ordinal or nominal data, use the [group transform](./group.md). See also the [hexbin transform](./hexbin.md).
:::

The **bin transform** groups quantitative or temporal data — continuous measurements such as heights, weights, or temperatures — into discrete bins. You can then compute summary statistics for each bin, such as a count, sum, or proportion. The bin transform is most often used to make histograms or heatmaps with the [rect mark](../marks/rect.md).

For example, here is a histogram showing the distribution of weights of Olympic athletes.

:::plot defer https://observablehq.com/@observablehq/plot-a-simple-histogram
```js
Plot.plot({
  y: {grid: true},
  marks: [
    Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight"})),
    Plot.ruleY([0])
  ]
})
```
:::

The binX transform takes **x** as input and outputs **x1** and **x2** representing the extent of each bin in *x*. The *outputs* argument (here `{y: "count"}`) declares additional output channels (**y**) and the associated reducer (*count*). Hence the height of each rect above represents the number of athletes in the corresponding bin, *i.e.*, the number of athletes with a similar weight.

While the binX transform is often used to generate **y**, it can output any channel. Below, the **fill** channel represents count per bin, resulting in a one-dimensional heatmap.

:::plot defer https://observablehq.com/@observablehq/plot-color-bins
```js-vue
Plot
  .rect(olympians, Plot.binX({fill: "count"}, {x: "weight"}))
  .plot({color: {scheme: "{{$dark ? "turbo" : "YlGnBu"}}"}})
```
:::

You can partition bins using **z**. If **z** is undefined, it defaults to **fill** or **stroke**, if any. In conjunction with the rectY mark’s implicit [stackY transform](./stack.md), this will produce a stacked histogram.

:::plot defer https://observablehq.com/@observablehq/plot-vertical-histogram
```js
Plot.plot({
  y: {grid: true},
  color: {legend: true},
  marks: [
    Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", fill: "sex"})),
    Plot.ruleY([0])
  ]
})
```
:::

:::tip
You can invoke the stack transform explicitly as `Plot.stackY(Plot.binX({y: "count"}, {x: "weight", fill: "sex"}))` to produce an identical chart.
:::

You can opt-out of the implicit stackY transform by having binX generate **y1** or **y2** instead of **y** (and similarly **x1** or **x2** for stackX and binY). When overlapping marks, use either opacity or blending to make the overlap visible.

:::plot defer https://observablehq.com/@observablehq/plot-overlapping-histogram
```js-vue
Plot.plot({
  y: {grid: true},
  marks: [
    Plot.rectY(olympians, Plot.binX({y2: "count"}, {x: "weight", fill: "sex", mixBlendMode: "{{$dark ? "screen" : "multiply"}}"})),
    Plot.ruleY([0])
  ]
})
```
:::

:::warning CAUTION
While the **mixBlendMode** option is useful for mitigating occlusion, it can be slow to render if there are many elements. More than two overlapping histograms may also be hard to read.
:::

The bin transform comes in three orientations:

- [binX](#binX) bins on **x**, and often outputs **y** as in a histogram with vertical↑ rects;
- [binY](#binY) bins on **y**, and often outputs **x** as in a histogram with horizontal→ rects; and
- [bin](#bin) bins on both **x** and **y**, and often outputs to **fill** or **r** as in a heatmap.

As you might guess, the binY transform with the rectX mark produces a histogram with horizontal→ rects.

:::plot defer https://observablehq.com/@observablehq/plot-horizontal-histogram
```js
Plot.plot({
  x: {grid: true},
  marks: [
    Plot.rectX(olympians, Plot.binY({x: "count"}, {y: "weight"})),
    Plot.ruleX([0])
  ]
})
```
:::

You can produce a two-dimensional heatmap with bin transform and a rect mark by generating a **fill** output channel. Below, color encodes the number of athletes in each bin (of similar height and weight).

:::plot defer https://observablehq.com/@observablehq/plot-olympians-heatmap
```js-vue
Plot
  .rect(olympians, Plot.bin({fill: "count"}, {x: "weight", y: "height"}))
  .plot({color: {scheme: "{{$dark ? "turbo" : "YlGnBu"}}"}})
```
:::

The bin transform also outputs **x** and **y** channels representing bin centers. These can be used to place a [dot mark](../marks/dot.md) whose size again represents the number of athletes in each bin.

:::plot defer https://observablehq.com/@observablehq/plot-dot-heatmap
```js
Plot.plot({
  r: {range: [0, 6]}, // generate slightly smaller dots
  marks: [
    Plot.dot(olympians, Plot.bin({r: "count"}, {x: "weight", y: "height"}))
  ]
})
```
:::

We can add the **stroke** channel to show overlapping distributions by sex.

:::plot https://observablehq.com/@observablehq/plot-dot-heatmap
```js
Plot.plot({
  r: {range: [0, 6]},
  marks: [
    Plot.dot(olympians, Plot.bin({r: "count"}, {x: "weight", y: "height", stroke: "sex"}))
  ]
})
```
:::

Similarly the binX and binY transforms generate respective **x** and **y** channels for one-dimensional binning.

:::plot https://observablehq.com/@observablehq/plot-dot-bins
```js
Plot.plot({
  r: {range: [0, 14]},
  marks: [
    Plot.dot(olympians, Plot.binX({r: "count"}, {x: "weight"}))
  ]
})
```
:::

In addition to rect and dot, you can even use continuous marks such as [area](../marks/area.md) and [line](../marks/line.md). In this case you should set the bin transform’s **filter** option to null so that empty bins are included in the output; otherwise, the area or line would mislead by interpolating over missing bins.

:::plot defer https://observablehq.com/@observablehq/plot-density-estimation
```js
Plot.plot({
  y: {grid: true},
  marks: [
    Plot.areaY(olympians, Plot.binX({y: "count", filter: null}, {x: "weight", fillOpacity: 0.2})),
    Plot.lineY(olympians, Plot.binX({y: "count", filter: null}, {x: "weight"})),
    Plot.ruleY([0])
  ]
})
```
:::

The **cumulative** option produces a cumulative distribution. Below, each bin represents the number of athletes with the given weight *or less*. To have each bin represent the number of athletes with the given weight *or more*, set **cumulative** to −1.

<p>
  <span class="label-input">
    Cumulative:
    <label style="margin-left: 0.5em; font-variant: tabular-nums;"><input type="radio" name="cumulative" value="-1" v-model="cumulatives" /> -1 (reverse)</label>
    <label style="margin-left: 0.5em; font-variant: tabular-nums;"><input type="radio" name="cumulative" value="+1" v-model="cumulatives" /> +1 (true)</label>
  </span>
</p>

:::plot
```js
Plot.plot({
  marginLeft: 60,
  y: {grid: true},
  marks: [
    Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", cumulative})),
    Plot.ruleY([0])
  ]
})
```
:::

The bin transform works with Plot’s [faceting system](../features/facets.md), partitioning bins by facet. Below, we compare the weight distributions of athletes within each sport using the *proportion-facet* reducer. Sports are sorted by median weight: gymnasts tend to be the lightest, and basketball players the heaviest.

:::plot defer
```js-vue
Plot.plot({
  marginLeft: 100,
  padding: 0,
  x: {grid: true},
  fy: {domain: d3.groupSort(olympians.filter((d) => d.weight), (g) => d3.median(g, (d) => d.weight), (d) => d.sport)},
  color: {scheme: "{{$dark ? "turbo" : "YlGnBu"}}"},
  marks: [Plot.rect(olympians, Plot.binX({fill: "proportion-facet"}, {x: "weight", fy: "sport", inset: 0.5}))]
})
```
:::

The bin transform sets default insets for a one-pixel gap between rects. You can set explicit insets if you prefer, say if you want the rects to touch. In this case we recommend rounding on the _x_ scale to avoid antialiasing artifacts between rects.

:::plot defer
```js
Plot.plot({
  x: {round: true},
  y: {grid: true},
  marks: [
    Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", inset: 0})),
    Plot.ruleY([0])
  ]
})
```
:::

## Bin options

Given input *data* = [*d₀*, *d₁*, *d₂*, …], by default the resulting binned data is an array of arrays where each inner array is a subset of the input data [[*d₁*, *d₂*, …], [*d₀*, …], …]. Each inner array is in input order. The outer array is in ascending order according to the associated dimension (*x* then *y*).

By specifying a reducer for the **data** output, as described below, you can change how the binned data is computed. The outputs may also include **filter** and **sort** options specified as reducers, and a **reverse** option to reverse the order of generated bins. By default, empty bins are omitted, and non-empty bins are generated in ascending threshold order.

In addition to data, the following channels are automatically output:

* **x1** - the starting horizontal position of the bin
* **x2** - the ending horizontal position of the bin
* **x** - the horizontal center of the bin
* **y1** - the starting vertical position of the bin
* **y2** - the ending vertical position of the bin
* **y** - the vertical center of the bin
* **z** - the first value of the *z* channel, if any
* **fill** - the first value of the *fill* channel, if any
* **stroke** - the first value of the *stroke* channel, if any

The **x1**, **x2**, and **x** output channels are only computed by the binX and bin transform; similarly the **y1**, **y2**, and **y** output channels are only computed by the binY and bin transform. The **x** and **y** output channels are lazy: they are only computed if needed by a downstream mark or transform. Conversely, the **x1** and **x2** outputs default to undefined if **x** is explicitly defined; and the **y1** and **y2** outputs default to undefined if **y** is explicitly defined.

You can declare additional output channels by specifying the channel name and desired reducer in the *outputs* object which is the first argument to the transform. For example, to use binX to generate a **y** channel of bin counts as in a frequency histogram:

```js
Plot.binX({y: "count"}, {x: "culmen_length_mm"})
```

The following named reducers are supported:

* *first* - the first value, in input order
* *last* - the last value, in input order
* *count* - the number of elements (frequency)
* *distinct* - the number of distinct values
* *sum* - the sum of values
* *proportion* - the sum proportional to the overall total (weighted frequency)
* *proportion-facet* - the sum proportional to the facet total
* *min* - the minimum value
* *min-index* - the zero-based index of the minimum value
* *max* - the maximum value
* *max-index* - the zero-based index of the maximum value
* *mean* - the mean value (average)
* *median* - the median value
* *mode* - the value with the most occurrences
* *pXX* - the percentile value, where XX is a number in [00,99]
* *deviation* - the standard deviation
* *variance* - the variance per [Welford’s algorithm](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford's_online_algorithm)
* *identity* - the array of values
* *x* - the middle of the bin’s *x* extent (when binning on *x*)
* *x1* - the lower bound of the bin’s *x* extent (when binning on *x*)
* *x2* - the upper bound of the bin’s *x* extent (when binning on *x*)
* *y* - the middle of the bin’s *y* extent (when binning on *y*)
* *y1* - the lower bound of the bin’s *y* extent (when binning on *y*)
* *y2* - the upper bound of the bin’s *y* extent (when binning on *y*)
* *z* <VersionBadge version="0.6.14" pr="1959" /> - the bin’s *z* value (*z*, *fill*, or *stroke*)

In addition, a reducer may be specified as:

* a function to be passed the array of values for each bin and the extent of the bin
* an object with a **reduceIndex** method, and optionally a **scope**

In the last case, the **reduceIndex** method is repeatedly passed three arguments: the index for each bin (an array of integers), the input channel’s array of values, and the extent of the bin (an object {data, x1, x2, y1, y2}); it must then return the corresponding aggregate value for the bin.

If the reducer object’s **scope** is *data*, then the **reduceIndex** method is first invoked for the full data; the return value of the **reduceIndex** method is then made available as a third argument (making the extent the fourth argument). Similarly if the **scope** is *facet*, then the **reduceIndex** method is invoked for each facet, and the resulting reduce value is made available while reducing the facet’s bins. (This optional **scope** is used by the *proportion* and *proportion-facet* reducers.)

Most reducers require binding the output channel to an input channel; for example, if you want the **y** output channel to be a *sum* (not merely a count), there should be a corresponding **y** input channel specifying which values to sum. If there is not, *sum* will be equivalent to *count*.

```js
Plot.binX({y: "sum"}, {x: "culmen_length_mm", y: "body_mass_g"})
```

You can control whether a channel is computed before or after binning. If a channel is declared only in *options* (and it is not a special group-eligible channel such as **x**, **y**, **z**, **fill**, or **stroke**), it will be computed after binning and be passed the binned data: each datum is the array of input data corresponding to the current bin.

```js
Plot.binX({y: "count"}, {x: "economy (mpg)", title: (data) => data.map((d) => d.name).join("\n")})
```

This is equivalent to declaring the channel only in *outputs*.

```js
Plot.binX({y: "count", title: (data) => data.map((d) => d.name).join("\n")}, {x: "economy (mpg)"})
```

However, if a channel is declared in both *outputs* and *options*, then the channel in *options* is computed before binning and can then be aggregated using any built-in reducer (or a custom reducer function) during the bin transform.

```js
Plot.binX({y: "count", title: (names) => names.join("\n")}, {x: "economy (mpg)", title: "name"})
```

To control how the quantitative dimensions *x* and *y* are divided into bins, the following options are supported:

* **thresholds** - the threshold values; see below
* **interval** - an alternative method of specifying thresholds
* **domain** - values outside the domain will be omitted
* **cumulative** - if positive, each bin will contain all lesser bins

These options may be specified either on the *options* or *outputs* object. If the **domain** option is not specified, it defaults to the minimum and maximum of the corresponding dimension (*x* or *y*), possibly niced to match the threshold interval to ensure that the first and last bin have the same width as other bins. If **cumulative** is negative (-1 by convention), each bin will contain all *greater* bins rather than all *lesser* bins, representing the [complementary cumulative distribution](https://en.wikipedia.org/wiki/Cumulative_distribution_function#Complementary_cumulative_distribution_function_.28tail_distribution.29).

To pass separate binning options for **x** and **y**, use an object with the options above and a **value** option to specify the input channel values.

```js
Plot.binX({y: "count"}, {x: {thresholds: 20, value: "culmen_length_mm"}})
```

The **thresholds** option may be specified as a named method or a variety of other ways:

* *auto* (default) - Scott’s rule, capped at 200
* *freedman-diaconis* - the [Freedman–Diaconis rule](https://en.wikipedia.org/wiki/Freedman–Diaconis_rule)
* *scott* - [Scott’s normal reference rule](https://en.wikipedia.org/wiki/Histogram#Scott.27s_normal_reference_rule)
* *sturges* - [Sturges’ formula](https://en.wikipedia.org/wiki/Histogram#Sturges.27_formula)
* a count (hint) representing the desired number of bins
* an array of *n* threshold values for *n* - 1 bins
* an interval or time interval (for temporal binning; see below)
* a function that returns an array, count, or time interval

If the **thresholds** option is specified as a function, it is passed three arguments: the array of input values, the domain minimum, and the domain maximum. If a number, [d3.ticks](https://d3js.org/d3-array/ticks) or [d3.utcTicks](https://d3js.org/d3-time#utcTicks) is used to choose suitable nice thresholds. If an interval, it must expose an *interval*.floor(*value*), *interval*.ceil(*value*), *interval*.offset(*value*), and *interval*.range(*start*, *stop*) methods. If the interval is a time interval such as "day" (equivalently, d3.utcDay), or if the thresholds are specified as an array of dates, then the binned values are implicitly coerced to dates. Time intervals are intervals that are also functions that return a Date instance when called with no arguments.

If the **interval** option is used instead of **thresholds**, it may be either an interval, a time interval, or a number. If a number *n*, threshold values are consecutive multiples of *n* that span the domain; otherwise, the **interval** option is equivalent to the **thresholds** option. When the thresholds are specified as an interval, and the default **domain** is used, the domain will automatically be extended to start and end to align with the interval.

The bin transform supports grouping in addition to binning: you can subdivide bins by up to two additional ordinal or categorical dimensions (not including faceting). If any of **z**, **fill**, or **stroke** is a channel, the first of these channels will be used to subdivide bins. Similarly, binX will group on **y** if **y** is not an output channel, and binY will group on **x** if **x** is not an output channel. For example, for a stacked histogram:

```js
Plot.binX({y: "count"}, {x: "body_mass_g", fill: "species"})
```

Lastly, the bin transform changes the default [mark insets](../features/marks.md#mark-options): binX changes the defaults for **insetLeft** and **insetRight**; binY changes the defaults for **insetTop** and **insetBottom**; bin changes all four.

## bin(*outputs*, *options*) {#bin}

```js
Plot.rect(olympians, Plot.bin({fill: "count"}, {x: "weight", y: "height"}))
```

Bins on **x** and **y**. Also groups on the first channel of **z**, **fill**, or **stroke**, if any.

## binX(*outputs*, *options*) {#binX}

```js
Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight"}))
```

Bins on **x**. Also groups on **y** and the first channel of **z**, **fill**, or **stroke**, if any.

## binY(*outputs*, *options*) {#binY}

```js
Plot.rectX(olympians, Plot.binY({x: "count"}, {y: "weight"}))
```

Bins on **y**. Also groups on **x** and first channel of **z**, **fill**, or **stroke**, if any.

# docs/transforms/centroid.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, shallowRef, onMounted} from "vue";

const us = shallowRef(null);
const statemesh = computed(() => us.value ? topojson.mesh(us.value, us.value.objects.states) : {type: null});
const states = computed(() => us.value ? topojson.feature(us.value, us.value.objects.states).features : []);
const counties = computed(() => us.value ? topojson.feature(us.value, us.value.objects.counties).features : []);
const nation = computed(() => us.value ? topojson.feature(us.value, us.value.objects.nation) : []);

onMounted(() => {
  d3.json("../data/us-counties-10m.json").then((data) => (us.value = data));
});

</script>

# Centroid transform <VersionBadge version="0.6.2" />

Plot offers two transforms that derive centroids from GeoJSON geometries: [centroid](#centroid) and [geoCentroid](#geoCentroid). These transforms can be used by any mark that accepts **x** and **y** channels. Below, a [text mark](../marks/text.md) labels the U.S. states.

:::plot defer https://observablehq.com/@observablehq/plot-state-labels
```js
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(statemesh),
    Plot.text(states, Plot.centroid({text: (d) => d.properties.name, fill: "currentColor", stroke: "var(--vp-c-bg)"}))
  ]
})
```
:::

For fun, we can pass county centroids to the [voronoi mark](../marks/delaunay.md).

:::plot defer https://observablehq.com/@observablehq/plot-centroid-voronoi
```js
Plot.voronoi(counties, Plot.centroid()).plot({projection: "albers"})
```
:::

While the centroid transform computes the centroid of a geometry _after_ projection, the geoCentroid transform computes it _before_ projection, then projects the resulting coordinates. This difference has a few implications, as follows.

As an [initializer](../features/transforms.md#custom-initializers), the centroid transform operates _after_ the geometries have been projected to screen coordinates. The resulting **x** and **y** channels reference the pixel coordinates of the planar centroid of the _projected_ shapes. No assumption is made about the geometries: they can be in any coordinate system, and the returned value is in the frame — as long as the projected geometry returns at least one visible point.

:::plot defer https://observablehq.com/@observablehq/plot-centroid-dot
```js
Plot.dot(counties, Plot.centroid()).plot({projection: "albers-usa"})
```
:::


The geoCentroid transform is more specialized as the **x** and **y** channels it derives represent the longitudes and latitudes of the centroids of the given GeoJSON geometries, before projection. It expects the geometries to be specified in _spherical_ coordinates. It is more correct, in a geospatial sense — for example, the spherical centroid always represents the center of mass of the original shape, and it will be rotated exactly in line with the projection’s rotate argument. However, this also means that it might land outside the frame if only a part of the land mass is visible, and might be clipped by the projection. In practice, the difference is generally imperceptible.

:::plot defer https://observablehq.com/@observablehq/plot-centroid-dot
```js
Plot.dot(counties, Plot.geoCentroid()).plot({projection: "albers-usa"})
```
:::

The geoCentroid transform is slightly faster than the centroid initializer — which might be useful if you have tens of thousands of features and want to show their density on a [hexbin map](../transforms/hexbin.md):

:::plot defer https://observablehq.com/@observablehq/plot-centroid-hexbin
```js
Plot.dot(counties, Plot.hexbin({r:"count"}, Plot.geoCentroid())).plot({projection: "albers"})
```
:::

Combined with the [pointer transform](../interactions/pointer.md), the centroid transform can add [interactive tips](../marks/tip.md) on a map:

:::plot defer https://observablehq.com/@observablehq/plot-state-centroids
```js
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(statemesh, {strokeOpacity: 0.2}),
    Plot.geo(nation),
    Plot.dot(states, Plot.centroid({fill: "red", stroke: "var(--vp-c-bg-alt)"})),
    Plot.tip(states, Plot.pointer(Plot.centroid({title: (d) => d.properties.name})))
  ]
})
```
:::

## centroid(*options*) {#centroid}

```js
Plot.centroid({geometry: Plot.identity})
```

The centroid initializer derives **x** and **y** channels representing the planar (projected) centroids for the given GeoJSON geometry. If the **geometry** option is not specified, the mark’s data is assumed to be GeoJSON objects.

## geoCentroid(*options*) {#geoCentroid}

```js
Plot.geoCentroid({geometry: Plot.identity})
```

The geoCentroid transform derives **x** and **y** channels representing the spherical centroids for the given GeoJSON geometry. If the **geometry** option is not specified, the mark’s data is assumed to be GeoJSON objects.

# docs/transforms/dodge.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref, shallowRef, onMounted} from "vue";
import cars from "../data/cars.ts";
import penguins from "../data/penguins.ts";

const anchor = ref("middle");
const r = ref(3);
const padding = ref(2);
const ipos = shallowRef([]);

onMounted(() => {
  d3.csv("../data/ipos.csv", d3.autoType).then((data) => (ipos.value = data));
});

</script>

# Dodge transform <VersionBadge version="0.5.0" />

Given one position dimension (either **x** or **y**), the **dodge** transform computes the other position dimension such that dots are packed densely without overlapping. The [dodgeX transform](#dodgeX) computes **x** (horizontal position) given **y** (vertical position), while the [dodgeY transform](#dodgeY) computes **y** given **x**.

The dodge transform is commonly used to produce beeswarm 🐝 plots, a way of showing a one-dimensional distribution that preserves the visual identity of individual data points. For example, the dots below represent the weights of cars; the rough shape of the pile gives a sense of the overall distribution (peaking around 2,100 pounds), and you can hover an individual dot to see which car it represents.

:::plot https://observablehq.com/@observablehq/plot-dodge-cars
```js
Plot.plot({
  height: 160,
  marks: [
    Plot.dotX(cars, Plot.dodgeY({x: "weight (lb)", title: "name", fill: "currentColor"}))
  ]
})
```
:::

Compare this to a conventional histogram using a [rect mark](../marks/rect.md).

:::plot https://observablehq.com/@observablehq/plot-dodge-cars
```js
Plot.plot({
  height: 180,
  marks: [
    Plot.rectY(cars, Plot.binX({y: "count"}, {x: "weight (lb)"})),
    Plot.ruleY([0])
  ]
})
```
:::

The dodge transform works with Plot’s [faceting system](../features/facets.md), allowing independent beeswarm plots on discrete partitions of the data. Below, penguins are grouped by species and colored by sex, while vertical↕︎ position (**y**) encodes body mass.

:::plot defer https://observablehq.com/@observablehq/plot-dodge-penguins
```js
Plot.plot({
  y: {grid: true},
  color: {legend: true},
  marks: [
    Plot.dot(penguins, Plot.dodgeX("middle", {fx: "species", y: "body_mass_g", fill: "sex"}))
  ]
})
```
:::

Beeswarm plots avoid the occlusion problem of dense scatterplots and barcode plots.

:::plot https://observablehq.com/@observablehq/plot-dodge-cars
```js
Plot.dotX(cars, {x: "weight (lb)"}).plot()
```
:::

:::plot https://observablehq.com/@observablehq/plot-dodge-cars
```js
Plot.ruleX(cars, {x: "weight (lb)"}).plot()
```
:::

The **anchor** option specifies the layout baseline: the optimal output position. For the dodgeX transform, the supported anchors are: _left_ (default), _middle_, _right_. For the dodgeY transform, the supported anchors are: _bottom_ (default), _middle_, _top_. When the _middle_ anchor is used, the dots are placed symmetrically around the baseline.

<p>
  <label class="label-input">
    Anchor:
    <select v-model="anchor">
      <option>top</option>
      <option>middle</option>
      <option>bottom</option>
    </select>
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-dodge-cars
```js
Plot.plot({
  height: 180,
  marks: [
    Plot.dot(cars, Plot.dodgeY(anchor, {x: "weight (lb)", fill: "currentColor"}))
  ]
})
```
:::

When using dodgeY, you must typically specify the plot’s **height** to create suitable space for the layout. The dodge transform is not currently able to set the height automatically. For dodgeX, the default **width** of 640 is often sufficient, though you may need to adjust it as well depending on your data.

The dodge transform differs from the [stack transform](./stack.md) in that the dots do not need the exact same input position to avoid overlap; the dodge transform respects the radius **r** of each dot. Try adjusting the radius below to see the effect.

<p>
  <label class="label-input">
    Radius (r):
    <input type="range" v-model.number="r" min="0.5" max="10" step="0.1">
    <span style="font-variant-numeric: tabular-nums;">{{r.toLocaleString("en-US", {minimumFractionDigits: 1})}}</span>
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-variable-radius-dodge
```js
Plot.plot({
  height: 180,
  marks: [
    Plot.dot(cars, Plot.dodgeY({x: "weight (lb)", r, fill: "currentColor"}))
  ]
})
```
:::

The dodge transform also supports a **padding** option (default 1), which specifies the minimum separating distance between dots. Increase it for more breathing room.

<p>
  <label class="label-input">
    Padding:
    <input type="range" v-model.number="padding" min="-1" max="5" step="0.1">
    <span style="font-variant-numeric: tabular-nums;">{{padding.toLocaleString("en-US", {minimumFractionDigits: 1})}}</span>
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-variable-radius-dodge
```js
Plot.plot({
  height: 180,
  marks: [
    Plot.dot(cars, Plot.dodgeY({x: "weight (lb)", padding, fill: "currentColor"}))
  ]
})
```
:::

If **r** is a channel, the dodge transform will position circles of varying radius. The chart below shows twenty years of IPO offerings leading up to Facebook’s $104B offering in 2012; each circle is sized proportionally to the associated company’s valuation at IPO. (This data comes from [“The Facebook Offering: How It Compares”](https://archive.nytimes.com/www.nytimes.com/interactive/2012/05/17/business/dealbook/how-the-facebook-offering-compares.html?hp) by Jeremy Ashkenas, Matthew Bloch, Shan Carter, and Amanda Cox.) Facebook’s valuation was nearly four times that of Google, the previous record. The 2000 [dot-com bubble](https://en.wikipedia.org/wiki/Dot-com_bubble) is also visible.

:::plot defer https://observablehq.com/@observablehq/plot-the-facebook-ipo
```js
Plot.plot({
  insetRight: 10,
  height: 790,
  marks: [
    Plot.dot(
      ipos,
      Plot.dodgeY({
        x: "date",
        r: "rMVOP",
        title: (d) => `${d.NAME}\n${(d.rMVOP / 1e3).toFixed(1)}B`,
        fill: "currentColor"
      })
    ),
    Plot.text(
      ipos,
      Plot.dodgeY({
        filter: (d) => d.rMVOP > 5e3,
        x: "date",
        r: "rMVOP",
        text: (d) => (d.rMVOP / 1e3).toFixed(),
        fill: "var(--vp-c-bg)",
        pointerEvents: "none"
      })
    )
  ]
})
```
:::

The dodge transform can be used with any mark that supports **x** and **y** position. Below, we use the [text mark](../marks/text.md) instead to show company valuations (in billions).

:::plot defer https://observablehq.com/@observablehq/plot-text-dodge
```js
Plot.plot({
  insetRight: 10,
  height: 790,
  marks: [
    Plot.text(
      ipos,
      Plot.dodgeY({
        x: "date",
        r: "rMVOP",
        text: (d) => (d.rMVOP / 1e3).toFixed(1),
        title: "NAME",
        fontSize: (d) => Math.min(22, Math.cbrt(d.rMVOP / 1e3) * 6)
      })
    )
  ]
})
```
:::

The dodge transform places dots sequentially, each time finding the closest position to the baseline that avoids intersection with previously-placed dots. Because this is a [greedy algorithm](https://en.wikipedia.org/wiki/Greedy_algorithm), the resulting layout depends on the input order. When **r** is a channel, dots are sorted by descending radius by default such that the largest dots are placed closest to the baseline. Otherwise, dots are placed in input order by default.

To adjust the dodge layout, use the [sort transform](./sort.md). For example, if the **sort** option uses the same column as **x**, the dots are arranged in piles leaning right.

:::plot https://observablehq.com/@observablehq/plot-dodge-sort
```js
Plot.plot({
  height: 180,
  marks: [
    Plot.dotX(cars, Plot.dodgeY({x: "weight (lb)", title: "name", fill: "currentColor", sort: "weight (lb)"}))
  ]
})
```
:::

Reversing the sort order produces piles leaning left.

:::plot https://observablehq.com/@observablehq/plot-dodge-sort
```js
Plot.plot({
  height: 180,
  marks: [
    Plot.dotX(cars, Plot.dodgeY({x: "weight (lb)", title: "name", fill: "currentColor", sort: "weight (lb)", reverse: true}))
  ]
})
```
:::

:::tip
To avoid repeating a channel definition, you can also specify the **sort** option as `{channel: "x"}`.
:::

:::info
Unlike a [force-directed beeswarm](https://observablehq.com/@harrystevens/force-directed-beeswarm), the dodge transform exactly preserves the input position dimension, resulting in a more accurate visualization. Also, the dodge transform tends to be faster than the iterative constraint relaxation used in the force-directed approach. We use Mikola Lysenko’s [interval-tree-1d library](https://github.com/mikolalysenko/interval-tree-1d) for fast intersection testing.
:::

## Dodge options

The dodge transforms accept the following options:

* **padding** — a number of pixels added to the radius of the mark to estimate its size
* **anchor** - the dodge anchor; defaults to *left* for dodgeX, or *bottom* for dodgeY

The **anchor** option may one of *middle*, *right*, and *left* for dodgeX, and one of *middle*, *top*, and *bottom* for dodgeY. With the *middle* anchor the piles will grow from the center in both directions; with the other anchors, the piles will grow from the specified anchor towards the opposite direction.

## dodgeY(*dodgeOptions*, *options*) {#dodgeY}

```js
Plot.dodgeY({x: "date"})
```

Given marks arranged along the *x* axis, the dodgeY transform piles them vertically by defining a *y* position channel that avoids overlapping. The *x* position channel is unchanged.

## dodgeX(*dodgeOptions*, *options*) {#dodgeX}

```js
Plot.dodgeX({y: "value"})
```

Equivalent to Plot.dodgeY, but piling horizontally, creating a new *x* position channel that avoids overlapping. The *y* position channel is unchanged.

# docs/transforms/filter.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {computed, ref, shallowRef, onMounted} from "vue";
import alphabet from "../data/alphabet.ts";
import metros from "../data/metros.ts";

const filtered = ref(true);

</script>

# Filter transform

The **filter transform** filters a mark’s index to show a subset of the data. For example, below the **filter** option controls which text labels are displayed in a dense scatterplot.

<p>
  <label class="label-input">
    Use filter:
    <input type="checkbox" v-model="filtered">
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-filter-demo
```js{10}
Plot.plot({
  grid: true,
  x: {type: "log"},
  marks: [
    Plot.dot(metros, {
      x: "POP_2015",
      y: "R90_10_2015"
    }),
    Plot.text(metros, {
      filter: filtered ? "highlight" : null,
      x: "POP_2015",
      y: "R90_10_2015",
      text: "nyt_display",
      frameAnchor: "bottom",
      dy: -6
    })
  ]
})
```
:::

:::tip
As an alternative to the filter transform here, you could set the **text** channel value to null using a function: `text: (d) => d.highlight ? d.nyt_display : null`.
:::

The filter transform can be applied either via the **filter** [mark option](../features/marks.md#mark-options), as above, or as an explicit [filter transform](#filter). The latter is generally only needed when composing multiple transforms.

To highlight the vowels in a bar chart of English letter frequency, you can use a filtered bar with a <span style="border-bottom: solid 2px var(--vp-c-red);">red</span> stroke. A filtered mark allows you to set options on a subset of the data, even if those options — such as mark insets — are not expressible as a channels.

:::plot https://observablehq.com/@observablehq/plot-filtered-bars
```js{8}
Plot.plot({
  marks: [
    Plot.barY(alphabet, {
      x: "letter",
      y: "frequency"
    }),
    Plot.barY(alphabet, {
      filter: (d) => /[aeiouy]/i.test(d.letter),
      x: "letter",
      y: "frequency",
      stroke: "red",
      strokeWidth: 3,
      inset: -3 // expand the bars
    })
  ]
})
```
:::

Since the filter transform only affects the mark’s index and not the channel values, it does not affect the default scale domains. Below, the *x* scale contains every English letter, even though the only the bars for the vowels are shown.

:::plot https://observablehq.com/@observablehq/plot-filtered-bars
```js
Plot.plot({
  marks: [
    Plot.barY(alphabet, {
      filter: (d) => /[aeiouy]/i.test(d.letter),
      x: "letter",
      y: "frequency"
    })
  ]
})
```
:::

If you want to drop values completely, you can filter the data with [*array*.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

:::plot https://observablehq.com/@observablehq/plot-filtered-bars
```js{4}
Plot.plot({
  marks: [
    Plot.barY(
      alphabet.filter((d) => /[aeiouy]/i.test(d.letter)),
      {x: "letter", y: "frequency"}
    )
  ]
})
```
:::

## filter(*test*, *options*) {#filter}

```js
Plot.filter((d) => /[aeiouy]/i.test(d.letter), {x: "letter", y: "frequency"})
```

Filters the data given the specified *test*. The test can be given as an accessor function (which receives the datum and index), or as a channel value definition such as a field name; truthy values are retained.

# docs/transforms/group.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";

const olympians = shallowRef([{weight: 31, height: 1.21, sex: "female"}, {weight: 170, height: 2.21, sex: "male"}]);

const scheme = Plot.scale({color: {type: "categorical"}}).range;

onMounted(() => {
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
});

</script>

# Group transform

:::tip
The group transform is for aggregating ordinal or nominal data. For quantitative or temporal data, use the [bin transform](./bin.md).
:::

The **group transform** groups ordinal or nominal data — discrete values such as name, type, or category. You can then compute summary statistics for each group, such as a count, sum, or proportion. The group transform is most often used to make bar charts with the [bar mark](../marks/bar.md).

For example, the bar chart below shows a distribution of Olympic athletes by sport.

:::plot defer https://observablehq.com/@observablehq/plot-group-olympic-athletes-by-sport
```js
Plot.plot({
  marginBottom: 100,
  x: {label: null, tickRotate: 90},
  y: {grid: true},
  marks: [
    Plot.barY(olympians, Plot.groupX({y: "count"}, {x: "sport"})),
    Plot.ruleY([0])
  ]
})
```
:::

:::tip
Ordinal domains are sorted naturally (alphabetically) by default. Either set the [scale **domain**](../features/scales.md) explicitly to change the order, or use the mark [**sort** option](../features/scales.md#sort-mark-option) to derive the scale domain from a channel.
:::

The groupX transform groups on **x**. The *outputs* argument (here `{y: "count"}`) declares desired output channels (**y**) and the associated reducer (*count*). Hence the height of each bar above represents the number of Olympic athletes by sport.

<!-- For example, to sort **x** by descending **y**: -->

<!-- :::plot
```js
Plot.plot({
  marginBottom: 100,
  x: {label: null, tickRotate: 90},
  y: {grid: true},
  marks: [
    Plot.barY(olympians, Plot.groupX({y: "count"}, {x: "sport", sort: {x: "-y"}})),
    Plot.ruleY([0])
  ]
})
```
::: -->

While the groupX transform is often used to generate **y**, it can output to any channel. For example, by declaring **r** in *outputs*, we can generate dots of size proportional to the number of athletes in each sport.

:::plot https://observablehq.com/@observablehq/plot-groups-as-dots
```js
Plot.plot({
  marginBottom: 100,
  x: {label: null, tickRotate: 90},
  r: {range: [0, 14]},
  marks: [
    Plot.dot(olympians, Plot.groupX({r: "count"}, {x: "sport"}))
  ]
})
```
:::

The **fill** channel meanwhile will produce a one-dimensional heatmap. Since there is no **y** channel below, we use a [cell](../marks/cell.md) instead of a bar.

:::plot defer https://observablehq.com/@observablehq/plot-groups-as-cells
```js-vue
Plot.plot({
  marginBottom: 80,
  x: {tickRotate: 90},
  color: {scheme: "{{$dark ? "turbo" : "YlGnBu"}}"},
  marks: [
    Plot.cell(olympians, Plot.groupX({fill: "count"}, {x: "sport"}))
  ]
})
```
:::

We aren’t limited to the *count* reducer. We can use the *mode* reducer, for example, to show which sex is more prevalent in each sport: <span :style="{borderBottom: `solid 2px ${scheme[1]}`}">men</span> are represented more often than <span :style="{borderBottom: `solid 2px ${scheme[0]}`}">women</span> in every sport except gymnastics and fencing.

:::plot defer https://observablehq.com/@observablehq/plot-group-and-mode-reducer
```js
Plot.plot({
  marginBottom: 80,
  x: {tickRotate: 90},
  marks: [
    Plot.cell(olympians, Plot.groupX({fill: "mode"}, {fill: "sex", x: "sport"}))
  ]
})
```
:::

You can partition groups using **z**. If **z** is undefined, it defaults to **fill** or **stroke**, if any. In conjunction with the barY mark’s implicit [stackY transform](./stack.md), this will produce stacked bars.

:::plot defer https://observablehq.com/@observablehq/plot-two-class-stacked-bars
```js
Plot.plot({
  marginBottom: 100,
  x: {label: null, tickRotate: 90},
  y: {grid: true},
  color: {legend: true},
  marks: [
    Plot.barY(olympians, Plot.groupX({y: "count"}, {x: "sport", fill: "sex"})),
    Plot.ruleY([0])
  ]
})
```
:::

:::tip
You can invoke the stack transform explicitly as `Plot.stackY(Plot.groupX({y: "count"}, {x: "sport", fill: "sex"}))`, producing an identical chart.
:::

You can opt-out of the implicit stackY transform by having groupX generate **y1** or **y2** instead of **y** (and similarly **x1** or **x2** for stackX and groupY). When overlapping marks, use either opacity or blending to make the overlap visible.

:::plot defer https://observablehq.com/@observablehq/plot-two-class-overlapping-bars
```js-vue
Plot.plot({
  marginBottom: 100,
  x: {label: null, tickRotate: 90},
  y: {grid: true},
  color: {legend: true},
  marks: [
    Plot.barY(olympians, Plot.groupX({y2: "count"}, {x: "sport", fill: "sex", mixBlendMode: "{{$dark ? "screen" : "multiply"}}"})),
    Plot.ruleY([0])
  ]
})
```
:::

:::warning CAUTION
While the **mixBlendMode** option is useful for mitigating occlusion, it can be slow to render if there are many elements. More than two overlapping histograms may also be hard to read.
:::

Perhaps better would be to make a grouped bar chart using [faceting](../features/facets.md). This is accomplished by setting the **fx** channel to facet horizontally on *sport*, while the **x** channel is used within each facet to draw side-by-side bars for each *sex*. The group transform automatically partitions groups by facet.

:::plot defer https://observablehq.com/@observablehq/plot-olympians-grouped-bar-chart
```js
Plot.plot({
  marginBottom: 100,
  fx: {padding: 0, label: null, tickRotate: 90, tickSize: 6},
  x: {axis: null, paddingOuter: 0.2},
  y: {grid: true},
  color: {legend: true},
  marks: [
    Plot.barY(olympians, Plot.groupX({y2: "count"}, {x: "sex", fx: "sport", fill: "sex"})),
    Plot.ruleY([0])
  ]
})
```
:::

Alternatively, below we use directional arrows (a [link mark](../marks/link.md) with [markers](../features/markers.md)) to indicate the difference in counts of <span :style="{borderBottom: `solid 2px ${scheme[1]}`}">male</span> and <span :style="{borderBottom: `solid 2px ${scheme[0]}`}">female</span> athletes by sport. The color of the arrow indicates which sex is more prevalent, while its length is proportional to the difference.

:::plot defer https://observablehq.com/@observablehq/plot-difference-arrows
```js
Plot.plot({
  marginBottom: 100,
  x: {label: null, tickRotate: 90},
  y: {grid: true, label: "Frequency"},
  color: {type: "categorical", domain: [-1, 1], unknown: "#aaa", transform: Math.sign},
  marks: [
    Plot.ruleY([0]),
    Plot.link(
      olympians,
      Plot.groupX(
        {
          y1: (D) => d3.sum(D, (d) => d === "female"),
          y2: (D) => d3.sum(D, (d) => d === "male"),
          stroke: (D) => d3.sum(D, (d) => d === "male") - d3.sum(D, (d) => d === "female")
        },
        {
          x: "sport",
          y1: "sex",
          y2: "sex",
          markerStart: "dot",
          markerEnd: "arrow",
          stroke: "sex",
          strokeWidth: 2
        }
      )
    )
  ]
})
```
:::

The group transform comes in four orientations:

- [groupX](#groupX) groups on **x**, and often outputs **y** as in a vertical↑ bar chart;
- [groupY](#groupY) groups on **y**, and often outputs **x** as in a horizontal→ bar chart;
- [groupZ](#groupZ) groups on *neither* **x** nor **y**, combining everything into one group; and
- [group](#group) groups on *both* **x** and **y**, and often outputs to **fill** or **r** as in a heatmap.

As you might guess, the groupY transform with the barX mark produces a horizontal→ bar chart. (We must increase the **marginLeft** to avoid the *y* axis labels from being cut off.)

:::plot defer https://observablehq.com/@observablehq/plot-sorted-horizontal-bars
```js
Plot.plot({
  marginLeft: 100,
  x: {grid: true},
  y: {label: null},
  marks: [
    Plot.barX(olympians, Plot.groupY({x: "count"}, {y: "sport", sort: {y: "x"}})),
    Plot.ruleX([0])
  ]
})
```
:::

You can produce a two-dimensional heatmap with group transform and a cell mark by generating a **fill** output channel. For example, we could show the median weight of athletes by sport (**x**) and sex (**y**).

:::plot defer https://observablehq.com/@observablehq/plot-grouped-olympians-heatmap
```js-vue
Plot.plot({
  marginBottom: 80,
  x: {label: null, tickRotate: 90},
  y: {label: null},
  color: {label: "Median weight (kg)", legend: true, scheme: "{{$dark ? "turbo" : "YlGnBu"}}"},
  marks: [
    Plot.cell(olympians, Plot.group({fill: "median"}, {fill: "weight", x: "sport", y: "sex"}))
  ]
})
```
:::

Or, we could group athletes by sport and the number of gold medals 🥇 won. ([Michael Phelps](https://en.wikipedia.org/wiki/Michael_Phelps), the most decorated Olympian of all time, won five gold medals in the 2016 Summer Olympics. [Simone Biles](https://en.wikipedia.org/wiki/Simone_Biles) and [Katie Ledecky](https://en.wikipedia.org/wiki/Katie_Ledecky) each won four.)

:::plot defer https://observablehq.com/@observablehq/plot-olympians-by-gold-medals
```js-vue
Plot.plot({
  marginBottom: 100,
  x: {label: null, tickRotate: 90},
  y: {label: "gold", labelAnchor: "top", labelArrow: true, reverse: true},
  color: {type: "sqrt", scheme: "{{$dark ? "turbo" : "YlGnBu"}}"},
  marks: [
    Plot.cell(olympians, Plot.group({fill: "count"}, {x: "sport", y: "gold"}))
  ]
})
```
:::

We could instead output **r** and use a [dot mark](../marks/dot.md) whose size again represents the number of athletes in each group.

:::plot defer https://observablehq.com/@observablehq/plot-olympians-by-gold-medals-proportional-dots
```js-vue
Plot.plot({
  marginBottom: 100,
  x: {label: null, tickRotate: 90},
  y: {type: "point", label: "gold", labelAnchor: "top", labelArrow: true, reverse: true},
  r: {range: [0, 12]},
  marks: [
    Plot.dot(olympians, Plot.group({r: "count"}, {x: "sport", y: "gold"}))
  ]
})
```
:::

We can add the **stroke** channel to show overlapping distributions by sex.

:::plot defer https://observablehq.com/@observablehq/plot-olympians-by-gold-medals-overlapping-dots
```js-vue
Plot.plot({
  marginBottom: 100,
  x: {label: null, tickRotate: 90},
  y: {type: "point", label: "gold", labelAnchor: "top", labelArrow: true, reverse: true},
  r: {range: [0, 12]},
  marks: [
    Plot.dot(olympians, Plot.group({r: "count"}, {x: "sport", y: "gold", stroke: "sex"}))
  ]
})
```
:::

To group solely on **z** (or **fill** or **stroke**), use [groupZ](#groupZ). The single stacked bar chart below (an alternative to a pie chart) shows the proportion of athletes by sport. The *proportion* reducer converts counts into normalized proportions adding up to 1, while the *first* reducer pulls out the name of the sport for labeling.

:::plot defer https://observablehq.com/@observablehq/plot-single-stacked-bar
```js
Plot.plot({
  height: 100,
  x: {percent: true},
  marks: [
    Plot.barX(
      olympians,
      Plot.stackX(
        {order: "x", reverse: true},
        Plot.groupZ(
          {x: "proportion"},
          {z: "sport", fillOpacity: 0.2, inset: 0.5}
        )
      )
    ),
    Plot.text(
      olympians,
      Plot.filter(
        (D) => D.length > 200,
        Plot.stackX(
          {order: "x", reverse: true},
          Plot.groupZ(
            {x: "proportion", text: "first"},
            {z: "sport", text: "sport", rotate: 90}
          )
        )
      )
    ),
    Plot.ruleX([0, 1])
  ]
})
```
:::

:::info
Although barX applies an implicit stackX transform, [textX](../marks/text.md) does not; this example uses an explicit stackX transform in both cases for clarity, and to pass the additional **order** and **reverse** options to place the largest sport on the left. The [filter transform](./filter.md) is applied after the stack transform to hide the labels on the smallest sports where the bars are too thin.
:::

## Group options

Given input *data* = [*d₀*, *d₁*, *d₂*, …], by default the resulting grouped data is an array of arrays where each inner array is a subset of the input data such as [[*d₁*, *d₂*, …], [*d₀*, …], …]. Each inner array is in input order. The outer array is in input order according to the first element of each group.

By specifying a different reducer for the **data** output, as described below, you can change how the grouped data is computed. The outputs may also include **filter** and **sort** options specified as reducers, and a **reverse** option to reverse the order of generated groups. By default, empty groups are omitted, and non-empty groups are generated in ascending (natural) order.

In addition to data, the following channels are automatically output:

* **x** - the horizontal position of the group
* **y** - the vertical position of the group
* **z** - the first value of the *z* channel, if any
* **fill** - the first value of the *fill* channel, if any
* **stroke** - the first value of the *stroke* channel, if any

The **x** output channel is only computed by the groupX and group transform; similarly the **y** output channel is only computed by the groupY and group transform.

You can declare additional output channels by specifying the channel name and desired reducer in the *outputs* object which is the first argument to the transform. For example, to use groupX to generate a **y** channel of group counts as in a frequency histogram:

```js
Plot.groupX({y: "count"}, {x: "species"})
```

The following named reducers are supported:

* *first* - the first value, in input order
* *last* - the last value, in input order
* *count* - the number of elements (frequency)
* *sum* - the sum of values
* *proportion* - the sum proportional to the overall total (weighted frequency)
* *proportion-facet* - the sum proportional to the facet total
* *min* - the minimum value
* *min-index* - the zero-based index of the minimum value
* *max* - the maximum value
* *max-index* - the zero-based index of the maximum value
* *mean* - the mean value (average)
* *median* - the median value
* *mode* - the value with the most occurrences
* *pXX* - the percentile value, where XX is a number in [00,99]
* *deviation* - the standard deviation
* *variance* - the variance per [Welford’s algorithm](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford's_online_algorithm)
* *identity* - the array of values
* *x* <VersionBadge version="0.6.12" pr="1916" /> - the group’s *x* value (when grouping on *x*)
* *y* <VersionBadge version="0.6.12" pr="1916" /> - the group’s *y* value (when grouping on *y*)
* *z* <VersionBadge version="0.6.14" pr="1959" /> - the group’s *z* value (*z*, *fill*, or *stroke*)

In addition, a reducer may be specified as:

* a function to be passed the array of values for each group and the extent of the group
* an object with a **reduceIndex** method, an optionally a **scope**

In the last case, the **reduceIndex** method is repeatedly passed three arguments: the index for each group (an array of integers), the input channel’s array of values, and the extent of the group (an object {data, x, y}); it must then return the corresponding aggregate value for the group.

If the reducer object’s **scope** is *data*, then the **reduceIndex** method is first invoked for the full data; the return value of the **reduceIndex** method is then made available as a third argument (making the extent the fourth argument). Similarly if the **scope** is *facet*, then the **reduceIndex** method is invoked for each facet, and the resulting reduce value is made available while reducing the facet’s groups. (This optional **scope** is used by the *proportion* and *proportion-facet* reducers.)

Most reducers require binding the output channel to an input channel; for example, if you want the **y** output channel to be a *sum* (not merely a count), there should be a corresponding **y** input channel specifying which values to sum. If there is not, *sum* will be equivalent to *count*.

```js
Plot.groupX({y: "sum"}, {x: "species", y: "body_mass_g"})
```

You can control whether a channel is computed before or after grouping. If a channel is declared only in *options* (and it is not a special group-eligible channel such as **x**, **y**, **z**, **fill**, or **stroke**), it will be computed after grouping and be passed the grouped data: each datum is the array of input data corresponding to the current group.

```js
Plot.groupX({y: "count"}, {x: "species", title: (group) => group.map((d) => d.body_mass_g).join("\n")})
```

This is equivalent to declaring the channel only in *outputs*.

```js
Plot.groupX({y: "count", title: (group) => group.map((d) => d.body_mass_g).join("\n")}, {x: "species"})
```

However, if a channel is declared in both *outputs* and *options*, then the channel in *options* is computed before grouping and can be aggregated using any built-in reducer (or a custom reducer function) during the group transform.

```js
Plot.groupX({y: "count", title: (masses) => masses.join("\n")}, {x: "species", title: "body_mass_g"})
```

If any of **z**, **fill**, or **stroke** is a channel, the first of these channels is considered the *z* dimension and will be used to subdivide groups.

The default reducer for the **title** channel returns a summary list of the top 5 values with the corresponding number of occurrences.

## group(*outputs*, *options*) {#group}

```js
Plot.group({fill: "count"}, {x: "island", y: "species"})
```

Groups on **x**, **y**, and the first channel of **z**, **fill**, or **stroke**, if any.

## groupX(*outputs*, *options*) {#groupX}

```js
Plot.groupX({y: "sum"}, {x: "species", y: "body_mass_g"})
```

Groups on **x** and the first channel of **z**, **fill**, or **stroke**, if any.

## groupY(*outputs*, *options*) {#groupY}

```js
Plot.groupY({x: "sum"}, {y: "species", x: "body_mass_g"})
```

Groups on **y** and the first channel of **z**, **fill**, or **stroke**, if any.

## groupZ(*outputs*, *options*) {#groupZ}

```js
Plot.groupZ({x: "proportion"}, {fill: "species"})
```

Groups on the first channel of **z**, **fill**, or **stroke**, if any. If none of **z**, **fill**, or **stroke** are channels, then all data (within each facet) is placed into a single group.

## find(*test*) <VersionBadge version="0.6.12" pr="1914" /> {#find}

```js
Plot.groupX(
  {y1: Plot.find((d) => d.sex === "F"), y2: Plot.find((d) => d.sex === "M")},
  {x: "date", y: "value"}
)
```

Returns a reducer that finds the first datum for which the given *test* function returns a truthy value, and returns the corresponding channel value. This may be used with the group or bin transform to implement a “pivot wider” transform; for example, a “tall” dataset with separate rows for male and female observations may be transformed into a “wide” dataset with separate columns for male and female values.

# docs/transforms/hexbin.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, ref, watchEffect, shallowRef, onMounted} from "vue";
import cars from "../data/cars.ts";

const binWidth = ref(20);
const olympians = shallowRef([{weight: 31, height: 1.21, sex: "female"}, {weight: 170, height: 2.21, sex: "male"}]);
const walmarts = shallowRef([]);
const us = shallowRef(null);
const nation = computed(() => us.value ? topojson.feature(us.value, us.value.objects.nation) : {type: null});
const statemesh = computed(() => us.value ? topojson.mesh(us.value, us.value.objects.states, (a, b) => a !== b) : {type: null});

const scheme = Plot.scale({color: {type: "categorical"}}).range;

onMounted(() => {
  d3.csv("../data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
  d3.tsv("../data/walmarts.tsv", d3.autoType).then((data) => (walmarts.value = data));
  d3.json("../data/us-counties-10m.json").then((data) => (us.value = data));
});

</script>

# Hexbin transform <VersionBadge version="0.5.0" />

The **hexbin transform** groups two-dimensional quantitative or temporal data — continuous measurements such as heights, weights, or temperatures — into discrete hexagonal bins. You can then compute summary statistics for each bin, such as a count, sum, or proportion. The hexbin transform is most often used to make heatmaps with the [dot mark](../marks/dot.md).

For example, the heatmap below shows the weights and heights of Olympic athletes. The color of each hexagon represents the number (*count*) of athletes with similar weight and height.

:::plot defer https://observablehq.com/@observablehq/plot-olympians-hexbin
```js-vue
Plot
  .dot(olympians, Plot.hexbin({fill: "count"}, {x: "weight", y: "height"}))
  .plot({color: {scheme: "{{$dark ? "turbo" : "YlGnBu"}}"}})
```
:::

Whereas the [bin transform](./bin.md) produces rectangular bins and operates on abstract data, the hexbin transform produces hexagonal bins and operates in “screen space” (_i.e._, pixel coordinates) after the *x* and *y* scales have been applied to the data. And whereas the bin transform produces **x1**, **y1**, **x2**, **y2** representing rectangular extents, the hexbin transform produces **x** and **y** representing hexagon centers.

To produce an areal encoding as in a bubble map, output **r**. In this case, the default range of the *r* scale is set such that the hexagons do not overlap. The **binWidth** option, which defaults to 20, specifies the distance between centers of neighboring hexagons in pixels.

<p>
  <label class="label-input">
    Bin width:
    <input type="range" v-model.number="binWidth" min="0" max="40" step="0.1">
    <span style="font-variant-numeric: tabular-nums;">{{binWidth.toLocaleString("en-US", {minimumFractionDigits: 1})}}</span>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-hexbin-binwidth
```js
Plot
  .dot(olympians, Plot.hexbin({r: "count"}, {x: "weight", y: "height", binWidth}))
  .plot()
```
:::

If desired, you can output both **fill** and **r** for a redundant encoding.

:::plot defer https://observablehq.com/@observablehq/plot-hexbin-redundant
```js-vue
Plot
  .dot(olympians, Plot.hexbin({fill: "count", r: "count"}, {x: "weight", y: "height", stroke: "currentColor"}))
  .plot({color: {scheme: "{{$dark ? "turbo" : "YlGnBu"}}"}})
```
:::

:::tip
Setting a **stroke** ensures that the smallest hexagons are visible.
:::

Alternatively, the **fill** and **r** channels can encode independent (or “bivariate”) dimensions of data. Below, the **r** channel uses *count* as before, while the **fill** channel uses *mode* to show the most frequent sex of athletes in each hexagon. The larger athletes are more likely to be <span :style="{borderBottom: `solid 2px ${scheme[1]}`}">male</span>, while the smaller athletes are more likely to be <span :style="{borderBottom: `solid 2px ${scheme[0]}`}">female</span>.

:::plot defer https://observablehq.com/@observablehq/plot-bivariate-hexbin
```js
Plot
  .dot(olympians, Plot.hexbin({fill: "mode", r: "count"}, {x: "weight", y: "height", fill: "sex"}))
  .plot()
```
:::

Using **z**, the hexbin transform will partition hexagons by ordinal value. If **z** is not specified, it defaults to **fill** (if there is no **fill** output channel) or **stroke** (if there is no **stroke** output channel). Setting **z** to *sex* in the chart above, and switching to **stroke** instead of **fill**, produces separate overlapping hexagons for each sex.

:::plot defer https://observablehq.com/@observablehq/plot-overlapping-hexbin
```js
Plot
  .dot(olympians, Plot.hexbin({stroke: "mode", r: "count"}, {x: "weight", y: "height", z: "sex", stroke: "sex"}))
  .plot()
```
:::

The hexbin transform can be paired with any mark that supports **x** and **y** channels (which is almost all of them). The [text mark](../marks/text.md) is useful for labelling. By setting the **text** output channel, you can derive the text from the binned contents.

:::plot defer https://observablehq.com/@observablehq/plot-hexbin-text
```js
Plot
  .text(olympians, Plot.hexbin({text: "count"}, {x: "weight", y: "height"}))
  .plot()
```
:::

The hexbin transform also works with Plot’s [projection system](../features/projections.md). Below, hexagon size represents the number of nearby Walmart stores, while color represents the date the first nearby Walmart store opened. (The first Walmart opened in Rogers, Arkansas.)

:::plot defer https://observablehq.com/@observablehq/plot-hexbin-map
```js
Plot.plot({
  projection: "albers",
  r: {range: [0, 16]},
  color: {scheme: "spectral", label: "First year opened", legend: true},
  marks: [
    Plot.geo(statemesh, {strokeOpacity: 0.5}),
    Plot.geo(nation),
    Plot.dot(walmarts, Plot.hexbin({r: "count", fill: "min"}, {x: "longitude", y: "latitude", fill: "date"}))
  ]
})
```
:::

:::warning CAUTION
Beware the [modifiable areal unit problem](https://en.wikipedia.org/wiki/Modifiable_areal_unit_problem). On a small scale map, this is compounded by the Earth’s curvature, which makes it impossible to create an accurate and regular grid. Use an equal-area projection when binning.
:::

The [hexgrid mark](../marks/hexgrid.md) draws the base hexagonal grid as a mesh. This is useful for showing the empty hexagons, since the hexbin transform does not output empty bins (and unlike the bin transform, the hexbin transform does not currently support the **filter** option).

:::plot defer https://observablehq.com/@observablehq/plot-hexgrid-demo
```js
Plot.plot({
  marks: [
    Plot.hexgrid(),
    Plot.dot(olympians, Plot.hexbin({r: "count"}, {x: "weight", y: "height", fill: "currentColor"}))
  ]
})
```
:::

The hexbin transform defaults the **symbol** option to *hexagon*, but you can override it. The [circle constructor](../marks/dot.md#circle) changes it to *circle*.

:::plot defer https://observablehq.com/@observablehq/plot-hexbin-circle
```js
Plot.circle(olympians, Plot.hexbin({r: "count"}, {x: "weight", y: "height"})).plot()
```
:::

Hexbins work best when there is an interesting density of dots in the center of the chart, but sometimes hexagons “escape” the edge of the frame and cover the axes. To prevent this, you can use the **inset** [scale option](../features/scales.md) to reserve space on the edges of the frame.

:::plot defer https://observablehq.com/@observablehq/plot-hexbin-inset
```js-vue
Plot
  .dot(olympians, Plot.hexbin({fill: "count"}, {x: "weight", y: "height"}))
  .plot({inset: 10, color: {scheme: "{{$dark ? "turbo" : "YlGnBu"}}"}})
```
:::

:::tip
You can also set the dot’s **clip** option to true to prevent the hexagons from escaping.
:::

Alternatively, use the [axis mark](../marks/axis.md) to draw axes on top of the hexagons.

:::plot defer https://observablehq.com/@observablehq/plot-hexbin-and-axes
```js-vue
Plot.plot({
  color: {scheme: "{{$dark ? "turbo" : "YlGnBu"}}"},
  marks: [
    Plot.dot(olympians, Plot.hexbin({fill: "count"}, {x: "weight", y: "height"})),
    Plot.axisX(),
    Plot.axisY()
  ]
})
```
:::

## Hexbin options

The *options* must specify the **x** and **y** channels. The **binWidth** option (default 20) defines the distance between centers of neighboring hexagons in pixels. If any of **z**, **fill**, or **stroke** is a channel, the first of these channels will be used to subdivide bins.

The *outputs* options are similar to the [bin transform](./bin.md); for each hexagon, an output channel value is derived by reducing the corresponding binned input channel values. The *outputs* object specifies the reducer for each output channel.

The following named reducers are supported:

* *first* - the first value, in input order
* *last* - the last value, in input order
* *count* - the number of elements (frequency)
* *distinct* - the number of distinct values
* *sum* - the sum of values
* *proportion* - the sum proportional to the overall total (weighted frequency)
* *proportion-facet* - the sum proportional to the facet total
* *min* - the minimum value
* *min-index* - the zero-based index of the minimum value
* *max* - the maximum value
* *max-index* - the zero-based index of the maximum value
* *mean* - the mean value (average)
* *median* - the median value
* *deviation* - the [standard deviation](https://d3js.org/d3-array/summarize#deviation)
* *variance* - the variance per [Welford’s algorithm](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford's_online_algorithm)
* *mode* - the value with the most occurrences
* *identity* - the array of values
* *x* <VersionBadge version="0.6.12" pr="1916" /> - the hexagon’s *x* center
* *y* <VersionBadge version="0.6.12" pr="1916" /> - the hexagon’s *y* center

In addition, a reducer may be specified as:

* a function to be passed the array of values for each bin and the center of the bin
* an object with a *reduceIndex* method

In the last case, the **reduceIndex** method is repeatedly passed three arguments: the index for each bin (an array of integers), the input channel’s array of values, and the center of the bin (an object {data, x, y}); it must then return the corresponding aggregate value for the bin.

Most reducers require binding the output channel to an input channel; for example, if you want the **y** output channel to be a *sum* (not merely a count), there should be a corresponding **y** input channel specifying which values to sum. If there is not, *sum* will be equivalent to *count*.

## hexbin(*outputs*, *options*) {#hexbin}

```js
Plot.dot(olympians, Plot.hexbin({fill: "count"}, {x: "weight", y: "height"}))
```

Bins hexagonally on **x** and **y**. Also groups on the first channel of **z**, **fill**, or **stroke**, if any.

# docs/transforms/interval.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import aapl from "../data/aapl.ts";

</script>

# Interval transform

:::tip
There’s also an [**interval** scale option](../features/scales.md#scale-transforms) for quantizing continuous data.
:::

The **interval transform** turns a quantitative or temporal *value* into a continuous extent [*start*, *stop*]. For example, if *value* is an instant in time, the interval transform could return a *start* of UTC midnight and a *stop* of the UTC midnight the following day.

The interval transform is often used for time-series bar charts. For example, consider the chart below of the daily trade volume of Apple stock. Because of the [barY mark](../marks/bar.md), the *x* scale is ordinal (*band*). And because the regularity of the data is not specified (*i.e.*, because Plot has no way of knowing that this is daily data), every distinct value must have its own label, leading to crowding. If a day were missing data, it would be difficult to spot! 👓

:::plot https://observablehq.com/@observablehq/plot-band-scale-interval
```js
Plot.plot({
  marginBottom: 80,
  x: {type: "band"}, // ⚠️ not utc
  y: {
    transform: (d) => d / 1e6,
    label: "Daily trade volume (millions)"
  },
  marks: [
    Plot.barY(aapl.slice(-40), {x: "Date", y: "Volume"}),
    Plot.ruleY([0])
  ]
})
```
:::

In contrast, a [rectY mark](../marks/rect.md) with the **interval** option and the *day* interval produces a temporal (*utc*) *x* scale. This allows Plot to compute ticks at meaningful intervals: here weekly boundaries, UTC midnight on Sundays. Furthermore, we can see that this isn’t truly daily data — it’s missing weekends and holidays when the stock market was closed.

:::plot https://observablehq.com/@observablehq/plot-temporal-interval-option
```js
Plot.plot({
  y: {
    grid: true,
    transform: (d) => d / 1e6,
    label: "Daily trade volume (millions)"
  },
  marks: [
    Plot.rectY(aapl.slice(-40), {x: "Date", interval: "day", y: "Volume"}),
    Plot.ruleY([0])
  ]
})
```
:::

:::info
The interval transform is not a standalone transform, but an option on marks and scales.
:::

The meaning of the **interval** mark option depends on the associated mark, such as line, bar, rect, or dot. For example, for the [barY mark](../marks/bar.md), the **interval** option affects converts a singular *y* value into an interval [*y1*, *y2*]. In the contrived example below, notice that the vertical↕︎ extent of each bar spans an interval of 5 million, rather than extending to *y* = 0.

:::plot https://observablehq.com/@observablehq/plot-interval-bars
```js
Plot.plot({
  marginBottom: 80,
  x: {type: "band"}, // ⚠️ not utc
  y: {
    grid: true,
    transform: (d) => d / 1e6,
    label: "Daily trade volume (millions)"
  },
  marks: [
    Plot.barY(aapl.slice(-40), {x: "Date", y: "Volume", interval: 5e6}),
    Plot.ruleY([0])
  ]
})
```
:::

While the **interval** option is most commonly specified as a named time interval or a number, it can also be specified as a [D3 time interval](https://d3js.org/d3-time#_interval) or any object that implements *interval*.floor and *interval*.offset.

# docs/transforms/map.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref} from "vue";
import aapl from "../data/aapl.ts";

const n = ref(20);
const k = ref(2);

</script>

# Map transform

The **map transform** groups data into series and then transforms each series’ values, say to normalize them relative to some basis or to apply a moving average. For example, below the map transform computes a cumulative sum (*cumsum*) of a series of random numbers sampled from a normal distribution — in other words, a random walk.

:::plot https://observablehq.com/@observablehq/plot-random-walk-cumsum-map
```js
Plot.plot({
  marks: [
    Plot.ruleY([0]),
    Plot.lineY({length: 600}, Plot.mapY("cumsum", {y: d3.randomNormal()}))
  ]
})
```
:::

As another example, we can map the daily trading volume of Apple stock to a [*p*-quantile](https://en.wikipedia.org/wiki/Quantile) in [0, 1] using the *quantile* map method, where 0 represents the minimum daily trade volume and 1 represents the maximum, and then apply a 30-day rolling mean with the [window transform](./window.md) to smooth out the noise.

:::plot https://observablehq.com/@observablehq/plot-quantile-map-transform
```js
Plot.plot({
  marks: [
    Plot.ruleY([0, 1]),
    Plot.lineY(aapl, Plot.mapY("quantile", {x: "Date", y: "Volume", strokeOpacity: 0.2})),
    Plot.lineY(aapl, Plot.windowY(30, Plot.mapY("quantile", {x: "Date", y: "Volume"})))
  ]
})
```
:::

The [mapY transform](#mapY) above is shorthand for applying the given map method to all *y* channels. There’s also a less-common [mapX transform](#mapX) for *x* channels.

The more explicit [map](#map) transform lets you specify which channels to map, and what map method to use for each channel. Like the [group](./group.md) and [bin](./bin.md) transforms, it takes two arguments: an *outputs* object that describes the output channels to compute, and an *options* object that describes the input channels and additional options. So this:

```js
Plot.mapY("cumsum", {y: d3.randomNormal()})
```

Is shorthand for this:

```js
Plot.map({y: "cumsum"}, {y: d3.randomNormal()})
```

As a more practical example, we can use the map transform to construct [Bollinger bands](../marks/bollinger.md), showing both the price and volatility of Apple stock.

<p>
  <label class="label-input">
    <span>Window size (n):</span>
    <input type="range" v-model.number="n" min="1" max="100" step="1" />
    <span style="font-variant-numeric: tabular-nums;">{{n.toLocaleString("en-US")}}</span>
  </label>
  <label class="label-input">
    <span>Radius (k):</span>
    <input type="range" v-model.number="k" min="0" max="10" step="0.1" />
    <span style="font-variant-numeric: tabular-nums;">{{k.toLocaleString("en-US")}}</span>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-bollinger-band
```js
Plot.plot({
  y: {
    grid: true
  },
  marks: [
    Plot.areaY(aapl, Plot.map({y1: Plot.bollinger({n, k: -k}), y2: Plot.bollinger({n, k})}, {x: "Date", y: "Close", fillOpacity: 0.2})),
    Plot.lineY(aapl, Plot.map({y: Plot.bollinger({n})}, {x: "Date", y: "Close", stroke: "blue"})),
    Plot.lineY(aapl, {x: "Date", y: "Close", strokeWidth: 1})
  ]
})
```
:::

The [bollinger map method](../marks/bollinger.md#bollinger) is implemented atop the [window map method](./window.md#window), computing the mean of values within the rolling window, and then offsetting the mean by a multiple of the rolling deviation.

The map transform is akin to running [*array*.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) on the input channel’s values with the given map method. However, the map transform is series-aware: the data are first grouped into series using the **z**, **fill**, or **stroke** channel in the same fashion as the [area](../marks/area.md) and [line](../marks/line.md) marks so that series are processed independently.

## Map options

The following map methods are supported:

* *cumsum* - a cumulative sum
* *rank* - the rank of each value in the sorted array
* *quantile* - the rank, normalized between 0 and 1
* a function to be passed an array of values, returning new values
* a function to be passed an index and array of channel values, returning new values
* an object that implements the *mapIndex* method

If a function is used, it must return an array of the same length as the given input. If a *mapIndex* method is used, it is repeatedly passed the index for each series (an array of integers), the corresponding input channel’s array of values, and the output channel’s array of values; it must populate the slots specified by the index in the output array.

## map(*outputs*, *options*) {#map}

```js
Plot.map({y: "cumsum"}, {y: d3.randomNormal()})
```

Groups on the first channel of **z**, **fill**, or **stroke**, if any, and then for each channel declared in the specified *outputs* object, applies the corresponding map method. Each channel in *outputs* must have a corresponding input channel in *options*.

## mapX(*map*, *options*) {#mapX}

```js
Plot.mapX("cumsum", {x: d3.randomNormal()})
```

Equivalent to Plot.map({x: *map*, x1: *map*, x2: *map*}, *options*), but ignores any of **x**, **x1**, and **x2** not present in *options*. In addition, if none of **x**, **x1**, or **x2** are specified, then **x** defaults to [identity](../features/transforms.md#identity).

## mapY(*map*, *options*) {#mapY}

```js
Plot.mapY("cumsum", {y: d3.randomNormal()})
```

Equivalent to Plot.map({y: *map*, y1: *map*, y2: *map*}, *options*), but ignores any of **y**, **y1**, and **y2** not present in *options*. In addition, if none of **y**, **y1**, or **y2** are specified, then **y** defaults to [identity](../features/transforms.md#identity).

# docs/transforms/normalize.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";

const stateage = shallowRef([]);
const stocks = shallowRef([]);
const xy = Plot.normalizeX("sum", {z: "state", x: "population", y: "state"});

onMounted(() => {
  Promise.all([
    d3.csv("../data/aapl.csv", d3.autoType),
    d3.csv("../data/amzn.csv", d3.autoType),
    d3.csv("../data/goog.csv", d3.autoType),
    d3.csv("../data/ibm.csv", d3.autoType)
  ]).then((datas) => {
    stocks.value = d3.zip(["AAPL", "AMZN", "GOOG", "IBM"], datas).flatMap(([Symbol, data]) => data.map((d) => ({Symbol, ...d})));
  });
  d3.csv("../data/us-population-state-age.csv", d3.autoType).then((data) => {
    const ages = data.columns.slice(1); // convert wide data to tidy data
    stateage.value = Object.assign(ages.flatMap((age) => data.map((d) => ({state: d.name, age, population: d[age]}))), {ages});
  });
});

</script>

# Normalize transform

The **normalize transform** is a specialized [map transform](./map.md) that normalizes series values relative to some basis, say to convert absolute values into relative values. For example, here is an index chart — a type of multi-series line chart — showing the return of several stocks relative to their closing price on a particular date.

:::plot defer https://observablehq.com/@observablehq/plot-index-chart
```js
Plot.plot({
  y: {
    type: "log",
    grid: true,
    label: "Change in price (%)",
    tickFormat: ((f) => (x) => f((x - 1) * 100))(d3.format("+d"))
  },
  marks: [
    Plot.ruleY([1]),
    Plot.line(stocks, Plot.normalizeY({
      x: "Date",
      y: "Close",
      stroke: "Symbol"
    })),
    Plot.text(stocks, Plot.selectLast(Plot.normalizeY({
      x: "Date",
      y: "Close",
      z: "Symbol",
      text: "Symbol",
      textAnchor: "start",
      dx: 3
    })))
  ]
})
```
:::

:::tip
The [select transform](./select.md) is used to label the endpoints of each line.
:::

:::info
This example uses an [immediately-invoked function expression (IIFE)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) for the **tickFormat** option so that the [d3.format](https://d3js.org/d3-format) only needs to be constructed once.
:::

The normalize transform converts absolute values into relative ones. So, if **y** is [*y₀*, *y₁*, *y₂*, …] and the *first* basis is used with [normalizeY](#normalizeY), the resulting output **y** channel is [*y₀* / *y₀*, *y₁* / *y₀*, *y₂* / *y₀*, …]. But it’s a bit more complicated than this in practice since **y** is first grouped by **z**, **fill**, or **stroke** into separate series.

As another example, the normalize transform can be used to compute proportional demographics from absolute populations. The plot below compares the demographics of U.S. states: color represents age group, **y** represents the state, and **x** represents the proportion of the state’s population in that age group.

:::plot defer https://observablehq.com/@observablehq/plot-dot-plot
```js
Plot.plot({
  height: 660,
  axis: null,
  grid: true,
  x: {
    axis: "top",
    label: "Population (%)",
    percent: true
  },
  color: {
    scheme: "spectral",
    domain: stateage.ages, // in age order
    legend: true
  },
  marks: [
    Plot.ruleX([0]),
    Plot.ruleY(stateage, Plot.groupY({x1: "min", x2: "max"}, {...xy, sort: {y: "x1"}})),
    Plot.dot(stateage, {...xy, fill: "age", title: "age"}),
    Plot.text(stateage, Plot.selectMinX({...xy, textAnchor: "end", dx: -6, text: "state"}))
  ]
})
```
:::

```js
xy = Plot.normalizeX("sum", {z: "state", x: "population", y: "state"})
```

:::tip
To reduce code duplication, pull shared options out into an object (here `xy`) and then merge them into each mark’s options using the spread operator (`...`).
:::

## Normalize options

The **basis** option specifies how to normalize the series values; it is one of:

* *first* - the first value, as in an index chart; the default
* *last* - the last value
* *min* - the minimum value
* *max* - the maximum value
* *mean* - the mean value (average)
* *median* - the median value
* *pXX* - the percentile value, where XX is a number in [00,99]
* *sum* - the sum of values
* *extent* - the minimum is mapped to zero, and the maximum to one
* *deviation* - subtract the mean, then divide by the standard deviation
* a function to be passed an array of values, returning the desired basis
* a function to be passed an index and channel value array, returning the desired basis

## normalize(*basis*) <VersionBadge version="0.2.3" /> {#normalize}

```js
Plot.map({y: Plot.normalize("first")}, {x: "Date", y: "Close", stroke: "Symbol"})
```

Returns a normalize map method for the given *basis*, suitable for use with the [map transform](./map.md).

## normalizeX(*basis*, *options*) {#normalizeX}

```js
Plot.normalizeX("first", {y: "Date", x: "Close", stroke: "Symbol"})
```

Like [mapX](./map.md#mapX), but applies the normalize map method with the given *basis*. The **basis** option can also be mixed into the specified *options* like so:

```js
Plot.normalizeX({basis: "first", y: "Date", x: "Close", stroke: "Symbol"})
```

If not specified, the *basis* defaults to *first*.

## normalizeY(*basis*, *options*) {#normalizeY}

```js
Plot.normalizeY("first", {x: "Date", y: "Close", stroke: "Symbol"})
```

Like [mapY](./map.md#mapY), but applies the normalize map method with the given *basis*. The **basis** option can also be mixed into the specified *options* like so:

```js
Plot.normalizeY({basis: "first", x: "Date", y: "Close", stroke: "Symbol"})
```

If not specified, the *basis* defaults to *first*.

# docs/transforms/select.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef, onMounted} from "vue";
import aapl from "../data/aapl.ts";

const stocks = shallowRef([]);

onMounted(() => {
  Promise.all([
    d3.csv("../data/amzn.csv", d3.autoType),
    d3.csv("../data/goog.csv", d3.autoType),
    d3.csv("../data/ibm.csv", d3.autoType)
  ]).then((datas) => {
    stocks.value = d3.zip(["AAPL", "AMZN", "GOOG", "IBM"], [aapl].concat(datas)).flatMap(([Symbol, data]) => data.map((d) => ({Symbol, ...d})));
  });
});

</script>

# Select transform <VersionBadge version="0.4.0" />

The **select transform** filters a mark’s index to show a subset of the data. It is a specialized [filter transform](./filter.md) that pulls a single value or a sample subset out of each series. For example, below selectLast is used to label the last value in a line chart.

:::plot https://observablehq.com/@observablehq/plot-value-labeled-line-chart
```js
Plot.plot({
  y: {grid: true},
  marks: [
    Plot.ruleY([0]),
    Plot.line(aapl, {x: "Date", y: "Close"}),
    Plot.text(aapl, Plot.selectLast({x: "Date", y: "Close", text: "Close", frameAnchor: "bottom", dy: -6}))
  ]
})
```
:::

The select transform uses input order, not natural order by value, to determine the meaning of *first* and *last*. Since this dataset is in reverse chronological order, the first element is the most recent.

Using selectMinY and selectMaxY, you can label the extreme values.

:::plot https://observablehq.com/@observablehq/plot-value-labeled-line-chart
```js
Plot.plot({
  y: {grid: true},
  marks: [
    Plot.ruleY([0]),
    Plot.line(aapl, {x: "Date", y: "Close"}),
    Plot.text(aapl, Plot.selectMinY({x: "Date", y: "Close", text: "Close", frameAnchor: "top", dy: 6})),
    Plot.text(aapl, Plot.selectMaxY({x: "Date", y: "Close", text: "Close", frameAnchor: "bottom", dy: -6}))
  ]
})
```
:::

The select transform groups data into series using the **z**, **fill**, or **stroke** channel in the same fashion as the [area](../marks/area.md) and [line](../marks/line.md) marks. Below, the select transform is used to label the last point in each series of a multi-series line chart.

:::plot defer https://observablehq.com/@observablehq/plot-labeled-multi-line-chart
```js
Plot.plot({
  y: {grid: true},
  marks: [
    Plot.ruleY([0]),
    Plot.line(stocks, {x: "Date", y: "Close", stroke: "Symbol"}),
    Plot.text(stocks, Plot.selectLast({x: "Date", y: "Close", z: "Symbol", text: "Symbol", textAnchor: "start", dx: 3}))
  ]
})
```
:::

## select(*selector*, *options*) {#select}

```js
Plot.select("first", {x: "Date", y: "Close"}) // selectFirst
```
```js
Plot.select({y: "min"}, {x: "Date", y: "Close"}) // selectMinY
```

Selects the points in each series determined by the given *selector*, which is one of:

- a named selector, either *first* or *last*,
- a function which receives as input the series index, or
- a {*name*: *value*} object (with exactly one *name*).

In the last case, *name* is the name of a channel and *value* is a value selector, which is one of:

- a named selector, either *min* or *max*, or
- a function which receives as input the series index and the channel values.

For example, to select the point in each city with the highest temperature (“selectMaxFill”):

```js
Plot.select({fill: "max"}, {x: "date", y: "city", z: "city", fill: "temperature"})
```

A selector function must return the selected index: a subset of the passed-in series index. For example, selectFirst and selectMinY can be implemented using functions like so:

```js
Plot.select((I) => [I[0]], {x: "Date", y: "Close"}) // selectFirst
```
```js
Plot.select({y: (I, Y) => [d3.least(I, (i) => Y[i])]}, {x: "Date", y: "Close"}) // selectMinY
```

Or, to select the point within each series that is the closest to the median of **y**:

```js
Plot.select({y: selectorMedian}, {x: "year", y: "revenue", fill: "format"})
```

```js
function selectorMedian(I, V) {
  const median = d3.median(I, (i) => V[i]);
  const i = d3.least(I, (i) => Math.abs(V[i] - median));
  return [i];
}
```

The following selects a sample of 10% of the data:

```js
Plot.select({y: selectorSample}, {x: "Date", y: "Close"})
```

```js
function selectorSample(I) {
  return I.filter((i, j) => j % 10 === 0);
}
```

## selectFirst(*options*) {#selectFirst}

```js
Plot.selectFirst({x: "Date", y: "Close"})
```

Selects the first point of each series according to input order.

## selectLast(*options*) {#selectLast}

```js
Plot.selectLast({x: "Date", y: "Close"})
```

Selects the last point of each series according to input order.

## selectMinX(*options*) {#selectMinX}

```js
Plot.selectMinX({x: "Date", y: "Close"})
```

Selects the leftmost point of each series.

## selectMinY(*options*) {#selectMinY}

```js
Plot.selectMinY({x: "Date", y: "Close"})
```

Selects the lowest point of each series.

## selectMaxX(*options*) {#selectMaxX}

```js
Plot.selectMaxX({x: "Date", y: "Close"})
```

Selects the rightmost point of each series.

## selectMaxY(*options*) {#selectMaxY}

```js
Plot.selectMaxY({x: "Date", y: "Close"})
```

Selects the highest point of each series.

# docs/transforms/shift.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref, shallowRef, onMounted} from "vue";

const shift = ref(365);
const aapl = shallowRef([]);

onMounted(() => {
  d3.csv("../data/aapl.csv", d3.autoType).then((data) => (aapl.value = data));
});

</script>

# Shift transform <VersionBadge version="0.6.12" pr="1896" />

The **shift transform** is a specialized [map transform](./map.md) that derives an output **x1** channel by shifting the **x** channel; it can be used with the [difference mark](../marks/difference.md) to show change over time. For example, the chart below shows the price of Apple stock. The <span style="border-bottom: solid #01ab63 3px;">green region</span> shows when the price went up over the given interval, while the <span style="border-bottom: solid #4269d0 3px;">blue region</span> shows when the price went down.

<p>
  <label class="label-input" style="display: flex;">
    <span style="display: inline-block; width: 7em;">Shift (days):</span>
    <input type="range" v-model.number="shift" min="0" max="1000" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{shift}}</span>
  </label>
</p>

:::plot hidden
```js
Plot.differenceY(aapl, Plot.shiftX(`${shift} days`, {x: "Date", y: "Close"})).plot({y: {grid: true}})
```
:::

```js-vue
Plot.differenceY(aapl, Plot.shiftX("{{shift}} days", {x: "Date", y: "Close"})).plot({y: {grid: true}})
```

When looking at year-over-year growth, the chart is mostly green, implying that you would make a profit by holding Apple stock for a year. However, if you bought in 2015 and sold in 2016, you would likely have lost money. Try adjusting the slider to a shorter or longer interval: how does that affect the typical return?

## shiftX(*interval*, *options*) {#shiftX}

```js
Plot.shiftX("7 days", {x: "Date", y: "Close"})
```

Derives an **x1** channel from the input **x** channel by shifting values by the given [*interval*](../features/intervals.md). The *interval* may be specified as: a name (*second*, *minute*, *hour*, *day*, *week*, *month*, *quarter*, *half*, *year*, *monday*, *tuesday*, *wednesday*, *thursday*, *friday*, *saturday*, *sunday*) with an optional number and sign (*e.g.*, *+3 days* or *-1 year*); or as a number; or as an implementation — such as d3.utcMonth — with *interval*.floor(*value*), *interval*.offset(*value*), and *interval*.range(*start*, *stop*) methods.

The shiftX transform also aliases the **x** channel to **x2** and applies a domain hint to the **x2** channel such that by default the plot shows only the intersection of **x1** and **x2**. For example, if the interval is *+1 year*, the first year of the data is not shown.

## shiftY(*interval*, *options*) <VersionBadge version="0.6.16" pr="1922" /> {#shiftY}

```js
Plot.shiftY("7 days", {y: "Date", x: "Close"})
```

Derives a **y1** channel from the input **y** channel by shifting values by the given [*interval*](../features/intervals.md). See [shiftX](#shiftX) for more.

The shiftY transform also aliases the **y** channel to **y2** and applies a domain hint to the **y2** channel such that by default the plot shows only the intersection of **y1** and **y2**. For example, if the interval is *+1 year*, the first year of the data is not shown.

# docs/transforms/sort.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import {computed, ref, shallowRef, onMounted} from "vue";
import cars from "../data/cars.ts";

const sorted = ref(true);
const order = ref("ascending");
const bls = shallowRef([]);
const us = shallowRef(null);
const statemesh = computed(() => us.value ? topojson.mesh(us.value, us.value.objects.states) : {type: null});
const counties = computed(() => us.value ? topojson.feature(us.value, us.value.objects.counties).features : []);

onMounted(() => {
  d3.csv("../data/bls-metro-unemployment.csv", d3.autoType).then((data) => (bls.value = data));
  Promise.all([
    d3.json("../data/us-counties-10m.json"),
    d3.csv("../data/us-county-population.csv")
  ]).then(([_us, _population]) => {
    const map = new Map(_population.map((d) => [d.state + d.county, +d.population]));
    _us.objects.counties.geometries.forEach((g) => (g.properties.population = map.get(g.id)));
    us.value = _us;
  });
});

</script>

# Sort transform

The **sort transform** sorts a mark’s index to change the effective order of data. The sort transform affects the order in which a mark’s graphical elements are drawn ([z-order](https://en.wikipedia.org/wiki/Z-order)), which can have a dramatic effect when these elements overlap. For example, see the bubble map of U.S. county population below; when the null sort order is used for input order, many small dots are hidden underneath larger ones.

<p>
  <label class="label-input">
    Sort by descending radius (r):
    <input type="checkbox" v-model="sorted">
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-dot-sort
```js
Plot.plot({
  projection: "albers-usa",
  marks: [
    Plot.geo(statemesh, {strokeOpacity: 0.4}),
    Plot.dot(counties, Plot.geoCentroid({
      r: (d) => d.properties.population,
      fill: "currentColor",
      stroke: "var(--vp-c-bg)",
      strokeWidth: 1,
      sort: sorted ? {channel: "-r"} : null
    }))
  ]
})
```
:::

:::tip
Dots are sorted by descending **r** by default, so you may not need the **sort** option.
:::

The sort transform can be applied either via the **sort** [mark option](../features/marks.md#mark-options), as above, or as an explicit [sort transform](#sort). The latter is generally only needed when composing multiple transforms, or to disambiguate the sort transform from imputed ordinal scale domains, *i.e.*, [scale sorting](../features/scales.md#sort-mark-option).

As another example, in the line chart of unemployment rates below, lines for metropolitan areas in Michigan (which saw exceptionally high unemployment following the [financial crisis of 2008](https://en.wikipedia.org/wiki/2007–2008_financial_crisis), in part due to the [auto industry collapse](https://en.wikipedia.org/wiki/2008–2010_automotive_industry_crisis)) are highlighted in <span style="border-bottom: solid 2px var(--vp-c-red);">red</span>, and the **sort** option is used to draw them on top of other series.

:::plot https://observablehq.com/@observablehq/plot-multiple-line-highlight
```js
Plot.plot({
  y: {
    grid: true,
    label: "Unemployment (%)"
  },
  color: {
    domain: [false, true],
    range: ["#ccc", "red"]
  },
  marks: [
    Plot.ruleY([0]),
    Plot.line(bls, {
      x: "date",
      y: "unemployment",
      z: "division",
      sort: (d) => /, MI /.test(d.division),
      stroke: (d) => /, MI /.test(d.division)
    })
  ]
})
```
:::

:::tip
You could say `sort: {channel: "stroke"}` here to avoid repeating the test function.
:::

The index order also affects the behavior of certain transforms such as [stack](./stack.md) and [dodge](./dodge.md).

<p>
  <span class="label-input">
    Sort x order:
    <label style="margin-left: 0.5em;"><input type="radio" name="order" value="ascending" v-model="order" /> ascending</label>
    <label style="margin-left: 0.5em;"><input type="radio" name="order" value="descending" v-model="order" /> descending</label>
  </span>
</p>

:::plot https://observablehq.com/@observablehq/plot-dodge-cars-2
```js
Plot.plot({
  height: 180,
  marks: [
    Plot.dotX(cars, Plot.dodgeY({
      x: "weight (lb)",
      title: "name",
      fill: "currentColor",
      sort: {channel: "x", order}
    }))
  ]
})
```
:::

The closely-related [reverse transform](#reverse) likewise reverses the mark index, while the [shuffle transform](#shuffle) for randomizes the mark index’s order.

## sort(*order*, *options*) {#sort}

```js
Plot.sort("body_mass_g", {x: "culmen_length_mm", y: "culmen_depth_mm"})
```

Sorts the data by the specified *order*, which is one of:

- a comparator function, as with [*array*.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- an accessor function
- a field name
- a {*channel*, *order*} object

In the object case, the **channel** option specifies the name of the channel, while the **order** option specifies *ascending* (the default) or *descending* order. You can also use the shorthand <span style="white-space: nowrap;">*-name* <VersionBadge version="0.6.7" /></span> to sort by descending order of the channel with the given *name*. For example, `sort: {channel: "-r"}` will sort by descending radius (**r**).

In the function case, if the sort function does not take exactly one argument, it is interpreted as a comparator function; otherwise it is interpreted as an accessor function.

## shuffle(*options*) {#shuffle}

```js
Plot.shuffle({x: "culmen_length_mm", y: "culmen_depth_mm"})
```

Shuffles the data randomly. If a **seed** option is specified, a [linear congruential generator](https://d3js.org/d3-random#randomLcg) with the given seed is used to generate random numbers; otherwise, Math.random is used.

## reverse(*options*) {#reverse}

```js
Plot.reverse({x: "culmen_length_mm", y: "culmen_depth_mm"})
```

Reverses the order of the data.

# docs/transforms/stack.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import alphabet from "../data/alphabet.ts";
import crimea from "../data/crimea.ts";
import {computed, ref, shallowRef, onMounted} from "vue";

const congress = shallowRef([]);
const offsets = ref("wiggle");
const offset = computed(() => offsets.value === "null" ? null : offsets.value);
const orders = ref("appearance");
const order = computed(() => orders.value === "null" ? null : orders.value);
const reverse = ref(true);
const riaa = shallowRef([]);
const survey = shallowRef([]);
const scheme = Plot.scale({color: {type: "categorical"}}).range;

onMounted(() => {
  d3.csv("../data/riaa-us-revenue.csv", d3.autoType).then((data) => (riaa.value = data));
  d3.csv("../data/survey.csv", d3.autoType).then((data) => (survey.value = data));
  d3.csv("../data/us-congress-2023.csv", d3.autoType).then((data) => (congress.value = data));
});

function Likert(responses) {
  const map = new Map(responses);
  return {
    order: Array.from(map.keys()),
    offset(I, X1, X2, Z) {
      for (const stacks of I) {
        for (const stack of stacks) {
          const k = d3.sum(stack, (i) => (X2[i] - X1[i]) * (1 - map.get(Z[i]))) / 2;
          for (const i of stack) {
            X1[i] -= k;
            X2[i] -= k;
          }
        }
      }
    }
  };
}

const likert = Likert([
  ["Strongly Disagree", -1],
  ["Disagree", -1],
  ["Neutral", 0],
  ["Agree", 1],
  ["Strongly Agree", 1]
]);

</script>

# Stack transform

The **stack transform** comes in two orientations: [stackY](#stackY) replaces **y** with **y1** and **y2** to form vertical↑ stacks grouped on **x**, while [stackX](#stackX) replaces **x** with **x1** and **x2** for horizontal→ stacks grouped on **y**.  In effect, stacking transforms a *length* into *lower* and *upper* positions: the upper position of each element equals the lower position of the next element in the stack. Stacking makes it easier to perceive a total while still showing its parts.

For example, below is a stacked area chart of [deaths in the Crimean War](https://en.wikipedia.org/wiki/Florence_Nightingale#Crimean_War) — predominantly from <span :style="{borderBottom: `solid ${scheme[0]} 3px`}">disease</span> — using Florence Nightingale’s data.

:::plot https://observablehq.com/@observablehq/plot-crimean-war-casualties
```js
Plot.plot({
  y: {grid: true},
  color: {legend: true},
  marks: [
    Plot.areaY(crimea, {x: "date", y: "deaths", fill: "cause"}),
    Plot.ruleY([0])
  ]
})
```
:::

:::tip
The [areaY mark](../marks/area.md) applies the stackY transform implicitly if you do not specify either **y1** or **y2**. The same applies to [barY](../marks/bar.md) and [rectY](../marks/rect.md). You can invoke the stack transform explicitly as `Plot.stackY({x: "date", y: "deaths", fill: "cause"})` to produce an identical chart.
:::

The stack transform works with any mark that consumes **y1** & **y2** or **x1** & **x2**, so you can stack rects, too.

:::plot https://observablehq.com/@observablehq/plot-crimean-war-recty
```js
Plot.plot({
  y: {grid: true},
  marks: [
    Plot.rectY(crimea, {x: "date", y: "deaths", interval: "month", fill: "cause"}),
    Plot.ruleY([0])
  ]
})
```
:::

:::info
The [**interval** mark option](./interval.md) specifies the periodicity of the data; without it, Plot wouldn’t know how wide to make the rects.
:::

And you can stack bars if you’d prefer to treat *x* as ordinal.

:::plot https://observablehq.com/@observablehq/plot-crimean-war-bary
```js
Plot.plot({
  x: {
    interval: "month",
    tickFormat: (d) => d.toLocaleString("en", {month: "narrow"}),
    label: null
  },
  y: {grid: true},
  marks: [
    Plot.barY(crimea, {x: "date", y: "deaths", fill: "cause"}),
    Plot.ruleY([0])
  ]
})
```
:::

:::info
The [**interval** scale option](../features/scales.md#scale-transforms) specifies the periodicity of the data; without it, any gaps in the data would not be visible since barY implies that *x* is ordinal.
:::

The stackY transform also outputs **y** representing the midpoint of **y1** and **y2**, and likewise stackX outputs **x** representing the midpoint of **x1** and **x2**. This is useful for point-based marks such as [text](../marks/text.md) and [dot](../marks/dot.md). Below, a single stacked horizontal [bar](../marks/bar.md) shows the relative frequency of English letters; this form is a compact alternative to a pie 🥧 or donut 🍩 chart.

:::plot https://observablehq.com/@observablehq/plot-stacked-percentages
```js
Plot.plot({
  x: {percent: true},
  marks: [
    Plot.barX(alphabet, Plot.stackX({x: "frequency", fillOpacity: 0.3, inset: 0.5})),
    Plot.textX(alphabet, Plot.stackX({x: "frequency", text: "letter", inset: 0.5})),
    Plot.ruleX([0, 1])
  ]
})
```
:::

The **order** option controls the order in which the layers are stacked. It defaults to null, meaning to respect the input order of the data. The *appearance* order excels when each series has a prominent peak, as in the chart below of [recording industry](https://en.wikipedia.org/wiki/Recording_Industry_Association_of_America) revenue. <span :style="{borderBottom: `solid 2px ${scheme[0]}`}">Compact disc</span> sales started declining well before the rise of <span :style="{borderBottom: `solid 2px ${scheme[1]}`}">downloads</span> and <span :style="{borderBottom: `solid 2px ${scheme[3]}`}">streaming</span>, suggesting that the industry was slow to provide a convenient digital product and hence lost revenue to piracy.

<p>
  <label class="label-input">
    Order:
    <select v-model="orders">
      <option>null</option>
      <option>appearance</option>
      <option>inside-out</option>
      <option>sum</option>
      <option>group</option>
      <option>z</option>
    </select>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-stacking-order
```js
Plot.plot({
  y: {
    grid: true,
    label: "Annual revenue (billions, adj.)",
    transform: (d) => d / 1000 // convert millions to billions
  },
  color: {legend: true},
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", order}),
    Plot.ruleY([0])
  ]
})
```
:::

:::info
In this data, the *group* field is a supercategory of the *format* field, which is useful to avoid overwhelming the color encoding with too many categories. For example, the *Vinyl* group includes both the *LP/EP* and *Vinyl Single* formats.
:::

The **reverse** option reverses the order of layers. In conjunction with the *appearance* order, now layers enter from the bottom rather than the top.

<p>
  <label class="label-input">
    Reverse:
    <input type="checkbox" v-model="reverse">
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-stacking-order-and-reverse
```js
Plot.plot({
  y: {
    grid: true,
    label: "Annual revenue (billions, adj.)",
    transform: (d) => d / 1000 // convert millions to billions
  },
  color: {legend: true},
  marks: [
    Plot.areaY(riaa, Plot.stackY({order: "appearance", reverse}, {x: "year", y: "revenue", z: "format", fill: "group"})),
    Plot.ruleY([0])
  ]
})
```
:::

:::tip
The **reverse** option is also used by the [sort transform](./sort.md). To disambiguate, pass the *stack* options separately using the two-argument form of the stack transform as above.
:::

The *value* **order** is worth special mention: it sorts each stack by value independently such that the order of layers can change, emphasizing the changing ranks of layers. This is sometimes called a “ribbon” chart. (In fact, the default null **order** supports changing order of layers, too! But most often data comes already sorted by series.)

:::plot defer https://observablehq.com/@observablehq/plot-ribbon-chart
```js
Plot.plot({
  y: {
    grid: true,
    label: "Annual revenue (billions, adj.)",
    transform: (d) => d / 1000 // convert millions to billions
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", order: "value"}),
    Plot.ruleY([0])
  ]
})
```
:::

The **offset** option controls the baseline of stacked layers. It defaults to null for a *y* = 0 baseline (for stackY, or *x* = 0 for stackX). The *center* **offset** centers each stack independently per [Havre *et al.*](https://innovis.cpsc.ucalgary.ca/innovis/uploads/Courses/InformationVisualizationDetails2009/Havre2000.pdf); the *wiggle* **offset** minimizes apparent movement per [Byron & Wattenberg](http://leebyron.com/streamgraph/stackedgraphs_byron_wattenberg.pdf); these two offsets produce “streamgraphs”, so called for their fluid appearance. The *wiggle* **offset** changes the default **order** to *inside-out* to further minimize movement.

<p>
  <label class="label-input">
    Offset:
    <select v-model="offsets">
      <option>null</option>
      <option>center</option>
      <option>wiggle</option>
    </select>
  </label>
</p>

:::plot defer https://observablehq.com/@observablehq/plot-stack-offset
```js
Plot.plot({
  y: {
    grid: true,
    label: "Annual revenue (billions, adj.)",
    transform: (d) => d / 1000
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", offset})
  ]
})
```
:::

:::warning CAUTION
When **offset** is not null, the *y* axis is harder to use because there is no longer a shared baseline at *y* = 0, though it is still useful for eyeballing length.
:::

The *normalize* **offset** is again worth special mention: it scales stacks to fill the interval [0, 1], thereby showing the relative proportion of each layer. Sales of <span :style="{borderBottom: `solid 2px ${scheme[0]}`}">compact discs</span> accounted for over 90% of revenue in the early 2000’s, but now most revenue comes from <span :style="{borderBottom: `solid 2px ${scheme[3]}`}">streaming</span>.

:::plot defer https://observablehq.com/@observablehq/plot-normalized-stack
```js
Plot.plot({
  y: {
    label: "Annual revenue (%)",
    percent: true
  },
  marks: [
    Plot.areaY(riaa, Plot.stackY({offset: "normalize", order: "group", reverse: true}, {x: "year", y: "revenue", z: "format", fill: "group"})),
    Plot.ruleY([0, 1])
  ]
})
```
:::

When the provided length (typically **y**) is negative, in conjunction with the null **offset** the stack transform will produce diverging stacks on opposites sides of the zero baseline. The diverging stacked dot plot below shows the age and gender distribution of the U.S. Congress in 2023. This form is also often *popular* for [population pyramids](https://observablehq.com/@observablehq/plot-population-pyramid).

:::plot defer https://observablehq.com/@observablehq/plot-stacked-dots
```js
Plot.plot({
  aspectRatio: 1,
  x: {label: "Age (years)"},
  y: {
    grid: true,
    label: "← Women · Men →",
    labelAnchor: "center",
    tickFormat: Math.abs
  },
  marks: [
    Plot.dot(
      congress,
      Plot.stackY2({
        x: (d) => 2023 - d.birthday.getUTCFullYear(),
        y: (d) => d.gender === "M" ? 1 : -1,
        fill: "gender",
        title: "full_name"
      })
    ),
    Plot.ruleY([0])
  ]
})
```
:::

:::info
The stackY2 transform places each dot at the upper bound of the associated stacked interval, rather than the middle of the interval as when using stackY. Hence, the first male dot is placed at *y* = 1, and the first female dot is placed at *y* = -1.
:::

When visualizing [Likert scale](https://en.wikipedia.org/wiki/Likert_scale) survey results we may wish to place <span :style="{borderWidth: 2, borderBottomStyle: 'solid', borderImage: `linear-gradient(to right, ${d3.schemeRdBu[5][0]}, ${d3.schemeRdBu[5][1]}) 2`}">negative</span> (disagreeing) responses on the left and <span :style="{borderWidth: 2, borderBottomStyle: 'solid', borderImage: `linear-gradient(to right, ${d3.schemeRdBu[5][3]}, ${d3.schemeRdBu[5][4]}) 2`}">positive</span> (agreeing) responses on the right, leaving <span :style="{borderBottom: `solid 2px ${d3.schemeRdBu[5][2]}`}">neutral</span> responses in the middle. This is achieved below using a custom **offset** function.

:::plot defer https://observablehq.com/@observablehq/plot-diverging-stacked-bar
```js
Plot.plot({
  x: {tickFormat: Math.abs},
  color: {domain: likert.order, scheme: "RdBu", legend: true},
  marks: [
    Plot.barX(
      survey,
      Plot.groupZ({x: "count"}, {fy: "Question", fill: "Response", ...likert})
    ),
    Plot.ruleX([0])
  ]
})
```
:::

Here `likert` declares which response values are negative (`-1`), which are positive (`1`), and which are neutral (`0`).

```js
likert = Likert([
  ["Strongly Disagree", -1],
  ["Disagree", -1],
  ["Neutral", 0],
  ["Agree", 1],
  ["Strongly Agree", 1]
])
```

And `Likert` implements the **order** (as an explicit array of ordinal values, such that the ordinal color scale lists in the correct order rather than sorting alphabetically) and **offset** (as a function that mutates the **x1** and **x2** channel values) stack options.

```js
function Likert(responses) {
  const map = new Map(responses);
  return {
    order: Array.from(map.keys()),
    offset(I, X1, X2, Z) {
      for (const stacks of I) {
        for (const stack of stacks) {
          const k = d3.sum(stack, (i) => (X2[i] - X1[i]) * (1 - map.get(Z[i]))) / 2;
          for (const i of stack) {
            X1[i] -= k;
            X2[i] -= k;
          }
        }
      }
    }
  };
}
```

See the [Marimekko example](https://observablehq.com/@observablehq/plot-marimekko) for another interesting application of the stack transform.

## Stack options

The stackY transform groups on **x** and transforms **y** into **y1** and **y2**; the stackX transform groups on **y** and transforms **x** into **x1** and **x2**. If **y** is not specified for stackY, or if **x** is not specified for stackX, it defaults to the constant one, which is useful for constructing simple isotype charts (*e.g.*, stacked dots).

The supported stack options are:

- **offset** - the offset (or baseline) method
- **order** - the order in which stacks are layered
- **reverse** - true to reverse order

The following **order** methods are supported:

- null (default) - input order
- *value* - ascending value order (or descending with **reverse**)
- *x* - alias of *value*; for stackX only
- *y* - alias of *value*; for stackY only
- *sum* - order series by their total value
- *appearance* - order series by the position of their maximum value
- *inside-out* (default with *wiggle*) - order the earliest-appearing series on the inside
- a named field or function of data - order data by priority
- an array of *z* values

The **reverse** option reverses the effective order. For the *value* order, stackY uses the *y* value while stackX uses the *x* value. For the *appearance* order, stackY uses the *x* position of the maximum *y* value while stackX uses the *y* position of the maximum *x* value. If an array of *z* values are specified, they should enumerate the *z* values for all series in the desired order; this array is typically hard-coded or computed with [d3.groupSort](https://d3js.org/d3-array/group#groupSort). Note that the input order (null) and *value* order can produce crossing paths: they do not guarantee a consistent series order across stacks.

The stack transform supports diverging stacks: negative values are stacked below zero while positive values are stacked above zero. For stackY, the **y1** channel contains the value of lesser magnitude (closer to zero) while the **y2** channel contains the value of greater magnitude (farther from zero); the difference between the two corresponds to the input **y** channel value. For stackX, the same is true, except for **x1**, **x2**, and **x** respectively.

After all values have been stacked from zero, an optional **offset** can be applied to translate or scale the stacks. The following **offset** methods are supported:

- null (default) - a zero baseline
- *normalize* - rescale each stack to fill [0, 1]
- *center* - align the centers of all stacks
- *wiggle* - translate stacks to minimize apparent movement
- a function to be passed a nested index, and start, end, and *z* values

If a given stack has zero total value, the *normalize* offset will not adjust the stack’s position. Both the *center* and *wiggle* offsets ensure that the lowest element across stacks starts at zero for better default axes. The *wiggle* offset is recommended for streamgraphs, and if used, changes the default order to *inside-out*; see [Byron & Wattenberg](http://leebyron.com/streamgraph/).

If the offset is specified as a function, it will receive four arguments: an index of stacks nested by facet and then stack, an array of start values, an array of end values, and an array of *z* values. For stackX, the start and end values correspond to **x1** and **x2**, while for stackY, the start and end values correspond to **y1** and **y2**. The offset function is then responsible for mutating the arrays of start and end values, such as by subtracting a common offset for each of the indices that pertain to the same stack.

In addition to the **y1** and **y2** output channels, stackY computes a **y** output channel that represents the midpoint of **y1** and **y2**; stackX does the same for **x**. This can be used to position a label or a dot in the center of a stacked layer. The **x** and **y** output channels are lazy: they are only computed if needed by a downstream mark or transform.

If two arguments are passed to the stack transform functions below, the stack-specific options (**offset**, **order**, and **reverse**) are pulled exclusively from the first *options* argument, while any channels (*e.g.*, **x**, **y**, and **z**) are pulled from second *options* argument. Options from the second argument that are not consumed by the stack transform will be passed through. Using two arguments is sometimes necessary is disambiguate the option recipient when chaining transforms.

## stackY(*stack*, *options*) {#stackY}

```js
Plot.stackY({x: "year", y: "revenue", z: "format", fill: "group"})
```

Creates new channels **y1** and **y2**, obtained by stacking the original **y** channel for data points that share a common **x** (and possibly **z**) value. A new **y** channel is also returned, which lazily computes the middle value of **y1** and **y2**. The input **y** channel defaults to a constant 1, resulting in a count of the data points. The stack options (**offset**, **order**, and **reverse**) may be specified as part of the *options* object, if the only argument, or as a separate *stack* options argument.

## stackY1(*stack*, *options*) {#stackY1}

```js
Plot.stackY1({x: "year", y: "revenue", z: "format", fill: "group"})
```

Like [stackY](#stackY), except that the **y1** channel is returned as the **y** channel. This can be used, for example, to draw a line at the bottom of each stacked area.

## stackY2(*stack*, *options*) {#stackY2}

```js
Plot.stackY2({x: "year", y: "revenue", z: "format", fill: "group"})
```

Like [stackY](#stackY), except that the **y2** channel is returned as the **y** channel. This can be used, for example, to draw a line at the top of each stacked area.

## stackX(*stack*, *options*) {#stackX}

```js
Plot.stackX({y: "year", x: "revenue", z: "format", fill: "group"})
```

Like [stackY](#stackY), but with *x* as the input value channel, *y* as the stack index, *x1*, *x2* and *x* as the output channels.

## stackX1(*stack*, *options*) {#stackX1}

```js
Plot.stackX1({y: "year", x: "revenue", z: "format", fill: "group"})
```

Like [stackX](#stackX), except that the **x1** channel is returned as the **x** channel. This can be used, for example, to draw a line at the left edge of each stacked area.

## stackX2(*stack*, *options*) {#stackX2}

```js
Plot.stackX2({y: "year", x: "revenue", z: "format", fill: "group"})
```

Like [stackX](#stackX), except that the **x2** channel is returned as the **x** channel. This can be used, for example, to draw a line at the right edge of each stacked area.

# docs/transforms/tree.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

const gods = [
  "Chaos/Gaia/Mountains",
  "Chaos/Gaia/Pontus",
  "Chaos/Gaia/Uranus",
  "Chaos/Eros",
  "Chaos/Erebus",
  "Chaos/Tartarus"
];

function indent() {
  return (root) => {
    root.eachBefore((node, i) => {
      node.y = node.depth;
      node.x = i;
    });
  };
}

</script>

# Tree transform <VersionBadge version="0.4.3" />

The **tree transform** is rarely used directly; the two variants, [treeNode](#treeNode) and [treeLink](#treeLink), are typically used internally by the composite [tree mark](../marks/tree.md). The tree transform arranges a tabular dataset into a hierarchy according to the given **path** channel, which is typically a slash-separated string; it then executes a tree layout algorithm to compute **x** and **y**; these channels can then be used to construct a node-link diagram.

As a contrived example, we can construct the equivalent of the tree mark using a [link](../marks/link.md), [dot](../marks/dot.md), and [text](../marks/text.md), and the corresponding tree transforms.

:::plot https://observablehq.com/@observablehq/plot-tree-and-link
```js
Plot.plot({
  axis: null,
  height: 100,
  margin: 20,
  marginRight: 120,
  marks: [
    Plot.link(gods, Plot.treeLink()),
    Plot.dot(gods, Plot.treeNode()),
    Plot.text(gods, Plot.treeNode({text: "node:name", dx: 6}))
  ]
})
```
:::

Here `gods` is an array of slash-separated paths, similar to paths in a file system. Each path represents the hierarchical position of a node in the tree.

```js-vue
gods = {{JSON.stringify(gods, null, 2)}}
```

:::tip
Given a text file, you can use `text.split("\n")` to split the contents into multiple lines.
:::

## Tree options

The following options control how the tabular data is organized into a hierarchy:

* **path** - a column specifying each node’s hierarchy location; defaults to identity
* **delimiter** - the path separator, a single character; defaults to forward slash (/)

The **path** column is typically slash-separated, as with UNIX-based file systems or URLs.

The following options control how the node-link diagram is laid out:

* **treeLayout** - a tree layout algorithm; defaults to [d3.tree](https://d3js.org/d3-hierarchy/tree)
* **treeAnchor** - a tree layout orientation, either *left* or *right*; defaults to *left*
* **treeSort** - a node comparator, or null to preserve input order
* **treeSeparation** - a node separation function, or null for uniform separation

The default **treeLayout** implements the Reingold–Tilford “tidy” algorithm based on Buchheim _et al._’s linear time approach. Use [d3.cluster](https://d3js.org/d3-hierarchy/cluster) instead to align leaf nodes; see also the [cluster mark](../marks/tree.md#cluster).

If **treeAnchor** is *left*, the root of the tree will be aligned with the left side of the frame; if **treeAnchor** is *right*, the root of the tree will be aligned with the right side of the frame; use the **insetLeft** and **insetRight** [scale options](../features/scales.md) if horizontal padding is desired, say to make room for labels.

If the **treeSort** option is not null, it is typically a function that is passed two nodes in the hierarchy and compares them, similar to [_array_.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort); see [d3-hierarchy’s _node_.sort](https://d3js.org/d3-hierarchy/hierarchy#node_sort) for more. The **treeSort** option can also be specified as a string, in which case it refers either to a named column in data, or if it starts with “node:”, a node value.

If the **treeSeparation** is not null, it is a function that is passed two nodes in the hierarchy and returns the desired (relative) amount of separation; see [d3-hierarchy’s _tree_.separation](https://d3js.org/d3-hierarchy/tree#tree_separation) for more. By default, non-siblings are at least twice as far apart as siblings.

## treeNode(*options*) {#treeNode}

Populates **x** and **y** with the positions for each node in the tree. The default **frameAnchor** inherits the **treeAnchor**. This transform is often used with the [dot](../marks/dot.md) or [text](../marks/text.md) mark.

The treeNode transform will derive output columns for any *options* that have one of the following named node values:

* *node:name* - the node’s name (the last part of its path)
* *node:path* - the node’s full, normalized, slash-separated path
* *node:internal* - true if the node is internal, or false for leaves
* *node:external* - true if the node is a leaf, or false for internal nodes
* *node:depth* - the distance from the node to the root
* *node:height* - the distance from the node to its deepest descendant

In addition, if any option value is specified as an object with a **node** method, a derived output column will be generated by invoking the **node** method for each node in the tree.

## treeLink(*options*) {#treeLink}

Populates **x1**, **y1**, **x2**, and **y2** with the positions for each link in the tree, where **x1** & **y1** represents the position of the parent node and **x2** & **y2** the position of the child node. The default **curve** is *bump-x*, the default **stroke** is #555, the default **strokeWidth** is 1.5, and the default **strokeOpacity** is 0.5. This transform is often used with the [link](../marks/link.md) or [arrow](../marks/arrow.md) mark.

The treeLink transform will likewise derive output columns for any *options* that have one of the following named link values:

* *node:name* - the child node’s name (the last part of its path)
* *node:path* - the child node’s full, normalized, slash-separated path
* *node:internal* - true if the child node is internal, or false for leaves
* *node:external* - true if the child node is a leaf, or false for internal nodes
* *node:depth* - the distance from the child node to the root
* *node:height* - the distance from the child node to its deepest descendant
* *parent:name* - the parent node’s name (the last part of its path)
* *parent:path* - the parent node’s full, normalized, slash-separated path
* *parent:depth* - the distance from the parent node to the root
* *parent:height* - the distance from the parent node to its deepest descendant

In addition, if any option value is specified as an object with a **node** method, a derived output column will be generated by invoking the **node** method for each child node in the tree; likewise if any option value is specified as an object with a **link** method, a derived output column will be generated by invoking the **link** method for each link in the tree, being passed two node arguments, the child and the parent.

# docs/transforms/window.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref, shallowRef, onMounted} from "vue";
import sftemp from "../data/sf-temperatures.ts";

const k = ref(7);
const loss = ref(0.01);
const anchor = ref("end");
const strict = ref(true);
const reduce = ref("mean");
const bls = shallowRef([]);

onMounted(() => {
  d3.csv("../data/bls-metro-unemployment.csv", d3.autoType).then((data) => (bls.value = data));
});

</script>

# Window transform

The **window transform** is a specialized [map transform](./map.md) that computes a moving window and then derives summary statistics from the current window, say to compute rolling averages, rolling minimums, or rolling maximums.

For example, the band chart below shows the daily high and low temperature in San Francisco. The <span style="border-bottom: solid 2px var(--vp-c-red)">red</span> line represents the {{k}}-day average high, and the <span style="border-bottom: solid 2px var(--vp-c-blue)">blue</span> line the {{k}}-day average low.

<p>
  <label class="label-input">
    <span>Window size (k):</span>
    <input type="range" v-model.number="k" min="1" max="100" step="1" />
    <span style="font-variant-numeric: tabular-nums;">{{k.toLocaleString("en-US")}}</span>
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-window-line-area
```js
Plot.plot({
  y: {
    grid: true,
    label: "Temperature (°F)"
  },
  marks: [
    Plot.areaY(sftemp, {x: "date", y1: "low", y2: "high", fillOpacity: 0.3}),
    Plot.lineY(sftemp, Plot.windowY(k, {x: "date", y: "low", stroke: "blue"})),
    Plot.lineY(sftemp, Plot.windowY(k, {x: "date", y: "high", stroke: "red"}))
  ]
})
```
:::

The **k** option specifies the window size: the number of consecutive elements in the rolling window. A larger window for the rolling mean above produces a smoother curve.

The **anchor** specifies how to align the rolling window with the data. If *middle* (the default), the window is centered around the current data point; for time-series data, this means the window will incorporate values from the future as well as the past. Setting **anchor** to *end* will compute a trailing moving average.

<p>
  <span class="label-input">
    Anchor:
    <label style="margin-left: 0.5em;">
      <input type="radio" name="anchor" value="start" v-model="anchor" /> start
    </label>
    <label style="margin-left: 0.5em;">
      <input type="radio" name="anchor" value="middle" v-model="anchor" /> middle
    </label>
    <label style="margin-left: 0.5em;">
      <input type="radio" name="anchor" value="end" v-model="anchor" /> end
    </label>
  </span>
</p>

:::plot https://observablehq.com/@observablehq/plot-window-anchor
```js
Plot.plot({
  y: {
    grid: true,
    label: "Temperature (°F)"
  },
  marks: [
    Plot.lineY(sftemp, {x: "date", y: "high", strokeOpacity: 0.3}),
    Plot.lineY(sftemp, Plot.windowY({k: 28, anchor}, {x: "date", y: "high"}))
  ]
})
```
:::

The window transform uses input order, not natural order by value, to determine the meaning of *start* and *end*. When the data is in reverse chronological order, the meaning of *start* and *end* is effectively reversed because the first data point is the most recent. Use a [sort transform](./sort.md) to change the order as needed.

If **strict** is false (the default), the window size is effectively reduced at the start or end of each series or both, depending on the **anchor**. Values computed with a truncated window may be noisy; if you would prefer to not show this data instead, set the **strict** option to true. <VersionBadge version="0.6.0" /> The **strict** option can also have a dramatic effect if some data is missing: when strict, the reducer will be skipped if any of the values in the current window are null, undefined, or NaN.

<p>
  <label class="label-input">
    Strict:
    <input type="checkbox" v-model="strict" />
  </label>
</p>

:::plot https://observablehq.com/@observablehq/plot-window-anchor
```js
Plot.plot({
  y: {
    grid: true,
    label: "Temperature (°F)"
  },
  marks: [
    Plot.lineY(sftemp, {x: "date", y: "low", strokeOpacity: 0.3}),
    Plot.lineY(sftemp, Plot.windowY({k: 28, anchor: "end", strict}, {x: "date", y: "low"}))
  ]
})
```
:::

The **reduce** option specifies how to compute the output value for the current window. It defaults to *mean* for a rolling average. Below, the rolling <span style="border-bottom: solid 2px var(--vp-c-blue)">minimum</span>, <span style="border-bottom: solid 2px var(--vp-c-red)">maximum</span>, and <span style="border-bottom: solid 2px;">median</span> are shown. The window transform supports most of the same reducers as [bin](./bin.md) and [group](./group.md), and you can implement a custom reducer as a function if needed.

:::plot https://observablehq.com/@observablehq/plot-window-reduce
```js
Plot.plot({
  y: {
    grid: true,
    label: "Temperature (°F)"
  },
marks: [
    Plot.lineY(sftemp, {x: "date", y: "low", strokeOpacity: 0.3}),
    Plot.lineY(sftemp, Plot.windowY({k: 28, reduce: "min"}, {x: "date", y: "low", stroke: "blue"})),
    Plot.lineY(sftemp, Plot.windowY({k: 28, reduce: "max"}, {x: "date", y: "low", stroke: "red"})),
    Plot.lineY(sftemp, Plot.windowY({k: 28, reduce: "median"}, {x: "date", y: "low"}))
  ]
})
```
:::

While the windowY transform derives **y** (and **y1** and **y2**), and the windowX transform likewise derives **x**, **x1**, and **x2**, you can use the [map transform](./map.md) directly for other channels. For example, the chart below uses a variable **stroke** to encode slope: the monthly change in unemployment rate for each metropolitan division. The slope is computed with a window of size 2 and the *difference* reducer.

:::plot defer https://observablehq.com/@observablehq/plot-window-and-map
```js
Plot.plot({
  y: {grid: true},
  color: {scheme: "BuYlRd", domain: [-0.5, 0.5]},
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(
      bls,
      Plot.map(
        {stroke: Plot.window({k: 2, reduce: "difference"})},
        {x: "date", y: "unemployment", z: "division", stroke: "unemployment"}
      )
    ),
  ]
})
```
:::

As shown above, the window transform also understands the **z** channel: each metropolitan division is treated as a separate series.

## Window options

The window transform supports the following options:

* **k** - the window size (the number of elements in the window)
* **anchor** - how to align the window: *start*, *middle* (default), or *end*
* **reduce** - the window reducer; defaults to *mean*
* **strict** - if true, output undefined if any window value is undefined; defaults to false

If the **strict** option is false (the default), the window will be automatically truncated as needed, and undefined input values are ignored. For example, if **k** is 24 and **anchor** is *middle*, then the initial 11 values have effective window sizes of 13, 14, 15, … 23, and likewise the last 12 values have effective window sizes of 23, 22, 21, … 12. Values computed with a truncated window may be noisy; if you would prefer to not show this data, set the **strict** option to true.

If the **strict** option is true, the output start values or end values or both (depending on the **anchor**) of each series may be undefined since there are not enough elements to create a window of size **k**; output values may also be undefined if some of the input values in the corresponding window are undefined.

The following named reducers are supported:

* *min* - the minimum
* *max* - the maximum
* *mean* - the mean (average)
* *median* - the median
* *mode* - the mode (most common occurrence)
* *pXX* - the percentile value, where XX is a number in [00,99]
* *sum* - the sum of values
* *deviation* - the standard deviation
* *variance* - the variance per [Welford’s algorithm](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford's_online_algorithm)
* *difference* - the difference between the last and first window value
* *ratio* - the ratio of the last and first window value
* *first* - the first value
* *last* - the last value

A reducer may also be specified as a function to be passed an index of size **k** and the corresponding input channel array; or if the function only takes one argument, an array of **k** values.

## window(*k*) <VersionBadge version="0.2.3" /> {#window}

```js
Plot.map({y: Plot.window(24)}, {x: "Date", y: "Close", stroke: "Symbol"})
```

Returns a window map method for the given window size *k*, suitable for use with Plot.map. For additional options to the window transform, replace the number *k* with an object with properties **k**, **anchor**, **reduce**, or **strict**.

## windowX(*k*, *options*) {#windowX}

```js
Plot.windowX(24, {y: "Date", x: "Anomaly"})
```

Like [mapX](./map.md#mapX), but applies the window map method with the given window size *k*. For additional options to the window transform, replace the number *k* with an object with properties **k**, **anchor**, or **reduce**.

## windowY(*k*, *options*) {#windowY}

```js
Plot.windowY(24, {x: "Date", y: "Anomaly"})
```

Like [mapY](./map.md#mapY), but applies the window map method with the given window size *k*. For additional options to the window transform, replace the number *k* with an object with properties **k**, **anchor**, or **reduce**.

# docs/what-is-plot.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {computed, onMounted, shallowRef} from "vue";
import {useData} from "vitepress";
import PlotRender from "./components/PlotRender.js";

const olympians = shallowRef([
  {weight: 31, height: 1.21, sex: "female"},
  {weight: 170, height: 2.21, sex: "male"}
]);

onMounted(() => {
  d3.csv("./data/athletes.csv", d3.autoType).then((data) => (olympians.value = data));
});

const {site: {value: {themeConfig: {sidebar}}}} = useData();

const paths = computed(() => {
  const paths = [];
  (function visit(node, path) {
    paths.push({path, link: node.link && `.${node.link}`});
    if (node.items) {
      for (const item of node.items) {
        visit(item, (path === "/" ? path : path + "/") + item.text);
      }
    }
  })({items: sidebar}, "/Plot");
  return paths;
});

// https://github.com/observablehq/plot/issues/1703
function computeTreeWidth(paths) {
  const root = d3.tree().nodeSize([1, 1])(d3.stratify().path((d) => d.path)(paths));
  const [x1, x2] = d3.extent(root, (d) => d.x);
  return x2 - x1;
}

</script>

# What is Plot?

**Observable Plot** is a free, open-source, JavaScript library for visualizing tabular data, focused on accelerating exploratory data analysis. It has a concise, memorable, yet expressive interface, featuring [scales](./features/scales.md) and [layered marks](./features/marks.md) in the *grammar of graphics* style popularized by [Leland Wilkinson](https://en.wikipedia.org/wiki/Leland_Wilkinson) and [Hadley Wickham](https://en.wikipedia.org/wiki/Hadley_Wickham) and inspired by the earlier ideas of [Jacques Bertin](https://en.wikipedia.org/wiki/Jacques_Bertin). And there are [plenty of examples](https://observablehq.com/@observablehq/plot-gallery) to learn from and copy-paste.

In the spirit of *show don’t tell*, here’s a scatterplot of body measurements of athletes from the [2016 Summer Olympics](https://flother.is/2017/olympic-games-data/).

:::plot defer https://observablehq.com/@observablehq/plot-olympians-scatterplot
```js
Plot
  .dot(olympians, {x: "weight", y: "height", stroke: "sex"})
  .plot({color: {legend: true}})
```
:::

A plot specification assigns columns of data (*weight*, *height*, and *sex*) to visual properties of marks (**x**, **y**, and **stroke**). Plot does the rest! You can configure much more, if needed, but Plot’s goal is to help you get a meaningful visualization quickly to accelerate analysis.

This scatterplot suffers from overplotting: many dots are drawn in the same spot, so it’s hard to perceive density. We can fix this by applying a [bin transform](./transforms/bin.md) to group athletes of similar height and weight (and sex), and then use opacity to encode the number of athletes in the bin.

:::plot defer https://observablehq.com/@observablehq/plot-olympians-bins
```js
Plot.rect(olympians, Plot.bin({fillOpacity: "count"}, {x: "weight", y: "height", fill: "sex", inset: 0})).plot()
```
:::

Or we could try the [density mark](./marks/density.md).

:::plot defer https://observablehq.com/@observablehq/plot-olympians-density
```js
Plot.density(olympians, {x: "weight", y: "height", stroke: "sex"}).plot()
```
:::

A simpler take on this data is to focus on one dimension: weight. We can use the bin transform again to make a histogram with weight on the *x*-axis and frequency on the *y*-axis. This plot uses a [rect mark](./marks/rect.md) and an implicit [stack transform](./transforms/stack.md).

:::plot defer https://observablehq.com/@observablehq/plot-vertical-histogram
```js
Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", fill: "sex"})).plot()
```
:::

Or if we’d prefer to show the two distributions separately as small multiples, we can [facet](./features/facets.md) the data along *y* (keeping the *fill* encoding for consistency, and adding grid lines and a rule at *y* = 0 to improve readability).

:::plot defer https://observablehq.com/@observablehq/plot-faceted-histogram
```js
Plot.plot({
  grid: true,
  marks: [
    Plot.rectY(olympians, Plot.binX({y: "count"}, {x: "weight", fill: "sex", fy: "sex"})),
    Plot.ruleY([0])
  ]
})
```
:::

## What can Plot do?

Because marks are composable, and because you can extend Plot with custom marks, you can make almost anything with it — much more than the charts above! The following [tree diagram](./marks/tree.md) of the documentation gives a sense of what’s ”in the box” with Plot. Peruse our [gallery of examples](https://observablehq.com/@observablehq/plot-gallery) for more inspiration.

<PlotRender :options='{
  axis: null,
  height: computeTreeWidth(paths) * 12,
  marginTop: 4,
  marginRight: 120,
  marginBottom: 4,
  marginLeft: 24,
  marks: [
    Plot.tree(paths, {path: "path", textStroke: "var(--vp-c-bg)", channels: {href: {value: "link", filter: null}}, treeSort: null})
  ]
}' />

# docs/why-plot.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import aapl from "./data/aapl.ts";
import penguins from "./data/penguins.ts";

function arealineY(data, {color, fillOpacity = 0.1, ...options} = {}) {
  return Plot.marks(
    Plot.ruleY([0]),
    Plot.areaY(data, {fill: color, fillOpacity, ...options}),
    Plot.lineY(data, {stroke: color, ...options})
  );
}

</script>

# Why Plot?

**Observable Plot** is for exploratory data visualization. It’s for finding insights quickly. Its API, while expressive and configurable, optimizes for conciseness and memorability. We want the time to first chart to be as fast as possible.

And the speed doesn’t stop there: Plot helps you quickly pivot and refine your views of data. Our hope with Plot is that you’ll spend less time reading the docs, searching for code to copy-paste, and debugging — and more time asking questions of data.

Compared to other visualization tools, including low-level tools such as D3 and less expressive high-level tools such as chart templates, we think you’ll be more productive exploring data with Plot. You’ll spend more time “using vision to think” and less time wrangling the machinery of programming.

Or put more simply: **with Plot, you’ll see more charts.**

## Plot is concise

You can make a meaningful chart in Plot with as little as one line of code.

:::plot https://observablehq.com/@observablehq/color-scatterplot
```js
Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", stroke: "species"}).plot()
```
:::

What makes Plot concise? In a word: *defaults*. If you specify the semantics — your data and the desired encodings — Plot will figure out the rest.

The beauty of defaults is that you can override them as needed. This is ideal for exploring: you invest minimally in the initial chart, and as you start to see something interesting, you progressively customize to improve the display. Perhaps the plot above would be easier to read with an aspect ratio proportional to the data, a grid, and a legend?

:::plot https://observablehq.com/@observablehq/plot-refined-color-scatterplot
```js
Plot.plot({
  grid: true,
  aspectRatio: 1,
  inset: 10,
  x: {tickSpacing: 80, label: "Culmen length (mm)"},
  y: {tickSpacing: 80, label: "Culmen depth (mm)"},
  color: {legend: true},
  marks: [
    Plot.frame(),
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm", stroke: "species"})
  ]
})
```
:::

## Plot transforms data

Munging data, not visualizing it, is often most of the work of data analysis. Plot’s [transforms](./features/transforms.md) let you aggregate and derive data *within* your plot specification, reducing the time spent preparing data. For example, if you have a dataset of penguins, you can quickly count their frequency by *species* with the [group transform](./transforms/group.md).

:::plot https://observablehq.com/@observablehq/plot-groupy-transform
```js
Plot.plot({
  marginLeft: 80,
  marginRight: 80,
  marks: [
    Plot.barX(penguins, Plot.groupY({x: "count"}, {y: "species"})),
    Plot.ruleX([0])
  ]
})
```
:::

Because transforms are integrated into Plot, they work automatically with other Plot features such as [faceting](./features/facets.md). For example, to breakdown the chart above by *island*, we just add the **fy** (vertical facet) option.

:::plot https://observablehq.com/@observablehq/plot-groupy-transform/2
```js
Plot.plot({
  marginLeft: 80,
  marginRight: 80,
  marks: [
    Plot.barX(penguins, Plot.groupY({x: "count"}, {fy: "island", y: "species"})),
    Plot.ruleX([0])
  ]
})
```
:::

And to color by *sex*, too? Add **fill**; the [bar mark](./marks/bar.md) then applies an implicit [stack transform](./transforms/stack.md).

:::plot https://observablehq.com/@observablehq/plot-groupy-transform/3
```js
Plot.plot({
  marginLeft: 80,
  marginRight: 80,
  color: {legend: true},
  marks: [
    Plot.barX(penguins, Plot.groupY({x: "count"}, {fy: "island", y: "species", fill: "sex"})),
    Plot.ruleX([0])
  ]
})
```
:::

Plot’s transforms can do powerful things, including [normalizing series](./transforms/normalize.md), computing [moving averages](./transforms/window.md), laying out [trees](./marks/tree.md), [dodging](./transforms/dodge.md), and [hexagonal binning](./transforms/hexbin.md).

## Plot is composable

Simple components gain power through composition, such as layering multiple [marks](./features/marks.md) into a single plot. Plot makes it easy to define custom composite marks, such as this one comprising a rule, area, and line:

```js
function arealineY(data, {color, fillOpacity = 0.1, ...options} = {}) {
  return Plot.marks(
    Plot.ruleY([0]),
    Plot.areaY(data, {fill: color, fillOpacity, ...options}),
    Plot.lineY(data, {stroke: color, ...options})
  );
}
```

You can use this composite mark like any built-in mark:

:::plot https://observablehq.com/@observablehq/plot-arealiney-custom-mark
```js
arealineY(aapl, {x: "Date", y: "Close", color: "blue"}).plot()
```
:::

Plot uses this technique internally: the [axis mark](./marks/axis.md) and [box mark](./marks/box.md) are both composite marks.

:::plot https://observablehq.com/@observablehq/plot-penguins-horizontal-box-plot
```js
Plot.boxX(penguins, {x: "body_mass_g", y: "species"}).plot({marginLeft: 60, y: {label: null}})
```
:::

Plot’s [transforms](./features/transforms.md) are composable, too: to apply multiple transforms, you simply pass the *options* from one transform to the next. Some marks even apply implicit transforms, say for [stacking](./transforms/stack.md) or [binning](./transforms/bin.md) as shown [above](#plot-transforms-data). Mark options are plain JavaScript objects, so you can also share options across marks and inspect them to debug.

## Plot is extensible

Plot isn’t a new language; it’s “just” vanilla JavaScript. Plot embraces JavaScript, letting you plug in your own functions for accessors, reducers, transforms… even custom marks! And Plot generates SVG, so you can style it with CSS and manipulate it just like you do with D3. (See [Mike Freeman’s tooltip plugin](https://observablehq.com/@mkfreeman/plot-tooltip) for a great example of extending Plot this way.)

## Plot builds on D3

Plot is informed by our more than [ten years’ experience](https://observablehq.com/@mbostock/10-years-of-open-source-visualization) developing [D3](https://d3js.org), the web’s most popular library for data visualization.

Plot uses D3 to implement a wide variety of features:

- scales (ticks, color schemes, number formatting)
- shapes (areas, lines, curves, symbols, stacks)
- planar geometry (Delaunay, Voronoi, contours, density estimation)
- spherical geometry (geographic projections)
- data manipulation (group, rollup, bin, statistics)
- tree diagrams
- … and more!

If you already know some D3, you’ll find many parts of Plot familiar.

We’ve long said that *D3 makes things possible, not necessarily easy.* And that’s true regardless of the task at hand. D3 makes hard and amazing things *possible*, yes, but even simple things that should be easy are often not. To paraphrase Amanda Cox: “Use D3 if you think it’s perfectly normal to write a hundred lines of code for a bar chart.”

**Plot’s goal is to make the easy things easy, and fast, and then some.**

:::tip
Whether or not Plot succeeds at this goal is up to you — so we’d love [your feedback](https://github.com/observablehq/plot/discussions/new/choose) on what you find easy or hard to do with Plot. And we encourage you to [ask for help](https://github.com/observablehq/plot/discussions/categories/q-a) when you get stuck. We learn a lot from helping!
:::

Since Plot and D3 have different goals, they make different trade-offs. Plot is more efficient: you can make charts quickly. But it is also necessarily less expressive: bespoke visualizations with extensive animation and interaction, advanced techniques like force-directed graph layout, or even developing your own charting library, are better done with D3’s low-level API.

We recommend D3 for *bespoke* data visualizations, if you decide the extra expressiveness of D3 is worth the time and effort. D3 makes sense for media organizations such as *The New York Times* or *The Pudding*, where a single graphic may be seen by a million readers, and where a team of editors can work together to advance the state of the art in visual communication; but is it the best tool for building your team’s private dashboard, or a one-off analysis? You may be surprised how far you can get with Plot.
