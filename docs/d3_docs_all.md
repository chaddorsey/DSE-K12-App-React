
# docs/api.md

---
next: false
outline: 2
---

# API index

D3 is a collection of modules that are designed to work together; you can use the modules independently, or you can use them together as part of the default build.

## [d3-array](./d3-array.md)

Array manipulation, ordering, searching, summarizing, *etc.*

### [Add](./d3-array/add.md)

Add floating point values with full precision.

* [new Adder](./d3-array/add.md#Adder) - create a full precision adder.
* [*adder*.add](./d3-array/add.md#adder_add) - add a value to an adder.
* [*adder*.valueOf](./d3-array/add.md#adder_valueOf) - get the double-precision representation of an adder’s value.
* [fcumsum](./d3-array/add.md#fcumsum) - compute a full precision cumulative summation of numbers.
* [fsum](./d3-array/add.md#fsum) - compute a full precision summation of an iterable of numbers.

### [Bin](./d3-array/bin.md)

Bin discrete samples into continuous, non-overlapping intervals.

* [bin](./d3-array/bin.md#bin) - create a new bin generator.
* [*bin*](./d3-array/bin.md#_bin) - bins a given array of samples.
* [*bin*.value](./d3-array/bin.md#bin_value) - specify a value accessor for each sample.
* [*bin*.domain](./d3-array/bin.md#bin_domain) - specify the interval of observable values.
* [*bin*.thresholds](./d3-array/bin.md#bin_thresholds) - specify how values are divided into bins.
* [thresholdFreedmanDiaconis](./d3-array/bin.md#thresholdFreedmanDiaconis) - the Freedman–Diaconis binning rule.
* [thresholdScott](./d3-array/bin.md#thresholdScott) - Scott’s normal reference binning rule.
* [thresholdSturges](./d3-array/bin.md#thresholdSturges) - Sturges’ binning formula.

### [Bisect](./d3-array/bisect.md)

Quickly find a value in a sorted array.

* [bisector](./d3-array/bisect.md#bisector) - bisect using an accessor or comparator.
* [*bisector*.right](./d3-array/bisect.md#bisector_right) - bisectRight, with the given comparator.
* [*bisector*.left](./d3-array/bisect.md#bisector_left) - bisectLeft, with the given comparator.
* [*bisector*.center](./d3-array/bisect.md#bisector_center) - binary search for a value in a sorted array.
* [bisect](./d3-array/bisect.md#bisect) - binary search for a value in a sorted array.
* [bisectRight](./d3-array/bisect.md#bisectRight) - binary search for a value in a sorted array.
* [bisectLeft](./d3-array/bisect.md#bisectLeft) - binary search for a value in a sorted array.
* [bisectCenter](./d3-array/bisect.md#bisectCenter) - binary search for a value in a sorted array.

### [Blur](./d3-array/blur.md)

Blur quantitative values in one or two dimensions.

* [d3.blur](./d3-array/blur.md#blur) - blur an array of numbers in place.
* [d3.blur2](./d3-array/blur.md#blur2) - blur a two-dimensional array of numbers in place.
* [d3.blurImage](./d3-array/blur.md#blurImage) - blur an RGBA ImageData in place.

### [Group](./d3-array/group.md)

Group discrete values.

* [d3.group](./d3-array/group.md#group) - group an iterable into a nested Map.
* [d3.groups](./d3-array/group.md#groups) - group an iterable into a nested array.
* [d3.rollup](./d3-array/group.md#rollup) - reduce an iterable into a nested Map.
* [d3.rollups](./d3-array/group.md#rollups) - reduce an iterable into a nested array.
* [d3.index](./d3-array/group.md#index) - index an iterable into a nested Map.
* [d3.indexes](./d3-array/group.md#indexes) - index an iterable into a nested array.
* [d3.flatGroup](./d3-array/group.md#flatGroup) - group an iterable into a flat array.
* [d3.flatRollup](./d3-array/group.md#flatRollup) - reduce an iterable into a flat array.
* [d3.groupSort](./d3-array/group.md#groupSort) - sort keys according to grouped values.

### [Intern](./d3-array/intern.md)

Create maps and sets with non-primitive values such as dates.

* [new InternMap](./d3-array/intern.md#InternMap) - a key-interning Map.
* [new InternSet](./d3-array/intern.md#InternSet) - a value-interning Set.

### [Sets](./d3-array/sets.md)

Logical operations on sets.

* [d3.difference](./d3-array/sets.md#difference) - compute a set difference.
* [d3.disjoint](./d3-array/sets.md#disjoint) - test whether two sets are disjoint.
* [d3.intersection](./d3-array/sets.md#intersection) - compute a set intersection.
* [d3.superset](./d3-array/sets.md#superset) - test whether a set is a superset of another.
* [d3.subset](./d3-array/sets.md#subset) - test whether a set is a subset of another.
* [d3.union](./d3-array/sets.md#union) - compute a set union.

### [Sort](./d3-array/sort.md)

Sort and reorder arrays of values.

* [d3.ascending](./d3-array/sort.md#ascending) - compute the natural order of two values.
* [d3.descending](./d3-array/sort.md#descending) - compute the natural order of two values.
* [d3.permute](./d3-array/sort.md#permute) - reorder an iterable of elements according to an iterable of indexes.
* [d3.quickselect](./d3-array/sort.md#quickselect) - reorder an array of numbers.
* [d3.reverse](./d3-array/sort.md#reverse) - reverse the order of values.
* [d3.shuffle](./d3-array/sort.md#shuffle) - randomize the order of an iterable.
* [d3.shuffler](./d3-array/sort.md#shuffler) - randomize the order of an iterable.
* [d3.sort](./d3-array/sort.md#sort) - sort values.

### [Summarize](./d3-array/summarize.md)

Compute summary statistics.

* [d3.count](./d3-array/summarize.md#count) - count valid number values in an iterable.
* [d3.min](./d3-array/summarize.md#min) - compute the minimum value in an iterable.
* [d3.minIndex](./d3-array/summarize.md#minIndex) - compute the index of the minimum value in an iterable.
* [d3.max](./d3-array/summarize.md#max) - compute the maximum value in an iterable.
* [d3.maxIndex](./d3-array/summarize.md#maxIndex) - compute the index of the maximum value in an iterable.
* [d3.least](./d3-array/summarize.md#least) - returns the least element of an iterable.
* [d3.leastIndex](./d3-array/summarize.md#leastIndex) - returns the index of the least element of an iterable.
* [d3.greatest](./d3-array/summarize.md#greatest) - returns the greatest element of an iterable.
* [d3.greatestIndex](./d3-array/summarize.md#greatestIndex) - returns the index of the greatest element of an iterable.
* [d3.extent](./d3-array/summarize.md#extent) - compute the minimum and maximum value in an iterable.
* [d3.mode](./d3-array/summarize.md#mode) - compute the mode (the most common value) of an iterable of numbers.
* [d3.sum](./d3-array/summarize.md#sum) - compute the sum of an iterable of numbers.
* [d3.mean](./d3-array/summarize.md#mean) - compute the arithmetic mean of an iterable of numbers.
* [d3.median](./d3-array/summarize.md#median) - compute the median of an iterable of numbers (the 0.5-quantile).
* [d3.medianIndex](./d3-array/summarize.md#median) - compute the median index of an iterable of numbers (the 0.5-quantile).
* [d3.cumsum](./d3-array/summarize.md#cumsum) - compute the cumulative sum of an iterable.
* [d3.quantile](./d3-array/summarize.md#quantile) - compute a quantile for an iterable of numbers.
* [d3.quantileIndex](./d3-array/summarize.md#quantileIndex) - compute a quantile index for an iterable of numbers.
* [d3.quantileSorted](./d3-array/summarize.md#quantileSorted) - compute a quantile for a sorted array of numbers.
* [d3.rank](./d3-array/summarize.md#rank) - compute the rank order of an iterable.
* [d3.variance](./d3-array/summarize.md#variance) - compute the variance of an iterable of numbers.
* [d3.deviation](./d3-array/summarize.md#deviation) - compute the standard deviation of an iterable of numbers.
* [d3.every](./d3-array/summarize.md#every) - test if all values satisfy a condition.
* [d3.some](./d3-array/summarize.md#some) - test if any value satisfies a condition.

### [Ticks](./d3-array/ticks.md)

Generate representative values from a continuous interval.

* [d3.ticks](./d3-array/ticks.md#ticks) - generate representative values from a numeric interval.
* [d3.tickIncrement](./d3-array/ticks.md#tickIncrement) - generate representative values from a numeric interval.
* [d3.tickStep](./d3-array/ticks.md#tickStep) - generate representative values from a numeric interval.
* [d3.nice](./d3-array/ticks.md#nice) - extend an interval to align with ticks.
* [d3.range](./d3-array/ticks.md#range) - generate a range of numeric values.

### [Transform](./d3-array/transform.md)

Derive new arrays.

* [d3.cross](./d3-array/transform.md#cross) - compute the Cartesian product of two iterables.
* [d3.merge](./d3-array/transform.md#merge) - merge multiple iterables into one array.
* [d3.pairs](./d3-array/transform.md#pairs) - create an array of adjacent pairs of elements.
* [d3.transpose](./d3-array/transform.md#transpose) - transpose an array of arrays.
* [d3.zip](./d3-array/transform.md#zip) - transpose a variable number of arrays.
* [d3.filter](./d3-array/transform.md#filter) - filter values.
* [d3.map](./d3-array/transform.md#map) - map values.
* [d3.reduce](./d3-array/transform.md#reduce) - reduce values.

## [d3-axis](./d3-axis.md)

Human-readable reference marks for scales.

* [d3.axisTop](./d3-axis.md#axisTop) - create a new top-oriented axis generator.
* [d3.axisRight](./d3-axis.md#axisRight) - create a new right-oriented axis generator.
* [d3.axisBottom](./d3-axis.md#axisBottom) - create a new bottom-oriented axis generator.
* [d3.axisLeft](./d3-axis.md#axisLeft) - create a new left-oriented axis generator.
* [*axis*](./d3-axis.md#_axis) - generate an axis for the given selection.
* [*axis*.scale](./d3-axis.md#axis_scale) - set the scale.
* [*axis*.ticks](./d3-axis.md#axis_ticks) - customize how ticks are generated and formatted.
* [*axis*.tickArguments](./d3-axis.md#axis_tickArguments) - customize how ticks are generated and formatted.
* [*axis*.tickValues](./d3-axis.md#axis_tickValues) - set the tick values explicitly.
* [*axis*.tickFormat](./d3-axis.md#axis_tickFormat) - set the tick format explicitly.
* [*axis*.tickSize](./d3-axis.md#axis_tickSize) - set the size of the ticks.
* [*axis*.tickSizeInner](./d3-axis.md#axis_tickSizeInner) - set the size of inner ticks.
* [*axis*.tickSizeOuter](./d3-axis.md#axis_tickSizeOuter) - set the size of outer (extent) ticks.
* [*axis*.tickPadding](./d3-axis.md#axis_tickPadding) - set the padding between ticks and labels.
* [*axis*.offset](./d3-axis.md#axis_offset) - set the pixel offset for crisp edges.

## [d3-brush](./d3-brush.md)

Select a one- or two-dimensional region using the mouse or touch.

* [d3.brush](./d3-brush.md#brush) - create a new two-dimensional brush.
* [d3.brushX](./d3-brush.md#brushX) - create a brush along the *x*-dimension.
* [d3.brushY](./d3-brush.md#brushY) - create a brush along the *y*-dimension.
* [*brush*](./d3-brush.md#_brush) - apply the brush to a selection.
* [*brush*.move](./d3-brush.md#brush_move) - move the brush selection.
* [*brush*.clear](./d3-brush.md#brush_clear) - clear the brush selection.
* [*brush*.extent](./d3-brush.md#brush_extent) - define the brushable region.
* [*brush*.filter](./d3-brush.md#brush_filter) - control which input events initiate brushing.
* [*brush*.touchable](./d3-brush.md#brush_touchable) - set the touch support detector.
* [*brush*.keyModifiers](./d3-brush.md#brush_keyModifiers) - enable or disable key interaction.
* [*brush*.handleSize](./d3-brush.md#brush_handleSize) - set the size of the brush handles.
* [*brush*.on](./d3-brush.md#brush_on) - listen for brush events.
* [d3.brushSelection](./d3-brush.md#brushSelection) - get the brush selection for a given node.

## [d3-chord](./d3-chord.md)

* [d3.chord](./d3-chord/chord.md#chord) - create a new chord layout.
* [*chord*](./d3-chord/chord.md#_chord) - compute the layout for the given matrix.
* [*chord*.padAngle](./d3-chord/chord.md#chord_padAngle) - set the padding between adjacent groups.
* [*chord*.sortGroups](./d3-chord/chord.md#chord_sortGroups) - define the group order.
* [*chord*.sortSubgroups](./d3-chord/chord.md#chord_sortSubgroups) - define the source and target order within groups.
* [*chord*.sortChords](./d3-chord/chord.md#chord_sortChords) - define the chord order across groups.
* [d3.chordDirected](./d3-chord/chord.md#chordDirected) - create a directed chord generator.
* [d3.chordTranspose](./d3-chord/chord.md#chordTranspose) - create a transposed chord generator.
* [d3.ribbon](./d3-chord/ribbon.md#ribbon) - create a ribbon shape generator.
* [*ribbon*](./d3-chord/ribbon.md#_ribbon) - generate a ribbon shape.
* [*ribbon*.source](./d3-chord/ribbon.md#ribbon_source) - set the source accessor.
* [*ribbon*.target](./d3-chord/ribbon.md#ribbon_target) - set the target accessor.
* [*ribbon*.radius](./d3-chord/ribbon.md#ribbon_radius) - set the ribbon source and target radius.
* [*ribbon*.sourceRadius](./d3-chord/ribbon.md#ribbon_sourceRadius) - set the ribbon source radius.
* [*ribbon*.targetRadius](./d3-chord/ribbon.md#ribbon_targetRadius) - set the ribbon target radius.
* [*ribbon*.startAngle](./d3-chord/ribbon.md#ribbon_startAngle) - set the ribbon source or target start angle.
* [*ribbon*.endAngle](./d3-chord/ribbon.md#ribbon_endAngle) - set the ribbon source or target end angle.
* [*ribbon*.padAngle](./d3-chord/ribbon.md#ribbon_padAngle) - set the pad angle accessor.
* [*ribbon*.context](./d3-chord/ribbon.md#ribbon_context) - set the render context.
* [d3.ribbonArrow](./d3-chord/ribbon.md#ribbonArrow) - create an arrow ribbon generator.
* [*ribbonArrow*.headRadius](./d3-chord/ribbon.md#ribbonArrow_headRadius) - set the arrowhead radius accessor.

## [d3-color](./d3-color.md)

Color manipulation and color space conversion.

* [d3.color](./d3-color.md#color) - parse the given CSS color specifier.
* [*color*.opacity](./d3-color.md#color_opacity) - the color’s opacity.
* [*color*.rgb](./d3-color.md#color_rgb) - compute the RGB equivalent of this color.
* [*color*.copy](./d3-color.md#color_copy) - return a copy of this color.
* [*color*.brighter](./d3-color.md#color_brighter) - create a brighter copy of this color.
* [*color*.darker](./d3-color.md#color_darker) - create a darker copy of this color.
* [*color*.displayable](./d3-color.md#color_displayable) - returns true if the color is displayable on standard hardware.
* [*color*.formatHex](./d3-color.md#color_formatHex) - returns the hexadecimal RRGGBB string representation of this color.
* [*color*.formatHex8](./d3-color.md#color_formatHex8) - returns the hexadecimal RRGGBBAA string representation of this color.
* [*color*.formatHsl](./d3-color.md#color_formatHsl) - returns the RGB string representation of this color.
* [*color*.formatRgb](./d3-color.md#color_formatRgb) - returns the HSL string representation of this color.
* [*color*.toString](./d3-color.md#color_toString) - returns the RGB string representation of this color.
* [d3.rgb](./d3-color.md#rgb) - create a new RGB color.
* [*rgb*.clamp](./d3-color.md#rgb_clamp) - returns copy of this color clamped to the RGB color space.
* [d3.hsl](./d3-color.md#hsl) - create a new HSL color.
* [*hsl*.clamp](./d3-color.md#hsl_clamp) - returns copy of this color clamped to the HSL color space.
* [d3.lab](./d3-color.md#lab) - create a new Lab color.
* [d3.gray](./d3-color.md#gray) - create a new Lab gray.
* [d3.hcl](./d3-color.md#hcl) - create a new HCL color.
* [d3.lch](./d3-color.md#lch) - create a new HCL color.
* [d3.cubehelix](./d3-color.md#cubehelix) - create a new Cubehelix color.

## [d3-contour](./d3-contour.md)

Compute contour polygons using marching squares.

* [d3.contours](./d3-contour/contour.md#contours) - create a new contour generator.
* [*contours*](./d3-contour/contour.md#_contours) - compute the contours for a given grid of values.
* [*contours*.contour](./d3-contour/contour.md#contours_contour) - compute a contour for a given value.
* [*contours*.size](./d3-contour/contour.md#contours_size) - set the size of a contour generator.
* [*contours*.smooth](./d3-contour/contour.md#contours_smooth) - set whether or not the generated contours are smoothed.
* [*contours*.thresholds](./d3-contour/contour.md#contours_thresholds) - set the thresholds of a contour generator.
* [d3.contourDensity](./d3-contour/density.md#contourDensity) - create a new density estimator.
* [*density*](./d3-contour/density.md#_density) - estimate the density of a given array of samples.
* [*density*.x](./d3-contour/density.md#density_x) - set the *x* accessor of the density estimator.
* [*density*.y](./d3-contour/density.md#density_y) - set the *y* accessor of the density estimator.
* [*density*.weight](./d3-contour/density.md#density_weight) - set the *weight* accessor of the density estimator.
* [*density*.size](./d3-contour/density.md#density_size) - set the size of the density estimator.
* [*density*.cellSize](./d3-contour/density.md#density_cellSize) - set the cell size of the density estimator.
* [*density*.thresholds](./d3-contour/density.md#density_thresholds) - set the thresholds of the density estimator.
* [*density*.bandwidth](./d3-contour/density.md#density_bandwidth) - set the bandwidth of the density estimator.
* [*density*.contours](./d3-contour/density.md#density_contours) - compute density contours.

## [d3-delaunay](./d3-delaunay.md)

Compute the Voronoi diagram of a set of two-dimensional points.

* [new Delaunay](./d3-delaunay/delaunay.md#Delaunay) - create a delaunay triangulation for an array of point coordinates.
* [Delaunay.from](./d3-delaunay/delaunay.md#Delaunay_from) - create a delaunay triangulation for an iterable of points.
* [*delaunay*.points](./d3-delaunay/delaunay.md#delaunay_points) - the coordinates of the points.
* [*delaunay*.halfedges](./d3-delaunay/delaunay.md#delaunay_halfedges) - the delaunay halfedges.
* [*delaunay*.hull](./d3-delaunay/delaunay.md#delaunay_hull) - the convex hull as point indices.
* [*delaunay*.triangles](./d3-delaunay/delaunay.md#delaunay_triangles) - the delaunay triangles.
* [*delaunay*.inedges](./d3-delaunay/delaunay.md#delaunay_inedges) - the delaunay inedges
* [*delaunay*.find](./d3-delaunay/delaunay.md#delaunay_find) - find the closest point in the delaunay triangulation.
* [*delaunay*.neighbors](./d3-delaunay/delaunay.md#delaunay_neighbors) - the neighbors of a point in the delaunay triangulation.
* [*delaunay*.render](./d3-delaunay/delaunay.md#delaunay_render) - render the edges of the delaunay triangulation.
* [*delaunay*.renderHull](./d3-delaunay/delaunay.md#delaunay_renderHull) - render the convex hull.
* [*delaunay*.renderTriangle](./d3-delaunay/delaunay.md#delaunay_renderTriangle) - render a triangle.
* [*delaunay*.renderPoints](./d3-delaunay/delaunay.md#delaunay_renderPoints) - render the points.
* [*delaunay*.hullPolygon](./d3-delaunay/delaunay.md#delaunay_hullPolygon) - the closed convex hull as point coordinates.
* [*delaunay*.trianglePolygons](./d3-delaunay/delaunay.md#delaunay_trianglePolygons) - iterate over all the triangles as polygons.
* [*delaunay*.trianglePolygon](./d3-delaunay/delaunay.md#delaunay_trianglePolygon) - return a triangle as a polygon.
* [*delaunay*.update](./d3-delaunay/delaunay.md#delaunay_update) - update a delaunay triangulation in place.
* [*delaunay*.voronoi](./d3-delaunay/voronoi.md#delaunay_voronoi) - compute the voronoi diagram associated with a delaunay triangulation.
* [*voronoi*.delaunay](./d3-delaunay/voronoi.md#voronoi_delaunay) - the voronoi diagram’s source delaunay triangulation.
* [*voronoi*.circumcenters](./d3-delaunay/voronoi.md#voronoi_circumcenters) - the triangles’ circumcenters.
* [*voronoi*.vectors](./d3-delaunay/voronoi.md#voronoi_vectors) - directions for the outer (infinite) cells of the voronoi diagram.
* [*voronoi*.xmin](./d3-delaunay/voronoi.md#voronoi_bounds) - set the *xmin* bound of the extent.
* [*voronoi*.ymin](./d3-delaunay/voronoi.md#voronoi_bounds) - set the *ymin* bound of the extent.
* [*voronoi*.xmax](./d3-delaunay/voronoi.md#voronoi_bounds) - set the *xmax* bound of the extent.
* [*voronoi*.ymax](./d3-delaunay/voronoi.md#voronoi_bounds) - set the *ymax* bound of the extent.
* [*voronoi*.contains](./d3-delaunay/voronoi.md#voronoi_contains) - test whether a point is inside a voronoi cell.
* [*voronoi*.neighbors](./d3-delaunay/voronoi.md#voronoi_neighbors) - the neighbors of a point in the voronoi diagram.
* [*voronoi*.render](./d3-delaunay/voronoi.md#voronoi_render) - render the mesh of voronoi cells.
* [*voronoi*.renderBounds](./d3-delaunay/voronoi.md#voronoi_renderBounds) - render the extent.
* [*voronoi*.renderCell](./d3-delaunay/voronoi.md#voronoi_renderCell) - render a voronoi cell.
* [*voronoi*.cellPolygons](./d3-delaunay/voronoi.md#voronoi_cellPolygons) - iterate over all the cells as polygons.
* [*voronoi*.cellPolygon](./d3-delaunay/voronoi.md#voronoi_cellPolygon) - return a cell as a polygon.
* [*voronoi*.update](./d3-delaunay/voronoi.md#voronoi_update) - update a voronoi diagram in place.

## [d3-dispatch](./d3-dispatch.md)

Separate concerns using named callbacks.

* [d3.dispatch](./d3-dispatch.md#dispatch) - create a custom event dispatcher.
* [*dispatch*.on](./d3-dispatch.md#dispatch_on) - register or unregister an event listener.
* [*dispatch*.copy](./d3-dispatch.md#dispatch_copy) - create a copy of a dispatcher.
* [*dispatch*.call](./d3-dispatch.md#dispatch_call) - dispatch an event to registered listeners.
* [*dispatch*.apply](./d3-dispatch.md#dispatch_apply) - dispatch an event to registered listeners.

## [d3-drag](./d3-drag.md)

Drag and drop SVG, HTML or Canvas using mouse or touch input.

* [d3.drag](./d3-drag.md#drag) - create a drag behavior.
* [*drag*](./d3-drag.md#_drag) - apply the drag behavior to a selection.
* [*drag*.container](./d3-drag.md#drag_container) - set the coordinate system.
* [*drag*.filter](./d3-drag.md#drag_filter) - ignore some initiating input events.
* [*drag*.touchable](./d3-drag.md#drag_touchable) - set the touch support detector.
* [*drag*.subject](./d3-drag.md#drag_subject) - set the thing being dragged.
* [*drag*.clickDistance](./d3-drag.md#drag_clickDistance) - set the click distance threshold.
* [*drag*.on](./d3-drag.md#drag_on) - listen for drag events.
* [d3.dragDisable](./d3-drag.md#dragDisable) - prevent native drag-and-drop and text selection.
* [d3.dragEnable](./d3-drag.md#dragEnable) - enable native drag-and-drop and text selection.
* [*event*.on](./d3-drag.md#event_on) - listen for drag events on the current gesture.

## [d3-dsv](./d3-dsv.md)

Parse and format delimiter-separated values, most commonly CSV and TSV.

* [d3.csvParse](./d3-dsv.md#csvParse) - parse the given CSV string, returning an array of objects.
* [d3.csvParseRows](./d3-dsv.md#csvParseRows) - parse the given CSV string, returning an array of rows.
* [d3.csvFormat](./d3-dsv.md#csvFormat) - format the given array of objects as CSV.
* [d3.csvFormatBody](./d3-dsv.md#csvFormatBody) - format the given array of objects as CSV.
* [d3.csvFormatRows](./d3-dsv.md#csvFormatRows) - format the given array of rows as CSV.
* [d3.csvFormatRow](./d3-dsv.md#csvFormatRow) - format the given row as CSV.
* [d3.csvFormatValue](./d3-dsv.md#csvFormatValue) - format the given value as CSV.
* [d3.tsvParse](./d3-dsv.md#tsvParse) - parse the given TSV string, returning an array of objects.
* [d3.tsvParseRows](./d3-dsv.md#tsvParseRows) - parse the given TSV string, returning an array of rows.
* [d3.tsvFormat](./d3-dsv.md#tsvFormat) - format the given array of objects as TSV.
* [d3.tsvFormatBody](./d3-dsv.md#tsvFormatBody) - format the given array of objects as TSV.
* [d3.tsvFormatRows](./d3-dsv.md#tsvFormatRows) - format the given array of rows as TSV.
* [d3.tsvFormatRow](./d3-dsv.md#tsvFormatRow) - format the given row as TSV.
* [d3.tsvFormatValue](./d3-dsv.md#tsvFormatValue) - format the given value as TSV.
* [d3.dsvFormat](./d3-dsv.md#dsvFormat) - create a new parser and formatter for the given delimiter.
* [*dsv*.parse](./d3-dsv.md#dsv_parse) - parse the given string, returning an array of objects.
* [*dsv*.parseRows](./d3-dsv.md#dsv_parseRows) - parse the given string, returning an array of rows.
* [*dsv*.format](./d3-dsv.md#dsv_format) - format the given array of objects.
* [*dsv*.formatBody](./d3-dsv.md#dsv_formatBody) - format the given array of objects.
* [*dsv*.formatRows](./d3-dsv.md#dsv_formatRows) - format the given array of rows.
* [*dsv*.formatRow](./d3-dsv.md#dsv_formatRow) - format the given row.
* [*dsv*.formatValue](./d3-dsv.md#dsv_formatValue) - format the given value.
* [d3.autoType](./d3-dsv.md#autoType) - automatically infer value types for the given object.

## [d3-ease](./d3-ease.md)

Easing functions for smooth animation.

* [*ease*](./d3-ease.md#_ease) - ease the given normalized time.
* [d3.easeLinear](./d3-ease.md#easeLinear) - linear easing; the identity function.
* [d3.easePolyIn](./d3-ease.md#easePolyIn) - polynomial easing; raises time to the given power.
* [d3.easePolyOut](./d3-ease.md#easePolyOut) - reverse polynomial easing.
* [d3.easePoly](./d3-ease.md#easePoly) - an alias for easePolyInOut.
* [d3.easePolyInOut](./d3-ease.md#easePolyInOut) - symmetric polynomial easing.
* [*poly*.exponent](./d3-ease.md#easePoly_exponent) - specify the polynomial exponent.
* [d3.easeQuadIn](./d3-ease.md#easeQuadIn) - quadratic easing; squares time.
* [d3.easeQuadOut](./d3-ease.md#easeQuadOut) - reverse quadratic easing.
* [d3.easeQuad](./d3-ease.md#easeQuad) - an alias for easeQuadInOut.
* [d3.easeQuadInOut](./d3-ease.md#easeQuadInOut) - symmetric quadratic easing.
* [d3.easeCubicIn](./d3-ease.md#easeCubicIn) - cubic easing; cubes time.
* [d3.easeCubicOut](./d3-ease.md#easeCubicOut) - reverse cubic easing.
* [d3.easeCubic](./d3-ease.md#easeCubic) - an alias for easeCubicInOut.
* [d3.easeCubicInOut](./d3-ease.md#easeCubicInOut) - symmetric cubic easing.
* [d3.easeSinIn](./d3-ease.md#easeSinIn) - sinusoidal easing.
* [d3.easeSinOut](./d3-ease.md#easeSinOut) - reverse sinusoidal easing.
* [d3.easeSin](./d3-ease.md#easeSin) - an alias for easeSinInOut.
* [d3.easeSinInOut](./d3-ease.md#easeSinInOut) - symmetric sinusoidal easing.
* [d3.easeExpIn](./d3-ease.md#easeExpIn) - exponential easing.
* [d3.easeExpOut](./d3-ease.md#easeExpOut) - reverse exponential easing.
* [d3.easeExp](./d3-ease.md#easeExp) - an alias for easeExpInOut.
* [d3.easeExpInOut](./d3-ease.md#easeExpInOut) - symmetric exponential easing.
* [d3.easeCircleIn](./d3-ease.md#easeCircleIn) - circular easing.
* [d3.easeCircleOut](./d3-ease.md#easeCircleOut) - reverse circular easing.
* [d3.easeCircle](./d3-ease.md#easeCircle) - an alias for easeCircleInOut.
* [d3.easeCircleInOut](./d3-ease.md#easeCircleInOut) - symmetric circular easing.
* [d3.easeElasticIn](./d3-ease.md#easeElasticIn) - elastic easing, like a rubber band.
* [d3.easeElastic](./d3-ease.md#easeElastic) - an alias for easeElasticOut.
* [d3.easeElasticOut](./d3-ease.md#easeElasticOut) - reverse elastic easing.
* [d3.easeElasticInOut](./d3-ease.md#easeElasticInOut) - symmetric elastic easing.
* [*elastic*.amplitude](./d3-ease.md#easeElastic_amplitude) - specify the elastic amplitude.
* [*elastic*.period](./d3-ease.md#easeElastic_period) - specify the elastic period.
* [d3.easeBackIn](./d3-ease.md#easeBackIn) - anticipatory easing, like a dancer bending his knees before jumping.
* [d3.easeBackOut](./d3-ease.md#easeBackOut) - reverse anticipatory easing.
* [d3.easeBack](./d3-ease.md#easeBack) - an alias for easeBackInOut.
* [d3.easeBackInOut](./d3-ease.md#easeBackInOut) - symmetric anticipatory easing.
* [*back*.overshoot](./d3-ease.md#easeBack_overshoot) - specify the amount of overshoot.
* [d3.easeBounceIn](./d3-ease.md#easeBounceIn) - bounce easing, like a rubber ball.
* [d3.easeBounce](./d3-ease.md#easeBounce) - an alias for easeBounceOut.
* [d3.easeBounceOut](./d3-ease.md#easeBounceOut) - reverse bounce easing.
* [d3.easeBounceInOut](./d3-ease.md#easeBounceInOut) - symmetric bounce easing.

## [d3-fetch](./d3-fetch.md)

Convenience methods on top of the Fetch API.

* [d3.blob](./d3-fetch.md#blob) - get a file as a blob.
* [d3.buffer](./d3-fetch.md#buffer) - get a file as an array buffer.
* [d3.csv](./d3-fetch.md#csv) - get a comma-separated values (CSV) file.
* [d3.dsv](./d3-fetch.md#dsv) - get a delimiter-separated values (CSV) file.
* [d3.html](./d3-fetch.md#html) - get an HTML file.
* [d3.image](./d3-fetch.md#image) - get an image.
* [d3.json](./d3-fetch.md#json) - get a JSON file.
* [d3.svg](./d3-fetch.md#svg) - get an SVG file.
* [d3.text](./d3-fetch.md#text) - get a plain text file.
* [d3.tsv](./d3-fetch.md#tsv) - get a tab-separated values (TSV) file.
* [d3.xml](./d3-fetch.md#xml) - get an XML file.

## [d3-force](./d3-force.md)

Force-directed graph layout using velocity Verlet integration.

* [d3.forceSimulation](./d3-force/simulation.md#forceSimulation) - create a new force simulation.
* [*simulation*.restart](./d3-force/simulation.md#simulation_restart) - reheat and restart the simulation’s timer.
* [*simulation*.stop](./d3-force/simulation.md#simulation_stop) - stop the simulation’s timer.
* [*simulation*.tick](./d3-force/simulation.md#simulation_tick) - advance the simulation one step.
* [*simulation*.nodes](./d3-force/simulation.md#simulation_nodes) - set the simulation’s nodes.
* [*simulation*.alpha](./d3-force/simulation.md#simulation_alpha) - set the current alpha.
* [*simulation*.alphaMin](./d3-force/simulation.md#simulation_alphaMin) - set the minimum alpha threshold.
* [*simulation*.alphaDecay](./d3-force/simulation.md#simulation_alphaDecay) - set the alpha exponential decay rate.
* [*simulation*.alphaTarget](./d3-force/simulation.md#simulation_alphaTarget) - set the target alpha.
* [*simulation*.velocityDecay](./d3-force/simulation.md#simulation_velocityDecay) - set the velocity decay rate.
* [*simulation*.force](./d3-force/simulation.md#simulation_force) - add or remove a force.
* [*simulation*.find](./d3-force/simulation.md#simulation_find) - find the closest node to the given position.
* [*simulation*.randomSource](./d3-force/simulation.md#simulation_randomSource) - set the simulation’s random source.
* [*simulation*.on](./d3-force/simulation.md#simulation_on) - add or remove an event listener.
* [*force*](./d3-force/simulation.md#_force) - apply the force.
* [*force*.initialize](./d3-force/simulation.md#force_initialize) - initialize the force with the given nodes.
* [d3.forceCenter](./d3-force/center.md#forceCenter) - create a centering force.
* [*center*.x](./d3-force/center.md#center_x) - set the center *x*-coordinate.
* [*center*.y](./d3-force/center.md#center_y) - set the center y coordinate.
* [*center*.strength](./d3-force/center.md#center_strength) - set the strength of the centering force.
* [d3.forceCollide](./d3-force/collide.md#forceCollide) - create a circle collision force.
* [*collide*.radius](./d3-force/collide.md#collide_radius) - set the circle radius.
* [*collide*.strength](./d3-force/collide.md#collide_strength) - set the collision resolution strength.
* [*collide*.iterations](./d3-force/collide.md#collide_iterations) - set the number of iterations.
* [d3.forceLink](./d3-force/link.md#forceLink) - create a link force.
* [*link*.links](./d3-force/link.md#link_links) - set the array of links.
* [*link*.id](./d3-force/link.md#link_id) - link nodes by numeric index or string identifier.
* [*link*.distance](./d3-force/link.md#link_distance) - set the link distance.
* [*link*.strength](./d3-force/link.md#link_strength) - set the link strength.
* [*link*.iterations](./d3-force/link.md#link_iterations) - set the number of iterations.
* [d3.forceManyBody](./d3-force/many-body.md#forceManyBody) - create a many-body force.
* [*manyBody*.strength](./d3-force/many-body.md#manyBody_strength) - set the force strength.
* [*manyBody*.theta](./d3-force/many-body.md#manyBody_theta) - set the Barnes–Hut approximation accuracy.
* [*manyBody*.distanceMin](./d3-force/many-body.md#manyBody_distanceMin) - limit the force when nodes are close.
* [*manyBody*.distanceMax](./d3-force/many-body.md#manyBody_distanceMax) - limit the force when nodes are far.
* [d3.forceX](./d3-force/position.md#forceX) - create an *x*-positioning force.
* [*x*.strength](./d3-force/position.md#x_strength) - set the force strength.
* [*x*.x](./d3-force/position.md#x_x) - set the target *x*-coordinate.
* [d3.forceY](./d3-force/position.md#forceY) - create an *y*-positioning force.
* [*y*.strength](./d3-force/position.md#y_strength) - set the force strength.
* [*y*.y](./d3-force/position.md#y_y) - set the target y coordinate.
* [d3.forceRadial](./d3-force/position.md#forceRadial) - create a radial positioning force.
* [*radial*.strength](./d3-force/position.md#radial_strength) - set the force strength.
* [*radial*.radius](./d3-force/position.md#radial_radius) - set the target radius.
* [*radial*.x](./d3-force/position.md#radial_x) - set the target center *x*-coordinate.
* [*radial*.y](./d3-force/position.md#radial_y) - set the target center y coordinate.

## [d3-format](./d3-format.md)

Format numbers for human consumption.

* [d3.format](./d3-format.md#format) - alias for *locale*.format on the default locale.
* [d3.formatPrefix](./d3-format.md#formatPrefix) - alias for *locale*.formatPrefix on the default locale.
* [*locale*.format](./d3-format.md#locale_format) - create a number format.
* [*locale*.formatPrefix](./d3-format.md#locale_formatPrefix) - create a SI-prefix number format.
* [d3.formatSpecifier](./d3-format.md#formatSpecifier) - parse a number format specifier.
* [new d3.FormatSpecifier](./d3-format.md#FormatSpecifier) - augments a number format specifier object.
* [d3.precisionFixed](./d3-format.md#precisionFixed) - compute decimal precision for fixed-point notation.
* [d3.precisionPrefix](./d3-format.md#precisionPrefix) - compute decimal precision for SI-prefix notation.
* [d3.precisionRound](./d3-format.md#precisionRound) - compute significant digits for rounded notation.
* [d3.formatLocale](./d3-format.md#formatLocale) - define a custom locale.
* [d3.formatDefaultLocale](./d3-format.md#formatDefaultLocale) - define the default locale.

## [d3-geo](./d3-geo.md)

Geographic projections, shapes and math.

### [Paths](./d3-geo/path.md)

* [d3.geoPath](./d3-geo/path.md#geoPath) - create a new geographic path generator.
* [*path*](./d3-geo/path.md#_path) - project and render the specified feature.
* [*path*.area](./d3-geo/path.md#path_area) - compute the projected planar area of a given feature.
* [*path*.bounds](./d3-geo/path.md#path_bounds) - compute the projected planar bounding box of a given feature.
* [*path*.centroid](./d3-geo/path.md#path_centroid) - compute the projected planar centroid of a given feature.
* [*path*.digits](./d3-geo/path.md#path_digits) - set the output precision.
* [*path*.measure](./d3-geo/path.md#path_measure) - compute the projected planar length of a given feature.
* [*path*.projection](./d3-geo/path.md#path_projection) - set the geographic projection.
* [*path*.context](./d3-geo/path.md#path_context) - set the render context.
* [*path*.pointRadius](./d3-geo/path.md#path_pointRadius) - set the radius to display point features.

### [Projections](./d3-geo/projection.md)

* [*projection*](./d3-geo/projection.md#_projection) - project the specified point from the sphere to the plane.
* [*projection*.invert](./d3-geo/projection.md#projection_invert) - unproject the specified point from the plane to the sphere.
* [*projection*.stream](./d3-geo/projection.md#projection_stream) - wrap the specified stream to project geometry.
* [*projection*.preclip](./d3-geo/projection.md#projection_preclip) - set the projection’s spherical clipping function.
* [*projection*.postclip](./d3-geo/projection.md#projection_postclip) - set the projection’s cartesian clipping function.
* [*projection*.clipAngle](./d3-geo/projection.md#projection_clipAngle) - set the radius of the clip circle.
* [*projection*.clipExtent](./d3-geo/projection.md#projection_clipExtent) - set the viewport clip extent, in pixels.
* [*projection*.scale](./d3-geo/projection.md#projection_scale) - set the scale factor.
* [*projection*.translate](./d3-geo/projection.md#projection_translate) - set the translation offset.
* [*projection*.center](./d3-geo/projection.md#projection_center) - set the center point.
* [*projection*.angle](./d3-geo/projection.md#projection_angle) - set the post-projection rotation.
* [*projection*.reflectX](./d3-geo/projection.md#projection_reflectX) - reflect the *x*-dimension.
* [*projection*.reflectY](./d3-geo/projection.md#projection_reflectY) - reflect the *y*-dimension.
* [*projection*.rotate](./d3-geo/projection.md#projection_rotate) - set the three-axis spherical rotation angles.
* [*projection*.precision](./d3-geo/projection.md#projection_precision) - set the precision threshold for adaptive sampling.
* [*projection*.fitExtent](./d3-geo/projection.md#projection_fitExtent) - set the scale and translate to fit a GeoJSON object.
* [*projection*.fitSize](./d3-geo/projection.md#projection_fitSize) - set the scale and translate to fit a GeoJSON object.
* [*projection*.fitWidth](./d3-geo/projection.md#projection_fitWidth) - set the scale and translate to fit a GeoJSON object.
* [*projection*.fitHeight](./d3-geo/projection.md#projection_fitHeight) - set the scale and translate to fit a GeoJSON object.

#### [Raw projections](./d3-geo/projection.md#raw-projections)

* [*project*](./d3-geo/projection.md#_project) - project the specified point from the sphere to the plane.
* [*project*.invert](./d3-geo/projection.md#project_invert) - unproject the specified point from the plane to the sphere.
* [d3.geoProjection](./d3-geo/projection.md#geoProjection) - create a custom projection.
* [d3.geoProjectionMutator](./d3-geo/projection.md#geoProjectionMutator) - create a custom configurable projection.
* [d3.geoTransform](./d3-geo/projection.md#geoTransform) - define a custom geometry transform.
* [d3.geoIdentity](./d3-geo/projection.md#geoIdentity) - scale, translate or clip planar geometry.
* [d3.geoClipAntimeridian](./d3-geo/projection.md#geoClipAntimeridian) - cuts spherical geometries that cross the antimeridian.
* [d3.geoClipCircle](./d3-geo/projection.md#geoClipCircle) - clips spherical geometries to a small circle.
* [d3.geoClipRectangle](./d3-geo/projection.md#geoClipRectangle) - clips planar geometries to a rectangular viewport.

#### [Azimuthal projections](./d3-geo/azimuthal.md)

* [d3.geoAzimuthalEqualArea](./d3-geo/azimuthal.md#geoAzimuthalEqualArea) - the azimuthal equal-area projection.
* [d3.geoAzimuthalEquidistant](./d3-geo/azimuthal.md#geoAzimuthalEquidistant) - the azimuthal equidistant projection.
* [d3.geoGnomonic](./d3-geo/azimuthal.md#geoGnomonic) - the gnomonic projection.
* [d3.geoOrthographic](./d3-geo/azimuthal.md#geoOrthographic) - the azimuthal orthographic projection.
* [d3.geoStereographic](./d3-geo/azimuthal.md#geoStereographic) - the azimuthal stereographic projection.

#### [Conic projections](./d3-geo/conic.md)

* [*conic*.parallels](./d3-geo/conic.md#conic_parallels) - set the two standard parallels.
* [d3.geoConicConformal](./d3-geo/conic.md#geoConicConformal) - the conic conformal projection.
* [d3.geoConicEqualArea](./d3-geo/conic.md#geoConicEqualArea) - the conic equal-area (Albers) projection.
* [d3.geoConicEquidistant](./d3-geo/conic.md#geoConicEquidistant) - the conic equidistant projection.
* [d3.geoAlbers](./d3-geo/conic.md#geoAlbers) - the Albers equal-area conic projection.
* [d3.geoAlbersUsa](./d3-geo/conic.md#geoAlbersUsa) - a composite Albers projection for the United States.

#### [Cylindrical projections](./d3-geo/cylindrical.md)

* [d3.geoEquirectangular](./d3-geo/cylindrical.md#geoEquirectangular) - the equirectangular (plate carreé) projection.
* [d3.geoMercator](./d3-geo/cylindrical.md#geoMercator) - the spherical Mercator projection.
* [d3.geoTransverseMercator](./d3-geo/cylindrical.md#geoTransverseMercator) - the transverse spherical Mercator projection.
* [d3.geoEqualEarth](./d3-geo/cylindrical.md#geoEqualEarth) - the Equal Earth projection.
* [d3.geoNaturalEarth1](./d3-geo/cylindrical.md#geoNaturalEarth1) - the Equal Earth projection, version 1.

### [Streams](./d3-geo/stream.md)

* [d3.geoStream](./d3-geo/stream.md#geoStream) - convert a GeoJSON object to a geometry stream.
* [*stream*.point](./d3-geo/stream.md#stream_point) - indicates a point with the specified coordinates.
* [*stream*.lineStart](./d3-geo/stream.md#stream_lineStart) - indicates the start of a line or ring.
* [*stream*.lineEnd](./d3-geo/stream.md#stream_lineEnd) - indicates the end of a line or ring.
* [*stream*.polygonStart](./d3-geo/stream.md#stream_polygonStart) - indicates the start of a polygon.
* [*stream*.polygonEnd](./d3-geo/stream.md#stream_polygonEnd) - indicates the end of a polygon.
* [*stream*.sphere](./d3-geo/stream.md#stream_sphere) - indicates the sphere.

### [Spherical shapes](./d3-geo/shape.md)

* [d3.geoGraticule](./d3-geo/shape.md#geoGraticule) - create a graticule generator.
* [*graticule*](./d3-geo/shape.md#_graticule) - generate a MultiLineString of meridians and parallels.
* [*graticule*.lines](./d3-geo/shape.md#graticule_lines) - generate an array of LineStrings of meridians and parallels.
* [*graticule*.outline](./d3-geo/shape.md#graticule_outline) - generate a Polygon of the graticule’s extent.
* [*graticule*.extent](./d3-geo/shape.md#graticule_extent) - get or set the major & minor extents.
* [*graticule*.extentMajor](./d3-geo/shape.md#graticule_extentMajor) - get or set the major extent.
* [*graticule*.extentMinor](./d3-geo/shape.md#graticule_extentMinor) - get or set the minor extent.
* [*graticule*.step](./d3-geo/shape.md#graticule_step) - get or set the major & minor step intervals.
* [*graticule*.stepMajor](./d3-geo/shape.md#graticule_stepMajor) - get or set the major step intervals.
* [*graticule*.stepMinor](./d3-geo/shape.md#graticule_stepMinor) - get or set the minor step intervals.
* [*graticule*.precision](./d3-geo/shape.md#graticule_precision) - get or set the latitudinal precision.
* [d3.geoGraticule10](./d3-geo/shape.md#geoGraticule10) - generate the default 10° global graticule.
* [d3.geoCircle](./d3-geo/shape.md#geoCircle) - create a circle generator.
* [*circle*](./d3-geo/shape.md#_circle) - generate a piecewise circle as a Polygon.
* [*circle*.center](./d3-geo/shape.md#circle_center) - specify the circle center in latitude and longitude.
* [*circle*.radius](./d3-geo/shape.md#circle_radius) - specify the angular radius in degrees.
* [*circle*.precision](./d3-geo/shape.md#circle_precision) - specify the precision of the piecewise circle.

### [Spherical math](./d3-geo/math.md)

* [d3.geoArea](./d3-geo/math.md#geoArea) - compute the spherical area of a given feature.
* [d3.geoBounds](./d3-geo/math.md#geoBounds) - compute the latitude-longitude bounding box for a given feature.
* [d3.geoCentroid](./d3-geo/math.md#geoCentroid) - compute the spherical centroid of a given feature.
* [d3.geoDistance](./d3-geo/math.md#geoDistance) - compute the great-arc distance between two points.
* [d3.geoLength](./d3-geo/math.md#geoLength) - compute the length of a line string or the perimeter of a polygon.
* [d3.geoInterpolate](./d3-geo/math.md#geoInterpolate) - interpolate between two points along a great arc.
* [d3.geoContains](./d3-geo/math.md#geoContains) - test whether a point is inside a given feature.
* [d3.geoRotation](./d3-geo/math.md#geoRotation) - create a rotation function for the specified angles.

## [d3-hierarchy](./d3-hierarchy.md)

Layout algorithms for visualizing hierarchical data.

* [d3.hierarchy](./d3-hierarchy/hierarchy.md#hierarchy) - constructs a root node from hierarchical data.
* [*node*.ancestors](./d3-hierarchy/hierarchy.md#node_ancestors) - generate an array of ancestors.
* [*node*.descendants](./d3-hierarchy/hierarchy.md#node_descendants) - generate an array of descendants.
* [*node*.leaves](./d3-hierarchy/hierarchy.md#node_leaves) - generate an array of leaves.
* [*node*.find](./d3-hierarchy/hierarchy.md#node_find) - find a node in the hierarchy.
* [*node*.path](./d3-hierarchy/hierarchy.md#node_path) - generate the shortest path to another node.
* [*node*.links](./d3-hierarchy/hierarchy.md#node_links) - generate an array of links.
* [*node*.sum](./d3-hierarchy/hierarchy.md#node_sum) - evaluate and aggregate quantitative values.
* [*node*.count](./d3-hierarchy/hierarchy.md#node_count) - count the number of leaves.
* [*node*.sort](./d3-hierarchy/hierarchy.md#node_sort) - sort all descendant siblings.
* [*node*[Symbol.iterator]](./d3-hierarchy/hierarchy.md#node_iterator) - iterate on a hierarchy.
* [*node*.each](./d3-hierarchy/hierarchy.md#node_each) - breadth-first traversal.
* [*node*.eachAfter](./d3-hierarchy/hierarchy.md#node_eachAfter) - post-order traversal.
* [*node*.eachBefore](./d3-hierarchy/hierarchy.md#node_eachBefore) - pre-order traversal.
* [*node*.copy](./d3-hierarchy/hierarchy.md#node_copy) - copy a hierarchy.
* [d3.stratify](./d3-hierarchy/stratify.md#stratify) - create a new stratify operator.
* [*stratify*](./d3-hierarchy/stratify.md#_stratify) - construct a root node from tabular data.
* [*stratify*.id](./d3-hierarchy/stratify.md#stratify_id) - set the node id accessor.
* [*stratify*.parentId](./d3-hierarchy/stratify.md#stratify_parentId) - set the parent node id accessor.
* [*stratify*.path](./d3-hierarchy/stratify.md#stratify_path) - set the path accessor.
* [d3.cluster](./d3-hierarchy/cluster.md#cluster) - create a new cluster (dendrogram) layout.
* [*cluster*](./d3-hierarchy/cluster.md#_cluster) - layout the specified hierarchy in a dendrogram.
* [*cluster*.size](./d3-hierarchy/cluster.md#cluster_size) - set the layout size.
* [*cluster*.nodeSize](./d3-hierarchy/cluster.md#cluster_nodeSize) - set the node size.
* [*cluster*.separation](./d3-hierarchy/cluster.md#cluster_separation) - set the separation between leaves.
* [d3.tree](./d3-hierarchy/tree.md#tree) - create a new tidy tree layout.
* [*tree*](./d3-hierarchy/tree.md#_tree) - layout the specified hierarchy in a tidy tree.
* [*tree*.size](./d3-hierarchy/tree.md#tree_size) - set the layout size.
* [*tree*.nodeSize](./d3-hierarchy/tree.md#tree_nodeSize) - set the node size.
* [*tree*.separation](./d3-hierarchy/tree.md#tree_separation) - set the separation between nodes.
* [d3.treemap](./d3-hierarchy/treemap.md#treemap) - create a new treemap layout.
* [*treemap*](./d3-hierarchy/treemap.md#_treemap) - layout the specified hierarchy as a treemap.
* [*treemap*.tile](./d3-hierarchy/treemap.md#treemap_tile) - set the tiling method.
* [*treemap*.size](./d3-hierarchy/treemap.md#treemap_size) - set the layout size.
* [*treemap*.round](./d3-hierarchy/treemap.md#treemap_round) - set whether the output coordinates are rounded.
* [*treemap*.padding](./d3-hierarchy/treemap.md#treemap_padding) - set the padding.
* [*treemap*.paddingInner](./d3-hierarchy/treemap.md#treemap_paddingInner) - set the padding between siblings.
* [*treemap*.paddingOuter](./d3-hierarchy/treemap.md#treemap_paddingOuter) - set the padding between parent and children.
* [*treemap*.paddingTop](./d3-hierarchy/treemap.md#treemap_paddingTop) - set the padding between the parent’s top edge and children.
* [*treemap*.paddingRight](./d3-hierarchy/treemap.md#treemap_paddingRight) - set the padding between the parent’s right edge and children.
* [*treemap*.paddingBottom](./d3-hierarchy/treemap.md#treemap_paddingBottom) - set the padding between the parent’s bottom edge and children.
* [*treemap*.paddingLeft](./d3-hierarchy/treemap.md#treemap_paddingLeft) - set the padding between the parent’s left edge and children.
* [d3.treemapBinary](./d3-hierarchy/treemap.md#treemapBinary) - tile using a balanced binary tree.
* [d3.treemapDice](./d3-hierarchy/treemap.md#treemapDice) - tile into a horizontal row.
* [d3.treemapSlice](./d3-hierarchy/treemap.md#treemapSlice) - tile into a vertical column.
* [d3.treemapSliceDice](./d3-hierarchy/treemap.md#treemapSliceDice) - alternate between slicing and dicing.
* [d3.treemapSquarify](./d3-hierarchy/treemap.md#treemapSquarify) - tile using squarified rows per Bruls *et. al.*
* [d3.treemapResquarify](./d3-hierarchy/treemap.md#treemapResquarify) - like d3.treemapSquarify, but performs stable updates.
* [*squarify*.ratio](./d3-hierarchy/treemap.md#squarify_ratio) - set the desired rectangle aspect ratio.
* [d3.partition](./d3-hierarchy/partition.md#partition) - create a new partition (icicle or sunburst) layout.
* [*partition*](./d3-hierarchy/partition.md#_partition) - layout the specified hierarchy as a partition diagram.
* [*partition*.size](./d3-hierarchy/partition.md#partition_size) - set the layout size.
* [*partition*.round](./d3-hierarchy/partition.md#partition_round) - set whether the output coordinates are rounded.
* [*partition*.padding](./d3-hierarchy/partition.md#partition_padding) - set the padding.
* [d3.pack](./d3-hierarchy/pack.md#pack) - create a new circle-packing layout.
* [*pack*](./d3-hierarchy/pack.md#_pack) - layout the specified hierarchy using circle-packing.
* [*pack*.radius](./d3-hierarchy/pack.md#pack_radius) - set the radius accessor.
* [*pack*.size](./d3-hierarchy/pack.md#pack_size) - set the layout size.
* [*pack*.padding](./d3-hierarchy/pack.md#pack_padding) - set the padding.
* [d3.packSiblings](./d3-hierarchy/pack.md#packSiblings) - pack the specified array of circles.
* [d3.packEnclose](./d3-hierarchy/pack.md#packEnclose) - enclose the specified array of circles.

## [d3-interpolate](./d3-interpolate.md)

Interpolate numbers, colors, strings, arrays, objects, whatever!

### [Value interpolation](./d3-interpolate/value.md)

* [d3.interpolate](./d3-interpolate/value.md#interpolate) - interpolate arbitrary values.
* [d3.interpolateNumber](./d3-interpolate/value.md#interpolateNumber) - interpolate numbers.
* [d3.interpolateRound](./d3-interpolate/value.md#interpolateRound) - interpolate integers.
* [d3.interpolateString](./d3-interpolate/value.md#interpolateString) - interpolate strings with embedded numbers.
* [d3.interpolateDate](./d3-interpolate/value.md#interpolateDate) - interpolate dates.
* [d3.interpolateArray](./d3-interpolate/value.md#interpolateArray) - interpolate arrays of arbitrary values.
* [d3.interpolateNumberArray](./d3-interpolate/value.md#interpolateNumberArray) - interpolate arrays of numbers.
* [d3.interpolateObject](./d3-interpolate/value.md#interpolateObject) - interpolate arbitrary objects.
* [d3.interpolateBasis](./d3-interpolate/value.md#interpolateBasis) - generate a B-spline through a set of values.
* [d3.interpolateBasisClosed](./d3-interpolate/value.md#interpolateBasisClosed) - generate a closed B-spline through a set of values.
* [d3.interpolateDiscrete](./d3-interpolate/value.md#interpolateDiscrete) - generate a discrete interpolator from a set of values.
* [d3.quantize](./d3-interpolate/value.md#quantize) - generate uniformly-spaced samples from an interpolator.
* [d3.piecewise](./d3-interpolate/value.md#piecewise) - generate a piecewise linear interpolator from a set of values.

### [Color interpolation](./d3-interpolate/color.md)

* [d3.interpolateRgb](./d3-interpolate/color.md#interpolateRgb) - interpolate RGB colors.
* [d3.interpolateRgbBasis](./d3-interpolate/color.md#interpolateRgbBasis) - generate a B-spline through a set of colors.
* [d3.interpolateRgbBasisClosed](./d3-interpolate/color.md#interpolateRgbBasisClosed) - generate a closed B-spline through a set of colors.
* [d3.interpolateHsl](./d3-interpolate/color.md#interpolateHsl) - interpolate HSL colors.
* [d3.interpolateHslLong](./d3-interpolate/color.md#interpolateHslLong) - interpolate HSL colors, the long way.
* [d3.interpolateLab](./d3-interpolate/color.md#interpolateLab) - interpolate Lab colors.
* [d3.interpolateHcl](./d3-interpolate/color.md#interpolateHcl) - interpolate HCL colors.
* [d3.interpolateHclLong](./d3-interpolate/color.md#interpolateHclLong) - interpolate HCL colors, the long way.
* [d3.interpolateCubehelix](./d3-interpolate/color.md#interpolateCubehelix) - interpolate Cubehelix colors.
* [d3.interpolateCubehelixLong](./d3-interpolate/color.md#interpolateCubehelixLong) - interpolate Cubehelix colors, the long way.
* [*interpolateColor*.gamma](./d3-interpolate/color.md#interpolateColor_gamma) - apply gamma correction during interpolation.
* [d3.interpolateHue](./d3-interpolate/color.md#interpolateHue) - interpolate a hue angle.

### [Transform interpolation](./d3-interpolate/transform.md)

* [d3.interpolateTransformCss](./d3-interpolate/transform.md#interpolateTransformCss) - interpolate 2D CSS transforms.
* [d3.interpolateTransformSvg](./d3-interpolate/transform.md#interpolateTransformSvg) - interpolate 2D SVG transforms.

### [Zoom interpolation](./d3-interpolate/zoom.md)

* [d3.interpolateZoom](./d3-interpolate/zoom.md#interpolateZoom) - zoom and pan between two views.
* [*interpolateZoom*.rho](./d3-interpolate/zoom.md#interpolateZoom_rho) - set the curvature *rho* of the zoom interpolator.

## [d3-path](./d3-path.md)

Serialize Canvas path commands to SVG.

* [d3.path](./d3-path.md#path) - create a new path serializer.
* [*path*.moveTo](./d3-path.md#path_moveTo) - move to the given point.
* [*path*.closePath](./d3-path.md#path_closePath) - close the current subpath.
* [*path*.lineTo](./d3-path.md#path_lineTo) - draw a straight line segment.
* [*path*.quadraticCurveTo](./d3-path.md#path_quadraticCurveTo) - draw a quadratic Bézier segment.
* [*path*.bezierCurveTo](./d3-path.md#path_bezierCurveTo) - draw a cubic Bézier segment.
* [*path*.arcTo](./d3-path.md#path_arcTo) - draw a circular arc segment.
* [*path*.arc](./d3-path.md#path_arc) - draw a circular arc segment.
* [*path*.rect](./d3-path.md#path_rect) - draw a rectangle.
* [*path*.toString](./d3-path.md#path_toString) - serialize to an SVG path data string.
* [d3.pathRound](./d3-path.md#pathRound) - create a new path serializer with fixed output precision.

## [d3-polygon](./d3-polygon.md)

Geometric operations for two-dimensional polygons.

* [d3.polygonArea](./d3-polygon.md#polygonArea) - compute the area of the given polygon.
* [d3.polygonCentroid](./d3-polygon.md#polygonCentroid) - compute the centroid of the given polygon.
* [d3.polygonHull](./d3-polygon.md#polygonHull) - compute the convex hull of the given points.
* [d3.polygonContains](./d3-polygon.md#polygonContains) - test whether a point is inside a polygon.
* [d3.polygonLength](./d3-polygon.md#polygonLength) - compute the length of the given polygon’s perimeter.

## [d3-quadtree](./d3-quadtree.md)

Two-dimensional recursive spatial subdivision.

* [d3.quadtree](./d3-quadtree.md#quadtree) - create a new, empty quadtree.
* [*quadtree*.x](./d3-quadtree.md#quadtree_x) - set the *x* accessor.
* [*quadtree*.y](./d3-quadtree.md#quadtree_y) - set the *y* accessor.
* [*quadtree*.extent](./d3-quadtree.md#quadtree_extent) - extend the quadtree to cover an extent.
* [*quadtree*.cover](./d3-quadtree.md#quadtree_cover) - extend the quadtree to cover a point.
* [*quadtree*.add](./d3-quadtree.md#quadtree_add) - add a datum to a quadtree.
* [*quadtree*.addAll](./d3-quadtree.md#quadtree_addAll) - add an array of data to a quadtree.
* [*quadtree*.remove](./d3-quadtree.md#quadtree_remove) - remove a datum from a quadtree.
* [*quadtree*.removeAll](./d3-quadtree.md#quadtree_removeAll) - remove an array of data from a quadtree.
* [*quadtree*.copy](./d3-quadtree.md#quadtree_copy) - create a copy of a quadtree.
* [*quadtree*.root](./d3-quadtree.md#quadtree_root) - get the quadtree’s root node.
* [*quadtree*.data](./d3-quadtree.md#quadtree_data) - retrieve all data from the quadtree.
* [*quadtree*.size](./d3-quadtree.md#quadtree_size) - count the number of data in the quadtree.
* [*quadtree*.find](./d3-quadtree.md#quadtree_find) - quickly find the closest datum in a quadtree.
* [*quadtree*.visit](./d3-quadtree.md#quadtree_visit) - selectively visit nodes in a quadtree.
* [*quadtree*.visitAfter](./d3-quadtree.md#quadtree_visitAfter) - visit all nodes in a quadtree.

## [d3-random](./d3-random.md)

Generate random numbers from various distributions.

* [d3.randomUniform](./d3-random.md#randomUniform) - from a uniform distribution.
* [d3.randomInt](./d3-random.md#randomInt) - from a uniform integer distribution.
* [d3.randomNormal](./d3-random.md#randomNormal) - from a normal distribution.
* [d3.randomLogNormal](./d3-random.md#randomLogNormal) - from a log-normal distribution.
* [d3.randomBates](./d3-random.md#randomBates) - from a Bates distribution.
* [d3.randomIrwinHall](./d3-random.md#randomIrwinHall) - from an Irwin–Hall distribution.
* [d3.randomExponential](./d3-random.md#randomExponential) - from an exponential distribution.
* [d3.randomPareto](./d3-random.md#randomPareto) - from a Pareto distribution.
* [d3.randomBernoulli](./d3-random.md#randomBernoulli) - from a Bernoulli distribution.
* [d3.randomGeometric](./d3-random.md#randomGeometric) - from a geometric distribution.
* [d3.randomBinomial](./d3-random.md#randomBinomial) - from a binomial distribution.
* [d3.randomGamma](./d3-random.md#randomGamma) - from a gamma distribution.
* [d3.randomBeta](./d3-random.md#randomBeta) - from a beta distribution.
* [d3.randomWeibull](./d3-random.md#randomWeibull) - from a Weibull, Gumbel or Fréchet distribution.
* [d3.randomCauchy](./d3-random.md#randomCauchy) - from a Cauchy distribution.
* [d3.randomLogistic](./d3-random.md#randomLogistic) - from a logistic distribution.
* [d3.randomPoisson](./d3-random.md#randomPoisson) - from a Poisson distribution.
* [*random*.source](./d3-random.md#random_source) - set the source of randomness.
* [d3.randomLcg](./d3-random.md#randomLcg) - a seeded pseudorandom number generator.

## [d3-scale](./d3-scale.md)

Encodings that map abstract data to visual representation.

### [Linear scales](./d3-scale/linear.md)

Map a continuous, quantitative domain to a continuous range.

* [d3.scaleLinear](./d3-scale/linear.md#scaleLinear) - create a quantitative linear scale.
* [*linear*](./d3-scale/linear.md#_linear) - compute the range value corresponding to a given domain value.
* [*linear*.invert](./d3-scale/linear.md#linear_invert) - compute the domain value corresponding to a given range value.
* [*linear*.domain](./d3-scale/linear.md#linear_domain) - set the input domain.
* [*linear*.range](./d3-scale/linear.md#linear_range) - set the output range.
* [*linear*.rangeRound](./d3-scale/linear.md#linear_rangeRound) - set the output range and enable rounding.
* [*linear*.clamp](./d3-scale/linear.md#linear_clamp) - enable clamping to the domain or range.
* [*linear*.unknown](./d3-scale/linear.md#linear_unknown) - set the output value for unknown inputs.
* [*linear*.interpolate](./d3-scale/linear.md#linear_interpolate) - set the output interpolator.
* [*linear*.ticks](./d3-scale/linear.md#linear_ticks) - compute representative values from the domain.
* [*linear*.tickFormat](./d3-scale/linear.md#linear_tickFormat) - format ticks for human consumption.
* [*linear*.nice](./d3-scale/linear.md#linear_nice) - extend the domain to nice round numbers.
* [*linear*.copy](./d3-scale/linear.md#linear_copy) - create a copy of this scale.
* [d3.tickFormat](./d3-scale/linear.md#tickFormat) - format ticks for human consumption.
* [d3.scaleIdentity](./d3-scale/linear.md#scaleIdentity) - creates an identity scale.
* [d3.scaleRadial](./d3-scale/linear.md#scaleRadial) - creates a radial scale.

### [Pow scales](./d3-scale/pow.md)

* [d3.scalePow](./d3-scale/pow.md#scalePow) - create a quantitative power scale.
* [d3.scaleSqrt](./d3-scale/pow.md#scaleSqrt) - create a quantitative power scale with exponent 0.5.
* [*pow*.exponent](./d3-scale/pow.md#pow_exponent) - set the power exponent.

### [Log scales](./d3-scale/log.md)

* [d3.scaleLog](./d3-scale/log.md#scaleLog) - create a quantitative logarithmic scale.
* [*log*.base](./d3-scale/log.md#log_base) - set the logarithm base.
* [*log*.ticks](./d3-scale/log.md#log_ticks) - compute representative values from the domain.
* [*log*.tickFormat](./d3-scale/log.md#log_tickFormat) - format ticks for human consumption.
* [*log*.nice](./d3-scale/log.md#log_nice) - extend the domain to nice round numbers.

### [Symlog scales](./d3-scale/symlog.md)

* [d3.scaleSymlog](./d3-scale/symlog.md#scaleSymlog) - create a symmetric logarithmic scale.
* [*symlog*.constant](./d3-scale/symlog.md#symlog_constant) - set the constant of a symlog scale.

### [Time scales](./d3-scale/time.md)

* [d3.scaleTime](./d3-scale/time.md#scaleTime) - create a linear scale for time.
* [*time*.ticks](./d3-scale/time.md#time_ticks) - compute representative values from the domain.
* [*time*.tickFormat](./d3-scale/time.md#time_tickFormat) - format ticks for human consumption.
* [*time*.nice](./d3-scale/time.md#time_nice) - extend the domain to nice round times.
* [d3.scaleUtc](./d3-scale/time.md#scaleUtc) - create a linear scale for UTC.

### [Sequential scales](./d3-scale/sequential.md)

Map a continuous, quantitative domain to a continuous, fixed interpolator.

* [d3.scaleSequential](./d3-scale/sequential.md#scaleSequential) - create a sequential scale.
* [*sequential*.interpolator](./d3-scale/sequential.md#sequential_interpolator) - set the scale’s output interpolator.
* [*sequential*.range](./d3-scale/sequential.md#sequential_range) - set the output range.
* [*sequential*.rangeRound](./d3-scale/sequential.md#sequential_rangeRound) - set the output range and enable rounding.
* [d3.scaleSequentialLog](./d3-scale/sequential.md#scaleSequentialLog) - create a logarithmic sequential scale.
* [d3.scaleSequentialPow](./d3-scale/sequential.md#scaleSequentialPow) - create a power sequential scale.
* [d3.scaleSequentialSqrt](./d3-scale/sequential.md#scaleSequentialSqrt) - create a power sequential scale with exponent 0.5.
* [d3.scaleSequentialSymlog](./d3-scale/sequential.md#scaleSequentialSymlog) - create a symmetric logarithmic sequential scale.
* [d3.scaleSequentialQuantile](./d3-scale/sequential.md#scaleSequentialQuantile) - create a sequential scale using a *p*-quantile transform.
* [*sequentialQuantile*.quantiles](./d3-scale/sequential.md#sequentialQuantile_quantiles) - return the scale’s quantiles.

### [Diverging scales](./d3-scale/diverging.md)

Map a continuous, quantitative domain to a continuous, fixed interpolator.

* [d3.scaleDiverging](./d3-scale/diverging.md#scaleDiverging) - create a diverging scale.
* [*diverging*.interpolator](./d3-scale/diverging.md#diverging_interpolator) - set the scale’s output interpolator.
* [*diverging*.range](./d3-scale/diverging.md#diverging_range) - set the output range.
* [*diverging*.rangeRound](./d3-scale/diverging.md#diverging_rangeRound) - set the output range and enable rounding.
* [d3.scaleDivergingLog](./d3-scale/diverging.md#scaleDivergingLog) - create a diverging logarithmic scale.
* [d3.scaleDivergingPow](./d3-scale/diverging.md#scaleDivergingPow) - create a diverging power scale.
* [d3.scaleDivergingSqrt](./d3-scale/diverging.md#scaleDivergingSqrt) - create a diverging power scale with exponent 0.5.
* [d3.scaleDivergingSymlog](./d3-scale/diverging.md#scaleDivergingSymlog) - create a diverging symmetric logarithmic scale.

### [Quantize scales](./d3-scale/quantize.md)

Map a continuous, quantitative domain to a discrete range.

* [d3.scaleQuantize](./d3-scale/quantize.md#scaleQuantize) - create a uniform quantizing linear scale.
* [*quantize*](./d3-scale/quantize.md#_quantize) - compute the range value corresponding to a given domain value.
* [*quantize*.invertExtent](./d3-scale/quantize.md#quantize_invertExtent) - compute the domain values corresponding to a given range value.
* [*quantize*.domain](./d3-scale/quantize.md#quantize_domain) - set the input domain.
* [*quantize*.range](./d3-scale/quantize.md#quantize_range) - set the output range.
* [*quantize*.thresholds](./d3-scale/quantize.md#quantize_thresholds) - return the array of computed thresholds within the domain.
* [*quantize*.copy](./d3-scale/quantize.md#quantize_copy) - create a copy of this scale.

### [Quantile scales](./d3-scale/quantile.md)

* [d3.scaleQuantile](./d3-scale/quantile.md#scaleQuantile) - create a quantile quantizing linear scale.
* [*quantile*](./d3-scale/quantile.md#_quantile) - compute the range value corresponding to a given domain value.
* [*quantile*.invertExtent](./d3-scale/quantile.md#quantile_invertExtent) - compute the domain values corresponding to a given range value.
* [*quantile*.domain](./d3-scale/quantile.md#quantile_domain) - set the input domain.
* [*quantile*.range](./d3-scale/quantile.md#quantile_range) - set the output range.
* [*quantile*.quantiles](./d3-scale/quantile.md#quantile_quantiles) - get the quantile thresholds.
* [*quantile*.copy](./d3-scale/quantile.md#quantile_copy) - create a copy of this scale.

### [Threshold scales](./d3-scale/threshold.md)

* [d3.scaleThreshold](./d3-scale/threshold.md#scaleThreshold) - create an arbitrary quantizing linear scale.
* [*threshold*](./d3-scale/threshold.md#_threshold) - compute the range value corresponding to a given domain value.
* [*threshold*.invertExtent](./d3-scale/threshold.md#threshold_invertExtent) - compute the domain values corresponding to a given range value.
* [*threshold*.domain](./d3-scale/threshold.md#threshold_domain) - set the input domain.
* [*threshold*.range](./d3-scale/threshold.md#threshold_range) - set the output range.
* [*threshold*.copy](./d3-scale/threshold.md#threshold_copy) - create a copy of this scale.

### [Ordinal scales](./d3-scale/ordinal.md)

Map a discrete domain to a discrete range.

* [d3.scaleOrdinal](./d3-scale/ordinal.md#scaleOrdinal) - create an ordinal scale.
* [*ordinal*](./d3-scale/ordinal.md#_ordinal) - compute the range value corresponding to a given domain value.
* [*ordinal*.domain](./d3-scale/ordinal.md#ordinal_domain) - set the input domain.
* [*ordinal*.range](./d3-scale/ordinal.md#ordinal_range) - set the output range.
* [*ordinal*.unknown](./d3-scale/ordinal.md#ordinal_unknown) - set the output value for unknown inputs.
* [*ordinal*.copy](./d3-scale/ordinal.md#ordinal_copy) - create a copy of this scale.
* [d3.scaleImplicit](./d3-scale/ordinal.md#scaleImplicit) - a special unknown value for implicit domains.

### [Band scales](./d3-scale/band.md)

* [d3.scaleBand](./d3-scale/band.md#scaleBand) - create an ordinal band scale.
* [*band*](./d3-scale/band.md#_band) - compute the band start corresponding to a given domain value.
* [*band*.domain](./d3-scale/band.md#band_domain) - set the input domain.
* [*band*.range](./d3-scale/band.md#band_range) - set the output range.
* [*band*.rangeRound](./d3-scale/band.md#band_rangeRound) - set the output range and enable rounding.
* [*band*.round](./d3-scale/band.md#band_round) - enable rounding.
* [*band*.paddingInner](./d3-scale/band.md#band_paddingInner) - set padding between bands.
* [*band*.paddingOuter](./d3-scale/band.md#band_paddingOuter) - set padding outside the first and last bands.
* [*band*.padding](./d3-scale/band.md#band_padding) - set padding outside and between bands.
* [*band*.align](./d3-scale/band.md#band_align) - set band alignment, if there is extra space.
* [*band*.bandwidth](./d3-scale/band.md#band_bandwidth) - get the width of each band.
* [*band*.step](./d3-scale/band.md#band_step) - get the distance between the starts of adjacent bands.
* [*band*.copy](./d3-scale/band.md#band_copy) - create a copy of this scale.

### [Point scales](./d3-scale/point.md)

* [d3.scalePoint](./d3-scale/point.md#scalePoint) - create an ordinal point scale.
* [*point*](./d3-scale/point.md#_point) - compute the point corresponding to a given domain value.
* [*point*.domain](./d3-scale/point.md#point_domain) - set the input domain.
* [*point*.range](./d3-scale/point.md#point_range) - set the output range.
* [*point*.rangeRound](./d3-scale/point.md#point_rangeRound) - set the output range and enable rounding.
* [*point*.round](./d3-scale/point.md#point_round) - enable rounding.
* [*point*.padding](./d3-scale/point.md#point_padding) - set padding outside the first and last point.
* [*point*.align](./d3-scale/point.md#point_align) - set point alignment, if there is extra space.
* [*point*.bandwidth](./d3-scale/point.md#point_bandwidth) - returns zero.
* [*point*.step](./d3-scale/point.md#point_step) - get the distance between the starts of adjacent points.
* [*point*.copy](./d3-scale/point.md#point_copy) - create a copy of this scale.

## [d3-scale-chromatic](./d3-scale-chromatic.md)

Color ramps and palettes for quantitative, ordinal and categorical scales.

### [Categorical](./d3-scale-chromatic/categorical.md)

* [d3.schemeCategory10](./d3-scale-chromatic/categorical.md#schemeCategory10) - an array of ten categorical colors.
* [d3.schemeAccent](./d3-scale-chromatic/categorical.md#schemeAccent) - an array of eight categorical colors.
* [d3.schemeDark2](./d3-scale-chromatic/categorical.md#schemeDark2) - an array of eight categorical colors.
* [d3.schemeObservable10](./d3-scale-chromatic/categorical.md#schemeObservable10) - an array of ten categorical colors.
* [d3.schemePaired](./d3-scale-chromatic/categorical.md#schemePaired) - an array of twelve categorical colors.
* [d3.schemePastel1](./d3-scale-chromatic/categorical.md#schemePastel1) - an array of nine categorical colors.
* [d3.schemePastel2](./d3-scale-chromatic/categorical.md#schemePastel2) - an array of eight categorical colors.
* [d3.schemeSet1](./d3-scale-chromatic/categorical.md#schemeSet1) - an array of nine categorical colors.
* [d3.schemeSet2](./d3-scale-chromatic/categorical.md#schemeSet2) - an array of eight categorical colors.
* [d3.schemeSet3](./d3-scale-chromatic/categorical.md#schemeSet3) - an array of twelve categorical colors.
* [d3.schemeTableau10](./d3-scale-chromatic/categorical.md#schemeTableau10) - an array of ten categorical colors.

### [Cyclical](./d3-scale-chromatic/cyclical.md)

* [d3.interpolateRainbow](./d3-scale-chromatic/cyclical.md#interpolateRainbow) - the “less-angry” rainbow
* [d3.interpolateSinebow](./d3-scale-chromatic/cyclical.md#interpolateSinebow) - the “sinebow” smooth rainbow

### [Diverging](./d3-scale-chromatic/diverging.md)

* [d3.interpolateBrBG](./d3-scale-chromatic/diverging.md#interpolateBrBG) - ColorBrewer BrBG interpolator.
* [d3.interpolatePiYG](./d3-scale-chromatic/diverging.md#interpolatePiYG) - ColorBrewer PiYG interpolator.
* [d3.interpolatePRGn](./d3-scale-chromatic/diverging.md#interpolatePRGn) - ColorBrewer PRGn interpolator.
* [d3.interpolatePuOr](./d3-scale-chromatic/diverging.md#interpolatePuOr) - ColorBrewer PuOr interpolator.
* [d3.interpolateRdBu](./d3-scale-chromatic/diverging.md#interpolateRdBu) - ColorBrewer RdBu interpolator.
* [d3.interpolateRdGy](./d3-scale-chromatic/diverging.md#interpolateRdGy) - ColorBrewer RdGy interpolator.
* [d3.interpolateRdYlBu](./d3-scale-chromatic/diverging.md#interpolateRdYlBu) - ColorBrewer RdYlBu interpolator.
* [d3.interpolateRdYlGn](./d3-scale-chromatic/diverging.md#interpolateRdYlGn) - ColorBrewer RdYlGn interpolator.
* [d3.interpolateSpectral](./d3-scale-chromatic/diverging.md#interpolateSpectral) - ColorBrewer spectral interpolator.
* [d3.schemeBrBG](./d3-scale-chromatic/diverging.md#schemeBrBG) - ColorBrewer BrBG scheme.
* [d3.schemePiYG](./d3-scale-chromatic/diverging.md#schemePiYG) - ColorBrewer PiYG scheme.
* [d3.schemePRGn](./d3-scale-chromatic/diverging.md#schemePRGn) - ColorBrewer PRGn scheme.
* [d3.schemePuOr](./d3-scale-chromatic/diverging.md#schemePuOr) - ColorBrewer PuOr scheme.
* [d3.schemeRdBu](./d3-scale-chromatic/diverging.md#schemeRdBu) - ColorBrewer RdBu scheme.
* [d3.schemeRdGy](./d3-scale-chromatic/diverging.md#schemeRdGy) - ColorBrewer RdGy scheme.
* [d3.schemeRdYlBu](./d3-scale-chromatic/diverging.md#schemeRdYlBu) - ColorBrewer RdYlBu scheme.
* [d3.schemeRdYlGn](./d3-scale-chromatic/diverging.md#schemeRdYlGn) - ColorBrewer RdYlGn scheme.
* [d3.schemeSpectral](./d3-scale-chromatic/diverging.md#schemeSpectral) - ColorBrewer spectral scheme.

### [Sequential](./d3-scale-chromatic/sequential.md)

* [d3.interpolateBlues](./d3-scale-chromatic/sequential.md#interpolateBlues) -
* [d3.interpolateGreens](./d3-scale-chromatic/sequential.md#interpolateGreens) -
* [d3.interpolateGreys](./d3-scale-chromatic/sequential.md#interpolateGreys) -
* [d3.interpolateOranges](./d3-scale-chromatic/sequential.md#interpolateOranges) -
* [d3.interpolatePurples](./d3-scale-chromatic/sequential.md#interpolatePurples) -
* [d3.interpolateReds](./d3-scale-chromatic/sequential.md#interpolateReds) -
* [d3.schemeBlues](./d3-scale-chromatic/sequential.md#schemeBlues) -
* [d3.schemeGreens](./d3-scale-chromatic/sequential.md#schemeGreens) -
* [d3.schemeGreys](./d3-scale-chromatic/sequential.md#schemeGreys) -
* [d3.schemeOranges](./d3-scale-chromatic/sequential.md#schemeOranges) -
* [d3.schemePurples](./d3-scale-chromatic/sequential.md#schemePurples) -
* [d3.schemeReds](./d3-scale-chromatic/sequential.md#schemeReds) -
* [d3.interpolateBuGn](./d3-scale-chromatic/sequential.md#interpolateBuGn) - ColorBrewer BuGn interpolator.
* [d3.interpolateBuPu](./d3-scale-chromatic/sequential.md#interpolateBuPu) - ColorBrewer BuPu interpolator.
* [d3.interpolateCividis](./d3-scale-chromatic/sequential.md#interpolateCividis) - cividis interpolator.
* [d3.interpolateCool](./d3-scale-chromatic/sequential.md#interpolateCool) - cool interpolator.
* [d3.interpolateCubehelixDefault](./d3-scale-chromatic/sequential.md#interpolateCubehelixDefault) - cubehelix interpolator.
* [d3.interpolateGnBu](./d3-scale-chromatic/sequential.md#interpolateGnBu) - ColorBrewer GnBu interpolator.
* [d3.interpolateInferno](./d3-scale-chromatic/sequential.md#interpolateInferno) - inferno interpolator.
* [d3.interpolateMagma](./d3-scale-chromatic/sequential.md#interpolateMagma) - magma interpolator.
* [d3.interpolateOrRd](./d3-scale-chromatic/sequential.md#interpolateOrRd) - ColorBrewer OrRd interpolator.
* [d3.interpolatePlasma](./d3-scale-chromatic/sequential.md#interpolatePlasma) - plasma interpolator.
* [d3.interpolatePuBu](./d3-scale-chromatic/sequential.md#interpolatePuBu) - ColorBrewer PuBu interpolator.
* [d3.interpolatePuBuGn](./d3-scale-chromatic/sequential.md#interpolatePuBuGn) - ColorBrewer PuBuGn interpolator.
* [d3.interpolatePuRd](./d3-scale-chromatic/sequential.md#interpolatePuRd) - ColorBrewer PuRd interpolator.
* [d3.interpolateRdPu](./d3-scale-chromatic/sequential.md#interpolateRdPu) - ColorBrewer RdPu interpolator.
* [d3.interpolateTurbo](./d3-scale-chromatic/sequential.md#interpolateTurbo) - turbo interpolator.
* [d3.interpolateViridis](./d3-scale-chromatic/sequential.md#interpolateViridis) - viridis interpolator.
* [d3.interpolateWarm](./d3-scale-chromatic/sequential.md#interpolateWarm) - warm interpolator.
* [d3.interpolateYlGn](./d3-scale-chromatic/sequential.md#interpolateYlGn) - ColorBrewer YlGn interpolator.
* [d3.interpolateYlGnBu](./d3-scale-chromatic/sequential.md#interpolateYlGnBu) - ColorBrewer YlGnBu interpolator.
* [d3.interpolateYlOrBr](./d3-scale-chromatic/sequential.md#interpolateYlOrBr) - ColorBrewer YlOrBr interpolator.
* [d3.interpolateYlOrRd](./d3-scale-chromatic/sequential.md#interpolateYlOrRd) - ColorBrewer YlOrRd interpolator.
* [d3.schemeBuGn](./d3-scale-chromatic/sequential.md#schemeBuGn) - ColorBrewer BuGn scheme.
* [d3.schemeBuPu](./d3-scale-chromatic/sequential.md#schemeBuPu) - ColorBrewer BuPu scheme.
* [d3.schemeGnBu](./d3-scale-chromatic/sequential.md#schemeGnBu) - ColorBrewer GnBu scheme.
* [d3.schemeOrRd](./d3-scale-chromatic/sequential.md#schemeOrRd) - ColorBrewer OrRd scheme.
* [d3.schemePuBu](./d3-scale-chromatic/sequential.md#schemePuBu) - ColorBrewer PuBu scheme.
* [d3.schemePuBuGn](./d3-scale-chromatic/sequential.md#schemePuBuGn) - ColorBrewer PuBuGn scheme.
* [d3.schemePuRd](./d3-scale-chromatic/sequential.md#schemePuRd) - ColorBrewer PuRd scheme.
* [d3.schemeRdPu](./d3-scale-chromatic/sequential.md#schemeRdPu) - ColorBrewer RdPu scheme.
* [d3.schemeYlGn](./d3-scale-chromatic/sequential.md#schemeYlGn) - ColorBrewer YlGn scheme.
* [d3.schemeYlGnBu](./d3-scale-chromatic/sequential.md#schemeYlGnBu) - ColorBrewer YlGnBu scheme.
* [d3.schemeYlOrBr](./d3-scale-chromatic/sequential.md#schemeYlOrBr) - ColorBrewer YlOrBr scheme.
* [d3.schemeYlOrRd](./d3-scale-chromatic/sequential.md#schemeYlOrRd) - ColorBrewer YlOrRd scheme.

## [d3-selection](./d3-selection.md)

Transform the DOM by selecting elements and joining to data.

### [Selecting elements](./d3-selection/selecting.md)

* [d3.selection](./d3-selection/selecting.md#selection) - select the root document element.
* [d3.select](./d3-selection/selecting.md#select) - select an element from the document.
* [d3.selectAll](./d3-selection/selecting.md#selectAll) - select multiple elements from the document.
* [*selection*.select](./d3-selection/selecting.md#selection_select) - select a descendant element for each selected element.
* [*selection*.selectAll](./d3-selection/selecting.md#selection_selectAll) - select multiple descendants for each selected element.
* [*selection*.filter](./d3-selection/selecting.md#selection_filter) - filter elements based on data.
* [*selection*.merge](./d3-selection/joining.md#selection_merge) - merge this selection with another.
* [*selection*.selectChild](./d3-selection/selecting.md#selection_selectChild) - select a child element for each selected element.
* [*selection*.selectChildren](./d3-selection/selecting.md#selection_selectChildren) - select the children elements for each selected element.
* [*selection*.selection](./d3-selection/selecting.md#selection_selection) - return the selection.
* [d3.matcher](./d3-selection/selecting.md#matcher) - test whether an element matches a selector.
* [d3.selector](./d3-selection/selecting.md#selector) - select an element.
* [d3.selectorAll](./d3-selection/selecting.md#selectorAll) - select elements.
* [d3.window](./d3-selection/selecting.md#window) - get a node’s owner window.
* [d3.style](./d3-selection/selecting.md#style) - get a node’s current style value.

### [Modifying elements](./d3-selection/modifying.md)

* [*selection*.attr](./d3-selection/modifying.md#selection_attr) - get or set an attribute.
* [*selection*.classed](./d3-selection/modifying.md#selection_classed) - get, add or remove CSS classes.
* [*selection*.style](./d3-selection/modifying.md#selection_style) - get or set a style property.
* [*selection*.property](./d3-selection/modifying.md#selection_property) - get or set a (raw) property.
* [*selection*.text](./d3-selection/modifying.md#selection_text) - get or set the text content.
* [*selection*.html](./d3-selection/modifying.md#selection_html) - get or set the inner HTML.
* [*selection*.append](./d3-selection/modifying.md#selection_append) - create, append and select new elements.
* [*selection*.insert](./d3-selection/modifying.md#selection_insert) - create, insert and select new elements.
* [*selection*.remove](./d3-selection/modifying.md#selection_remove) - remove elements from the document.
* [*selection*.clone](./d3-selection/modifying.md#selection_clone) - insert clones of selected elements.
* [*selection*.sort](./d3-selection/modifying.md#selection_sort) - sort elements in the document based on data.
* [*selection*.order](./d3-selection/modifying.md#selection_order) - reorders elements in the document to match the selection.
* [*selection*.raise](./d3-selection/modifying.md#selection_raise) - reorders each element as the last child of its parent.
* [*selection*.lower](./d3-selection/modifying.md#selection_lower) - reorders each element as the first child of its parent.
* [d3.create](./d3-selection/modifying.md#create) - create and select a detached element.
* [d3.creator](./d3-selection/modifying.md#creator) - create an element by name.

### [Joining data](./d3-selection/joining.md)

* [*selection*.data](./d3-selection/joining.md#selection_data) - bind elements to data.
* [*selection*.join](./d3-selection/joining.md#selection_join) - enter, update or exit elements based on data.
* [*selection*.enter](./d3-selection/joining.md#selection_enter) - get the enter selection (data missing elements).
* [*selection*.exit](./d3-selection/joining.md#selection_exit) - get the exit selection (elements missing data).
* [*selection*.datum](./d3-selection/joining.md#selection_datum) - get or set element data (without joining).

### [Handling events](./d3-selection/events.md)

* [*selection*.on](./d3-selection/events.md#selection_on) - add or remove event listeners.
* [*selection*.dispatch](./d3-selection/events.md#selection_dispatch) - dispatch a custom event.
* [d3.pointer](./d3-selection/events.md#pointer) - get the pointer’s position of an event.
* [d3.pointers](./d3-selection/events.md#pointers) - get the pointers’ positions of an event.

### [Control flow](./d3-selection/control-flow.md)

* [*selection*.each](./d3-selection/control-flow.md#selection_each) - call a function for each element.
* [*selection*.call](./d3-selection/control-flow.md#selection_call) - call a function with this selection.
* [*selection*.empty](./d3-selection/control-flow.md#selection_empty) - returns true if this selection is empty.
* [*selection*.nodes](./d3-selection/control-flow.md#selection_nodes) - returns an array of all selected elements.
* [*selection*.node](./d3-selection/control-flow.md#selection_node) - returns the first (non-null) element.
* [*selection*.size](./d3-selection/control-flow.md#selection_size) - returns the count of elements.
* [*selection*[Symbol.iterator]](./d3-selection/control-flow.md#selection_iterator) - iterate over the selection’s nodes.

### [Local variables](./d3-selection/locals.md)

* [d3.local](./d3-selection/locals.md#local) - declares a new local variable.
* [*local*.set](./d3-selection/locals.md#local_set) - set a local variable’s value.
* [*local*.get](./d3-selection/locals.md#local_get) - get a local variable’s value.
* [*local*.remove](./d3-selection/locals.md#local_remove) - delete a local variable.
* [*local*.toString](./d3-selection/locals.md#local_toString) - get the property identifier of a local variable.

### [Namespaces](./d3-selection/namespaces.md)

* [d3.namespace](./d3-selection/namespaces.md#namespace) - qualify a prefixed XML name, such as “xlink:href”.
* [d3.namespaces](./d3-selection/namespaces.md#namespaces) - the built-in XML namespaces.

## [d3-shape](./d3-shape.md)

Graphical primitives for visualization.

### [Arcs](./d3-shape/arc.md)

Circular or annular sectors, as in a pie or donut chart.

* [d3.arc](./d3-shape/arc.md#arc) - create a new arc generator.
* [*arc*](./d3-shape/arc.md#_arc) - generate an arc for the given datum.
* [*arc*.centroid](./d3-shape/arc.md#arc_centroid) - compute an arc’s midpoint.
* [*arc*.innerRadius](./d3-shape/arc.md#arc_innerRadius) - set the inner radius.
* [*arc*.outerRadius](./d3-shape/arc.md#arc_outerRadius) - set the outer radius.
* [*arc*.cornerRadius](./d3-shape/arc.md#arc_cornerRadius) - set the corner radius, for rounded corners.
* [*arc*.startAngle](./d3-shape/arc.md#arc_startAngle) - set the start angle.
* [*arc*.endAngle](./d3-shape/arc.md#arc_endAngle) - set the end angle.
* [*arc*.padAngle](./d3-shape/arc.md#arc_padAngle) - set the angle between adjacent arcs, for padded arcs.
* [*arc*.padRadius](./d3-shape/arc.md#arc_padRadius) - set the radius at which to linearize padding.
* [*arc*.context](./d3-shape/arc.md#arc_context) - set the rendering context.
* [*arc*.digits](./d3-shape/arc.md#arc_digits) - set the output precision.

### [Pies](./d3-shape/pie.md)

Compute the necessary angles to represent a tabular dataset as a pie or donut chart.

* [d3.pie](./d3-shape/pie.md#pie) - create a new pie generator.
* [*pie*](./d3-shape/pie.md#_pie) - compute the arc angles for the given dataset.
* [*pie*.value](./d3-shape/pie.md#pie_value) - set the value accessor.
* [*pie*.sort](./d3-shape/pie.md#pie_sort) - set the sort order comparator.
* [*pie*.sortValues](./d3-shape/pie.md#pie_sortValues) - set the sort order comparator.
* [*pie*.startAngle](./d3-shape/pie.md#pie_startAngle) - set the overall start angle.
* [*pie*.endAngle](./d3-shape/pie.md#pie_endAngle) - set the overall end angle.
* [*pie*.padAngle](./d3-shape/pie.md#pie_padAngle) - set the pad angle between adjacent arcs.

### [Lines](./d3-shape/line.md)

A spline or polyline, as in a line chart.

* [d3.line](./d3-shape/line.md#line) - create a new line generator.
* [*line*](./d3-shape/line.md#_line) - generate a line for the given dataset.
* [*line*.x](./d3-shape/line.md#line_x) - set the *x* accessor.
* [*line*.y](./d3-shape/line.md#line_y) - set the *y* accessor.
* [*line*.defined](./d3-shape/line.md#line_defined) - set the defined accessor.
* [*line*.curve](./d3-shape/line.md#line_curve) - set the curve interpolator.
* [*line*.context](./d3-shape/line.md#line_context) - set the rendering context.
* [*line*.digits](./d3-shape/line.md#line_digits) - set the output precision.
* [d3.lineRadial](./d3-shape/radial-line.md#lineRadial) - create a new radial line generator.
* [*lineRadial*](./d3-shape/radial-line.md#_lineRadial) - generate a line for the given dataset.
* [*lineRadial*.angle](./d3-shape/radial-line.md#lineRadial_angle) - set the angle accessor.
* [*lineRadial*.radius](./d3-shape/radial-line.md#lineRadial_radius) - set the radius accessor.
* [*lineRadial*.defined](./d3-shape/radial-line.md#lineRadial_defined) - set the defined accessor.
* [*lineRadial*.curve](./d3-shape/radial-line.md#lineRadial_curve) - set the curve interpolator.
* [*lineRadial*.context](./d3-shape/radial-line.md#lineRadial_context) - set the rendering context.

### [Areas](./d3-shape/area.md)

An area, defined by a bounding topline and baseline, as in an area chart.

* [d3.area](./d3-shape/area.md#area) - create a new area generator.
* [*area*](./d3-shape/area.md#_area) - generate an area for the given dataset.
* [*area*.x](./d3-shape/area.md#area_x) - set the *x0* and *x1* accessors.
* [*area*.x0](./d3-shape/area.md#area_x0) - set the baseline *x* accessor.
* [*area*.x1](./d3-shape/area.md#area_x1) - set the topline *x* accessor.
* [*area*.y](./d3-shape/area.md#area_y) - set the *y0* and *y1* accessors.
* [*area*.y0](./d3-shape/area.md#area_y0) - set the baseline *y* accessor.
* [*area*.y1](./d3-shape/area.md#area_y1) - set the topline *y* accessor.
* [*area*.defined](./d3-shape/area.md#area_defined) - set the defined accessor.
* [*area*.curve](./d3-shape/area.md#area_curve) - set the curve interpolator.
* [*area*.context](./d3-shape/area.md#area_context) - set the rendering context.
* [*area*.digits](./d3-shape/area.md#area_digits) - set the output precision.
* [*area*.lineX0](./d3-shape/area.md#area_lineX0) - derive a line for the left edge of an area.
* [*area*.lineY0](./d3-shape/area.md#area_lineY0) - derive a line for the top edge of an area.
* [*area*.lineX1](./d3-shape/area.md#area_lineX1) - derive a line for the right edge of an area.
* [*area*.lineY1](./d3-shape/area.md#area_lineY1) - derive a line for the bottom edge of an area.
* [d3.areaRadial](./d3-shape/radial-area.md#areaRadial) - create a new radial area generator.
* [*areaRadial*](./d3-shape/radial-area.md#_areaRadial) - generate an area for the given dataset.
* [*areaRadial*.angle](./d3-shape/radial-area.md#areaRadial_angle) - set the start and end angle accessors.
* [*areaRadial*.startAngle](./d3-shape/radial-area.md#areaRadial_startAngle) - set the start angle accessor.
* [*areaRadial*.endAngle](./d3-shape/radial-area.md#areaRadial_endAngle) - set the end angle accessor.
* [*areaRadial*.radius](./d3-shape/radial-area.md#areaRadial_radius) - set the inner and outer radius accessors.
* [*areaRadial*.innerRadius](./d3-shape/radial-area.md#areaRadial_innerRadius) - set the inner radius accessor.
* [*areaRadial*.outerRadius](./d3-shape/radial-area.md#areaRadial_outerRadius) - set the outer radius accessor.
* [*areaRadial*.defined](./d3-shape/radial-area.md#areaRadial_defined) - set the defined accessor.
* [*areaRadial*.curve](./d3-shape/radial-area.md#areaRadial_curve) - set the curve interpolator.
* [*areaRadial*.context](./d3-shape/radial-area.md#areaRadial_context) - set the rendering context.
* [*areaRadial*.lineStartAngle](./d3-shape/radial-area.md#areaRadial_lineStartAngle) - derive a line for the start edge of an area.
* [*areaRadial*.lineInnerRadius](./d3-shape/radial-area.md#areaRadial_lineInnerRadius) - derive a line for the inner edge of an area.
* [*areaRadial*.lineEndAngle](./d3-shape/radial-area.md#areaRadial_lineEndAngle) - derive a line for the end edge of an area.
* [*areaRadial*.lineOuterRadius](./d3-shape/radial-area.md#areaRadial_lineOuterRadius) - derive a line for the outer edge of an area.

### [Curves](./d3-shape/curve.md)

Interpolate between points to produce a continuous shape.

* [d3.curveBasis](./d3-shape/curve.md#curveBasis) - a cubic basis spline, repeating the end points.
* [d3.curveBasisClosed](./d3-shape/curve.md#curveBasisClosed) - a closed cubic basis spline.
* [d3.curveBasisOpen](./d3-shape/curve.md#curveBasisOpen) - a cubic basis spline.
* [d3.curveBundle](./d3-shape/curve.md#curveBundle) - a straightened cubic basis spline.
* [*bundle*.beta](./d3-shape/curve.md#curveBundle_beta) - set the bundle tension *beta*.
* [d3.curveBumpX](./d3-shape/curve.md#curveBumpX) - a cubic Bézier spline with horizontal tangents.
* [d3.curveBumpY](./d3-shape/curve.md#curveBumpY) - a cubic Bézier spline with vertical tangents.
* [d3.curveCardinal](./d3-shape/curve.md#curveCardinal) - a cubic cardinal spline, with one-sided difference at each end.
* [d3.curveCardinalClosed](./d3-shape/curve.md#curveCardinalClosed) - a closed cubic cardinal spline.
* [d3.curveCardinalOpen](./d3-shape/curve.md#curveCardinalOpen) - a cubic cardinal spline.
* [*cardinal*.tension](./d3-shape/curve.md#curveCardinal_tension) - set the cardinal spline tension.
* [d3.curveCatmullRom](./d3-shape/curve.md#curveCatmullRom) - a cubic Catmull–Rom spline, with one-sided difference at each end.
* [d3.curveCatmullRomClosed](./d3-shape/curve.md#curveCatmullRomClosed) - a closed cubic Catmull–Rom spline.
* [d3.curveCatmullRomOpen](./d3-shape/curve.md#curveCatmullRomOpen) - a cubic Catmull–Rom spline.
* [*catmullRom*.alpha](./d3-shape/curve.md#curveCatmullRom_alpha) - set the Catmull–Rom parameter *alpha*.
* [d3.curveLinear](./d3-shape/curve.md#curveLinear) - a polyline.
* [d3.curveLinearClosed](./d3-shape/curve.md#curveLinearClosed) - a closed polyline.
* [d3.curveMonotoneX](./d3-shape/curve.md#curveMonotoneX) - a cubic spline that, given monotonicity in *x*, preserves it in *y*.
* [d3.curveMonotoneY](./d3-shape/curve.md#curveMonotoneY) - a cubic spline that, given monotonicity in *y*, preserves it in *x*.
* [d3.curveNatural](./d3-shape/curve.md#curveNatural) - a natural cubic spline.
* [d3.curveStep](./d3-shape/curve.md#curveStep) - a piecewise constant function.
* [d3.curveStepAfter](./d3-shape/curve.md#curveStepAfter) - a piecewise constant function.
* [d3.curveStepBefore](./d3-shape/curve.md#curveStepBefore) - a piecewise constant function.
* [*curve*.areaStart](./d3-shape/curve.md#curve_areaStart) - start a new area segment.
* [*curve*.areaEnd](./d3-shape/curve.md#curve_areaEnd) - end the current area segment.
* [*curve*.lineStart](./d3-shape/curve.md#curve_lineStart) - start a new line segment.
* [*curve*.lineEnd](./d3-shape/curve.md#curve_lineEnd) - end the current line segment.
* [*curve*.point](./d3-shape/curve.md#curve_point) - add a point to the current line segment.

### [Links](./d3-shape/link.md)

A smooth cubic Bézier curve from a source to a target.

* [d3.link](./d3-shape/link.md#link) - create a new link generator.
* [d3.linkVertical](./d3-shape/link.md#linkVertical) - create a new vertical link generator.
* [d3.linkHorizontal](./d3-shape/link.md#linkHorizontal) - create a new horizontal link generator.
* [*link*](./d3-shape/link.md#_link) - generate a link.
* [*link*.source](./d3-shape/link.md#link_source) - set the source accessor.
* [*link*.target](./d3-shape/link.md#link_target) - set the target accessor.
* [*link*.x](./d3-shape/link.md#link_x) - set the point *x*-accessor.
* [*link*.y](./d3-shape/link.md#link_y) - set the point *y*-accessor.
* [*link*.context](./d3-shape/link.md#link_context) - set the rendering context.
* [*link*.digits](./d3-shape/link.md#link_digits) - set the output precision.
* [d3.linkRadial](./d3-shape/radial-link.md#linkRadial) - create a new radial link generator.
* [*linkRadial*.angle](./d3-shape/radial-link.md#linkRadial_angle) - set the point *angle* accessor.
* [*linkRadial*.radius](./d3-shape/radial-link.md#linkRadial_radius) - set the point *radius* accessor.

### [Symbols](./d3-shape/symbol.md)

A categorical shape encoding, as in a scatterplot.

* [d3.symbol](./d3-shape/symbol.md#symbol) - create a new symbol generator.
* [*symbol*](./d3-shape/symbol.md#_symbol) - generate a symbol for the given datum.
* [*symbol*.type](./d3-shape/symbol.md#symbol_type) - set the symbol type.
* [*symbol*.size](./d3-shape/symbol.md#symbol_size) - set the size of the symbol in square pixels.
* [*symbol*.context](./d3-shape/symbol.md#symbol_context) - set the rendering context.
* [*symbol*.digits](./d3-shape/symbol.md#symbol_digits) - set the output precision.
* [d3.symbolsFill](./d3-shape/symbol.md#symbolsFill) - an array of built-in symbol types for filling.
* [d3.symbolsStroke](./d3-shape/symbol.md#symbolsStroke) - an array of built-in symbol types for stroking.
* [d3.symbolAsterisk](./d3-shape/symbol.md#symbolAsterisk) - an asterisk; for stroke.
* [d3.symbolCircle](./d3-shape/symbol.md#symbolCircle) - a circle; for fill or stroke.
* [d3.symbolCross](./d3-shape/symbol.md#symbolCross) - a Greek cross with arms of equal length; for fill.
* [d3.symbolDiamond](./d3-shape/symbol.md#symbolDiamond) - a rhombus; for fill.
* [d3.symbolDiamond2](./d3-shape/symbol.md#symbolDiamond2) - a rotated square; for stroke.
* [d3.symbolPlus](./d3-shape/symbol.md#symbolPlus) - a plus sign; for stroke.
* [d3.symbolSquare](./d3-shape/symbol.md#symbolSquare) - a square; for fill.
* [d3.symbolSquare2](./d3-shape/symbol.md#symbolSquare2) - a square; for stroke.
* [d3.symbolStar](./d3-shape/symbol.md#symbolStar) - a pentagonal star (pentagram); for fill.
* [d3.symbolTriangle](./d3-shape/symbol.md#symbolTriangle) - an up-pointing triangle; for fill.
* [d3.symbolTriangle2](./d3-shape/symbol.md#symbolTriangle2) - an up-pointing triangle; for stroke.
* [d3.symbolWye](./d3-shape/symbol.md#symbolWye) - a Y shape; for fill.
* [d3.pointRadial](./d3-shape/symbol.md#pointRadial) - relative coordinates of a point given an angle and radius.
* [*symbolType*.draw](./d3-shape/symbol.md#symbolType_draw) - draw this symbol to the given context.

### [Stacks](./d3-shape/stack.md)

Stack shapes, placing one adjacent to another, as in a stacked bar chart.

* [d3.stack](./d3-shape/stack.md#stack) - create a new stack generator.
* [*stack*](./d3-shape/stack.md#_stack) - generate a stack for the given dataset.
* [*stack*.keys](./d3-shape/stack.md#stack_keys) - set the keys accessor.
* [*stack*.value](./d3-shape/stack.md#stack_value) - set the value accessor.
* [*stack*.order](./d3-shape/stack.md#stack_order) - set the order accessor.
* [*stack*.offset](./d3-shape/stack.md#stack_offset) - set the offset accessor.
* [d3.stackOrderAppearance](./d3-shape/stack.md#stackOrderAppearance) - put the earliest series on bottom.
* [d3.stackOrderAscending](./d3-shape/stack.md#stackOrderAscending) - put the smallest series on bottom.
* [d3.stackOrderDescending](./d3-shape/stack.md#stackOrderDescending) - put the largest series on bottom.
* [d3.stackOrderInsideOut](./d3-shape/stack.md#stackOrderInsideOut) - put earlier series in the middle.
* [d3.stackOrderNone](./d3-shape/stack.md#stackOrderNone) - use the given series order.
* [d3.stackOrderReverse](./d3-shape/stack.md#stackOrderReverse) - use the reverse of the given series order.
* [d3.stackOffsetExpand](./d3-shape/stack.md#stackOffsetExpand) - normalize the baseline to zero and topline to one.
* [d3.stackOffsetDiverging](./d3-shape/stack.md#stackOffsetDiverging) - positive above zero; negative below zero.
* [d3.stackOffsetNone](./d3-shape/stack.md#stackOffsetNone) - apply a zero baseline.
* [d3.stackOffsetSilhouette](./d3-shape/stack.md#stackOffsetSilhouette) - center the streamgraph around zero.
* [d3.stackOffsetWiggle](./d3-shape/stack.md#stackOffsetWiggle) - minimize streamgraph wiggling.

## [d3-time](./d3-time.md)

A calculator for humanity’s peculiar conventions of time.

* [d3.timeInterval](./d3-time.md#timeInterval) - implement a new custom time interval.
* [*interval*](./d3-time.md#_interval) - alias for *interval*.floor.
* [*interval*.floor](./d3-time.md#interval_floor) - round down to the nearest boundary.
* [*interval*.round](./d3-time.md#interval_round) - round to the nearest boundary.
* [*interval*.ceil](./d3-time.md#interval_ceil) - round up to the nearest boundary.
* [*interval*.offset](./d3-time.md#interval_offset) - offset a date by some number of intervals.
* [*interval*.range](./d3-time.md#interval_range) - generate a range of dates at interval boundaries.
* [*interval*.filter](./d3-time.md#interval_filter) - create a filtered subset of this interval.
* [*interval*.every](./d3-time.md#interval_every) - create a filtered subset of this interval.
* [*interval*.count](./d3-time.md#interval_count) - count interval boundaries between two dates.
* [d3.timeMillisecond](./d3-time.md#timeMillisecond) - the millisecond interval, local time.
* [d3.timeSecond](./d3-time.md#timeSecond) - the second interval, local time.
* [d3.timeMinute](./d3-time.md#timeMinute) - the minute interval, local time.
* [d3.timeHour](./d3-time.md#timeHour) - the hour interval, local time.
* [d3.timeDay](./d3-time.md#timeDay) - the day interval, local time.
* [d3.timeWeek](./d3-time.md#timeWeek) - the Sunday-based week interval, local time.
* [d3.timeSunday](./d3-time.md#timeSunday) - the Sunday-based week interval, local time.
* [d3.timeMonday](./d3-time.md#timeMonday) - the Monday-based week interval, local time.
* [d3.timeTuesday](./d3-time.md#timeTuesday) - the Tuesday-based week interval, local time.
* [d3.timeWednesday](./d3-time.md#timeWednesday) - the Wednesday-based week interval, local time.
* [d3.timeThursday](./d3-time.md#timeThursday) - the Thursday-based week interval, local time.
* [d3.timeFriday](./d3-time.md#timeFriday) - the Friday-based week interval, local time.
* [d3.timeSaturday](./d3-time.md#timeSaturday) - the Saturday-based week interval, local time.
* [d3.timeMonth](./d3-time.md#timeMonth) - the month interval, local time.
* [d3.timeYear](./d3-time.md#timeYear) - the year interval, local time.
* [d3.utcMillisecond](./d3-time.md#timeMillisecond) - the millisecond interval, UTC time.
* [d3.utcSecond](./d3-time.md#timeSecond) - the second interval, UTC time.
* [d3.utcMinute](./d3-time.md#timeMinute) - the minute interval, UTC time.
* [d3.utcHour](./d3-time.md#timeHour) - the hour interval, UTC time.
* [d3.utcDay](./d3-time.md#timeDay) - the day interval, UTC time.
* [d3.utcWeek](./d3-time.md#timeWeek) - the Sunday-based week interval, UTC time.
* [d3.utcSunday](./d3-time.md#timeSunday) - the Sunday-based week interval, UTC time.
* [d3.utcMonday](./d3-time.md#timeMonday) - the Monday-based week interval, UTC time.
* [d3.utcTuesday](./d3-time.md#timeTuesday) - the Tuesday-based week interval, UTC time.
* [d3.utcWednesday](./d3-time.md#timeWednesday) - the Wednesday-based week interval, UTC time.
* [d3.utcThursday](./d3-time.md#timeThursday) - the Thursday-based week interval, UTC time.
* [d3.utcFriday](./d3-time.md#timeFriday) - the Friday-based week interval, UTC time.
* [d3.utcSaturday](./d3-time.md#timeSaturday) - the Saturday-based week interval, UTC time.
* [d3.utcMonth](./d3-time.md#timeMonth) - the month interval, UTC time.
* [d3.utcYear](./d3-time.md#timeYear) - the year interval, UTC time.
* [d3.unixDay](./d3-time.md#timeDay) - the day interval, UTC time, not month-aligned.
* [d3.timeMilliseconds](./d3-time.md#timeMilliseconds) - alias for d3.timeMillisecond.range.
* [d3.timeSeconds](./d3-time.md#timeSeconds) - alias for d3.timeSecond.range.
* [d3.timeMinutes](./d3-time.md#timeMinutes) - alias for d3.timeMinute.range.
* [d3.timeHours](./d3-time.md#timeHours) - alias for d3.timeHour.range.
* [d3.timeDays](./d3-time.md#timeDay) - alias for d3.timeDay.range.
* [d3.timeWeeks](./d3-time.md#timeWeek) - alias for d3.timeWeek.range.
* [d3.timeSundays](./d3-time.md#timeSunday) - alias for d3.timeSunday.range.
* [d3.timeMondays](./d3-time.md#timeMonday) - alias for d3.timeMonday.range.
* [d3.timeTuesdays](./d3-time.md#timeTuesday) - alias for d3.timeTuesday.range.
* [d3.timeWednesdays](./d3-time.md#timeWednesday) - alias for d3.timeWednesday.range.
* [d3.timeThursdays](./d3-time.md#timeThursday) - alias for d3.timeThursday.range.
* [d3.timeFridays](./d3-time.md#timeFriday) - alias for d3.timeFriday.range.
* [d3.timeSaturdays](./d3-time.md#timeSaturday) - alias for d3.timeSaturday.range.
* [d3.timeMonths](./d3-time.md#timeMonth) - alias for d3.timeMonth.range.
* [d3.timeYears](./d3-time.md#timeYear) - alias for d3.timeYear.range.
* [d3.utcMilliseconds](./d3-time.md#timeMillisecond) - alias for d3.utcMillisecond.range.
* [d3.utcSeconds](./d3-time.md#timeSecond) - alias for d3.utcSecond.range.
* [d3.utcMinutes](./d3-time.md#timeMinute) - alias for d3.utcMinute.range.
* [d3.utcHours](./d3-time.md#timeHour) - alias for d3.utcHour.range.
* [d3.utcDays](./d3-time.md#timeDay) - alias for d3.utcDay.range.
* [d3.utcWeeks](./d3-time.md#timeWeek) - alias for d3.utcWeek.range.
* [d3.utcSundays](./d3-time.md#timeSunday) - alias for d3.utcSunday.range.
* [d3.utcMondays](./d3-time.md#timeMonday) - alias for d3.utcMonday.range.
* [d3.utcTuesdays](./d3-time.md#timeTuesday) - alias for d3.utcTuesday.range.
* [d3.utcWednesdays](./d3-time.md#timeWednesday) - alias for d3.utcWednesday.range.
* [d3.utcThursdays](./d3-time.md#timeThursday) - alias for d3.utcThursday.range.
* [d3.utcFridays](./d3-time.md#timeFriday) - alias for d3.utcFriday.range.
* [d3.utcSaturdays](./d3-time.md#timeSaturday) - alias for d3.utcSaturday.range.
* [d3.utcMonths](./d3-time.md#timeMonth) - alias for d3.utcMonth.range.
* [d3.utcYears](./d3-time.md#timeYear) - alias for d3.utcYear.range.
* [d3.unixDays](./d3-time.md#timeDay) - alias for d3.unixDay.range.
* [d3.timeTicks](./d3-time.md#timeTicks) - generate representative values from a time interval.
* [d3.utcTicks](./d3-time.md#utcTicks) - generate representative values from a time interval.
* [d3.timeTickInterval](./d3-time.md#timeTickInterval) - generate representative values from a time interval.
* [d3.utcTickInterval](./d3-time.md#utcTickInterval) - generate representative values from a time interval.

## [d3-time-format](./d3-time-format.md)

Parse and format times, inspired by strptime and strftime.

* [d3.timeFormat](./d3-time-format.md#timeFormat) - alias for *locale*.format on the default locale.
* [d3.timeParse](./d3-time-format.md#timeParse) - alias for *locale*.parse on the default locale.
* [d3.utcFormat](./d3-time-format.md#utcFormat) -  alias for *locale*.utcFormat on the default locale.
* [d3.utcParse](./d3-time-format.md#utcParse) -  alias for *locale*.utcParse on the default locale.
* [d3.isoFormat](./d3-time-format.md#isoFormat) - an ISO 8601 UTC formatter.
* [d3.isoParse](./d3-time-format.md#isoParse) - an ISO 8601 UTC parser.
* [*locale*.format](./d3-time-format.md#locale_format) - create a time formatter.
* [*locale*.parse](./d3-time-format.md#locale_parse) - create a time parser.
* [*locale*.utcFormat](./d3-time-format.md#locale_utcFormat) - create a UTC formatter.
* [*locale*.utcParse](./d3-time-format.md#locale_utcParse) - create a UTC parser.
* [d3.timeFormatLocale](./d3-time-format.md#timeFormatLocale) - define a custom locale.
* [d3.timeFormatDefaultLocale](./d3-time-format.md#timeFormatDefaultLocale) - define the default locale.

## [d3-timer](./d3-timer.md)

An efficient queue for managing thousands of concurrent animations.

* [d3.now](./d3-timer.md#now) - get the current high-resolution time.
* [d3.timer](./d3-timer.md#timer) - schedule a new timer.
* [*timer*.restart](./d3-timer.md#timer_restart) - reset the timer’s start time and callback.
* [*timer*.stop](./d3-timer.md#timer_stop) - stop the timer.
* [d3.timerFlush](./d3-timer.md#timerFlush) - immediately execute any eligible timers.
* [d3.timeout](./d3-timer.md#timeout) - schedule a timer that stops on its first callback.
* [d3.interval](./d3-timer.md#interval) - schedule a timer that is called with a configurable period.

## [d3-transition](./d3-transition.md)

Animated transitions for [selections](./d3-selection.md).

* [*selection*.transition](./d3-transition/selecting.md#selection_transition) - schedule a transition for the selected elements.
* [*selection*.interrupt](./d3-transition/control-flow.md#selection_interrupt) - interrupt and cancel transitions on the selected elements.
* [d3.interrupt](./d3-transition/control-flow.md#interrupt) - interrupt the active transition for a given node.
* [d3.transition](./d3-transition/selecting.md#transition) - schedule a transition on the root document element.
* [*transition*.select](./d3-transition/selecting.md#transition_select) - schedule a transition on the selected elements.
* [*transition*.selectAll](./d3-transition/selecting.md#transition_selectAll) - schedule a transition on the selected elements.
* [*transition*.selectChild](./d3-transition/selecting.md#transition_selectChild) - select a child element for each selected element.
* [*transition*.selectChildren](./d3-transition/selecting.md#transition_selectChildren) - select the children elements for each selected element.
* [*transition*.selection](./d3-transition/selecting.md#transition_selection) - returns a selection for this transition.
* [*transition*.filter](./d3-transition/selecting.md#transition_filter) - filter elements based on data.
* [*transition*.merge](./d3-transition/selecting.md#transition_merge) - merge this transition with another.
* [*transition*.transition](./d3-transition/selecting.md#transition_transition) - schedule a new transition following this one.
* [d3.active](./d3-transition/selecting.md#active) - select the active transition for a given node.
* [*transition*.attr](./d3-transition/modifying.md#transition_attr) - tween the given attribute using the default interpolator.
* [*transition*.attrTween](./d3-transition/modifying.md#transition_attrTween) - tween the given attribute using a custom interpolator.
* [*transition*.style](./d3-transition/modifying.md#transition_style) - tween the given style property using the default interpolator.
* [*transition*.styleTween](./d3-transition/modifying.md#transition_styleTween) - tween the given style property using a custom interpolator.
* [*transition*.text](./d3-transition/modifying.md#transition_text) - set the text content when the transition starts.
* [*transition*.textTween](./d3-transition/modifying.md#transition_textTween) - tween the text using a custom interpolator.
* [*transition*.remove](./d3-transition/modifying.md#transition_remove) - remove the selected elements when the transition ends.
* [*transition*.tween](./d3-transition/modifying.md#transition_tween) - run custom code during the transition.
* [*transition*.delay](./d3-transition/timing.md#transition_delay) - specify per-element delay in milliseconds.
* [*transition*.duration](./d3-transition/timing.md#transition_duration) - specify per-element duration in milliseconds.
* [*transition*.ease](./d3-transition/timing.md#transition_ease) - specify the easing function.
* [*transition*.easeVarying](./d3-transition/timing.md#transition_easeVarying) - specify an easing function factory.
* [*transition*.end](./d3-transition/control-flow.md#transition_end) - a promise that resolves when a transition ends.
* [*transition*.on](./d3-transition/control-flow.md#transition_on) - await the end of a transition.
* [*transition*.each](./d3-transition/control-flow.md#transition_each) - call a function for each element.
* [*transition*.call](./d3-transition/control-flow.md#transition_call) - call a function with this transition.
* [*transition*.empty](./d3-transition/control-flow.md#transition_empty) - returns true if this transition is empty.
* [*transition*.nodes](./d3-transition/control-flow.md#transition_nodes) - returns an array of all selected elements.
* [*transition*.node](./d3-transition/control-flow.md#transition_node) - returns the first (non-null) element.
* [*transition*.size](./d3-transition/control-flow.md#transition_size) - returns the count of elements.

## [d3-zoom](./d3-zoom.md)

Pan and zoom SVG, HTML or Canvas using mouse or touch input.

* [d3.zoom](./d3-zoom.md#zoom) - create a zoom behavior.
* [*zoom*](./d3-zoom.md#_zoom) - apply the zoom behavior to the selected elements.
* [*zoom*.transform](./d3-zoom.md#zoom_transform) - change the transform for the selected elements.
* [*zoom*.translateBy](./d3-zoom.md#zoom_translateBy) - translate the transform for the selected elements.
* [*zoom*.translateTo](./d3-zoom.md#zoom_translateTo) - translate the transform for the selected elements.
* [*zoom*.scaleBy](./d3-zoom.md#zoom_scaleBy) - scale the transform for the selected elements.
* [*zoom*.scaleTo](./d3-zoom.md#zoom_scaleTo) - scale the transform for the selected elements.
* [*zoom*.constrain](./d3-zoom.md#zoom_constrain) - override the transform constraint logic.
* [*zoom*.filter](./d3-zoom.md#zoom_filter) - control which input events initiate zooming.
* [*zoom*.touchable](./d3-zoom.md#zoom_touchable) - set the touch support detector.
* [*zoom*.wheelDelta](./d3-zoom.md#zoom_wheelDelta) - override scaling for wheel events.
* [*zoom*.extent](./d3-zoom.md#zoom_extent) - set the extent of the viewport.
* [*zoom*.scaleExtent](./d3-zoom.md#zoom_scaleExtent) - set the allowed scale range.
* [*zoom*.translateExtent](./d3-zoom.md#zoom_translateExtent) - set the extent of the zoomable world.
* [*zoom*.clickDistance](./d3-zoom.md#zoom_clickDistance) - set the click distance threshold.
* [*zoom*.tapDistance](./d3-zoom.md#zoom_tapDistance) - set the tap distance threshold.
* [*zoom*.duration](./d3-zoom.md#zoom_duration) - set the duration of zoom transitions.
* [*zoom*.interpolate](./d3-zoom.md#zoom_interpolate) - control the interpolation of zoom transitions.
* [*zoom*.on](./d3-zoom.md#zoom_on) - listen for zoom events.
* [d3.zoomTransform](./d3-zoom.md#zoomTransform) - get the zoom transform for a given element.
* [*transform*.scale](./d3-zoom.md#transform_scale) - scale a transform by the specified amount.
* [*transform*.translate](./d3-zoom.md#transform_translate) - translate a transform by the specified amount.
* [*transform*.apply](./d3-zoom.md#transform_apply) - apply the transform to the given point.
* [*transform*.applyX](./d3-zoom.md#transform_applyX) - apply the transform to the given *x*-coordinate.
* [*transform*.applyY](./d3-zoom.md#transform_applyY) - apply the transform to the given y coordinate.
* [*transform*.invert](./d3-zoom.md#transform_invert) - unapply the transform to the given point.
* [*transform*.invertX](./d3-zoom.md#transform_invertX) - unapply the transform to the given *x*-coordinate.
* [*transform*.invertY](./d3-zoom.md#transform_invertY) - unapply the transform to the given y coordinate.
* [*transform*.rescaleX](./d3-zoom.md#transform_rescaleX) - apply the transform to an x scale’s domain.
* [*transform*.rescaleY](./d3-zoom.md#transform_rescaleY) - apply the transform to a y scale’s domain.
* [*transform*.toString](./d3-zoom.md#transform_toString) - format the transform as an SVG transform string.
* [d3.zoomIdentity](./d3-zoom.md#zoomIdentity) - the identity transform.

# docs/community.md

# Community 🏠 {#community}

Learning D3? Love data visualization? Don’t go it alone! Join our community to get help, be inspired, and do the same for others.

## Staying up-to-date

If you like D3, please star ⭐️ our [GitHub repo](https://github.com/d3/d3) to show appreciation and to see updates on your GitHub dashboard.

And of course, follow us on [Observable](https://observablehq.com/@observablehq?tab=profile), [Mastodon](https://vis.social/@observablehq), [Twitter](https://twitter.com/observablehq), and [LinkedIn](https://www.linkedin.com/company/observable)!

## Getting help

We recommend asking for help on the [Observable forum](https://talk.observablehq.com). Or if you prefer chat, join the [Observable community Slack](https://observablehq.com/slack/join).

We encourage you to share your work, no matter how messy, on [Observable](https://observablehq.com). Sharing live code is the easiest way to let people see what you see, and to debug your problem. Strive for a [minimal, reproducible example](https://stackoverflow.com/help/minimal-reproducible-example) — it helps people hone in on your problem more quickly.

When asking for help, don’t just post your code and ask people to fix it. Provide context, and say what you want help with. For example:

- What are you trying to achieve? What is your goal?
- What other solutions have you tried?
- What behavior are you currently seeing?
- Is the current behavior not what you expect?

If you think you’ve found a bug in D3, please file a [GitHub issue](https://github.com/d3/d3/issues). But don’t use an issue to ask for help — you’ll have better luck on the forum or Slack.

## Getting involved

We’d love for you to join the community! Here are some ways to participate:

* Share your work on [Observable](https://observablehq.com). Working in public is a great way to help others learn and be inspired. Don’t worry if your code is messy or unfinished; sharing drafts normalizes the challenges that everyone experiences doing data visualization.

* Upvote 👍 or comment on [GitHub issues](https://github.com/d3/d3/issues). We’d love your input on what to build next. If your desired feature isn’t already there, or if you’ve found a bug, file an issue and tell us about it.

* Answer questions or participate in discussions on the [Observable forum](https://talk.observablehq.com/) and the [Observable community Slack](https://observablehq.com/slack/join). You’ll help others, and might learn something yourself, too.

Please help us maintain a positive environment for all by adhering to our [code of conduct](https://github.com/observablehq/.github/blob/master/CODE_OF_CONDUCT.md). Thank you!

# docs/d3-array.md

# d3-array

Array manipulation, ordering, searching, summarizing, *etc.*

See one of:

* [Adding numbers](./d3-array/add.md) - Add floating point values with full precision.
* [Binning data](./d3-array/bin.md) - Bin discrete samples into continuous, non-overlapping intervals.
* [Bisecting data](./d3-array/bisect.md) - Quickly find a value in a sorted array.
* [Blurring data](./d3-array/blur.md) - Blur quantitative values in one or two dimensions.
* [Grouping data](./d3-array/group.md) - Group discrete values.
* [Interning values](./d3-array/intern.md) - Create maps and sets with non-primitive values such as dates.
* [Set operations](./d3-array/sets.md) - Logical operations on sets.
* [Sorting data](./d3-array/sort.md) - Sort and reorder arrays of values.
* [Summarizing data](./d3-array/summarize.md) - Compute summary statistics.
* [Ticks](./d3-array/ticks.md) - Generate representative values from a continuous interval.
* [Transforming data](./d3-array/transform.md) - Derive new arrays.

# docs/d3-array/add.md

# Adding numbers

Add floating point numbers with full precision.

## new Adder() {#Adder}

```js
const adder = new d3.Adder();
```

[Examples](https://observablehq.com/@d3/d3-fsum) · [Source](https://github.com/d3/d3-array/blob/main/src/fsum.js) · Creates a new adder with an initial value of 0.

## *adder*.add(*number*) {#adder_add}

```js
adder.add(42)
```

Adds the specified *number* to the adder’s current value and returns the adder.

## *adder*.valueOf() {#adder_valueOf}

```js
adder.valueOf() // 42
```

Returns the IEEE 754 double-precision representation of the adder’s current value. Most useful as the short-hand notation `+adder`, or when coercing as `Number(adder)`.

## fsum(*values*, *accessor*) {#fsum}

```js
d3.fsum([0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]) // 1
```

[Examples](https://observablehq.com/@d3/d3-fsum) · [Source](https://github.com/d3/d3-array/blob/main/src/fsum.js) · Returns a full-precision summation of the given *values*. Although slower, d3.fsum can replace [d3.sum](./summarize.md#sum) wherever greater precision is needed.

```js
d3.fsum(penguins, (d) => d.body_mass_g) // 1437000
```

If an *accessor* is specified, invokes the given function for each element in the input *values*, being passed the element `d`, the index `i`, and the array `data` as three arguments; the returned values will then be added.

## fcumsum(*values*, *accessor*) {#fcumsum}

```js
d3.fcumsum([1, 1e-14, -1]) // [1, 1.00000000000001, 1e-14]
```

[Examples](https://observablehq.com/@d3/d3-fcumsum) · [Source](https://github.com/d3/d3-array/blob/main/src/fsum.js) · Returns a full-precision cumulative sum of the given *values* as a Float64Array. Although slower, d3.fcumsum can replace [d3.cumsum](./summarize.md#cumsum) when greater precision is needed.

```js
d3.fcumsum(penguins, (d) => d.body_mass_g) // [3750, 7550, 10800, 10800, 14250, …]
```

If an *accessor* is specified, invokes the given function for each element in the input *values*, being passed the element `d`, the index `i`, and the array `data` as three arguments; the returned values will then be added.

# docs/d3-array/bin.md

# Binning data

Bin quantitative values into consecutive, non-overlapping intervals, as in histograms. (See also Observable Plot’s [bin transform](https://observablehq.com/plot/transforms/bin).)

## bin() {#bin}

```js
const bin = d3.bin().value((d) => d.culmen_length_mm);
```

[Examples](https://observablehq.com/@d3/d3-bin) · [Source](https://github.com/d3/d3-array/blob/main/src/bin.js) · Constructs a new bin generator with the default settings. The returned bin generator supports method chaining, so this constructor is typically chained with [*bin*.value](#bin_value) to assign a value accessor. The returned generator is also a function; [pass it data](#_bin) to bin.

## *bin*(*data*) {#_bin}

```js
const bins = d3.bin().value((d) => d.culmen_length_mm)(penguins);
```

Bins the given iterable of *data* samples. Returns an array of bins, where each bin is an array containing the associated elements from the input *data*. Thus, the `length` of the bin is the number of elements in that bin. Each bin has two additional attributes:

* `x0` - the lower bound of the bin (inclusive).
* `x1` - the upper bound of the bin (exclusive, except for the last bin).

Any null or non-comparable values in the given *data*, or those outside the [domain](#bin_domain), are ignored.

## *bin*.value(*value*) {#bin_value}

```js
const bin = d3.bin().value((d) => d.culmen_length_mm);
```

If *value* is specified, sets the value accessor to the specified function or constant and returns this bin generator.

```js
bin.value() // (d) => d.culmen_length_mm
```

If *value* is not specified, returns the current value accessor, which defaults to the identity function.

When bins are [generated](#_bin), the value accessor will be invoked for each element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. The default value accessor assumes that the input data are orderable (comparable), such as numbers or dates. If your data are not, then you should specify an accessor that returns the corresponding orderable value for a given datum.

This is similar to mapping your data to values before invoking the bin generator, but has the benefit that the input data remains associated with the returned bins, thereby making it easier to access other fields of the data.

## *bin*.domain(*domain*) {#bin_domain}

```js
const bin = d3.bin().domain([0, 1]);
```

If *domain* is specified, sets the domain accessor to the specified function or array and returns this bin generator.

```js
bin.domain() // [0, 1]
```

If *domain* is not specified, returns the current domain accessor, which defaults to [extent](./summarize.md#extent). The bin domain is defined as an array [*min*, *max*], where *min* is the minimum observable value and *max* is the maximum observable value; both values are inclusive. Any value outside of this domain will be ignored when the bins are [generated](#_bin).

For example, to use a bin generator with a [linear scale](../d3-scale/linear.md) `x`, you might say:

```js
const bin = d3.bin().domain(x.domain()).thresholds(x.ticks(20));
```

You can then compute the bins from an array of numbers like so:

```js
const bins = bin(numbers);
```

If the default [extent](./summarize.md#extent) domain is used and the [thresholds](#bin_thresholds) are specified as a count (rather than explicit values), then the computed domain will be [niced](./ticks.md#nice) such that all bins are uniform width.

Note that the domain accessor is invoked on the materialized array of [values](#bin_value), not on the input data array.

## *bin*.thresholds(*thresholds*) {#bin_thresholds}

```js
const bin = d3.bin().thresholds(20);
```

If *thresholds* is specified as a number, then the [domain](#bin_domain) will be uniformly divided into approximately that many bins; see [ticks](./ticks.md).

```js
const bin = d3.bin().thresholds([0.25, 0.5, 0.75]);
```

If *thresholds* is specified as an array, sets the thresholds to the specified values and returns this bin generator. Thresholds are defined as an array of values [*x0*, *x1*, …]. Any value less than *x0* will be placed in the first bin; any value greater than or equal to *x0* but less than *x1* will be placed in the second bin; and so on. Thus, the [generated bins](#_bin) will have *thresholds*.length + 1 bins. Any threshold values outside the [domain](#bin_domain) are ignored. The first *bin*.x0 is always equal to the minimum domain value, and the last *bin*.x1 is always equal to the maximum domain value.

```js
const bin = d3.bin().thresholds((values) => [d3.median(values)]);
```

If *thresholds* is specified as a function, the function will be passed three arguments: the array of input [*values*](#bin_value) derived from the data, and the [domain](#bin_domain) represented as *min* and *max*. The function may then return either the array of numeric thresholds or the count of bins; in the latter case the domain is divided uniformly into approximately *count* bins; see [ticks](./ticks.md#ticks). For instance, you might want to use time ticks when binning time-series data; see [example](https://observablehq.com/@d3/d3-bin-time-thresholds).

```js
bin.thresholds() // () => [0, 0.5, 1]
```

If *thresholds* is not specified, returns the current threshold generator, which by default implements [Sturges’ formula](#thresholdSturges). (Thus by default, the values to be binned must be numbers!)

## thresholdFreedmanDiaconis(*values*, *min*, *max*) {#thresholdFreedmanDiaconis}

```js
const bin = d3.bin().thresholds(d3.thresholdFreedmanDiaconis);
```

[Source](https://github.com/d3/d3-array/blob/main/src/threshold/freedmanDiaconis.js) · Returns the number of bins according to the [Freedman–Diaconis rule](https://en.wikipedia.org/wiki/Histogram#Mathematical_definition); the input *values* must be numbers.

## thresholdScott(*values*, *min*, *max*) {#thresholdScott}

```js
const bin = d3.bin().thresholds(d3.thresholdScott);
```

[Source](https://github.com/d3/d3-array/blob/main/src/threshold/scott.js) · Returns the number of bins according to [Scott’s normal reference rule](https://en.wikipedia.org/wiki/Histogram#Mathematical_definition); the input *values* must be numbers.

## thresholdSturges(*values*, *min*, *max*) {#thresholdSturges}

```js
const bin = d3.bin().thresholds(d3.thresholdSturges);
```

[Source](https://github.com/d3/d3-array/blob/main/src/threshold/sturges.js) · Returns the number of bins according to [Sturges’ formula](https://en.wikipedia.org/wiki/Histogram#Mathematical_definition); the input *values* must be numbers.

# docs/d3-array/bisect.md

# Bisecting data

Bisection, or binary search, quickly finds a given value in a sorted array. It is often used to find the position at which to insert a new value into an array while maintaining sorted order.

## bisector(*accessor*) {#bisector}

[Examples](https://observablehq.com/@d3/d3-bisect) · [Source](https://github.com/d3/d3-array/blob/main/src/bisector.js) · Returns a new bisector using the specified *accessor* function.

```js
const bisector = d3.bisector((d) => d.Date);
```

If the given *accessor* takes two arguments, it is interpreted as a comparator function for comparing an element *d* in the data with a search value *x*. Use a comparator rather than an accessor if you want values to be sorted in an order different than natural order, such as in descending rather than ascending order. The above is equivalent to:

```js
const bisector = d3.bisector((d, x) => d.Date - x);
```

The bisector can be used to bisect sorted arrays of objects (in contrast to [bisect](#bisect), which is for bisecting primitives).

## *bisector*.right(*array*, *x*, *lo*, *hi*) {#bisector_right}

```js
d3.bisector((d) => d.Date).right(aapl, new Date("2014-01-02")) // 163
```

Like [bisectRight](#bisectRight), but using this bisector’s accessor. The code above finds the index of the row immediately following Jan. 2, 2014 in the [*aapl* sample dataset](https://observablehq.com/@observablehq/sample-datasets#aapl).

## *bisector*.left(*array*, *x*, *lo*, *hi*) {#bisector_left}

```js
d3.bisector((d) => d.Date).left(aapl, new Date("2014-01-02")) // 162
```

Like [bisectLeft](#bisectLeft), but using this bisector’s accessor. The code above finds the index of the row for Jan. 2, 2014 in the [*aapl* sample dataset](https://observablehq.com/@observablehq/sample-datasets#aapl).

## *bisector*.center(*array*, *x*, *lo*, *hi*) {#bisector_center}

```js
d3.bisector((d) => d.Date).center(aapl, new Date("2013-12-31")) // 161
```

Returns the index of the closest value to *x* in the given sorted *array*. This expects that the bisector’s accessor returns a quantitative value, or that the bisector’s comparator returns a signed distance; otherwise, this method is equivalent to [*bisector*.left](#bisector_left). The arguments *lo* (inclusive) and *hi* (exclusive) may be used to specify a subset of the array which should be considered; by default the entire array is used.

## bisect(*array*, *x*, *lo*, *hi*) {#bisect}

```js
d3.bisect(aapl.map((d) => d.Date), new Date("2014-01-02")) // 163
```

Alias for [bisectRight](#bisectRight).

## bisectRight(*array*, *x*, *lo*, *hi*) {#bisectRight}

```js
d3.bisectRight(aapl.map((d) => d.Date), new Date("2014-01-02")) // 163
```

Like [bisectLeft](#bisectLeft), but returns an insertion point which comes after (to the right of) any existing entries equivalent to *x* in *array*. The returned insertion point *i* partitions the *array* into two halves so that all *v* <= *x* for *v* in *array*.slice(*lo*, *i*) for the left side and all *v* > *x* for *v* in *array*.slice(*i*, *hi*) for the right side. See also [*bisector*.right](#bisector_right).

## bisectLeft(*array*, *x*, *lo*, *hi*) {#bisectLeft}

```js
d3.bisectLeft(aapl.map((d) => d.Date), new Date("2014-01-02")) // 162
```

Returns the insertion point for *x* in *array* to maintain sorted order. The arguments *lo* and *hi* may be used to specify a subset of the array which should be considered; by default the entire array is used. If *x* is already present in *array*, the insertion point will be before (to the left of) any existing entries. The return value is suitable for use as the first argument to [*array*.splice](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) assuming that *array* is already sorted. The returned insertion point *i* partitions the *array* into two halves so that all *v* < *x* for *v* in *array*.slice(*lo*, *i*) for the left side and all *v* >= *x* for *v* in *array*.slice(*i*, *hi*) for the right side. See also [*bisector*.left](#bisector_left).

## bisectCenter(*array*, *x*, *lo*, *hi*) {#bisectCenter}

```js
d3.bisectCenter(aapl.map((d) => d.Date), new Date("2013-12-31")) // 161
```

Returns the index of the value closest to *x* in the given *array* of numbers. The arguments *lo* (inclusive) and *hi* (exclusive) may be used to specify a subset of the array which should be considered; by default the entire array is used. See also [*bisector*.center](#bisector_center).

# docs/d3-array/blur.md

# Blurring data

A [box blur](https://en.wikipedia.org/wiki/Box_blur) implementation for 1D, 2D, and RGBA images; supports fractional radius.

## blur(*data*, *radius*) {#blur}

```js
const numbers = d3.cumsum({length: 1000}, () => Math.random() - 0.5);
d3.blur(numbers, 5); // a smoothed random walk
```

[Examples](https://observablehq.com/@d3/d3-blur) · [Source](https://github.com/d3/d3-array/blob/main/src/blur.js) · Blurs an array of *data* in-place by applying three iterations of a moving average transform (box filter) for a fast approximation of a Gaussian kernel of the given *radius*, a non-negative number. Returns the given *data*.

## blur2({data, width, height}, *rx*, *ry*) {#blur2}

```js
const matrix = {
  width: 4,
  height: 3,
  data: [
    1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 1
  ]
};

d3.blur2(matrix, 1);
```

[Examples](https://observablehq.com/@d3/d3-blur) · [Source](https://github.com/d3/d3-array/blob/main/src/blur.js) · Blurs a matrix of the given *width* and *height* in-place by applying a horizontal blur of radius *rx* and a vertical blur of radius *ry* (which defaults to *rx*). The matrix values *data* are stored in a flat (one-dimensional) array. If *height* is not specified, it is inferred from the given *width* and *data*.length. Returns the blurred matrix {data, width, height}.

## blurImage(*imageData*, *rx*, *ry*) {#blurImage}

```js
const imageData = context.getImageData(0, 0, width, height);
d3.blurImage(imageData, 5);
```

[Examples](https://observablehq.com/@d3/d3-blurimage) · [Source](https://github.com/d3/d3-array/blob/main/src/blur.js) · Blurs the given [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) in-place, blurring each of the RGBA layers independently by applying an horizontal blur of radius *rx* and a vertical blur of radius *ry* (which defaults to *rx*). Returns the blurred ImageData.

# docs/d3-array/group.md

# Grouping data

Group discrete values.

## group(*iterable*, ...*keys*) {#group}

[Examples](https://observablehq.com/@d3/d3-group-d3-rollup) · [Source](https://github.com/d3/d3-array/blob/main/src/group.js) · Groups the specified *iterable* of values into an [InternMap](./intern.md#InternMap) from *key* to array of value. For example, to group the [*penguins* sample dataset](https://observablehq.com/@observablehq/sample-datasets#penguins) by *species* field:

```js
const species = d3.group(penguins, (d) => d.species);
```

To get the elements whose *species* field is *Adelie*:

```js
species.get("Adelie") // Array(152)
```

If more than one *key* is specified, a nested InternMap is returned. For example:

```js
const speciesSex = d3.group(penguins, (d) => d.species, (d) => d.sex)
```

To get the penguins whose species is *Adelie* and whose sex is *FEMALE*:

```js
speciesSex.get("Adelie").get("FEMALE") // Array(73)
```

Elements are returned in the order of the first instance of each *key*.

## groups(*iterable*, ...*keys*) {#groups}

```js
const species = d3.groups(penguins, (d) => d.species); // [["Adelie", Array(152)], …]
```

Equivalent to [group](#group), but returns an array of [*key*, *value*] entries instead of a map. If more than one *key* is specified, each *value* will be a nested array of [*key*, *value*] entries. Elements are returned in the order of the first instance of each *key*.

## rollup(*iterable*, *reduce*, ...*keys*) {#rollup}

[Examples](https://observablehq.com/@d3/d3-group-d3-rollup) · [Source](https://github.com/d3/d3-array/blob/main/src/group.js) · Groups and reduces the specified *iterable* of values into an [InternMap](./intern.md#InternMap) from *key* to reduced value. For example, to group and count the [*penguins* sample dataset](https://observablehq.com/@observablehq/sample-datasets#penguins) by *species* field:

```js
const speciesCount = d3.rollup(penguins, (D) => D.length, (d) => d.species);
```

To get the count of penguins whose species is *Adelie*:

```js
speciesCount.get("Adelie") // 152
```

If more than one *key* is specified, a nested InternMap is returned. For example:

```js
const speciesSexCount = d3.rollup(penguins, (D) => D.length, (d) => d.species, (d) => d.sex);
```

To get the count of penguins whose species is *Adelie* and whose sex is *FEMALE*:

```js
speciesSexCount.get("Adelie").get("FEMALE") // 73
```

Elements are returned in the order of the first instance of each *key*.

## rollups(*iterable*, *reduce*, ...*keys*) {#rollups}

```js
const speciesCounts = d3.rollups(penguins, (D) => D.length, (d) => d.species); // [["Adelie", 152], …]
```

Equivalent to [rollup](#rollup), but returns an array of [*key*, *value*] entries instead of a map. If more than one *key* is specified, each *value* will be a nested array of [*key*, *value*] entries. Elements are returned in the order of the first instance of each *key*.

## index(*iterable*, ...*keys*) {#index}

Uses [rollup](#rollup) with a reducer that extracts the first element from each group, and throws an error if the group has more than one element. For example, to index the [*aapl* same dataset](https://observablehq.com/@observablehq/sample-datasets#aapl) by date:

```js
const aaplDate = d3.index(aapl, (d) => d.Date);
```

You can then quickly retrieve a value by date:

```js
aaplDate.get(new Date("2013-12-31")).Close // 80.145714
```

Elements are returned in input order.

## indexes(*iterable*, ...*keys*) {#indexes}

Like [index](#index), but returns an array of [*key*, *value*] entries instead of a map. This probably isn’t useful for anything, but is included for symmetry with [groups](#groups) and [rollups](#rollups).

## flatGroup(*iterable*, ...*keys*) {#flatGroup}

[Examples](https://observablehq.com/@d3/d3-flatgroup) · [Source](https://github.com/d3/d3-array/blob/main/src/group.js) · Equivalent to [group](#group), but returns a flat array of [*key0*, *key1*, …, *values*] instead of nested maps; useful for iterating over all groups.

## flatRollup(*iterable*, *reduce*, ...*keys*) {#flatRollup}

[Examples](https://observablehq.com/@d3/d3-flatgroup) · [Source](https://github.com/d3/d3-array/blob/main/src/group.js) · Equivalent to [rollup](#rollup), but returns a flat array of [*key0*, *key1*, …, *value*] instead of nested maps; useful for iterating over all groups.

## groupSort(*iterable*, *comparator*, *key*) {#groupSort}

[Examples](https://observablehq.com/@d3/d3-groupsort) · [Source](https://github.com/d3/d3-array/blob/main/src/groupSort.js) · Groups the specified *iterable* of elements according to the specified *key* function, sorts the groups according to the specified *comparator*, and then returns an array of keys in sorted order. For example, to order the species of the [*penguins* sample dataset](https://observablehq.com/@observablehq/sample-datasets#penguins) by ascending median body mass:

```js
d3.groupSort(penguins, (D) => d3.median(D, (d) => d.body_mass_g), (d) => d.species) // ["Adelie", "Chinstrap", "Gentoo"]
```

For descending order, negate the group value:

```js
d3.groupSort(penguins, (D) => -d3.median(D, (d) => d.body_mass_g), (d) => d.species) // ["Gentoo", "Adelie", "Chinstrap"]
```

If a *comparator* is passed instead of an *accessor* (*i.e.*, if the second argument is a function that takes exactly two arguments), it will be asked to compare two groups *a* and *b* and should return a negative value if *a* should be before *b*, a positive value if *a* should be after *b*, or zero for a partial ordering.

# docs/d3-array/intern.md

# Interning values

The [InternMap](#InternMap) and [InternSet](#InternSet) classes extend the native JavaScript Map and Set classes, respectively, allowing Dates and other non-primitive keys by bypassing the [SameValueZero algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) when determining key equality. [d3.group](./group.md#group), [d3.rollup](./group.md#rollup) and [d3.index](./group.md#index) use an InternMap rather than a native Map.

## new InternMap(*iterable*, *key*) {#InternMap}

```js
const valueByDate = new d3.InternMap([
  [new Date("2021-01-01"), 42],
  [new Date("2022-01-01"), 12],
  [new Date("2023-01-01"), 45]
]);
```

[Examples](https://observablehq.com/@mbostock/internmap) · [Source](https://github.com/mbostock/internmap/blob/main/src/index.js) · Constructs a new Map given the specified *iterable* of [*key*, *value*] entries. The keys are interned using the specified *key* function which defaults to [*object*.valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf) for non-primitive values. For example, to retrieve a value keyed by a given date:

```js
valueByDate.get(new Date("2022-01-01")) // 12
```

## new InternSet(*iterable*, *key*) {#InternSet}

```js
const dates = new d3.InternSet([
  new Date("2021-01-01"),
  new Date("2022-01-01"),
  new Date("2023-01-01")
]);
```

[Examples](https://observablehq.com/@mbostock/internmap) · [Source](https://github.com/mbostock/internmap/blob/main/src/index.js) · Constructs a new Set given the specified *iterable* of values. The values are interned using the specified *key* function which defaults to [*object*.valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf) for non-primitive values. For example, to query for a given date:

```js
dates.has(new Date("2022-01-01")) // true
```

# docs/d3-array/sets.md

# Set operations

Logical set operations for any iterable.

## difference(*iterable*, ...*others*) {#difference}

[Source](https://github.com/d3/d3-array/blob/main/src/difference.js) · Returns a new [InternSet](./intern.md#InternSet) containing every value in *iterable* that is not in any of the *others* iterables.

```js
d3.difference([0, 1, 2, 0], [1]) // Set {0, 2}
```

## union(...*iterables*) {#union}

[Source](https://github.com/d3/d3-array/blob/main/src/union.js) · Returns a new [InternSet](./intern.md#InternSet) containing every (distinct) value that appears in any of the given *iterables*. The order of values in the returned set is based on their first occurrence in the given *iterables*.

```js
d3.union([0, 2, 1, 0], [1, 3]) // Set {0, 2, 1, 3}
```

## intersection(...*iterables*) {#intersection}

[Source](https://github.com/d3/d3-array/blob/main/src/intersection.js) · Returns a new [InternSet](./intern.md#InternSet) containing every (distinct) value that appears in all of the given *iterables*. The order of values in the returned set is based on their first occurrence in the given *iterables*.

```js
d3.intersection([0, 2, 1, 0], [1, 3]) // Set {1}
```

## superset(*a*, *b*) {#superset}

[Source](https://github.com/d3/d3-array/blob/main/src/superset.js) · Returns true if *a* is a superset of *b*: if every value in the given iterable *b* is also in the given iterable *a*.

```js
d3.superset([0, 2, 1, 3, 0], [1, 3]) // true
```

## subset(*a*, *b*) {#subset}

[Source](https://github.com/d3/d3-array/blob/main/src/subset.js) · Returns true if *a* is a subset of *b*: if every value in the given iterable *a* is also in the given iterable *b*.

```js
d3.subset([1, 3], [0, 2, 1, 3, 0]) // true
```

## disjoint(*a*, *b*) {#disjoint}

[Source](https://github.com/d3/d3-array/blob/main/src/disjoint.js) · Returns true if *a* and *b* are disjoint: if *a* and *b* contain no shared value.

```js
d3.disjoint([1, 3], [2, 4]) // true
```

# docs/d3-array/sort.md

# Sorting data

Sort values; see also [bisect](./bisect.md).

## ascending(*a*, *b*) {#ascending}

[Examples](https://observablehq.com/@d3/d3-ascending) · [Source](https://github.com/d3/d3-array/blob/main/src/ascending.js) · Returns -1 if *a* is less than *b*, 1 if *a* is greater than *b*, 0 if *a* and *b* are equivalent, and otherwise NaN.

```js
[39, 21, 1, 104, 22].sort(d3.ascending) // [1, 21, 22, 39, 104]
```

This is the comparator function for natural order, and can be used with [*array*.sort](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) to arrange elements in ascending order.

## descending(*a*, *b*) {#descending}

[Examples](https://observablehq.com/@d3/d3-ascending) · [Source](https://github.com/d3/d3-array/blob/main/src/descending.js) · Returns -1 if *a* is greater than *b*, 1 if *a* is less than *b*, 0 if *a* and *b* are equivalent, and otherwise NaN.

```js
[39, 21, 1, 104, 22].sort(d3.descending) // [104, 39, 22, 21, 1]
```

This is the comparator function for natural order, and can be used with [*array*.sort](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) to arrange elements in descending order.

## permute(*source*, *keys*) {#permute}

[Examples](https://observablehq.com/@d3/d3-permute) · [Source](https://github.com/d3/d3-array/blob/main/src/permute.js) · Returns a permutation of the specified *source* array or object using the specified iterable of *keys*. The returned array contains the corresponding property of the source object for each key in *keys*, in order.

```js
d3.permute(["a", "b", "c"], [1, 2, 0]) // returns ["b", "c", "a"]
```

The given *source* need not be an array; for example, given an object

```js
const object = {yield: 27, variety: "Manchuria", year: 1931, site: "University Farm"};
```

three fields could be extract like so

```js
d3.permute(object, ["site", "variety", "yield"]) // ["University Farm", "Manchuria", 27]
```

## quickselect(*array*, *k*, *lo*, *hi*, *compare*) {#quickselect}

[Examples](https://observablehq.com/@d3/d3-quickselect) · [Source](https://github.com/d3/d3-array/blob/main/src/quickselect.js) · Rearranges the elements of *array* between *lo* and *hi* (inclusive) in-place such that *array*[*k*] is the (*k* - *lo* + 1)-th smallest value and *array*.slice(*lo*, *k*) are the *k* smallest elements, according to the given *compare* function, and returns the given *array*. If *lo* is not specified, it defaults to zero; if *hi* is not specified, it defaults to *array*.length - 1; if *compare* is not specified, it defaults to [ascending](#ascending).

For example, given an array of numbers:

```js
const numbers = [65, 28, 59, 33, 21, 56, 22, 95, 50, 12, 90, 53, 28, 77, 39];
```

To select the smallest 8 elements:

```js
d3.quickselect(numbers, 8)
```

The rearranged *numbers* is

```js
[39, 28, 28, 33, 21, 12, 22, 50, 53, 56, 59, 65, 90, 77, 95]
//                               ^^ numbers[k]
```

where *numbers*[8] is 53: greater than the preceding *k* elements and less than the following elements. Implemented by [Volodymyr Agafonkin’s quickselect](https://github.com/mourner/quickselect).

## reverse(*iterable*) {#reverse}

[Source](https://github.com/d3/d3-array/blob/main/src/reverse.js) · Returns an array containing the values in the given *iterable* in reverse order.

```js
d3.reverse(new Set([0, 2, 3, 1])) // [1, 3, 2, 0]
```

Equivalent to [*array*.reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse), except that it does not mutate the given input and works with any iterable.

## shuffle(*array*, *start*, *stop*) {#shuffle}

[Examples](https://observablehq.com/@d3/d3-shuffle) · [Source](https://github.com/d3/d3-array/blob/main/src/shuffle.js) · Randomizes the order of the specified *array* in-place using the [Fisher–Yates shuffle](https://bost.ocks.org/mike/shuffle/) and returns the *array*.

```js
d3.shuffle([..."abcdefg"]) // ["e", "c", "a", "d", "b", "g", "f"], perhaps
```

If *start* is specified, it is the starting index (inclusive) of the *array* to shuffle; if *start* is not specified, it defaults to zero. If *stop* is specified, it is the ending index (exclusive) of the *array* to shuffle; if *stop* is not specified, it defaults to *array*.length. For example, to shuffle the first ten elements of the *array*: shuffle(*array*, 0, 10).

## shuffler(*random*) {#shuffler}

[Source](https://github.com/d3/d3-array/blob/main/src/shuffle.js) · Returns a [shuffle function](#shuffle) given the specified random source.

```js
d3.shuffler(d3.randomLcg(42))([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) // [5, 3, 7, 6, 8, 9, 1, 4, 0, 2]
```

Often used with [d3.randomLcg](../d3-random.md) for a deterministic shuffle.

## sort(*iterable*, *comparator*) {#sort}

[Source](https://github.com/d3/d3-array/blob/main/src/sort.js) · Returns an array containing the values in the given *iterable* in the sorted order defined by the given *comparator* or *accessor* function. If *comparator* is not specified, it defaults to [d3.ascending](#ascending).

```js
d3.sort(new Set([0, 2, 3, 1])) // [0, 1, 2, 3]
```

If an *accessor* (a function that does not take exactly two arguments) is specified,

```js
d3.sort(data, (d) => d.value)
```

it is equivalent to a *comparator* using [natural order](#ascending):

```js
d3.sort(data, (a, b) => d3.ascending(a.value, b.value))
```

The *accessor* is only invoked once per element, and thus the returned sorted order is consistent even if the accessor is nondeterministic. Multiple accessors may be specified to break ties.

```js
d3.sort(points, ({x}) => x, ({y}) => y)
```

The above is equivalent to:

```js
d3.sort(data, (a, b) => d3.ascending(a.x, b.x) || d3.ascending(a.y, b.y))
```

Unlike [*array*.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), d3.sort does not mutate the given input, the comparator defaults to natural order instead of lexicographic order, and the input can be any iterable.

# docs/d3-array/summarize.md

# Summarizing data

Compute summary statistics.

## count(*iterable*, *accessor*) {#count}

```js
d3.count(penguins, (d) => d.body_mass_g) // 342
```

[Examples](https://observablehq.com/@d3/d3-count) · [Source](https://github.com/d3/d3-array/blob/main/src/count.js) · Returns the number of valid number values (*i.e.*, not null, NaN, or undefined) in the specified *iterable*; accepts an accessor.

## min(*iterable*, *accessor*) {#min}

[Examples](https://observablehq.com/@d3/d3-extent) · [Source](https://github.com/d3/d3-array/blob/main/src/min.js) · Returns the minimum value in the given *iterable* using natural order.

```js
d3.min([3, 2, 1, 1, 6, 2, 4]) // 1
```

Unlike [Math.min](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/min), d3.min does not coerce the inputs to numbers; for example, the minimum of the strings `["20", "3"]` is `"20"`, while the minimum of the numbers `[20, 3]` is `3`.

```js
d3.min(["bob", "alice", "carol"]) // "alice"
```
```js
d3.min([new Date("2018-01-01"), new Date("2011-03-09")]) // 2011-03-09
```

Also unlike Math.min, this method ignores undefined, null and NaN values, which is useful for ignoring missing data.

```js
d3.min([3, 2, 1, NaN, 4]) // 1
```

An optional *accessor* function may be specified, which is similar to calling [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) before computing the minimum value. The accessor function is repeatedly passed an element from the given iterable (often *d*) and the zero-based index (*i*).

```js
d3.min(alphabet, (d) => d.frequency) // 0.00074
```

Because undefined values are ignored, you can use the accessor function to ignore values. For example, to get the frequency of the least-common letter than is not Z:

```js
d3.min(alphabet, (d) => d.letter === "Z" ? NaN : d.frequency) // 0.00095
```

If the iterable contains no comparable values, returns undefined.

```js
d3.min([]) // undefined
```
```js
d3.min(alphabet, (d) => d.doesnotexist) // undefined
```

See also [extent](#extent) and [least](#least).

## minIndex(*iterable*, *accessor*) {#minIndex}

[Source](https://github.com/d3/d3-array/blob/main/src/minIndex.js) · Like [min](#min), but returns the index of the minimum value rather than the value itself.

```js
d3.minIndex([3, 2, 1, 1, 6, 2, 4]) // 2
```

This method can find the least element according to the given accessor, similar to [least](#least):

```js
d3.minIndex(alphabet, (d) => d.frequency) // 25
```
```js
alphabet[d3.minIndex(alphabet, (d) => d.frequency)] // {letter: "Z", frequency: 0.00074}
```

See also [leastIndex](#leastIndex).

## max(*iterable*, *accessor*) {#max}

[Examples](https://observablehq.com/@d3/d3-extent) · [Source](https://github.com/d3/d3-array/blob/main/src/max.js) · Returns the maximum value in the given *iterable* using natural order.

```js
d3.max([3, 2, 1, 1, 6, 2, 4]) // 6
```

Unlike [Math.max](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math/max), d3.max does not coerce the inputs to numbers; for example, the maximum of the strings `["20", "3"]` is `"3"`, while the maximum of the numbers `[20, 3]` is `20`.

```js
d3.max(["bob", "alice", "carol"]) // "carol"
```
```js
d3.max([new Date("2018-01-01"), new Date("2011-03-09")]) // 2018-01-01
```

Also unlike Math.max, this method ignores undefined, null and NaN values, which is useful for ignoring missing data.

```js
d3.max([3, 2, 1, NaN, 4]) // 4
```

An optional *accessor* function may be specified, which is similar to calling [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) before computing the maximum value. The accessor function is repeatedly passed an element from the given iterable (often *d*) and the zero-based index (*i*).

```js
d3.max(alphabet, (d) => d.frequency) // 0.12702
```

Because undefined values are ignored, you can use the accessor function to ignore values. For example, to get the frequency of the most-common letter than is not E:

```js
d3.max(alphabet, (d) => d.letter === "E" ? NaN : d.frequency) // 0.09056
```

If the iterable contains no comparable values, returns undefined.

```js
d3.max([]) // undefined
```
```js
d3.max(alphabet, (d) => d.doesnotexist) // undefined
```

See also [extent](#extent) and [greatest](#greatest).

## maxIndex(*iterable*, *accessor*) {#maxIndex}

[Source](https://github.com/d3/d3-array/blob/main/src/maxIndex.js) · Like [max](#max), but returns the index of the maximum value rather than the value itself.

```js
d3.maxIndex([3, 2, 1, 1, 6, 2, 4]) // 2
```

This method can find the greatest element according to the given accessor, similar to [greatest](#greatest):

```js
d3.maxIndex(alphabet, (d) => d.frequency) // 0
```
```js
alphabet[d3.maxIndex(alphabet, (d) => d.frequency)] // {letter: "E", frequency: 0.12702}
```

See also [greatestIndex](#greatestIndex).

## least(*iterable*, *comparator*) {#least}

[Examples](https://observablehq.com/@d3/d3-least) · [Source](https://github.com/d3/d3-array/blob/main/src/least.js) · Returns the least element of the specified *iterable* according to the specified *comparator*.

```js
d3.least(alphabet, (a, b) => a.frequency - b.frequency) // {letter: "Z", frequency: 0.00074}
```
```js
d3.least(alphabet, (a, b) => b.frequency - a.frequency) // {letter: "E", frequency: 0.12702}
```

If the *comparator* takes a single argument, is interpreted as an accessor and the returned elements are compared using natural order.

```js
d3.least(alphabet, (d) => d.frequency) // {letter: "Z", frequency: 0.00074}
```
```js
d3.least(alphabet, (d) => -d.frequency) // {letter: "E", frequency: 0.12702}
```

If *comparator* is not specified, it defaults to [ascending](./sort.md#ascending).

```js
d3.least(alphabet.map((d) => d.frequency)) // 0.00074
```

If the given *iterable* contains no comparable elements (*i.e.*, the comparator returns NaN when comparing each element to itself), returns undefined.

```js
d3.least([]) // undefined
```

This function is similar to [min](#min), except it allows the use of a comparator rather than an accessor.

## leastIndex(*iterable*, *comparator*) {#leastIndex}

[Source](https://github.com/d3/d3-array/blob/main/src/leastIndex.js) · Returns the index of the least element of the specified *iterable* according to the specified *comparator* or *accessor*. If the given *iterable* contains no comparable elements (*i.e.*, the comparator returns NaN when comparing each element to itself), returns -1. If *comparator* is not specified, it defaults to [ascending](./sort.md#ascending). For example:

```js
const array = [{foo: 42}, {foo: 91}];
d3.leastIndex(array, (a, b) => a.foo - b.foo); // 0
d3.leastIndex(array, (a, b) => b.foo - a.foo); // 1
d3.leastIndex(array, (d) => d.foo); // 0
```

This function is similar to [minIndex](#minIndex), except it allows the use of a comparator rather than an accessor.

## greatest(*iterable*, *comparator*) {#greatest}

[Examples](https://observablehq.com/@d3/d3-least) · [Source](https://github.com/d3/d3-array/blob/main/src/greatest.js) · Returns the greatest element of the specified *iterable* according to the specified *comparator* or *accessor*. If the given *iterable* contains no comparable elements (*i.e.*, the comparator returns NaN when comparing each element to itself), returns undefined. If *comparator* is not specified, it defaults to [ascending](./sort.md#ascending). For example:

```js
const array = [{foo: 42}, {foo: 91}];
d3.greatest(array, (a, b) => a.foo - b.foo); // {foo: 91}
d3.greatest(array, (a, b) => b.foo - a.foo); // {foo: 42}
d3.greatest(array, (d) => d.foo); // {foo: 91}
```

This function is similar to [max](#max), except it allows the use of a comparator rather than an accessor.

## greatestIndex(*iterable*, *comparator*) {#greatestIndex}

[Source](https://github.com/d3/d3-array/blob/main/src/greatestIndex.js) · Returns the index of the greatest element of the specified *iterable* according to the specified *comparator* or *accessor*. If the given *iterable* contains no comparable elements (*i.e.*, the comparator returns NaN when comparing each element to itself), returns -1. If *comparator* is not specified, it defaults to [ascending](./sort.md#ascending). For example:

```js
const array = [{foo: 42}, {foo: 91}];
d3.greatestIndex(array, (a, b) => a.foo - b.foo); // 1
d3.greatestIndex(array, (a, b) => b.foo - a.foo); // 0
d3.greatestIndex(array, (d) => d.foo); // 1
```

This function is similar to [maxIndex](#maxIndex), except it allows the use of a comparator rather than an accessor.

## extent(*iterable*, *accessor*) {#extent}

[Examples](https://observablehq.com/@d3/d3-extent) · [Source](https://github.com/d3/d3-array/blob/main/src/extent.js) · Returns the [minimum](#min) and [maximum](#max) value in the given *iterable* using natural order.

```js
d3.extent([3, 2, 1, 1, 6, 2, 4]) // [1, 6]
```

An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the extent.

```js
d3.extent(alphabet, (d) => d.frequency) // [0.00074, 0.12702]
```

If the iterable contains no comparable values, returns [undefined, undefined].

```js
d3.extent(alphabet, (d) => d.doesnotexist) // [undefined, undefined]
```

## mode(*iterable*, *accessor*) {#mode}

[Examples](https://observablehq.com/@d3/d3-mode) · [Source](https://github.com/d3/d3-array/blob/main/src/mode.js) · Returns the mode of the given *iterable*, *i.e.* the value which appears the most often. Ignores undefined, null and NaN values.

```js
d3.mode([1, 2, 2, 2, 3, 3]) // 2
```

An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the mode.

```js
d3.mode(penguins, (d) => d.island) // "Biscoe"
```

In case of equality, returns the first of the relevant values. If the iterable contains no comparable values, returns undefined.

## sum(*iterable*, *accessor*) {#sum}

[Examples](https://observablehq.com/@d3/d3-sum) · [Source](https://github.com/d3/d3-array/blob/main/src/sum.js) · Returns the sum of the given *iterable* of numbers. Ignores undefined, null and NaN values.

```js
d3.sum([1, 2, 2, 2, NaN, 3, null]) // 10
```

An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the sum.

```js
d3.sum(penguins, (d) => d.body_mass_g) // 1437000
```

If the iterable contains no numbers, returns 0. See also [fsum](./add.md#fsum).

## mean(*iterable*, *accessor*) {#mean}

[Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) · [Source](https://github.com/d3/d3-array/blob/main/src/mean.js) · Returns the mean of the given *iterable* of numbers. Ignores undefined, null and NaN values.

```js
d3.mean([1, 2, 2, 2, NaN, 3, null]) // 2
```

An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the mean.

```js
d3.mean(penguins, (d) => d.body_mass_g) // 4201.754385964912
```

If the iterable contains no numbers, returns undefined.

## median(*iterable*, *accessor*) {#median}

[Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) · [Source](https://github.com/d3/d3-array/blob/main/src/median.js) · Returns the median of the given *iterable* of numbers using the [R-7 method](https://en.wikipedia.org/wiki/Quantile#Estimating_quantiles_from_a_sample). Ignores undefined, null and NaN values.

```js
d3.median([1, 2, 2, 2, NaN, 3, null]) // 2
```

An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the median.

```js
d3.median(penguins, (d) => d.body_mass_g) // 4050
```

If the iterable contains no numbers, returns undefined.

## medianIndex(array, accessor) {#medianIndex}

[Source](https://github.com/d3/d3-array/blob/main/src/median.js) · Like [median](#median), but returns the index of the element to the left of the median.

```js
d3.medianIndex([1, 2, 2, 2, NaN, 3, null]) // 2
```

## cumsum(*iterable*, *accessor*) {#cumsum}

[Examples](https://observablehq.com/@d3/d3-cumsum) · [Source](https://github.com/d3/d3-array/blob/main/src/cumsum.js) · Returns the cumulative sum of the given *iterable* of numbers, as a Float64Array of the same length.

```js
d3.cumsum([1, 1, 2, 3, 5]) // [1, 2, 4, 7, 12]
```

An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the cumulative sum.

```js
d3.cumsum(penguins, (d) => d.body_mass_g) // [3750, 7550, 10800, 10800, …]
```

This method ignores undefined and NaN values; this is useful for ignoring missing data. If the iterable contains no numbers, returns zeros. See also [fcumsum](./add.md#fcumsum).

## quantile(*iterable*, *p*, *accessor*) {#quantile}

[Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) · [Source](https://github.com/d3/d3-array/blob/main/src/quantile.js) · Returns the *p*-quantile of the given *iterable* of numbers, where *p* is a number in the range [0, 1]. For example, the median can be computed using *p* = 0.5, the first quartile at *p* = 0.25, and the third quartile at *p* = 0.75. This particular implementation uses the [R-7 method](http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population), which is the default for the R programming language and Excel.

```js
const numbers = [0, 10, 30];
d3.quantile(numbers, 0); // 0
d3.quantile(numbers, 0.5); // 10
d3.quantile(numbers, 1); // 30
d3.quantile(numbers, 0.25); // 5
d3.quantile(numbers, 0.75); // 20
d3.quantile(numbers, 0.1); // 2
```

An optional *accessor* function may be specified, which is equivalent to calling [*array*.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) before computing the quantile.

## quantileIndex(*array*, *p*, *accessor*) {#quantileIndex}

[Source](https://github.com/d3/d3-array/blob/main/src/quantile.js) · Similar to *quantile*, but returns the index to the left of *p*.

## quantileSorted(*array*, *p*, *accessor*) {#quantileSorted}

[Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) · [Source](https://github.com/d3/d3-array/blob/main/src/quantile.js) · Similar to *quantile*, but expects the input to be a **sorted** *array* of values. In contrast with *quantile*, the accessor is only called on the elements needed to compute the quantile.

## rank(*iterable*, *comparator*) {#rank}

[Examples](https://observablehq.com/@d3/rank) · [Source](https://github.com/d3/d3-array/blob/main/src/rank.js) · Returns an array with the rank of each value in the *iterable*, *i.e.* the zero-based index of the value when the iterable is sorted. Nullish values are sorted to the end and ranked NaN. An optional *comparator* or *accessor* function may be specified; the latter is equivalent to calling [*array*.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) before computing the ranks. If *comparator* is not specified, it defaults to [ascending](./sort.md#ascending). Ties (equivalent values) all get the same rank, defined as the first time the value is found.

```js
d3.rank([{x: 1}, {}, {x: 2}, {x: 0}], d => d.x); // [1, NaN, 2, 0]
d3.rank(["b", "c", "b", "a"]); // [1, 3, 1, 0]
d3.rank([1, 2, 3], d3.descending); // [2, 1, 0]
```

## variance(*iterable*, *accessor*) {#variance}

[Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) · [Source](https://github.com/d3/d3-array/blob/main/src/variance.js) · Returns an [unbiased estimator of the population variance](http://mathworld.wolfram.com/SampleVariance.html) of the given *iterable* of numbers using [Welford’s algorithm](https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford's_online_algorithm). If the iterable has fewer than two numbers, returns undefined. An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the variance. This method ignores undefined and NaN values; this is useful for ignoring missing data.

## deviation(*iterable*, *accessor*) {#deviation}

[Examples](https://observablehq.com/@d3/d3-mean-d3-median-and-friends) · [Source](https://github.com/d3/d3-array/blob/main/src/deviation.js) · Returns the standard deviation, defined as the square root of the [bias-corrected variance](#variance), of the given *iterable* of numbers. If the iterable has fewer than two numbers, returns undefined. An optional *accessor* function may be specified, which is equivalent to calling Array.from before computing the standard deviation. This method ignores undefined and NaN values; this is useful for ignoring missing data.

## every(*iterable*, *test*) {#every}

[Source](https://github.com/d3/d3-array/blob/main/src/every.js) · Returns true if the given *test* function returns true for every value in the given *iterable*. This method returns as soon as *test* returns a non-truthy value or all values are iterated over. Equivalent to [*array*.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every):

```js
d3.every(new Set([1, 3, 5, 7]), x => x & 1) // true
```

## some(*iterable*, *test*) {#some}

[Source](https://github.com/d3/d3-array/blob/main/src/some.js) · Returns true if the given *test* function returns true for any value in the given *iterable*. This method returns as soon as *test* returns a truthy value or all values are iterated over. Equivalent to [*array*.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some):

```js
d3.some(new Set([0, 2, 3, 4]), x => x & 1) // true
```

# docs/d3-array/ticks.md

# Ticks {#Ticks}

Generate representative values from a continuous interval.

## ticks(*start*, *stop*, *count*) {#ticks}

[Examples](https://observablehq.com/@d3/d3-ticks) · [Source](https://github.com/d3/d3-array/blob/main/src/ticks.js) · Returns an array of approximately *count* + 1 uniformly-spaced, nicely-rounded values between *start* and *stop* (inclusive). Each value is a power of ten multiplied by 1, 2 or 5.

```js
d3.ticks(1, 9, 5) // [2, 4, 6, 8]
```
```js
d3.ticks(1, 9, 20) // [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9]
```

Ticks are inclusive in the sense that they may include the specified *start* and *stop* values if (and only if) they are exact, nicely-rounded values consistent with the inferred [step](#tickStep). More formally, each returned tick *t* satisfies *start* ≤ *t* and *t* ≤ *stop*.

## tickIncrement(*start*, *stop*, *count*) {#tickIncrement}

[Source](https://github.com/d3/d3-array/blob/main/src/ticks.js) · Like [d3.tickStep](#tickStep), except requires that *start* is always less than or equal to *stop*, and if the tick step for the given *start*, *stop* and *count* would be less than one, returns the negative inverse tick step instead.

```js
d3.tickIncrement(1, 9, 5) // 2
```
```js
d3.tickIncrement(1, 9, 20) // -2, meaning a tick step 0.5
```

This method is always guaranteed to return an integer, and is used by [d3.ticks](#ticks) to guarantee that the returned tick values are represented as precisely as possible in IEEE 754 floating point.

## tickStep(*start*, *stop*, *count*) {#tickStep}

[Source](https://github.com/d3/d3-array/blob/main/src/ticks.js) · Returns the difference between adjacent tick values if the same arguments were passed to [d3.ticks](#ticks): a nicely-rounded value that is a power of ten multiplied by 1, 2 or 5.

```js
d3.tickStep(1, 9, 5) // 2
```

If *stop* is less than *start*, may return a negative tick step to indicate descending ticks.

```js
d3.tickStep(9, 1, 5) // -2
```

Note that due to the limited precision of IEEE 754 floating point, the returned value may not be exact decimals; use [d3-format](../d3-format.md) to format numbers for human consumption.

## nice(*start*, *stop*, *count*) {#nice}

[Source](https://github.com/d3/d3-array/blob/main/src/nice.js) · Returns a new interval [*niceStart*, *niceStop*] covering the given interval [*start*, *stop*] and where *niceStart* and *niceStop* are guaranteed to align with the corresponding [tick step](#tickStep).

```js
d3.nice(1, 9, 5) // [0, 10]
```

Like [d3.tickIncrement](#tickIncrement), this requires that *start* is less than or equal to *stop*.

## range(*start*, *stop*, *step*) {#range}

[Examples](https://observablehq.com/@d3/d3-range) · [Source](https://github.com/d3/d3-array/blob/main/src/range.js) · Returns an array containing an arithmetic progression, similar to the Python built-in [range](http://docs.python.org/library/functions.html#range). This method is often used to iterate over a sequence of uniformly-spaced numeric values, such as the indexes of an array or the ticks of a linear scale. (See also [d3.ticks](#ticks) for nicely-rounded values.)

```js
d3.range(6) // [0, 1, 2, 3, 4, 5]
```

If *step* is omitted, it defaults to 1. If *start* is omitted, it defaults to 0. The *stop* value is exclusive; it is not included in the result. If *step* is positive, the last element is the largest *start* + *i* \* *step* less than *stop*; if *step* is negative, the last element is the smallest *start* + *i* \* *step* greater than *stop*.

```js
d3.range(5, -1, -1) // [5, 4, 3, 2, 1, 0]
```

If the returned array would contain an infinite number of values, an empty range is returned.

```js
d3.range(Infinity) // []
```

The arguments are not required to be integers; however, the results are more predictable if they are. The values in the returned array are defined as *start* + *i* \* *step*, where *i* is an integer from zero to one minus the total number of elements in the returned array.

```js
d3.range(0, 1, 0.2) // [0, 0.2, 0.4, 0.6000000000000001, 0.8]
```

This behavior is due to IEEE 754 double-precision floating point, which defines 0.2 * 3 = 0.6000000000000001. Use [d3-format](../d3-format.md) to format numbers for human consumption with appropriate rounding; see also [*linear*.tickFormat](../d3-scale/linear.md#linear_tickFormat) in [d3-scale](../d3-scale.md). Likewise, if the returned array should have a specific length, consider using [*array*.map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map) on an integer range.

```js
d3.range(0, 1, 1 / 49) // 👎 returns 50 elements!
```
```js
d3.range(49).map((d) => d / 49) // 👍 returns 49 elements
```

# docs/d3-array/transform.md

# Transforming data

Transform arrays and generate new arrays.

## cross(...*iterables*, *reducer*) {#cross}

[Examples](https://observablehq.com/@d3/d3-cross) · [Source](https://github.com/d3/d3-array/blob/main/src/cross.js) · Returns the [Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) of the specified *iterables*.

```js
d3.cross([1, 2], ["x", "y"]) // [[1, "x"], [1, "y"], [2, "x"], [2, "y"]]
```

If a *reducer* is specified, it is invoked for each combination of elements from each of the given *iterables*, and returns the corresponding reduced value.

```js
d3.cross([1, 2], ["x", "y"], (a, b) => a + b) // ["1x", "1y", "2x", "2y"]
```

## merge(*iterables*) {#merge}

[Examples](https://observablehq.com/@d3/d3-merge) · [Source](https://github.com/d3/d3-array/blob/main/src/merge.js) · Merges the specified iterable of *iterables* into a new flat array. This method is similar to the built-in [*array*.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) method, but is more convenient when you have an array of arrays or an iterable of iterables.

```js
d3.merge([[1], [2, 3]]) // [1, 2, 3]
```

```js
d3.merge(new Set([new Set([1]), new Set([2, 3])])) // [1, 2, 3]
```

## pairs(*iterable*, *reducer*) {#pairs}

[Examples](https://observablehq.com/@d3/d3-pairs) · [Source](https://github.com/d3/d3-array/blob/main/src/pairs.js) · Returns an array of adjacent pairs of elements from the specified *iterable*, in order. If the specified iterable has fewer than two elements, returns the empty array.

```js
d3.pairs([1, 2, 3, 4]) // [[1, 2], [2, 3], [3, 4]]
```

If a *reducer* function is specified, it is successively passed an element *i - 1* and element *i* from the *iterable*.

```js
d3.pairs([1, 1, 2, 3, 5], (a, b) => b - a) // [0, 1, 1, 2]
```

## transpose(*matrix*) {#transpose}

[Examples](https://observablehq.com/@d3/d3-transpose) · [Source](https://github.com/d3/d3-array/blob/main/src/transpose.js) · Uses the [zip](#zip) operator as a two-dimensional [matrix transpose](http://en.wikipedia.org/wiki/Transpose).

```js
d3.transpose([["Alice", "Bob", "Carol"], [32, 13, 14]]) // [["Alice", 32], ["Bob", 13], ["Carol", 14]]
```
```js
d3.transpose([["Alice", 32], ["Bob", 13], ["Carol", 14]]) // [["Alice", "Bob", "Carol"], [32, 13, 14]]
```

## zip(...*arrays*) {#zip}

[Examples](https://observablehq.com/@d3/d3-transpose) · [Source](https://github.com/d3/d3-array/blob/main/src/zip.js) · Returns an array of arrays, where the *i*th array contains the *i*th element from each of the argument *arrays*. The returned array is truncated in length to the shortest array in *arrays*. If *arrays* contains only a single array, the returned array contains one-element arrays. With no arguments, the returned array is empty.

```js
d3.zip(["Alice", "Bob", "Carol"], [32, 13, 14]) // [["Alice", 32], ["Bob", 13], ["Carol", 14]]
```

## filter(*iterable*, *test*) {#filter}

[Source](https://github.com/d3/d3-array/blob/main/src/filter.js) · Returns a new array containing the values from *iterable*, in order, for which the given *test* function returns true.

```js
d3.filter(new Set([0, 2, 3, 4]), (d) => d & 1) // [3]
```

Like [*array*.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), but works with any iterable.

## map(*iterable*, *mapper*) {#map}

[Source](https://github.com/d3/d3-array/blob/main/src/map.js) · Returns a new array containing the mapped values from *iterable*, in order, as defined by given *mapper* function.

```js
d3.map(new Set([0, 2, 3, 4]), (d) => d & 1) // [0, 0, 1, 0]
```

Like [*array*.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), but works with any iterable.

## reduce(*iterable*, *reducer*, *initialValue*) {#reduce}

[Source](https://github.com/d3/d3-array/blob/main/src/reduce.js) · Returns the reduced value defined by given *reducer* function, which is repeatedly invoked for each value in *iterable*, being passed the current reduced value and the next value.

```js
d3.reduce(new Set([0, 2, 3, 4]), (p, v) => p + v, 0) // 9
```

Like [*array*.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), but works with any iterable.

# docs/d3-axis.md

---
prev: false
---

<script setup>

import * as d3 from "d3";
import {shallowRef, onMounted, onUnmounted} from "vue";
import ExampleAxis from "./components/ExampleAxis.vue";

const domain = shallowRef([0, 100]);
const range = [20, 668];

let timer;

onMounted(() => {
  timer = d3.interval(() => {
    const x = Math.random() * 100;
    const l = Math.random() * 100;
    domain.value = [x, x + l];
  }, 5000);
});

onUnmounted(() => {
  timer?.stop();
});

</script>

# d3-axis

<ExampleAxis :axis="d3.axisBottom(d3.scaleLinear([0, 100], range))" :y="7" />

<ExampleAxis :axis="d3.axisBottom(d3.scaleLog([1, 1000], range))" :y="7" />

<ExampleAxis :axis="d3.axisBottom(d3.scaleBand([...'ABCDEFGHIJKL'], range)).tickSizeOuter(0)" :y="7" />

<ExampleAxis :axis="d3.axisBottom(d3.scaleUtc([new Date('2011-01-01'), new Date('2013-01-01')], range))" :y="7" />

The axis component renders human-readable reference marks for position [scales](./d3-scale.md). It works with most scale types, including linear, log, band, and time scales as shown above.

Calling the axis component on a [selection](./d3-selection.md) of SVG containers (usually a single G element) populates the axes. Axes are rendered at the origin. To change the position of the axis with respect to the chart, specify a [transform attribute](http://www.w3.org/TR/SVG/coords.html#TransformAttribute) on the containing element.

```js
const gx = svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));
```

If the scale has changed, call the axis component a second time to update. For smooth animations, you can call it on a [transition](./d3-transition.md).

<ExampleAxis :axis="d3.axisBottom(d3.scaleLinear(domain, range))" :y="7" :duration="1500" />

```js
gx.transition()
    .duration(750)
    .call(d3.axisBottom(x));
```

The elements created by the axis are considered part of its public API. You can apply external stylesheets or modify the generated axis elements to [customize the axis appearance](https://observablehq.com/@d3/styled-axes). An axis consists of a [path element](https://www.w3.org/TR/SVG/paths.html#PathElement) of class “domain” representing the extent of the scale’s domain, followed by transformed [g elements](https://www.w3.org/TR/SVG/struct.html#Groups) of class “tick” representing each of the scale’s ticks. Each tick has a [line element](https://www.w3.org/TR/SVG/shapes.html#LineElement) to draw the tick line, and a [text element](https://www.w3.org/TR/SVG/text.html#TextElement) for the tick label. For example, here is a typical bottom-oriented axis:

```html
<g fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">
  <path class="domain" stroke="currentColor" d="M0.5,6V0.5H880.5V6"></path>
  <g class="tick" opacity="1" transform="translate(0.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">0.0</text>
  </g>
  <g class="tick" opacity="1" transform="translate(176.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">0.2</text>
  </g>
  <g class="tick" opacity="1" transform="translate(352.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">0.4</text>
  </g>
  <g class="tick" opacity="1" transform="translate(528.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">0.6</text>
  </g>
  <g class="tick" opacity="1" transform="translate(704.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">0.8</text>
  </g>
  <g class="tick" opacity="1" transform="translate(880.5,0)">
    <line stroke="currentColor" y2="6"></line>
    <text fill="currentColor" y="9" dy="0.71em">1.0</text>
  </g>
</g>
```

The orientation of an axis is fixed; to change the orientation, remove the old axis and create a new axis.

## axisTop(*scale*) {#axisTop}

<ExampleAxis :axis="d3.axisTop(d3.scaleLinear([0, 100], range))" :y="23" />

[Source](https://github.com/d3/d3-axis/blob/main/src/axis.js) · Constructs a new top-oriented axis generator for the given [scale](./d3-scale.md), with empty [tick arguments](#axis_ticks), a [tick size](#axis_tickSize) of 6 and [padding](#axis_tickPadding) of 3. In this orientation, ticks are drawn above the horizontal domain path.

## axisRight(*scale*) {#axisRight}

<ExampleAxis :axis="d3.axisRight(d3.scaleLinear([0, 100], [10, 190]))" :width="60" :height="200" :x="20" />

[Source](https://github.com/d3/d3-axis/blob/main/src/axis.js) · Constructs a new right-oriented axis generator for the given [scale](./d3-scale.md), with empty [tick arguments](#axis_ticks), a [tick size](#axis_tickSize) of 6 and [padding](#axis_tickPadding) of 3. In this orientation, ticks are drawn to the right of the vertical domain path.

## axisBottom(*scale*) {#axisBottom}

<ExampleAxis :axis="d3.axisBottom(d3.scaleLinear([0, 100], range))" :y="7" />

[Source](https://github.com/d3/d3-axis/blob/main/src/axis.js) · Constructs a new bottom-oriented axis generator for the given [scale](./d3-scale.md), with empty [tick arguments](#axis_ticks), a [tick size](#axis_tickSize) of 6 and [padding](#axis_tickPadding) of 3. In this orientation, ticks are drawn below the horizontal domain path.

## axisLeft(*scale*) {#axisLeft}

<ExampleAxis :axis="d3.axisLeft(d3.scaleLinear([0, 100], [10, 190]))" :width="60" :height="200" :x="40" />

[Source](https://github.com/d3/d3-axis/blob/main/src/axis.js) · Constructs a new left-oriented axis generator for the given [scale](./d3-scale.md), with empty [tick arguments](#axis_ticks), a [tick size](#axis_tickSize) of 6 and [padding](#axis_tickPadding) of 3. In this orientation, ticks are drawn to the left of the vertical domain path.

## *axis*(*context*) {#_axis}

[Source](https://github.com/d3/d3-axis/blob/main/src/axis.js) · Render the axis to the given *context*, which may be either a [selection](./d3-selection.md) of SVG containers (either SVG or G elements) or a corresponding [transition](./d3-transition.md).

```js
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));
```

## *axis*.scale(*scale*) {#axis_scale}

[Source](https://github.com/d3/d3-axis/blob/main/src/axis.js) · If *scale* is specified, sets the [scale](./d3-scale.md) and returns the axis. If *scale* is not specified, returns the current scale.

```js
const xAxis = d3.axisBottom().scale(x);
```

## *axis*.ticks(...*arguments*) {#axis_ticks}

Sets the *arguments* that will be passed to [*scale*.ticks](./d3-scale/linear.md#linear_ticks) and [*scale*.tickFormat](./d3-scale/linear.md#linear_tickFormat) when the axis is [rendered](#_axis), and returns the axis generator.

The meaning of the *arguments* depends on the [axis’ scale](#axis_scale) type: most commonly, the arguments are a suggested *count* for the number of ticks (or a [time *interval*](./d3-time.md) for time scales), and an optional [format *specifier*](./d3-format.md) to customize how the tick values are formatted. For example, to generate twenty ticks with SI-prefix formatting on a linear scale, say:

```js
axis.ticks(20, "s");
```

To generate ticks every fifteen minutes with a time scale, say:

```js
axis.ticks(d3.timeMinute.every(15));
```

This method is a convenience function for [*axis*.tickArguments](#axis_tickArguments). For example, this:

```js
axis.ticks(10);
```

Is equivalent to:

```js
axis.tickArguments([10]);
```

This method has no effect if the scale does not implement *scale*.ticks, as with [band](./d3-scale/band.md) and [point](./d3-scale/point.md) scales. To set the tick values explicitly, use [*axis*.tickValues](#axis_tickValues). To set the tick format explicitly, use [*axis*.tickFormat](#axis_tickFormat). To generate tick values directly, use [*scale*.ticks](./d3-scale/linear.md#linear_ticks).

## *axis*.tickArguments(*arguments*) {#axis_tickArguments}

[Source](https://github.com/d3/d3-axis/blob/main/src/axis.js) · If *arguments* is specified, sets the *arguments* that will be passed to [*scale*.ticks](./d3-scale/linear.md#linear_ticks) and [*scale*.tickFormat](./d3-scale/linear.md#linear_tickFormat) when the axis is [rendered](#_axis), and returns the axis generator. See also [*axis*.ticks](#axis_ticks), which is used more commonly.

The meaning of the *arguments* depends on the [axis’ scale](#axis_scale) type: most commonly, the arguments are a suggested *count* for the number of ticks (or a [time *interval*](./d3-time.md) for time scales), and an optional [format *specifier*](./d3-format.md) to customize how the tick values are formatted. For example, to generate twenty ticks with SI-prefix formatting on a linear scale, say:

```js
axis.tickArguments([20, "s"]);
```

To generate ticks every fifteen minutes with a time scale, say:

```js
axis.tickArguments([d3.timeMinute.every(15)]);
```

If *arguments* is not specified, returns the current tick arguments, which defaults to the empty array. If *arguments* is specified, this method has no effect if the scale does not implement *scale*.ticks, as with [band](./d3-scale/band.md) and [point](./d3-scale/point.md) scales. To set the tick values explicitly, use [*axis*.tickValues](#axis_tickValues). To set the tick format explicitly, use [*axis*.tickFormat](#axis_tickFormat).

## *axis*.tickValues(*values*) {#axis_tickValues}

[Source](https://github.com/d3/d3-axis/blob/main/src/axis.js) · If a *values* iterable is specified, the specified values are used for ticks rather than the scale’s automatic tick generator. For example, to generate ticks at specific values:

```js
const axis = d3.axisBottom(x).tickValues([1, 2, 3, 5, 8, 13, 21]);
```

The explicit tick values take precedence over the tick arguments set by [*axis*.tickArguments](#axis_tickArguments). However, any tick arguments will still be passed to the scale’s [tickFormat](#axis_tickFormat) function if a tick format is not also set.

If *values* is null, clears any previously-set explicit tick values and reverts back to the scale’s tick generator. If *values* is not specified, returns the current tick values, which defaults to null.

## *axis*.tickFormat(*format*) {#axis_tickFormat}

[Source](https://github.com/d3/d3-axis/blob/main/src/axis.js) · If *format* is specified, sets the tick format function and returns the axis. For example, to display integers with comma-grouping for thousands:

```js
axis.tickFormat(d3.format(",.0f"));
```

More commonly, a format specifier is passed to [*axis*.ticks](#axis_ticks), which has the advantage of setting the format precision automatically based on the tick interval:

```js
axis.ticks(10, ",f");
```

See [d3-format](./d3-format.md) and [d3-time-format](/d3-time-format.md) for help creating formatters.

If *format* is not specified, returns the current format function, which defaults to null. A null format indicates that the scale’s default formatter should be used, which is generated by calling [*scale*.tickFormat](./d3-scale/linear.md#linear_tickFormat). In this case, the arguments specified by [*axis*.tickArguments](#axis_tickArguments) are likewise passed to *scale*.tickFormat.

## *axis*.tickSize(*size*) {#axis_tickSize}

[Source](https://github.com/d3/d3-axis/blob/main/src/axis.js) · If *size* is specified, sets the [inner](#axis_tickSizeInner) and [outer](#axis_tickSizeOuter) tick size to the specified value and returns the axis.

```js
const axis = d3.axisBottom(x).tickSize(0);
```

If *size* is not specified, returns the current inner tick size, which defaults to 6.

```js
axis.tickSize() // 0, as specified above
```

## *axis*.tickSizeInner(size) {#axis_tickSizeInner}

[Source](https://github.com/d3/d3-axis/blob/main/src/axis.js) · If *size* is specified, sets the inner tick size to the specified value and returns the axis.

```js
const axis = d3.axisBottom(x).tickSizeInner(0);
```

If *size* is not specified, returns the current inner tick size, which defaults to 6.

```js
axis.tickSizeInner() // 0, as specified above
```

The inner tick size controls the length of the tick lines, offset from the native position of the axis.

## *axis*.tickSizeOuter(size) {#axis_tickSizeOuter}

[Source](https://github.com/d3/d3-axis/blob/main/src/axis.js) · If *size* is specified, sets the outer tick size to the specified value and returns the axis.

```js
const axis = d3.axisBottom(x).tickSizeOuter(0);
```

If *size* is not specified, returns the current outer tick size, which defaults to 6.

```js
axis.tickSizeOuter() // 0, as specified above
```

The outer tick size controls the length of the square ends of the domain path, offset from the native position of the axis. Thus, the “outer ticks” are not actually ticks but part of the domain path, and their position is determined by the associated scale’s domain extent. Thus, outer ticks may overlap with the first or last inner tick. An outer tick size of 0 suppresses the square ends of the domain path, instead producing a straight line.

## *axis*.tickPadding(padding) {#axis_tickPadding}

[Source](https://github.com/d3/d3-axis/blob/main/src/axis.js) · If *padding* is specified, sets the padding to the specified value in pixels and returns the axis.

```js
const axis = d3.axisBottom(x).tickPadding(0);
```

If *padding* is not specified, returns the current padding which defaults to 3 pixels.

```js
axis.tickPadding() // 0, as specified above
```

## *axis*.offset(offset) {#axis_offset}

[Source](https://github.com/d3/d3-axis/blob/main/src/axis.js) · If *offset* is specified, sets the pixel offset to the specified value in pixels and returns the axis.

```js
const axis = d3.axisBottom(x).offset(0);
```

If *offset* is not specified, returns the current pixel offset.

```js
axis.offset() // 0
```

The pixel offset defaults to 0 on devices with a [devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) greater than 1, and 0.5 otherwise. This default pixel offset ensures crisp edges on low-resolution devices.

# docs/d3-brush.md

# d3-brush

Brushing is the interactive specification a one- or two-dimensional selected region using a pointing gesture, such as by clicking and dragging the mouse. Brushing is often used to select discrete elements, such as dots in a scatterplot or files on a desktop. It can also be used to zoom-in to a region of interest, or to select continuous regions for [cross-filtering data](https://square.github.io/crossfilter/) or live histograms:

[<img alt="Mona Lisa Histogram" src="https://raw.githubusercontent.com/d3/d3-brush/master/img/mona-lisa.jpg" width="420" height="219">](https://observablehq.com/@d3/mona-lisa-histogram)

The d3-brush module implements brushing for mouse and touch events using [SVG](https://www.w3.org/TR/SVG/). Click and drag on the brush selection to translate the selection. Click and drag on one of the selection handles to move the corresponding edge (or edges) of the selection. Click and drag on the invisible overlay to define a new brush selection, or click anywhere within the brushable region while holding down the META (⌘) key. Holding down the ALT (⌥) key while moving the brush causes it to reposition around its center, while holding down SPACE locks the current brush size, allowing only translation.

Brushes also support programmatic control. For example, you can listen to [*end* events](#brush-events), and then initiate a transition with [*brush*.move](#brush_move) to snap the brush selection to semantic boundaries:

[<img alt="Brush Snapping" src="https://raw.githubusercontent.com/d3/d3-brush/master/img/snapping.png" width="420" height="219">](https://observablehq.com/@d3/brush-snapping-transitions)

Or you can have the brush recenter when you click outside the current selection:

[<img alt="Click-to-Recenter" src="https://raw.githubusercontent.com/d3/d3-brush/master/img/recenter.jpg" width="420" height="219">](https://observablehq.com/@d3/click-to-recenter-brush)

## brush() {#brush}

[Examples](https://observablehq.com/@d3/brushable-scatterplot) · [Source](https://github.com/d3/d3-brush/blob/main/src/brush.js) · Creates a new two-dimensional brush.

## brushX() {#brushX}

[Examples](https://observablehq.com/@d3/focus-context) · [Source](https://github.com/d3/d3-brush/blob/main/src/brush.js) · Creates a new one-dimensional brush along the *x*-dimension.

## brushY() {#brushY}

[Source](https://github.com/d3/d3-brush/blob/main/src/brush.js) · Creates a new one-dimensional brush along the *y*-dimension.

## *brush*(*group*) {#_brush}

[Examples](https://observablehq.com/@d3/brushable-scatterplot-matrix) · [Source](https://github.com/d3/d3-brush/blob/main/src/brush.js) · Applies the brush to the specified *group*, which must be a [selection](./d3-selection.md) of SVG [G elements](https://www.w3.org/TR/SVG/struct.html#Groups). This function is typically not invoked directly, and is instead invoked via [*selection*.call](./d3-selection/control-flow.md#selection_call). For example, to render a brush:

```js
svg.append("g")
    .attr("class", "brush")
    .call(d3.brush().on("brush", brushed));
```

Internally, the brush uses [*selection*.on](./d3-selection/events.md#selection_on) to bind the necessary event listeners for dragging. The listeners use the name `.brush`, so you can subsequently unbind the brush event listeners as follows:

```js
group.on(".brush", null);
```

The brush also creates the SVG elements necessary to display the brush selection and to receive input events for interaction. You can add, remove or modify these elements as desired to change the brush appearance; you can also apply stylesheets to modify the brush appearance. The structure of a two-dimensional brush is as follows:

```html
<g class="brush" fill="none" pointer-events="all" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
  <rect class="overlay" pointer-events="all" cursor="crosshair" x="0" y="0" width="960" height="500"></rect>
  <rect class="selection" cursor="move" fill="#777" fill-opacity="0.3" stroke="#fff" shape-rendering="crispEdges" x="112" y="194" width="182" height="83"></rect>
  <rect class="handle handle--n" cursor="ns-resize" x="107" y="189" width="192" height="10"></rect>
  <rect class="handle handle--e" cursor="ew-resize" x="289" y="189" width="10" height="93"></rect>
  <rect class="handle handle--s" cursor="ns-resize" x="107" y="272" width="192" height="10"></rect>
  <rect class="handle handle--w" cursor="ew-resize" x="107" y="189" width="10" height="93"></rect>
  <rect class="handle handle--nw" cursor="nwse-resize" x="107" y="189" width="10" height="10"></rect>
  <rect class="handle handle--ne" cursor="nesw-resize" x="289" y="189" width="10" height="10"></rect>
  <rect class="handle handle--se" cursor="nwse-resize" x="289" y="272" width="10" height="10"></rect>
  <rect class="handle handle--sw" cursor="nesw-resize" x="107" y="272" width="10" height="10"></rect>
</g>
```

The overlay rect covers the brushable area defined by [*brush*.extent](#brush_extent). The selection rect covers the area defined by the current [brush selection](#brushSelection). The handle rects cover the edges and corners of the brush selection, allowing the corresponding value in the brush selection to be modified interactively. To modify the brush selection programmatically, use [*brush*.move](#brush_move).

## *brush*.move(*group*, *selection*, *event*) {#brush_move}

[Examples](https://observablehq.com/d/93b91f86f9ebc9b9) · [Source](https://github.com/d3/d3-brush/blob/main/src/brush.js) · Sets the active *selection* of the brush on the specified *group*, which must be a [selection](./d3-selection.md) or a [transition](./d3-transition.md) of SVG [G elements](https://www.w3.org/TR/SVG/struct.html#Groups). The *selection* must be defined as an array of numbers, or null to clear the brush selection. For a [two-dimensional brush](#brush), it must be defined as [[*x0*, *y0*], [*x1*, *y1*]], where *x0* is the minimum *x*-value, *y0* is the minimum *y*-value, *x1* is the maximum *x*-value, and *y1* is the maximum *y*-value. For an [*x*-brush](#brushX), it must be defined as [*x0*, *x1*]; for a [*y*-brush](#brushY), it must be defined as [*y0*, *y1*]. The selection may also be specified as a function which returns such an array; if a function, it is invoked for each selected element, being passed the current datum `d` and index `i`, with the `this` context as the current DOM element. The returned array defines the brush selection for that element.

## *brush*.clear(*group*, *event*) {#brush_clear}

[Examples](https://observablehq.com/@d3/double-click-brush-clear) · [Source](https://github.com/d3/d3-brush/blob/main/src/brush.js) · An alias for [*brush*.move](#brush_move) with the null selection.

## *brush*.extent(*extent*) {#brush_extent}

[Examples](https://observablehq.com/@d3/brush-snapping) · [Source](https://github.com/d3/d3-brush/blob/main/src/brush.js) · If *extent* is specified, sets the brushable extent to the specified array of points [[*x0*, *y0*], [*x1*, *y1*]], where [*x0*, *y0*] is the top-left corner and [*x1*, *y1*] is the bottom-right corner, and returns this brush. The *extent* may also be specified as a function which returns such an array; if a function, it is invoked for each selected element, being passed the current datum `d` and index `i`, with the `this` context as the current DOM element. If *extent* is not specified, returns the current extent accessor, which defaults to:

```js
function defaultExtent() {
  var svg = this.ownerSVGElement || this;
  if (svg.hasAttribute("viewBox")) {
    svg = svg.viewBox.baseVal;
    return [[svg.x, svg.y], [svg.x + svg.width, svg.y + svg.height]];
  }
  return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];
}
```

This default implementation requires that the owner SVG element have a defined [viewBox](https://www.w3.org/TR/SVG/coords.html#ViewBoxAttribute), or [width](https://www.w3.org/TR/SVG/struct.html#SVGElementWidthAttribute) and [height](https://www.w3.org/TR/SVG/struct.html#SVGElementHeightAttribute) attributes. Alternatively, consider using [*element*.getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect). (In Firefox, [*element*.clientWidth](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth) and [*element*.clientHeight](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight) is zero for SVG elements!)

The brush extent determines the size of the invisible overlay and also constrains the brush selection; the brush selection cannot go outside the brush extent.

## *brush*.filter(*filter*) {#brush_filter}

[Examples](https://observablehq.com/@d3/brush-filter) · [Source](https://github.com/d3/d3-brush/blob/main/src/brush.js) · If *filter* is specified, sets the filter to the specified function and returns the brush. If *filter* is not specified, returns the current filter, which defaults to:

```js
function filter(event) {
  return !event.ctrlKey && !event.button;
}
```

If the filter returns falsey, the initiating event is ignored and no brush gesture is started. Thus, the filter determines which input events are ignored. The default filter ignores mousedown events on secondary buttons, since those buttons are typically intended for other purposes, such as the context menu.

## *brush*.touchable(*touchable*) {#brush_touchable}

[Source](https://github.com/d3/d3-brush/blob/main/src/brush.js) · If *touchable* is specified, sets the touch support detector to the specified function and returns the brush. If *touchable* is not specified, returns the current touch support detector, which defaults to:

```js
function touchable() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}
```

Touch event listeners are only registered if the detector returns truthy for the corresponding element when the brush is [applied](#_brush). The default detector works well for most browsers that are capable of touch input, but not all; Chrome’s mobile device emulator, for example, fails detection.

## *brush*.keyModifiers(*modifiers*) {#brush_keyModifiers}

[Source](https://github.com/d3/d3-brush/blob/main/src/brush.js) · If *modifiers* is specified, sets whether the brush listens to key events during brushing and returns the brush. If *modifiers* is not specified, returns the current behavior, which defaults to true.

## *brush*.handleSize(*size*) {#brush_handleSize}

[Source](https://github.com/d3/d3-brush/blob/main/src/brush.js) · If *size* is specified, sets the size of the brush handles to the specified number and returns the brush. If *size* is not specified, returns the current handle size, which defaults to six. This method must be called before [applying the brush](#_brush) to a selection; changing the handle size does not affect brushes that were previously rendered.

## *brush*.on(*typenames*, *listener*) {#brush_on}

[Source](https://github.com/d3/d3-brush/blob/main/src/brush.js) · If *listener* is specified, sets the event *listener* for the specified *typenames* and returns the brush. If an event listener was already registered for the same type and name, the existing listener is removed before the new listener is added. If *listener* is null, removes the current event listeners for the specified *typenames*, if any. If *listener* is not specified, returns the first currently-assigned listener matching the specified *typenames*, if any. When a specified event is dispatched, each *listener* will be invoked with the same context and arguments as [*selection*.on](./d3-selection/events.md#selection_on) listeners: the current event `event` and datum `d`, with the `this` context as the current DOM element.

The *typenames* is a string containing one or more *typename* separated by whitespace. Each *typename* is a *type*, optionally followed by a period (`.`) and a *name*, such as `brush.foo` and `brush.bar`; the name allows multiple listeners to be registered for the same *type*. The *type* must be one of the following:

* `start` - at the start of a brush gesture, such as on mousedown.
* `brush` - when the brush moves, such as on mousemove.
* `end` - at the end of a brush gesture, such as on mouseup.

See [*dispatch*.on](./d3-dispatch.md#dispatch_on) and [brush events](#brush-events) for more.

## brushSelection(*node*) {#brushSelection}

[Examples](https://observablehq.com/@d3/double-click-brush-clear) · [Source](https://github.com/d3/d3-brush/blob/main/src/brush.js) · Returns the current brush selection for the specified *node*. Internally, an element’s brush state is stored as *element*.\_\_brush; however, you should use this method rather than accessing it directly. If the given *node* has no selection, returns null. Otherwise, the *selection* is defined as an array of numbers. For a [two-dimensional brush](#brush), it is [[*x0*, *y0*], [*x1*, *y1*]], where *x0* is the minimum *x*-value, *y0* is the minimum *y*-value, *x1* is the maximum *x*-value, and *y1* is the maximum *y*-value. For an [*x*-brush](#brushX), it is [*x0*, *x1*]; for a [*y*-brush](#brushY), it is [*y0*, *y1*].

## Brush events

When a [brush event listener](#brush_on) is invoked, it receives the current brush event. The *event* object exposes several fields:

* `target` - the associated [brush behavior](#brush).
* `type` - the string “start”, “brush” or “end”; see [*brush*.on](#brush_on).
* `selection` - the current [brush selection](#brushSelection).
* `sourceEvent` - the underlying input event, such as mousemove or touchmove.
* `mode` - the string “drag”, “space”, “handle” or “center”; the mode of the brush.

# docs/d3-chord.md

<script setup>

import ColorSpan from "./components/ColorSpan.vue";
import ExampleChord from "./components/ExampleChord.vue";

</script>

# d3-chord

<ExampleChord/>

Chord diagrams visualize flow between a set of nodes in a graph, such as transition probabilities between finite states. The diagram above shows a fake dataset from [Circos](http://circos.ca/guide/tables/) of people who dyed their hair.

D3’s chord layout represents flow using a square *matrix* of size *n*×*n*, where *n* is the number of nodes in the graph. Each value *matrix*[*i*][*j*] represents the flow from the *i*th node to the *j*th node. (Each number *matrix*[*i*][*j*] must be nonnegative, though it can be zero if there is no flow from node *i* to node *j*.)

Above, each row and column represents a hair color (<ColorSpan color="black" />, <ColorSpan color="#ffdd89" text="blond" />, <ColorSpan color="#957244" text="brown" />, <ColorSpan color="#f26223" text="red" />); each value represents a number of people who dyed their hair from one color to another color. For example, 5,871 people had <ColorSpan color="black" /> hair and dyed it <ColorSpan color="#ffdd89" text="blond" />, while 1,951 people had <ColorSpan color="#ffdd89" text="blond" /> hair and dyed it <ColorSpan color="black" />. The matrix diagonal represents people who kept the same color.

```js
const matrix = [
  // to black, blond, brown, red
  [11975,  5871, 8916, 2868], // from black
  [ 1951, 10048, 2060, 6171], // from blond
  [ 8010, 16145, 8090, 8045], // from brown
  [ 1013,   990,  940, 6907]  // from red
];
```

A chord diagram visualizes these transitions by [arranging](./d3-chord/chord.md) the population by starting color along the circumference of a circle and drawing [ribbons](./d3-chord/ribbon.md) between each color. The starting and ending width of the ribbon is proportional to the number of people that had the respective starting and ending color. The color of the ribbon, arbitrarily, is the color with the larger of the two values.

See one of:

- [Chords](./d3-chord/chord.md) - a layout for chord diagrams
- [Ribbons](./d3-chord/ribbon.md) - a shape primitive for chord diagrams

# docs/d3-chord/chord.md

# Chords

The chord layout computes angles to generate a [chord diagram](../d3-chord.md).

## chord() {#chord}

[Source](https://github.com/d3/d3-chord/blob/main/src/chord.js) · Constructs a new chord layout with the default settings.

```js
const chord = d3.chord();
```

## *chord*(*matrix*) {#_chord}

[Source](https://github.com/d3/d3-chord/blob/main/src/chord.js) · Computes the chord layout for the specified square *matrix* of size *n*×*n*, where the *matrix* represents the directed flow amongst a network (a complete digraph) of *n* nodes.

The return value of *chord*(*matrix*) is an array of *chords*, where each chord represents the combined bidirectional flow between two nodes *i* and *j* (where *i* may be equal to *j*) and is an object with the following properties:

* `source` - the source subgroup
* `target` - the target subgroup

Each source and target subgroup is also an object with the following properties:

* `startAngle` - the start angle in radians
* `endAngle` - the end angle in radians
* `value` - the flow value *matrix*[*i*][*j*]
* `index` - the node index *i*

The chords are typically passed to [ribbon](./ribbon.md) to display the network relationships.

The returned array includes only chord objects for which the value *matrix*[*i*][*j*] or *matrix*[*j*][*i*] is non-zero. Furthermore, the returned array only contains unique chords: a given chord *ij* represents the bidirectional flow from *i* to *j* *and* from *j* to *i*, and does not contain a duplicate chord *ji*; *i* and *j* are chosen such that the chord’s source always represents the larger of *matrix*[*i*][*j*] and *matrix*[*j*][*i*].

The *chords* array also defines a secondary array of length *n*, *chords*.groups, where each group represents the combined outflow for node *i*, corresponding to the elements *matrix*[*i*][0 … *n* - 1], and is an object with the following properties:

* `startAngle` - the start angle in radians
* `endAngle` - the end angle in radians
* `value` - the total outgoing flow value for node *i*
* `index` - the node index *i*

The groups are typically passed to [arc](../d3-shape/arc.md) to produce a donut chart around the circumference of the chord layout.

## *chord*.padAngle(*angle*) {#chord_padAngle}

[Source](https://github.com/d3/d3-chord/blob/main/src/chord.js) · If *angle* is specified, sets the pad angle between adjacent groups to the specified number in radians and returns this chord layout. If *angle* is not specified, returns the current pad angle, which defaults to zero.

## *chord*.sortGroups(*compare*) {#chord_sortGroups}

[Source](https://github.com/d3/d3-chord/blob/main/src/chord.js) · If *compare* is specified, sets the group comparator to the specified function or null and returns this chord layout. If *compare* is not specified, returns the current group comparator, which defaults to null. If the group comparator is non-null, it is used to sort the groups by their total outflow. See also [ascending](../d3-array/sort.md#ascending) and [descending](../d3-array/sort.md#descending).

## *chord*.sortSubgroups(*compare*) {#chord_sortSubgroups}

[Source](https://github.com/d3/d3-chord/blob/main/src/chord.js) · If *compare* is specified, sets the subgroup comparator to the specified function or null and returns this chord layout. If *compare* is not specified, returns the current subgroup comparator, which defaults to null. If the subgroup comparator is non-null, it is used to sort the subgroups corresponding to *matrix*[*i*][0 … *n* - 1] for a given group *i* by their total outflow. See also [ascending](../d3-array/sort.md#ascending) and [descending](../d3-array/sort.md#descending).

## *chord*.sortChords(*compare*) {#chord_sortChords}

[Source](https://github.com/d3/d3-chord/blob/main/src/chord.js) · If *compare* is specified, sets the chord comparator to the specified function or null and returns this chord layout. If *compare* is not specified, returns the current chord comparator, which defaults to null. If the chord comparator is non-null, it is used to sort the [chords](#_chord) by their combined flow; this only affects the *z*-order of the chords. See also [ascending](../d3-array/sort.md#ascending) and [descending](../d3-array/sort.md#descending).

## chordDirected() {#chordDirected}

[Examples](https://observablehq.com/@d3/directed-chord-diagram) · [Source](https://github.com/d3/d3-chord/blob/main/src/chord.js) · A chord layout for unidirectional flows. The chord from *i* to *j* is generated from the value in *matrix*[*i*][*j*] only.

## chordTranspose() {#chordTranspose}

[Source](https://github.com/d3/d3-chord/blob/main/src/chord.js) · A transposed chord layout. Useful to highlight outgoing (rather than incoming) flows.

# docs/d3-chord/ribbon.md

# Ribbons

A ribbon visually represents the volume of flow between two nodes in a [chord diagram](../d3-chord.md). Ribbons come in two varieties: [ribbon](#ribbon) represents a bidirectional flow, while [ribbonArrow](#ribbonArrow) represents a unidirectional flow. The latter is suitable for [chordDirected](./chord.md#chordDirected).

## ribbon() {#ribbon}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · Creates a new ribbon generator with the default settings.

```js
const ribbon = d3.ribbon();
```

## *ribbon*(...*arguments*) {#_ribbon}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · Generates a ribbon for the given *arguments*. The *arguments* are arbitrary; they are propagated to the ribbon generator’s accessor functions along with the `this` object. For example, with the default settings, a [chord object](./chord.md) is expected:

```js
ribbon({
  source: {startAngle: 0.7524114, endAngle: 1.1212972, radius: 240},
  target: {startAngle: 1.8617078, endAngle: 1.9842927, radius: 240}
}) // "M164.0162810494058,-175.21032946354026A240,240,0,0,1,216.1595644740915,-104.28347273835429Q0,0,229.9158815306728,68.8381247563705A240,240,0,0,1,219.77316791012538,96.43523560788266Q0,0,164.0162810494058,-175.21032946354026Z"
```

If the ribbon generator has a [context](#ribbon_context), then the ribbon is rendered to this context as a sequence of path method calls and this function returns void. Otherwise, a path data string is returned.

## *ribbon*.source(*source*) {#ribbon_source}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *source* is specified, sets the source accessor to the specified function and returns this ribbon generator. If *source* is not specified, returns the current source accessor, which defaults to:

```js
function source(d) {
  return d.source;
}
```

## *ribbon*.target(*target*) {#ribbon_target}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *target* is specified, sets the target accessor to the specified function and returns this ribbon generator. If *target* is not specified, returns the current target accessor, which defaults to:

```js
function target(d) {
  return d.target;
}
```

## *ribbon*.radius(*radius*) {#ribbon_radius}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *radius* is specified, sets the source and target radius accessor to the specified function and returns this ribbon generator. For example to set a fixed radius of 240 pixels:

```js
const ribbon = d3.ribbon().radius(240);
```

Now the arguments you pass to [*ribbon*](#_ribbon) do not need to specify a *radius* property on the source and target.

```js
ribbon({
  source: {startAngle: 0.7524114, endAngle: 1.1212972},
  target: {startAngle: 1.8617078, endAngle: 1.9842927}
}) // "M164.0162810494058,-175.21032946354026A240,240,0,0,1,216.1595644740915,-104.28347273835429Q0,0,229.9158815306728,68.8381247563705A240,240,0,0,1,219.77316791012538,96.43523560788266Q0,0,164.0162810494058,-175.21032946354026Z"
```

If *radius* is not specified, returns the current source radius accessor, which defaults to:

```js
function radius(d) {
  return d.radius;
}
```

## *ribbon*.sourceRadius(*radius*) {#ribbon_sourceRadius}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *radius* is specified, sets the source radius accessor to the specified function and returns this ribbon generator. If *radius* is not specified, returns the current source radius accessor, which defaults to:

```js
function radius(d) {
  return d.radius;
}
```

## *ribbon*.targetRadius(*radius*) {#ribbon_targetRadius}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *radius* is specified, sets the target radius accessor to the specified function and returns this ribbon generator. If *radius* is not specified, returns the current target radius accessor, which defaults to:

```js
function radius(d) {
  return d.radius;
}
```

By convention, the target radius in asymmetric chord diagrams is typically inset from the source radius, resulting in a gap between the end of the directed link and its associated group arc.

## *ribbon*.startAngle(*angle*) {#ribbon_startAngle}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *angle* is specified, sets the start angle accessor to the specified function and returns this ribbon generator. If *angle* is not specified, returns the current start angle accessor, which defaults to:

```js
function startAngle(d) {
  return d.startAngle;
}
```

The *angle* is specified in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise.

## *ribbon*.endAngle(*angle*) {#ribbon_endAngle}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *angle* is specified, sets the end angle accessor to the specified function and returns this ribbon generator. If *angle* is not specified, returns the current end angle accessor, which defaults to:

```js
function endAngle(d) {
  return d.endAngle;
}
```

The *angle* is specified in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise.

## *ribbon*.padAngle(*angle*) {#ribbon_padAngle}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *angle* is specified, sets the pad angle accessor to the specified function and returns this ribbon generator. If *angle* is not specified, returns the current pad angle accessor, which defaults to:

```js
function padAngle() {
  return 0;
}
```

The pad angle specifies the angular gap between adjacent ribbons.

## *ribbon*.context(*context*) {#ribbon_context}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *context* is specified, sets the context and returns this ribbon generator. If *context* is not specified, returns the current context, which defaults to null. If the context is not null, then the [generated ribbon](#_ribbon) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated ribbon is returned. See also [d3-path](../d3-path.md).

## ribbonArrow() {#ribbonArrow}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · Creates a new arrow ribbon generator with the default settings. See also [chordDirected](./chord.md#chordDirected).

## *ribbonArrow*.headRadius(*radius*) {#ribbonArrow_headRadius}

[Source](https://github.com/d3/d3-chord/blob/main/src/ribbon.js) · If *radius* is specified, sets the arrowhead radius accessor to the specified function and returns this ribbon generator. If *radius* is not specified, returns the current arrowhead radius accessor, which defaults to:

```js
function headRadius() {
  return 10;
}
```

# docs/d3-color.md

<script setup>

import * as d3 from "d3";
import ColorSpan from "./components/ColorSpan.vue";

</script>

# d3-color

Even though your browser understands a lot about colors, it doesn’t offer much help in manipulating colors through JavaScript. The d3-color module therefore provides representations for various color spaces, allowing specification, conversion and manipulation. (Also see [d3-interpolate](./d3-interpolate.md) for color interpolation.)

For example, take the named color <ColorSpan color="steelblue" />, which is <ColorSpan color="steelblue" format="rgb" /> in RGB:

```js
let c = d3.color("steelblue"); // {r: 70, g: 130, b: 180, opacity: 1}
```

To convert to HSL <ColorSpan color="steelblue" format="hsl" />:

```js
c = d3.hsl(c); // {h: 207.27…, s: 0.44, l: 0.4902…, opacity: 1}
```

To then rotate the hue by 90° <ColorSpan :color="(((c) => (c.h += 90, c))(d3.hsl('steelblue')))" format="hsl" />, increase the saturation by 20% <ColorSpan :color="(((c) => (c.h += 90, c.s += 0.2, c))(d3.hsl('steelblue')))" format="hsl" />, and format as an RGB string <ColorSpan :color="(((c) => (c.h += 90, c.s += 0.2, c))(d3.hsl('steelblue')))" />:

```js
c.h += 90;
c.s += 0.2;
c + ""; // rgb(198, 45, 205)
```

To fade the color slightly <ColorSpan :color="(((c) => (c.h += 90, c.s += 0.2, c.opacity = 0.8, c))(d3.hsl('steelblue')))" />:

```js
c.opacity = 0.8;
c + ""; // rgba(198, 45, 205, 0.8)
```

In addition to the ubiquitous and machine-friendly [RGB](#rgb) and [HSL](#hsl) color space, d3-color supports color spaces that are designed for humans:

* [CIELAB](#lab) (*a.k.a.* “Lab”)
* [CIELCh<sub>ab</sub>](#lch) (*a.k.a.* “LCh” or “HCL”)
* Dave Green’s [Cubehelix](#cubehelix)

Cubehelix features monotonic lightness, while CIELAB and its polar form CIELCh<sub>ab</sub> are perceptually uniform.

For additional color spaces, see:

* [d3-cam16](https://github.com/d3/d3-cam16)
* [d3-cam02](https://github.com/connorgr/d3-cam02)
* [d3-hsv](https://github.com/d3/d3-hsv)
* [d3-hcg](https://github.com/d3/d3-hcg)
* [d3-hsluv](https://github.com/petulla/d3-hsluv)

To measure color differences, see:

* [d3-color-difference](https://github.com/Evercoder/d3-color-difference)

## color(*specifier*) {#color}

```js
d3.color("steelblue") // {r: 70, g: 130, b: 180, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Parses the specified [CSS Color Module Level 3](http://www.w3.org/TR/css3-color/#colorunits) *specifier* string, returning an [RGB](#rgb) or [HSL](#hsl) color, along with [CSS Color Module Level 4 hex](https://www.w3.org/TR/css-color-4/#hex-notation) *specifier* strings. If the specifier was not valid, null is returned. Some examples:

* <ColorSpan color="rgb(255, 255, 255)" />
* <ColorSpan color="rgb(10%, 20%, 30%)" />
* <ColorSpan color="rgba(255, 255, 255, 0.4)" />
* <ColorSpan color="rgba(10%, 20%, 30%, 0.4)" />
* <ColorSpan color="hsl(120, 50%, 20%)" />
* <ColorSpan color="hsla(120, 50%, 20%, 0.4)" />
* <ColorSpan color="#ffeeaa" />
* <ColorSpan color="#fea" />
* <ColorSpan color="#ffeeaa22" />
* <ColorSpan color="#fea2" />
* <ColorSpan color="steelblue" />

The list of supported [named colors](http://www.w3.org/TR/SVG/types.html#ColorKeywords) is specified by CSS.

Note: this function may also be used with `instanceof` to test if an object is a color instance. The same is true of color subclasses, allowing you to test whether a color is in a particular color space.

## *color*.opacity {#color_opacity}

```js
d3.color("steelblue").opacity // 1
```

This color’s opacity, typically in the range [0, 1].

## *color*.rgb() {#color_rgb}

```js
d3.color("hsl(120, 50%, 20%)").rgb() // {r: 25.5, g: 76.5, b: 25.5, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns the [RGB equivalent](#rgb) of this color. For RGB colors, that’s `this`.

## *color*.copy(*values*) {#color_copy}

```js
d3.color("steelblue").copy({opacity: 0.5}) // {r: 70, g: 130, b: 180, opacity: 0.5}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a copy of this color. If *values* is specified, any enumerable own properties of *values* are assigned to the new returned color.

## *color*.brighter(*k*) {#color_brighter}

```js
d3.color("steelblue").brighter(1) // {r: 100, g: 185.71428571428572, b: 257.14285714285717, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a brighter copy of this color. For example, if *k* is 1, <ColorSpan color="steelblue" /> in RGB color space becomes <ColorSpan :color="d3.rgb('steelblue').brighter()" />. The parameter *k* controls how much brighter the returned color should be (in arbitrary units); if *k* is not specified, it defaults to 1. The behavior of this method is dependent on the implementing color space.

## *color*.darker(*k*) {#color_darker}

```js
d3.color("steelblue").darker(1) // {r: 49, g: 91, b: 126, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a darker copy of this color. For example, if *k* is 1, <ColorSpan color="steelblue" /> in RGB color space becomes <ColorSpan :color="d3.rgb('steelblue').darker()" />. The parameter *k* controls how much darker the returned color should be (in arbitrary units); if *k* is not specified, it defaults to 1. The behavior of this method is dependent on the implementing color space.

## *color*.displayable() {#color_displayable}

```js
d3.color("steelblue").displayable(1) // true
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns true if and only if the color is displayable on standard hardware. For example, this returns false for an RGB color if any channel value is less than zero or greater than 255 when rounded, or if the opacity is not in the range [0, 1].

## *color*.formatHex() {#color_formatHex}

```js
d3.color("steelblue").formatHex() // "#4682b4"
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a hexadecimal string representing this color in RGB space, such as <ColorSpan color="steelblue" format="hex" />. If this color is not displayable, a suitable displayable color is returned instead. For example, RGB channel values greater than 255 are clamped to 255.

## *color*.formatHex8() {#color_formatHex8}

```js
d3.color("steelblue").formatHex8() // "#4682b4ff"
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a hexadecimal string representing this color in RGBA space, such as <ColorSpan :color="d3.rgb('steelblue').copy({opacity: 0.8})" format="hex8" />. If this color is not displayable, a suitable displayable color is returned instead. For example, RGB channel values greater than 255 are clamped to 255.

## *color*.formatHsl() {#color_formatHsl}

```js
d3.color("yellow").formatHsl() // "hsl(60, 100%, 50%)"
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a string representing this color according to the [CSS Color Module Level 3 specification](https://www.w3.org/TR/css-color-3/#hsl-color), such as <ColorSpan color="hsl(257, 50%, 80%)" /> or <ColorSpan color="hsla(257, 50%, 80%, 0.2)" />. If this color is not displayable, a suitable displayable color is returned instead by clamping S and L channel values to the interval [0, 100].

## *color*.formatRgb() {#color_formatRgb}

```js
d3.color("yellow").formatRgb() // "rgb(255, 255, 0)"
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a string representing this color according to the [CSS Object Model specification](https://drafts.csswg.org/cssom/#serialize-a-css-component-value), such as <ColorSpan color="rgb(247, 234, 186)" /> or <ColorSpan color="rgba(247, 234, 186, 0.2)" />. If this color is not displayable, a suitable displayable color is returned instead by clamping RGB channel values to the interval [0, 255].

## *color*.toString() {#color_toString}

```js
d3.color("yellow").toString() // "rgb(255, 255, 0)"
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · An alias for [*color*.formatRgb](#color_formatRgb).

## rgb(*color*) {#rgb}

```js
d3.rgb("hsl(60, 100%, 50%)") // {r: 255, g: 255, b: 0, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Constructs a new [RGB](https://en.wikipedia.org/wiki/RGB_color_model) color. The channel values are exposed as `r`, `g` and `b` properties on the returned instance. Use the [RGB color picker](https://observablehq.com/@d3/rgb-color-picker) to explore this color space.

If *r*, *g* and *b* are specified, these represent the channel values of the returned color; an *opacity* may also be specified. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to the RGB color space. See [color](#color) for examples. If a [*color*](#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](#color_rgb). Note that unlike [*color*.rgb](#color_rgb) this method *always* returns a new instance, even if *color* is already an RGB color.

## *rgb*.clamp() {#rgb_clamp}

```js
d3.rgb(300, 200, 100).clamp() // {r: 255, g: 200, b: 100, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a new RGB color where the `r`, `g`, and `b` channels are clamped to the range [0, 255] and rounded to the nearest integer value, and the `opacity` is clamped to the range [0, 1].

## hsl(*color*) {#hsl}

```js
d3.hsl("yellow") // {h: 60, s: 1, l: 0.5, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Constructs a new [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) color. The channel values are exposed as `h`, `s` and `l` properties on the returned instance. Use the [HSL color picker](https://observablehq.com/@d3/hsl-color-picker) to explore this color space.

If *h*, *s* and *l* are specified, these represent the channel values of the returned color; an *opacity* may also be specified. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to the HSL color space. See [color](#color) for examples. If a [*color*](#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](#color_rgb) and then converted to HSL. (Colors already in the HSL color space skip the conversion to RGB.)

## *hsl*.clamp() {#hsl_clamp}

```js
d3.hsl(400, 2, 0.5).clamp() // {h: 40, s: 1, l: 0.5, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a new HSL color where the `h` channel is clamped to the range [0, 360), and the `s`, `l`, and `opacity` channels are clamped to the range [0, 1].

## lab(*color*) {#lab}

```js
d3.lab("red") // {l: 54.29173376861782, a: 80.8124553179771, b: 69.88504032350531, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/lab.js) · Constructs a new [CIELAB](https://en.wikipedia.org/wiki/Lab_color_space#CIELAB) color. The channel values are exposed as `l`, `a` and `b` properties on the returned instance. Use the [CIELAB color picker](https://observablehq.com/@d3/lab-color-picker) to explore this color space. The value of *l* is typically in the range [0, 100], while *a* and *b* are typically in [-160, +160].

If *l*, *a* and *b* are specified, these represent the channel values of the returned color; an *opacity* may also be specified. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to the CIELAB color space. See [color](#color) for examples. If a [*color*](#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](#color_rgb) and then converted to CIELAB. (Colors already in the CIELAB color space skip the conversion to RGB, and colors in the HCL color space are converted directly to CIELAB.)

## gray(*l*, *opacity*) {#gray}

```js
d3.gray(50) // {l: 50, a: 0, b: 0, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/lab.js) · Constructs a new [CIELAB](#lab) color with the specified *l* value and *a* = *b* = 0.

## hcl(*color*) {#hcl}

```js
d3.hcl("yellow") // {h: 99.57458688693687, c: 94.70776566727464, l: 97.60712516622824, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/lab.js) · Equivalent to [d3.lch](#lch), but with reversed argument order.

## lch(*color*) {#lch}

```js
d3.lch("yellow") // {h: 99.57458688693687, c: 94.70776566727464, l: 97.60712516622824, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/lab.js) · Constructs a new [CIELCh<sub>ab</sub>](https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_representation:_CIELCh_or_CIEHLC) color. The channel values are exposed as `l`, `c` and `h` properties on the returned instance. Use the [CIELCh<sub>ab</sub> color picker](https://observablehq.com/@d3/hcl-color-picker) to explore this color space. The value of *l* is typically in the range [0, 100], *c* is typically in [0, 230], and *h* is typically in [0, 360).

If *l*, *c*, and *h* are specified, these represent the channel values of the returned color; an *opacity* may also be specified. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to CIELCh<sub>ab</sub> color space. See [color](#color) for examples. If a [*color*](#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](#color_rgb) and then converted to CIELCh<sub>ab</sub>. (Colors already in CIELCh<sub>ab</sub> color space skip the conversion to RGB, and colors in CIELAB color space are converted directly to CIELCh<sub>ab</sub>.)

## cubehelix(*color*) {#cubehelix}

```js
d3.cubehelix("yellow") // {h: 56.942171677321085, s: 4.614386868039714, l: 0.8900004504279901, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/cubehelix.js) · Constructs a new [Cubehelix](http://www.mrao.cam.ac.uk/~dag/CUBEHELIX/) color. The channel values are exposed as `h`, `s` and `l` properties on the returned instance.

If *h*, *s* and *l* are specified, these represent the channel values of the returned color; an *opacity* may also be specified. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to the Cubehelix color space. See [color](#color) for examples. If a [*color*](#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](#color_rgb) and then converted to Cubehelix. (Colors already in the Cubehelix color space skip the conversion to RGB.)

# docs/d3-contour.md

<script setup>

import * as Plot from "@observablehq/plot";
import {data as volcano} from "./data/volcano.data.js";
import PlotRender from "./components/PlotRender.js";

</script>

# d3-contour

<div style="margin: 1em 0;">
  <PlotRender :options='{
    axis: null,
    aspectRatio: 1,
    style: "margin: 0;",
    marks: [
      Plot.contour(volcano.values, {
        width: volcano.width,
        height: volcano.height,
        fill: Plot.identity,
        stroke: "black",
        interval: 5
      })
    ]
  }' />
  <a href="https://observablehq.com/@d3/volcano-contours/2" style="font-size: smaller;" target="_blank">Fork ↗︎</a>
</div>

This module computes contour polygons by applying [marching squares](https://en.wikipedia.org/wiki/Marching_squares) to a rectangular grid of numeric values. For example, the contours above show the topography of [Maungawhau](https://en.wikipedia.org/wiki/Maungawhau_/_Mount_Eden).

See one of:

- [Contours](./d3-contour/contour.md)
- [Density estimation](./d3-contour/density.md)

# docs/d3-contour/contour.md

# Contour polygons

For each [threshold value](#contours_thresholds), the [contour generator](#_contours) constructs a GeoJSON MultiPolygon geometry object representing the area where the input values are greater than or equal to the threshold value. The geometry is in planar coordinates, where ⟨<i>i</i> + 0.5, <i>j</i> + 0.5⟩ corresponds to element <i>i</i> + <i>jn</i> in the input values array.

Here is an example that loads a GeoTIFF of surface temperatures, and another that blurs a noisy monochrome PNG to produce smooth contours of cloud fraction:

[<img alt="GeoTiff Contours" src="https://raw.githubusercontent.com/d3/d3-contour/main/img/temperature.png" width="420" height="219">](https://observablehq.com/@d3/geotiff-contours)

[<img alt="Cloud Contours" src="https://raw.githubusercontent.com/d3/d3-contour/main/img/clouds.png" width="420" height="219">](https://observablehq.com/@d3/cloud-contours)

Since the contour polygons are GeoJSON, you can transform and display them using standard tools; see [geoPath](../d3-geo/path.md#geoPath), [geoProject](https://github.com/d3/d3-geo-projection/blob/main/README.md#geoProject) and [geoStitch](https://github.com/d3/d3-geo-projection/blob/main/README.md#geoStitch), for example. Here the above contours of surface temperature are displayed in the Natural Earth projection:

[<img alt="GeoTiff Contours II" src="https://raw.githubusercontent.com/d3/d3-contour/main/img/reprojection.png" width="420" height="219">](https://observablehq.com/@d3/geotiff-contours-ii)

Contour plots can also visualize continuous functions by sampling. Here is the Goldstein–Price function (a test function for global optimization) and a trippy animation of *sin*(*x* + *y*)*sin*(*x* - *y*):

[<img alt="Contours" src="https://raw.githubusercontent.com/d3/d3-contour/main/img/goldstein-price.png" width="420" height="219">](https://observablehq.com/@d3/contours)

[<img alt="Animated Contours" src="https://raw.githubusercontent.com/d3/d3-contour/main/img/sin-cos.png" width="420" height="219">](https://observablehq.com/@d3/animated-contours)

## contours() {#contours}

[Examples](https://observablehq.com/collection/@d3/d3-contour) · [Source](https://github.com/d3/d3-contour/blob/main/src/contours.js) · Constructs a new contour generator with the default settings.

```js
const contours = d3.contours()
    .size([width, height])
    .thresholds([0, 1, 2, 3, 4]);
```

## *contours*(*values*) {#_contours}

[Source](https://github.com/d3/d3-contour/blob/main/src/contours.js) · Computes the contours for the given array of *values*, returning an array of [GeoJSON](http://geojson.org/geojson-spec.html) [MultiPolygon](http://geojson.org/geojson-spec.html#multipolygon) [geometry objects](http://geojson.org/geojson-spec.html#geometry-objects).

```js
const polygons = contours(grid);
```

Each geometry object represents the area where the input <i>values</i> are greater than or equal to the corresponding [threshold value](#contours_thresholds); the threshold value for each geometry object is exposed as <i>geometry</i>.value.

The input *values* must be an array of length <i>n</i>×<i>m</i> where [<i>n</i>, <i>m</i>] is the contour generator’s [size](#contours_size); furthermore, each <i>values</i>[<i>i</i> + <i>jn</i>] must represent the value at the position ⟨<i>i</i>, <i>j</i>⟩. For example, to construct a 256×256 grid for the [Goldstein–Price function](https://en.wikipedia.org/wiki/Test_functions_for_optimization) where -2 ≤ <i>x</i> ≤ 2 and -2 ≤ <i>y</i> ≤ 1:

```js
var n = 256, m = 256, values = new Array(n * m);
for (var j = 0.5, k = 0; j < m; ++j) {
  for (var i = 0.5; i < n; ++i, ++k) {
    values[k] = goldsteinPrice(i / n * 4 - 2, 1 - j / m * 3);
  }
}
```
```js
function goldsteinPrice(x, y) {
  return (1 + Math.pow(x + y + 1, 2) * (19 - 14 * x + 3 * x * x - 14 * y + 6 * x * x + 3 * y * y))
      * (30 + Math.pow(2 * x - 3 * y, 2) * (18 - 32 * x + 12 * x * x + 48 * y - 36 * x * y + 27 * y * y));
}
```

The returned geometry objects are typically passed to [geoPath](../d3-geo/path.md) to display, using null or [geoIdentity](../d3-geo/projection.md#geoIdentity) as the associated projection.

## *contours*.contour(*values*, *threshold*) {#contours_contour}

[Source](https://github.com/d3/d3-contour/blob/main/src/contours.js) · Computes a single contour, returning a [GeoJSON](http://geojson.org/geojson-spec.html) [MultiPolygon](http://geojson.org/geojson-spec.html#multipolygon) [geometry object](http://geojson.org/geojson-spec.html#geometry-objects) representing the area where the input <i>values</i> are greater than or equal to the given [*threshold* value](#contours_thresholds); the threshold value for each geometry object is exposed as <i>geometry</i>.value.

The input *values* must be an array of length <i>n</i>×<i>m</i> where [<i>n</i>, <i>m</i>] is the contour generator’s [size](#contours_size); furthermore, each <i>values</i>[<i>i</i> + <i>jn</i>] must represent the value at the position ⟨<i>i</i>, <i>j</i>⟩. See [*contours*](#_contours) for an example.

## *contours*.size(*size*) {#contours_size}

[Source](https://github.com/d3/d3-contour/blob/main/src/contours.js) · If *size* is specified, sets the expected size of the input *values* grid to the [contour generator](#_contours) and returns the contour generator. The *size* is specified as an array \[<i>n</i>, <i>m</i>\] where <i>n</i> is the number of columns in the grid and <i>m</i> is the number of rows; *n* and *m* must be positive integers. If *size* is not specified, returns the current size which defaults to [1, 1].

## *contours*.smooth(*smooth*) {#contours_smooth}

[Examples](https://observablehq.com/@d3/contours-smooth) · [Source](https://github.com/d3/d3-contour/blob/main/src/contours.js) · If *smooth* is specified, sets whether or not the generated contour polygons are smoothed using linear interpolation. If *smooth* is not specified, returns the current smoothing flag, which defaults to true.

## *contours*.thresholds(*thresholds*) {#contours_thresholds}

[Source](https://github.com/d3/d3-contour/blob/main/src/contours.js) · If *thresholds* is specified, sets the threshold generator to the specified function or array and returns this contour generator. If *thresholds* is not specified, returns the current threshold generator, which by default implements [Sturges’ formula](../d3-array/bin.md#thresholdSturges).

Thresholds are defined as an array of values [*x0*, *x1*, …]. The first generated contour corresponds to the area where the input values are greater than or equal to *x0*; the second contour corresponds to the area where the input values are greater than or equal to *x1*, and so on. Thus, there is exactly one generated MultiPolygon geometry object for each specified threshold value; the threshold value is exposed as <i>geometry</i>.value.

If a *count* is specified instead of an array of *thresholds*, then the input values’ [extent](../d3-array/summarize.md#extent) will be uniformly divided into approximately *count* bins; see [ticks](../d3-array/ticks.md#ticks).

# docs/d3-contour/density.md

# Density estimation

Contours can show the estimated density of point clouds, which is useful to avoid overplotting in large datasets. The [contourDensity](#contourDensity) method implements fast two-dimensional kernel density estimation.

Here is a scatterplot showing the relationship between the idle duration and eruption duration for Old Faithful:

[<img alt="Density Contours" src="https://raw.githubusercontent.com/d3/d3-contour/main/img/faithful.png" width="420" height="219">](https://observablehq.com/@d3/density-contours)

And here is a density contour plot showing the relationship between the weight and price of 53,940 diamonds:

[<img alt="Density Contours" src="https://raw.githubusercontent.com/d3/d3-contour/main/img/diamonds.png" width="420" height="420">](https://observablehq.com/@d3/density-contours)

## contourDensity() {#contourDensity}

[Examples](https://observablehq.com/@d3/density-contours) · [Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · Constructs a new density estimator with the default settings.

## *density*(*data*) {#_density}

[Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · Estimates the density contours for the given array of *data*, returning an array of [GeoJSON](http://geojson.org/geojson-spec.html) [MultiPolygon](http://geojson.org/geojson-spec.html#multipolygon) [geometry objects](http://geojson.org/geojson-spec.html#geometry-objects).

Each geometry object represents the area where the estimated number of points per square pixel is greater than or equal to the corresponding [threshold value](#density_thresholds); the threshold value for each geometry object is exposed as <i>geometry</i>.value. The returned geometry objects are typically passed to [geoPath](../d3-geo/path.md) to display, using null or [geoIdentity](../d3-geo/projection.md#geoIdentity) as the associated projection. See also [contours](./contour.md).

The x and y coordinate for each data point are computed using [*density*.x](#density_x) and [*density*.y](#density_y). In addition, [*density*.weight](#density_weight) indicates the relative contribution of each data point (default 1). The generated contours are only accurate within the estimator’s [defined size](#density_size).

## *density*.x(*x*) {#density_x}

[Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · If *x* is specified, sets the *x*-coordinate accessor. If *x* is not specified, returns the current *x*-coordinate accessor, which defaults to:

```js
function x(d) {
  return d[0];
}
```

## *density*.y(*y*) {#density_y}

[Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · If *y* is specified, sets the *y*-coordinate accessor. If *y* is not specified, returns the current *y*-coordinate accessor, which defaults to:

```js
function y(d) {
  return d[1];
}
```

## *density*.weight(*weight*) {#density_weight}

[Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · If *weight* is specified, sets the accessor for point weights. If *weight* is not specified, returns the current point weight accessor, which defaults to:

```js
function weight() {
  return 1;
}
```

## *density*.size(*size*) {#density_size}

[Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · If *size* is specified, sets the size of the density estimator to the specified bounds and returns the estimator. The *size* is specified as an array \[<i>width</i>, <i>height</i>\], where <i>width</i> is the maximum *x*-value and <i>height</i> is the maximum *y*-value. If *size* is not specified, returns the current size which defaults to [960, 500]. The [estimated density contours](#_density) are only accurate within the defined size.

## *density*.cellSize(*cellSize*) {#density_cellSize}

[Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · If *cellSize* is specified, sets the size of individual cells in the underlying bin grid to the specified positive integer and returns the estimator. If *cellSize* is not specified, returns the current cell size, which defaults to 4. The cell size is rounded down to the nearest power of two. Smaller cells produce more detailed contour polygons, but are more expensive to compute.

## *density*.thresholds(*thresholds*) {#density_thresholds}

[Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · If *thresholds* is specified, sets the threshold generator to the specified function or array and returns this contour generator. If *thresholds* is not specified, returns the current threshold generator, which by default generates about twenty nicely-rounded density thresholds.

Thresholds are defined as an array of values [*x0*, *x1*, …]. The first [generated density contour](#_density) corresponds to the area where the estimated density is greater than or equal to *x0*; the second contour corresponds to the area where the estimated density is greater than or equal to *x1*, and so on. Thus, there is exactly one generated MultiPolygon geometry object for each specified threshold value; the threshold value is exposed as <i>geometry</i>.value. The first value *x0* should typically be greater than zero.

If a *count* is specified instead of an array of *thresholds*, then approximately *count* uniformly-spaced nicely-rounded thresholds will be generated; see [ticks](../d3-array/ticks.md#ticks).

## *density*.bandwidth(*bandwidth*) {#density_bandwidth}

[Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · If *bandwidth* is specified, sets the bandwidth (the standard deviation) of the Gaussian kernel and returns the estimate. If *bandwidth* is not specified, returns the current bandwidth, which defaults to 20.4939…. The specified *bandwidth* is currently rounded to the nearest supported value by this implementation, and must be nonnegative.

## *density*.contours(*data*) {#density_contours}

[Examples](https://observablehq.com/@d3/density-contours-data) · [Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · Return a *contour*(*value*) function that can be used to compute an arbitrary contour on the given data without needing to recompute the underlying grid. The returned *contour* function also exposes a *contour*.max value which represents the maximum density of the grid.

# docs/d3-delaunay.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef} from "vue";
import PlotRender from "./components/PlotRender.js";

const random = d3.randomNormal.source(d3.randomLcg(42))();
const points = Array.from({length: 1000}, () => [random(), random()]);

</script>

# d3-delaunay

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.delaunayMesh(points, {stroke: "currentColor", strokeOpacity: 0.3}),
    Plot.voronoiMesh(points, {stroke: "var(--vp-c-brand)", strokeOpacity: 1}),
    Plot.dot(points, {r: 2, fill: "currentColor"}),
  ]
}' />

This is a fast library for computing the [Voronoi diagram](https://en.wikipedia.org/wiki/Voronoi_diagram) of a set of two-dimensional points. It is based on [Delaunator](https://github.com/mapbox/delaunator), a fast library for computing the [Delaunay triangulation](https://en.wikipedia.org/wiki/Delaunay_triangulation) using [sweep algorithms](https://github.com/mapbox/delaunator/blob/main/README.md#papers). The Voronoi diagram is constructed by connecting the circumcenters of adjacent triangles in the Delaunay triangulation.

See one of:

- [Delaunay triangulations](./d3-delaunay/delaunay.md)
- [Voronoi diagrams](./d3-delaunay/voronoi.md)

For an interactive explanation of how this library works, see [The Delaunay’s Dual](https://observablehq.com/@mbostock/the-delaunays-dual).

# docs/d3-delaunay/delaunay.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef} from "vue";
import PlotRender from "../components/PlotRender.js";

const random = d3.randomNormal.source(d3.randomLcg(42))();
const points = Array.from({length: 1000}, () => [random(), random()]);
const findState = shallowRef({x: 0, y: 0, i: -1});
const neighborsState = shallowRef({i: -1, N: []});

</script>

# Delaunay triangulations

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.delaunayMesh(points, {strokeOpacity: 0.3})
  ]
}' />

The Delaunay triangulation is a triangular mesh formed from a set of points in *x* and *y*. No point is inside the circumcircle of any triangle, which is a nice geometric property for certain applications, and tends to avoid “sliver” triangles. The Delaunay triangulation is the dual of the [Voronoi diagram](./voronoi.md).

## new Delaunay(*points*) {#Delaunay}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns the Delaunay triangulation for the given flat array [*x0*, *y0*, *x1*, *y1*, …] of *points*.

```js
const delaunay = new d3.Delaunay(Float64Array.of(0, 0, 0, 1, 1, 0, 1, 1));
```

The given *points* may be any array-like type, but is typically a Float64Array.

### *delaunay*.points {#delaunay_points}

The coordinates of the points as an array [*x0*, *y0*, *x1*, *y1*, …].

### *delaunay*.halfedges {#delaunay_halfedges}

The halfedge indexes as an Int32Array [*j0*, *j1*, …]. For each index 0 ≤ *i* < *halfedges*.length, there is a halfedge from triangle vertex *j* = *halfedges*[*i*] to triangle vertex *i*. Equivalently, this means that triangle ⌊*i* / 3⌋ is adjacent to triangle ⌊*j* / 3⌋. If *j* is negative, then triangle ⌊*i* / 3⌋ is an exterior triangle on the [convex hull](#delaunay_hull). For example, to render the internal edges of the Delaunay triangulation:

```js
const {points, halfedges, triangles} = delaunay;
for (let i = 0, n = halfedges.length; i < n; ++i) {
  const j = halfedges[i];
  if (j < i) continue;
  const ti = triangles[i];
  const tj = triangles[j];
  context.moveTo(points[ti * 2], points[ti * 2 + 1]);
  context.lineTo(points[tj * 2], points[tj * 2 + 1]);
}
```

See also [*delaunay*.render](#delaunay_render).

### *delaunay*.hull {#delaunay_hull}

An Int32Array of point indexes that form the convex hull in counterclockwise order. If the points are collinear, returns them ordered.

See also [*delaunay*.renderHull](#delaunay_renderHull).

### *delaunay*.triangles {#delaunay_triangles}

The triangle vertex indexes as an Uint32Array [*i0*, *j0*, *k0*, *i1*, *j1*, *k1*, …]. Each contiguous triplet of indexes *i*, *j*, *k* forms a counterclockwise triangle. The coordinates of the triangle’s points can be found by going through [*delaunay*.points](#delaunay_points). For example, to render triangle *i*:

```js
const {points, triangles} = delaunay;
const t0 = triangles[i * 3 + 0];
const t1 = triangles[i * 3 + 1];
const t2 = triangles[i * 3 + 2];
context.moveTo(points[t0 * 2], points[t0 * 2 + 1]);
context.lineTo(points[t1 * 2], points[t1 * 2 + 1]);
context.lineTo(points[t2 * 2], points[t2 * 2 + 1]);
context.closePath();
```

See also [*delaunay*.renderTriangle](#delaunay_renderTriangle).

### *delaunay*.inedges {#delaunay_inedges}

The incoming halfedge indexes as a Int32Array [*e0*, *e1*, *e2*, …]. For each point *i*, *inedges*[*i*] is the halfedge index *e* of an incoming halfedge. For coincident points, the halfedge index is -1; for points on the convex hull, the incoming halfedge is on the convex hull; for other points, the choice of incoming halfedge is arbitrary. The *inedges* table can be used to traverse the Delaunay triangulation; see also [*delaunay*.neighbors](#delaunay_neighbors).

## Delaunay.from(*points*, *fx*, *fy*, *that*) {#Delaunay_from}

:::tip
Delaunay.from is typically slower than [new Delaunay](#Delaunay) because it requires materializing a new flat array of *xy* coordinates.
:::

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns the Delaunay triangulation for the given array or iterable of *points*. If *fx* and *fy* are not specified, then *points* is assumed to be an array of two-element arrays of numbers: [[*x0*, *y0*], [*x1*, *y1*], …].

```js
const delaunay = d3.Delaunay.from([[0, 0], [0, 1], [1, 0], [1, 1]]);
```

Otherwise, *fx* and *fy* are functions that are invoked for each element in the *points* array in order, and must return the respective x and y coordinate for each point.

```js
const delaunay = d3.Delaunay.from([{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 0}, {x: 1, y: 1}], (d) => d.x, (d) => d.y);
```

If *that* is specified, the functions *fx* and *fy* are invoked with *that* as *this*. (See [Array.from](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/from) for reference.)

## *delaunay*.find(*x*, *y*, *i*) {#delaunay_find}

<PlotRender defer v-once :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.delaunayMesh(points, {strokeOpacity: 0.3}),
    Plot.line(points, {
      stroke: "red",
      strokeWidth: 3,
      markerStart: "dot",
      markerEnd: "arrow",
      render(index, scales, values, dimensions, context, next) {
        const {x: X, y: Y} = values;
        const delaunay = d3.Delaunay.from(points, (d, i) => X[i], (d, i) => Y[i]);
        function update(x, y) {
          let j = 0, i, path = [j];
          while ((i = delaunay._step(j, x, y)) >= 0 && i !== j) path.push(j = i);
          findState = {x, y, i};
          return next(path, scales, values, dimensions, context);
        }
        let line = update(0, 0);
        context.ownerSVGElement.addEventListener("pointermove", (event) => {
          const [x, y] = d3.pointer(event);
          const newline = update(Math.round(x), Math.round(y));
          line.replaceWith(newline);
          line = newline;
        });
        return line;
      }
    }),
  ]
}' />

```js-vue
delaunay.find({{findState.x}}, {{findState.y}}) // {{findState.i}}
```

[Examples](https://observablehq.com/@d3/delaunay-find) · [Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns the index of the input point that is closest to the specified point ⟨*x*, *y*⟩. The search is started at the specified point *i*. If *i* is not specified, it defaults to zero.

## *delaunay*.neighbors(*i*) {#delaunay_neighbors}

<PlotRender defer v-once :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.delaunayMesh(points, {strokeOpacity: 0.3}),
    Plot.link(points, {
      x1: (d) => d[0],
      y1: (d) => d[1],
      x2: (d) => d[0],
      y2: (d) => d[1],
      stroke: "red",
      strokeWidth: 2,
      markerStart: "dot",
      markerEnd: "arrow",
      render(index, scales, values, dimensions, context, next) {
        const {x1: X, y1: Y} = values;
        const delaunay = d3.Delaunay.from(points, (d, i) => X[i], (d, i) => Y[i]);
        function update(x, y) {
          const i = delaunay.find(x, y);
          const N = Array.from(delaunay.neighbors(i));
          neighborsState = {i, N};
          return next(
            d3.range(N.length),
            scales,
            {
              x1: N.map(() => X[i]),
              x2: N.map((j) => X[j]),
              y1: N.map(() => Y[i]),
              y2: N.map((j) => Y[j])
            },
            dimensions,
            context
          );
        }
        let line = update(0, 0);
        context.ownerSVGElement.addEventListener("pointermove", (event) => {
          const [x, y] = d3.pointer(event);
          const newline = update(Math.round(x), Math.round(y));
          line.replaceWith(newline);
          line = newline;
        });
        return line;
      }
    }),
  ]
}' />

```js-vue
delaunay.neighbors({{neighborsState.i}}) // [{{neighborsState.N.join(", ")}}]
```

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns an iterable over the indexes of the neighboring points to the specified point *i*. The iterable is empty if *i* is a coincident point.

## *delaunay*.render(*context*) {#delaunay_render}

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.delaunayMesh(points, {strokeOpacity: 1})
  ]
}' />

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Renders the edges of the Delaunay triangulation to the specified *context*. The specified *context* must implement the *context*.moveTo and *context*.lineTo methods from the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods). If a *context* is not specified, an SVG path string is returned instead.

## *delaunay*.renderHull(*context*) {#delaunay_renderHull}

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.hull(points, {strokeOpacity: 1})
  ]
}' />

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Renders the convex hull of the Delaunay triangulation to the specified *context*. The specified *context* must implement the *context*.moveTo and *context*.lineTo methods from the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods). If a *context* is not specified, an SVG path string is returned instead.

## *delaunay*.renderTriangle(*i*, *context*) {#delaunay_renderTriangle}

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  color: {scheme: $dark ? "turbo" : "orrd", reverse: true},
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.geo([], {
      stroke: "black",
      strokeOpacity: 0.2,
      initializer(data, facets, channels, {x, y}) {
        const delaunay = d3.Delaunay.from(points, (d) => x(d[0]), (d) => y(d[1]));
        const polygons = Array.from(delaunay.trianglePolygons());
        const index = d3.range(polygons.length);
        return {
          data: polygons,
          facets: [index],
          channels: {
            geometry: {
              value: polygons.map((ring) => ({type: "Polygon", coordinates: [ring.map(([px, py]) => [x.invert(px), y.invert(py)])]})),
              scale: false // TODO allow scale: true here
            },
            fill: {
              value: index,
              scale: true
            }
          }
        };
      }
    }),
    Plot.dot(points, {r: 2, fill: "black"})
  ]
}' />

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Renders triangle *i* of the Delaunay triangulation to the specified *context*. The specified *context* must implement the *context*.moveTo, *context*.lineTo and *context*.closePath methods from the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods). If a *context* is not specified, an SVG path string is returned instead.

## *delaunay*.renderPoints(*context*, *radius*) {#delaunay_renderPoints}

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"})
  ]
}' />

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Renders the input points of the Delaunay triangulation to the specified *context* as circles with the specified *radius*. If *radius* is not specified, it defaults to 2. The specified *context* must implement the *context*.moveTo and *context*.arc methods from the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods). If a *context* is not specified, an SVG path string is returned instead.

## *delaunay*.hullPolygon() {#delaunay_hullPolygon}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns the closed polygon [[*x0*, *y0*], [*x1*, *y1*], …, [*x0*, *y0*]] representing the convex hull. See also [*delaunay*.renderHull](#delaunay_renderHull).

## *delaunay*.trianglePolygons() {#delaunay_trianglePolygons}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns an iterable over the [polygons for each triangle](#delaunay_trianglePolygon), in order. See also [*delaunay*.renderTriangle](#delaunay_renderTriangle).

## *delaunay*.trianglePolygon(*i*) {#delaunay_trianglePolygon}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns the closed polygon [[*x0*, *y0*], [*x1*, *y1*], [*x2*, *y2*], [*x0*, *y0*]] representing the triangle *i*. See also [*delaunay*.renderTriangle](#delaunay_renderTriangle).

## *delaunay*.update() {#delaunay_update}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Recomputes the triangulation after the points have been modified in-place.

## *delaunay*.voronoi(*bounds*) {#delaunay_voronoi}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns the [Voronoi diagram](./voronoi.md) for the given Delaunay triangulation. When rendering, the diagram will be clipped to the specified *bounds* = [*xmin*, *ymin*, *xmax*, *ymax*].

```js
const delaunay = d3.Delaunay.from(points);
const voronoi = delaunay.voronoi([0, 0, 640, 480]);
```

If *bounds* is not specified, it defaults to [0, 0, 960, 500]. The Voronoi diagram is returned even in degenerate cases where no triangulation exists — namely 0, 1 or 2 points, and collinear points.

# docs/d3-delaunay/voronoi.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {shallowRef} from "vue";
import PlotRender from "../components/PlotRender.js";

const random = d3.randomNormal.source(d3.randomLcg(42))();
const points = Array.from({length: 1000}, () => [random(), random()]);
const neighborsState = shallowRef({i: -1, N: []});

</script>

# Voronoi diagrams

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.voronoiMesh(points, {strokeOpacity: 0.3})
  ]
}' />

Given a set of points, the Voronoi diagram partitions the plane into cells representing the region of the plane that is closest to the corresponding point. The Voronoi diagram is the dual of the [Delaunay triangulation](./delaunay.md).

## *delaunay*.voronoi(*bounds*) {#delaunay_voronoi}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/delaunay.js) · Returns the Voronoi diagram for the given [Delaunay triangulation](./delaunay.md). When rendering, the diagram will be clipped to the specified *bounds* = [*xmin*, *ymin*, *xmax*, *ymax*].

```js
const delaunay = d3.Delaunay.from([[0, 0], [0, 100], [100, 0], [100, 100]]);
const voronoi = delaunay.voronoi([0, 0, 640, 480]);
```

If *bounds* is not specified, it defaults to [0, 0, 960, 500]. The Voronoi diagram is returned even in degenerate cases where no triangulation exists — namely 0, 1 or 2 points, and collinear points.

### *voronoi*.delaunay {#voronoi_delaunay}

The Voronoi diagram’s associated [Delaunay triangulation](./delaunay.md).

### *voronoi*.circumcenters {#voronoi_circumcenters}

The [circumcenters](http://mathworld.wolfram.com/Circumcenter.html) of the Delaunay triangles as a Float64Array [*cx0*, *cy0*, *cx1*, *cy1*, …]. Each contiguous pair of coordinates *cx*, *cy* is the circumcenter for the corresponding triangle. These circumcenters form the coordinates of the Voronoi cell polygons.

### *voronoi*.vectors {#voronoi_vectors}

A Float64Array [*vx0*, *vy0*, *wx0*, *wy0*, …] where each non-zero quadruple describes an open (infinite) cell on the outer hull, giving the directions of two open half-lines.

### *voronoi*.xmin<br>*voronoi*.ymin<br>*voronoi*.xmax<br>*voronoi*.ymax {#voronoi_bounds}

The bounds of the viewport [*xmin*, *ymin*, *xmax*, *ymax*] for rendering the Voronoi diagram. These values only affect the rendering methods ([*voronoi*.render](#voronoi_render), [*voronoi*.renderBounds](#voronoi_renderBounds), [*voronoi*.renderCell](#voronoi_renderCell)).

## *voronoi*.contains(*i*, *x*, *y*) {#voronoi_contains}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js) · Returns true if the cell with the specified index *i* contains the specified point ⟨*x*, *y*⟩; *i.e.*, whether the point *i* is the closest point in the diagram to the specified point. (This method is not affected by the associated Voronoi diagram’s viewport [bounds](#voronoi_bounds).)

## *voronoi*.neighbors(*i*) {#voronoi_neighbors}

<PlotRender defer v-once :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.voronoiMesh(points, {strokeOpacity: 0.3}),
    Plot.link(points, {
      x1: (d) => d[0],
      y1: (d) => d[1],
      x2: (d) => d[0],
      y2: (d) => d[1],
      stroke: "red",
      strokeWidth: 2,
      markerStart: "dot",
      markerEnd: "arrow",
      render(index, scales, values, dimensions, context, next) {
        const {x1: X, y1: Y} = values;
        const delaunay = d3.Delaunay.from(points, (d, i) => X[i], (d, i) => Y[i]);
        const voronoi = delaunay.voronoi([0, 0, dimensions.width, dimensions.height]);
        function update(x, y) {
          const i = delaunay.find(x, y);
          const N = Array.from(voronoi.neighbors(i));
          neighborsState = {i, N};
          return next(
            d3.range(N.length),
            scales,
            {
              x1: N.map(() => X[i]),
              x2: N.map((j) => X[j]),
              y1: N.map(() => Y[i]),
              y2: N.map((j) => Y[j])
            },
            dimensions,
            context
          );
        }
        let line = update(0, 0);
        context.ownerSVGElement.addEventListener("pointermove", (event) => {
          const [x, y] = d3.pointer(event);
          const newline = update(Math.round(x), Math.round(y));
          line.replaceWith(newline);
          line = newline;
        });
        return line;
      }
    }),
  ]
}' />

```js-vue
voronoi.neighbors({{neighborsState.i}}) // [{{neighborsState.N.join(", ")}}]
```

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js) · Returns an iterable over the indexes of the cells that share a common edge with the specified cell *i*. Voronoi neighbors are always neighbors on the Delaunay graph, but the converse is false when the common edge has been clipped out by the Voronoi diagram’s viewport.

## *voronoi*.render(*context*) {#voronoi_render}

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.voronoiMesh(points, {strokeOpacity: 1})
  ]
}' />

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js) · Renders the mesh of Voronoi cells to the specified *context*. The specified *context* must implement the *context*.moveTo and *context*.lineTo methods from the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods). If a *context* is not specified, an SVG path string is returned instead.

## *voronoi*.renderBounds(*context*) {#voronoi_renderBounds}

<PlotRender defer :options='{
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor", clip: true}),
    Plot.frame()
  ]
}' />

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js) · Renders the viewport extent to the specified *context*. The specified *context* must implement the *context*.rect method from the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods). Equivalent to *context*.rect(*voronoi*.xmin, *voronoi*.ymin, *voronoi*.xmax - *voronoi*.xmin, *voronoi*.ymax - *voronoi*.ymin). If a *context* is not specified, an SVG path string is returned instead.

## *voronoi*.renderCell(*i*, *context*) {#voronoi_renderCell}

<PlotRender defer :options='{
  style: {overflow: "hidden"},
  axis: null,
  width: 688,
  height: 688,
  x: {domain: [-4, 3.5]},
  y: {domain: [-3, 3.5]},
  color: {scheme: $dark ? "turbo" : "orrd"},
  marks: [
    Plot.voronoi(Array.from(d3.union(d3.Delaunay.from(points).triangles), (i) => points[i]), {fill: (d, i) => -i}),
    Plot.dot(points, {r: 2, fill: "black"}),
    Plot.voronoiMesh(points, {stroke: "black", strokeOpacity: 1}),
    Plot.frame({stroke: "black"}),
  ]
}' />

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js) · Renders the cell with the specified index *i* to the specified *context*. The specified *context* must implement the *context*.moveTo , *context*.lineTo and *context*.closePath methods from the [CanvasPathMethods API](https://www.w3.org/TR/2dcontext/#canvaspathmethods). If a *context* is not specified, an SVG path string is returned instead.

## *voronoi*.cellPolygons() {#voronoi_cellPolygons}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js) · Returns an iterable over the non-empty [polygons for each cell](#voronoi_cellPolygon), with the cell index as property. See also [*voronoi*.renderCell](#voronoi_renderCell).

## *voronoi*.cellPolygon(*i*) {#voronoi_cellPolygon}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js) · Returns the convex, closed polygon [[*x0*, *y0*], [*x1*, *y1*], …, [*x0*, *y0*]] representing the cell for the specified point *i*. See also [*voronoi*.renderCell](#voronoi_renderCell).

## *voronoi*.update() {#voronoi_update}

[Source](https://github.com/d3/d3-delaunay/blob/main/src/voronoi.js) · Updates the Voronoi diagram and underlying triangulation after the points have been modified in-place — useful for Lloyd’s relaxation. Calls [*delaunay*.update](./delaunay.md#delaunay_update) on the underlying Delaunay triangulation.

# docs/d3-dispatch.md

# d3-dispatch

Dispatching is a low-level interaction mechanism that allows you to register named callbacks and then call them with arbitrary arguments. A variety of D3 interaction components, such as [d3-drag](./d3-drag.md), use [dispatch](#dispatch) to emit events to listeners. Think of this as [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) except every listener has a well-defined name so it’s easy to remove or replace them.

For example, to create a dispatch for *start* and *end* events:

```js
const dispatch = d3.dispatch("start", "end");
```

You can then register callbacks for these events using [*dispatch*.on](#dispatch_on):

```js
dispatch.on("start", callback1);
dispatch.on("start.foo", callback2);
dispatch.on("end", callback3);
```

Then, you can invoke all the *start* callbacks using [*dispatch*.call](#dispatch_call) or [*dispatch*.apply](#dispatch_apply):

```js
dispatch.call("start");
```

Like *function*.call, you may also specify the `this` context and any arguments:

```js
dispatch.call("start", {about: "I am a context object"}, "I am an argument");
```

<!-- Want a more involved example? See how to use [d3-dispatch for coordinated views](http://bl.ocks.org/mbostock/5872848). -->

## dispatch(...*types*) {#dispatch}

[Source](https://github.com/d3/d3-dispatch/blob/main/src/dispatch.js) · Creates a new dispatch for the specified event *types*. Each *type* is a string, such as `"start"` or `"end"`.

## *dispatch*.on(*typenames*, *callback*) {#dispatch_on}

[Source](https://github.com/d3/d3-dispatch/blob/main/src/dispatch.js) · Adds, removes or gets the *callback* for the specified *typenames*. If a *callback* function is specified, it is registered for the specified (fully-qualified) *typenames*. If a callback was already registered for the given *typenames*, the existing callback is removed before the new callback is added.

The specified *typenames* is a string, such as `start` or `end.foo`. The type may be optionally followed by a period (`.`) and a name; the optional name allows multiple callbacks to be registered to receive events of the same type, such as `start.foo` and `start.bar`. To specify multiple typenames, separate typenames with spaces, such as `start end` or `start.foo start.bar`.

To remove all callbacks for a given name `foo`, say `dispatch.on(".foo", null)`.

If *callback* is not specified, returns the current callback for the specified *typenames*, if any. If multiple typenames are specified, the first matching callback is returned.

## *dispatch*.copy() {#dispatch_copy}

[Source](https://github.com/d3/d3-dispatch/blob/main/src/dispatch.js) · Returns a copy of this dispatch object. Changes to this dispatch do not affect the returned copy and *vice versa*.

## *dispatch*.call(*type*, *that*, ...*arguments*) {#dispatch_call}

[Source](https://github.com/d3/d3-dispatch/blob/main/src/dispatch.js) · Like [*function*.call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call), invokes each registered callback for the specified *type*, passing the callback the specified *...*argument**, with *that* as the `this` context. See [*dispatch*.apply](#dispatch_apply) for more information.

## *dispatch*.apply(*type*, *that*, *arguments*) {#dispatch_apply}

[Source](https://github.com/d3/d3-dispatch/blob/main/src/dispatch.js) · Like [*function*.apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call), invokes each registered callback for the specified *type*, passing the callback the specified *arguments*, with *that* as the `this` context. For example, if you wanted to dispatch your *custom* callbacks after handling a native *click* event, while preserving the current `this` context and arguments, you could say:

```js
selection.on("click", function() {
  dispatch.apply("custom", this, arguments);
});
```

You can pass whatever arguments you want to callbacks; most commonly, you might create an object that represents an event, or pass the current datum (*d*) and index (*i*). See [function.call](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/Call) and [function.apply](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/Apply) for further information.

# docs/d3-drag.md

# d3-drag

[Examples](https://observablehq.com/collection/@d3/d3-drag) · [Drag-and-drop](https://en.wikipedia.org/wiki/Drag_and_drop) is a popular interaction method for manipulating spatial elements: move the pointer to an object, press and hold to grab it, “drag” the object to a new location, and release to “drop”. D3’s drag behavior provides a flexible abstraction for drag-and-drop. For example, you can drag nodes in a [force-directed graph](./d3-force.md):

[<img alt="Force-Directed Graph" src="https://raw.githubusercontent.com/d3/d3-drag/master/img/force-graph.png" width="420" height="219">](https://observablehq.com/@d3/force-directed-graph/2)

Or a simulation of colliding circles:

[<img alt="Force Dragging II" src="https://raw.githubusercontent.com/d3/d3-drag/master/img/force-collide.png" width="420" height="219">](https://observablehq.com/@d3/drag-collisions)

The drag behavior isn’t just for moving elements around; there are a variety of ways to respond to a drag gesture. For example, you can use it to lasso elements in a scatterplot, or to paint lines on a canvas:

[<img alt="Line Drawing" src="https://raw.githubusercontent.com/d3/d3-drag/master/img/drawing.png" width="420" height="219">](https://observablehq.com/@d3/draw-me)

The drag behavior can be combined with other behaviors, such as [d3-zoom](./d3-zoom.md) for zooming:

[<img alt="Drag & Zoom II" src="https://raw.githubusercontent.com/d3/d3-drag/master/img/dots.png" width="420" height="219">](https://observablehq.com/@d3/drag-zoom)

The drag behavior is agnostic about the DOM, so you can use it with SVG, HTML or even Canvas! And you can extend it with advanced selection techniques, such as a Voronoi overlay or a closest-target search:

[<img alt="Circle Dragging IV" src="https://raw.githubusercontent.com/d3/d3-drag/master/img/voronoi.png" width="420" height="219">](https://observablehq.com/@d3/circle-dragging-iii)[<img alt="Circle Dragging II" src="https://raw.githubusercontent.com/d3/d3-drag/master/img/canvas.png" width="420" height="219">](https://observablehq.com/@d3/circle-dragging-ii)

The drag behavior unifies mouse and touch input and avoids browser quirks. In the future the drag behavior will support [Pointer Events](https://www.w3.org/TR/pointerevents/), too.

## drag() {#drag}

[Source](https://github.com/d3/d3-drag/blob/main/src/drag.js) · Creates a new drag behavior. The returned behavior, [*drag*](#_drag), is both an object and a function, and is typically applied to selected elements via [*selection*.call](./d3-selection/control-flow.md#selection_call).

```js
const drag = d3.drag();
```

## *drag*(*selection*) {#_drag}

[Source](https://github.com/d3/d3-drag/blob/main/src/drag.js) · Applies this drag behavior to the specified [*selection*](./d3-selection.md). This function is typically not invoked directly, and is instead invoked via [*selection*.call](./d3-selection/control-flow.md#selection_call). For example, to instantiate a drag behavior and apply it to a selection:

```js
d3.selectAll(".node").call(d3.drag().on("start", started));
```

Internally, the drag behavior uses [*selection*.on](./d3-selection/events.md#selection_on) to bind the necessary event listeners for dragging. The listeners use the name `.drag`, so you can subsequently unbind the drag behavior as follows:

```js
selection.on(".drag", null);
```

Applying the drag behavior also sets the [-webkit-tap-highlight-color](https://developer.apple.com/library/mac/documentation/AppleApplications/Reference/SafariWebContent/AdjustingtheTextSize/AdjustingtheTextSize.html#//apple_ref/doc/uid/TP40006510-SW5) style to transparent, disabling the tap highlight on iOS. If you want a different tap highlight color, remove or re-apply this style after applying the drag behavior.

## *drag*.container(*container*) {#drag_container}

[Source](https://github.com/d3/d3-drag/blob/main/src/drag.js) · If *container* is specified, sets the container accessor to the specified object or function and returns the drag behavior. If *container* is not specified, returns the current container accessor, which defaults to:

```js
function container() {
  return this.parentNode;
}
```

The *container* of a drag gesture determines the coordinate system of subsequent [drag events](#drag-events), affecting *event*.x and *event*.y. The element returned by the container accessor is subsequently passed to [pointer](./d3-selection/events.md#pointer) to determine the local coordinates of the pointer.

The default container accessor returns the parent node of the element in the originating selection (see [*drag*](#_drag)) that received the initiating input event. This is often appropriate when dragging SVG or HTML elements, since those elements are typically positioned relative to a parent. For dragging graphical elements with a Canvas, however, you may want to redefine the container as the initiating element itself:

```js
function container() {
  return this;
}
```

Alternatively, the container may be specified as the element directly, such as `drag.container(canvas)`.


## *drag*.filter(*filter*) {#drag_filter}

[Source](https://github.com/d3/d3-drag/blob/main/src/drag.js) · If *filter* is specified, sets the event filter to the specified function and returns the drag behavior. If *filter* is not specified, returns the current filter, which defaults to:

```js
function filter(event) {
  return !event.ctrlKey && !event.button;
}
```

If the filter returns falsey, the initiating event is ignored and no drag gestures are started. Thus, the filter determines which input events are ignored; the default filter ignores mousedown events on secondary buttons, since those buttons are typically intended for other purposes, such as the context menu.

## *drag*.touchable(*touchable*) {#drag_touchable}

[Source](https://github.com/d3/d3-drag/blob/main/src/drag.js) · If *touchable* is specified, sets the touch support detector to the specified function and returns the drag behavior. If *touchable* is not specified, returns the current touch support detector, which defaults to:

```js
function touchable() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}
```

Touch event listeners are only registered if the detector returns truthy for the corresponding element when the drag behavior is [applied](#_drag). The default detector works well for most browsers that are capable of touch input, but not all; Chrome’s mobile device emulator, for example, fails detection.

## *drag*.subject(*subject*) {#drag_subject}

[Source](https://github.com/d3/d3-drag/blob/main/src/drag.js) · If *subject* is specified, sets the subject accessor to the specified object or function and returns the drag behavior. If *subject* is not specified, returns the current subject accessor, which defaults to:

```js
function subject(event, d) {
  return d == null ? {x: event.x, y: event.y} : d;
}
```

The *subject* of a drag gesture represents *the thing being dragged*. It is computed when an initiating input event is received, such as a mousedown or touchstart, immediately before the drag gesture starts. The subject is then exposed as *event*.subject on subsequent [drag events](#drag-events) for this gesture.

The default subject is the [datum](./d3-selection/joining.md#selection_datum) of the element in the originating selection (see [*drag*](#_drag)) that received the initiating input event; if this datum is undefined, an object representing the coordinates of the pointer is created. When dragging circle elements in SVG, the default subject is thus the datum of the circle being dragged. With [Canvas](https://html.spec.whatwg.org/multipage/scripting.html#the-canvas-element), the default subject is the canvas element’s datum (regardless of where on the canvas you click). In this case, a custom subject accessor would be more appropriate, such as one that picks the closest circle to the mouse within a given search *radius*:

```js
function subject(event) {
  let n = circles.length,
      i,
      dx,
      dy,
      d2,
      s2 = radius * radius,
      circle,
      subject;

  for (i = 0; i < n; ++i) {
    circle = circles[i];
    dx = event.x - circle.x;
    dy = event.y - circle.y;
    d2 = dx * dx + dy * dy;
    if (d2 < s2) subject = circle, s2 = d2;
  }

  return subject;
}
```

:::tip
If necessary, the above can be accelerated using [*quadtree*.find](./d3-quadtree.md#quadtree_find), [*simulation*.find](./d3-force/simulation.md#simulation_find) or [*delaunay*.find](./d3-delaunay/delaunay.md#delaunay_find).
:::

The returned subject should be an object that exposes `x` and `y` properties, so that the relative position of the subject and the pointer can be preserved during the drag gesture. If the subject is null or undefined, no drag gesture is started for this pointer; however, other starting touches may yet start drag gestures. See also [*drag*.filter](#drag_filter).

The subject of a drag gesture may not be changed after the gesture starts. The subject accessor is invoked with the same context and arguments as [*selection*.on](./d3-selection/events.md#selection_on) listeners: the current event (`event`) and datum `d`, with the `this` context as the current DOM element. During the evaluation of the subject accessor, `event` is a beforestart [drag event](#drag-events). Use *event*.sourceEvent to access the initiating input event and *event*.identifier to access the touch identifier. The *event*.x and *event*.y are relative to the [container](#drag_container), and are computed using [pointer](./d3-selection/events.md#pointer).

## *drag*.clickDistance(*distance*) {#drag_clickDistance}

[Source](https://github.com/d3/d3-drag/blob/main/src/drag.js) · If *distance* is specified, sets the maximum distance that the mouse can move between mousedown and mouseup that will trigger a subsequent click event. If at any point between mousedown and mouseup the mouse is greater than or equal to *distance* from its position on mousedown, the click event following mouseup will be suppressed. If *distance* is not specified, returns the current distance threshold, which defaults to zero. The distance threshold is measured in client coordinates ([*event*.clientX](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX) and [*event*.clientY](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY)).

## *drag*.on(*typenames*, *listener*) {#drag_on}

[Source](https://github.com/d3/d3-drag/blob/main/src/drag.js) · If *listener* is specified, sets the event *listener* for the specified *typenames* and returns the drag behavior. If an event listener was already registered for the same type and name, the existing listener is removed before the new listener is added. If *listener* is null, removes the current event listeners for the specified *typenames*, if any. If *listener* is not specified, returns the first currently-assigned listener matching the specified *typenames*, if any. When a specified event is dispatched, each *listener* will be invoked with the same context and arguments as [*selection*.on](./d3-selection/events.md#selection_on) listeners: the current event (`event`) and datum `d`, with the `this` context as the current DOM element.

The *typenames* is a string containing one or more *typename* separated by whitespace. Each *typename* is a *type*, optionally followed by a period (`.`) and a *name*, such as `drag.foo` and `drag.bar`; the name allows multiple listeners to be registered for the same *type*. The *type* must be one of the following:

* `start` - after a new pointer becomes active (on mousedown or touchstart).
* `drag` - after an active pointer moves (on mousemove or touchmove).
* `end` - after an active pointer becomes inactive (on mouseup, touchend or touchcancel).

See [*dispatch*.on](./d3-dispatch.md#dispatch_on) for more.

Changes to registered listeners via *drag*.on during a drag gesture *do not affect* the current drag gesture. Instead, you must use [*event*.on](#event_on), which also allows you to register temporary event listeners for the current drag gesture. **Separate events are dispatched for each active pointer** during a drag gesture. For example, if simultaneously dragging multiple subjects with multiple fingers, a start event is dispatched for each finger, even if both fingers start touching simultaneously. See [Drag Events](#drag-events) for more.

## dragDisable(*window*) {#dragDisable}

[Source](https://github.com/d3/d3-drag/blob/main/src/nodrag.js) · Prevents native drag-and-drop and text selection on the specified *window*. As an alternative to preventing the default action of mousedown events (see [#9](https://github.com/d3/d3-drag/issues/9)), this method prevents undesirable default actions following mousedown. In supported browsers, this means capturing dragstart and selectstart events, preventing the associated default actions, and immediately stopping their propagation. In browsers that do not support selection events, the user-select CSS property is set to none on the document element. This method is intended to be called on mousedown, followed by [dragEnable](#dragEnable) on mouseup.

## dragEnable(*window*, *noclick*) {#dragEnable}

[Source](https://github.com/d3/d3-drag/blob/main/src/nodrag.js) · Allows native drag-and-drop and text selection on the specified *window*; undoes the effect of [dragDisable](#dragDisable). This method is intended to be called on mouseup, preceded by [dragDisable](#dragDisable) on mousedown. If *noclick* is true, this method also temporarily suppresses click events. The suppression of click events expires after a zero-millisecond timeout, such that it only suppress the click event that would immediately follow the current mouseup event, if any.

## Drag events

When a [drag event listener](#drag_on) is invoked, it receives the current drag event as its first argument. The *event* object exposes several fields:

* `target` - the associated [drag behavior](#drag).
* `type` - the string “start”, “drag” or “end”; see [*drag*.on](#drag_on).
* `subject` - the drag subject, defined by [*drag*.subject](#drag_subject).
* `x` - the new *x*-coordinate of the subject; see [*drag*.container](#drag_container).
* `y` - the new y coordinate of the subject; see [*drag*.container](#drag_container).
* `dx` - the change in *x*-coordinate since the previous drag event.
* `dy` - the change in y coordinate since the previous drag event.
* `identifier` - the string “mouse”, or a numeric [touch identifier](https://www.w3.org/TR/touch-events/#widl-Touch-identifier).
* `active` - the number of currently active drag gestures (on start and end, not including this one).
* `sourceEvent` - the underlying input event, such as mousemove or touchmove.

The *event*.active field is useful for detecting the first start event and the last end event in a sequence of concurrent drag gestures: it is zero when the first drag gesture starts, and zero when the last drag gesture ends.

The *event* object also exposes the [*event*.on](#event_on) method.

This table describes how the drag behavior interprets native events:

| Event        | Listening Element | Drag Event | Default Prevented? |
| ------------ | ----------------- | ---------- | ------------------ |
| mousedown⁵   | selection         | start      | no¹                |
| mousemove²   | window¹           | drag       | yes                |
| mouseup²     | window¹           | end        | yes                |
| dragstart²   | window            | -          | yes                |
| selectstart² | window            | -          | yes                |
| click³       | window            | -          | yes                |
| touchstart   | selection         | start      | no⁴                |
| touchmove    | selection         | drag       | yes                |
| touchend     | selection         | end        | no⁴                |
| touchcancel  | selection         | end        | no⁴                |

The propagation of all consumed events is [immediately stopped](https://dom.spec.whatwg.org/#dom-event-stopimmediatepropagation). If you want to prevent some events from initiating a drag gesture, use [*drag*.filter](#drag_filter).

¹ Necessary to capture events outside an iframe; see [#9](https://github.com/d3/d3-drag/issues/9).
<br>² Only applies during an active, mouse-based gesture; see [#9](https://github.com/d3/d3-drag/issues/9).
<br>³ Only applies immediately after some mouse-based gestures; see [*drag*.clickDistance](#drag_clickDistance).
<br>⁴ Necessary to allow [click emulation](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW7) on touch input; see [#9](https://github.com/d3/d3-drag/issues/9).
<br>⁵ Ignored if within 500ms of a touch gesture ending; assumes [click emulation](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW7).

## *event*.on(*typenames*, *listener*) {#event_on}

[Source](https://github.com/d3/d3-drag/blob/main/src/event.js) · Equivalent to [*drag*.on](#drag_on), but only applies to the current drag gesture. Before the drag gesture starts, a [copy](./d3-dispatch.md#dispatch_copy) of the current drag [event listeners](#drag_on) is made. This copy is bound to the current drag gesture and modified by *event*.on. This is useful for temporary listeners that only receive events for the current drag gesture. For example, this start event listener registers temporary drag and end event listeners as closures:

```js
function started(event) {
  const circle = d3.select(this).classed("dragging", true);
  const dragged = (event, d) => circle.raise().attr("cx", d.x = event.x).attr("cy", d.y = event.y);
  const ended = () => circle.classed("dragging", false);
  event.on("drag", dragged).on("end", ended);
}
```

# docs/d3-dsv.md

# d3-dsv

This module provides a parser and formatter for delimiter-separated values, most commonly [comma-separated values](https://en.wikipedia.org/wiki/Comma-separated_values) (CSV) or tab-separated values (TSV). These tabular formats are popular with spreadsheet programs such as Microsoft Excel, and are often more space-efficient than JSON. This implementation is based on [RFC 4180](http://tools.ietf.org/html/rfc4180).

For example, to parse:

```js
d3.csvParse("foo,bar\n1,2") // [{foo: "1", bar: "2"}, columns: ["foo", "bar"]]
```
```js
d3.tsvParse("foo\tbar\n1\t2") // [{foo: "1", bar: "2"}, columns: ["foo", "bar"]]
```

To format:

```js
d3.csvFormat([{foo: "1", bar: "2"}]) // "foo,bar\n1,2"
```
```js
d3.tsvFormat([{foo: "1", bar: "2"}]) // "foo\tbar\n1\t2"
```

To use a different delimiter, such as “|” for pipe-separated values, use [d3.dsvFormat](#dsvFormat):

```js
d3.dsvFormat("|").parse("foo|bar\n1|2")) // [{foo: "1", bar: "2"}, columns: ["foo", "bar"]]
```

For easy loading of DSV files in a browser, see [d3-fetch](./d3-fetch.md)’s [d3.csv](./d3-fetch.md#csv), [d3.tsv](./d3-fetch.md#tsv) and [d3.dsv](./d3-fetch.md#dsv) methods.

## dsvFormat(*delimiter*) {#dsvFormat}

```js
const csv = d3.dsvFormat(",");
```

[Source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js) · Constructs a new DSV parser and formatter for the specified *delimiter*. The *delimiter* must be a single character (*i.e.*, a single 16-bit code unit); so, ASCII delimiters are fine, but emoji delimiters are not.

## *dsv*.parse(*string*, *row*) {#dsv_parse}

:::warning CAUTION
This method requires the unsafe-eval [content security policy](#content-security-policy).
:::

```js
d3.csvParse("foo,bar\n1,2") // [{foo: "1", bar: "2"}, columns: ["foo", "bar"]]
```

[Source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js) · Parses the specified *string*, which must be in the delimiter-separated values format with the appropriate delimiter, returning an array of objects representing the parsed rows.

Unlike [*dsv*.parseRows](#dsv_parseRows), this method requires that the first line of the DSV content contains a delimiter-separated list of column names; these column names become the attributes on the returned objects. For example, consider the following CSV file:

```
Year,Make,Model,Length
1997,Ford,E350,2.34
2000,Mercury,Cougar,2.38
```

The resulting JavaScript array is:

```js
[
  {"Year": "1997", "Make": "Ford", "Model": "E350", "Length": "2.34"},
  {"Year": "2000", "Make": "Mercury", "Model": "Cougar", "Length": "2.38"}
]
```

The returned array also exposes a `columns` property containing the column names in input order (in contrast to Object.keys, whose iteration order is arbitrary). For example:

```js
data.columns // ["Year", "Make", "Model", "Length"]
```

If the column names are not unique, only the last value is returned for each name; to access all values, use [*dsv*.parseRows](#dsv_parseRows) instead (see [example](https://observablehq.com/@d3/parse-csv-with-duplicate-column-names)).

If a *row* conversion function is not specified, field values are strings. For safety, there is no automatic conversion to numbers, dates, or other types. In some cases, JavaScript may coerce strings to numbers for you automatically (for example, using the `+` operator), but better is to specify a *row* conversion function. See [d3.autoType](#autoType) for a convenient *row* conversion function that infers and coerces common types like numbers and strings.

If a *row* conversion function is specified, the specified function is invoked for each row, being passed an object representing the current row (`d`), the index (`i`) starting at zero for the first non-header row, and the array of column names. If the returned value is null or undefined, the row is skipped and will be omitted from the array returned by *dsv*.parse; otherwise, the returned value defines the corresponding row object. For example:

```js
const data = d3.csvParse(string, (d) => {
  return {
    year: new Date(+d.Year, 0, 1), // lowercase and convert "Year" to Date
    make: d.Make, // lowercase
    model: d.Model, // lowercase
    length: +d.Length // lowercase and convert "Length" to number
  };
});
```

Note: using `+` or `Number` rather than [parseInt](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/parseInt) or [parseFloat](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/parseFloat) is typically faster, though more restrictive. For example, `"30px"` when coerced using `+` returns `NaN`, while parseInt and parseFloat return `30`.

## *dsv*.parseRows(*string*, *row*) {#dsv_parseRows}

```js
d3.csvParseRows("foo,bar\n1,2") // [["foo", "bar"], ["1", "2"]]
```

[Source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js) · Parses the specified *string*, which must be in the delimiter-separated values format with the appropriate delimiter, returning an array of arrays representing the parsed rows.

Unlike [*dsv*.parse](#dsv_parse), this method treats the header line as a standard row, and should be used whenever DSV content does not contain a header. Each row is represented as an array rather than an object. Rows may have variable length. For example, consider the following CSV file, which notably lacks a header line:

```
1997,Ford,E350,2.34
2000,Mercury,Cougar,2.38
```

The resulting JavaScript array is:

```js
[
  ["1997", "Ford", "E350", "2.34"],
  ["2000", "Mercury", "Cougar", "2.38"]
]
```

If a *row* conversion function is not specified, field values are strings. For safety, there is no automatic conversion to numbers, dates, or other types. In some cases, JavaScript may coerce strings to numbers for you automatically (for example, using the `+` operator), but better is to specify a *row* conversion function. See [d3.autoType](#autoType) for a convenient *row* conversion function that infers and coerces common types like numbers and strings.

If a *row* conversion function is specified, the specified function is invoked for each row, being passed an array representing the current row (`d`), the index (`i`) starting at zero for the first row, and the array of column names. If the returned value is null or undefined, the row is skipped and will be omitted from the array returned by *dsv*.parse; otherwise, the returned value defines the corresponding row object. For example:

```js
const data = d3.csvParseRows(string, (d, i) => {
  return {
    year: new Date(+d[0], 0, 1), // convert first column to Date
    make: d[1],
    model: d[2],
    length: +d[3] // convert fourth column to number
  };
});
```

In effect, *row* is similar to applying a [map](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map) and [filter](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter) operator to the returned rows.

## *dsv*.format(*rows*, *columns*) {#dsv_format}

```js
d3.csvFormat([{foo: "1", bar: "2"}]) // "foo,bar\n1,2"
```
```js
d3.csvFormat([{foo: "1", bar: "2"}], ["foo"]) // "foo\n1"
```

[Source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js) · Formats the specified array of object *rows* as delimiter-separated values, returning a string. This operation is the inverse of [*dsv*.parse](#dsv_parse). Each row will be separated by a newline (`\n`), and each column within each row will be separated by the delimiter (such as a comma, `,`). Values that contain either the delimiter, a double-quote (`"`) or a newline will be escaped using double-quotes.

If *columns* is not specified, the list of column names that forms the header row is determined by the union of all properties on all objects in *rows*; the order of columns is nondeterministic. If *columns* is specified, it is an array of strings representing the column names. For example:

```js
const string = d3.csvFormat(data, ["year", "make", "model", "length"]);
```

All fields on each row object will be coerced to strings. If the field value is null or undefined, the empty string is used. If the field value is a Date, the [ECMAScript date-time string format](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-date-time-string-format) (a subset of ISO 8601) is used: for example, dates at UTC midnight are formatted as `YYYY-MM-DD`. For more control over which and how fields are formatted, first map *rows* to an array of array of string, and then use [*dsv*.formatRows](#dsv_formatRows).

## *dsv*.formatBody(*rows*, *columns*) {#dsv_formatBody}

```js
d3.csvFormatBody([{foo: "1", bar: "2"}]) // "1,2"
```
```js
d3.csvFormatBody([{foo: "1", bar: "2"}], ["foo"]) // "1"
```

[Source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js) · Equivalent to [*dsv*.format](#dsv_format), but omits the header row. This is useful, for example, when appending rows to an existing file.

## *dsv*.formatRows(*rows*) {#dsv_formatRows}

```js
d3.csvFormatRows([["foo", "bar"], ["1", "2"]]) // "foo,bar\n1,2"
```

[Source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js) · Formats the specified array of array of string *rows* as delimiter-separated values, returning a string. This operation is the reverse of [*dsv*.parseRows](#dsv_parseRows). Each row will be separated by a newline (`\n`), and each column within each row will be separated by the delimiter (such as a comma, `,`). Values that contain either the delimiter, a double-quote (") or a newline will be escaped using double-quotes.

To convert an array of objects to an array of arrays while explicitly specifying the columns, use [*array*.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). For example:

```js
const string = d3.csvFormatRows(data.map((d, i) => {
  return [
    d.year.getUTCFullYear(), // Assuming d.year is a Date object.
    d.make,
    d.model,
    d.length
  ];
}));
```

If you like, you can also [*array*.concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) this result with an array of column names to generate the first row:

```js
const string = d3.csvFormatRows([[
    "year",
    "make",
    "model",
    "length"
  ]].concat(data.map((d, i) => {
  return [
    d.year.getUTCFullYear(), // Assuming d.year is a Date object.
    d.make,
    d.model,
    d.length
  ];
})));
```

## *dsv*.formatRow(*row*) {#dsv_formatRow}

```js
d3.csvFormatRow(["foo", "bar"]) // "foo,bar"
```

[Source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js) · Formats a single array *row* of strings as delimiter-separated values, returning a string. Each column within the row will be separated by the delimiter (such as a comma, `,`). Values that contain either the delimiter, a double-quote (") or a newline will be escaped using double-quotes.

## *dsv*.formatValue(*value*) {#dsv_formatValue}

```js
d3.csvFormatValue("foo") // "foo"
```

[Source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js) · Format a single *value* or string as a delimiter-separated value, returning a string. A value that contains either the delimiter, a double-quote (") or a newline will be escaped using double-quotes.

## csvParse(*string*, *row*) {#csvParse}

Equivalent to [`d3.dsvFormat(",").parse`](#dsv_parse).

## csvParseRows(*string*, *row*) {#csvParseRows}

Equivalent to [`d3.dsvFormat(",").parseRows`](#dsv_parseRows).

## csvFormat(*rows*, *columns*) {#csvFormat}

Equivalent to [`d3.dsvFormat(",").format`](#dsv_format).

## csvFormatBody(*rows*, *columns*) {#csvFormatBody}

Equivalent to [`d3.dsvFormat(",").formatBody`](#dsv_formatBody).

## csvFormatRows(*rows*) {#csvFormatRows}

Equivalent to [`d3.dsvFormat(",").formatRows`](#dsv_formatRows).

## csvFormatRow(*row*) {#csvFormatRow}

Equivalent to [`d3.dsvFormat(",").formatRow`](#dsv_formatRow).

## csvFormatValue(*value*) {#csvFormatValue}

Equivalent to [`d3.dsvFormat(",").formatValue`](#dsv_formatValue).

## tsvParse(*string*, *row*) {#tsvParse}

Equivalent to [`d3.dsvFormat("\t").parse`](#dsv_parse).

## tsvParseRows(*string*, *row*) {#tsvParseRows}

Equivalent to [`d3.dsvFormat("\t").parseRows`](#dsv_parseRows).

## tsvFormat(*rows*, *columns*) {#tsvFormat}

Equivalent to [`d3.dsvFormat("\t").format`](#dsv_format).

## tsvFormatBody(*rows*, *columns*) {#tsvFormatBody}

Equivalent to [`d3.dsvFormat("\t").formatBody`](#dsv_formatBody).

## tsvFormatRows(*rows*) {#tsvFormatRows}

Equivalent to [`d3.dsvFormat("\t").formatRows`](#dsv_formatRows).

## tsvFormatRow(*row*) {#tsvFormatRow}

Equivalent to [`d3.dsvFormat("\t").formatRow`](#dsv_formatRow).

## tsvFormatValue(*value*) {#tsvFormatValue}

Equivalent to [`d3.dsvFormat("\t").formatValue`](#dsv_formatValue).

## autoType(*object*) {#autoType}

[Source](https://github.com/d3/d3-dsv/blob/main/src/autoType.js) · Given an *object* (or array) representing a parsed row, infers the types of values on the *object* and coerces them accordingly, returning the mutated *object*. This function is intended to be used as a *row* accessor function in conjunction with [*dsv*.parse](#dsv_parse) and [*dsv*.parseRows](#dsv_parseRows). For example, consider the following CSV file:

```
Year,Make,Model,Length
1997,Ford,E350,2.34
2000,Mercury,Cougar,2.38
```

When used with [d3.csvParse](#csvParse),

```js
d3.csvParse(string, d3.autoType)
```

the resulting JavaScript array is:

```js
[
  {"Year": 1997, "Make": "Ford", "Model": "E350", "Length": 2.34},
  {"Year": 2000, "Make": "Mercury", "Model": "Cougar", "Length": 2.38}
]
```

Type inference works as follows. For each *value* in the given *object*, the [trimmed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim) value is computed; the value is then re-assigned as follows:

1. If empty, then `null`.
1. If exactly `"true"`, then `true`.
1. If exactly `"false"`, then `false`.
1. If exactly `"NaN"`, then `NaN`.
1. Otherwise, if [coercible to a number](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-tonumber-applied-to-the-string-type), then a number.
1. Otherwise, if a [date-only or date-time string](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-date-time-string-format), then a Date.
1. Otherwise, a string (the original untrimmed value).

Values with leading zeroes may be coerced to numbers; for example `"08904"` coerces to `8904`. However, extra characters such as commas or units (*e.g.*, `"$1.00"`, `"(123)"`, `"1,234"` or `"32px"`) will prevent number coercion, resulting in a string.

Date strings must be in ECMAScript’s subset of the [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601). When a date-only string such as YYYY-MM-DD is specified, the inferred time is midnight UTC; however, if a date-time string such as YYYY-MM-DDTHH:MM is specified without a time zone, it is assumed to be local time.

Automatic type inference is primarily intended to provide safe, predictable behavior in conjunction with [*dsv*.format](#dsv_format) and [*dsv*.formatRows](#dsv_formatRows) for common JavaScript types. If you need different behavior, you should implement your own row accessor function.

For more, see [the d3.autoType notebook](https://observablehq.com/@d3/d3-autotype).

## Content security policy

If a [content security policy](http://www.w3.org/TR/CSP/) is in place, note that [*dsv*.parse](#dsv_parse) requires `unsafe-eval` in the `script-src` directive, due to the (safe) use of dynamic code generation for fast parsing. (See [source](https://github.com/d3/d3-dsv/blob/main/src/dsv.js).) Alternatively, use [*dsv*.parseRows](#dsv_parseRows).

## Byte-order marks

DSV files sometimes begin with a [byte order mark (BOM)](https://en.wikipedia.org/wiki/Byte_order_mark); saving a spreadsheet in CSV UTF-8 format from Microsoft Excel, for example, will include a BOM. On the web this is not usually a problem because the [UTF-8 decode algorithm](https://encoding.spec.whatwg.org/#utf-8-decode) specified in the Encoding standard removes the BOM. Node.js, on the other hand, [does not remove the BOM](https://github.com/nodejs/node-v0.x-archive/issues/1918) when decoding UTF-8.

If the BOM is not removed, the first character of the text is a zero-width non-breaking space. So if a CSV file with a BOM is parsed by [d3.csvParse](#csvParse), the first column’s name will begin with a zero-width non-breaking space. This can be hard to spot since this character is usually invisible when printed.

To remove the BOM before parsing, consider using [strip-bom](https://www.npmjs.com/package/strip-bom).

# docs/d3-ease.md

<script setup>

import * as d3 from "d3";
import {ref} from "vue";
import ExampleEase from "./components/ExampleEase.vue";

const amplitude = ref(1);
const exponent = ref(2);
const period = ref(0.3);
const overshoot = ref(1.7);

</script>

# d3-ease

[Examples](https://observablehq.com/@d3/easing) · *Easing* is a method of distorting time to control apparent motion in animation. It is most commonly used for [slow-in, slow-out](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation#Slow_in_and_slow_out). By easing time, [animated transitions](./d3-transition.md) are smoother and exhibit more plausible motion.

The easing types in this module implement the [ease method](#_ease) which takes a normalized time *t* and returns the corresponding “eased” time *tʹ*. Both the normalized time and the eased time are typically in the range [0,1], where 0 represents the start of the animation and 1 represents the end; some easing types, such as [easeElastic](#easeElastic), may return eased times slightly outside this range. A good easing type should return 0 if *t* = 0 and 1 if *t* = 1.

These easing types are largely based on work by [Robert Penner](http://robertpenner.com/easing/).

## *ease*(*t*) {#_ease}

Given the specified normalized time *t*, typically in the range [0,1], returns the “eased” time *tʹ*, also typically in [0,1]. 0 represents the start of the animation and 1 represents the end. A good implementation returns 0 if *t* = 0 and 1 if *t* = 1. For example, to apply [easeCubic](#easeCubic) easing:

```js
const te = d3.easeCubic(t);
```

To apply custom [elastic](#easeElastic) easing, create your easing function before the animation starts:

```js
const ease = d3.easeElastic.period(0.4);
```

Then during the animation, apply the easing function:

```js
const te = ease(t);
```

See also [*transition*.ease](./d3-transition/timing.md#transition_ease).

## easeLinear {#easeLinear}

<ExampleEase :eases='[{y: d3.easeLinear}]' />

[Source](https://github.com/d3/d3-ease/blob/main/src/linear.js) · Linear easing; the identity function; *linear*(*t*) returns *t*.

## easePoly {#easePoly}

[Source](https://github.com/d3/d3-ease/blob/main/src/poly.js) · Alias for [easePolyInOut](#easePolyInOut).

### easePolyIn {#easePolyIn}

<ExampleEase label="exponent" :eases='[0.5, 1, 1.5, 2, 3, 4].map((e) => ({y: d3.easePolyIn.exponent(e), stroke: e}))' />

Polynomial easing; raises *t* to the specified [exponent](#easePoly_exponent). If the exponent is not specified, it defaults to 3, equivalent to [easeCubicIn](#easeCubicIn).

### easePolyOut {#easePolyOut}

<ExampleEase label="exponent" :eases='[0.5, 1, 1.5, 2, 3, 4].map((e) => ({y: d3.easePolyOut.exponent(e), stroke: e}))' />

Reverse polynomial easing; equivalent to 1 - [easePolyIn](#easePolyIn)(1 - *t*). If the exponent is not specified, it defaults to 3, equivalent to [easeCubicOut](#easeCubicOut).

### easePolyInOut {#easePolyInOut}

<ExampleEase label="exponent" :eases='[0.5, 1, 1.5, 2, 3, 4].map((e) => ({y: d3.easePolyInOut.exponent(e), stroke: e}))' />

Symmetric polynomial easing; scales [easePolyIn](#easePolyIn) for *t* in 0–0.5 and [easePolyOut](#easePolyOut) for *t* in 0.5–1. If the exponent is not specified, it defaults to 3, equivalent to [easeCubic](#easeCubic).

### easePoly.exponent(*e*) {#easePoly_exponent}

<p>
  <label class="label-input">
    <span>Exponent:</span>
    <input type="range" v-model.number="exponent" min="1" max="8" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{exponent.toFixed(2)}}</span>
  </label>
</p>

<ExampleEase label="exponent" :eases='[{y: d3.easePolyInOut.exponent(exponent)}]' />

Returns a new polynomial easing with the specified exponent *e*. For example, to create equivalents of [easeLinear](#easeLinear), [easeQuad](#easeQuad), and [easeCubic](#easeCubic):

```js
const linear = d3.easePoly.exponent(1);
const quad = d3.easePoly.exponent(2);
const cubic = d3.easePoly.exponent(3);
```

## easeQuad {#easeQuad}

[Source](https://github.com/d3/d3-ease/blob/main/src/quad.js) · Alias for [easeQuadInOut](#easeQuadInOut).

### easeQuadIn {#easeQuadIn}

<ExampleEase label="exponent" :eases='[{y: d3.easeQuadIn}]' />

Quadratic easing; equivalent to [easePolyIn](#easePolyIn).[exponent](#easePoly_exponent)(2).

### easeQuadOut {#easeQuadOut}

<ExampleEase label="exponent" :eases='[{y: d3.easeQuadOut}]' />

Reverse quadratic easing; equivalent to 1 - [easeQuadIn](#easeQuadIn)(1 - *t*). Also equivalent to [easePolyOut](#easePolyOut).[exponent](#easePoly_exponent)(2).

### easeQuadInOut {#easeQuadInOut}

<ExampleEase label="exponent" :eases='[{y: d3.easeQuadInOut}]' />

Symmetric quadratic easing; scales [easeQuadIn](#easeQuadIn) for *t* in 0–0.5 and [easeQuadOut](#easeQuadOut) for *t* in 0.5–1. Also equivalent to [easePoly](#easePoly).[exponent](#easePoly_exponent)(2).

## easeCubic {#easeCubic}

[Source](https://github.com/d3/d3-ease/blob/main/src/cubic.js) · Alias for [easeCubicInOut](#easeCubicInOut).

### easeCubicIn {#easeCubicIn}

<ExampleEase :eases='[{y: d3.easeCubicIn}]' />

Cubic easing; equivalent to [easePolyIn](#easePolyIn).[exponent](#easePoly_exponent)(3).

### easeCubicOut {#easeCubicOut}

<ExampleEase :eases='[{y: d3.easeCubicOut}]' />

Reverse cubic easing; equivalent to 1 - [easeCubicIn](#easeCubicIn)(1 - *t*). Also equivalent to [easePolyOut](#easePolyOut).[exponent](#easePoly_exponent)(3).

### easeCubicInOut {#easeCubicInOut}

<ExampleEase :eases='[{y: d3.easeCubicInOut}]' />

Symmetric cubic easing; scales [easeCubicIn](#easeCubicIn) for *t* in 0–0.5 and [easeCubicOut](#easeCubicOut) for *t* in 0.5–1. Also equivalent to [easePoly](#easePoly).[exponent](#easePoly_exponent)(3).

## easeSin {#easeSin}

[Source](https://github.com/d3/d3-ease/blob/main/src/sin.js) · Alias for [easeSinInOut](#easeSinInOut).

### easeSinIn {#easeSinIn}

<ExampleEase :eases='[{y: d3.easeSinIn}]' />

Sinusoidal easing; returns sin(*t*).

### easeSinOut {#easeSinOut}

<ExampleEase :eases='[{y: d3.easeSinOut}]' />

Reverse sinusoidal easing; equivalent to 1 - [easeSinIn](#easeSinIn)(1 - *t*).

### easeSinInOut {#easeSinInOut}

<ExampleEase :eases='[{y: d3.easeSinInOut}]' />

Symmetric sinusoidal easing; scales [easeSinIn](#easeSinIn) for *t* in 0–0.5 and [easeSinOut](#easeSinOut) for *t* in 0.5–1.

## easeExp {#easeExp}

[Source](https://github.com/d3/d3-ease/blob/main/src/exp.js) · Alias for [easeExpInOut](#easeExpInOut).

### easeExpIn {#easeExpIn}

<ExampleEase :eases='[{y: d3.easeExpIn}]' />

Exponential easing; raises 2 to the exponent 10 × (*t* - 1).

### easeExpOut {#easeExpOut}

<ExampleEase :eases='[{y: d3.easeExpOut}]' />

Reverse exponential easing; equivalent to 1 - [easeExpIn](#easeExpIn)(1 - *t*).

### easeExpInOut {#easeExpInOut}

<ExampleEase :eases='[{y: d3.easeExpInOut}]' />

Symmetric exponential easing; scales [easeExpIn](#easeExpIn) for *t* in 0–0.5 and [easeExpOut](#easeExpOut) for *t* in 0.5–1.

## easeCircle {#easeCircle}

[Source](https://github.com/d3/d3-ease/blob/main/src/circle.js) · Alias for [easeCircleInOut](#easeCircleInOut).

### easeCircleIn {#easeCircleIn}

<ExampleEase :eases='[{y: d3.easeCircleIn}]' />

Circular easing.

### easeCircleOut {#easeCircleOut}

<ExampleEase :eases='[{y: d3.easeCircleOut}]' />

Reverse circular easing; equivalent to 1 - [easeCircleIn](#easeCircleIn)(1 - *t*).

### easeCircleInOut {#easeCircleInOut}

<ExampleEase :eases='[{y: d3.easeCircleInOut}]' />

Symmetric circular easing; scales [easeCircleIn](#easeCircleIn) for *t* in 0–0.5 and [easeCircleOut](#easeCircleOut) for *t* in 0.5–1.

## easeElastic {#easeElastic}

[Source](https://github.com/d3/d3-ease/blob/main/src/elastic.js) · Alias for [easeElasticOut](#easeElasticOut).

### easeElasticIn {#easeElasticIn}

<ExampleEase label="amplitude" :eases='[1, 1.1, 1.2, 1.3, 1.4, 1.5].map((a) => ({y: d3.easeElasticIn.amplitude(a), stroke: a}))' />

Elastic easing, like a rubber band. The [amplitude](#easeElastic_amplitude) and [period](#easeElastic_period) of the oscillation are configurable; if not specified, they default to 1 and 0.3, respectively.

### easeElasticOut {#easeElasticOut}

<ExampleEase label="amplitude" :eases='[1, 1.1, 1.2, 1.3, 1.4, 1.5].map((a) => ({y: d3.easeElasticOut.amplitude(a), stroke: a}))' />

Reverse elastic easing; equivalent to 1 - [elasticIn](#easeElasticIn)(1 - *t*).

### easeElasticInOut {#easeElasticInOut}

<ExampleEase label="amplitude" :eases='[1, 1.1, 1.2, 1.3, 1.4, 1.5].map((a) => ({y: d3.easeElasticInOut.amplitude(a), stroke: a}))' />

Symmetric elastic easing; scales [elasticIn](#easeElasticIn) for *t* in 0–0.5 and [elasticOut](#easeElasticOut) for *t* in 0.5–1.

### easeElastic.amplitude(*a*) {#easeElastic_amplitude}

<p>
  <label class="label-input">
    <span>Amplitude:</span>
    <input type="range" v-model.number="amplitude" min="1" max="4" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{amplitude.toFixed(2)}}</span>
  </label>
</p>

<ExampleEase label="amplitude" :eases='[{y: d3.easeElastic.amplitude(amplitude)}]' />

Returns a new elastic easing with the specified amplitude *a*. The amplitude *a* must be greater than or equal to 1.

### easeElastic.period(*p*) {#easeElastic_period}

<p>
  <label class="label-input">
    <span>Period:</span>
    <input type="range" v-model.number="period" min="0.1" max="1.5" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{period.toFixed(2)}}</span>
  </label>
</p>

<ExampleEase label="period" :eases='[{y: d3.easeElastic.period(period)}]' />

Returns a new elastic easing with the specified period *p*.

## easeBack {#easeBack}

[Source](https://github.com/d3/d3-ease/blob/main/src/back.js) · Alias for [easeBackInOut](#easeBackInOut).

### easeBackIn {#easeBackIn}

<ExampleEase label="overshoot" :eases='d3.ticks(0.5, 3, 6).map((a) => ({y: d3.easeBackIn.overshoot(a), stroke: a}))' />

[Anticipatory](https://en.wikipedia.org/wiki/12_basic_principles_of_animation#Anticipation) easing like a dancer bending her knees before jumping off the floor. The degree of [overshoot](#easeBack_overshoot) is configurable; if not specified, it defaults to 1.70158.

### easeBackOut {#easeBackOut}

<ExampleEase label="overshoot" :eases='d3.ticks(0.5, 3, 6).map((a) => ({y: d3.easeBackOut.overshoot(a), stroke: a}))' />

Reverse anticipatory easing; equivalent to 1 - [easeBackIn](#easeBackIn)(1 - *t*).

### easeBackInOut {#easeBackInOut}

<ExampleEase label="overshoot" :eases='d3.ticks(0.5, 3, 6).map((a) => ({y: d3.easeBackInOut.overshoot(a), stroke: a}))' />

Symmetric anticipatory easing; scales [easeBackIn](#easeBackIn) for *t* in 0–0.5 and [easeBackOut](#easeBackOut) for *t* in 0.5–1.

### easeBack.overshoot(*s*) {#easeBack_overshoot}

<p>
  <label class="label-input">
    <span>Overshoot:</span>
    <input type="range" v-model.number="overshoot" min="0" max="5" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{overshoot.toFixed(2)}}</span>
  </label>
</p>

<ExampleEase label="overshoot" :eases='[{y: d3.easeBack.overshoot(overshoot)}]' />

Returns a new back easing with the specified overshoot *s*.

## easeBounce {#easeBounce}

[Source](https://github.com/d3/d3-ease/blob/main/src/bounce.js) · Alias for [easeBounceOut](#easeBounceOut).

### easeBounceIn {#easeBounceIn}

<ExampleEase :eases='[{y: d3.easeBounceIn}]' />

Bounce easing, like a rubber ball.

### easeBounceOut {#easeBounceOut}

<ExampleEase :eases='[{y: d3.easeBounceOut}]' />

Reverse bounce easing; equivalent to 1 - [easeBounceIn](#easeBounceIn)(1 - *t*).

### easeBounceInOut {#easeBounceInOut}

<ExampleEase :eases='[{y: d3.easeBounceInOut}]' />

Symmetric bounce easing; scales [easeBounceIn](#easeBounceIn) for *t* in 0–0.5 and [easeBounceOut](#easeBounceOut) for *t* in 0.5–1.

# docs/d3-fetch.md

# d3-fetch

This module provides convenient parsing on top of [Fetch](https://fetch.spec.whatwg.org/). For example, to load a text file:

```js
const text = await d3.text("hello-world.txt"); // "Hello, world!"
```

To load and parse a CSV file:

```js
const data = await d3.csv("hello-world.csv"); // [{"Hello": "world"}, …]
```

This module has built-in support for parsing [JSON](#json), [CSV](#csv), and [TSV](#tsv). You can parse additional formats by using [text](#text) directly. (This module replaced [d3-request](https://github.com/d3/d3-request).)

## blob(*input*, *init*) {#blob}

```js
const blob = await d3.blob("example.db");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/blob.js) · Fetches the binary file at the specified *input* URL as a Blob. If *init* is specified, it is passed along to the underlying call to [fetch](https://fetch.spec.whatwg.org/#fetch-method); see [RequestInit](https://fetch.spec.whatwg.org/#requestinit) for allowed fields.

## buffer(*input*, *init*) {#buffer}

```js
const buffer = await d3.buffer("example.db");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/buffer.js) · Fetches the binary file at the specified *input* URL as an ArrayBuffer. If *init* is specified, it is passed along to the underlying call to [fetch](https://fetch.spec.whatwg.org/#fetch-method); see [RequestInit](https://fetch.spec.whatwg.org/#requestinit) for allowed fields.

## csv(*input*, *init*, *row*) {#csv}

```js
const data = await d3.csv("example.csv");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/dsv.js) · Equivalent to [d3.dsv](#dsv) with the comma character as the delimiter.

## dsv(*delimiter*, *input*, *init*, *row*) {#dsv}

```js
const data = await d3.dsv(",", "example.csv");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/dsv.js) · Fetches the [DSV](./d3-dsv.md) file at the specified *input* URL. If *init* is specified, it is passed along to the underlying call to [fetch](https://fetch.spec.whatwg.org/#fetch-method); see [RequestInit](https://fetch.spec.whatwg.org/#requestinit) for allowed fields. An optional *row* conversion function may be specified to map and filter row objects to a more-specific representation; see [*dsv*.parse](./d3-dsv.md#dsv_parse) for details. For example:

```js
const data = await d3.dsv(",", "example.csv", (d) => {
  return {
    year: new Date(+d.Year, 0, 1), // convert "Year" column to Date
    make: d.Make,
    model: d.Model,
    length: +d.Length // convert "Length" column to number
  };
});
```

If only one of *init* and *row* is specified, it is interpreted as the *row* conversion function if it is a function, and otherwise an *init* object. See also [d3.csv](#csv) and [d3.tsv](#tsv).

## html(*input*, *init*) {#html}

```js
const document = await d3.html("example.html");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/xml.js) · Fetches the file at the specified *input* URL as [text](#text) and then [parses it](https://developer.mozilla.org/docs/Web/API/DOMParser) as HTML. If *init* is specified, it is passed along to the underlying call to [fetch](https://fetch.spec.whatwg.org/#fetch-method); see [RequestInit](https://fetch.spec.whatwg.org/#requestinit) for allowed fields.

## image(*input*, *init*) {#image}

```js
const image = await d3.image("example.png");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/image.js) · Fetches the image at the specified *input* URL. If *init* is specified, sets any additional properties on the image before loading. For example, to enable an anonymous [cross-origin request](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image):

```js
const image = await d3.image("https://example.com/image.png", {crossOrigin: "anonymous"});
```

## json(*input*, *init*) {#json}

```js
const data = await d3.json("example.json");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/json.js) · Fetches the [JSON](http://json.org) file at the specified *input* URL. If *init* is specified, it is passed along to the underlying call to [fetch](https://fetch.spec.whatwg.org/#fetch-method); see [RequestInit](https://fetch.spec.whatwg.org/#requestinit) for allowed fields. If the server returns a status code of [204 No Content](https://developer.mozilla.org/docs/Web/HTTP/Status/204) or [205 Reset Content](https://developer.mozilla.org/docs/Web/HTTP/Status/205), the promise resolves to `undefined`.

## svg(*input*, *init*) {#svg}

```js
const document = await d3.svg("example.svg");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/xml.js) · Fetches the file at the specified *input* URL as [text](#text) and then [parses it](https://developer.mozilla.org/docs/Web/API/DOMParser) as SVG. If *init* is specified, it is passed along to the underlying call to [fetch](https://fetch.spec.whatwg.org/#fetch-method); see [RequestInit](https://fetch.spec.whatwg.org/#requestinit) for allowed fields.

## text(*input*, *init*) {#text}

```js
const text = await d3.text("example.txt");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/text.js) · Fetches the text file at the specified *input* URL. If *init* is specified, it is passed along to the underlying call to [fetch](https://fetch.spec.whatwg.org/#fetch-method); see [RequestInit](https://fetch.spec.whatwg.org/#requestinit) for allowed fields.

## tsv(input, init, row) {#tsv}

```js
const data = await d3.tsv("example.tsv");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/dsv.js) · Equivalent to [d3.dsv](#dsv) with the tab character as the delimiter.

## xml(*input*, *init*) {#xml}

```js
const document = await d3.xml("example.xml");
```

[Source](https://github.com/d3/d3-fetch/blob/main/src/xml.js) · Fetches the file at the specified *input* URL as [text](#text) and then [parses it](https://developer.mozilla.org/docs/Web/API/DOMParser) as XML. If *init* is specified, it is passed along to the underlying call to [fetch](https://fetch.spec.whatwg.org/#fetch-method); see [RequestInit](https://fetch.spec.whatwg.org/#requestinit) for allowed fields.

# docs/d3-force.md

<script setup>

import ExampleDisjointForce from "./components/ExampleDisjointForce.vue";

</script>

# d3-force

<ExampleDisjointForce />

This module implements a [velocity Verlet](https://en.wikipedia.org/wiki/Verlet_integration) numerical integrator for simulating physical forces on particles. Force simulations can be used to visualize [networks](https://observablehq.com/@d3/force-directed-graph/2) and [hierarchies](https://observablehq.com/@d3/force-directed-tree), and to resolve [collisions](./d3-force/collide.md) as in [bubble charts](http://www.nytimes.com/interactive/2012/09/06/us/politics/convention-word-counts.html).

<!-- [<img alt="Force-Directed Graph" src="https://raw.githubusercontent.com/d3/d3-force/master/img/graph.png" width="420" height="219">](https://observablehq.com/@d3/force-directed-graph/2) -->

<!-- [<img alt="Force-Directed Tree" src="https://raw.githubusercontent.com/d3/d3-force/master/img/tree.png" width="420" height="219">](https://observablehq.com/@d3/force-directed-tree) -->

<!-- [<img alt="Collision Detection" src="https://raw.githubusercontent.com/d3/d3-force/master/img/collide.png" width="420" height="219">](https://observablehq.com/@d3/collision-detection) -->

<!-- You can even use it as a rudimentary physics engine, say to simulate cloth: -->

<!-- [<img alt="Force-Directed Lattice" src="https://raw.githubusercontent.com/d3/d3-force/master/img/lattice.png" width="480" height="250">](https://observablehq.com/@d3/force-directed-lattice) -->

To use this module, create a [simulation](./d3-force/simulation.md) for an array of [nodes](./d3-force/simulation.md#simulation_nodes) and apply the desired [forces](./d3-force/simulation.md#simulation_force). Then [listen](./d3-force/simulation.md#simulation_on) for tick events to render the nodes as they update in your preferred graphics system, such as Canvas or SVG.

See one of:

* [Force simulations](./d3-force/simulation.md)
* [Center force](./d3-force/center.md)
* [Collide force](./d3-force/collide.md)
* [Link force](./d3-force/link.md)
* [Many-body force](./d3-force/many-body.md)
* [Position forces](./d3-force/position.md)

# docs/d3-force/center.md

# Center force

The center force translates nodes uniformly so that the mean position of all nodes (the center of mass if all nodes have equal weight) is at the given position ⟨[*x*](#center_x),[*y*](#center_y)⟩. This force modifies the positions of nodes on each application; it does not modify velocities, as doing so would typically cause the nodes to overshoot and oscillate around the desired center. This force helps keep nodes in the center of the viewport, and unlike the [position forces](./position.md), it does not distort their relative positions.

## forceCenter(*x*, *y*) {#forceCenter}

[Source](https://github.com/d3/d3-force/blob/main/src/center.js) · Creates a new center force with the specified [*x*-](#center_x) and [*y*-](#center_y) coordinates. If *x* and *y* are not specified, they default to ⟨0,0⟩.

```js
const center = d3.forceCenter(width / 2, height / 2);
```

## *center*.x(*x*) {#center_x}

[Source](https://github.com/d3/d3-force/blob/main/src/center.js) · If *x* is specified, sets the *x*-coordinate of the centering position to the specified number and returns this force. If *x* is not specified, returns the current *x*-coordinate, which defaults to zero.

## *center*.y(*y*) {#center_y}

[Source](https://github.com/d3/d3-force/blob/main/src/center.js) · If *y* is specified, sets the y coordinate of the centering position to the specified number and returns this force. If *y* is not specified, returns the current y coordinate, which defaults to zero.

## *center*.strength(*strength*) {#center_strength}

[Examples](https://observablehq.com/@d3/forcecenter-strength) · [Source](https://github.com/d3/d3-force/blob/main/src/center.js) · If *strength* is specified, sets the center force’s strength. A reduced strength of e.g. 0.05 softens the movements on interactive graphs in which new nodes enter or exit the graph. If *strength* is not specified, returns the force’s current strength, which defaults to 1.

# docs/d3-force/collide.md

<script setup>

import ExampleCollideForce from "../components/ExampleCollideForce.vue";

</script>

# Collide force

<ExampleCollideForce />

The collide force treats nodes as circles with a given [radius](#collide_radius), rather than points, and prevents nodes from overlapping. More formally, two nodes *a* and *b* are separated so that the distance between *a* and *b* is at least *radius*(*a*) + *radius*(*b*). To reduce jitter, this is by default a “soft” constraint with a configurable [strength](#collide_strength) and [iteration count](#collide_iterations).

## forceCollide(*radius*) {#forceCollide}

[Source](https://github.com/d3/d3-force/blob/main/src/collide.js) · Creates a new circle collide force with the specified [*radius*](#collide_radius). If *radius* is not specified, it defaults to the constant one for all nodes.

```js
const collide = d3.forceCollide((d) => d.r);
```

## *collide*.radius(*radius*) {#collide_radius}

[Source](https://github.com/d3/d3-force/blob/main/src/collide.js) · If *radius* is specified, sets the radius accessor to the specified number or function, re-evaluates the radius accessor for each node, and returns this force. If *radius* is not specified, returns the current radius accessor, which defaults to:

```js
function radius() {
  return 1;
}
```

The radius accessor is invoked for each [node](./simulation.md#simulation_nodes) in the simulation, being passed the *node* and its zero-based *index*. The resulting number is then stored internally, such that the radius of each node is only recomputed when the force is initialized or when this method is called with a new *radius*, and not on every application of the force.

## *collide*.strength(*strength*) {#collide_strength}

[Source](https://github.com/d3/d3-force/blob/main/src/collide.js) · If *strength* is specified, sets the force strength to the specified number in the range [0,1] and returns this force. If *strength* is not specified, returns the current strength which defaults to 1.

Overlapping nodes are resolved through iterative relaxation. For each node, the other nodes that are anticipated to overlap at the next tick (using the anticipated positions ⟨*x* + *vx*,*y* + *vy*⟩) are determined; the node’s velocity is then modified to push the node out of each overlapping node. The change in velocity is dampened by the force’s strength such that the resolution of simultaneous overlaps can be blended together to find a stable solution.

## *collide*.iterations(*iterations*) {#collide_iterations}

[Source](https://github.com/d3/d3-force/blob/main/src/collide.js) · If *iterations* is specified, sets the number of iterations per application to the specified number and returns this force. If *iterations* is not specified, returns the current iteration count which defaults to 1. Increasing the number of iterations greatly increases the rigidity of the constraint and avoids partial overlap of nodes, but also increases the runtime cost to evaluate the force.

# docs/d3-force/link.md

<script setup>

import ExampleLinkForce from "../components/ExampleLinkForce.vue";

</script>

# Link force

<ExampleLinkForce />

The link force pushes linked nodes together or apart according to the desired [link distance](#link_distance). The strength of the force is proportional to the difference between the linked nodes’ distance and the target distance, similar to a spring force.

## forceLink(*links*) {#forceLink}

[Source](https://github.com/d3/d3-force/blob/main/src/link.js) · Creates a new link force with the specified *links* and default parameters. If *links* is not specified, it defaults to the empty array.

:::warning
This function is impure; it may mutate the passed-in *links*. See [*link*.links](#link_links).
:::

```js
const link = d3.forceLink(links).id((d) => d.id);
```

## *link*.links(*links*) {#link_links}

[Source](https://github.com/d3/d3-force/blob/main/src/link.js) · If *links* is specified, sets the array of links associated with this force, recomputes the [distance](#link_distance) and [strength](#link_strength) parameters for each link, and returns this force. If *links* is not specified, returns the current array of links, which defaults to the empty array.

Each link is an object with the following properties:

* `source` - the link’s source node; see [*simulation*.nodes](./simulation.md#simulation_nodes)
* `target` - the link’s target node; see [*simulation*.nodes](./simulation.md#simulation_nodes)
* `index` - the zero-based index into *links*, assigned by this method

For convenience, a link’s source and target properties may be initialized using numeric or string identifiers rather than object references; see [*link*.id](#link_id).

:::warning
This function is impure; it may mutate the passed-in *links* when the link force is [initialized](./simulation.md#force_initialize) (or re-initialized, as when the nodes or links change). Any *link*.source or *link*.target property which is not an object is replaced by an object reference to the corresponding *node* with the given identifier.
:::

If the specified array of *links* is modified, such as when links are added to or removed from the simulation, this method must be called again with the new (or changed) array to notify the force of the change; the force does not make a defensive copy of the specified array.

## *link*.id(*id*) {#link_id}

[Source](https://github.com/d3/d3-force/blob/main/src/link.js) · If *id* is specified, sets the node id accessor to the specified function and returns this force. If *id* is not specified, returns the current node id accessor, which defaults to the numeric *node*.index:

```js
function id(d) {
  return d.index;
}
```

The default id accessor allows each link’s source and target to be specified as a zero-based index into the [nodes](./simulation.md#simulation_nodes) array. For example:

```js
const nodes = [
  {"id": "Alice"},
  {"id": "Bob"},
  {"id": "Carol"}
];

const links = [
  {"source": 0, "target": 1}, // Alice → Bob
  {"source": 1, "target": 2} // Bob → Carol
];
```

Now consider a different id accessor that returns a string:

```js
function id(d) {
  return d.id;
}
```

With this accessor, you can use named sources and targets:

```js
const nodes = [
  {"id": "Alice"},
  {"id": "Bob"},
  {"id": "Carol"}
];

const links = [
  {"source": "Alice", "target": "Bob"},
  {"source": "Bob", "target": "Carol"}
];
```

This is particularly useful when representing graphs in JSON, as JSON does not allow references. See [this example](https://observablehq.com/@d3/force-directed-graph/2).

The id accessor is invoked for each node whenever the force is initialized, as when the [nodes](./simulation.md#simulation_nodes) or [links](#link_links) change, being passed the node and its zero-based index.

## *link*.distance(*distance*) {#link_distance}

[Source](https://github.com/d3/d3-force/blob/main/src/link.js) · If *distance* is specified, sets the distance accessor to the specified number or function, re-evaluates the distance accessor for each link, and returns this force. If *distance* is not specified, returns the current distance accessor, which defaults to:

```js
function distance() {
  return 30;
}
```

The distance accessor is invoked for each [link](#link_links), being passed the *link* and its zero-based *index*. The resulting number is then stored internally, such that the distance of each link is only recomputed when the force is initialized or when this method is called with a new *distance*, and not on every application of the force.

## *link*.strength(*strength*) {#link_strength}

[Source](https://github.com/d3/d3-force/blob/main/src/link.js) · If *strength* is specified, sets the strength accessor to the specified number or function, re-evaluates the strength accessor for each link, and returns this force. If *strength* is not specified, returns the current strength accessor, which defaults to:

```js
function strength(link) {
  return 1 / Math.min(count(link.source), count(link.target));
}
```

Where *count*(*node*) is a function that returns the number of links with the given node as a source or target. This default was chosen because it automatically reduces the strength of links connected to heavily-connected nodes, improving stability.

The strength accessor is invoked for each [link](#link_links), being passed the *link* and its zero-based *index*. The resulting number is then stored internally, such that the strength of each link is only recomputed when the force is initialized or when this method is called with a new *strength*, and not on every application of the force.

## *link*.iterations(*iterations*) {#link_iterations}

[Source](https://github.com/d3/d3-force/blob/main/src/link.js) · If *iterations* is specified, sets the number of iterations per application to the specified number and returns this force. If *iterations* is not specified, returns the current iteration count which defaults to 1. Increasing the number of iterations greatly increases the rigidity of the constraint and is useful for [complex structures such as lattices](https://observablehq.com/@d3/force-directed-lattice), but also increases the runtime cost to evaluate the force.

# docs/d3-force/many-body.md

# Many-body force

The many-body (or *n*-body) force applies mutually amongst all [nodes](./simulation.md#simulation_nodes). It can be used to simulate gravity (attraction) if the [strength](#manyBody_strength) is positive, or electrostatic charge (repulsion) if the strength is negative. This implementation uses a quadtree and the [Barnes–Hut approximation](https://en.wikipedia.org/wiki/Barnes–Hut_simulation) to greatly improve performance; the accuracy can be customized using the [theta](#manyBody_theta) parameter.

Unlike the [link force](./link.md), which only affect two linked nodes, the charge force is global: every node affects every other node, even if they are on disconnected subgraphs.

## forceManyBody() {#forceManyBody}

[Source](https://github.com/d3/d3-force/blob/main/src/manyBody.js) · Creates a new many-body force with the default parameters.

```js
const manyBody = d3.forceManyBody().strength(-100);
```

## *manyBody*.strength(*strength*) {#manyBody_strength}

[Source](https://github.com/d3/d3-force/blob/main/src/manyBody.js) · If *strength* is specified, sets the strength accessor to the specified number or function, re-evaluates the strength accessor for each node, and returns this force. A positive value causes nodes to attract each other, similar to gravity, while a negative value causes nodes to repel each other, similar to electrostatic charge. If *strength* is not specified, returns the current strength accessor, which defaults to:

```js
function strength() {
  return -30;
}
```

The strength accessor is invoked for each [node](./simulation.md#simulation_nodes) in the simulation, being passed the *node* and its zero-based *index*. The resulting number is then stored internally, such that the strength of each node is only recomputed when the force is initialized or when this method is called with a new *strength*, and not on every application of the force.

## *manyBody*.theta(*theta*) {#manyBody_theta}

[Source](https://github.com/d3/d3-force/blob/main/src/manyBody.js) · If *theta* is specified, sets the Barnes–Hut approximation criterion to the specified number and returns this force. If *theta* is not specified, returns the current value, which defaults to 0.9.

To accelerate computation, this force implements the [Barnes–Hut approximation](http://en.wikipedia.org/wiki/Barnes–Hut_simulation) which takes O(*n* log *n*) per application where *n* is the number of [nodes](./simulation.md#simulation_nodes). For each application, a [quadtree](../d3-quadtree.md) stores the current node positions; then for each node, the combined force of all other nodes on the given node is computed. For a cluster of nodes that is far away, the charge force can be approximated by treating the cluster as a single, larger node. The *theta* parameter determines the accuracy of the approximation: if the ratio *w* / *l* of the width *w* of the quadtree cell to the distance *l* from the node to the cell’s center of mass is less than *theta*, all nodes in the given cell are treated as a single node rather than individually.

## *manyBody*.distanceMin(*distance*) {#manyBody_distanceMin}

[Source](https://github.com/d3/d3-force/blob/main/src/manyBody.js) · If *distance* is specified, sets the minimum distance between nodes over which this force is considered. If *distance* is not specified, returns the current minimum distance, which defaults to 1. A minimum distance establishes an upper bound on the strength of the force between two nearby nodes, avoiding instability. In particular, it avoids an infinitely-strong force if two nodes are exactly coincident; in this case, the direction of the force is random.

## *manyBody*.distanceMax(*distance*) {#manyBody_distanceMax}

[Source](https://github.com/d3/d3-force/blob/main/src/manyBody.js) · If *distance* is specified, sets the maximum distance between nodes over which this force is considered. If *distance* is not specified, returns the current maximum distance, which defaults to infinity. Specifying a finite maximum distance improves performance and produces a more localized layout.

# docs/d3-force/position.md

# Position forces

The [*x*](#forceX)- and [*y*](#forceY)-position forces push nodes towards a desired position along the given dimension with a configurable strength. The [*radial*](#forceRadial) force is similar, except it pushes nodes towards the closest point on a given circle. The strength of the force is proportional to the one-dimensional distance between the node’s position and the target position. While these forces can be used to position individual nodes, they are intended primarily for global forces that apply to all (or most) nodes.

## forceX(*x*) {#forceX}

[Source](https://github.com/d3/d3-force/blob/main/src/x.js) · Creates a new position force along the *x*-axis towards the given position [*x*](#x_x). If *x* is not specified, it defaults to 0.

```js
const x = d3.forceX(width / 2);
```

## *x*.strength(*strength*) {#x_strength}

[Source](https://github.com/d3/d3-force/blob/main/src/x.js) · If *strength* is specified, sets the strength accessor to the specified number or function, re-evaluates the strength accessor for each node, and returns this force. The *strength* determines how much to increment the node’s *x*-velocity: ([*x*](#x_x) - *node*.x) × *strength*. For example, a value of 0.1 indicates that the node should move a tenth of the way from its current *x*-position to the target *x*-position with each application. Higher values moves nodes more quickly to the target position, often at the expense of other forces or constraints. A value outside the range [0,1] is not recommended.

If *strength* is not specified, returns the current strength accessor, which defaults to:

```js
function strength() {
  return 0.1;
}
```

The strength accessor is invoked for each [node](./simulation.md#simulation_nodes) in the simulation, being passed the *node* and its zero-based *index*. The resulting number is then stored internally, such that the strength of each node is only recomputed when the force is initialized or when this method is called with a new *strength*, and not on every application of the force.

## *x*.x(*x*) {#x_x}

[Source](https://github.com/d3/d3-force/blob/main/src/x.js) · If *x* is specified, sets the *x*-coordinate accessor to the specified number or function, re-evaluates the *x*-accessor for each node, and returns this force. If *x* is not specified, returns the current *x*-accessor, which defaults to:

```js
function x() {
  return 0;
}
```

The *x*-accessor is invoked for each [node](./simulation.md#simulation_nodes) in the simulation, being passed the *node* and its zero-based *index*. The resulting number is then stored internally, such that the target *x*-coordinate of each node is only recomputed when the force is initialized or when this method is called with a new *x*, and not on every application of the force.

## forceY(*y*) {#forceY}

[Source](https://github.com/d3/d3-force/blob/main/src/y.js) · Creates a new position force along the *y*-axis towards the given position [*y*](#y_y). If *y* is not specified, it defaults to 0.

```js
const y = d3.forceY(height / 2);
```

## *y*.strength(*strength*) {#y_strength}

[Source](https://github.com/d3/d3-force/blob/main/src/y.js) · If *strength* is specified, sets the strength accessor to the specified number or function, re-evaluates the strength accessor for each node, and returns this force. The *strength* determines how much to increment the node’s *y*-velocity: ([*y*](#y_y) - *node*.y) × *strength*. For example, a value of 0.1 indicates that the node should move a tenth of the way from its current *y*-position to the target *y*-position with each application. Higher values moves nodes more quickly to the target position, often at the expense of other forces or constraints. A value outside the range [0,1] is not recommended.

If *strength* is not specified, returns the current strength accessor, which defaults to:

```js
function strength() {
  return 0.1;
}
```

The strength accessor is invoked for each [node](./simulation.md#simulation_nodes) in the simulation, being passed the *node* and its zero-based *index*. The resulting number is then stored internally, such that the strength of each node is only recomputed when the force is initialized or when this method is called with a new *strength*, and not on every application of the force.

## *y*.y(*y*) {#y_y}

[Source](https://github.com/d3/d3-force/blob/main/src/y.js) · If *y* is specified, sets the *y*-coordinate accessor to the specified number or function, re-evaluates the *y*-accessor for each node, and returns this force. If *y* is not specified, returns the current *y*-accessor, which defaults to:

```js
function y() {
  return 0;
}
```

The *y*-accessor is invoked for each [node](./simulation.md#simulation_nodes) in the simulation, being passed the *node* and its zero-based *index*. The resulting number is then stored internally, such that the target y coordinate of each node is only recomputed when the force is initialized or when this method is called with a new *y*, and not on every application of the force.

## forceRadial(*radius*, *x*, *y*) {#forceRadial}

[Source](https://github.com/d3/d3-force/blob/main/src/radial.js) · Creates a new position force towards a circle of the specified [*radius*](#radial_radius) centered at ⟨[*x*](#radial_x),[*y*](#radial_y)⟩. If *x* and *y* are not specified, they default to ⟨0,0⟩.

```js
const radial = d3.forceRadial(r, width / 2, height / 2);
```

## *radial*.strength(*strength*) {#radial_strength}

[Source](https://github.com/d3/d3-force/blob/main/src/radial.js) · If *strength* is specified, sets the strength accessor to the specified number or function, re-evaluates the strength accessor for each node, and returns this force. The *strength* determines how much to increment the node’s *x*- and *y*-velocity. For example, a value of 0.1 indicates that the node should move a tenth of the way from its current position to the closest point on the circle with each application. Higher values moves nodes more quickly to the target position, often at the expense of other forces or constraints. A value outside the range [0,1] is not recommended.

If *strength* is not specified, returns the current strength accessor, which defaults to:

```js
function strength() {
  return 0.1;
}
```

The strength accessor is invoked for each [node](./simulation.md#simulation_nodes) in the simulation, being passed the *node* and its zero-based *index*. The resulting number is then stored internally, such that the strength of each node is only recomputed when the force is initialized or when this method is called with a new *strength*, and not on every application of the force.

## *radial*.radius(*radius*) {#radial_radius}

[Source](https://github.com/d3/d3-force/blob/main/src/radial.js) · If *radius* is specified, sets the circle *radius* to the specified number or function, re-evaluates the *radius* accessor for each node, and returns this force. If *radius* is not specified, returns the current *radius* accessor.

The *radius* accessor is invoked for each [node](./simulation.md#simulation_nodes) in the simulation, being passed the *node* and its zero-based *index*. The resulting number is then stored internally, such that the target radius of each node is only recomputed when the force is initialized or when this method is called with a new *radius*, and not on every application of the force.

## *radial*.x(*x*) {#radial_x}

[Source](https://github.com/d3/d3-force/blob/main/src/radial.js) · If *x* is specified, sets the *x*-coordinate of the circle center to the specified number and returns this force. If *x* is not specified, returns the current *x*-coordinate of the center, which defaults to zero.

## *radial*.y(*y*) {#radial_y}

[Source](https://github.com/d3/d3-force/blob/main/src/radial.js) · If *y* is specified, sets the y coordinate of the circle center to the specified number and returns this force. If *y* is not specified, returns the current y coordinate of the center, which defaults to zero.

# docs/d3-force/simulation.md

# Force simulations

A force simulation implements a [velocity Verlet](https://en.wikipedia.org/wiki/Verlet_integration) numerical integrator for simulating physical forces on particles (nodes). The simulation assumes a constant unit time step Δ*t* = 1 for each step and a constant unit mass *m* = 1 for all particles. As a result, a force *F* acting on a particle is equivalent to a constant acceleration *a* over the time interval Δ*t*, and can be simulated simply by adding to the particle’s velocity, which is then added to the particle’s position.

## forceSimulation(*nodes*) {#forceSimulation}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · Creates a new simulation with the specified array of [*nodes*](#simulation_nodes) and no [forces](#simulation_force). If *nodes* is not specified, it defaults to the empty array.

:::warning
This function is impure; it mutates the passed-in *nodes*. See [*simulation*.nodes](#simulation_nodes).
:::

```js
const simulation = d3.forceSimulation(nodes);
```

The simulator [starts](#simulation_restart) automatically; use [*simulation*.on](#simulation_on) to listen for tick events as the simulation runs. If you wish to run the simulation manually instead, call [*simulation*.stop](#simulation_stop), and then call [*simulation*.tick](#simulation_tick) as desired.

## *simulation*.restart() {#simulation_restart}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · Restarts the simulation’s internal timer and returns the simulation. In conjunction with [*simulation*.alphaTarget](#simulation_alphaTarget) or [*simulation*.alpha](#simulation_alpha), this method can be used to “reheat” the simulation during interaction, such as when dragging a node, or to resume the simulation after temporarily pausing it with [*simulation*.stop](#simulation_stop).

## *simulation*.stop() {#simulation_stop}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · Stops the simulation’s internal timer, if it is running, and returns the simulation. If the timer is already stopped, this method does nothing. This method is useful for running the simulation manually; see [*simulation*.tick](#simulation_tick).

## *simulation*.tick(*iterations*) {#simulation_tick}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · Manually steps the simulation by the specified number of *iterations*, and returns the simulation. If *iterations* is not specified, it defaults to 1 (single step).

For each iteration, it increments the current [*alpha*](#simulation_alpha) by ([*alphaTarget*](#simulation_alphaTarget) - *alpha*) × [*alphaDecay*](#simulation_alphaDecay); then invokes each registered [force](#simulation_force), passing the new *alpha*; then decrements each [node](#simulation_nodes)’s velocity by *velocity* × [*velocityDecay*](#simulation_velocityDecay); lastly increments each node’s position by *velocity*.

This method does not dispatch [events](#simulation_on); events are only dispatched by the internal timer when the simulation is started automatically upon [creation](#forceSimulation) or by calling [*simulation*.restart](#simulation_restart). The natural number of ticks when the simulation is started is ⌈*log*([*alphaMin*](#simulation_alphaMin)) / *log*(1 - [*alphaDecay*](#simulation_alphaDecay))⌉; by default, this is 300.

This method can be used in conjunction with [*simulation*.stop](#simulation_stop) to compute a [static force layout](https://observablehq.com/@d3/static-force-directed-graph). For large graphs, static layouts should be computed [in a web worker](https://observablehq.com/@d3/force-directed-web-worker) to avoid freezing the user interface.

## *simulation*.nodes(*nodes*) {#simulation_nodes}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · If *nodes* is specified, sets the simulation’s nodes to the specified array of objects, initializing their positions and velocities if necessary, and then [re-initializes](#force_initialize) any bound [forces](#simulation_force); returns the simulation. If *nodes* is not specified, returns the simulation’s array of nodes as specified to the [constructor](#forceSimulation).

:::warning
This function is impure; it mutates the passed-in *nodes* to assign the index *node*.index, the position *node*.x & *node*.y, and the velocity *node*.vx & *node*.vy. The position and velocity are further updated as the simulation runs by [*simulation*.tick](#simulation_tick).
:::

Each *node* must be an object. The following properties are assigned by the simulation:

* `index` - the node’s zero-based index into *nodes*
* `x` - the node’s current *x*-position
* `y` - the node’s current *y*-position
* `vx` - the node’s current *x*-velocity
* `vy` - the node’s current *y*-velocity

The position ⟨*x*,*y*⟩ and velocity ⟨*vx*,*vy*⟩ may be subsequently modified by [forces](#custom-forces) and by the simulation. If either *vx* or *vy* is NaN, the velocity is initialized to ⟨0,0⟩. If either *x* or *y* is NaN, the position is initialized in a [phyllotaxis arrangement](https://observablehq.com/@d3/force-layout-phyllotaxis), so chosen to ensure a deterministic, uniform distribution.

To fix a node in a given position, you may specify two additional properties:

* `fx` - the node’s fixed *x*-position
* `fy` - the node’s fixed *y*-position

At the end of each [tick](#simulation_tick), after the application of any forces, a node with a defined *node*.fx has *node*.x reset to this value and *node*.vx set to zero; likewise, a node with a defined *node*.fy has *node*.y reset to this value and *node*.vy set to zero. To unfix a node that was previously fixed, set *node*.fx and *node*.fy to null, or delete these properties.

If the specified array of *nodes* is modified, such as when nodes are added to or removed from the simulation, this method must be called again with the new (or changed) array to notify the simulation and bound forces of the change; the simulation does not make a defensive copy of the specified array.

## *simulation*.alpha(*alpha*) {#simulation_alpha}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · *alpha* is roughly analogous to temperature in [simulated annealing](https://en.wikipedia.org/wiki/Simulated_annealing#Overview). It decreases over time as the simulation “cools down”. When *alpha* reaches *alphaMin*, the simulation stops; see [*simulation*.restart](#simulation_restart).

If *alpha* is specified, sets the current alpha to the specified number in the range [0,1] and returns this simulation. If *alpha* is not specified, returns the current alpha value, which defaults to 1.

## *simulation*.alphaMin(*min*) {#simulation_alphaMin}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · If *min* is specified, sets the minimum *alpha* to the specified number in the range [0,1] and returns this simulation. If *min* is not specified, returns the current minimum *alpha* value, which defaults to 0.001. The simulation’s internal timer stops when the current [*alpha*](#simulation_alpha) is less than the minimum *alpha*. The default [alpha decay rate](#simulation_alphaDecay) of ~0.0228 corresponds to 300 iterations.

## *simulation*.alphaDecay(*decay*) {#simulation_alphaDecay}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · If *decay* is specified, sets the [*alpha*](#simulation_alpha) decay rate to the specified number in the range [0,1] and returns this simulation. If *decay* is not specified, returns the current *alpha* decay rate, which defaults to 0.0228… = 1 - *pow*(0.001, 1 / 300) where 0.001 is the default [minimum *alpha*](#simulation_alphaMin).

The alpha decay rate determines how quickly the current alpha interpolates towards the desired [target *alpha*](#simulation_alphaTarget); since the default target *alpha* is zero, by default this controls how quickly the simulation cools. Higher decay rates cause the simulation to stabilize more quickly, but risk getting stuck in a local minimum; lower values cause the simulation to take longer to run, but typically converge on a better layout. To have the simulation run forever at the current *alpha*, set the *decay* rate to zero; alternatively, set a [target *alpha*](#simulation_alphaTarget) greater than the [minimum *alpha*](#simulation_alphaMin).

## *simulation*.alphaTarget(*target*) {#simulation_alphaTarget}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · If *target* is specified, sets the current target [*alpha*](#simulation_alpha) to the specified number in the range [0,1] and returns this simulation. If *target* is not specified, returns the current target alpha value, which defaults to 0.

## *simulation*.velocityDecay(*decay*) {#simulation_velocityDecay}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · If *decay* is specified, sets the velocity decay factor to the specified number in the range [0,1] and returns this simulation. If *decay* is not specified, returns the current velocity decay factor, which defaults to 0.4. The decay factor is akin to atmospheric friction; after the application of any forces during a [tick](#simulation_tick), each node’s velocity is multiplied by 1 - *decay*. As with lowering the [alpha decay rate](#simulation_alphaDecay), less velocity decay may converge on a better solution, but risks numerical instabilities and oscillation.

## *simulation*.force(*name*, *force*) {#simulation_force}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · If *force* is specified, assigns the [force](#custom-forces) for the specified *name* and returns this simulation. If *force* is not specified, returns the force with the specified name, or undefined if there is no such force. (By default, new simulations have no forces.) For example, to create a new simulation to layout a graph, you might say:

```js
const simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody())
    .force("link", d3.forceLink(links))
    .force("center", d3.forceCenter());
```

To remove the force with the given *name*, pass null as the *force*. For example, to remove the charge force:

```js
simulation.force("charge", null);
```

## *simulation*.find(*x*, *y*, *radius*) {#simulation_find}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · Returns the node closest to the position ⟨*x*,*y*⟩ with the given search *radius*. If *radius* is not specified, it defaults to infinity. If there is no node within the search area, returns undefined.

## *simulation*.randomSource(*source*) {#simulation_randomSource}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js "Source"))

If *source* is specified, sets the function used to generate random numbers; this should be a function that returns a number between 0 (inclusive) and 1 (exclusive). If *source* is not specified, returns this simulation’s current random source which defaults to a fixed-seed [linear congruential generator](https://en.wikipedia.org/wiki/Linear_congruential_generator). See also [*random*.source](../d3-random.md#random_source).

## *simulation*.on(*typenames*, *listener*) {#simulation_on}

[Source](https://github.com/d3/d3-force/blob/main/src/simulation.js) · If *listener* is specified, sets the event *listener* for the specified *typenames* and returns this simulation. If an event listener was already registered for the same type and name, the existing listener is removed before the new listener is added. If *listener* is null, removes the current event listeners for the specified *typenames*, if any. If *listener* is not specified, returns the first currently-assigned listener matching the specified *typenames*, if any. When a specified event is dispatched, each *listener* will be invoked with the `this` context as the simulation.

The *typenames* is a string containing one or more *typename* separated by whitespace. Each *typename* is a *type*, optionally followed by a period (`.`) and a *name*, such as `tick.foo` and `tick.bar`; the name allows multiple listeners to be registered for the same *type*. The *type* must be one of the following:

* `tick` - after each tick of the simulation’s internal timer.
* `end` - after the simulation’s timer stops when *alpha* < [*alphaMin*](#simulation_alphaMin).

Note that *tick* events are not dispatched when [*simulation*.tick](#simulation_tick) is called manually; events are only dispatched by the internal timer and are intended for interactive rendering of the simulation. To affect the simulation, register [forces](#simulation_force) instead of modifying nodes’ positions or velocities inside a tick event listener.

See [*dispatch*.on](../d3-dispatch.md#dispatch_on) for details.

## Custom forces

A *force* is a function that modifies nodes’ positions or velocities. It can simulate a physical force such as electrical charge or gravity, or it can resolve a geometric constraint such as keeping nodes within a bounding box or keeping linked nodes a fixed distance apart. For example, here is a force that moves nodes towards the origin:

```js
function force(alpha) {
  for (let i = 0, n = nodes.length, node, k = alpha * 0.1; i < n; ++i) {
    node = nodes[i];
    node.vx -= node.x * k;
    node.vy -= node.y * k;
  }
}
```

Forces typically read the node’s current position ⟨*x*,*y*⟩ and then mutate the node’s velocity ⟨*vx*,*vy*⟩. Forces may also “peek ahead” to the anticipated next position of the node, ⟨*x* + *vx*,*y* + *vy*⟩; this is necessary for resolving geometric constraints through [iterative relaxation](https://en.wikipedia.org/wiki/Relaxation_\(iterative_method\)). Forces may also modify the position directly, which is sometimes useful to avoid adding energy to the simulation, such as when recentering the simulation in the viewport.

### *force*(*alpha*) {#_force}

Applies this force, optionally observing the specified *alpha*. Typically, the force is applied to the array of nodes previously passed to [*force*.initialize](#force_initialize), however, some forces may apply to a subset of nodes, or behave differently. For example, [forceLink](./link.md) applies to the source and target of each link.

### *force*.initialize(*nodes*) {#force_initialize}

Supplies the array of *nodes* and *random* source to this force. This method is called when a force is bound to a simulation via [*simulation*.force](#simulation_force) and when the simulation’s nodes change via [*simulation*.nodes](#simulation_nodes). A force may perform necessary work during initialization, such as evaluating per-node parameters, to avoid repeatedly performing work during each application of the force.

# docs/d3-format.md

# d3-format

Ever noticed how sometimes JavaScript doesn’t display numbers the way you expect? Like, you tried to print tenths with a simple loop:

```js
for (let i = 0; i < 10; ++i) {
  console.log(0.1 * i);
}
```

And you got this:

```
0
0.1
0.2
0.30000000000000004
0.4
0.5
0.6000000000000001
0.7000000000000001
0.8
0.9
```

Welcome to [binary floating point](https://en.wikipedia.org/wiki/Double-precision_floating-point_format)! ಠ_ಠ

Yet rounding error is not the only reason to customize number formatting. A table of numbers should be formatted consistently for comparison; above, 0.0 would be better than 0. Large numbers should have grouped digits (e.g., 42,000) or be in scientific or metric notation (4.2e+4, 42k). Currencies should have fixed precision ($3.50). Reported numerical results should be rounded to significant digits (4021 becomes 4000). Number formats should appropriate to the reader’s locale (42.000,00 or 42,000.00). The list goes on.

Formatting numbers for human consumption is the purpose of d3-format, which is modeled after Python 3’s [format specification mini-language](https://docs.python.org/3/library/string.html#format-specification-mini-language) ([PEP 3101](https://www.python.org/dev/peps/pep-3101/)). Revisiting the example above:

```js
const f = d3.format(".1f");
for (let i = 0; i < 10; ++i) {
  console.log(f(0.1 * i));
}
```

Now you get this:

```
0.0
0.1
0.2
0.3
0.4
0.5
0.6
0.7
0.8
0.9
```

But d3-format is much more than an alias for [number.toFixed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)! A few more examples:

```js
d3.format(".0%")(0.123) // rounded percentage, "12%"
```
```js
d3.format("($.2f")(-3.5) // localized fixed-point currency, "(£3.50)"
```
```js
d3.format("+20")(42) // space-filled and signed, "                 +42"
```
```js
d3.format(".^20")(42) // dot-filled and centered, ".........42........."
```
```js
d3.format(".2s")(42e6) // SI-prefix with two significant digits, "42M"
```
```js
d3.format("#x")(48879) // prefixed lowercase hexadecimal, "0xbeef"
```
```js
d3.format(",.2r")(4223) // grouped thousands with two significant digits, "4,200"
```

See [*locale*.format](#locale_format) for a detailed specification, and try running [d3.formatSpecifier](#formatSpecifier) on the above formats to decode their meaning.

Also see [*number*.toLocaleString](https://observablehq.com/@mbostock/number-formatting).

## format(*specifier*) {#format}

```js
const f = d3.format(".2f");
```

[Source](https://github.com/d3/d3-format/blob/main/src/defaultLocale.js) · An alias for [*locale*.format](#locale_format) on the [default locale](#formatDefaultLocale).

## formatPrefix(*specifier*, *value*) {#formatPrefix}

```js
const f = d3.formatPrefix(",.0", 1e-6);
```

[Source](https://github.com/d3/d3-format/blob/main/src/defaultLocale.js) · An alias for [*locale*.formatPrefix](#locale_formatPrefix) on the [default locale](#formatDefaultLocale).

## formatLocale(*definition*) {#formatLocale}

```js
const enUs = d3.formatLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
```

[Source](https://github.com/d3/d3-format/blob/main/src/locale.js) · Returns a *locale* object for the specified *definition* with [*locale*.format](#locale_format) and [*locale*.formatPrefix](#locale_formatPrefix) methods. The *definition* must include the following properties:

* `decimal` - the decimal point (e.g., `"."`).
* `thousands` - the group separator (e.g., `","`).
* `grouping` - the array of group sizes (e.g., `[3]`), cycled as needed.
* `currency` - the currency prefix and suffix (e.g., `["$", ""]`).
* `numerals` - optional; an array of ten strings to replace the numerals 0-9.
* `percent` - optional; the percent sign (defaults to `"%"`).
* `minus` - optional; the minus sign (defaults to `"−"`).
* `nan` - optional; the not-a-number value (defaults `"NaN"`).

Note that the *thousands* property is a misnomer, as the grouping definition allows groups other than thousands.

## formatDefaultLocale(*definition*) {#formatDefaultLocale}

```js
const enUs = d3.formatDefaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
```

[Source](https://github.com/d3/d3-format/blob/main/src/defaultLocale.js) · Equivalent to [d3.formatLocale](#formatLocale), except it also redefines [d3.format](#format) and [d3.formatPrefix](#formatPrefix) to the new locale’s [*locale*.format](#locale_format) and [*locale*.formatPrefix](#locale_formatPrefix). If you do not set a default locale, it defaults to [U.S. English](https://github.com/d3/d3-format/blob/main/locale/en-US.json).

## *locale*.format(*specifier*) {#locale_format}

```js
const f = d3.format(".2f");
```

[Source](https://github.com/d3/d3-format/blob/main/src/locale.js) · Returns a new format function for the given string *specifier*. The returned function takes a number as the only argument, and returns a string representing the formatted number. The general form of a specifier is:

```
[​[fill]align][sign][symbol][0][width][,][.precision][~][type]
```

The *fill* can be any character. The presence of a fill character is signaled by the *align* character following it, which must be one of the following:

* `>` - Forces the field to be right-aligned within the available space. (Default behavior).
* `<` - Forces the field to be left-aligned within the available space.
* `^` - Forces the field to be centered within the available space.
* `=` - like `>`, but with any sign and symbol to the left of any padding.

The *sign* can be:

* `-` - nothing for zero or positive and a minus sign for negative. (Default behavior.)
* `+` - a plus sign for zero or positive and a minus sign for negative.
* `(` - nothing for zero or positive and parentheses for negative.
* ` ` (space) - a space for zero or positive and a minus sign for negative.

The *symbol* can be:

* `$` - apply currency symbols per the locale definition.
* `#` - for binary, octal, or hexadecimal notation, prefix by `0b`, `0o`, or `0x`, respectively.

The *zero* (`0`) option enables zero-padding; this implicitly sets *fill* to `0` and *align* to `=`. The *width* defines the minimum field width; if not specified, then the width will be determined by the content. The *comma* (`,`) option enables the use of a group separator, such as a comma for thousands.

Depending on the *type*, the *precision* either indicates the number of digits that follow the decimal point (types `f` and `%`), or the number of significant digits (types `​`, `e`, `g`, `r`, `s` and `p`). If the precision is not specified, it defaults to 6 for all types except `​` (none), which defaults to 12. Precision is ignored for integer formats (types `b`, `o`, `d`, `x`, and `X`) and character data (type `c`). See [precisionFixed](#precisionFixed) and [precisionRound](#precisionRound) for help picking an appropriate precision.

The `~` option trims insignificant trailing zeros across all format types. This is most commonly used in conjunction with types `r`, `e`, `s` and `%`. For example:

```js
d3.format("s")(1500) // "1.50000k"
```
```js
d3.format("~s")(1500) // "1.5k"
```

The available *type* values are:

* `e` - exponent notation.
* `f` - fixed point notation.
* `g` - either decimal or exponent notation, rounded to significant digits.
* `r` - decimal notation, rounded to significant digits.
* `s` - decimal notation with an [SI prefix](#locale_formatPrefix), rounded to significant digits.
* `%` - multiply by 100, and then decimal notation with a percent sign.
* `p` - multiply by 100, round to significant digits, and then decimal notation with a percent sign.
* `b` - binary notation, rounded to integer.
* `o` - octal notation, rounded to integer.
* `d` - decimal notation, rounded to integer.
* `x` - hexadecimal notation, using lower-case letters, rounded to integer.
* `X` - hexadecimal notation, using upper-case letters, rounded to integer.
* `c` - character data, for a string of text.

The type `​` (none) is also supported as shorthand for `~g` (with a default precision of 12 instead of 6), and the type `n` is shorthand for `,g`. For the `g`, `n` and `​` (none) types, decimal notation is used if the resulting string would have *precision* or fewer digits; otherwise, exponent notation is used. For example:

```js
d3.format(".2")(42) // "42"
```
```js
d3.format(".2")(4.2) // "4.2"
```
```js
d3.format(".1")(42) // "4e+1"
```
```js
d3.format(".1")(4.2) // "4"
```

## *locale*.formatPrefix(*specifier*, *value*) {#locale_formatPrefix}

```js
const f = d3.formatPrefix(",.0", 1e-6);
```

[Source](https://github.com/d3/d3-format/blob/main/src/locale.js) · Equivalent to [*locale*.format](#locale_format), except the returned function will convert values to the units of the appropriate [SI prefix](https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes) for the specified numeric reference *value* before formatting in fixed point notation. The following prefixes are supported:

* `y` - yocto, 10⁻²⁴
* `z` - zepto, 10⁻²¹
* `a` - atto, 10⁻¹⁸
* `f` - femto, 10⁻¹⁵
* `p` - pico, 10⁻¹²
* `n` - nano, 10⁻⁹
* `µ` - micro, 10⁻⁶
* `m` - milli, 10⁻³
* `​` (none) - 10⁰
* `k` - kilo, 10³
* `M` - mega, 10⁶
* `G` - giga, 10⁹
* `T` - tera, 10¹²
* `P` - peta, 10¹⁵
* `E` - exa, 10¹⁸
* `Z` - zetta, 10²¹
* `Y` - yotta, 10²⁴

Unlike [*locale*.format](#locale_format) with the `s` format type, this method returns a formatter with a consistent SI prefix, rather than computing the prefix dynamically for each number. In addition, the *precision* for the given *specifier* represents the number of digits past the decimal point (as with `f` fixed point notation), not the number of significant digits. For example:

```js
const f = d3.formatPrefix(",.0", 1e-6);
f(0.00042); // "420µ"
f(0.0042); // "4,200µ"
```

This method is useful when formatting multiple numbers in the same units for easy comparison. See [precisionPrefix](#precisionPrefix) for help picking an appropriate precision.

## formatSpecifier(*specifier*) {#formatSpecifier}

```js
d3.formatSpecifier(".1f")
```

[Source](https://github.com/d3/d3-format/blob/main/src/formatSpecifier.js) · Parses the specified *specifier*, returning an object with exposed fields that correspond to the [format specification mini-language](#locale_format) and a toString method that reconstructs the specifier. For example, `formatSpecifier("s")` returns:

```js
FormatSpecifier {
  "fill": " ",
  "align": ">",
  "sign": "-",
  "symbol": "",
  "zero": false,
  "width": undefined,
  "comma": false,
  "precision": undefined,
  "trim": false,
  "type": "s"
}
```

This method is useful for understanding how format specifiers are parsed and for deriving new specifiers. For example, you might compute an appropriate precision based on the numbers you want to format using [precisionFixed](#precisionFixed) and then create a new format:

```js
const s = d3.formatSpecifier("f");
s.precision = d3.precisionFixed(0.01);
const f = d3.format(s);
f(42); // "42.00";
```

## new d3.FormatSpecifier(*specifier*) {#FormatSpecifier}

```js
new d3.FormatSpecifier({type: "f", precision: 1})
```

[Source](https://github.com/d3/d3-format/blob/main/src/formatSpecifier.js) · Given the specified *specifier* object, returning an object with exposed fields that correspond to the [format specification mini-language](#locale_format) and a toString method that reconstructs the specifier. For example, `new FormatSpecifier({type: "s"})` returns:

```js
FormatSpecifier {
  "fill": " ",
  "align": ">",
  "sign": "-",
  "symbol": "",
  "zero": false,
  "width": undefined,
  "comma": false,
  "precision": undefined,
  "trim": false,
  "type": "s"
}
```

## precisionFixed(*step*) {#precisionFixed}

```js
d3.precisionFixed(0.01) // 2
```

[Source](https://github.com/d3/d3-format/blob/main/src/precisionFixed.js) · Returns a suggested decimal precision for fixed point notation given the specified numeric *step* value. The *step* represents the minimum absolute difference between values that will be formatted. (This assumes that the values to be formatted are also multiples of *step*.) For example, given the numbers 1, 1.5, and 2, the *step* should be 0.5 and the suggested precision is 1:

```js
const p = d3.precisionFixed(0.5);
const f = d3.format("." + p + "f");
f(1);   // "1.0"
f(1.5); // "1.5"
f(2);   // "2.0"
```

Whereas for the numbers 1, 2 and 3, the *step* should be 1 and the suggested precision is 0:

```js
const p = d3.precisionFixed(1);
const f = d3.format("." + p + "f");
f(1); // "1"
f(2); // "2"
f(3); // "3"
```

Note: for the `%` format type, subtract two:

```js
const p = Math.max(0, d3.precisionFixed(0.05) - 2);
const f = d3.format("." + p + "%");
f(0.45); // "45%"
f(0.50); // "50%"
f(0.55); // "55%"
```

## precisionPrefix(*step*, *value*) {#precisionPrefix}

```js
d3.precisionPrefix(1e5, 1.3e6) // 1
```

[Source](https://github.com/d3/d3-format/blob/main/src/precisionPrefix.js) · Returns a suggested decimal precision for use with [*locale*.formatPrefix](#locale_formatPrefix) given the specified numeric *step* and reference *value*. The *step* represents the minimum absolute difference between values that will be formatted, and *value* determines which SI prefix will be used. (This assumes that the values to be formatted are also multiples of *step*.) For example, given the numbers 1.1e6, 1.2e6, and 1.3e6, the *step* should be 1e5, the *value* could be 1.3e6, and the suggested precision is 1:

```js
const p = d3.precisionPrefix(1e5, 1.3e6);
const f = d3.formatPrefix("." + p, 1.3e6);
f(1.1e6); // "1.1M"
f(1.2e6); // "1.2M"
f(1.3e6); // "1.3M"
```

## precisionRound(*step*, *max*) {#precisionRound}

```js
d3.precisionRound(0.01, 1.01) // 3
```

[Source](https://github.com/d3/d3-format/blob/main/src/precisionRound.js) · Returns a suggested decimal precision for format types that round to significant digits given the specified numeric *step* and *max* values. The *step* represents the minimum absolute difference between values that will be formatted, and the *max* represents the largest absolute value that will be formatted. (This assumes that the values to be formatted are also multiples of *step*.) For example, given the numbers 0.99, 1.0, and 1.01, the *step* should be 0.01, the *max* should be 1.01, and the suggested precision is 3:

```js
const p = d3.precisionRound(0.01, 1.01);
const f = d3.format("." + p + "r");
f(0.99); // "0.990"
f(1.0);  // "1.00"
f(1.01); // "1.01"
```

Whereas for the numbers 0.9, 1.0, and 1.1, the *step* should be 0.1, the *max* should be 1.1, and the suggested precision is 2:

```js
const p = d3.precisionRound(0.1, 1.1);
const f = d3.format("." + p + "r");
f(0.9); // "0.90"
f(1.0); // "1.0"
f(1.1); // "1.1"
```

Note: for the `e` format type, subtract one:

```js
const p = Math.max(0, d3.precisionRound(0.01, 1.01) - 1);
const f = d3.format("." + p + "e");
f(0.01); // "1.00e-2"
f(1.01); // "1.01e+0"
```

# docs/d3-geo.md

# d3-geo

Map projections are sometimes implemented as point transformations: a function that takes a given longitude *lambda* and latitude *phi*, and returns the corresponding *xy* position on the plane. For instance, here is the spherical Mercator projection (in radians):

```js
function mercator(lambda, phi) {
  const x = lambda;
  const y = Math.log(Math.tan(Math.PI / 4 + phi / 2));
  return [x, y];
}
```

This is a reasonable approach if your geometry consists only of points. But what about discrete geometry such as polygons and polylines?

Discrete geometry introduces new challenges when projecting from the sphere to the plane. The edges of a spherical polygon are [geodesics](https://en.wikipedia.org/wiki/Geodesic) (segments of great circles), not straight lines. Geodesics become curves in all map projections except [gnomonic](./d3-geo/azimuthal.md#geoGnomonic), and thus accurate projection requires interpolation along each arc. D3 uses [adaptive sampling](https://observablehq.com/@d3/adaptive-sampling) inspired by [Visvalingam’s line simplification method](https://bost.ocks.org/mike/simplify/) to balance accuracy and performance.

The projection of polygons and polylines must also deal with the topological differences between the sphere and the plane. Some projections require cutting geometry that [crosses the antimeridian](https://observablehq.com/@d3/antimeridian-cutting), while others require [clipping geometry to a great circle](https://observablehq.com/@d3/orthographic-shading). Spherical polygons also require a [winding order convention](https://observablehq.com/@d3/winding-order) to determine which side of the polygon is the inside: the exterior ring for polygons smaller than a hemisphere must be clockwise, while the exterior ring for polygons [larger than a hemisphere](https://observablehq.com/@d3/oceans) must be anticlockwise. Interior rings representing holes must use the opposite winding order of their exterior ring.

<!-- For more, see Part 2 of [The Toolmaker’s Guide](https://vimeo.com/106198518#t=20m0s). -->

D3 uses spherical [GeoJSON](http://geojson.org/geojson-spec.html) to represent geographic features in JavaScript. D3 supports a wide variety of [common](./d3-geo/projection.md) and [unusual](https://github.com/d3/d3-geo-projection) map projections. And because D3 uses spherical geometry to represent data, you can apply any aspect to any projection by rotating geometry.

See one of:

- [Paths](./d3-geo/path.md) - generate SVG path data from GeoJSON
- [Projections](./d3-geo/projection.md) - project spherical geometry to the plane
- [Streams](./d3-geo/stream.md) - transform (either spherical or planar) geometry
- [Shapes](./d3-geo/shape.md) - generate circles, lines, and other spherical geometry
- [Spherical math](./d3-geo/math.md) - low-level methods for spherical geometry

:::tip
To convert shapefiles to GeoJSON, use [shp2json](https://github.com/mbostock/shapefile/blob/main/README.md#shp2json), part of the [shapefile package](https://github.com/mbostock/shapefile). See [Command-Line Cartography](https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c) for an introduction to d3-geo and related tools. See also [TopoJSON](https://github.com/topojson), an extension of GeoJSON that is significantly more compact and encodes topology.
:::

:::warning CAUTION
D3’s winding order convention is also used by [TopoJSON](https://github.com/topojson) and [ESRI shapefiles](https://github.com/mbostock/shapefile); however, it is the opposite convention of GeoJSON’s [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.6). Also note that standard GeoJSON WGS84 uses planar equirectangular coordinates, not spherical coordinates, and thus may require [stitching](https://github.com/d3/d3-geo-projection/blob/main/README.md#geostitch) to remove antimeridian cuts.
:::

# docs/d3-geo/azimuthal.md

<script setup>

import * as d3 from "d3";
import WorldMap from "../components/WorldMap.vue";

const width = 688;
const height = 400;

</script>

# Azimuthal projections

Azimuthal projections project the sphere directly onto a plane.

## geoAzimuthalEqualArea() {#geoAzimuthalEqualArea}

<a href="https://observablehq.com/@d3/azimuthal-equal-area" target="_blank" style="color: currentColor;"><WorldMap rotate :projection='d3.geoAzimuthalEqualArea().rotate([110, -40]).fitExtent([[1, 1], [width - 1, height - 1]], {type: "Sphere"}).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/azimuthalEqualArea.js) · The azimuthal equal-area projection.

<!-- <br><a href="#geoAzimuthalEqualArea" name="geoAzimuthalEqualArea">#</a> d3.<b>geoAzimuthalEqualArea</b> -->

## geoAzimuthalEquidistant() {#geoAzimuthalEquidistant}

<a href="https://observablehq.com/@d3/azimuthal-equidistant" target="_blank" style="color: currentColor;"><WorldMap rotate :projection='d3.geoAzimuthalEquidistant().rotate([110, -40]).fitExtent([[1, 1], [width - 1, height - 1]], {type: "Sphere"}).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/azimuthalEquidistant.js) · The azimuthal equidistant projection.

<!-- <br><a href="#geoAzimuthalEquidistantRaw" name="geoAzimuthalEquidistantRaw">#</a> d3.<b>geoAzimuthalEquidistantRaw</b> -->

## geoGnomonic() {#geoGnomonic}

<a href="https://observablehq.com/@d3/gnomonic" target="_blank" style="color: currentColor;"><WorldMap rotate :projection='d3.geoGnomonic().scale(width / 6).translate([width / 2, height / 2]).clipAngle(74 - 1e-4).clipExtent([[-1, -1], [width + 1, height + 1]]).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/gnomonic.js) · The gnomonic projection.

<!-- <br><a href="#geoGnomonicRaw" name="geoGnomonicRaw">#</a> d3.<b>geoGnomonicRaw</b> -->

## geoOrthographic() {#geoOrthographic}

<a href="https://observablehq.com/@d3/orthographic" target="_blank" style="color: currentColor;"><WorldMap rotate :projection='d3.geoOrthographic().rotate([110, -40]).fitExtent([[1, 1], [width - 1, height - 1]], {type: "Sphere"}).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/orthographic.js) · The orthographic projection.

<!-- <br><a href="#geoOrthographicRaw" name="geoOrthographicRaw">#</a> d3.<b>geoOrthographicRaw</b> -->

## geoStereographic() {#geoStereographic}

<a href="https://observablehq.com/@d3/stereographic" target="_blank" style="color: currentColor;"><WorldMap rotate :projection='d3.geoStereographic().scale(width / 4).translate([width / 2, height / 2]).rotate([-27, 0]).clipAngle(135 - 1e-4).clipExtent([[-1, -1], [width + 1, height + 1]]).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/stereographic.js) · The stereographic projection.

<!-- <br><a href="#geoStereographicRaw" name="geoStereographicRaw">#</a> d3.<b>geoStereographicRaw</b> -->

# docs/d3-geo/conic.md

<script setup>

import * as d3 from "d3";
import UsMap from "../components/UsMap.vue";
import WorldMap from "../components/WorldMap.vue";

const width = 688;
const height = 400;

</script>

# Conic projections

Conic projections project the sphere onto a cone, and then unroll the cone onto the plane. Conic projections have [two standard parallels](#conic_parallels).

## *conic*.parallels(*parallels*) {#conic_parallels}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/conic.js) · The [two standard parallels](https://en.wikipedia.org/wiki/Map_projection#Conic) that define the map layout in conic projections.

## geoConicConformal() {#geoConicConformal}

<a href="https://observablehq.com/@d3/conic-conformal" target="_blank" style="color: currentColor;"><WorldMap resolution="50m" :projection='d3.geoConicConformal().parallels([35, 65]).rotate([-20, 0]).scale(width * 0.55).center([0, 52]).translate([width / 2, height / 2]).clipExtent([[-1, -1], [width + 1, height + 1]]).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/conicConformal.js) · The conic conformal projection. The parallels default to [30°, 30°] resulting in flat top.

<!-- <br><a href="#geoConicConformalRaw" name="geoConicConformalRaw">#</a> d3.<b>geoConicConformalRaw</b>(<i>phi0</i>, <i>phi1</i>) -->

## geoConicEqualArea() {#geoConicEqualArea}

<a href="https://observablehq.com/@d3/conic-conformal" target="_blank" style="color: currentColor;"><WorldMap resolution="50m" :projection='d3.geoConicEqualArea().parallels([35, 65]).rotate([-20, 0]).scale(width * 0.55).center([0, 52]).translate([width / 2, height / 2]).clipExtent([[-1, -1], [width + 1, height + 1]]).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/conicEqualArea.js) · The Albers’ equal-area conic projection.

<!-- <br><a href="#geoConicEqualAreaRaw" name="geoConicEqualAreaRaw">#</a> d3.<b>geoConicEqualAreaRaw</b>(<i>phi0</i>, <i>phi1</i>) -->

## geoConicEquidistant() {#geoConicEquidistant}

<a href="https://observablehq.com/@d3/conic-equidistant" target="_blank" style="color: currentColor;"><WorldMap resolution="50m" :projection='d3.geoConicEquidistant().parallels([35, 65]).rotate([-20, 0]).scale(width * 0.55).center([0, 52]).translate([width / 2, height / 2]).clipExtent([[-1, -1], [width + 1, height + 1]]).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/conicEquidistant.js) · The conic equidistant projection.

<!-- <br><a href="#geoConicEquidistantRaw" name="geoConicEquidistantRaw">#</a> d3.<b>geoConicEquidistantRaw</b>(<i>phi0</i>, <i>phi1</i>) -->

## geoAlbers() {#geoAlbers}

<a href="https://observablehq.com/@d3/u-s-map" target="_blank" style="color: currentColor;"><UsMap :projection='d3.geoAlbers().scale(1300 / 975 * width * 0.8).translate([width / 2, height / 2])' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/albers.js) · The Albers’ equal area-conic projection. This is a U.S.-centric configuration of [geoConicEqualArea](#geoConicEqualArea).

## geoAlbersUsa() {#geoAlbersUsa}

<a href="https://observablehq.com/@d3/u-s-map" target="_blank" style="color: currentColor;"><UsMap :projection='d3.geoAlbersUsa().scale(1300 / 975 * width * 0.8).translate([width / 2, height / 2])' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/albersUsa.js) · This is a U.S.-centric composite projection of three [geoConicEqualArea](#geoConicEqualArea) projections: [geoAlbers](#geoAlbers) is used for the lower forty-eight states, and separate conic equal-area projections are used for Alaska and Hawaii. The scale for Alaska is diminished: it is projected at 0.35× its true relative area. See [Albers USA with Territories](https://www.npmjs.com/package/geo-albers-usa-territories) for an extension to all US territories, and [d3-composite-projections](http://geoexamples.com/d3-composite-projections/) for more examples.

The constituent projections have fixed clip, center and rotation, and thus this projection does not support [*projection*.center](./projection.md#projection_center), [*projection*.rotate](./projection.md#projection_rotate), [*projection*.clipAngle](./projection.md#projection_clipAngle), or [*projection*.clipExtent](./projection.md#projection_clipExtent).

# docs/d3-geo/cylindrical.md

<script setup>

import * as d3 from "d3";
import WorldMap from "../components/WorldMap.vue";

const width = 688;
const height = 400;

</script>

# Cylindrical projections

Cylindrical projections project the sphere onto a containing cylinder, and then unroll the cylinder onto the plane. [Pseudocylindrical projections](https://web.archive.org/web/20150928042327/http://www.progonos.com/furuti/MapProj/Normal/ProjPCyl/projPCyl.html) are a generalization of cylindrical projections.

## geoEquirectangular() {#geoEquirectangular}

<a href="https://observablehq.com/@d3/equirectangular" target="_blank" style="color: currentColor;"><WorldMap :height="width / 2" :projection='d3.geoEquirectangular().rotate([0, 0]).fitExtent([[1, 1], [width - 1, width / 2 - 1]], {type: "Sphere"}).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/equirectangular.js) · The equirectangular (plate carrée) projection.

<!-- <br><a href="#geoEquirectangularRaw" name="geoEquirectangularRaw">#</a> d3.<b>geoEquirectangularRaw</b> -->

## geoMercator() {#geoMercator}

<a href="https://observablehq.com/@d3/mercator" target="_blank" style="color: currentColor;"><WorldMap resolution="50m" :height="width" :projection='d3.geoMercator().rotate([0, 0]).fitExtent([[1, 1], [width - 1, width - 1]], {type: "Sphere"}).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/mercator.js) · The spherical Mercator projection. Defines a default [*projection*.clipExtent](./projection.md#projection_clipExtent) such that the world is projected to a square, clipped to approximately ±85° latitude.

<!-- <br><a href="#geoMercatorRaw" name="geoMercatorRaw">#</a> d3.<b>geoMercatorRaw</b> -->

## geoTransverseMercator() {#geoTransverseMercator}

<a href="https://observablehq.com/@d3/transverse-mercator" target="_blank" style="color: currentColor;"><WorldMap resolution="50m" :height="width" :projection='d3.geoTransverseMercator().rotate([0, 0]).fitExtent([[1, 1], [width - 1, width - 1]], {type: "Sphere"}).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/transverseMercator.js) · The transverse spherical Mercator projection. Defines a default [*projection*.clipExtent](./projection.md#projection_clipExtent) such that the world is projected to a square, clipped to approximately ±85° latitude.

<!-- <br><a href="#geoTransverseMercatorRaw" name="geoTransverseMercatorRaw">#</a> d3.<b>geoTransverseMercatorRaw</b> -->

## geoEqualEarth() {#geoEqualEarth}

<a href="https://observablehq.com/@d3/equal-earth" target="_blank" style="color: currentColor;"><WorldMap :height="width * 0.49" :projection='d3.geoEqualEarth().rotate([0, 0]).fitExtent([[1, 1], [width - 1, width * 0.49 - 1]], {type: "Sphere"}).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/equalEarth.js) · The Equal Earth projection, an equal-area projection, by Bojan Šavrič _et al._, 2018.

<!-- <br><a href="#geoEqualEarthRaw" name="geoEqualEarthRaw">#</a> d3.<b>geoEqualEarthRaw</b> -->

## geoNaturalEarth1() {#geoNaturalEarth1}

<a href="https://observablehq.com/@d3/natural-earth" target="_blank" style="color: currentColor;"><WorldMap :height="width * 0.5" :projection='d3.geoNaturalEarth1().rotate([0, 0]).fitExtent([[1, 1], [width - 1, width * 0.5 - 1]], {type: "Sphere"}).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/naturalEarth1.js) · The [Natural Earth projection](http://www.shadedrelief.com/NE_proj/) is a pseudocylindrical projection designed by Tom Patterson. It is neither conformal nor equal-area, but appealing to the eye for small-scale maps of the whole world.

<!-- ### geoNaturalEarth1Raw(*lambda*, *phi*) {#geoNaturalEarth1Raw} -->

# docs/d3-geo/math.md

# Spherical math

Low-level utilities for spherical geometry.

## geoArea(*object*) {#geoArea}

[Source](https://github.com/d3/d3-geo/blob/main/src/area.js) · Returns the spherical area of the specified GeoJSON *object* in [steradians](https://en.wikipedia.org/wiki/Steradian). This is the spherical equivalent of [*path*.area](./path.md#path_area).

## geoBounds(*object*) {#geoBounds}

[Source](https://github.com/d3/d3-geo/blob/main/src/bounds.js) · Returns the [spherical bounding box](https://www.jasondavies.com/maps/bounds/) for the specified GeoJSON *object*. The bounding box is represented by a two-dimensional array: \[\[*left*, *bottom*], \[*right*, *top*\]\], where *left* is the minimum longitude, *bottom* is the minimum latitude, *right* is maximum longitude, and *top* is the maximum latitude. All coordinates are given in degrees. (Note that in projected planar coordinates, the minimum latitude is typically the maximum *y*-value, and the maximum latitude is typically the minimum *y*-value.) This is the spherical equivalent of [*path*.bounds](./path.md#path_bounds).

## geoCentroid(*object*) {#geoCentroid}

[Source](https://github.com/d3/d3-geo/blob/main/src/centroid.js) · Returns the spherical centroid of the specified GeoJSON *object*. This is the spherical equivalent of [*path*.centroid](./path.md#path_centroid).

## geoDistance(*a*, *b*) {#geoDistance}

[Source](https://github.com/d3/d3-geo/blob/main/src/distance.js) · Returns the great-arc distance in [radians](http://mathworld.wolfram.com/Radian.html) between the two points *a* and *b*. Each point must be specified as a two-element array \[*longitude*, *latitude*\] in degrees. This is the spherical equivalent of [*path*.measure](./path.md#path_measure) given a LineString of two points.

## geoLength(*object*) {#geoLength}

[Source](https://github.com/d3/d3-geo/blob/main/src/length.js) · Returns the great-arc length of the specified GeoJSON *object* in [radians](http://mathworld.wolfram.com/Radian.html). For polygons, returns the perimeter of the exterior ring plus that of any interior rings. This is the spherical equivalent of [*path*.measure](./path.md#path_measure).

## geoInterpolate(*a*, *b*) {#geoInterpolate}

[Source](https://github.com/d3/d3-geo/blob/main/src/interpolate.js) · Returns an interpolator function given two points *a* and *b*. Each point must be specified as a two-element array \[*longitude*, *latitude*\] in degrees. The returned interpolator function takes a single argument *t*, where *t* is a number ranging from 0 to 1; a value of 0 returns the point *a*, while a value of 1 returns the point *b*. Intermediate values interpolate from *a* to *b* along the great arc that passes through both *a* and *b*. If *a* and *b* are antipodes, an arbitrary great arc is chosen.

## geoContains(*object*, *point*) {#geoContains}

[Source](https://github.com/d3/d3-geo/blob/main/src/contains.js) · Returns true if and only if the specified GeoJSON *object* contains the specified *point*, or false if the *object* does not contain the *point*. The point must be specified as a two-element array \[*longitude*, *latitude*\] in degrees. For Point and MultiPoint geometries, an exact test is used; for a Sphere, true is always returned; for other geometries, an epsilon threshold is applied.

## geoRotation(*angles*) {#geoRotation}

[Source](https://github.com/d3/d3-geo/blob/main/src/rotation.js) · Returns a [rotation function](#_rotation) for the given *angles*, which must be a two- or three-element array of numbers [*lambda*, *phi*, *gamma*] specifying the rotation angles in degrees about [each spherical axis](https://observablehq.com/@d3/three-axis-rotation). (These correspond to [yaw, pitch and roll](https://en.wikipedia.org/wiki/Aircraft_principal_axes).) If the rotation angle *gamma* is omitted, it defaults to 0. See also [*projection*.rotate](./projection.md#projection_rotate).

### *rotation*(*point*) {#_rotation}

[Source](https://github.com/d3/d3-geo/blob/main/src/rotation.js) · Returns a new array \[*longitude*, *latitude*\] in degrees representing the rotated point of the given *point*. The point must be specified as a two-element array \[*longitude*, *latitude*\] in degrees.

### *rotation*.invert(*point*) {#rotation_invert}

[Source](https://github.com/d3/d3-geo/blob/main/src/rotation.js) · Returns a new array \[*longitude*, *latitude*\] in degrees representing the point of the given rotated *point*; the inverse of [*rotation*](#_rotation). The point must be specified as a two-element array \[*longitude*, *latitude*\] in degrees.

# docs/d3-geo/path.md

# Paths

The geographic path generator, [geoPath](#geoPath), takes a given GeoJSON geometry or feature object and generates SVG path data string or [renders to a Canvas](https://observablehq.com/@d3/u-s-map-canvas). Paths can be used with [projections](./projection.md) or [transforms](./projection.md#geoTransform), or they can be used to render planar geometry directly to Canvas or SVG.

## geoPath(*projection*, *context*) {#geoPath}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js) · Creates a new geographic path generator with the default settings. If *projection* is specified, sets the [current projection](#path_projection). If *context* is specified, sets the [current context](#path_context).

```js
const path = d3.geoPath(projection); // for SVG
```
```js
const path = d3.geoPath(projection, context); // for canvas
```

## *path*(*object*, ...*arguments*) {#_path}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js) · Renders the given *object*, which may be any GeoJSON feature or geometry object:

* *Point* - a single position
* *MultiPoint* - an array of positions
* *LineString* - an array of positions forming a continuous line
* *MultiLineString* - an array of arrays of positions forming several lines
* *Polygon* - an array of arrays of positions forming a polygon (possibly with holes)
* *MultiPolygon* - a multidimensional array of positions forming multiple polygons
* *GeometryCollection* - an array of geometry objects
* *Feature* - a feature containing one of the above geometry objects
* *FeatureCollection* - an array of feature objects

The type *Sphere* is also supported, which is useful for rendering the outline of the globe; a sphere has no coordinates. Any additional *arguments* are passed along to the [pointRadius](#path_pointRadius) accessor.

To display multiple features, combine them into a feature collection:

```js
svg.append("path")
    .datum({type: "FeatureCollection", features: features})
    .attr("d", d3.geoPath());
```

Or use multiple path elements:

```js
svg.selectAll()
  .data(features)
  .join("path")
    .attr("d", d3.geoPath());
```

Separate path elements are typically slower than a single path element. However, distinct path elements are useful for styling and interaction (e.g., click or mouseover). Canvas rendering (see [*path*.context](#path_context)) is typically faster than SVG, but requires more effort to implement styling and interaction.

## *path*.area(*object*) {#path_area}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/area.js) · Returns the projected planar area (typically in square pixels) for the specified GeoJSON *object*.

```js
path.area(california) // 17063.1671837991 px²
```

Point, MultiPoint, LineString and MultiLineString geometries have zero area. For Polygon and MultiPolygon geometries, this method first computes the area of the exterior ring, and then subtracts the area of any interior holes. This method observes any clipping performed by the [projection](#path_projection); see [*projection*.clipAngle](./projection.md#projection_clipAngle) and [*projection*.clipExtent](./projection.md#projection_clipExtent). This is the planar equivalent of [geoArea](./math.md#geoArea).

## *path*.bounds(*object*) {#path_bounds}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/bounds.js) · Returns the projected planar bounding box (typically in pixels) for the specified GeoJSON *object*.

```js
path.bounds(california) // [[18.48513821663947, 159.95146883594333], [162.7651668852596, 407.09641570706725]]
```

The bounding box is represented by a two-dimensional array: \[\[*x₀*, *y₀*\], \[*x₁*, *y₁*\]\], where *x₀* is the minimum *x*-coordinate, *y₀* is the minimum y coordinate, *x₁* is maximum *x*-coordinate, and *y₁* is the maximum y coordinate. This is handy for, say, zooming in to a particular feature. (Note that in projected planar coordinates, the minimum latitude is typically the maximum *y*-value, and the maximum latitude is typically the minimum *y*-value.) This method observes any clipping performed by the [projection](#path_projection); see [*projection*.clipAngle](./projection.md#projection_clipAngle) and [*projection*.clipExtent](./projection.md#projection_clipExtent). This is the planar equivalent of [geoBounds](./math.md#geoBounds).

## *path*.centroid(*object*) {#path_centroid}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/centroid.js) · Returns the projected planar centroid (typically in pixels) for the specified GeoJSON *object*.

```js
path.centroid(california) // [82.08679434495191, 288.14204870673404]
```

This is handy for, say, labeling state or county boundaries, or displaying a symbol map. For example, a [noncontiguous cartogram](https://observablehq.com/@d3/non-contiguous-cartogram) might scale each state around its centroid. This method observes any clipping performed by the [projection](#path_projection); see [*projection*.clipAngle](./projection.md#projection_clipAngle) and [*projection*.clipExtent](./projection.md#projection_clipExtent). This is the planar equivalent of [geoCentroid](./math.md#geoCentroid).

## *path*.digits(*digits*) {#path_digits}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js) · If *digits* is specified (as a non-negative number), sets the number of fractional digits for coordinates generated in SVG path strings.

```js
const path = d3.geoPath().digits(3);
```

If *projection* is not specified, returns the current number of digits, which defaults to 3.

```js
path.digits() // 3
```

This option only applies when the associated [*context*](#path_context) is null, as when this arc generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

## *path*.measure(*object*) {#path_measure}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/measure.js) · Returns the projected planar length (typically in pixels) for the specified GeoJSON *object*.

```js
path.measure(california) // 825.7124297512761
```

Point and MultiPoint geometries have zero length. For Polygon and MultiPolygon geometries, this method computes the summed length of all rings. This method observes any clipping performed by the [projection](#path_projection); see [*projection*.clipAngle](./projection.md#projection_clipAngle) and [*projection*.clipExtent](./projection.md#projection_clipExtent). This is the planar equivalent of [geoLength](./math.md#geoLength).

## *path*.projection(*projection*) {#path_projection}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js) · If a *projection* is specified, sets the current projection to the specified projection.

```js
const path = d3.geoPath().projection(d3.geoAlbers());
```

If *projection* is not specified, returns the current projection.

```js
path.projection() // a d3.geoAlbers instance
```

The projection defaults to null, which represents the identity transformation: the input geometry is not projected and is instead rendered directly in raw coordinates. This can be useful for fast rendering of [pre-projected geometry](https://observablehq.com/@d3/u-s-map), or for fast rendering of the equirectangular projection.

The given *projection* is typically one of D3’s built-in [geographic projections](./projection.md); however, any object that exposes a [*projection*.stream](./projection.md#projection_stream) function can be used, enabling the use of [custom projections](https://observablehq.com/@d3/custom-cartesian-projection). See D3’s [transforms](./projection.md#geoTransform) for more examples of arbitrary geometric transformations.

## *path*.context(*context*) {#path_context}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js) · If *context* is specified, sets the current render context and returns the path generator.

```js
const context = canvas.getContext("2d");
const path = d3.geoPath().context(context);
```

If the *context* is null, then the [path generator](#_path) will return an SVG path string; if the context is non-null, the path generator will instead call methods on the specified context to render geometry. The context must implement the following subset of the [CanvasRenderingContext2D API](https://www.w3.org/TR/2dcontext/#canvasrenderingcontext2d):

* *context*.beginPath()
* *context*.moveTo(*x*, *y*)
* *context*.lineTo(*x*, *y*)
* *context*.arc(*x*, *y*, *radius*, *startAngle*, *endAngle*)
* *context*.closePath()

If a *context* is not specified, returns the current render context which defaults to null. See also [d3-path](../d3-path.md).

## *path*.pointRadius(*radius*) {#path_pointRadius}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js) · If *radius* is specified, sets the radius used to display Point and MultiPoint geometries to the specified number.

```js
const path = d3.geoPath().pointRadius(10);
```

If *radius* is not specified, returns the current radius accessor.

```js
path.pointRadius() // 10
```

The radius accessor defaults to 4.5. While the radius is commonly specified as a number constant, it may also be specified as a function which is computed per feature, being passed the any arguments passed to the [path generator](#_path). For example, if your GeoJSON data has additional properties, you might access those properties inside the radius function to vary the point size; alternatively, you could [symbol](../d3-shape/symbol.md) and a [projection](./projection.md) for greater flexibility.

# docs/d3-geo/projection.md

# Projections

Projections transform spherical polygonal geometry to planar polygonal geometry. D3 provides implementations of several classes of standard projections:

* [Azimuthal projections](./azimuthal.md)
* [Conic projections](./conic.md)
* [Cylindrical projections](./cylindrical.md)

For more projections, see [d3-geo-projection](https://github.com/d3/d3-geo-projection) and [d3-geo-polygon](https://github.com/d3/d3-geo-polygon). You can implement [custom projections](#raw-projections) using [geoProjection](#geoProjection) or [geoProjectionMutator](#geoProjectionMutator).

## *projection*(*point*) {#_projection}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · Returns a new array [*x*, *y*] (typically in pixels) representing the projected point of the given *point*. The point must be specified as a two-element array [*longitude*, *latitude*] in degrees. May return null if the specified *point* has no defined projected position, such as when the point is outside the clipping bounds of the projection.

## *projection*.invert(*point*) {#projection_invert}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · Returns a new array [*longitude*, *latitude*] in degrees representing the unprojected point of the given projected *point*. The point must be specified as a two-element array [*x*, *y*] (typically in pixels). May return null if the specified *point* has no defined projected position, such as when the point is outside the clipping bounds of the projection.

This method is only defined on invertible projections.

## *projection*.stream(*stream*) {#projection_stream}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · Returns a [projection stream](./stream.md) for the specified output *stream*. Any input geometry is projected before being streamed to the output stream. A typical projection involves several geometry transformations: the input geometry is first converted to radians, rotated on three axes, clipped to the small circle or cut along the antimeridian, and lastly projected to the plane with adaptive resampling, scale and translation.

## *projection*.preclip(*preclip*) {#projection_preclip}

If *preclip* is specified, sets the projection’s spherical clipping to the specified function and returns the projection; *preclip* is a function that takes a [projection stream](./stream.md) and returns a clipped stream. If *preclip* is not specified, returns the current spherical clipping function. Preclipping is commonly used to cut along the antimeridian line or along a small circle.

## *projection*.postclip(*postclip*) {#projection_postclip}

If *postclip* is specified, sets the projection’s Cartesian clipping to the specified function and returns the projection; *postclip* is a function that takes a [projection stream](./stream.md) and returns a clipped stream. If *postclip* is not specified, returns the current Cartesian clipping function. Post-clipping occurs on the plane, when a projection is bounded to a certain extent such as a rectangle.

## *projection*.clipAngle(*angle*) {#projection_clipAngle}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · If *angle* is specified, sets the projection’s clipping circle radius to the specified angle in degrees and returns the projection. If *angle* is null, switches to [antimeridian cutting](https://observablehq.com/@d3/antimeridian-cutting) rather than small-circle clipping. If *angle* is not specified, returns the current clip angle which defaults to null. Small-circle clipping is independent of viewport clipping via [*projection*.clipExtent](#projection_clipExtent). See also [*projection*.preclip](#projection_preclip), [geoClipAntimeridian](#geoClipAntimeridian), [geoClipCircle](#geoClipCircle).

## *projection*.clipExtent(*extent*) {#projection_clipExtent}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · If *extent* is specified, sets the projection’s viewport clip extent to the specified bounds in pixels and returns the projection. The *extent* bounds are specified as an array \[\[<i>x₀</i>, <i>y₀</i>\], \[<i>x₁</i>, <i>y₁</i>\]\], where <i>x₀</i> is the left-side of the viewport, <i>y₀</i> is the top, <i>x₁</i> is the right and <i>y₁</i> is the bottom. If *extent* is null, no viewport clipping is performed. If *extent* is not specified, returns the current viewport clip extent which defaults to null. Viewport clipping is independent of small-circle clipping via [*projection*.clipAngle](#projection_clipAngle). See also [*projection*.postclip](#projection_postclip), [geoClipRectangle](#geoClipRectangle).

## *projection*.scale(*scale*) {#projection_scale}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · If *scale* is specified, sets the projection’s scale factor to the specified value and returns the projection. If *scale* is not specified, returns the current scale factor; the default scale is projection-specific. The scale factor corresponds linearly to the distance between projected points; however, absolute scale factors are not equivalent across projections.

## *projection*.translate(*translate*) {#projection_translate}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · If *translate* is specified, sets the projection’s translation offset to the specified two-element array [<i>t<sub>x</sub></i>, <i>t<sub>y</sub></i>] and returns the projection. If *translate* is not specified, returns the current translation offset which defaults to [480, 250]. The translation offset determines the pixel coordinates of the projection’s [center](#projection_center). The default translation offset places ⟨0°,0°⟩ at the center of a 960×500 area.

## *projection*.center(*center*) {#projection_center}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · If *center* is specified, sets the projection’s center to the specified *center*, a two-element array of [*longitude*, *latitude*] in degrees and returns the projection. If *center* is not specified, returns the current center, which defaults to ⟨0°,0°⟩.

## *projection*.angle(*angle*) {#projection_angle}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · If *angle* is specified, sets the projection’s post-projection planar rotation angle to the specified *angle* in degrees and returns the projection. If *angle* is not specified, returns the projection’s current angle, which defaults to 0°. Note that it may be faster to rotate during rendering (e.g., using [*context*.rotate](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/rotate)) rather than during projection.

## *projection*.reflectX(*reflect*) {#projection_reflectX}

If *reflect* is specified, sets whether or not the *x*-dimension is reflected (negated) in the output. If *reflect* is not specified, returns true if *x*-reflection is enabled, which defaults to false. This can be useful to display sky and astronomical data with the orb seen from below: right ascension (eastern direction) will point to the left when North is pointing up.

## *projection*.reflectY(*reflect*) {#projection_reflectY}

If *reflect* is specified, sets whether or not the *y*-dimension is reflected (negated) in the output. If *reflect* is not specified, returns true if *y*-reflection is enabled, which defaults to false. This is especially useful for transforming from standard [spatial reference systems](https://en.wikipedia.org/wiki/Spatial_reference_system), which treat positive *y* as pointing up, to display coordinate systems such as Canvas and SVG, which treat positive *y* as pointing down.

## *projection*.rotate(*angles*) {#projection_rotate}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · If *angles* is specified, sets the projection’s [three-axis spherical rotation](https://observablehq.com/@d3/three-axis-rotation) to the specified value, which must be a two- or three-element array of numbers [*lambda*, *phi*, *gamma*] specifying the rotation angles in degrees about [each spherical axis](https://observablehq.com/@d3/three-axis-rotation). (These correspond to [yaw, pitch and roll](https://en.wikipedia.org/wiki/Aircraft_principal_axes).) If the rotation angle *gamma* is omitted, it defaults to 0. See also [geoRotation](./math.md#geoRotation). If *angles* is not specified, returns the current rotation which defaults to [0, 0, 0].

## *projection*.precision(*precision*) {#projection_precision}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · If *precision* is specified, sets the threshold for the projection’s [adaptive resampling](https://observablehq.com/@d3/adaptive-sampling) to the specified value in pixels and returns the projection. This value corresponds to the [Douglas–Peucker](https://en.wikipedia.org/wiki/Ramer–Douglas–Peucker_algorithm) distance. If *precision* is not specified, returns the projection’s current resampling precision which defaults to √0.5 ≅ 0.70710…

## *projection*.fitExtent(*extent*, *object*) {#projection_fitExtent}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · Sets the projection’s [scale](#projection_scale) and [translate](#projection_translate) to fit the specified GeoJSON *object* in the center of the given *extent*. The extent is specified as an array \[\[x₀, y₀\], \[x₁, y₁\]\], where x₀ is the left side of the bounding box, y₀ is the top, x₁ is the right and y₁ is the bottom. Returns the projection.

For example, to scale and translate the [New Jersey State Plane projection](https://observablehq.com/@d3/new-jersey-state-plane) to fit a GeoJSON object *nj* in the center of a 960×500 bounding box with 20 pixels of padding on each side:

```js
var projection = d3.geoTransverseMercator()
    .rotate([74 + 30 / 60, -38 - 50 / 60])
    .fitExtent([[20, 20], [940, 480]], nj);
```

Any [clip extent](#projection_clipExtent) is ignored when determining the new scale and translate. The [precision](#projection_precision) used to compute the bounding box of the given *object* is computed at an effective scale of 150.

## *projection*.fitSize(*size*, *object*) {#projection_fitSize}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · A convenience method for [*projection*.fitExtent](#projection_fitExtent) where the top-left corner of the extent is [0, 0]. The following two statements are equivalent:

```js
projection.fitExtent([[0, 0], [width, height]], object);
projection.fitSize([width, height], object);
```

## *projection*.fitWidth(*width*, *object*) {#projection_fitWidth}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · A convenience method for [*projection*.fitSize](#projection_fitSize) where the height is automatically chosen from the aspect ratio of *object* and the given constraint on *width*.

## *projection*.fitHeight(*height*, *object*) {#projection_fitHeight}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · A convenience method for [*projection*.fitSize](#projection_fitSize) where the width is automatically chosen from the aspect ratio of *object* and the given constraint on *height*.

## Raw projections {#raw-projections}

Raw projections are point transformation functions that are used to implement custom projections; they typically passed to [geoProjection](#geoProjection) or [geoProjectionMutator](#geoProjectionMutator). They are exposed here to facilitate the derivation of related projections. Raw projections take spherical coordinates [*lambda*, *phi*] in radians (not degrees!) and return a point [*x*, *y*], typically in the unit square centered around the origin.

### *project*(*lambda*, *phi*) {#_project}

Projects the specified point [<i>lambda</i>, <i>phi</i>] in radians, returning a new point [*x*, *y*] in unitless coordinates.

### *project*.invert(*x*, *y*) {#project_invert}

The inverse of [*project*](#_project).

## geoProjection(*project*) {#geoProjection}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · Constructs a new projection from the specified [raw projection](#raw-projections), *project*. The *project* function takes the *longitude* and *latitude* of a given point in [radians](http://mathworld.wolfram.com/Radian.html), often referred to as *lambda* (λ) and *phi* (φ), and returns a two-element array [*x*, *y*] representing its unit projection. The *project* function does not need to scale or translate the point, as these are applied automatically by [*projection*.scale](#projection_scale), [*projection*.translate](#projection_translate), and [*projection*.center](#projection_center). Likewise, the *project* function does not need to perform any spherical rotation, as [*projection*.rotate](#projection_rotate) is applied prior to projection.

For example, a spherical Mercator projection can be implemented as:

```js
var mercator = d3.geoProjection(function(x, y) {
  return [x, Math.log(Math.tan(Math.PI / 4 + y / 2))];
});
```

If the *project* function exposes an *invert* method, the returned projection will also expose [*projection*.invert](#projection_invert).

## geoProjectionMutator(*factory*) {#geoProjectionMutator}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · Constructs a new projection from the specified [raw projection](#_project) *factory* and returns a *mutate* function to call whenever the raw projection changes. The *factory* must return a raw projection. The returned *mutate* function returns the wrapped projection. For example, a conic projection typically has two configurable parallels. A suitable *factory* function, such as [geoConicEqualAreaRaw](./conic.md#geoConicEqualArea), would have the form:

```js
// y0 and y1 represent two parallels
function conicFactory(phi0, phi1) {
  return function conicRaw(lambda, phi) {
    return […, …];
  };
}
```

Using d3.geoProjectionMutator, you can implement a standard projection that allows the parallels to be changed, reassigning the raw projection used internally by [geoProjection](#geoProjection):

```js
function conicCustom() {
  var phi0 = 29.5,
      phi1 = 45.5,
      mutate = d3.geoProjectionMutator(conicFactory),
      projection = mutate(phi0, phi1);

  projection.parallels = function(_) {
    return arguments.length ? mutate(phi0 = +_[0], phi1 = +_[1]) : [phi0, phi1];
  };

  return projection;
}
```

When creating a mutable projection, the *mutate* function is typically not exposed.

## geoTransform(*methods*) {#geoTransform}

[Source](https://github.com/d3/d3-geo/blob/main/src/transform.js) · Defines an arbitrary transform using the methods defined on the specified *methods* object. Any undefined methods will use pass-through methods that propagate inputs to the output stream.

For example, to reflect the *y*-dimension (see also [*projection*.reflectY](#projection_reflectY)):

```js
const reflectY = d3.geoTransform({
  point(x, y) {
    this.stream.point(x, -y);
  }
});
```

Or to define an affine matrix transformation:

```js
function matrix(a, b, c, d, tx, ty) {
  return d3.geoTransform({
    point(x, y) {
      this.stream.point(a * x + b * y + tx, c * x + d * y + ty);
    }
  });
}
```

A transform is a generalized projection; it implements [*projection*.stream](#projection_stream) and can be passed to [*path*.projection](./path.md#path_projection). However, it implements only a subset of the other projection methods, and represent arbitrary geometric transformations rather than projections from spherical to planar coordinates.

## geoIdentity() {#geoIdentity}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/identity.js) · The identity transform can be used to scale, translate and clip planar geometry. It implements [*projection*.scale](#projection_scale), [*projection*.translate](#projection_translate), [*projection*.fitExtent](#projection_fitExtent), [*projection*.fitSize](#projection_fitSize), [*projection*.fitWidth](#projection_fitWidth), [*projection*.fitHeight](#projection_fitHeight), [*projection*.clipExtent](#projection_clipExtent), [*projection*.angle](#projection_angle), [*projection*.reflectX](#projection_reflectX) and [*projection*.reflectY](#projection_reflectY).

## geoClipAntimeridian {#geoClipAntimeridian}

[Source](https://github.com/d3/d3-geo/blob/main/src/clip/antimeridian.js) · A clipping function which transforms a stream such that geometries (lines or polygons) that cross the antimeridian line are cut in two, one on each side. Typically used for pre-clipping.

## geoClipCircle(*angle*) {#geoClipCircle}

[Source](https://github.com/d3/d3-geo/blob/main/src/clip/circle.js) · Generates a clipping function which transforms a stream such that geometries are bounded by a small circle of radius *angle* around the projection’s [center](#projection_center). Typically used for pre-clipping.

## geoClipRectangle(*x0*, *y0*, *x1*, *y1*) {#geoClipRectangle}

[Source](https://github.com/d3/d3-geo/blob/main/src/clip/rectangle.js) · Generates a clipping function which transforms a stream such that geometries are bounded by a rectangle of coordinates [[<i>x0</i>, <i>y0</i>], [<i>x1</i>, <i>y1</i>]]. Typically used for post-clipping.

# docs/d3-geo/shape.md

<script setup>

import * as d3 from "d3";
import WorldMap from "../components/WorldMap.vue";

const width = 688;
const height = 400;

</script>

# Spherical shapes

These shape generators return spherical GeoJSON for use with [geoPath](./path.md).

:::tip
To generate a [great arc](https://en.wikipedia.org/wiki/Great-circle_distance) (a segment of a great circle), pass a GeoJSON LineString geometry object to a [geoPath](./path.md). D3’s projections use geodesic interpolation for intermediate points.
:::

## geoGraticule() {#geoGraticule}

<WorldMap rotate :land="false" :projection='d3.geoOrthographic().rotate([110, -40]).fitExtent([[1, 1], [width - 1, height - 1]], {type: "Sphere"}).precision(0.2)' />

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · Constructs a geometry generator for creating graticules: a uniform grid of [meridians](https://en.wikipedia.org/wiki/Meridian_\(geography\)) and [parallels](https://en.wikipedia.org/wiki/Circle_of_latitude) for showing projection distortion. The default graticule has meridians and parallels every 10° between ±80° latitude; for the polar regions, there are meridians every 90°.

## *graticule*() {#_graticule}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · Returns a GeoJSON MultiLineString geometry object representing all meridians and parallels for this graticule.

## *graticule*.lines() {#graticule_lines}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · Returns an array of GeoJSON LineString geometry objects, one for each meridian or parallel for this graticule.

## *graticule*.outline() {#graticule_outline}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · Returns a GeoJSON Polygon geometry object representing the outline of this graticule, i.e. along the meridians and parallels defining its extent.

## *graticule*.extent(*extent*) {#graticule_extent}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · If *extent* is specified, sets the major and minor extents of this graticule. If *extent* is not specified, returns the current minor extent, which defaults to ⟨⟨-180°, -80° - ε⟩, ⟨180°, 80° + ε⟩⟩.

## *graticule*.extentMajor(*extent*) {#graticule_extentMajor}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · If *extent* is specified, sets the major extent of this graticule. If *extent* is not specified, returns the current major extent, which defaults to ⟨⟨-180°, -90° + ε⟩, ⟨180°, 90° - ε⟩⟩.

## *graticule*.extentMinor(*extent*) {#graticule_extentMinor}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · If *extent* is specified, sets the minor extent of this graticule. If *extent* is not specified, returns the current minor extent, which defaults to ⟨⟨-180°, -80° - ε⟩, ⟨180°, 80° + ε⟩⟩.

## *graticule*.step(*step*) {#graticule_step}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · If *step* is specified, sets the major and minor step for this graticule. If *step* is not specified, returns the current minor step, which defaults to ⟨10°, 10°⟩.

## *graticule*.stepMajor(*step*) {#graticule_stepMajor}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · If *step* is specified, sets the major step for this graticule. If *step* is not specified, returns the current major step, which defaults to ⟨90°, 360°⟩.

## *graticule*.stepMinor(*step*) {#graticule_stepMinor}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · If *step* is specified, sets the minor step for this graticule. If *step* is not specified, returns the current minor step, which defaults to ⟨10°, 10°⟩.

## *graticule*.precision(*angle*) {#graticule_precision}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · If *precision* is specified, sets the precision for this graticule, in degrees. If *precision* is not specified, returns the current precision, which defaults to 2.5°.

## geoGraticule10() {#geoGraticule10}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · A convenience method for directly generating the default 10° global graticule as a GeoJSON MultiLineString geometry object. Equivalent to:

```js
function geoGraticule10() {
  return d3.geoGraticule()();
}
```

## geoCircle() {#geoCircle}

[Source](https://github.com/d3/d3-geo/blob/main/src/circle.js) · Returns a new circle generator.

## *circle*(...*arguments*) {#_circle}

[Source](https://github.com/d3/d3-geo/blob/main/src/circle.js) · Returns a new GeoJSON geometry object of type “Polygon” approximating a circle on the surface of a sphere, with the current [center](#circle_center), [radius](#circle_radius) and [precision](#circle_precision). Any *arguments* are passed to the accessors.

## *circle*.center(*center*) {#circle_center}

[Source](https://github.com/d3/d3-geo/blob/main/src/circle.js) · If *center* is specified, sets the circle center to the specified point \[*longitude*, *latitude*\] in degrees, and returns this circle generator. The center may also be specified as a function; this function will be invoked whenever a circle is [generated](#_circle), being passed any arguments passed to the circle generator. If *center* is not specified, returns the current center accessor, which defaults to:

```js
function center() {
  return [0, 0];
}
```

## *circle*.radius(*radius*) {#circle_radius}

[Source](https://github.com/d3/d3-geo/blob/main/src/circle.js) · If *radius* is specified, sets the circle radius to the specified angle in degrees, and returns this circle generator. The radius may also be specified as a function; this function will be invoked whenever a circle is [generated](#_circle), being passed any arguments passed to the circle generator. If *radius* is not specified, returns the current radius accessor, which defaults to:

```js
function radius() {
  return 90;
}
```

## *circle*.precision(*angle*) {#circle_precision}

[Source](https://github.com/d3/d3-geo/blob/main/src/circle.js) · If *precision* is specified, sets the circle precision to the specified angle in degrees, and returns this circle generator. The precision may also be specified as a function; this function will be invoked whenever a circle is [generated](#_circle), being passed any arguments passed to the circle generator. If *precision* is not specified, returns the current precision accessor, which defaults to:

```js
function precision() {
  return 2;
}
```

Small circles do not follow great arcs and thus the generated polygon is only an approximation. Specifying a smaller precision angle improves the accuracy of the approximate polygon, but also increase the cost to generate and render it.

# docs/d3-geo/stream.md

# Streams

Rather than materializing intermediate representations, streams transform geometry through function calls to minimize overhead. Streams must implement several methods to receive input geometry. Streams are inherently stateful; the meaning of a [point](#stream_point) depends on whether the point is inside of a [line](#stream_lineStart), and likewise a line is distinguished from a ring by a [polygon](#stream_polygonStart). Despite the name “stream”, these method calls are currently synchronous.

## geoStream(*object*, *stream*) {#geoStream}

[Source](https://github.com/d3/d3-geo/blob/main/src/stream.js) · Streams the specified [GeoJSON](http://geojson.org) *object* to the specified [projection *stream*](#streams). While both features and geometry objects are supported as input, the stream interface only describes the geometry, and thus additional feature properties are not visible to streams.

## *stream*.point(*x*, *y*, *z*) {#stream_point}

Indicates a point with the specified coordinates *x* and *y* (and optionally *z*). The coordinate system is unspecified and implementation-dependent; for example, [projection streams](./projection.md#projection_stream) require spherical coordinates in degrees as input. Outside the context of a polygon or line, a point indicates a point geometry object ([Point](http://www.geojson.org/geojson-spec.html#stream_point) or [MultiPoint](http://www.geojson.org/geojson-spec.html#multipoint)). Within a line or polygon ring, the point indicates a control point.

## *stream*.lineStart() {#stream_lineStart}

Indicates the start of a line or ring. Within a polygon, indicates the start of a ring. The first ring of a polygon is the exterior ring, and is typically clockwise. Any subsequent rings indicate holes in the polygon, and are typically counterclockwise.

## *stream*.lineEnd() {#stream_lineEnd}

Indicates the end of a line or ring. Within a polygon, indicates the end of a ring. Unlike GeoJSON, the redundant closing coordinate of a ring is *not* indicated via [point](#stream_point), and instead is implied via lineEnd within a polygon. Thus, the given polygon input:

```json
{
  "type": "Polygon",
  "coordinates": [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]
}
```

Will produce the following series of method calls on the stream:

```js
stream.polygonStart();
stream.lineStart();
stream.point(0, 0);
stream.point(0, 1);
stream.point(1, 1);
stream.point(1, 0);
stream.lineEnd();
stream.polygonEnd();
```

## *stream*.polygonStart() {#stream_polygonStart}

Indicates the start of a polygon. The first line of a polygon indicates the exterior ring, and any subsequent lines indicate interior holes.

## *stream*.polygonEnd() {#stream_polygonEnd}

Indicates the end of a polygon.

## *stream*.sphere() {#stream_sphere}

Indicates the sphere (the globe; the unit sphere centered at ⟨0,0,0⟩).

# docs/d3-hierarchy.md

# d3-hierarchy

Many datasets are intrinsically hierarchical: [geographic entities](https://www.census.gov/programs-surveys/geography/guidance/hierarchy.html), such as census blocks, census tracts, counties and states; the command structure of businesses and governments; file systems; software packages. And even non-hierarchical data may be arranged hierarchically as with [*k*-means clustering](https://en.wikipedia.org/wiki/K-means_clustering) or [phylogenetic trees](https://observablehq.com/@d3/tree-of-life). A good hierarchical visualization facilitates rapid multiscale inference: micro-observations of individual elements and macro-observations of large groups.

This module implements several popular techniques for visualizing hierarchical data:

**Node-link diagrams** show topology using discrete marks for nodes and links, such as a circle for each node and a line connecting each parent and child. The [“tidy” tree](./d3-hierarchy/tree.md) is delightfully compact, while the [dendrogram](./d3-hierarchy/cluster.md) places leaves at the same level. (These have both polar and Cartesian forms.) [Indented trees](https://observablehq.com/@d3/indented-tree) are useful for interactive browsing.

**Adjacency diagrams** show topology through the relative placement of nodes. They may also encode a quantitative dimension in the area of each node, for example to show revenue or file size. The [“icicle” diagram](./d3-hierarchy/partition.md) uses rectangles, while the “sunburst” uses annular segments.

**Enclosure diagrams** also use an area encoding, but show topology through containment. A [treemap](./d3-hierarchy/treemap.md) recursively subdivides area into rectangles. [Circle-packing](./d3-hierarchy/pack.md) tightly nests circles; this is not as space-efficient as a treemap, but perhaps more readily shows topology.

See one of:

- [Hierarchies](./d3-hierarchy/hierarchy.md) - represent and manipulate hierarchical data
- [Stratify](./d3-hierarchy/stratify.md) - organize tabular data into a [hierarchy](./d3-hierarchy/hierarchy.md)
- [Tree](./d3-hierarchy/tree.md) - construct “tidy” tree diagrams of hierarchies
- [Cluster](./d3-hierarchy/cluster.md) - construct tree diagrams that place leaf nodes at the same depth
- [Partition](./d3-hierarchy/partition.md) - construct space-filling adjacency diagrams
- [Pack](./d3-hierarchy/pack.md) - construct enclosure diagrams by tightly nesting circles
- [Treemap](./d3-hierarchy/treemap.md) -  recursively subdivide rectangles by quantitative value

# docs/d3-hierarchy/cluster.md

<script setup>

import * as Plot from "@observablehq/plot";
import PlotRender from "../components/PlotRender.js";

const gods = [
  "Chaos/Gaia/Mountains",
  "Chaos/Gaia/Pontus",
  "Chaos/Gaia/Uranus",
  "Chaos/Eros",
  "Chaos/Erebus",
  "Chaos/Tartarus"
];

</script>

# Cluster {#Cluster}

<PlotRender :options='{
  axis: null,
  height: 130,
  margin: 20,
  marginRight: 120,
  marks: [
    Plot.cluster(gods, {textStroke: "var(--vp-c-bg)"})
  ]
}' />

[Examples](https://observablehq.com/@d3/cluster-dendrogram) · The cluster layout produces [dendrograms](http://en.wikipedia.org/wiki/Dendrogram): node-link diagrams that place leaf nodes of the tree at the same depth. Dendrograms are typically less compact than [tidy trees](./tree.md), but are useful when all the leaves should be at the same level, such as for hierarchical clustering or [phylogenetic tree diagrams](https://observablehq.com/@d3/tree-of-life).

## cluster() {#cluster}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/cluster.js) · Creates a new cluster layout with default settings.

## *cluster*(*root*) {#_cluster}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/cluster.js) · Lays out the specified *root* [hierarchy](./hierarchy.md), assigning the following properties on *root* and its descendants:

* *node*.x - the *x*-coordinate of the node
* *node*.y - the y coordinate of the node

The coordinates *x* and *y* represent an arbitrary coordinate system; for example, you can treat *x* as an angle and *y* as a radius to produce a [radial layout](https://observablehq.com/@d3/radial-dendrogram). You may want to call [*root*.sort](./hierarchy.md#node_sort) before passing the hierarchy to the cluster layout.

## *cluster*.size(*size*) {#cluster_size}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/cluster.js) · If *size* is specified, sets this cluster layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this cluster layout. If *size* is not specified, returns the current layout size, which defaults to [1, 1]. A layout size of null indicates that a [node size](#cluster_nodeSize) will be used instead. The coordinates *x* and *y* represent an arbitrary coordinate system; for example, to produce a [radial layout](https://observablehq.com/@d3/radial-dendrogram), a size of [360, *radius*] corresponds to a breadth of 360° and a depth of *radius*.

## *cluster*.nodeSize(*size*) {#cluster_nodeSize}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/cluster.js) · If *size* is specified, sets this cluster layout’s node size to the specified two-element array of numbers [*width*, *height*] and returns this cluster layout. If *size* is not specified, returns the current node size, which defaults to null. A node size of null indicates that a [layout size](#cluster_size) will be used instead. When a node size is specified, the root node is always positioned at ⟨0, 0⟩.

## *cluster*.separation(*separation*) {#cluster_separation}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/cluster.js) · If *separation* is specified, sets the separation accessor to the specified function and returns this cluster layout. If *separation* is not specified, returns the current separation accessor, which defaults to:

```js
function separation(a, b) {
  return a.parent == b.parent ? 1 : 2;
}
```

The separation accessor is used to separate neighboring leaves. The separation function is passed two leaves *a* and *b*, and must return the desired separation. The nodes are typically siblings, though the nodes may be more distantly related if the layout decides to place such nodes adjacent.

# docs/d3-hierarchy/hierarchy.md

# Hierarchies

Before you can compute a [hierarchical layout](../d3-hierarchy.md), you need a root node. If your data is already in a hierarchical format, such as JSON, you can pass it directly to [hierarchy](#hierarchy); otherwise, you can rearrange tabular data, such as comma-separated values (CSV), into a hierarchy using [stratify](./stratify.md).

## hierarchy(*data*, *children*) {#hierarchy}

[Examples](https://observablehq.com/@d3/d3-hierarchy) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/index.js) · Constructs a root node from the specified hierarchical *data*. The specified *data* must be an object representing the root node. For example:

```js
const data = {
  name: "Eve",
  children: [
    {name: "Cain"},
    {name: "Seth", children: [{name: "Enos"}, {name: "Noam"}]},
    {name: "Abel"},
    {name: "Awan", children: [{name: "Enoch"}]},
    {name: "Azura"}
  ]
};
```

To construct a hierarchy:

```js
const root = d3.hierarchy(data);
```

The specified *children* accessor function is invoked for each datum, starting with the root *data*, and must return an iterable of data representing the children, if any. If the children accessor is not specified, it defaults to:

```js
function children(d) {
  return d.children;
}
```

If *data* is a Map, it is implicitly converted to the entry [undefined, *data*], and the children accessor instead defaults to:

```js
function children(d) {
  return Array.isArray(d) ? d[1] : null;
}
```

This allows you to pass the result of [group](../d3-array/group.md#group) or [rollup](../d3-array/group.md#rollup) to hierarchy.

The returned root node and each descendant has the following properties:

* *node*.data - the associated data as passed to [hierarchy](#hierarchy)
* *node*.depth - zero for the root, increasing by one for each descendant generation
* *node*.height - the greatest distance from any descendant leaf, or zero for leaves
* *node*.parent - the parent node, or null for the root node
* *node*.children - an array of child nodes, if any, or undefined for leaves
* *node*.value - the optional summed value of the node and its [descendants](#node_descendants)

This method can also be used to test if a node is an `instanceof d3.hierarchy` and to extend the node prototype.

## *node*.ancestors() {#node_ancestors}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/ancestors.js) · Returns the array of ancestors nodes, starting with this node, then followed by each parent up to the root.

## *node*.descendants() {#node_descendants}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/descendants.js) · Returns the array of descendant nodes, starting with this node, then followed by each child in topological order.

## *node*.leaves() {#node_leaves}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/leaves.js) · Returns the array of leaf nodes in traversal order. A *leaf* is a node with no children.

## *node*.find(*filter*) {#node_find}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/find.js) · Returns the first node in the hierarchy from this *node* for which the specified *filter* returns a truthy value. Returns undefined if no such node is found.

## *node*.path(*target*) {#node_path}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/path.js) · Returns the shortest path through the hierarchy from this *node* to the specified *target* node. The path starts at this *node*, ascends to the least common ancestor of this *node* and the *target* node, and then descends to the *target* node. This is useful for [hierarchical edge bundling](https://observablehq.com/@d3/hierarchical-edge-bundling).

## *node*.links() {#node_links}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/links.js) · Returns an array of links for this *node* and its descendants, where each *link* is an object that defines source and target properties. The source of each link is the parent node, and the target is a child node.

## *node*.sum(*value*) {#node_sum}

[Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/sum.js) · Evaluates the specified *value* function for this *node* and each descendant in [post-order traversal](#node_eachAfter), and returns this *node*. The *node*.value property of each node is set to the numeric value returned by the specified function plus the combined value of all children. The function is passed the node’s data, and must return a non-negative number. The *value* accessor is evaluated for *node* and every descendant, including internal nodes; if you only want leaf nodes to have internal value, then return zero for any node with children. [For example](https://observablehq.com/@d3/treemap-by-count), as an alternative to [*node*.count](#node_count):

```js
root.sum((d) => d.value ? 1 : 0);
```

You must call *node*.sum or [*node*.count](#node_count) before invoking a hierarchical layout that requires *node*.value, such as [treemap](./treemap.md). For example:

```js
// Construct the treemap layout.
const treemap = d3.treemap();
treemap.size([width, height]);
treemap.padding(2);

// Sum and sort the data.
root.sum((d) => d.value);
root.sort((a, b) => b.height - a.height || b.value - a.value);

// Compute the treemap layout.
treemap(root);

// Retrieve all descendant nodes.
const nodes = root.descendants();
```

Since the API supports [method chaining](https://en.wikipedia.org/wiki/Method_chaining), you can also say:

```js
d3.treemap()
    .size([width, height])
    .padding(2)
  (root
      .sum((d) => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value))
  .descendants()
```

This example assumes that the node data has a value field.

## *node*.count() {#node_count}

[Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/count.js) · Computes the number of leaves under this *node* and assigns it to *node*.value, and similarly for every descendant of *node*. If this *node* is a leaf, its count is one. Returns this *node*. See also [*node*.sum](#node_sum).

## *node*.sort(compare) {#node_sort}

[Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/sort.js) · Sorts the children of this *node*, if any, and each of this *node*’s descendants’ children, in [pre-order traversal](#node_eachBefore) using the specified *compare* function, and returns this *node*.

The specified function is passed two nodes *a* and *b* to compare. If *a* should be before *b*, the function must return a value less than zero; if *b* should be before *a*, the function must return a value greater than zero; otherwise, the relative order of *a* and *b* are not specified. See [*array*.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) for more.

Unlike [*node*.sum](#node_sum), the *compare* function is passed two [nodes](#hierarchy) rather than two nodes’ data. For example, if the data has a value property, this sorts nodes by the descending aggregate value of the node and all its descendants, as is recommended for [circle-packing](./pack.md):

```js
root
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value);
```

Similarly, to sort nodes by descending height (greatest distance from any descendant leaf) and then descending value, as is recommended for [treemaps](./treemap.md) and [icicles](./partition.md):

```js
root
    .sum((d) => d.value)
    .sort((a, b) => b.height - a.height || b.value - a.value);
```

To sort nodes by descending height and then ascending id, as is recommended for [trees](./tree.md) and [dendrograms](./cluster.md):

```js
root
    .sum((d) => d.value)
    .sort((a, b) => b.height - a.height || d3.ascending(a.id, b.id));
```

You must call *node*.sort before invoking a hierarchical layout if you want the new sort order to affect the layout; see [*node*.sum](#node_sum) for an example.

## node[Symbol.iterator]\(\) {#node_iterator}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/iterator.js) · Returns an iterator over the *node*’s descendants in breadth-first order. For example:

```js
for (const descendant of node) {
  console.log(descendant);
}
```

## *node*.each(*function*, *that*) {#node_each}

[Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/each.js) · Invokes the specified *function* for *node* and each descendant in [breadth-first order](https://en.wikipedia.org/wiki/Breadth-first_search), such that a given *node* is only visited if all nodes of lesser depth have already been visited, as well as all preceding nodes of the same depth. The specified function is passed the current *descendant*, the zero-based traversal *index*, and this *node*. If *that* is specified, it is the this context of the callback.

## *node*.eachAfter(*function*, *that*) {#node_eachAfter}

[Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/eachAfter.js) · Invokes the specified *function* for *node* and each descendant in [post-order traversal](https://en.wikipedia.org/wiki/Tree_traversal#Post-order), such that a given *node* is only visited after all of its descendants have already been visited. The specified function is passed the current *descendant*, the zero-based traversal *index*, and this *node*. If *that* is specified, it is the this context of the callback.

## *node*.eachBefore(*function*, *that*) {#node_eachBefore}

[Examples](https://observablehq.com/@d3/visiting-a-d3-hierarchy) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/eachBefore.js) · Invokes the specified *function* for *node* and each descendant in [pre-order traversal](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order), such that a given *node* is only visited after all of its ancestors have already been visited. The specified function is passed the current *descendant*, the zero-based traversal *index*, and this *node*. If *that* is specified, it is the this context of the callback.

## *node*.copy() {#node_copy}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/hierarchy/index.js) · Return a deep copy of the subtree starting at this *node*. (The returned deep copy shares the same data, however.) The returned node is the root of a new tree; the returned node’s parent is always null and its depth is always zero.

# docs/d3-hierarchy/pack.md

# Pack {#Pack}

[<img alt="Circle-Packing" src="https://raw.githubusercontent.com/d3/d3-hierarchy/main/img/pack.png">](https://observablehq.com/@d3/circle-packing)

[Examples](https://observablehq.com/@d3/circle-packing) · Enclosure diagrams use containment (nesting) to represent a hierarchy. The size of the leaf circles encodes a quantitative dimension of the data. The enclosing circles show the approximate cumulative size of each subtree, but due to wasted space there is some distortion; only the leaf nodes can be compared accurately. Although [circle packing](http://en.wikipedia.org/wiki/Circle_packing) does not use space as efficiently as a [treemap](./treemap.md), the “wasted” space more prominently reveals the hierarchical structure.

## pack() {#pack}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/pack/index.js) · Creates a new pack layout with the default settings.

### *pack*(*root*) {#_pack}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/pack/index.js) · Lays out the specified *root* [hierarchy](./hierarchy.md), assigning the following properties on *root* and its descendants:

* *node*.x - the *x*-coordinate of the circle’s center
* *node*.y - the y coordinate of the circle’s center
* *node*.r - the radius of the circle

You must call [*root*.sum](./hierarchy.md#node_sum) before passing the hierarchy to the pack layout. You probably also want to call [*root*.sort](./hierarchy.md#node_sort) to order the hierarchy before computing the layout.

## *pack*.radius(*radius*) {#pack_radius}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/pack/index.js) · If *radius* is specified, sets the pack layout’s radius accessor to the specified function and returns this pack layout. If *radius* is not specified, returns the current radius accessor, which defaults to null. If the radius accessor is null, the radius of each leaf circle is derived from the leaf *node*.value (computed by [*node*.sum](./hierarchy.md#node_sum)); the radii are then scaled proportionally to fit the [layout size](#pack_size). If the radius accessor is not null, the radius of each leaf circle is specified exactly by the function.

## *pack*.size(*size*) {#pack_size}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/pack/index.js) · If *size* is specified, sets this pack layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this pack layout. If *size* is not specified, returns the current size, which defaults to [1, 1].

## *pack*.padding(*padding*) {#pack_padding}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/pack/index.js) · If *padding* is specified, sets this pack layout’s padding accessor to the specified number or function and returns this pack layout. If *padding* is not specified, returns the current padding accessor, which defaults to the constant zero. When siblings are packed, tangent siblings will be separated by approximately the specified padding; the enclosing parent circle will also be separated from its children by approximately the specified padding. If an [explicit radius](#pack_radius) is not specified, the padding is approximate because a two-pass algorithm is needed to fit within the [layout size](#pack_size): the circles are first packed without padding; a scaling factor is computed and applied to the specified padding; and lastly the circles are re-packed with padding.

## packSiblings(*circles*) {#packSiblings}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/pack/siblings.js) · Packs the specified array of *circles*, each of which must have a *circle*.r property specifying the circle’s radius. Assigns the following properties to each circle:

* *circle*.x - the *x*-coordinate of the circle’s center
* *circle*.y - the y coordinate of the circle’s center

The circles are positioned according to the front-chain packing algorithm by [Wang *et al.*](https://dl.acm.org/citation.cfm?id=1124851)

## packEnclose(*circles*) {#packEnclose}

[Examples](https://observablehq.com/@d3/d3-packenclose) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/pack/enclose.js) · Computes the [smallest circle](https://en.wikipedia.org/wiki/Smallest-circle_problem) that encloses the specified array of *circles*, each of which must have a *circle*.r property specifying the circle’s radius, and *circle*.x and *circle*.y properties specifying the circle’s center. The enclosing circle is computed using the [Matoušek-Sharir-Welzl algorithm](http://www.inf.ethz.ch/personal/emo/PublFiles/SubexLinProg_ALG16_96.pdf). (See also [Apollonius’ Problem](https://observablehq.com/@d3/apollonius-problem).)

# docs/d3-hierarchy/partition.md

# Partition {#Partition}

[<img alt="Partition" src="https://raw.githubusercontent.com/d3/d3-hierarchy/main/img/partition.png">](https://observablehq.com/@d3/icicle/2)

[Examples](https://observablehq.com/@d3/icicle/2) · The partition layout produces adjacency diagrams: a space-filling variant of a [node-link tree diagram](./tree.md). Rather than drawing a link between parent and child in the hierarchy, nodes are drawn as solid areas (either arcs or rectangles), and their placement relative to other nodes reveals their position in the hierarchy. The size of the nodes encodes a quantitative dimension that would be difficult to show in a node-link diagram.

## partition() {#partition}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/partition.js) · Creates a new partition layout with the default settings.

## *partition*(*root*) {#_partition}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/partition.js) · Lays out the specified *root* [hierarchy](./hierarchy.md), assigning the following properties on *root* and its descendants:

* *node*.x0 - the left edge of the rectangle
* *node*.y0 - the top edge of the rectangle
* *node*.x1 - the right edge of the rectangle
* *node*.y1 - the bottom edge of the rectangle

You must call [*root*.sum](./hierarchy.md#node_sum) before passing the hierarchy to the partition layout. You probably also want to call [*root*.sort](./hierarchy.md#node_sort) to order the hierarchy before computing the layout.

## *partition*.size(*size*) {#partition_size}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/partition.js) · If *size* is specified, sets this partition layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this partition layout. If *size* is not specified, returns the current size, which defaults to [1, 1].

## *partition*.round(*round*) {#partition_round}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/partition.js) · If *round* is specified, enables or disables rounding according to the given boolean and returns this partition layout. If *round* is not specified, returns the current rounding state, which defaults to false.

## *partition*.padding(*padding*) {#partition_padding}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/partition.js) · If *padding* is specified, sets the padding to the specified number and returns this partition layout. If *padding* is not specified, returns the current padding, which defaults to zero. The padding is used to separate a node’s adjacent children.

# docs/d3-hierarchy/stratify.md

# Stratify {#Stratify}

[Examples](https://observablehq.com/@d3/d3-stratify) · Consider the following table of relationships:

Name  | Parent
------|--------
Eve   |
Cain  | Eve
Seth  | Eve
Enos  | Seth
Noam  | Seth
Abel  | Eve
Awan  | Eve
Enoch | Awan
Azura | Eve

These names are conveniently unique, so we can unambiguously represent the hierarchy as a CSV file:

```
name,parent
Eve,
Cain,Eve
Seth,Eve
Enos,Seth
Noam,Seth
Abel,Eve
Awan,Eve
Enoch,Awan
Azura,Eve
```

To parse the CSV using [csvParse](../d3-dsv.md#csvParse):

```js
const table = d3.csvParse(text);
```

This returns an array of {*name*, *parent*} objects:

```json
[
  {"name": "Eve",   "parent": ""},
  {"name": "Cain",  "parent": "Eve"},
  {"name": "Seth",  "parent": "Eve"},
  {"name": "Enos",  "parent": "Seth"},
  {"name": "Noam",  "parent": "Seth"},
  {"name": "Abel",  "parent": "Eve"},
  {"name": "Awan",  "parent": "Eve"},
  {"name": "Enoch", "parent": "Awan"},
  {"name": "Azura", "parent": "Eve"}
]
```

To convert to a [hierarchy](./hierarchy.md):

```js
const root = d3.stratify()
    .id((d) => d.name)
    .parentId((d) => d.parent)
  (table);
```

This hierarchy can now be passed to a hierarchical layout, such as [tree](./tree.md), for visualization.

The stratify operator also works with [delimited paths](#stratify_path) as is common in file systems.

## stratify() {#stratify}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/stratify.js) · Constructs a new stratify operator with the default settings.

```js
const stratify = d3.stratify();
```

## *stratify*(*data*) {#_stratify}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/stratify.js) · Generates a new hierarchy from the specified tabular *data*.

```js
const root = stratify(data);
```

## *stratify*.id(*id*) {#stratify_id}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/stratify.js) · If *id* is specified, sets the id accessor to the given function and returns this stratify operator. Otherwise, returns the current id accessor, which defaults to:

```js
function id(d) {
  return d.id;
}
```

The id accessor is invoked for each element in the input data passed to the [stratify operator](#_stratify), being passed the current datum (*d*) and the current index (*i*). The returned string is then used to identify the node’s relationships in conjunction with the [parent id](#stratify_parentId). For leaf nodes, the id may be undefined; otherwise, the id must be unique. (Null and the empty string are equivalent to undefined.)

## *stratify*.parentId(*parentId*) {#stratify_parentId}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/stratify.js) · If *parentId* is specified, sets the parent id accessor to the given function and returns this stratify operator. Otherwise, returns the current parent id accessor, which defaults to:

```js
function parentId(d) {
  return d.parentId;
}
```

The parent id accessor is invoked for each element in the input data passed to the [stratify operator](#_stratify), being passed the current datum (*d*) and the current index (*i*). The returned string is then used to identify the node’s relationships in conjunction with the [id](#stratify_id). For the root node, the parent id should be undefined. (Null and the empty string are equivalent to undefined.) There must be exactly one root node in the input data, and no circular relationships.

## *stratify*.path(*path*) {#stratify_path}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/stratify.js) · If *path* is specified, sets the path accessor to the given function and returns this stratify operator. Otherwise, returns the current path accessor, which defaults to undefined.

If a path accessor is set, the [id](#stratify_id) and [parentId](#stratify_parentId) accessors are ignored, and a unix-like hierarchy is computed on the slash-delimited strings returned by the path accessor, imputing parent nodes and ids as necessary.

For example, given the output of the UNIX find command in the local directory:

```js
const paths = [
  "axes.js",
  "channel.js",
  "context.js",
  "legends.js",
  "legends/ramp.js",
  "marks/density.js",
  "marks/dot.js",
  "marks/frame.js",
  "scales/diverging.js",
  "scales/index.js",
  "scales/ordinal.js",
  "stats.js",
  "style.js",
  "transforms/basic.js",
  "transforms/bin.js",
  "transforms/centroid.js",
  "warnings.js",
];
```

You can say:

```js
const root = d3.stratify().path((d) => d)(paths);
```

# docs/d3-hierarchy/tree.md

<script setup>

import * as Plot from "@observablehq/plot";
import PlotRender from "../components/PlotRender.js";

const gods = [
  "Chaos/Gaia/Mountains",
  "Chaos/Gaia/Pontus",
  "Chaos/Gaia/Uranus",
  "Chaos/Eros",
  "Chaos/Erebus",
  "Chaos/Tartarus"
];

</script>

# Tree {#Tree}

<PlotRender :options='{
  axis: null,
  height: 100,
  margin: 20,
  marginRight: 120,
  marks: [
    Plot.tree(gods, {textStroke: "var(--vp-c-bg)"})
  ]
}' />

[Examples](https://observablehq.com/@d3/tidy-tree) · The tree layout produces tidy node-link diagrams of trees using the [Reingold–Tilford “tidy” algorithm](http://reingold.co/tidier-drawings.pdf), improved to run in linear time by [Buchheim *et al.*](http://dirk.jivas.de/papers/buchheim02improving.pdf) Tidy trees are typically more compact than [dendrograms](./cluster.md).

## tree() {#tree}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/tree.js) · Creates a new tree layout with default settings.

## *tree*(*root*) {#_tree}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/tree.js) · Lays out the specified *root* [hierarchy](./hierarchy.md), assigning the following properties on *root* and its descendants:

* *node*.x - the *x*-coordinate of the node
* *node*.y - the y coordinate of the node

The coordinates *x* and *y* represent an arbitrary coordinate system; for example, you can treat *x* as an angle and *y* as a radius to produce a [radial layout](https://observablehq.com/@d3/radial-tidy-tree). You may want to call [*root*.sort](./hierarchy.md#node_sort) before passing the hierarchy to the tree layout.

## *tree*.size(*size*) {#tree_size}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/tree.js) · If *size* is specified, sets this tree layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this tree layout. If *size* is not specified, returns the current layout size, which defaults to [1, 1]. A layout size of null indicates that a [node size](#tree_nodeSize) will be used instead. The coordinates *x* and *y* represent an arbitrary coordinate system; for example, to produce a [radial layout](https://observablehq.com/@d3/radial-tidy-tree), a size of [360, *radius*] corresponds to a breadth of 360° and a depth of *radius*.

## *tree*.nodeSize(*size*) {#tree_nodeSize}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/tree.js) · If *size* is specified, sets this tree layout’s node size to the specified two-element array of numbers [*width*, *height*] and returns this tree layout. If *size* is not specified, returns the current node size, which defaults to null. A node size of null indicates that a [layout size](#tree_size) will be used instead. When a node size is specified, the root node is always positioned at ⟨0, 0⟩.

## *tree*.separation(*separation*) {#tree_separation}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/tree.js) · If *separation* is specified, sets the separation accessor to the specified function and returns this tree layout. If *separation* is not specified, returns the current separation accessor, which defaults to:

```js
function separation(a, b) {
  return a.parent == b.parent ? 1 : 2;
}
```

A variation that is more appropriate for radial layouts reduces the separation gap proportionally to the radius:

```js
function separation(a, b) {
  return (a.parent == b.parent ? 1 : 2) / a.depth;
}
```

The separation accessor is used to separate neighboring nodes. The separation function is passed two nodes *a* and *b*, and must return the desired separation. The nodes are typically siblings, though the nodes may be more distantly related if the layout decides to place such nodes adjacent.

# docs/d3-hierarchy/treemap.md

# Treemap {#Treemap}

[<img alt="Treemap" src="https://raw.githubusercontent.com/d3/d3-hierarchy/main/img/treemap.png">](https://observablehq.com/@d3/treemap/2)

[Examples](https://observablehq.com/@d3/treemap/2) · Introduced by [Ben Shneiderman](http://www.cs.umd.edu/hcil/treemap-history/) in 1991, a **treemap** recursively subdivides area into rectangles according to each node’s associated value. D3’s treemap implementation supports an extensible [tiling method](#treemap_tile): the default [squarified](#treemapSquarify) method seeks to generate rectangles with a [golden](https://en.wikipedia.org/wiki/Golden_ratio) aspect ratio; this offers better readability and size estimation than [slice-and-dice](#treemapSliceDice), which simply alternates between horizontal and vertical subdivision by depth.

## treemap() {#treemap}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · Creates a new treemap layout with default settings.

## *treemap*(*root*) {#_treemap}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · Lays out the specified *root* [hierarchy](./hierarchy.md), assigning the following properties on *root* and its descendants:

* *node*.x0 - the left edge of the rectangle
* *node*.y0 - the top edge of the rectangle
* *node*.x1 - the right edge of the rectangle
* *node*.y1 - the bottom edge of the rectangle

You must call [*root*.sum](./hierarchy.md#node_sum) before passing the hierarchy to the treemap layout. You probably also want to call [*root*.sort](./hierarchy.md#node_sort) to order the hierarchy before computing the layout.

## *treemap*.tile(*tile*) {#treemap_tile}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *tile* is specified, sets the [tiling method](#treemap-tiling) to the specified function and returns this treemap layout. If *tile* is not specified, returns the current tiling method, which defaults to [treemapSquarify](#treemapSquarify) with the golden ratio.

## *treemap*.size(*size*) {#treemap_size}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *size* is specified, sets this treemap layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this treemap layout. If *size* is not specified, returns the current size, which defaults to [1, 1].

## *treemap*.round(*round*) {#treemap_round}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *round* is specified, enables or disables rounding according to the given boolean and returns this treemap layout. If *round* is not specified, returns the current rounding state, which defaults to false.

## *treemap*.padding(*padding*) {#treemap_padding}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *padding* is specified, sets the [inner](#treemap_paddingInner) and [outer](#treemap_paddingOuter) padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current inner padding function.

## *treemap*.paddingInner(*padding*) {#treemap_paddingInner}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *padding* is specified, sets the inner padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current inner padding function, which defaults to the constant zero. If *padding* is a function, it is invoked for each node with children, being passed the current node. The inner padding is used to separate a node’s adjacent children.

## *treemap*.paddingOuter(*padding*) {#treemap_paddingOuter}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *padding* is specified, sets the [top](#treemap_paddingTop), [right](#treemap_paddingRight), [bottom](#treemap_paddingBottom) and [left](#treemap_paddingLeft) padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current top padding function.

## *treemap*.paddingTop(*padding*) {#treemap_paddingTop}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *padding* is specified, sets the top padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current top padding function, which defaults to the constant zero. If *padding* is a function, it is invoked for each node with children, being passed the current node. The top padding is used to separate the top edge of a node from its children.

## *treemap*.paddingRight(*padding*) {#treemap_paddingRight}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *padding* is specified, sets the right padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current right padding function, which defaults to the constant zero. If *padding* is a function, it is invoked for each node with children, being passed the current node. The right padding is used to separate the right edge of a node from its children.

## *treemap*.paddingBottom(*padding*) {#treemap_paddingBottom}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *padding* is specified, sets the bottom padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current bottom padding function, which defaults to the constant zero. If *padding* is a function, it is invoked for each node with children, being passed the current node. The bottom padding is used to separate the bottom edge of a node from its children.

## *treemap*.paddingLeft(*padding*) {#treemap_paddingLeft}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/index.js) · If *padding* is specified, sets the left padding to the specified number or function and returns this treemap layout. If *padding* is not specified, returns the current left padding function, which defaults to the constant zero. If *padding* is a function, it is invoked for each node with children, being passed the current node. The left padding is used to separate the left edge of a node from its children.

## Treemap tiling

Several built-in tiling methods are provided for use with [*treemap*.tile](#treemap_tile).

### treemapBinary(*node*, *x0*, *y0*, *x1*, *y1*) {#treemapBinary}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/binary.js) · Recursively partitions the specified *nodes* into an approximately-balanced binary tree, choosing horizontal partitioning for wide rectangles and vertical partitioning for tall rectangles.

### treemapDice(*node*, *x0*, *y0*, *x1*, *y1*) {#treemapDice}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/dice.js) · Divides the rectangular area specified by *x0*, *y0*, *x1*, *y1* horizontally according the value of each of the specified *node*’s children. The children are positioned in order, starting with the left edge (*x0*) of the given rectangle. If the sum of the children’s values is less than the specified *node*’s value (*i.e.*, if the specified *node* has a non-zero internal value), the remaining empty space will be positioned on the right edge (*x1*) of the given rectangle.

### treemapSlice(*node*, *x0*, *y0*, *x1*, *y1*) {#treemapSlice}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/slice.js) · Divides the rectangular area specified by *x0*, *y0*, *x1*, *y1* vertically according the value of each of the specified *node*’s children. The children are positioned in order, starting with the top edge (*y0*) of the given rectangle. If the sum of the children’s values is less than the specified *node*’s value (*i.e.*, if the specified *node* has a non-zero internal value), the remaining empty space will be positioned on the bottom edge (*y1*) of the given rectangle.

### treemapSliceDice(*node*, *x0*, *y0*, *x1*, *y1*) {#treemapSliceDice}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/sliceDice.js) · If the specified *node* has odd depth, delegates to [treemapSlice](#treemapSlice); otherwise delegates to [treemapDice](#treemapDice).

### treemapSquarify(*node*, *x0*, *y0*, *x1*, *y1*) {#treemapSquarify}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/squarify.js) · Implements the [squarified treemap](https://www.win.tue.nl/~vanwijk/stm.pdf) algorithm by Bruls *et al.*, which seeks to produce rectangles of a given [aspect ratio](#squarify_ratio).

### treemapResquarify(*node*, *x0*, *y0*, *x1*, *y1*) {#treemapResquarify}

[Examples](https://observablehq.com/@d3/animated-treemap) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/resquarify.js) · Like [treemapSquarify](#treemapSquarify), except preserves the topology (node adjacencies) of the previous layout computed by d3.treemapResquarify, if there is one and it used the same [target aspect ratio](#squarify_ratio). This tiling method is good for animating changes to treemaps because it only changes node sizes and not their relative positions, thus avoiding distracting shuffling and occlusion. The downside of a stable update, however, is a suboptimal layout for subsequent updates: only the first layout uses the Bruls *et al.* squarified algorithm.

### *squarify*.ratio(*ratio*) {#squarify_ratio}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/treemap/squarify.js) · Specifies the desired aspect ratio of the generated rectangles. The *ratio* must be specified as a number greater than or equal to one. Note that the orientation of the generated rectangles (tall or wide) is not implied by the ratio; for example, a ratio of two will attempt to produce a mixture of rectangles whose *width*:*height* ratio is either 2:1 or 1:2. (However, you can approximately achieve this result by generating a square treemap at different dimensions, and then [stretching the treemap](https://observablehq.com/@d3/stretched-treemap) to the desired aspect ratio.) Furthermore, the specified *ratio* is merely a hint to the tiling algorithm; the rectangles are not guaranteed to have the specified aspect ratio. If not specified, the aspect ratio defaults to the golden ratio, φ = (1 + sqrt(5)) / 2, per [Kong *et al.*](http://vis.stanford.edu/papers/perception-treemaps)

# docs/d3-interpolate.md

<script setup>

import * as d3 from "d3";
import ColorRamp from "./components/ColorRamp.vue";

</script>

# d3-interpolate

This module provides a variety of interpolation methods for blending between two values. Values may be numbers, colors, strings, arrays, or even deeply-nested objects. For example:

```js
const i = d3.interpolateNumber(10, 20);
i(0.0); // 10
i(0.2); // 12
i(0.5); // 15
i(1.0); // 20
```

The returned function `i` is an *interpolator*. Given a starting value *a* and an ending value *b*, it takes a parameter *t* typically in [0, 1] and returns the corresponding interpolated value. An interpolator typically returns a value equivalent to *a* at *t* = 0 and a value equivalent to *b* at *t* = 1.

You can interpolate more than just numbers. To find the perceptual midpoint between steelblue and brown:

```js
d3.interpolateLab("steelblue", "brown")(0.5); // "rgb(142, 92, 109)"
```

Or, as a color ramp from *t* = 0 to *t* = 1:

<ColorRamp :color='d3.interpolateLab("steelblue", "brown")' />

Here’s a more elaborate example demonstrating type inference used by [interpolate](./d3-interpolate/value.md#interpolate):

```js
const i = d3.interpolate({colors: ["red", "blue"]}, {colors: ["white", "black"]});
i(0.0); // {colors: ["rgb(255, 0, 0)", "rgb(0, 0, 255)"]}
i(0.5); // {colors: ["rgb(255, 128, 128)", "rgb(0, 0, 128)"]}
i(1.0); // {colors: ["rgb(255, 255, 255)", "rgb(0, 0, 0)"]}
```

Note that the generic value interpolator detects not only nested objects and arrays, but also color strings and numbers embedded in strings!

See one of:

* [Value interpolation](./d3-interpolate/value.md)
* [Color interpolation](./d3-interpolate/color.md)
* [Transform interpolation](./d3-interpolate/transform.md)
* [Zoom interpolation](./d3-interpolate/zoom.md)

# docs/d3-interpolate/color.md

<script setup>

import * as d3 from "d3";
import ColorRamp from "../components/ColorRamp.vue";

</script>

# Color interpolation

Interpolators for colors in various color spaces.

## interpolateRgb(*a*, *b*) {#interpolateRgb}

<ColorRamp :color="d3.interpolateRgb('purple', 'orange')" />

```js
d3.interpolateRgb("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/rgb.js) · Returns an RGB color space interpolator between the two colors *a* and *b* with a configurable [gamma](#interpolateColor_gamma). If the gamma is not specified, it defaults to 1.0. The colors *a* and *b* need not be in RGB; they will be converted to RGB using [d3.rgb](../d3-color.md#rgb). The return value of the interpolator is an RGB string.

## interpolateRgbBasis(*colors*) {#interpolateRgbBasis}

<ColorRamp :color="d3.interpolateRgbBasis(['purple', 'green', 'orange'])" />

```js
d3.interpolateRgbBasis(["purple", "green", "orange"])
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/rgb.js) · Returns a uniform nonrational B-spline interpolator through the specified array of *colors*, which are converted to [RGB color space](../d3-color.md#rgb). Implicit control points are generated such that the interpolator returns *colors*[0] at *t* = 0 and *colors*[*colors*.length - 1] at *t* = 1. Opacity interpolation is not currently supported. See also [d3.interpolateBasis](./value.md#interpolateBasis), and see [d3-scale-chromatic](../d3-scale-chromatic.md) for examples.

## interpolateRgbBasisClosed(*colors*) {#interpolateRgbBasisClosed}

<ColorRamp :color="d3.interpolateRgbBasisClosed(['purple', 'green', 'orange'])" />

```js
d3.interpolateRgbBasisClosed(["purple", "green", "orange"])
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/rgb.js) · Returns a uniform nonrational B-spline interpolator through the specified array of *colors*, which are converted to [RGB color space](../d3-color.md#rgb). The control points are implicitly repeated such that the resulting spline has cyclical C² continuity when repeated around *t* in [0,1]; this is useful, for example, to create cyclical color scales. Opacity interpolation is not currently supported. See also [d3.interpolateBasisClosed](./value.md#interpolateBasisClosed), and see [d3-scale-chromatic](../d3-scale-chromatic.md) for examples.

## interpolateHsl(*a*, *b*) {#interpolateHsl}

<ColorRamp :color="d3.interpolateHsl('purple', 'orange')" />

```js
d3.interpolateHsl("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/hsl.js) · Returns an HSL color space interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in HSL; they will be converted to HSL using [d3.hsl](../d3-color.md#hsl). If either color’s hue or saturation is NaN, the opposing color’s channel value is used. The shortest path between hues is used. The return value of the interpolator is an RGB string.

## interpolateHslLong(*a*, *b*) {#interpolateHslLong}

<ColorRamp :color="d3.interpolateHslLong('purple', 'orange')" />

```js
d3.interpolateHslLong("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/hsl.js) · Like [interpolateHsl](#interpolateHsl), but does not use the shortest path between hues.

## interpolateLab(*a*, *b*) {#interpolateLab}

<ColorRamp :color="d3.interpolateLab('purple', 'orange')" />

```js
d3.interpolateLab("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/lab.js) · Returns a [CIELAB color space](https://en.wikipedia.org/wiki/Lab_color_space#CIELAB) interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in CIELAB; they will be converted to CIELAB using [d3.lab](../d3-color.md#lab). The return value of the interpolator is an RGB string.

## interpolateHcl(*a*, *b*) {#interpolateHcl}

<ColorRamp :color="d3.interpolateHcl('purple', 'orange')" />

```js
d3.interpolateHcl("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/hcl.js) · Returns a [CIELCh<sub>ab</sub> color space](https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_representation:_CIELCh_or_CIEHLC) interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in CIELCh<sub>ab</sub>; they will be converted to CIELCh<sub>ab</sub> using [d3.hcl](../d3-color.md#hcl). If either color’s hue or chroma is NaN, the opposing color’s channel value is used. The shortest path between hues is used. The return value of the interpolator is an RGB string.

## interpolateHclLong(*a*, *b*) {#interpolateHclLong}

<ColorRamp :color="d3.interpolateHclLong('purple', 'orange')" />

```js
d3.interpolateHclLong("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/hcl.js) · Like [interpolateHcl](#interpolateHcl), but does not use the shortest path between hues.

## interpolateCubehelix(*a*, *b*) {#interpolateCubehelix}

<ColorRamp :color="d3.interpolateCubehelix('purple', 'orange')" />

```js
d3.interpolateCubehelix("purple", "orange")
```

<ColorRamp :color="d3.interpolateCubehelix.gamma(3)('purple', 'orange')" />

```js
d3.interpolateCubehelix.gamma(3)("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/cubehelix.js) · Returns a Cubehelix color space interpolator between the two colors *a* and *b* using a configurable [gamma](#interpolateColor_gamma). If the gamma is not specified, it defaults to 1.0. The colors *a* and *b* need not be in Cubehelix; they will be converted to Cubehelix using [d3.cubehelix](../d3-color.md#cubehelix). If either color’s hue or saturation is NaN, the opposing color’s channel value is used. The shortest path between hues is used. The return value of the interpolator is an RGB string.

## interpolateCubehelixLong(*a*, *b*) {#interpolateCubehelixLong}

<ColorRamp :color="d3.interpolateCubehelixLong('purple', 'orange')" />

```js
d3.interpolateCubehelixLong("purple", "orange")
```

<ColorRamp :color="d3.interpolateCubehelixLong.gamma(3)('purple', 'orange')" />

```js
d3.interpolateCubehelixLong.gamma(3)("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/cubehelix.js) · Like [interpolateCubehelix](#interpolateCubehelix), but does not use the shortest path between hues.

## *interpolateColor*.gamma(*gamma*) {#interpolateColor_gamma}

<ColorRamp :color="d3.interpolateRgb.gamma(2.2)('purple', 'orange')" />

```js
d3.interpolateRgb.gamma(2.2)("purple", "orange")
```

Given that *interpolate* is one of [interpolateRgb](#interpolateRgb), [interpolateCubehelix](#interpolateCubehelix) or [interpolateCubehelixLong](#interpolateCubehelixLong), returns a new interpolator factory of the same type using the specified *gamma*. See Eric Brasseur’s article, [Gamma error in picture scaling](http://www.ericbrasseur.org/gamma.html), for more on gamma correction.

## interpolateHue(*a*, *b*) {#interpolateHue}

```js
d3.interpolateHue(20, 340)(0.5) // 0
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/hue.js) · Returns an interpolator between the two hue angles *a* and *b*. If either hue is NaN, the opposing value is used. The shortest path between hues is used. The return value of the interpolator is a number in [0, 360).

Whereas standard interpolators blend from a starting value *a* at *t* = 0 to an ending value *b* at *t* = 1, spline interpolators smoothly blend multiple input values for *t* in [0,1] using piecewise polynomial functions. Only cubic uniform nonrational [B-splines](https://en.wikipedia.org/wiki/B-spline) are currently supported, also known as basis splines.

# docs/d3-interpolate/transform.md

# Transform interpolation

Interpolators for CSS and SVG transforms. The interpolation method is standardized by CSS: see [matrix decomposition for animation](http://www.w3.org/TR/css3-2d-transforms/#matrix-decomposition).

## interpolateTransformCss(*a*, *b*) {#interpolateTransformCss}

```js
d3.interpolateTransformCss("translateY(12px) scale(2)", "translateX(30px) rotate(5deg)")(0.5) // "translate(15px,6px) rotate(2.5deg) scale(1.5,1.5)"
```

[Examples](https://observablehq.com/@d3/d3-interpolatetransformcss) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/transform/index.js) · Returns an interpolator between the two 2D CSS transforms represented by *a* and *b*. Each transform is decomposed to a standard representation of translate, rotate, *x*-skew and scale; these component transformations are then interpolated.

## interpolateTransformSvg(*a*, *b*) {#interpolateTransformSvg}

```js
d3.interpolateTransformSvg("skewX(-60)", "skewX(60) translate(280,0)") // "translate(140,0) skewX(0)"
```

[Examples](https://observablehq.com/@d3/d3-interpolatetransformcss) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/transform/index.js) · Returns an interpolator between the two 2D SVG transforms represented by *a* and *b*. Each transform is decomposed to a standard representation of translate, rotate, *x*-skew and scale; these component transformations are then interpolated.

# docs/d3-interpolate/value.md

<script setup>

import * as d3 from "d3";
import ColorRamp from "../components/ColorRamp.vue";
import ColorSwatches from "../components/ColorSwatches.vue";

</script>

# Value interpolation

These are the most general interpolators, suitable for most values.

## interpolate(*a*, *b*) {#interpolate}

[Examples](https://observablehq.com/@d3/d3-interpolate) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/value.js) · Returns an interpolator between the two arbitrary values *a* and *b*.

```js
d3.interpolate("red", "blue")(0.5) // "rgb(128, 0, 128)"
```

The interpolator implementation is based on the type of the end value *b*, using the following algorithm:

1. If *b* is null, undefined or a boolean, use the constant *b*.
2. If *b* is a number, use [interpolateNumber](#interpolateNumber).
3. If *b* is a [color](../d3-color.md#color) or a string coercible to a color, use [interpolateRgb](./color.md#interpolateRgb).
4. If *b* is a [date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), use [interpolateDate](#interpolateDate).
5. If *b* is a string, use [interpolateString](#interpolateString).
6. If *b* is a [typed array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) of numbers, use [interpolateNumberArray](#interpolateNumberArray).
7. If *b* is a generic [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray), use [interpolateArray](#interpolateArray).
8. If *b* is coercible to a number, use [interpolateNumber](#interpolateNumber).
9. Use [interpolateObject](#interpolateObject).

Based on the chosen interpolator, *a* is coerced to the suitable corresponding type.

## interpolateNumber(*a*, *b*) {#interpolateNumber}

[Examples](https://observablehq.com/@d3/d3-interpolatenumber) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/number.js) · Returns an interpolator between the two numbers *a* and *b*.

```js
d3.interpolateNumber(20, 620)(0.8) // 500
```

The returned interpolator is equivalent to:

```js
function interpolator(t) {
  return a * (1 - t) + b * t;
}
```

:::warning CAUTION
Avoid interpolating to or from the number zero when the interpolator is used to generate a string. When very small values are stringified, they may be converted to scientific notation, which is an invalid attribute or style property value in older browsers. For example, the number `0.0000001` is converted to the string `"1e-7"`. This is particularly noticeable with interpolating opacity. To avoid scientific notation, start or end the transition at 1e-6: the smallest value that is not stringified in scientific notation.
:::

## interpolateRound(*a*, *b*) {#interpolateRound}

[Examples](https://observablehq.com/@d3/d3-interpolatenumber) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/round.js) · Returns an interpolator between the two numbers *a* and *b*.

```js
d3.interpolateRound(20, 620)(0.821) // 513
```

The interpolator is similar to [interpolateNumber](#interpolateNumber) except it will round the resulting value to the nearest integer.

## interpolateString(*a*, *b*) {#interpolateString}

[Examples](https://observablehq.com/@d3/d3-interpolatestring) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/string.js) · Returns an interpolator between the two strings *a* and *b*.

```js
d3.interpolateString("20px", "32px")(0.5) // "26px"
```

The string interpolator finds numbers embedded in *a* and *b*, where each number is of the form understood by JavaScript. A few examples of numbers that will be detected within a string: `-1`, `42`, `3.14159`, and `6.0221413e+23`.

For each number embedded in *b*, the interpolator will attempt to find a corresponding number in *a*. If a corresponding number is found, a numeric interpolator is created using [interpolateNumber](#interpolateNumber). The remaining parts of the string *b* are used as a template: the static parts of the string *b* remain constant for the interpolation, with the interpolated numeric values embedded in the template.

For example, if *a* is `"300 12px sans-serif"`, and *b* is `"500 36px Comic-Sans"`, two embedded numbers are found. The remaining static parts (of string *b*) are a space between the two numbers (`" "`), and the suffix (`"px Comic-Sans"`). The result of the interpolator at *t* = 0.5 is `"400 24px Comic-Sans"`.

## interpolateDate(*a*, *b*) {#interpolateDate}

[Examples](https://observablehq.com/@d3/d3-interpolatedate) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/date.js) · Returns an interpolator between the two [dates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) *a* and *b*.

```js
d3.interpolateDate(new Date("2014-01-01"), new Date("2024-01-01"))(0.5) // 2019-01-01
```

:::warning CAUTION
**No defensive copy** of the returned date is created; the same Date instance is returned for every evaluation of the interpolator. No copy is made for performance reasons, as interpolators are often part of the inner loop of [animated transitions](../d3-transition.md).
:::

## interpolateArray(*a*, *b*) {#interpolateArray}

[Examples](https://observablehq.com/@d3/d3-interpolateobject) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/array.js) · Returns an interpolator between the two arrays *a* and *b*.

```js
d3.interpolateArray([0, 0, 0], [1, 2, 3])(0.5) // [0.5, 1, 1.5]
```

If *b* is a typed array (e.g., Float64Array), [interpolateNumberArray](#interpolateNumberArray) is called instead.

Internally, an array template is created that is the same length as *b*. For each element in *b*, if there exists a corresponding element in *a*, a generic interpolator is created for the two elements using [interpolate](#interpolate). If there is no such element, the static value from *b* is used in the template. Then, for the given parameter *t*, the template’s embedded interpolators are evaluated. The updated array template is then returned.

For example, if *a* is the array `[0, 1]` and *b* is the array `[1, 10, 100]`, then the result of the interpolator for *t* = 0.5 is the array `[0.5, 5.5, 100]`.

:::warning CAUTION
**No defensive copy** of the template array is created; modifications of the returned array may adversely affect subsequent evaluation of the interpolator. No copy is made for performance reasons; interpolators are often part of the inner loop of [animated transitions](../d3-transition.md).
:::

## interpolateNumberArray(*a*, *b*) {#interpolateNumberArray}

[Examples](https://observablehq.com/@d3/d3-interpolatenumberarray) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/numberArray.js) · Returns an interpolator between the two arrays of numbers *a* and *b*.

```js
d3.interpolateNumberArray([0, 1], Float64Array.of(1, 3))(0.5) // [0.5, 2]
```

Internally, an array template is created that is the same type and length as *b*. For each element in *b*, if there exists a corresponding element in *a*, the values are directly interpolated in the array template. If there is no such element, the static value from *b* is copied. The updated array template is then returned.

:::warning CAUTION
**No defensive copy** is made of the template array and the arguments *a* and *b*; modifications of these arrays may affect subsequent evaluation of the interpolator.
:::

## interpolateObject(*a*, *b*) {#interpolateObject}

[Examples](https://observablehq.com/@d3/d3-interpolateobject) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/object.js) · Returns an interpolator between the two objects *a* and *b*.

```js
d3.interpolateObject({x: 0, y: 1}, {x: 1, y: 10, z: 100})(0.5) // {x: 0.5, y: 5.5, z: 100}
```

Internally, an object template is created that has the same properties as *b*. For each property in *b*, if there exists a corresponding property in *a*, a generic interpolator is created for the two elements using [interpolate](#interpolate). If there is no such property, the static value from *b* is used in the template. Then, for the given parameter *t*, the template's embedded interpolators are evaluated and the updated object template is then returned.

For example, if *a* is the object `{x: 0, y: 1}` and *b* is the object `{x: 1, y: 10, z: 100}`, the result of the interpolator for *t* = 0.5 is the object `{x: 0.5, y: 5.5, z: 100}`.

Object interpolation is particularly useful for *dataspace interpolation*, where data is interpolated rather than attribute values. For example, you can interpolate an object which describes an arc in a pie chart, and then use [arc](../d3-shape/arc.md) to compute the new SVG path data.

:::warning CAUTION
**No defensive copy** of the template object is created; modifications of the returned object may adversely affect subsequent evaluation of the interpolator. No copy is made for performance reasons; interpolators are often part of the inner loop of [animated transitions](../d3-transition.md).
:::

## interpolateBasis(*values*) {#interpolateBasis}

[Examples](https://observablehq.com/@d3/d3-interpolatebasis) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/basis.js) · Returns a uniform nonrational B-spline interpolator through the specified array of *values*, which must be numbers.

```js
d3.interpolateBasis([0, 0.1, 0.4, 1])(0.5) // 0.2604166666666667
```

Implicit control points are generated such that the interpolator returns *values*[0] at *t* = 0 and *values*[*values*.length - 1] at *t* = 1. See also [curveBasis](../d3-shape/curve.md#curveBasis) and [interpolateRgbBasis](./color.md#interpolateRgbBasis).

## interpolateBasisClosed(*values*) {#interpolateBasisClosed}


[Examples](https://observablehq.com/@d3/d3-interpolatebasis) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/basisClosed.js) · Returns a uniform nonrational B-spline interpolator through the specified array of *values*, which must be numbers.

```js
d3.interpolateBasisClosed([0, 0.1, 0.4, 1])(0.5) // 0.45
```

The control points are implicitly repeated such that the resulting one-dimensional spline has cyclical C² continuity when repeated around *t* in [0,1]. See also [curveBasisClosed](../d3-shape/curve.md#curveBasisClosed) and [interpolateRgbBasisClosed](./color.md#interpolateRgbBasisClosed).

## interpolateDiscrete(*values*) {#interpolateDiscrete}

[Examples](https://observablehq.com/@d3/d3-interpolatediscrete) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/discrete.js) · Returns a discrete interpolator for the given array of *values*.

```js
d3.interpolateDiscrete(["red", "blue", "green"])(0.5) // "blue"
```

The returned interpolator maps *t* in [0, 1 / *n*) to *values*[0], *t* in [1 / *n*, 2 / *n*) to *values*[1], and so on, where *n* = *values*.length. In effect, this is a lightweight [quantize scale](../d3-scale/quantize.md) with a fixed domain of [0, 1].

## quantize(*interpolator*, *n*) {#quantize}

[Examples](https://observablehq.com/@d3/d3-quantize) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/quantize.js) · Returns *n* uniformly-spaced samples from the specified *interpolator*, where *n* is an integer greater than one.

<ColorSwatches :colors="d3.quantize(d3.interpolate('red', 'blue'), 4)" />

```js
d3.quantize(d3.interpolate("red", "blue"), 4) // ["rgb(255, 0, 0)", "rgb(170, 0, 85)", "rgb(85, 0, 170)", "rgb(0, 0, 255)"]
```

The first sample is always at *t* = 0, and the last sample is always at *t* = 1. This can be useful in generating a fixed number of samples from a given interpolator, such as to derive the range of a [quantize scale](../d3-scale/quantize.md) from a [continuous interpolator](../d3-scale-chromatic/sequential.md#interpolateWarm).

:::warning CAUTION
This method will not work with interpolators that do not return defensive copies of their output, such as [interpolateArray](#interpolateArray), [interpolateDate](#interpolateDate) and [interpolateObject](#interpolateObject). For those interpolators, you must wrap the interpolator and create a copy for each returned value.
:::

## piecewise(*interpolate*, *values*) {#piecewise}

[Examples](https://observablehq.com/@d3/d3-piecewise) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/piecewise.js) · Returns a piecewise interpolator, composing interpolators for each adjacent pair of *values*.

<ColorRamp :color="d3.piecewise(d3.interpolateRgb.gamma(2.2), ['red', 'green', 'blue'])" />

```js
d3.piecewise(d3.interpolateRgb.gamma(2.2), ["red", "green", "blue"])
```

If *interpolate* is not specified, defaults to [interpolate](#interpolate).

<ColorRamp :color="d3.piecewise(['red', 'green', 'blue'])" />

```js
d3.piecewise(["red", "green", "blue"])
```

The returned interpolator maps *t* in [0, 1 / (*n* - 1)] to *interpolate*(*values*[0], *values*[1]), *t* in [1 / (*n* - 1), 2 / (*n* - 1)] to *interpolate*(*values*[1], *values*[2]), and so on, where *n* = *values*.length. In effect, this is a lightweight [linear scale](../d3-scale/linear.md).

# docs/d3-interpolate/zoom.md

# Zoom interpolation

An interpolator for zooming smoothly between two views of a two-dimensional plane based on [“Smooth and efficient zooming and panning”](http://www.win.tue.nl/~vanwijk/zoompan.pdf) by Jarke J. van Wijk and Wim A.A. Nuij.

## interpolateZoom(*a*, *b*) {#interpolateZoom}

```js
d3.interpolateZoom([30, 30, 40], [135, 85, 60])(0.5) // [72, 52, 126.04761005270991]
```

[Examples](https://observablehq.com/@d3/d3-interpolatezoom) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/zoom.js) · Returns an interpolator between the two views *a* and *b*. Each view is defined as an array of three numbers: *cx*, *cy* and *width*. The first two coordinates *cx*, *cy* represent the center of the viewport; the last coordinate *width* represents the size of the viewport.

The returned interpolator exposes a *interpolate*.duration property which encodes the recommended transition duration in milliseconds. This duration is based on the path length of the curved trajectory through *xy* space. If you want a slower or faster transition, multiply this by an arbitrary scale factor (<i>V</i> as described in the original paper).

## *interpolateZoom*.rho(*rho*) {#interpolateZoom_rho}

```js
d3.interpolateZoom.rho(0.5)([30, 30, 40], [135, 85, 60])(0.5) // [72, 52, 51.09549882328188]
```

[Source](https://github.com/d3/d3-interpolate/blob/main/src/zoom.js) · Given a [zoom interpolator](#interpolateZoom), returns a new zoom interpolator using the specified curvature *rho*. When *rho* is close to 0, the interpolator is almost linear. The default curvature is sqrt(2).

# docs/d3-path.md

# d3-path

[Examples](https://observablehq.com/@d3/d3-path) · Say you have some code that draws to a 2D canvas:

```js
function drawCircle(context, radius) {
  context.moveTo(radius, 0);
  context.arc(0, 0, radius, 0, 2 * Math.PI);
}
```

The d3-path module lets you take this exact code and additionally render to [SVG](http://www.w3.org/TR/SVG/paths.html). It works by [serializing](#path_toString) [CanvasPathMethods](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls to [SVG path data](http://www.w3.org/TR/SVG/paths.html#PathData). For example:

```js
const path = d3.path();
drawCircle(path, 40);
path.toString(); // "M40,0A40,40,0,1,1,-40,0A40,40,0,1,1,40,0"
```

Now code you write once can be used with both Canvas (for performance) and SVG (for convenience). For a practical example, see [d3-shape](./d3-shape.md).

## path() {#path}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Constructs a new path serializer that implements [CanvasPathMethods](http://www.w3.org/TR/2dcontext/#canvaspathmethods).

## *path*.moveTo(*x*, *y*) {#path_moveTo}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Move to the specified point ⟨*x*, *y*⟩. Equivalent to [*context*.moveTo](http://www.w3.org/TR/2dcontext/#dom-context-2d-moveto) and SVG’s [“moveto” command](http://www.w3.org/TR/SVG/paths.html#PathDataMovetoCommands).

```js
path.moveTo(100, 100);
```

## *path*.closePath() {#path_closePath}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Ends the current subpath and causes an automatic straight line to be drawn from the current point to the initial point of the current subpath. Equivalent to [*context*.closePath](http://www.w3.org/TR/2dcontext/#dom-context-2d-closepath) and SVG’s [“closepath” command](http://www.w3.org/TR/SVG/paths.html#PathDataClosePathCommand).

```js
path.closePath();
```

## *path*.lineTo(*x*, *y*) {#path_lineTo}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Draws a straight line from the current point to the specified point ⟨*x*, *y*⟩. Equivalent to [*context*.lineTo](http://www.w3.org/TR/2dcontext/#dom-context-2d-lineto) and SVG’s [“lineto” command](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands).

```js
path.lineTo(200, 200);
```

## *path*.quadraticCurveTo(*cpx*, *cpy*, *x*, *y*) {#path_quadraticCurveTo}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Draws a quadratic Bézier segment from the current point to the specified point ⟨*x*, *y*⟩, with the specified control point ⟨*cpx*, *cpy*⟩. Equivalent to [*context*.quadraticCurveTo](http://www.w3.org/TR/2dcontext/#dom-context-2d-quadraticcurveto) and SVG’s [quadratic Bézier curve commands](http://www.w3.org/TR/SVG/paths.html#PathDataQuadraticBezierCommands).

```js
path.quadraticCurveTo(200, 0, 200, 200);
```

## *path*.bezierCurveTo(*cpx1*, *cpy1*, *cpx2*, *cpy2*, *x*, *y*) {#path_bezierCurveTo}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Draws a cubic Bézier segment from the current point to the specified point ⟨*x*, *y*⟩, with the specified control points ⟨*cpx1*, *cpy1*⟩ and ⟨*cpx2*, *cpy2*⟩. Equivalent to [*context*.bezierCurveTo](http://www.w3.org/TR/2dcontext/#dom-context-2d-beziercurveto) and SVG’s [cubic Bézier curve commands](http://www.w3.org/TR/SVG/paths.html#PathDataCubicBezierCommands).

```js
path.bezierCurveTo(200, 0, 0, 200, 200, 200);
```

## *path*.arcTo(*x1*, *y1*, *x2*, *y2*, *radius*) {#path_arcTo}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Draws a circular arc segment with the specified *radius* that starts tangent to the line between the current point and the specified point ⟨*x1*, *y1*⟩ and ends tangent to the line between the specified points ⟨*x1*, *y1*⟩ and ⟨*x2*, *y2*⟩. If the first tangent point is not equal to the current point, a straight line is drawn between the current point and the first tangent point. Equivalent to [*context*.arcTo](http://www.w3.org/TR/2dcontext/#dom-context-2d-arcto) and uses SVG’s [elliptical arc curve commands](http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands).

```js
path.arcTo(150, 150, 300, 10, 40);
```

## *path*.arc(*x*, *y*, *radius*, *startAngle*, *endAngle*, *anticlockwise*) {#path_arc}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Draws a circular arc segment with the specified center ⟨*x*, *y*⟩, *radius*, *startAngle* and *endAngle*. If *anticlockwise* is true, the arc is drawn in the anticlockwise direction; otherwise, it is drawn in the clockwise direction. If the current point is not equal to the starting point of the arc, a straight line is drawn from the current point to the start of the arc. Equivalent to [*context*.arc](http://www.w3.org/TR/2dcontext/#dom-context-2d-arc) and uses SVG’s [elliptical arc curve commands](http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands).

```js
path.arc(80, 80, 70, 0, Math.PI * 2);
```

## *path*.rect(*x*, *y*, *w*, *h*) {#path_rect}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Creates a new subpath containing just the four points ⟨*x*, *y*⟩, ⟨*x* + *w*, *y*⟩, ⟨*x* + *w*, *y* + *h*⟩, ⟨*x*, *y* + *h*⟩, with those four points connected by straight lines, and then marks the subpath as closed. Equivalent to [*context*.rect](http://www.w3.org/TR/2dcontext/#dom-context-2d-rect) and uses SVG’s [“lineto” commands](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands).

```js
path.rect(10, 10, 140, 140);
```

## *path*.toString() {#path_toString}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Returns the string representation of this *path* according to SVG’s [path data specification](http://www.w3.org/TR/SVG/paths.html#PathData).

```js
path.toString() // "M40,0A40,40,0,1,1,-40,0A40,40,0,1,1,40,0"
```

## pathRound(*digits* = 3) {#pathRound}

[Source](https://github.com/d3/d3-path/blob/main/src/path.js) · Like [path](#path), except limits the digits after the decimal to the specified number of *digits*. Useful for reducing the size of generated SVG path data.

```js
const path = d3.pathRound(3);
```

# docs/d3-polygon.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import PlotRender from "./components/PlotRender.js";

const random = d3.randomNormal.source(d3.randomLcg(42))();
const points = Array.from({length: 1000}, () => [random(), random()]);

</script>

# d3-polygon

This module provides a few basic geometric operations for two-dimensional polygons. Each polygon is represented as an array of two-element arrays [​[*x0*, *y0*], [*x1*, *y1*], …], and may either be closed (wherein the first and last point are the same) or open (wherein they are not). Typically polygons are in counterclockwise order, assuming a coordinate system where the origin is in the top-left corner.

## polygonArea(*polygon*) {#polygonArea}

```js
d3.polygonArea([[1, 1], [1.5, 0], [2, 1]]) // -0.5
```

[Source](https://github.com/d3/d3-polygon/blob/main/src/area.js) · Returns the signed area of the specified *polygon*. If the vertices of the polygon are in counterclockwise order (assuming a coordinate system where the origin is in the top-left corner), the returned area is positive; otherwise it is negative, or zero.

## polygonCentroid(*polygon*) {#polygonCentroid}

```js
d3.polygonCentroid([[1, 1], [1.5, 0], [2, 1]]) // [1.5, 0.6666666666666666]
```

[Source](https://github.com/d3/d3-polygon/blob/main/src/centroid.js) · Returns the [centroid](https://en.wikipedia.org/wiki/Centroid) of the specified *polygon*.

## polygonHull(*points*) {#polygonHull}

<PlotRender defer :options='{
  axis: null,
  aspectRatio: 1,
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.hull(points)
  ]
}' />

```js
d3.polygonHull(points) // [[3.0872864263338777, -1.300100095019402], [1.6559368816733773, -2.5092525689499605], …]
```

[Source](https://github.com/d3/d3-polygon/blob/main/src/hull.js) · Returns the [convex hull](https://en.wikipedia.org/wiki/Convex_hull) of the specified *points* using [Andrew’s monotone chain algorithm](http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain). The returned hull is represented as an array containing a subset of the input *points* arranged in counterclockwise order. Returns null if *points* has fewer than three elements.

## polygonContains(*polygon*, *point*) {#polygonContains}

```js
d3.polygonContains([[1, 1], [1.5, 0], [2, 1]], [1.5, 0.667]) // true
```

[Source](https://github.com/d3/d3-polygon/blob/main/src/contains.js) · Returns true if and only if the specified *point* is inside the specified *polygon*.

## polygonLength(*polygon*) {#polygonLength}

```js
d3.polygonLength([[1, 1], [1.5, 0], [2, 1]]) // 3.23606797749979
```

[Source](https://github.com/d3/d3-polygon/blob/main/src/length.js) · Returns the length of the perimeter of the specified *polygon*.

# docs/d3-quadtree.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {computed, shallowRef, onMounted} from "vue";
import ExampleAnimatedQuadtree from "./components/ExampleAnimatedQuadtree.vue";
import PlotRender from "./components/PlotRender.js";
import quadtree_findVisited from "./components/quadtreeFindVisited.js";
import quadtree_nodes from "./components/quadtreeNodes.js";

const random = d3.randomNormal.source(d3.randomLcg(42))();
const points = Array.from({length: 1000}, () => [random(), random()]);
const tree = d3.quadtree(d3.range(points.length), (i) => points[i][0], (i) => points[i][1]);
const findState = shallowRef({x: 0, y: 0, i: -1});

</script>

# d3-quadtree

<ExampleAnimatedQuadtree :points="points" />

A [quadtree](https://en.wikipedia.org/wiki/Quadtree) recursively partitions two-dimensional space into squares, dividing each square into four equally-sized squares. Each distinct point exists in a unique leaf [node](#quadtree-nodes); coincident points are represented by a linked list. Quadtrees can accelerate various spatial operations, such as the [Barnes–Hut approximation](https://en.wikipedia.org/wiki/Barnes–Hut_simulation) for computing many-body forces, collision detection, and searching for nearby points.

<!-- http://bl.ocks.org/mbostock/9078690 -->
<!-- http://bl.ocks.org/mbostock/4343214 -->

## quadtree(*data*, *x*, *y*) {#quadtree}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/quadtree.js) · Creates a new, empty quadtree with an empty [extent](#quadtree_extent) and the default [x](#quadtree_x) and [y](#quadtree_y) accessors. If *data* is specified, [adds](#quadtree_addAll) the specified iterable of data to the quadtree.

```js
const tree = d3.quadtree(data);
```

This is equivalent to:

```js
const tree = d3.quadtree().addAll(data);
```

If *x* and *y* are also specified, sets the [x](#quadtree_x) and [y](#quadtree_y) accessors to the specified functions before adding the specified iterable of data to the quadtree, equivalent to:

```js
const tree = d3.quadtree().x(x).y(y).addAll(data);
```

## *quadtree*.x(x) {#quadtree_x}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/x.js) · If *x* is specified, sets the current x-coordinate accessor and returns the quadtree.

```js
const tree = d3.quadtree().x((d) => d.x);
```

The x accessor is used to derive the x coordinate of data when [adding](#quadtree_add) to and [removing](#quadtree_remove) from the tree. It is also used when [finding](#quadtree_find) to re-access the coordinates of data previously added to the tree; therefore, the x and y accessors must be consistent, returning the same value given the same input.

If *x* is not specified, returns the current x accessor.

```js
tree.x() // (d) => d.x
```

The x accessor defaults to:

```js
function x(d) {
  return d[0];
}
```

## *quadtree*.y(y) {#quadtree_y}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/y.js) · If *y* is specified, sets the current y-coordinate accessor and returns the quadtree.

```js
const tree = d3.quadtree().y((d) => d.y);
```

The y accessor is used to derive the y coordinate of data when [adding](#quadtree_add) to and [removing](#quadtree_remove) from the tree. It is also used when [finding](#quadtree_find) to re-access the coordinates of data previously added to the tree; therefore, the x and y accessors must be consistent, returning the same value given the same input.

If *y* is not specified, returns the current y accessor.

```js
tree.y() // (d) => d.y
```

The y accessor defaults to:

```js
function y(d) {
  return d[1];
}
```

## *quadtree*.extent(*extent*) {#quadtree_extent}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/extent.js) · If *extent* is specified, expands the quadtree to [cover](#quadtree_cover) the specified points [[*x0*, *y0*], [*x1*, *y1*]] and returns the quadtree.

```js
const tree = d3.quadtree().extent([[0, 0], [1, 1]]);
```

If *extent* is not specified, returns the quadtree’s current extent [[*x0*, *y0*], [*x1*, *y1*]], where *x0* and *y0* are the inclusive lower bounds and *x1* and *y1* are the inclusive upper bounds, or undefined if the quadtree has no extent.

```js
tree.extent() // [[0, 0], [2, 2]]
```

The extent may also be expanded by calling [*quadtree*.cover](#quadtree_cover) or [*quadtree*.add](#quadtree_add).

## *quadtree*.cover(*x*, *y*) {#quadtree_cover}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/cover.js) · Expands the quadtree to cover the specified point ⟨*x*,*y*⟩, and returns the quadtree.

```js
const tree = d3.quadtree().cover(0, 0).cover(1, 1);
```

If the quadtree’s extent already covers the specified point, this method does nothing. If the quadtree has an extent, the extent is repeatedly doubled to cover the specified point, wrapping the [root](#quadtree_root) [node](#quadtree-nodes) as necessary; if the quadtree is empty, the extent is initialized to the extent [[⌊*x*⌋, ⌊*y*⌋], [⌈*x*⌉, ⌈*y*⌉]]. (Rounding is necessary such that if the extent is later doubled, the boundaries of existing quadrants do not change due to floating point error.)

## *quadtree*.add(*datum*) {#quadtree_add}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/add.js) · Adds the specified *datum* to the quadtree, deriving its coordinates ⟨*x*,*y*⟩ using the current [x](#quadtree_x) and [y](#quadtree_y) accessors, and returns the quadtree.

```js
const tree = d3.quadtree().add([0, 0]);
```

If the new point is outside the current [extent](#quadtree_extent) of the quadtree, the quadtree is automatically expanded to [cover](#quadtree_cover) the new point.

## *quadtree*.addAll(*data*) {#quadtree_addAll}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/add.js) · Adds the specified iterable of *data* to the quadtree, deriving each element’s coordinates ⟨*x*,*y*⟩ using the current [x](#quadtree_x) and [y](#quadtree_y) accessors, and return this quadtree.

```js
const tree = d3.quadtree().addAll([[0, 0], [1, 2]]);
```

This is approximately equivalent to calling [*quadtree*.add](#quadtree_add) repeatedly:

```js
for (let i = 0, n = data.length; i < n; ++i) {
  quadtree.add(data[i]);
}
```

However, this method results in a more compact quadtree because the extent of the *data* is computed first before adding the data.

## *quadtree*.remove(*datum*) {#quadtree_remove}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/remove.js) · Removes the specified *datum* from the quadtree, deriving its coordinates ⟨*x*,*y*⟩ using the current [x](#quadtree_x) and [y](#quadtree_y) accessors, and returns the quadtree.

```js
tree.remove(data[0]);
```

If the specified *datum* does not exist in this quadtree (as determined by strict equality with *datum*, and independent of the computed position), this method does nothing.

## *quadtree*.removeAll(*data*) {#quadtree_removeAll}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/remove.js) · Removes the specified *data* from the quadtree, deriving their coordinates ⟨*x*,*y*⟩ using the current [x](#quadtree_x) and [y](#quadtree_y) accessors, and returns the quadtree.

```js
tree.removeAll(data);
```

If a specified datum does not exist in this quadtree (as determined by strict equality with *datum*, and independent of the computed position), it is ignored.

## *quadtree*.copy() {#quadtree_copy}

```js
const t1 = d3.quadtree(data);
const t2 = t1.copy();
```

[Source](https://github.com/d3/d3-quadtree/blob/main/src/quadtree.js) · Returns a copy of the quadtree. All [nodes](#quadtree-nodes) in the returned quadtree are identical copies of the corresponding node in the quadtree; however, any data in the quadtree is shared by reference and not copied.

## *quadtree*.root() {#quadtree_root}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/root.js) · Returns the root [node](#quadtree-nodes) of the quadtree.

```js
tree.root() // [{…}, empty × 2, {…}]
```

## *quadtree*.data() {#quadtree_data}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/data.js) · Returns an array of all data in the quadtree.

```js
tree.data() // [[0, 0], [1, 2]]
```

## *quadtree*.size() {#quadtree_size}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/size.js) · Returns the total number of data in the quadtree.

```js
tree.size() // 2
```

## *quadtree*.find(*x*, *y*, *radius*) {#quadtree_find}

<PlotRender defer v-once :options='{
  axis: null,
  aspectRatio: 1,
  round: true,
  marks: [
    Plot.dot(points, {r: 2, fill: "currentColor"}),
    Plot.rect(quadtree_nodes.call(tree), {stroke: "currentColor", x1: "x1", y1: "y1", x2: "x2", y2: "y2"}),
    Plot.rect({length: 1}, {
      stroke: "red",
      strokeOpacity: 0.5,
      render(index, scales, values, dimensions, context, next) {
        function update(x, y) {
          const visited = quadtree_findVisited.call(tree, x, y);
          return next(
            d3.range(visited.length),
            scales,
            {
              x1: visited.map((d, i) => scales.x(d.x0) + d.dx0),
              y1: visited.map((d, i) => scales.y(d.y0) - d.dy0),
              x2: visited.map((d, i) => scales.x(d.x1) + d.dx1),
              y2: visited.map((d, i) => scales.y(d.y1) - d.dy1)
            },
            dimensions,
            context
          );
        }
        let rect = update(0, 0);
        context.ownerSVGElement.addEventListener("pointermove", (event) => {
          const [x, y] = d3.pointer(event);
          const newrect = update(scales.x.invert(x), scales.y.invert(y));
          rect.replaceWith(newrect);
          rect = newrect;
        });
        return rect;
      }
    }),
    Plot.dot(points, {
      r: 3.5,
      stroke: "red",
      strokeWidth: 3,
      render(index, scales, values, dimensions, context, next) {
        function update(x, y) {
          const i = tree.find(x, y);
          findState = {x, y, i};
          return next([i], scales, values, dimensions, context);
        }
        let dot = update(0, 0);
        context.ownerSVGElement.addEventListener("pointermove", (event) => {
          const [x, y] = d3.pointer(event);
          const newdot = update(scales.x.invert(x), scales.y.invert(y));
          dot.replaceWith(newdot);
          dot = newdot;
        });
        return dot;
      }
    }),
  ]
}' />

[Source](https://github.com/d3/d3-quadtree/blob/main/src/find.js) · Returns the datum closest to the position ⟨*x*,*y*⟩ with the given search *radius*. If *radius* is not specified, it defaults to infinity.

```js-vue
tree.find({{findState.x.toFixed(3)}}, {{findState.y.toFixed(3)}}) // {{points[findState.i] && `[${points[findState.i].map((p) => p.toFixed(3)).join(", ")}]`}}
```

If there is no datum within the search area, returns undefined.

```js
tree.find(10, 10, 1) // undefined
```

## *quadtree*.visit(*callback*) {#quadtree_visit}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/visit.js) · Visits each [node](#quadtree-nodes) in the quadtree in pre-order traversal, invoking the specified *callback* with arguments *node*, *x0*, *y0*, *x1*, *y1* for each node, where *node* is the node being visited, ⟨*x0*, *y0*⟩ are the lower bounds of the node, and ⟨*x1*, *y1*⟩ are the upper bounds, and returns the quadtree. (Assuming that positive *x* is right and positive *y* is down, as is typically the case in Canvas and SVG, ⟨*x0*, *y0*⟩ is the top-left corner and ⟨*x1*, *y1*⟩ is the lower-right corner; however, the coordinate system is arbitrary, so more formally *x0* <= *x1* and *y0* <= *y1*.)

If the *callback* returns true for a given node, then the children of that node are not visited; otherwise, all child nodes are visited. This can be used to quickly visit only parts of the tree, for example when using the [Barnes–Hut approximation](https://en.wikipedia.org/wiki/Barnes–Hut_simulation). Note, however, that child quadrants are always visited in sibling order: top-left, top-right, bottom-left, bottom-right. In cases such as [search](#quadtree_find), visiting siblings in a specific order may be faster.

As an example, the following visits the quadtree and returns all the nodes within a rectangular extent [xmin, ymin, xmax, ymax], ignoring quads that cannot possibly contain any such node:

```js
function search(quadtree, xmin, ymin, xmax, ymax) {
  const results = [];
  quadtree.visit((node, x1, y1, x2, y2) => {
    if (!node.length) {
      do {
        let d = node.data;
        if (d[0] >= xmin && d[0] < xmax && d[1] >= ymin && d[1] < ymax) {
          results.push(d);
        }
      } while (node = node.next);
    }
    return x1 >= xmax || y1 >= ymax || x2 < xmin || y2 < ymin;
  });
  return results;
}
```

## *quadtree*.visitAfter(*callback*) {#quadtree_visitAfter}

[Source](https://github.com/d3/d3-quadtree/blob/main/src/visitAfter.js) · Visits each [node](#quadtree-nodes) in the quadtree in post-order traversal, invoking the specified *callback* with arguments *node*, *x0*, *y0*, *x1*, *y1* for each node, where *node* is the node being visited, ⟨*x0*, *y0*⟩ are the lower bounds of the node, and ⟨*x1*, *y1*⟩ are the upper bounds, and returns the quadtree. (Assuming that positive *x* is right and positive *y* is down, as is typically the case in Canvas and SVG, ⟨*x0*, *y0*⟩ is the top-left corner and ⟨*x1*, *y1*⟩ is the lower-right corner; however, the coordinate system is arbitrary, so more formally *x0* <= *x1* and *y0* <= *y1*.) Returns *root*.

## Quadtree nodes

Internal nodes of the quadtree are represented as sparse four-element arrays in left-to-right, top-to-bottom order:

* `0` - the top-left quadrant, if any.
* `1` - the top-right quadrant, if any.
* `2` - the bottom-left quadrant, if any.
* `3` - the bottom-right quadrant, if any.

A child quadrant may be undefined if it is empty.

Leaf nodes are represented as objects with the following properties:

* `data` - the data associated with this point, as passed to [*quadtree*.add](#quadtree_add).
* `next` - the next datum in this leaf, if any.

The `length` property may be used to distinguish leaf nodes from internal nodes: it is undefined for leaf nodes, and 4 for internal nodes. For example, to iterate over all data in a leaf node:

```js
if (!node.length) do console.log(node.data); while (node = node.next);
```

The point’s x and y coordinates **must not be modified** while the point is in the quadtree. To update a point’s position, [remove](#quadtree_remove) the point and then re-[add](#quadtree_add) it to the quadtree at the new position. Alternatively, you may discard the existing quadtree entirely and create a new one from scratch; this may be more efficient if many of the points have moved.

# docs/d3-random.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import PlotRender from "./components/PlotRender.js";

</script>

# d3-random

Generate random numbers from various distributions. For seeded random number generation, see [*random*.source](#random_source) and [randomLcg](#randomLcg).

## randomUniform(*min*, *max*) {#randomUniform}

<PlotRender :options='{
  height: 120,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomUniform.source(d3.randomLcg(42))(6)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomUniform(6) // generate numbers ≥0 and <6
```

[Examples](https://observablehq.com/@d3/d3-random#uniform) · [Source](https://github.com/d3/d3-random/blob/main/src/uniform.js) · Returns a function for generating random numbers with a [uniform distribution](https://en.wikipedia.org/wiki/Uniform_distribution_\(continuous\)). The minimum allowed value of a returned number is *min* (inclusive), and the maximum is *max* (exclusive). If *min* is not specified, it defaults to 0; if *max* is not specified, it defaults to 1. For example:

## randomInt(*min*, *max*) {#randomInt}

<PlotRender :options='{
  height: 120,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomInt.source(d3.randomLcg(42))(100)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomInt(100) // generate integers ≥0 and <100
```

[Examples](https://observablehq.com/@d3/d3-random#int) · [Source](https://github.com/d3/d3-random/blob/main/src/int.js) · Returns a function for generating random integers with a [uniform distribution](https://en.wikipedia.org/wiki/Uniform_distribution_\(continuous\)). The minimum allowed value of a returned number is ⌊*min*⌋ (inclusive), and the maximum is ⌊*max* - 1⌋ (inclusive). If *min* is not specified, it defaults to 0. For example:

## randomNormal(*mu*, *sigma*) {#randomNormal}

<PlotRender defer :options='{
  height: 240,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomNormal.source(d3.randomLcg(42))(0, 1)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomNormal(0, 1) // mean of 0, and standard deviation of 1
```

[Examples](https://observablehq.com/@d3/d3-random#normal) · [Source](https://github.com/d3/d3-random/blob/main/src/normal.js) · Returns a function for generating random numbers with a [normal (Gaussian) distribution](https://en.wikipedia.org/wiki/Normal_distribution). The expected value of the generated numbers is *mu*, with the given standard deviation *sigma*. If *mu* is not specified, it defaults to 0; if *sigma* is not specified, it defaults to 1.

## randomLogNormal(*mu*, *sigma*) {#randomLogNormal}

<PlotRender defer :options='{
  height: 240,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 400}, d3.randomLogNormal.source(d3.randomLcg(36))(0, 1)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomLogNormal(0, 1)
```

[Examples](https://observablehq.com/@d3/d3-random#logNormal) · [Source](https://github.com/d3/d3-random/blob/main/src/logNormal.js) · Returns a function for generating random numbers with a [log-normal distribution](https://en.wikipedia.org/wiki/Log-normal_distribution). The expected value of the random variable’s natural logarithm is *mu*, with the given standard deviation *sigma*. If *mu* is not specified, it defaults to 0; if *sigma* is not specified, it defaults to 1.

## randomBates(*n*) {#randomBates}

<PlotRender defer :options='{
  height: 180,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomBates.source(d3.randomLcg(36))(3)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomBates(3) // generates numbers between 0 and 1
```

[Examples](https://observablehq.com/@d3/d3-random#bates) · [Source](https://github.com/d3/d3-random/blob/main/src/bates.js) · Returns a function for generating random numbers with a [Bates distribution](https://en.wikipedia.org/wiki/Bates_distribution) with *n* independent variables. The case of fractional *n* is handled as with d3.randomIrwinHall, and d3.randomBates(0) is equivalent to d3.randomUniform().

## randomIrwinHall(*n*) {#randomIrwinHall}

<PlotRender defer :options='{
  height: 180,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomIrwinHall.source(d3.randomLcg(36))(3)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomIrwinHall(3) // generates numbers between 0 and 3
```

[Examples](https://observablehq.com/@d3/d3-random#irwinHall) · [Source](https://github.com/d3/d3-random/blob/main/src/irwinHall.js) · Returns a function for generating random numbers with an [Irwin–Hall distribution](https://en.wikipedia.org/wiki/Irwin–Hall_distribution) with *n* independent variables. If the fractional part of *n* is non-zero, this is treated as adding d3.randomUniform() times that fractional part to the integral part.

## randomExponential(*lambda*) {#randomExponential}

<PlotRender defer :options='{
  height: 190,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 600}, d3.randomExponential.source(d3.randomLcg(36))(1 / 40)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomExponential(1 / 40)
```

[Examples](https://observablehq.com/@d3/d3-random#exponential) · [Source](https://github.com/d3/d3-random/blob/main/src/exponential.js) · Returns a function for generating random numbers with an [exponential distribution](https://en.wikipedia.org/wiki/Exponential_distribution) with the rate *lambda*; equivalent to time between events in a [Poisson process](https://en.wikipedia.org/wiki/Poisson_point_process) with a mean of 1 / *lambda*. For example, randomExponential(1 / 40) generates random times between events where, on average, one event occurs every 40 units of time.

## randomPareto(*alpha*) {#randomPareto}

<PlotRender defer :options='{
  height: 210,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 400}, d3.randomPareto.source(d3.randomLcg(36))(6)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomPareto(6)
```

[Examples](https://observablehq.com/@d3/d3-random#pareto) · [Source](https://github.com/d3/d3-random/blob/main/src/pareto.js) · Returns a function for generating random numbers with a [Pareto distribution](https://en.wikipedia.org/wiki/Pareto_distribution) with the shape *alpha*. The value *alpha* must be a positive value.

## randomBernoulli(*p*) {#randomBernoulli}

<PlotRender defer :options='{
  height: 120,
  nice: true,
  width: 60,
  x: {ticks: 1},
  marks: [
    Plot.dotX(Array.from({length: 34}, d3.randomBernoulli.source(d3.randomLcg(36))(0.5)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomBernoulli(0.5)
```

[Examples](https://observablehq.com/@d3/d3-random#bernoulli) · [Source](https://github.com/d3/d3-random/blob/main/src/bernoulli.js) · Returns a function for generating either 1 or 0 according to a [Bernoulli distribution](https://en.wikipedia.org/wiki/Bernoulli_distribution) with 1 being returned with success probability *p* and 0 with failure probability *q* = 1 - *p*. The value *p* is in the range [0, 1].

## randomGeometric(*p*) {#randomGeometric}

<PlotRender defer :options='{
  height: 240,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 400}, d3.randomGeometric.source(d3.randomLcg(36))(0.1)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomGeometric(0.1)
```

[Examples](https://observablehq.com/@d3/d3-random#geometric) · [Source](https://github.com/d3/d3-random/blob/main/src/geometric.js) · Returns a function for generating numbers with a [geometric distribution](https://en.wikipedia.org/wiki/Geometric_distribution) with success probability *p*. The value *p* is in the range [0, 1].

## randomBinomial(*n*, *p*) {#randomBinomial}

<PlotRender defer :options='{
  height: 240,
  x: {domain: [0, 40]},
  marks: [
    Plot.dotX(Array.from({length: 300}, d3.randomBinomial.source(d3.randomLcg(36))(40, 0.5)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomBinomial(40, 0.5)
```

[Examples](https://observablehq.com/@d3/d3-random#binomial) · [Source](https://github.com/d3/d3-random/blob/main/src/binomial.js) · Returns a function for generating random numbers with a [binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution) with *n* the number of trials and *p* the probability of success in each trial. The value *n* is greater or equal to 0, and the value *p* is in the range [0, 1].

## randomGamma(*k*, *theta*) {#randomGamma}

<PlotRender defer :options='{
  height: 200,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomGamma.source(d3.randomLcg(36))(2, 1)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomGamma(2, 1)
```

[Examples](https://observablehq.com/@parcly-taxel/the-gamma-and-beta-distributions) · [Source](https://github.com/d3/d3-random/blob/main/src/gamma.js) · Returns a function for generating random numbers with a [gamma distribution](https://en.wikipedia.org/wiki/Gamma_distribution) with *k* the shape parameter and *theta* the scale parameter. The value *k* must be a positive value; if *theta* is not specified, it defaults to 1.

## randomBeta(*alpha*, *beta*) {#randomBeta}

<PlotRender defer :options='{
  height: 160,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomBeta.source(d3.randomLcg(36))(3, 1.5)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomBeta(3, 1.5)
```

[Examples](https://observablehq.com/@parcly-taxel/the-gamma-and-beta-distributions) · [Source](https://github.com/d3/d3-random/blob/main/src/beta.js) · Returns a function for generating random numbers with a [beta distribution](https://en.wikipedia.org/wiki/Beta_distribution) with *alpha* and *beta* shape parameters, which must both be positive.

## randomWeibull(*k*, *a*, *b*) {#randomWeibull}

<PlotRender defer :options='{
  height: 200,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomWeibull.source(d3.randomLcg(36))(10)), Plot.dodgeY({r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomWeibull(10)
```

[Examples](https://observablehq.com/@parcly-taxel/frechet-gumbel-weibull) · [Source](https://github.com/d3/d3-random/blob/main/src/weibull.js) · Returns a function for generating random numbers with one of the [generalized extreme value distributions](https://en.wikipedia.org/wiki/Generalized_extreme_value_distribution), depending on *k*:

* If *k* is positive, the [Weibull distribution](https://en.wikipedia.org/wiki/Weibull_distribution) with shape parameter *k*
* If *k* is zero, the [Gumbel distribution](https://en.wikipedia.org/wiki/Gumbel_distribution)
* If *k* is negative, the [Fréchet distribution](https://en.wikipedia.org/wiki/Fréchet_distribution) with shape parameter −*k*

In all three cases, *a* is the location parameter and *b* is the scale parameter. If *a* is not specified, it defaults to 0; if *b* is not specified, it defaults to 1.

## randomCauchy(*a*, *b*) {#randomCauchy}

<PlotRender defer :options='{
  height: 200,
  nice: true,
  x: {domain: [-5, 5]},
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomCauchy.source(d3.randomLcg(36))(0, 1)), Plot.dodgeY({clip: true, r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomCauchy(0, 1) // above, clipped to [-5, 5] because “fat tails”
```

[Examples](https://observablehq.com/@parcly-taxel/cauchy-and-logistic-distributions) · [Source](https://github.com/d3/d3-random/blob/main/src/cauchy.js) · Returns a function for generating random numbers with a [Cauchy distribution](https://en.wikipedia.org/wiki/Cauchy_distribution). *a* and *b* have the same meanings and default values as in d3.randomWeibull.

## randomLogistic(*a*, *b*) {#randomLogistic}

<PlotRender defer :options='{
  height: 300,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomLogistic.source(d3.randomLcg(36))(0, 1)), Plot.dodgeY({clip: true, r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomLogistic(0, 1)
```

[Examples](https://observablehq.com/@parcly-taxel/cauchy-and-logistic-distributions) · [Source](https://github.com/d3/d3-random/blob/main/src/logistic.js) · Returns a function for generating random numbers with a [logistic distribution](https://en.wikipedia.org/wiki/Logistic_distribution). *a* and *b* have the same meanings and default values as in d3.randomWeibull.

## randomPoisson(*lambda*) {#randomPoisson}

<PlotRender defer :options='{
  height: 150,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomPoisson.source(d3.randomLcg(36))(400)), Plot.dodgeY({clip: true, r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomPoisson(400)
```

[Examples](https://observablehq.com/@parcly-taxel/the-poisson-distribution) · [Source](https://github.com/d3/d3-random/blob/main/src/poisson.js) · Returns a function for generating random numbers with a [Poisson distribution](https://en.wikipedia.org/wiki/Poisson_distribution) with mean *lambda*.

## *random*.source(*source*) {#random_source}

```js
const seed = 0.44871573888282423; // any number in [0, 1)
const random = d3.randomNormal.source(d3.randomLcg(seed))(0, 1);
random(); // -0.6253955998897069
```

[Examples](https://observablehq.com/@d3/random-source) · Returns the same type of function for generating random numbers but where the given random number generator *source* is used as the source of randomness instead of Math.random. The given random number generator must implement the same interface as Math.random and only return values in the range [0, 1). This is useful when a seeded random number generator is preferable to Math.random.

## randomLcg(*seed*) {#randomLcg}

<PlotRender defer :options='{
  height: 120,
  nice: true,
  marks: [
    Plot.dotX(Array.from({length: 1000}, d3.randomLcg(36)), Plot.dodgeY({clip: true, r: 2, fill: "currentColor"}))
  ]
}' />

```js
d3.randomLcg(42)
```

[Examples](https://observablehq.com/@d3/d3-randomlcg) · [Source](https://github.com/d3/d3-random/blob/main/src/lcg.js) · Returns a [linear congruential generator](https://en.wikipedia.org/wiki/Linear_congruential_generator); this function can be called repeatedly to obtain pseudorandom values well-distributed on the interval [0,1) and with a long period (up to 1 billion numbers), similar to Math.random. A *seed* can be specified as a real number in the interval [0,1) or as any integer. In the latter case, only the lower 32 bits are considered. Two generators instanced with the same seed generate the same sequence, allowing to create reproducible pseudo-random experiments. If the *seed* is not specified, one is chosen using Math.random.

# docs/d3-scale-chromatic.md

# d3-scale-chromatic

This module provides sequential, diverging and categorical color schemes designed to work with [d3-scale](./d3-scale.md)’s [d3.scaleOrdinal](./d3-scale/ordinal.md) and [d3.scaleSequential](./d3-scale/sequential.md). Most of these schemes are derived from Cynthia A. Brewer’s [ColorBrewer](http://colorbrewer2.org). Since ColorBrewer publishes only discrete color schemes, the sequential and diverging scales are interpolated using [uniform B-splines](https://observablehq.com/@d3/colorbrewer-splines).

See one of:

* [Categorical schemes](./d3-scale-chromatic/categorical.md)
* [Cyclical schemes](./d3-scale-chromatic/cyclical.md)
* [Diverging schemes](./d3-scale-chromatic/diverging.md)
* [Sequential schemes](./d3-scale-chromatic/sequential.md)

# docs/d3-scale-chromatic/categorical.md

<script setup>

import * as d3 from "d3";
import ColorSwatches from "../components/ColorSwatches.vue";

</script>

# Categorical schemes

For example, to create a categorical color scale using the [Accent](#schemeAccent) color scheme:

```js
const color = d3.scaleOrdinal(d3.schemeAccent);
```

## schemeCategory10 {#schemeCategory10}

<ColorSwatches :colors="d3.schemeCategory10" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/category10.js) · An array of ten categorical colors represented as RGB hexadecimal strings.

## schemeAccent {#schemeAccent}

<ColorSwatches :colors="d3.schemeAccent" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Accent.js) · An array of eight categorical colors represented as RGB hexadecimal strings.

## schemeDark2 {#schemeDark2}

<ColorSwatches :colors="d3.schemeDark2" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Dark2.js) · An array of eight categorical colors represented as RGB hexadecimal strings.

## schemeObservable10 {#schemeObservable10}

<ColorSwatches :colors="d3.schemeObservable10" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/observable10.js) · An array of ten categorical colors represented as RGB hexadecimal strings.

## schemePaired {#schemePaired}

<ColorSwatches :colors="d3.schemePaired" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Paired.js) · An array of twelve categorical colors represented as RGB hexadecimal strings.

## schemePastel1 {#schemePastel1}

<ColorSwatches :colors="d3.schemePastel1" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Pastel1.js) · An array of nine categorical colors represented as RGB hexadecimal strings.

## schemePastel2 {#schemePastel2}

<ColorSwatches :colors="d3.schemePastel2" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Pastel2.js) · An array of eight categorical colors represented as RGB hexadecimal strings.

## schemeSet1 {#schemeSet1}

<ColorSwatches :colors="d3.schemeSet1" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Set1.js) · An array of nine categorical colors represented as RGB hexadecimal strings.

## schemeSet2 {#schemeSet2}

<ColorSwatches :colors="d3.schemeSet2" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Set2.js) · An array of eight categorical colors represented as RGB hexadecimal strings.

## schemeSet3 {#schemeSet3}

<ColorSwatches :colors="d3.schemeSet3" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Set3.js) · An array of twelve categorical colors represented as RGB hexadecimal strings.

## schemeTableau10 {#schemeTableau10}

<ColorSwatches :colors="d3.schemeTableau10" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Tableau10.js) · An array of ten categorical colors authored by Tableau as part of [Tableau 10](https://www.tableau.com/about/blog/2016/7/colors-upgrade-tableau-10-56782) represented as RGB hexadecimal strings.

# docs/d3-scale-chromatic/cyclical.md

<script setup>

import * as d3 from "d3";
import ColorRamp from "../components/ColorRamp.vue";

</script>

# Cyclical schemes

To create a cyclical continuous color scale using the [Rainbow](#interpolateRainbow) color scheme:

```js
const color = d3.scaleSequential(d3.interpolateRainbow);
```

## interpolateRainbow(*t*) {#interpolateRainbow}

<ColorRamp :color="d3.interpolateRainbow" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/rainbow.js) · Given a number *t* in the range [0,1], returns the corresponding color from [d3.interpolateWarm](./sequential.md#interpolateWarm) scale from [0.0, 0.5] followed by the [d3.interpolateCool](./sequential.md#interpolateCool) scale from [0.5, 1.0], thus implementing the cyclical [less-angry rainbow](https://observablehq.com/@mbostock/sinebow) color scheme.

## interpolateSinebow(*t*) {#interpolateSinebow}

<ColorRamp :color="d3.interpolateSinebow" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/sinebow.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “sinebow” color scheme by [Jim Bumgardner](https://krazydad.com/tutorials/makecolors.php) and [Charlie Loyd](http://basecase.org/env/on-rainbows).

# docs/d3-scale-chromatic/diverging.md

<script setup>

import * as d3 from "d3";
import ColorRamp from "../components/ColorRamp.vue";
import ColorSwatches from "../components/ColorSwatches.vue";

</script>

# Diverging schemes

Diverging color schemes are available as continuous interpolators (often used with [d3.scaleSequential](../d3-scale/sequential.md)) and as discrete schemes (often used with [d3.scaleOrdinal](../d3-scale/ordinal.md)).

Each discrete scheme, such as [d3.schemeBrBG](#schemeBrBG), is represented as an array of arrays of hexadecimal color strings. The *k*th element of this array contains the color scheme of size *k*; for example, `d3.schemeBrBG[9]` contains an array of nine strings representing the nine colors of the brown-blue-green diverging color scheme. Diverging color schemes support a size *k* ranging from 3 to 11.

To create a diverging continuous color scale using the [PiYG](#interpolatePiYG) color scheme:

```js
const color = d3.scaleSequential(d3.interpolatePiYG);
```

To create a diverging discrete nine-color scale using the [PiYG](#schemePiYG) color scheme:

```js
const color = d3.scaleOrdinal(d3.schemePiYG[9]);
```

## interpolateBrBG(t) {#interpolateBrBG}

<ColorRamp :color="d3.interpolateBrBG" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/BrBG.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “BrBG” diverging color scheme represented as an RGB string.

## interpolatePRGn(t) {#interpolatePRGn}

<ColorRamp :color="d3.interpolatePRGn" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/PRGn.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “PRGn” diverging color scheme represented as an RGB string.

## interpolatePiYG(t) {#interpolatePiYG}

<ColorRamp :color="d3.interpolatePiYG" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/PiYG.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “PiYG” diverging color scheme represented as an RGB string.

## interpolatePuOr(t) {#interpolatePuOr}

<ColorRamp :color="d3.interpolatePuOr" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/PuOr.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “PuOr” diverging color scheme represented as an RGB string.

## interpolateRdBu(t) {#interpolateRdBu}

<ColorRamp :color="d3.interpolateRdBu" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/RdBu.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “RdBu” diverging color scheme represented as an RGB string.

## interpolateRdGy(t) {#interpolateRdGy}

<ColorRamp :color="d3.interpolateRdGy" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/RdGy.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “RdGy” diverging color scheme represented as an RGB string.

## interpolateRdYlBu(t) {#interpolateRdYlBu}

<ColorRamp :color="d3.interpolateRdYlBu" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/RdYlBu.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “RdYlBu” diverging color scheme represented as an RGB string.

## interpolateRdYlGn(t) {#interpolateRdYlGn}

<ColorRamp :color="d3.interpolateRdYlGn" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/RdYlGn.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “RdYlGn” diverging color scheme represented as an RGB string.

## interpolateSpectral(t) {#interpolateSpectral}

<ColorRamp :color="d3.interpolateSpectral" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/Spectral.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “Spectral” diverging color scheme represented as an RGB string.

## schemeBrBG[*k*] {#schemeBrBG}

<ColorSwatches :colors="d3.schemeBrBG[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/BrBG.js) · The “BrBG” discrete diverging color scheme of size *k* in 3–11.

## schemePRGn[*k*] {#schemePRGn}

<ColorSwatches :colors="d3.schemePRGn[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/PRGn.js) · The “PRGn” discrete diverging color scheme of size *k* in 3–11.

## schemePiYG[*k*] {#schemePiYG}

<ColorSwatches :colors="d3.schemePiYG[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/PiYG.js) · The “PiYG” discrete diverging color scheme of size *k* in 3–11.

## schemePuOr[*k*] {#schemePuOr}

<ColorSwatches :colors="d3.schemePuOr[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/PuOr.js) · The “PuOr” discrete diverging color scheme of size *k* in 3–11.

## schemeRdBu[*k*] {#schemeRdBu}

<ColorSwatches :colors="d3.schemeRdBu[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/RdBu.js) · The “RdBu” discrete diverging color scheme of size *k* in 3–11.

## schemeRdGy[*k*] {#schemeRdGy}

<ColorSwatches :colors="d3.schemeRdGy[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/RdGy.js) · The “RdGy” discrete diverging color scheme of size *k* in 3–11.

## schemeRdYlBu[*k*] {#schemeRdYlBu}

<ColorSwatches :colors="d3.schemeRdYlBu[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/RdYlBu.js) · The “RdYlBu” discrete diverging color scheme of size *k* in 3–11.

## schemeRdYlGn[*k*] {#schemeRdYlGn}

<ColorSwatches :colors="d3.schemeRdYlGn[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/RdYlGn.js) · The “RdYlGn” discrete diverging color scheme of size *k* in 3–11.

## schemeSpectral[*k*] {#schemeSpectral}

<ColorSwatches :colors="d3.schemeSpectral[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/Spectral.js) · The “Spectral” discrete diverging color scheme of size *k* in 3–11.

# docs/d3-scale-chromatic/sequential.md

<script setup>

import * as d3 from "d3";
import ColorRamp from "../components/ColorRamp.vue";
import ColorSwatches from "../components/ColorSwatches.vue";

</script>

# Sequential schemes

Sequential color schemes are available as continuous interpolators (often used with [d3.scaleSequential](../d3-scale/sequential.md)) and as discrete schemes (often used with [d3.scaleOrdinal](../d3-scale/ordinal.md)).

Each discrete scheme, such as [d3.schemeBlues](#schemeBlues), is represented as an array of arrays of hexadecimal color strings. The *k*th element of this array contains the color scheme of size *k*; for example, `d3.schemeBlues[9]` contains an array of nine strings representing the nine colors of the blue sequential color scheme. Sequential color schemes support a size *k* ranging from 3 to 9.

To create a sequential discrete nine-color scale using the [Blues](#schemeBlues) color scheme:

```js
const color = d3.scaleOrdinal(d3.schemeBlues[9]);
```

To create a sequential continuous color scale using the [Blues](#interpolateBlues) color scheme:

```js
const color = d3.scaleSequential(d3.interpolateBlues);
```

## interpolateBlues(t) {#interpolateBlues}

<ColorRamp :color="d3.interpolateBlues" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Blues.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “Blues” sequential color scheme represented as an RGB string.

## interpolateGreens(t) {#interpolateGreens}

<ColorRamp :color="d3.interpolateGreens" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Greens.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “Greens” sequential color scheme represented as an RGB string.

## interpolateGreys(t) {#interpolateGreys}

<ColorRamp :color="d3.interpolateGreys" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Greys.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “Greys” sequential color scheme represented as an RGB string.

## interpolateOranges(t) {#interpolateOranges}

<ColorRamp :color="d3.interpolateOranges" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Oranges.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “Oranges” sequential color scheme represented as an RGB string.

## interpolatePurples(t) {#interpolatePurples}

<ColorRamp :color="d3.interpolatePurples" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Purples.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “Purples” sequential color scheme represented as an RGB string.

## interpolateReds(t) {#interpolateReds}

<ColorRamp :color="d3.interpolateReds" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Reds.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “Reds” sequential color scheme represented as an RGB string.

## interpolateTurbo(t) {#interpolateTurbo}

<ColorRamp :color="d3.interpolateTurbo" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/turbo.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “turbo” color scheme by [Anton Mikhailov](https://ai.googleblog.com/2019/08/turbo-improved-rainbow-colormap-for.html).

## interpolateViridis(t) {#interpolateViridis}

<ColorRamp :color="d3.interpolateViridis" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/viridis.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “viridis” perceptually-uniform color scheme designed by [van der Walt, Smith and Firing](https://bids.github.io/colormap/) for matplotlib, represented as an RGB string.

## interpolateInferno(t) {#interpolateInferno}

<ColorRamp :color="d3.interpolateInferno" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/viridis.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “inferno” perceptually-uniform color scheme designed by [van der Walt and Smith](https://bids.github.io/colormap/) for matplotlib, represented as an RGB string.

## interpolateMagma(t) {#interpolateMagma}

<ColorRamp :color="d3.interpolateMagma" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/viridis.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “magma” perceptually-uniform color scheme designed by [van der Walt and Smith](https://bids.github.io/colormap/) for matplotlib, represented as an RGB string.

## interpolatePlasma(t) {#interpolatePlasma}

<ColorRamp :color="d3.interpolatePlasma" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/viridis.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “plasma” perceptually-uniform color scheme designed by [van der Walt and Smith](https://bids.github.io/colormap/) for matplotlib, represented as an RGB string.

## interpolateCividis(t) {#interpolateCividis}

<ColorRamp :color="d3.interpolateCividis" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/cividis.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “cividis” color vision deficiency-optimized color scheme designed by [Nuñez, Anderton, and Renslow](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0199239), represented as an RGB string.

## interpolateWarm(t) {#interpolateWarm}

<ColorRamp :color="d3.interpolateWarm" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/rainbow.js) · Given a number *t* in the range [0,1], returns the corresponding color from a 180° rotation of [Niccoli’s perceptual rainbow](https://mycarta.wordpress.com/2013/02/21/perceptual-rainbow-palette-the-method/), represented as an RGB string.

## interpolateCool(t) {#interpolateCool}

<ColorRamp :color="d3.interpolateCool" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/rainbow.js) · Given a number *t* in the range [0,1], returns the corresponding color from [Niccoli’s perceptual rainbow](https://mycarta.wordpress.com/2013/02/21/perceptual-rainbow-palette-the-method/), represented as an RGB string.

## interpolateCubehelixDefault(t) {#interpolateCubehelixDefault}

<ColorRamp :color="d3.interpolateCubehelixDefault" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/cubehelix.js) · Given a number *t* in the range [0,1], returns the corresponding color from [Green’s default Cubehelix](http://www.mrao.cam.ac.uk/~dag/CUBEHELIX/) represented as an RGB string.

## interpolateBuGn(t) {#interpolateBuGn}

<ColorRamp :color="d3.interpolateBuGn" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/BuGn.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “BuGn” sequential color scheme represented as an RGB string.

## interpolateBuPu(t) {#interpolateBuPu}

<ColorRamp :color="d3.interpolateBuPu" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/BuPu.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “BuPu” sequential color scheme represented as an RGB string.

## interpolateGnBu(t) {#interpolateGnBu}

<ColorRamp :color="d3.interpolateGnBu" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/GnBu.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “GnBu” sequential color scheme represented as an RGB string.

## interpolateOrRd(t) {#interpolateOrRd}

<ColorRamp :color="d3.interpolateOrRd" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/OrRd.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “OrRd” sequential color scheme represented as an RGB string.

## interpolatePuBuGn(t) {#interpolatePuBuGn}

<ColorRamp :color="d3.interpolatePuBuGn" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/PuBuGn.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “PuBuGn” sequential color scheme represented as an RGB string.

## interpolatePuBu(t) {#interpolatePuBu}

<ColorRamp :color="d3.interpolatePuBu" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/PuBu.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “PuBu” sequential color scheme represented as an RGB string.

## interpolatePuRd(t) {#interpolatePuRd}

<ColorRamp :color="d3.interpolatePuRd" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/PuRd.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “PuRd” sequential color scheme represented as an RGB string.

## interpolateRdPu(t) {#interpolateRdPu}

<ColorRamp :color="d3.interpolateRdPu" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/RdPu.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “RdPu” sequential color scheme represented as an RGB string.

## interpolateYlGnBu(t) {#interpolateYlGnBu}

<ColorRamp :color="d3.interpolateYlGnBu" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/YlGnBu.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “YlGnBu” sequential color scheme represented as an RGB string.

## interpolateYlGn(t) {#interpolateYlGn}

<ColorRamp :color="d3.interpolateYlGn" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/YlGn.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “YlGn” sequential color scheme represented as an RGB string.

## interpolateYlOrBr(t) {#interpolateYlOrBr}

<ColorRamp :color="d3.interpolateYlOrBr" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/YlOrBr.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “YlOrBr” sequential color scheme represented as an RGB string.

## interpolateYlOrRd(t) {#interpolateYlOrRd}

<ColorRamp :color="d3.interpolateYlOrRd" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/YlOrRd.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “YlOrRd” sequential color scheme represented as an RGB string.

## schemeBlues[*k*] {#schemeBlues}

<ColorSwatches :colors="d3.schemeBlues[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Blues.js) · The “Blues” discrete sequential color scheme of size *k* in 3–9.

## schemeGreens[*k*] {#schemeGreens}

<ColorSwatches :colors="d3.schemeGreens[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Greens.js) · The “Greens” discrete sequential color scheme of size *k* in 3–9.

## schemeGreys[*k*] {#schemeGreys}

<ColorSwatches :colors="d3.schemeGreys[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Greys.js) · The “Greys” discrete sequential color scheme of size *k* in 3–9.

## schemeOranges[*k*] {#schemeOranges}

<ColorSwatches :colors="d3.schemeOranges[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Oranges.js) · The “Oranges” discrete sequential color scheme of size *k* in 3–9.

## schemePurples[*k*] {#schemePurples}

<ColorSwatches :colors="d3.schemePurples[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Purples.js) · The “Purples” discrete sequential color scheme of size *k* in 3–9.

## schemeReds[*k*] {#schemeReds}

<ColorSwatches :colors="d3.schemeReds[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Reds.js) · The “Reds” discrete sequential color scheme of size *k* in 3–9.

## schemeBuGn[*k*] {#schemeBuGn}

<ColorSwatches :colors="d3.schemeBuGn[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/BuGn.js) · The “BuGn” discrete sequential color scheme of size *k* in 3–9.

## schemeBuPu[*k*] {#schemeBuPu}

<ColorSwatches :colors="d3.schemeBuPu[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/BuPu.js) · The “BuPu” discrete sequential color scheme of size *k* in 3–9.

## schemeGnBu[*k*] {#schemeGnBu}

<ColorSwatches :colors="d3.schemeGnBu[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/GnBu.js) · The “GnBu” discrete sequential color scheme of size *k* in 3–9.

## schemeOrRd[*k*] {#schemeOrRd}

<ColorSwatches :colors="d3.schemeOrRd[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/OrRd.js) · The “OrRd” discrete sequential color scheme of size *k* in 3–9.

## schemePuBuGn[*k*] {#schemePuBuGn}

<ColorSwatches :colors="d3.schemePuBuGn[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/PuBuGn.js) · The “PuBuGn” discrete sequential color scheme of size *k* in 3–9.

## schemePuBu[*k*] {#schemePuBu}

<ColorSwatches :colors="d3.schemePuBu[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/PuBu.js) · The “PuBu” discrete sequential color scheme of size *k* in 3–9.

## schemePuRd[*k*] {#schemePuRd}

<ColorSwatches :colors="d3.schemePuRd[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/PuRd.js) · The “PuRd” discrete sequential color scheme of size *k* in 3–9.

## schemeRdPu[*k*] {#schemeRdPu}

<ColorSwatches :colors="d3.schemeRdPu[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/RdPu.js) · The “RdPu” discrete sequential color scheme of size *k* in 3–9.

## schemeYlGnBu[*k*] {#schemeYlGnBu}

<ColorSwatches :colors="d3.schemeYlGnBu[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/YlGnBu.js) · The “YlGnBu” discrete sequential color scheme of size *k* in 3–9.

## schemeYlGn[*k*] {#schemeYlGn}

<ColorSwatches :colors="d3.schemeYlGn[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/YlGn.js) · The “YlGn” discrete sequential color scheme of size *k* in 3–9.

## schemeYlOrBr[*k*] {#schemeYlOrBr}

<ColorSwatches :colors="d3.schemeYlOrBr[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/YlOrBr.js) · The “YlOrBr” discrete sequential color scheme of size *k* in 3–9.

## schemeYlOrRd[*k*] {#schemeYlOrRd}

<ColorSwatches :colors="d3.schemeYlOrRd[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/YlOrRd.js) · The “YlOrRd” discrete sequential color scheme of size *k* in 3–9.


# docs/d3-scale.md

# d3-scale

Scales map a dimension of abstract data to a visual representation. Although most often used for encoding data as position, say to map time and temperature to a horizontal and vertical position in a scatterplot, scales can represent virtually any visual encoding, such as color, stroke width, or symbol size. Scales can also be used with virtually any type of data, such as named categorical data or discrete data that requires sensible breaks.

See one of:

* [Linear scales](./d3-scale/linear.md) - for quantitative data
* [Time scales](./d3-scale/time.md) - for time-series data
* [Pow scales](./d3-scale/pow.md) - for quantitative data (that has a wide range)
* [Log scales](./d3-scale/log.md) - for quantitative data (that has a wide range)
* [Symlog scales](./d3-scale/symlog.md) - for quantitative data (that has a wide range)
* [Ordinal scales](./d3-scale/ordinal.md) - for categorical or ordinal data
* [Band scales](./d3-scale/band.md) - for categorical or ordinal data as a position encoding
* [Point scales](./d3-scale/point.md) - for categorical or ordinal data as a position encoding
* [Sequential scales](./d3-scale/sequential.md) - for quantitative data as a sequential color encoding
* [Diverging scales](./d3-scale/diverging.md) - for quantitative data as a diverging color encoding
* [Quantile scales](./d3-scale/quantile.md) - for quantitative data as a discrete encoding
* [Quantize scales](./d3-scale/quantize.md) - for quantitative data as a discrete encoding
* [Threshold scales](./d3-scale/threshold.md) - for quantitative data as a discrete encoding

For visualizing the scale’s encoding, see [d3-axis](./d3-axis.md), as well as [*scale*.ticks](./d3-scale/linear.md#linear_ticks) and [*scale*.tickFormat](./d3-scale/linear.md#linear_tickFormat). For color schemes, see [d3-scale-chromatic](./d3-scale-chromatic.md).

# docs/d3-scale/band.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref} from "vue";
import PlotRender from "../components/PlotRender.js";

const domain = ref("a,b,c,d,e,f");
const padding = ref(0.1);
const paddingOuter = ref(0.1);
const paddingInner = ref(0.1);
const align = ref(0.5);
const round = ref(false);

</script>

# Band scales

Band scales are like [ordinal scales](./ordinal.md) except the output range is continuous and numeric. The scale divides the continuous range into uniform bands. Band scales are typically used for bar charts with an ordinal or categorical dimension.

## scaleBand(*domain*, *range*) {#scaleBand}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Constructs a new band scale with the specified [*domain*](#band_domain) and [*range*](#band_range), no [padding](#band_padding), no [rounding](#band_round) and center [alignment](#band_align).

```js
const x = d3.scaleBand(["a", "b", "c"], [0, 960]);
```

If a single argument is specified, it is interpreted as the *range*. If *domain* is not specified, it defaults to the empty domain. If *range* is not specified, it defaults to the unit range [0, 1].

## *band*(*value*) {#_band}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Given a *value* in the input [domain](#band_domain), returns the start of the corresponding band derived from the output [range](#band_range).

```js
const x = d3.scaleBand(["a", "b", "c"], [0, 960]);
x("a"); // 0
x("b"); // 320
x("c"); // 640
x("d"); // undefined
```

If the given *value* is not in the scale’s domain, returns undefined.

## *band*.domain(*domain*) {#band_domain}

<p>
  <label class="label-input">
    Domain:
    <input type="text" v-model="domain">
  </label>
</p>

<PlotRender :options='{
  grid: true,
  marginTop: 0.5,
  x: {
    padding: 0.1,
    domain: d3.csvParseRows(domain).flat()
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.cell(d3.csvParseRows(domain).flat(), {x: Plot.identity, stroke: "currentColor"})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *domain* is specified, sets the domain to the specified array of values and returns this scale.

```js-vue
const x = d3.scaleBand([0, 960]).domain([{{d3.csvParseRows(domain).flat().map(JSON.stringify).join(", ")}}]);
```

The first element in *domain* will be mapped to the first band, the second domain value to the second band, and so on. Domain values are stored internally in an [InternMap](../d3-array/intern.md) from primitive value to index; the resulting index is then used to determine the band. Thus, a band scale’s values must be coercible to a primitive value, and the primitive domain value uniquely identifies the corresponding band. If *domain* is not specified, this method returns the current domain.

## *band*.range(*range*) {#band_range}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *range* is specified, sets the scale’s range to the specified two-element array of numbers and returns this scale.

```js
const x = d3.scaleBand().range([0, 960]);
```

If the elements in the given array are not numbers, they will be coerced to numbers. If *range* is not specified, returns the scale’s current range, which defaults to [0, 1].

## *band*.rangeRound(*range*) {#band_rangeRound}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Sets the scale’s [*range*](#band_range) to the specified two-element array of numbers while also enabling [rounding](#band_round); returns this scale.

```js
const x = d3.scaleBand().rangeRound([0, 960]);
```

This is a convenience method equivalent to:

```js
band.range(range).round(true)
```

Rounding is sometimes useful for avoiding antialiasing artifacts, though also consider the [shape-rendering](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering) “crispEdges” styles.

## *band*.round(*round*) {#band_round}

<p>
  <label class="label-input">
    Round:
    <input type="checkbox" v-model="round">
  </label>
</p>

<PlotRender :options='{
  grid: true,
  marginTop: 0.5,
  x: {
    padding: 0.2,
    round
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.cell("abcdefghij", {x: Plot.identity, stroke: "currentColor"})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *round* is specified, enables or disables rounding accordingly and returns this scale.

```js-vue
const x = d3.scaleBand(["a", "b", "c"], [0, 960]).round({{round}});
```

If *round* is not specified, returns whether rounding is enabled.

```js-vue
x.round() // {{round}}
```

If rounding is enabled, the start and stop of each band will be integers. Rounding is sometimes useful for avoiding antialiasing artifacts, though also consider the [shape-rendering](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering) “crispEdges” styles. Note that if the width of the domain is not a multiple of the cardinality of the range, there may be leftover unused space, even without padding! Use [*band*.align](#band_align) to specify how the leftover space is distributed.

## *band*.paddingInner(*padding*) {#band_paddingInner}

<p>
  <label class="label-input">
    <span>Inner padding:</span>
    <input type="range" v-model.number="paddingInner" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{paddingInner.toFixed(2)}}</span>
  </label>
</p>

<PlotRender :options='{
  grid: true,
  marginTop: 0.5,
  x: {
    paddingInner,
    round: false
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.cell("abcdefghij", {x: Plot.identity, stroke: "currentColor"})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *padding* is specified, sets the inner padding to the specified number which must be less than or equal to 1 and returns this scale.

```js-vue
const x = d3.scaleBand(["a", "b", "c"], [0, 960]).paddingInner({{paddingInner}});
```

If *padding* is not specified, returns the current inner padding which defaults to 0.

```js-vue
x.paddingInner() // {{paddingInner}}
```

The inner padding specifies the proportion of the range that is reserved for blank space between bands; a value of 0 means no blank space between bands, and a value of 1 means a [bandwidth](#band_bandwidth) of zero.

## *band*.paddingOuter(*padding*) {#band_paddingOuter}

<p>
  <label class="label-input">
    <span>Outer padding:</span>
    <input type="range" v-model.number="paddingOuter" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{paddingOuter.toFixed(2)}}</span>
  </label>
</p>

<PlotRender :options='{
  grid: true,
  marginTop: 0.5,
  x: {
    paddingOuter,
    round: false
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.cell("abcdefghij", {x: Plot.identity, stroke: "currentColor"})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *padding* is specified, sets the outer padding to the specified number which is typically in the range [0, 1] and returns this scale.

```js-vue
const x = d3.scaleBand(["a", "b", "c"], [0, 960]).paddingOuter({{paddingOuter}});
```

If *padding* is not specified, returns the current outer padding which defaults to 0.

```js-vue
x.paddingOuter() // {{paddingOuter}}
```

The outer padding specifies the amount of blank space, in terms of multiples of the [step](#band_step), to reserve before the first band and after the last band.

## *band*.padding(*padding*) {#band_padding}

<p>
  <label class="label-input">
    <span>Padding:</span>
    <input type="range" v-model.number="padding" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{padding.toFixed(2)}}</span>
  </label>
</p>

<PlotRender :options='{
  grid: true,
  marginTop: 0.5,
  x: {
    padding,
    round: false
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.cell("abcdefghij", {x: Plot.identity, stroke: "currentColor"})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · A convenience method for setting the [inner](#band_paddingInner) and [outer](#band_paddingOuter) padding to the same *padding* value.

```js-vue
const x = d3.scaleBand(["a", "b", "c"], [0, 960]).padding({{padding}});
```

If *padding* is not specified, returns the inner padding.

```js-vue
x.padding() // {{padding}}
```

## *band*.align(*align*) {#band_align}

<p>
  <label class="label-input">
    <span>Align:</span>
    <input type="range" v-model.number="align" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{align.toFixed(2)}}</span>
  </label>
</p>

<PlotRender :options='{
  grid: true,
  marginTop: 0.5,
  x: {
    padding: 0.2,
    align,
    round: false
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.cell("abcdefghij", {x: Plot.identity, stroke: "currentColor"})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *align* is specified, sets the alignment to the specified value which must be in the range [0, 1], and returns this scale.

```js-vue
const x = d3.scaleBand(["a", "b", "c"], [0, 960]).align({{align}});
```

If *align* is not specified, returns the current alignment which defaults to 0.5.

```js-vue
x.align() // {{align}}
```

The alignment specifies how outer padding is distributed in the range. A value of 0.5 indicates that the outer padding should be equally distributed before the first band and after the last band; *i.e.*, the bands should be centered within the range. A value of 0 or 1 may be used to shift the bands to one side, say to position them adjacent to an axis. For more, [see this explainer](https://observablehq.com/@d3/band-align).

## *band*.bandwidth() {#band_bandwidth}

<PlotRender :options='{
  grid: true,
  marginTop: 10.5,
  x: {
    padding: 0.2,
    round: false
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.cell("abcdefghij", {x: Plot.identity, stroke: "currentColor"}),
    Plot.dotX(["a"], {stroke: "var(--vp-c-brand)", symbol: {draw(context, size) { const x = Plot.scale({x: {type: "band", padding: 0.2, round: false, domain: "abcdefghij", range: [20, 688 - 20]}}); const r = x.bandwidth / 2; context.moveTo(6 - r, -22 - 3); context.lineTo(0 - r, -22); context.lineTo(6 - r, -22 + 3); context.moveTo(0 - r, -22); context.lineTo(r, -22); context.moveTo(r - 6, -22 - 3); context.lineTo(r, -22); context.lineTo(r - 6, -22 + 3); }}})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Returns the width of each band.

```js
x.bandwidth() // 50.8235294117647
```

## *band*.step() {#band_step}

<PlotRender :options='{
  grid: true,
  marginTop: 10.5,
  x: {
    padding: 0.2,
    round: false
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.cell("abcdefghij", {x: Plot.identity, stroke: "currentColor"}),
    Plot.dotX(["a"], {stroke: "var(--vp-c-brand)", symbol: {draw(context, size) { const x = Plot.scale({x: {type: "band", padding: 0.2, round: false, domain: "abcdefghij", range: [20, 688 - 20]}}); const r = x.bandwidth / 2; context.moveTo(6 - r, -22 - 3); context.lineTo(0 - r, -22); context.lineTo(6 - r, -22 + 3); context.moveTo(0 - r, -22); context.lineTo(x.step - r, -22); context.moveTo(x.step - 6 - r, -22 - 3); context.lineTo(x.step - r, -22); context.lineTo(x.step - 6 - r, -22 + 3); }}})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Returns the distance between the starts of adjacent bands.

```js
x.step() // 63.529411764705884
```

## *band*.copy() {#band_copy}

[Examples](https://observablehq.com/@d3/d3-scaleband) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Returns an exact copy of this scale.

```js
const x1 = d3.scaleBand(["a", "b", "c"], [0, 960]);
const x2 = x1.copy();
```

Changes to this scale will not affect the returned scale, and vice versa.

# docs/d3-scale/diverging.md

# Diverging scales

Diverging scales are similar to [linear scales](./linear.md) in that they map a continuous, numeric input domain to a continuous output range. Unlike linear scales, the input domain and output range of a diverging scale always have exactly three elements, and the output range is typically specified as an interpolator rather than an array of values. Diverging scales are typically used for a color encoding; see also [d3-scale-chromatic](../d3-scale-chromatic.md). These scales do not expose [invert](./linear.md#linear_invert) and [interpolate](./linear.md#linear_interpolate) methods. There are also [log](#scaleDivergingLog), [pow](#scaleDivergingPow), and [symlog](#scaleDivergingSymlog) variants of diverging scales.

## scaleDiverging(*domain*, *interpolator*) {#scaleDiverging}

[Examples](https://observablehq.com/@d3/diverging-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/diverging.js) · Constructs a new diverging scale with the specified [*domain*](./linear.md#linear_domain) and [*interpolator*](#diverging_interpolator) function or array.

```js
const color = d3.scaleDiverging([-1, 0, 1], d3.interpolateRdBu);
```

If *domain* is not specified, it defaults to [0, 0.5, 1].

```js
const color = d3.scaleDiverging(d3.interpolateRdBu);
```

If *interpolator* is not specified, it defaults to the identity function.

```js
const identity = d3.scaleDiverging();
```

When the scale is applied, the interpolator will be invoked with a value typically in the range [0, 1], where 0 represents the extreme negative value, 0.5 represents the neutral value, and 1 represents the extreme positive value.

If *interpolator* is an array, it represents the scale’s three-element output range and is converted to an interpolator function using [d3.interpolate](../d3-interpolate/value.md#interpolate) and [d3.piecewise](../d3-interpolate/value.md#piecewise).

```js
const color = d3.scaleDiverging(["blue", "white", "red"]);
```

A diverging scale’s domain must be numeric and must contain exactly three values.

## *diverging*.interpolator(*interpolator*) {#diverging_interpolator}

If *interpolator* is specified, sets the scale’s interpolator to the specified function.

```js
const color = d3.scaleDiverging().interpolator(d3.interpolateRdBu);
```

If *interpolator* is not specified, returns the scale’s current interpolator.

```js
color.interpolator() // d3.interpolateRdBu
```

## *diverging*.range(*range*) {#diverging_range}

See [*linear*.range](./linear.md#linear_range). If *range* is specified, the given three-element array is converted to an interpolator function using [piecewise](../d3-interpolate/value.md#piecewise).

```js
const color = d3.scaleDiverging().range(["blue", "white", "red"]);
```

The above is equivalent to:

```js
const color = d3.scaleDiverging(d3.piecewise(["blue", "white", "red"]));
```

## *diverging*.rangeRound(*range*) {#diverging_rangeRound}

See [*linear*.range](./linear.md#linear_rangeRound). If *range* is specified, implicitly uses [interpolateRound](../d3-interpolate/value.md#interpolateRound) as the interpolator.

## scaleDivergingLog(*domain*, *range*) {#scaleDivergingLog}

Returns a new diverging scale with a logarithmic transform, analogous to a [log scale](./log.md).

## scaleDivergingPow(*domain*, *range*) {#scaleDivergingPow}

Returns a new diverging scale with an exponential transform, analogous to a [power scale](./pow.md).

## scaleDivergingSqrt(*domain*, *range*) {#scaleDivergingSqrt}

Returns a new diverging scale with a square-root transform, analogous to a [sqrt scale](./pow.md#scaleSqrt).

## scaleDivergingSymlog(*domain*, *range*) {#scaleDivergingSymlog}

Returns a new diverging scale with a symmetric logarithmic transform, analogous to a [symlog scale](./symlog.md).

# docs/d3-scale/linear.md

# Linear scales

Linear scales map a continuous, quantitative input [domain](#linear_domain) to a continuous output [range](#linear_range) using a linear transformation (translate and scale). If the range is also numeric, the mapping may be [inverted](#linear_invert). Linear scales are a good default choice for continuous quantitative data because they preserve proportional differences. Each range value *y* can be expressed as a function of the domain value *x*: *y* = *mx* + *b*.

<!-- A continuous scale is not constructed directly; instead, try a [linear](#linear-scales), [power](#power-scales), [log](#log-scales), [identity](#identity-scales), [radial](#radial-scales), [time](#time-scales) or [sequential color](#sequential-scales) scale. -->

## scaleLinear(*domain*, *range*) {#scaleLinear}

[Examples](https://observablehq.com/@d3/d3-scalelinear) · [Source](https://github.com/d3/d3-scale/blob/main/src/linear.js) · Constructs a new linear scale with the specified [domain](#linear_domain) and [range](#linear_range), the [default](../d3-interpolate/value.md#interpolate) [interpolator](#linear_interpolate), and [clamping](#linear_clamp) disabled.

```js
d3.scaleLinear([0, 100], ["red", "blue"])
```

If a single argument is specified, it is interpreted as the *range*. If either *domain* or *range* are not specified, each defaults to [0, 1].

```js
d3.scaleLinear(["red", "blue"]) // default domain of [0, 1]
```

## *linear*(*value*) {#_linear}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · Given a *value* from the [domain](#linear_domain), returns the corresponding value from the [range](#linear_range). For example, to apply a position encoding:

```js
const x = d3.scaleLinear([10, 130], [0, 960]);
x(20); // 80
x(50); // 320
```

To apply a color encoding:

```js
const color = d3.scaleLinear([10, 100], ["brown", "steelblue"]);
color(20); // "rgb(154, 52, 57)"
color(50); // "rgb(123, 81, 103)"
```

If the given *value* is outside the domain, and [clamping](#linear_clamp) is not enabled, the mapping will be extrapolated such that the returned value is outside the range.

## *linear*.invert(*value*) {#linear_invert}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · Given a *value* from the [range](#linear_range), returns the corresponding value from the [domain](#linear_domain). Inversion is useful for interaction, say to determine the data value corresponding to the position of the mouse. For example, to invert a position encoding:

```js
const x = d3.scaleLinear([10, 130], [0, 960]);
x.invert(80); // 20
x.invert(320); // 50
```

If the given *value* is outside the range, and [clamping](#linear_clamp) is not enabled, the mapping may be extrapolated such that the returned value is outside the domain. This method is only supported if the range is numeric. If the range is not numeric, returns NaN.

For a valid value *y* in the range, <i>linear</i>(<i>linear</i>.invert(<i>y</i>)) approximately equals *y*; similarly, for a valid value *x* in the domain, <i>linear</i>.invert(<i>linear</i>(<i>x</i>)) approximately equals *x*. The scale and its inverse may not be exact due to the limitations of floating point precision.

## *linear*.domain(*domain*) {#linear_domain}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · If *domain* is specified, sets the scale’s domain to the specified array of numbers and returns this scale.

```js
const x = d3.scaleLinear().domain([10, 130]);
```

The array must contain two or more elements. If the elements in the given array are not numbers, they will be coerced to numbers.

Although continuous scales typically have two values each in their domain and range, specifying more than two values produces a piecewise scale. For example, to create a [diverging color scale](./diverging.md) that interpolates between white and red for negative values, and white and green for positive values, say:

```js
const color = d3.scaleLinear([-1, 0, 1], ["red", "white", "green"]);
color(-0.5); // "rgb(255, 128, 128)"
color(+0.5); // "rgb(128, 192, 128)"
```

Internally, a piecewise scale performs a [binary search](../d3-array/bisect.md) for the range interpolator corresponding to the given domain value. Thus, the domain must be in ascending or descending order. If the domain and range have different lengths *N* and *M*, only the first *min(N,M)* elements in each are observed.

If *domain* is not specified, returns a copy of the scale’s current domain.

```js
color.domain() // [-1, 0, 1]
```

## *linear*.range(range) {#linear_range}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · If *range* is specified, sets the scale’s range to the specified array of values and returns this scale.

```js
const x = d3.scaleLinear().range([0, 960]);
```

The array must contain two or more elements. Unlike the [domain](#linear_domain), elements in the given array need not be numbers; any value that is supported by the underlying [interpolator](#linear_interpolate) will work, though note that numeric ranges are required for [invert](#linear_invert).

If *range* is not specified, returns a copy of the scale’s current range.

```js
x.range() // [0, 960]
```

See [*linear*.interpolate](#linear_interpolate) for more examples.

## *linear*.rangeRound(*range*) {#linear_rangeRound}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · Sets the scale’s [*range*](#linear_range) to the specified array of values while also setting the scale’s [interpolator](#linear_interpolate) to [interpolateRound](../d3-interpolate/value.md#interpolateRound); returns this scale.

```js
const x = d3.scaleLinear().rangeRound([0, 960]);
```

This is a convenience method equivalent to:

```js
linear.range(range).interpolate(d3.interpolateRound)
```

The rounding interpolator is sometimes useful for avoiding antialiasing artifacts, though also consider the [shape-rendering](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering) “crispEdges” styles. Note that this interpolator can only be used with numeric ranges.

## *linear*.clamp(*clamp*) {#linear_clamp}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · If *clamp* is specified, enables or disables clamping accordingly; returns this scale.

```js
const x = d3.scaleLinear([0, 960]).clamp(true);
```

If clamping is disabled and the scale is passed a value outside the [domain](#linear_domain), the scale may return a value outside the [range](#linear_range) through extrapolation. If clamping is enabled, the return value of the scale is always within the scale’s range. Clamping similarly applies to [*linear*.invert](#linear_invert). For example:

```js
const x = d3.scaleLinear([10, 130], [0, 960]); // clamping disabled by default
x(-10); // -160, outside range
x.invert(-160); // -10, outside domain
x.clamp(true); // enable clamping
x(-10); // 0, clamped to range
x.invert(-160); // 10, clamped to domain
```

If *clamp* is not specified, returns whether or not the scale currently clamps values to within the range.

```js
x.clamp() // true, perhaps
```

## *linear*.unknown(*value*) {#linear_unknown}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · If *value* is specified, sets the output value of the scale for undefined or NaN input values and returns this scale. This is useful for specifying how missing or invalid data is displayed.

```js
const color = d3.scaleLinear([0, 100], ["red", "blue"]).unknown("#ccc");
color(NaN); // "#ccc"
```

If *value* is not specified, returns the current unknown value, which defaults to undefined.

```js
color.unknown() // "#ccc"
```

## *linear*.interpolate(*interpolate*) {#linear_interpolate}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · If *interpolate* is specified, sets the scale’s [range](#linear_range) interpolator factory.

```js
const color = d3.scaleLinear(["red", "blue"]).interpolate(d3.interpolateHcl);
```

The scale’s interpolator factory is used to create interpolators for each adjacent pair of values from the range; these interpolators then map a normalized domain parameter *t* in [0, 1] to the corresponding value in the range. If *factory* is not specified, returns the scale’s current interpolator factory, which defaults to [d3.interpolate](../d3-interpolate/value.md#interpolate). See [d3-interpolate](../d3-interpolate.md) for more interpolators.

For example, consider a diverging color scale with three colors in the range:

```js
const color = d3.scaleLinear([-100, 0, +100], ["red", "white", "green"]);
```

Two interpolators are created internally by the scale, equivalent to:

```js
const i0 = d3.interpolate("red", "white");
const i1 = d3.interpolate("white", "green");
```

A common reason to specify a custom interpolator is to change the color space of interpolation. For example, to use [HCL](../d3-interpolate/color.md#interpolateHcl):

```js
const color = d3.scaleLinear()
    .domain([10, 100])
    .range(["brown", "steelblue"])
    .interpolate(d3.interpolateHcl);
```

Or for [Cubehelix](../d3-interpolate/color.md#interpolateCubehelix) with a custom gamma:

```js
const color = d3.scaleLinear()
    .domain([10, 100])
    .range(["brown", "steelblue"])
    .interpolate(d3.interpolateCubehelix.gamma(3));
```

:::warning CAUTION
The [default interpolator](../d3-interpolate/value.md#interpolate) **may reuse return values**. For example, if the range values are objects, then the value interpolator always returns the same object, modifying it in-place. If the scale is used to set an attribute or style, this is typically acceptable (and desirable for performance); however, if you need to store the scale’s return value, you must specify your own interpolator or make a copy as appropriate.
:::

## *linear*.ticks(*count*) {#linear_ticks}

[Examples](https://observablehq.com/@d3/scale-ticks) · [Source](https://github.com/d3/d3-scale/blob/main/src/linear.js) · Returns approximately *count* representative values from the scale’s [domain](#linear_domain).

```js
const x = d3.scaleLinear([10, 100], ["red", "blue"]);
x.ticks(); // [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
```

If *count* is not specified, it defaults to 10. The returned tick values are uniformly spaced, have human-readable values (such as multiples of powers of 10), and are guaranteed to be within the extent of the domain. Ticks are often used to display reference lines, or tick marks, in conjunction with the visualized data. The specified *count* is only a hint; the scale may return more or fewer values depending on the domain. See also d3-array’s [ticks](../d3-array/ticks.md).

## *linear*.tickFormat(*count*, *specifier*) {#linear_tickFormat}

[Examples](https://observablehq.com/@d3/scale-ticks) · [Source](https://github.com/d3/d3-scale/blob/main/src/tickFormat.js) · Returns a [number format](../d3-format.md) function suitable for displaying a tick value, automatically computing the appropriate precision based on the fixed interval between tick values. The specified *count* should have the same value as the count that is used to generate the [tick values](#linear_ticks).

```js
const x = d3.scaleLinear([0.1, 1], ["red", "blue"]);
const f = x.tickFormat();
f(0.1); // "0.1"
f(1); // "1.0"
```

An optional *specifier* allows a [custom format](../d3-format.md#locale_format) where the precision of the format is automatically set by the scale as appropriate for the tick interval. For example, to format percentage change, you might say:

```js
const x = d3.scaleLinear([-1, 1], [0, 960]);
const T = x.ticks(5); // [-1, -0.5, 0, 0.5, 1]
const f = x.tickFormat(5, "+%");
T.map(f); // ["−100%", "−50%", "+0%", "+50%", "+100%"]
```

If *specifier* uses the format type `s`, the scale will return a [SI-prefix format](../d3-format.md#locale_formatPrefix) based on the largest value in the domain. If the *specifier* already specifies a precision, this method is equivalent to [*locale*.format](../d3-format.md#locale_format).

See also [d3.tickFormat](#tickFormat).

## *linear*.nice(count) {#linear_nice}

[Examples](https://observablehq.com/@d3/d3-scalelinear) · [Source](https://github.com/d3/d3-scale/blob/main/src/nice.js) · Extends the [domain](#linear_domain) so that it starts and ends on nice round values.

```js
const x = d3.scaleLinear([0.241079, 0.969679], [0, 960]).nice();
x.domain(); // [0.2, 1]
```

This method typically modifies the scale’s domain, and may only extend the bounds to the nearest round value. Nicing is useful if the domain is computed from data, say using [extent](../d3-array/summarize.md#extent), and may be irregular. If the domain has more than two values, nicing the domain only affects the first and last value.

An optional tick *count* argument allows greater control over the step size used to extend the bounds, guaranteeing that the returned [ticks](#linear_ticks) will exactly cover the domain.

```js
const x = d3.scaleLinear([0.241079, 0.969679], [0, 960]).nice(40);
x.domain(); // [0.24, 0.98]
```

Nicing a scale only modifies the current domain; it does not automatically nice domains that are subsequently set using [*linear*.domain](#linear_domain). You must re-nice the scale after setting the new domain, if desired.

## *linear*.copy() {#linear_copy}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/continuous.js) · Returns an exact copy of this scale.

```js
const x1 = d3.scaleLinear([0, 100], ["red", "blue"]);
const x2 = x1.copy();
```

Changes to this scale will not affect the returned scale, and vice versa.

## tickFormat(*start*, *stop*, *count*, *specifier*) {#tickFormat}

[Examples](https://observablehq.com/@d3/scale-ticks) · [Source](https://github.com/d3/d3-scale/blob/main/src/tickFormat.js) · Returns a [number format](../d3-format.md) function suitable for displaying a tick value, automatically computing the appropriate precision based on the fixed interval between tick values, as determined by [d3.tickStep](../d3-array/ticks.md#tickStep).

```js
const f = d3.tickFormat(0, 1, 20);
f(1); // "1.00"
```

An optional *specifier* allows a [custom format](../d3-format.md#locale_format) where the precision of the format is automatically set by the scale as appropriate for the tick interval. For example, to format percentage change, you might say:

```js
const f = d3.tickFormat(-1, 1, 5, "+%");
f(-0.5); // "-50%"
```

If *specifier* uses the format type `s`, the scale will return a [SI-prefix format](../d3-format.md#locale_formatPrefix) based on the larger absolute value of *start* and *stop*. If the *specifier* already specifies a precision, this method is equivalent to [*locale*.format](../d3-format.md#locale_format).

## scaleIdentity(*range*) {#scaleIdentity}

[Examples](https://observablehq.com/@d3/d3-scalelinear) · [Source](https://github.com/d3/d3-scale/blob/main/src/identity.js) · Constructs a new identity scale with the specified [range](#linear_range) (and by extension, [domain](#linear_domain)).

```js
const x = d3.scaleIdentity([0, 960]);
```

Identity scales are a special case of [linear scales](#linear-scales) where the domain and range are identical; the scale and its invert method are thus the identity function. These scales are occasionally useful when working with pixel coordinates, say in conjunction with an axis. Identity scales do not support [rangeRound](#linear_rangeRound), [clamp](#linear_clamp) or [interpolate](#linear_interpolate).

If *range* is not specified, it defaults to [0, 1].

## scaleRadial(*domain*, *range*) {#scaleRadial}

[Examples](https://observablehq.com/@d3/radial-stacked-bar-chart) · [Source](https://github.com/d3/d3-scale/blob/main/src/radial.js) · Constructs a new radial scale with the specified [domain](#linear_domain) and [range](#linear_range).

```js
const r = d3.scaleRadial([100, 200], [0, 480]);
```

Radial scales are a variant of [linear scales](#linear-scales) where the range is internally squared so that an input value corresponds linearly to the squared output value. These scales are useful when you want the input value to correspond to the area of a graphical mark and the mark is specified by radius, as in a radial bar chart. Radial scales do not support [interpolate](#linear_interpolate).

If *domain* or *range* is not specified, each defaults to [0, 1].

# docs/d3-scale/log.md

# Logarithmic scales

Logarithmic (“log”) scales are like [linear scales](./linear.md) except that a logarithmic transform is applied to the input domain value before the output range value is computed. The mapping to the range value *y* can be expressed as a function of the domain value *x*: *y* = *m* log(<i>x</i>) + *b*.

:::warning CAUTION
As log(0) = -∞, a log scale domain must be **strictly-positive or strictly-negative**; the domain must not include or cross zero. A log scale with a positive domain has a well-defined behavior for positive values, and a log scale with a negative domain has a well-defined behavior for negative values. (For a negative domain, input and output values are implicitly multiplied by -1.) The behavior of the scale is undefined if you pass a negative value to a log scale with a positive domain or vice versa.
:::

## scaleLog(*domain*, *range*) {#scaleLog}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/log.js) · Constructs a new log scale with the specified [domain](./linear.md#linear_domain) and [range](./linear.md#linear_range), the [base](#log_base) 10, the [default](../d3-interpolate/value.md#interpolate) [interpolator](./linear.md#linear_interpolate) and [clamping](./linear.md#linear_clamp) disabled.

```js
const x = d3.scaleLog([1, 10], [0, 960]);
```

If *domain* is not specified, it defaults to [1, 10]. If *range* is not specified, it defaults to [0, 1].

## *log*.base(*base*) {#log_base}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/log.js) · If *base* is specified, sets the base for this logarithmic scale to the specified value.

```js
const x = d3.scaleLog([1, 1024], [0, 960]).base(2);
```

If *base* is not specified, returns the current base, which defaults to 10. Note that due to the nature of a logarithmic transform, the base does not affect the encoding of the scale; it only affects which [ticks](#log_ticks) are chosen.

## *log*.ticks(*count*) {#log_ticks}

[Examples](https://observablehq.com/@d3/scale-ticks) · [Source](https://github.com/d3/d3-scale/blob/main/src/log.js) · Like [*linear*.ticks](./linear.md#linear_ticks), but customized for a log scale.

```js
const x = d3.scaleLog([1, 100], [0, 960]);
const T = x.ticks(); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
```

If the [base](#log_base) is an integer, the returned ticks are uniformly spaced within each integer power of base; otherwise, one tick per power of base is returned. The returned ticks are guaranteed to be within the extent of the domain. If the orders of magnitude in the [domain](./linear.md#linear_domain) is greater than *count*, then at most one tick per power is returned. Otherwise, the tick values are unfiltered, but note that you can use [*log*.tickFormat](./linear.md#linear_tickFormat) to filter the display of tick labels. If *count* is not specified, it defaults to 10.

## *log*.tickFormat(*count*, *specifier*) {#log_tickFormat}

[Examples](https://observablehq.com/@d3/scale-ticks) · [Source](https://github.com/d3/d3-scale/blob/main/src/log.js) · Like [*linear*.tickFormat](./linear.md#linear_tickFormat), but customized for a log scale. The specified *count* typically has the same value as the count that is used to generate the [tick values](#log_ticks).

```js
const x = d3.scaleLog([1, 100], [0, 960]);
const T = x.ticks(); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, …]
const f = x.tickFormat();
T.map(f); // ["1", "2", "3", "4", "5", "", "", "", "", "10", …]
```

If there are too many ticks, the formatter may return the empty string for some of the tick labels; however, note that the ticks are still shown to convey the logarithmic transform accurately. To disable filtering, specify a *count* of Infinity.

When specifying a count, you may also provide a format *specifier* or format function. For example, to get a tick formatter that will display 20 ticks of a currency, say `log.tickFormat(20, "$,f")`. If the specifier does not have a defined precision, the precision will be set automatically by the scale, returning the appropriate format. This provides a convenient way of specifying a format whose precision will be automatically set by the scale.

## *log*.nice() {#log_nice}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/log.js) · Like [*linear*.nice](./linear.md#linear_nice), except extends the domain to integer powers of [base](#log_base).

```js
const x = d3.scaleLog([0.201479, 0.996679], [0, 960]).nice();
x.domain(); // [0.1, 1]
```

If the domain has more than two values, nicing the domain only affects the first and last value. Nicing a scale only modifies the current domain; it does not automatically nice domains that are subsequently set using [*log*.domain](./linear.md#linear_domain). You must re-nice the scale after setting the new domain, if desired.


# docs/d3-scale/ordinal.md

# Ordinal scales

Unlike [continuous scales](./linear.md), ordinal scales have a discrete domain and range. For example, an ordinal scale might map a set of named categories to a set of colors, or determine the horizontal positions of columns in a column chart.

## scaleOrdinal(*domain*, *range*) {#scaleOrdinal}

[Examples](https://observablehq.com/@d3/d3-scaleordinal) · [Source](https://github.com/d3/d3-scale/blob/main/src/ordinal.js) · Constructs a new ordinal scale with the specified [*domain*](#ordinal_domain) and [*range*](#ordinal_range).

```js
const color = d3.scaleOrdinal(["a", "b", "c"], ["red", "green", "blue"]);
```

If *domain* is not specified, it defaults to the empty array. If *range* is not specified, it defaults to the empty array; an ordinal scale always returns undefined until a non-empty range is defined.

## *ordinal*(*value*) {#_ordinal}

[Examples](https://observablehq.com/@d3/d3-scaleordinal) · [Source](https://github.com/d3/d3-scale/blob/main/src/ordinal.js) · Given a *value* in the input [domain](#ordinal_domain), returns the corresponding value in the output [range](#ordinal_range).

```js
color("a") // "red"
```

If the given *value* is not in the scale’s [domain](#ordinal_domain), returns the [unknown value](#ordinal_unknown); or, if the unknown value is [implicit](#scaleImplicit) (the default), then the *value* is implicitly added to the domain and the next-available value in the range is assigned to *value*, such that this and subsequent invocations of the scale given the same input *value* return the same output value.

## *ordinal*.domain(*domain*) {#ordinal_domain}

[Examples](https://observablehq.com/@d3/d3-scaleordinal) · [Source](https://github.com/d3/d3-scale/blob/main/src/ordinal.js) · If *domain* is specified, sets the domain to the specified array of values.

```js
const color = d3.scaleOrdinal(["red", "green", "blue"]).domain(["a", "b", "c"]);
color("a"); // "red"
color("b"); // "green"
color("c"); // "blue"
```

The first element in *domain* will be mapped to the first element in the range, the second domain value to the second range value, and so on. Domain values are stored internally in an [InternMap](../d3-array/intern.md) from primitive value to index; the resulting index is then used to retrieve a value from the range. Thus, an ordinal scale’s values must be coercible to a primitive value, and the primitive domain value uniquely identifies the corresponding range value.

```js
color.domain() // ["a", "b", "c"]
```

If *domain* is not specified, this method returns the current domain.

Setting the domain on an ordinal scale is optional if the [unknown value](#ordinal_unknown) is [implicit](#scaleImplicit) (the default). In this case, the domain will be inferred implicitly from usage by assigning each unique value passed to the scale a new value from the range.

```js
const color = d3.scaleOrdinal(["red", "green", "blue"]);
color("b"); // "red"
color("a"); // "green"
color("c"); // "blue"
color.domain(); // inferred ["b", "a", "c"]
```

:::warning CAUTION
An explicit domain is recommended for deterministic behavior; inferring the domain from usage is dependent on ordering.
:::

## *ordinal*.range(*range*) {#ordinal_range}

[Examples](https://observablehq.com/@d3/d3-scaleordinal) · [Source](https://github.com/d3/d3-scale/blob/main/src/ordinal.js) · If *range* is specified, sets the range of the ordinal scale to the specified array of values.

```js
const color = d3.scaleOrdinal().range(["red", "green", "blue"]);
```

The first element in the domain will be mapped to the first element in *range*, the second domain value to the second range value, and so on. If there are fewer elements in the range than in the domain, the scale will reuse values from the start of the range. If *range* is not specified, this method returns the current range.

## *ordinal*.unknown(*value*) {#ordinal_unknown}

[Examples](https://observablehq.com/@d3/d3-scaleordinal) · [Source](https://github.com/d3/d3-scale/blob/main/src/ordinal.js) · If *value* is specified, sets the output value of the scale for unknown input values and returns this scale.

```js
const color = d3.scaleOrdinal(["a", "b", "c"], d3.schemeTableau10).unknown(null);
color("a"); // "#4e79a7"
color("b"); // "#f28e2c"
color("c"); // "#e15759"
color("d"); // null
```

If *value* is not specified, returns the current unknown value, which defaults to [implicit](#scaleImplicit). The implicit value enables implicit domain construction; see [*ordinal*.domain](#ordinal_domain).

## *ordinal*.copy() {#ordinal_copy}

[Examples](https://observablehq.com/@d3/d3-scaleordinal) · [Source](https://github.com/d3/d3-scale/blob/main/src/ordinal.js) · Returns an exact copy of this ordinal scale.

```js
const c1 = d3.scaleOrdinal(["a", "b", "c"], d3.schemeTableau10);
const c2 = c1.copy();
```

Changes to this scale will not affect the returned scale, and vice versa.

## scaleImplicit {#scaleImplicit}

[Examples](https://observablehq.com/@d3/d3-scaleordinal) · [Source](https://github.com/d3/d3-scale/blob/main/src/ordinal.js) · A special value for [*ordinal*.unknown](#ordinal_unknown) that enables implicit domain construction: unknown values are implicitly added to the domain.

```js
const color = d3.scaleOrdinal(["a", "b", "c"], d3.schemeTableau10);
color.unknown(); // d3.scaleImplicit
```

:::warning CAUTION
An explicit domain is recommended for deterministic behavior; inferring the domain from usage is dependent on ordering.
:::

# docs/d3-scale/point.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref} from "vue";
import PlotRender from "../components/PlotRender.js";

const domain = ref("a,b,c,d,e,f");
const padding = ref(0.1);
const align = ref(0.5);
const round = ref(false);

</script>

# Point scales

Point scales are a variant of [band scales](./band.md) with the bandwidth fixed to zero. Point scales are typically used for scatterplots with an ordinal or categorical dimension.

## scalePoint(*domain*, *range*) {#scalePoint}

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Constructs a new point scale with the specified [*domain*](#point_domain) and [*range*](#point_range), no [padding](#point_padding), no [rounding](#point_round) and center [alignment](#point_align). If *domain* is not specified, it defaults to the empty domain. If *range* is not specified, it defaults to the unit range [0, 1].

## *point*(*value*) {#_point}

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Given a *value* in the input [domain](#point_domain), returns the corresponding point derived from the output [range](#point_range).

```js
const x = d3.scalePoint(["a", "b", "c"], [0, 960]);
x("a"); // 0
x("b"); // 480
x("c"); // 960
x("d"); // undefined
```

If the given *value* is not in the scale’s domain, returns undefined.

## *point*.domain(*domain*) {#point_domain}

<p>
  <label class="label-input">
    Domain:
    <input type="text" v-model="domain">
  </label>
</p>

<PlotRender :options='{
  grid: true,
  marginTop: 0.5,
  x: {
    padding: 0.1,
    domain: d3.csvParseRows(domain).flat()
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.tickX(d3.csvParseRows(domain).flat(), {x: Plot.identity, stroke: "currentColor"})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *domain* is specified, sets the domain to the specified array of values.

```js-vue
const x = d3.scalePoint([0, 960]).domain([{{d3.csvParseRows(domain).flat().map(JSON.stringify).join(", ")}}]);
```

The first element in *domain* will be mapped to the first point, the second domain value to the second point, and so on. Domain values are stored internally in an [InternMap](../d3-array/intern.md) from primitive value to index; the resulting index is then used to determine the point. Thus, a point scale’s values must be coercible to a primitive value, and the primitive domain value uniquely identifies the corresponding point. If *domain* is not specified, this method returns the current domain.

## *point*.range(*range*) {#point_range}

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *range* is specified, sets the scale’s range to the specified two-element array of numbers and returns this scale.

```js
const x = d3.scalePoint().range([0, 960]);
```

If the elements in the given array are not numbers, they will be coerced to numbers. If *range* is not specified, returns the scale’s current range, which defaults to [0, 1].

## *point*.rangeRound(*range*) {#point_rangeRound}

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Sets the scale’s [*range*](#point_range) to the specified two-element array of numbers while also enabling [rounding](#point_round); returns this scale.

```js
const x = d3.scalePoint().rangeRound([0, 960]);
```

This is a convenience method equivalent to:

```js
point.range(range).round(true)
```

Rounding is sometimes useful for avoiding antialiasing artifacts, though also consider the [shape-rendering](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering) “crispEdges” styles.

## *point*.round(*round*) {#point_round}

<p>
  <label class="label-input">
    Round:
    <input type="checkbox" v-model="round">
  </label>
</p>

<PlotRender :options='{
  grid: true,
  marginTop: 0.5,
  x: {
    padding: 0.2,
    round
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.tickX("abcdefghij", {x: Plot.identity, stroke: "currentColor"})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *round* is specified, enables or disables rounding accordingly.

```js-vue
const x = d3.scalePoint(["a", "b", "c"], [0, 960]).round({{round}});
```

If *round* is not specified, returns whether rounding is enabled.

```js-vue
x.round() // {{round}}
```

If rounding is enabled, the position of each point will be integers. Rounding is sometimes useful for avoiding antialiasing artifacts, though also consider the [shape-rendering](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering) “crispEdges” styles. Note that if the width of the domain is not a multiple of the cardinality of the range, there may be leftover unused space, even without padding! Use [*point*.align](#point_align) to specify how the leftover space is distributed.

## *point*.padding(*padding*) {#point_padding}

<p>
  <label class="label-input">
    <span>Padding:</span>
    <input type="range" v-model.number="padding" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{padding.toFixed(2)}}</span>
  </label>
</p>

<PlotRender :options='{
  grid: true,
  marginTop: 0.5,
  x: {
    padding,
    round: false
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.tickX("abcdefghij", {x: Plot.identity, stroke: "currentColor"})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *padding* is specified, sets the outer padding to the specified number which is typically in the range [0, 1].

```js-vue
const x = d3.scalePoint(["a", "b", "c"], [0, 960]).padding({{padding}});
```

If *padding* is not specified, returns the current outer padding which defaults to 0.

```js-vue
x.padding() // {{padding}}
```

The outer padding specifies the amount of blank space, in terms of multiples of the [step](./band.md#band_step), to reserve before the first point and after the last point. Equivalent to [*band*.paddingOuter](./band.md#band_paddingOuter).

## *point*.align(*align*) {#point_align}

<p>
  <label class="label-input">
    <span>Align:</span>
    <input type="range" v-model.number="align" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{align.toFixed(2)}}</span>
  </label>
</p>

<PlotRender :options='{
  grid: true,
  marginTop: 0.5,
  x: {
    padding: 0.2,
    align,
    round: false
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.tickX("abcdefghij", {x: Plot.identity, stroke: "currentColor"})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · If *align* is specified, sets the alignment to the specified value which must be in the range [0, 1].

```js-vue
const x = d3.scalePoint(["a", "b", "c"], [0, 960]).align({{align}});
```

If *align* is not specified, returns the current alignment which defaults to 0.5.

```js-vue
x.align() // {{align}}
```

The alignment specifies how any leftover unused space in the range is distributed. A value of 0.5 indicates that the leftover space should be equally distributed before the first point and after the last point; *i.e.*, the points should be centered within the range. A value of 0 or 1 may be used to shift the points to one side, say to position them adjacent to an axis.

## *point*.bandwidth() {#point_bandwidth}

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Returns zero.

## *point*.step() {#point_step}

<PlotRender :options='{
  grid: true,
  marginTop: 10.5,
  x: {
    padding: 0.2,
    round: false
  },
  marks: [
    Plot.frame({strokeOpacity: 0.3}),
    Plot.tickX("abcdefghij", {x: Plot.identity, stroke: "currentColor"}),
    Plot.dotX(["a"], {stroke: "var(--vp-c-brand)", symbol: {draw(context, size) { const x = Plot.scale({x: {type: "point", padding: 0.2, round: false, domain: "abcdefghij", range: [20, 688 - 20]}}); context.moveTo(6, -22 - 3); context.lineTo(0, -22); context.lineTo(6, -22 + 3); context.moveTo(0, -22); context.lineTo(x.step, -22); context.moveTo(x.step - 6, -22 - 3); context.lineTo(x.step, -22); context.lineTo(x.step - 6, -22 + 3); }}})
  ]
}' />

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Returns the distance between adjacent points.

## *point*.copy() {#point_copy}

[Examples](https://observablehq.com/@d3/d3-scalepoint) · [Source](https://github.com/d3/d3-scale/blob/main/src/band.js) · Returns an exact copy of this scale. Changes to this scale will not affect the returned scale, and vice versa.

# docs/d3-scale/pow.md

# Power scales

Power (“pow”) scales are similar to [linear scales](./linear.md), except an exponential transform is applied to the input domain value before the output range value is computed. Each range value *y* can be expressed as a function of the domain value *x*: *y* = *mx^k* + *b*, where *k* is the [exponent](#pow_exponent) value. Power scales also support negative domain values, in which case the input value and the resulting output value are multiplied by -1.

### scalePow(*domain*, *range*) {#scalePow}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/pow.js) · Constructs a new pow scale with the specified [domain](./linear.md#linear_domain) and [range](./linear.md#linear_range), the [exponent](#pow_exponent) 1, the [default](../d3-interpolate/value.md#interpolate) [interpolator](./linear.md#linear_interpolate) and [clamping](./linear.md#linear_clamp) disabled.

```js
const x = d3.scalePow([0, 100], ["red", "blue"]).exponent(2);
```

If either *domain* or *range* are not specified, each defaults to [0, 1].

### scaleSqrt(*domain*, *range*) {#scaleSqrt}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/pow.js) · Constructs a new pow scale with the specified [domain](./linear.md#linear_domain) and [range](./linear.md#linear_range), the [exponent](#pow_exponent) 0.5, the [default](../d3-interpolate/value.md#interpolate) [interpolator](./linear.md#linear_interpolate) and [clamping](./linear.md#linear_clamp) disabled.

```js
const x = d3.scaleSqrt([0, 100], ["red", "blue"]);
```

If either *domain* or *range* are not specified, each defaults to [0, 1]. This is a convenience method equivalent to `d3.scalePow(…).exponent(0.5)`.

### *pow*.exponent(*exponent*) {#pow_exponent}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/pow.js) · If *exponent* is specified, sets the current exponent to the given numeric value and returns this scale.

```js
const x = d3.scalePow([0, 100], ["red", "blue"]).exponent(2);
```

If *exponent* is not specified, returns the current exponent, which defaults to 1.

```js
x.exponent() // 2
```

If the *exponent* is 1, the pow scale is effectively a [linear](./linear.md) scale.

# docs/d3-scale/quantile.md

# Quantile scales

Quantile scales map a sampled input domain to a discrete range. The domain is considered continuous and thus the scale will accept any reasonable input value; however, the domain is specified as a discrete set of sample values. The number of values in (the cardinality of) the output range determines the number of quantiles that will be computed from the domain. To compute the quantiles, the domain is sorted, and treated as a [population of discrete values](https://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population); see [quantile](../d3-array/summarize.md#quantile). See [this quantile choropleth](https://observablehq.com/@d3/quantile-choropleth) for an example.

## scaleQuantile(*domain*, *range*) {#scaleQuantile}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js) · Constructs a new quantile scale with the specified [*domain*](#quantile_domain) and [*range*](#quantile_range).

```js
const color = d3.scaleQuantile(penguins.map((d) => d.body_mass_g), d3.schemeBlues[5]);
```

If either *domain* or *range* is not specified, each defaults to the empty array. The quantile scale is invalid until both a domain and range are specified.

## *quantile*(*value*) {#_quantile}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js) · Given a *value* in the input [domain](#quantile_domain), returns the corresponding value in the output [range](#quantile_range).

```js
color(3000); // "#eff3ff"
color(4000); // "#6baed6"
color(5000); // "#08519c"
```

## *quantile*.invertExtent(*value*) {#quantile_invertExtent}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js) · Returns the extent of values in the [domain](#quantile_domain) [<i>x0</i>, <i>x1</i>] for the corresponding *value* in the [range](#quantile_range): the inverse of [*quantile*](#_quantile).

```js
color.invertExtent("#eff3ff"); // [2700, 3475]
color.invertExtent("#6baed6"); // [3800, 4300]
color.invertExtent("#08519c"); // [4950, 6300]
```

This method is useful for interaction, say to determine the value in the domain that corresponds to the pixel location under the mouse.

## *quantile*.domain(*domain*) {#quantile_domain}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js) · If *domain* is specified, sets the domain of the quantile scale to the specified set of discrete numeric values and returns this scale.

```js
const color = d3.scaleQuantile(d3.schemeBlues[5]);
color.domain(penguins.map((d) => d.body_mass_g));
```

The array must not be empty, and must contain at least one numeric value; NaN, null and undefined values are ignored and not considered part of the sample population. If the elements in the given array are not numbers, they will be coerced to numbers. A copy of the input array is sorted and stored internally.

If *domain* is not specified, returns the scale’s current domain (the set of observed values).

```js
color.domain() // [2700, 2850, 2850, 2900, 2900, 2900, 2900, …]
```

## *quantile*.range(*range*) {#quantile_range}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js) · If *range* is specified, sets the discrete values in the range.

```js
const color = d3.scaleQuantile();
color.range(d3.schemeBlues[5]);
```

The array must not be empty, and may contain any type of value. The number of values in (the cardinality, or length, of) the *range* array determines the number of quantiles that are computed. For example, to compute quartiles, *range* must be an array of four elements such as [0, 1, 2, 3].

If *range* is not specified, returns the current range.

```js
color.range() // ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"]
```

## *quantile*.quantiles() {#quantile_quantiles}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js) · Returns the quantile thresholds.

```js
color.quantiles() // [3475, 3800, 4300, 4950]
```

If the [range](#quantile_range) contains *n* discrete values, the returned array will contain *n* - 1 thresholds. Values less than the first threshold are considered in the first quantile; values greater than or equal to the first threshold but less than the second threshold are in the second quantile, and so on. Internally, the thresholds array is used with [bisect](../d3-array/bisect.md) to find the output quantile associated with the given input value.

## *quantile*.copy() {#quantile_copy}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantile.js) · Returns an exact copy of this scale.

```js
const c1 = d3.scaleQuantile(d3.schemeBlues[5]);
const c2 = c1.copy();
```

Changes to this scale will not affect the returned scale, and vice versa.

# docs/d3-scale/quantize.md

# Quantize scales

Quantize scales are similar to [linear scales](./linear.md), except they use a discrete rather than continuous range. The continuous input domain is divided into uniform segments based on the number of values in (*i.e.*, the cardinality of) the output range. Each range value *y* can be expressed as a quantized linear function of the domain value *x*: *y* = *m round(x)* + *b*. See [the quantized choropleth](https://observablehq.com/@d3/choropleth/2) for an example.

## scaleQuantize(*domain*, *range*) {#scaleQuantize}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js) · Constructs a new quantize scale with the specified [*domain*](#quantize_domain) and [*range*](#quantize_range).

```js
const color = d3.scaleQuantize([0, 100], d3.schemeBlues[9]);
```

If either *domain* or *range* is not specified, each defaults to [0, 1].

```js
const color = d3.scaleQuantize(d3.schemeBlues[9]);
```

## *quantize*(*value*) {#_quantize}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js) · Given a *value* in the input [domain](#quantize_domain), returns the corresponding value in the output [range](#quantize_range). For example, to apply a color encoding:

```js
const color = d3.scaleQuantize([0, 1], ["brown", "steelblue"]);
color(0.49); // "brown"
color(0.51); // "steelblue"
```

Or dividing the domain into three equally-sized parts with different range values to compute an appropriate stroke width:

```js
const width = d3.scaleQuantize([10, 100], [1, 2, 4]);
width(20); // 1
width(50); // 2
width(80); // 4
```

## *quantize*.invertExtent(*value*) {#quantize_invertExtent}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js) · Returns the extent of values in the [domain](#quantize_domain) [<i>x0</i>, <i>x1</i>] for the corresponding *value* in the [range](#quantize_range): the inverse of [*quantize*](#_quantize). This method is useful for interaction, say to determine the value in the domain that corresponds to the pixel location under the mouse.

```js
const width = d3.scaleQuantize([10, 100], [1, 2, 4]);
width.invertExtent(2); // [40, 70]
```

## *quantize*.domain(*domain*) {#quantize_domain}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js) · If *domain* is specified, sets the scale’s domain to the specified two-element array of numbers.

```js
const color = d3.scaleQuantize(d3.schemeBlues[9]);
color.domain([0, 100]);
```

If the elements in the given array are not numbers, they will be coerced to numbers. The numbers must be in ascending order or the behavior of the scale is undefined.

If *domain* is not specified, returns the scale’s current domain.

```js
color.domain() // [0, 100]
```

## *quantize*.range(*range*) {#quantize_range}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js) · If *range* is specified, sets the scale’s range to the specified array of values.

```js
const color = d3.scaleQuantize();
color.range(d3.schemeBlues[5]);
```

The array may contain any number of discrete values. The elements in the given array need not be numbers; any value or type will work.

If *range* is not specified, returns the scale’s current range.

```js
color.range() // ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"]
```

## *quantize*.thresholds() {#quantize_thresholds}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js) · Returns the array of computed thresholds within the [domain](#quantize_domain).

```js
color.thresholds() // [0.2, 0.4, 0.6, 0.8]
```

The number of returned thresholds is one less than the length of the [range](#quantize_range): values less than the first threshold are assigned the first element in the range, whereas values greater than or equal to the last threshold are assigned the last element in the range.

## *quantize*.copy() {#quantize_copy}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/quantize.js) · Returns an exact copy of this scale.

```js
const c1 = d3.scaleQuantize(d3.schemeBlues[5]);
const c2 = c1.copy();
```

Changes to this scale will not affect the returned scale, and vice versa.

# docs/d3-scale/sequential.md

# Sequential scales

Sequential scales are similar to [linear scales](./linear.md) in that they map a continuous, numeric input domain to a continuous output range. Unlike linear scales, the input domain and output range of a sequential scale always have exactly two elements, and the output range is typically specified as an interpolator rather than an array of values. Sequential scales are typically used for a color encoding; see also [d3-scale-chromatic](../d3-scale-chromatic.md). These scales do not expose [invert](./linear.md#linear_invert) and [interpolate](./linear.md#linear_interpolate) methods. There are also [log](#scaleSequentialLog), [pow](#scaleSequentialPow), [symlog](#scaleSequentialSymlog), and [quantile](#scaleSequentialQuantile) variants of sequential scales.

## scaleSequential(*domain*, *interpolator*) {#scaleSequential}

[Examples](https://observablehq.com/@d3/sequential-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/sequential.js) · Constructs a new sequential scale with the specified *domain* and [*interpolator*](#sequential_interpolator) function or array.

```js
const color = d3.scaleSequential([0, 100], d3.interpolateBlues);
```

If *domain* is not specified, it defaults to [0, 1].

```js
const color = d3.scaleSequential(d3.interpolateBlues);
```

If *interpolator* is not specified, it defaults to the identity function.

```js
const identity = d3.scaleSequential();
```

When the scale is applied, the interpolator will be invoked with a value typically in the range [0, 1], where 0 represents the minimum value and 1 represents the maximum value. For example, to implement the ill-advised angry rainbow scale (please use [interpolateRainbow](../d3-scale-chromatic/cyclical.md#interpolateRainbow) instead):

```js
const rainbow = d3.scaleSequential((t) => d3.hsl(t * 360, 1, 0.5) + "");
```

If *interpolator* is an array, it represents the scale’s two-element output range and is converted to an interpolator function using [interpolate](../d3-interpolate/value.md#interpolate).

```js
const color = d3.scaleSequential(["red", "blue"]);
```

A sequential scale’s domain must be numeric and must contain exactly two values.

## *sequential*.interpolator(*interpolator*) {#sequential_interpolator}

If *interpolator* is specified, sets the scale’s interpolator to the specified function.

```js
const color = d3.scaleSequential().interpolator(d3.interpolateBlues);
```

If *interpolator* is not specified, returns the scale’s current interpolator.

```js
color.interpolator() // d3.interpolateBlues
```

## *sequential*.range(*range*) {#sequential_range}

See [*linear*.range](./linear.md#linear_range). If *range* is specified, the given two-element array is converted to an interpolator function using [interpolate](../d3-interpolate/value.md#interpolate).

```js
const color = d3.scaleSequential().range(["red", "blue"]);
```

The above is equivalent to:

```js
const color = d3.scaleSequential(d3.interpolate("red", "blue"));
```

## *sequential*.rangeRound(*range*) {#sequential_rangeRound}

See [*linear*.rangeRound](./linear.md#linear_rangeRound). If *range* is specified, implicitly uses [interpolateRound](../d3-interpolate/value.md#interpolateRound) as the interpolator.

## scaleSequentialLog(*domain*, *range*) {#scaleSequentialLog}

Returns a new sequential scale with a logarithmic transform, analogous to a [log scale](./log.md).

## scaleSequentialPow(*domain*, *range*) {#scaleSequentialPow}

Returns a new sequential scale with an exponential transform, analogous to a [power scale](./pow.md).

## scaleSequentialSqrt(*domain*, *range*) {#scaleSequentialSqrt}

Returns a new sequential scale with a square-root transform, analogous to a [sqrt scale](./pow.md#scaleSqrt).

## scaleSequentialSymlog(*domain*, *range*) {#scaleSequentialSymlog}

Returns a new sequential scale with a symmetric logarithmic transform, analogous to a [symlog scale](./symlog.md).

## scaleSequentialQuantile(*domain*, *range*) {#scaleSequentialQuantile}

[Source](https://github.com/d3/d3-scale/blob/main/src/sequentialQuantile.js) · Returns a new sequential scale with a *p*-quantile transform, analogous to a [quantile scale](./quantile.md).

## *sequentialQuantile*.quantiles(*n*) {#sequentialQuantile_quantiles}

[Source](https://github.com/d3/d3-scale/blob/main/src/sequentialQuantile.js) · Returns an array of *n* + 1 quantiles.

```js
const color = d3.scaleSequentialQuantile()
    .domain(penguins.map((d) => d.body_mass_g))
    .interpolator(d3.interpolateBlues);

color.quantiles(4); // [2700, 3550, 4050, 4750, 6300]
```

For example, if *n* = 4, returns an array of five numbers: the minimum value, the first quartile, the median, the third quartile, and the maximum.

# docs/d3-scale/symlog.md

# Symlog scales

See [A bi-symmetric log transformation for wide-range data](https://www.researchgate.net/profile/John_Webber4/publication/233967063_A_bi-symmetric_log_transformation_for_wide-range_data/links/0fcfd50d791c85082e000000.pdf) by Webber for details. Unlike a [log scale](./log.md), a symlog scale domain can include zero.

## scaleSymlog(*domain*, *range*) {#scaleSymlog}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/symlog.js) · Constructs a new continuous scale with the specified [domain](./linear.md#linear_domain) and [range](./linear.md#linear_range), the [constant](#symlog_constant) 1, the [default](../d3-interpolate/value.md#interpolate) [interpolator](./linear.md#linear_interpolate) and [clamping](./linear.md#linear_clamp) disabled.

```js
const x = d3.scaleSymlog([0, 100], [0, 960]);
```

If a single argument is specified, it is interpreted as the *range*. If either *domain* or *range* are not specified, each defaults to [0, 1].

```js
const color = d3.scaleSymlog(["red", "blue"]) // default domain of [0, 1]
```

## *symlog*.constant(*constant*) {#symlog_constant}

[Examples](https://observablehq.com/@d3/continuous-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/symlog.js) · If *constant* is specified, sets the symlog constant to the specified number and returns this scale. The constant defaults to 1.

```js
const x = d3.scaleSymlog([0, 100], [0, 960]).constant(2);
```

If *constant* is not specified, returns the current value of the symlog constant.

```js
x.constant() // 2
```

# docs/d3-scale/threshold.md

# Threshold scales

Threshold scales are similar to [quantize scales](./quantize.md), except they allow you to map arbitrary subsets of the domain to discrete values in the range. The input domain is still continuous, and divided into slices based on a set of threshold values. See [this choropleth](https://observablehq.com/@d3/threshold-choropleth) for an example.

## scaleThreshold(*domain*, *range*) {#scaleThreshold}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js) · Constructs a new threshold scale with the specified [*domain*](#threshold_domain) and [*range*](#threshold_range).

```js
const color = d3.scaleThreshold([0, 1], ["red", "white", "blue"]);
```

If *domain* is not specified, it defaults to [0.5].

```js
const color = d3.scaleThreshold(["red", "blue"]);
color(0); // "red"
color(1); // "blue"
```

If *range* is not specified, it defaults to [0, 1].

## *threshold*(*value*) {#_threshold}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js) · Given a *value* in the input [domain](#threshold_domain), returns the corresponding value in the output [range](#threshold_range). For example:

```js
const color = d3.scaleThreshold([0, 1], ["red", "white", "green"]);
color(-1); // "red"
color(0); // "white"
color(0.5); // "white"
color(1); // "green"
color(1000); // "green"
```

## *threshold*.invertExtent(*value*) {#threshold_invertExtent}

[Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js) · Returns the extent of values in the [domain](#threshold_domain) [<i>x0</i>, <i>x1</i>] for the corresponding *value* in the [range](#threshold_range), representing the inverse mapping from range to domain.

```js
const color = d3.scaleThreshold([0, 1], ["red", "white", "green"]);
color.invertExtent("red"); // [undefined, 0]
color.invertExtent("white"); // [0, 1]
color.invertExtent("green"); // [1, undefined]
```

This method is useful for interaction, say to determine the value in the domain that corresponds to the pixel location under the mouse. The extent below the lowest threshold is undefined (unbounded), as is the extent above the highest threshold.

## *threshold*.domain(*domain*) {#threshold_domain}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js) · If *domain* is specified, sets the scale’s domain to the specified array of values.

```js
const color = d3.scaleThreshold(["red", "white", "green"]).domain([0, 1]);
```

The values must be in ascending order or the behavior of the scale is undefined. The values are typically numbers, but any naturally ordered values (such as strings) will work; a threshold scale can be used to encode any type that is ordered. If the number of values in the scale’s range is *n* + 1, the number of values in the scale’s domain must be *n*. If there are fewer than *n* elements in the domain, the additional values in the range are ignored. If there are more than *n* elements in the domain, the scale may return undefined for some inputs.

If *domain* is not specified, returns the scale’s current domain.

```js
color.domain() // [0, 1]
```

## *threshold*.range(*range*) {#threshold_range}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js) · If *range* is specified, sets the scale’s range to the specified array of values.

```js
const color = d3.scaleThreshold().range(["red", "white", "green"]);
```

If the number of values in the scale’s domain is *n*, the number of values in the scale’s range must be *n* + 1. If there are fewer than *n* + 1 elements in the range, the scale may return undefined for some inputs. If there are more than *n* + 1 elements in the range, the additional values are ignored. The elements in the given array need not be numbers; any value or type will work.

If *range* is not specified, returns the scale’s current range.

```js
color.range() // ["red", "white", "green"]
```

## *threshold*.copy() {#threshold_copy}

[Examples](https://observablehq.com/@d3/quantile-quantize-and-threshold-scales) · [Source](https://github.com/d3/d3-scale/blob/main/src/threshold.js) · Returns an exact copy of this scale.

```js
const c1 = d3.scaleThreshold(d3.schemeBlues[5]);
const c2 = c1.copy();
```

Changes to this scale will not affect the returned scale, and vice versa.

# docs/d3-scale/time.md

# Time scales

Time scales are a variant of [linear scales](./linear.md) that have a temporal domain: domain values are coerced to [dates](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date) rather than numbers, and invert likewise returns a date. Time scales implement [ticks](#time_ticks) based on [calendar intervals](../d3-time.md), taking the pain out of generating axes for temporal domains.

## scaleTime(*domain*, *range*) {#scaleTime}

[Examples](https://observablehq.com/@d3/d3-scaletime) · [Source](https://github.com/d3/d3-scale/blob/main/src/time.js) · Constructs a new time scale with the specified [domain](./linear.md#linear_domain) and [range](./linear.md#linear_range), the [default](../d3-interpolate/value.md#interpolate) [interpolator](./linear.md#linear_interpolate) and [clamping](./linear.md#linear_clamp) disabled. For example, to create a position encoding:

```js
const x = d3.scaleTime([new Date(2000, 0, 1), new Date(2000, 0, 2)], [0, 960]);
x(new Date(2000, 0, 1, 5)); // 200
x(new Date(2000, 0, 1, 16)); // 640
x.invert(200); // Sat Jan 01 2000 05:00:00 GMT-0800 (PST)
x.invert(640); // Sat Jan 01 2000 16:00:00 GMT-0800 (PST)
```

If *domain* is not specified, it defaults to [2000-01-01, 2000-01-02] in local time. If *range* is not specified, it defaults to [0, 1].

## scaleUtc(*domain*, *range*) {#scaleUtc}

[Examples](https://observablehq.com/@d3/d3-scaletime) · [Source](https://github.com/d3/d3-scale/blob/main/src/utcTime.js) · Equivalent to [scaleTime](#scaleTime), but the returned time scale operates in [Coordinated Universal Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) rather than local time. For example, to create a position encoding:

```js
const x = d3.scaleUtc([new Date("2000-01-01"), new Date("2000-01-02")], [0, 960]);
x(new Date("2000-01-01T05:00Z")); // 200
x(new Date("2000-01-01T16:00Z")); // 640
x.invert(200); // 2000-01-01T05:00Z
x.invert(640); // 2000-01-01T16:00Z
```

If *domain* is not specified, it defaults to [2000-01-01, 2000-01-02] in UTC time. If *range* is not specified, it defaults to [0, 1].

:::tip
A UTC scale should be preferred when possible as it behaves more predictably: days are always twenty-four hours and the scale does not depend on the browser’s time zone.
:::

## *time*.ticks(*count*) {#time_ticks}

[Examples](https://observablehq.com/@d3/d3-scaletime) · [Source](https://github.com/d3/d3-scale/blob/main/src/time.js) · Returns representative dates from the scale’s domain.

```js
const x = d3.scaleTime();
x.ticks(10);
// [Sat Jan 01 2000 00:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 03:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 06:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 09:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 12:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 15:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 18:00:00 GMT-0800 (PST),
//  Sat Jan 01 2000 21:00:00 GMT-0800 (PST),
//  Sun Jan 02 2000 00:00:00 GMT-0800 (PST)]
```

The returned tick values are uniformly-spaced (mostly), have sensible values (such as every day at midnight), and are guaranteed to be within the extent of the domain. Ticks are often used to display reference lines, or tick marks, in conjunction with the visualized data.

An optional *count* may be specified to affect how many ticks are generated. If *count* is not specified, it defaults to 10. The specified *count* is only a hint; the scale may return more or fewer values depending on the domain.

The following time intervals are considered for automatic ticks:

* 1-, 5-, 15- and 30-second.
* 1-, 5-, 15- and 30-minute.
* 1-, 3-, 6- and 12-hour.
* 1- and 2-day.
* 1-week.
* 1- and 3-month.
* 1-year.

In lieu of a *count*, a [time *interval*](../d3-time.md#_interval) may be explicitly specified. To prune the generated ticks for a given time *interval*, use [*interval*.every](../d3-time.md#interval_every). For example, to generate ticks at 15-minute intervals:

```js
const x = d3.scaleUtc().domain([new Date("2000-01-01T00:00Z"), new Date("2000-01-01T02:00Z")]);
x.ticks(d3.utcMinute.every(15));
// [2000-01-01T00:00Z,
//  2000-01-01T00:15Z,
//  2000-01-01T00:30Z,
//  2000-01-01T00:45Z,
//  2000-01-01T01:00Z,
//  2000-01-01T01:15Z,
//  2000-01-01T01:30Z,
//  2000-01-01T01:45Z,
//  2000-01-01T02:00Z]
```

Note: in some cases, such as with day ticks, specifying a *step* can result in irregular spacing of ticks because time intervals have varying length.

## *time*.tickFormat(*count*, *specifier*) {#time_tickFormat}

[Examples](https://observablehq.com/@d3/scale-ticks) · [Source](https://github.com/d3/d3-scale/blob/main/src/time.js) · Returns a time format function suitable for displaying [tick](#time_ticks) values.

```js
const x = d3.scaleUtc().domain([new Date("2000-01-01T00:00Z"), new Date("2000-01-01T02:00Z")]);
const T = x.ticks(); // [2000-01-01T00:00Z, 2000-01-01T00:15Z, 2000-01-01T00:30Z, …]
const f = x.tickFormat();
T.map(f); // ["2000", "12:15", "12:30", "12:45", "01 AM", "01:15", "01:30", "01:45", "02 AM"]
```

The specified *count* is currently ignored, but is accepted for consistency with other scales such as [*linear*.tickFormat](./linear.md#linear_tickFormat). If a format *specifier* is specified, this method is equivalent to [format](../d3-time-format.md#timeFormat). If *specifier* is not specified, the default time format is returned. The default multi-scale time format chooses a human-readable representation based on the specified date as follows:

* `%Y` - for year boundaries, such as `2011`.
* `%B` - for month boundaries, such as `February`.
* `%b %d` - for week boundaries, such as `Feb 06`.
* `%a %d` - for day boundaries, such as `Mon 07`.
* `%I %p` - for hour boundaries, such as `01 AM`.
* `%I:%M` - for minute boundaries, such as `01:23`.
* `:%S` - for second boundaries, such as `:45`.
* `.%L` - milliseconds for all other times, such as `.012`.

Although somewhat unusual, this default behavior has the benefit of providing both local and global context: for example, formatting a sequence of ticks as [11 PM, Mon 07, 01 AM] reveals information about hours, dates, and day simultaneously, rather than just the hours [11 PM, 12 AM, 01 AM]. See [d3-time-format](../d3-time-format.md) if you’d like to roll your own conditional time format.

## *time*.nice(*count*) {#time_nice}

[Examples](https://observablehq.com/@d3/d3-scaletime) · [Source](https://github.com/d3/d3-scale/blob/main/src/time.js) · Extends the domain so that it starts and ends on nice round values.

```js
const x = d3.scaleUtc().domain([new Date("2000-01-01T12:34Z"), new Date("2000-01-01T12:59Z")]).nice();
x.domain(); // [2000-01-01T12:30Z, 2000-01-01T13:00Z]
```

This method typically modifies the scale’s domain, and may only extend the bounds to the nearest round value. See [*linear*.nice](./linear.md#linear_nice) for more.

An optional tick *count* argument allows greater control over the step size used to extend the bounds, guaranteeing that the returned [ticks](#time_ticks) will exactly cover the domain. Alternatively, a [time *interval*](../d3-time.md#timeInterval) may be specified to explicitly set the ticks. If an *interval* is specified, an optional *step* may also be specified to skip some ticks. For example, *time*.nice(d3.utcSecond.every(10)) will extend the domain to an even ten seconds (0, 10, 20, <i>etc.</i>). See [*time*.ticks](#time_ticks) and [*interval*.every](../d3-time.md#interval_every) for further detail.

Nicing is useful if the domain is computed from data, say using [extent](../d3-array/summarize.md#extent), and may be irregular. For example, for a domain of [2009-07-13T00:02, 2009-07-13T23:48], the nice domain is [2009-07-13, 2009-07-14]. If the domain has more than two values, nicing the domain only affects the first and last value.

# docs/d3-selection.md

# d3-selection

Selections allow powerful data-driven transformation of the document object model (DOM): set [attributes](./d3-selection/modifying.md#selection_attr), [styles](./d3-selection/modifying.md#selection_style), [properties](./d3-selection/modifying.md#selection_property), [HTML](./d3-selection/modifying.md#selection_html) or [text](./d3-selection/modifying.md#selection_text) content, and more. Using the [data join](./d3-selection/joining.md)’s [enter](./d3-selection/joining.md#selection_enter) and [exit](./d3-selection/joining.md#selection_enter) selections, you can also [add](./d3-selection/modifying.md#selection_append) or [remove](./d3-selection/modifying.md#selection_remove) elements to correspond to data.

See one of:

* [Selecting elements](./d3-selection/selecting.md) - querying for DOM elements.
* [Modifying elements](./d3-selection/modifying.md) - modifying attributes of selected elements.
* [Joining data](./d3-selection/joining.md) - joining data to selected elements for visualization.
* [Handling events](./d3-selection/events.md) - declaring event listeners for interaction.
* [Control flow](./d3-selection/control-flow.md) - iterating over selected elements.
* [Local variables](./d3-selection/locals.md) - attaching state to elements.
* [Namespaces](./d3-selection/namespaces.md) - dealing with XML namespaces.

For more, see [the d3-selection collection on Observable](https://observablehq.com/collection/@d3/d3-selection).

# docs/d3-selection/control-flow.md

# Control flow

For advanced usage, selections provide methods for custom control flow.

## *selection*.each(*function*) {#selection_each}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/each.js) · Invokes the specified *function* for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). This method can be used to invoke arbitrary code for each selected element, and is useful for creating a context to access parent and child data simultaneously, such as:

```js
parent.each(function(p, j) {
  d3.select(this)
    .selectAll(".child")
      .text(d => `child ${d.name} of ${p.name}`);
});
```

See [sized donut multiples](https://observablehq.com/@d3/sized-donut-multiples) for an example.

## *selection*.call(*function*, ...*arguments*) {#selection_call}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/call.js) · Invokes the specified *function* exactly once, passing in this selection along with any optional *arguments*. Returns this selection. This is equivalent to invoking the function by hand but facilitates method chaining. For example, to set several styles in a reusable function:

```js
function name(selection, first, last) {
  selection
      .attr("first-name", first)
      .attr("last-name", last);
}
```

Now say:

```js
d3.selectAll("div").call(name, "John", "Snow");
```

This is roughly equivalent to:

```js
name(d3.selectAll("div"), "John", "Snow");
```

The only difference is that *selection*.call always returns the *selection* and not the return value of the called *function*, `name`.

## *selection*.empty() {#selection_empty}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/empty.js) · Returns true if this selection contains no (non-null) elements.

```js
d3.selectAll("p").empty() // false, here
```

## *selection*.nodes() {#selection_nodes}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/nodes.js) · Returns an array of all (non-null) elements in this selection.

```js
d3.selectAll("p").nodes() // [p, p, p, …]
```

Equivalent to:

```js
Array.from(selection)
```

## *selection*[Symbol.iterator]\(\) {#selection_iterator}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/iterator.js) · Returns an iterator over the selected (non-null) elements. For example, to iterate over the selected elements:

```js
for (const element of selection) {
  console.log(element);
}
```

To flatten the selection to an array:

```js
const elements = [...selection];
```

## *selection*.node() {#selection_node}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/node.js) · Returns the first (non-null) element in this selection. If the selection is empty, returns null.

## *selection*.size() {#selection_size}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/size.js) · Returns the total number of (non-null) elements in this selection.

# docs/d3-selection/events.md

# Handling events

For interaction, selections allow listening for and dispatching of events.

## *selection*.on(*typenames*, *listener*, *options*) {#selection_on}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/on.js) · Adds or removes a *listener* to each selected element for the specified event *typenames*.

```js
d3.selectAll("p").on("click", (event) => console.log(event))
```

The *typenames* is a string event type, such as `click`, `mouseover`, or `submit`; any [DOM event type](https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events) supported by your browser may be used. The type may be optionally followed by a period (`.`) and a name; the optional name allows multiple callbacks to be registered to receive events of the same type, such as `click.foo` and `click.bar`. To specify multiple typenames, separate typenames with spaces, such as `input change` or `click.foo click.bar`.

When a specified event is dispatched on a selected element, the specified *listener* will be evaluated for the element, being passed the current event (*event*) and the current datum (*d*), with *this* as the current DOM element (*event*.currentTarget). Listeners always see the latest datum for their element. Note: while you can use [*event*.pageX](https://developer.mozilla.org/en/DOM/event.pageX) and [*event*.pageY](https://developer.mozilla.org/en/DOM/event.pageY) directly, it is often convenient to transform the event position to the local coordinate system of the element that received the event using [d3.pointer](#pointer).

If an event listener was previously registered for the same *typename* on a selected element, the old listener is removed before the new listener is added. To remove a listener, pass null as the *listener*. To remove all listeners for a given name, pass null as the *listener* and `.foo` as the *typename*, where `foo` is the name; to remove all listeners with no name, specify `.` as the *typename*.

An optional *options* object may specify characteristics about the event listener, such as whether it is capturing or passive; see [*element*.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename* on the first (non-null) selected element, if any. If multiple typenames are specified, the first matching listener is returned.

## *selection*.dispatch(*type*, *parameters*) {#selection_dispatch}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/dispatch.js) · Dispatches a [custom event](http://www.w3.org/TR/dom/#interface-customevent) of the specified *type* to each selected element, in order.

```js
d3.select("p").dispatch("click")
```

An optional *parameters* object may be specified to set additional properties of the event. It may contain the following fields:

* [`bubbles`](https://www.w3.org/TR/dom/#dom-event-bubbles) - if true, the event is dispatched to ancestors in reverse tree order.
* [`cancelable`](https://www.w3.org/TR/dom/#dom-event-cancelable) - if true, *event*.preventDefault is allowed.
* [`detail`](https://www.w3.org/TR/dom/#dom-customevent-detail) - any custom data associated with the event.

If *parameters* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). It must return the parameters for the current element.

## pointer(*event*, *target*) {#pointer}

[Source](https://github.com/d3/d3-selection/blob/main/src/pointer.js) · Returns a two-element array of numbers [*x*, *y*] representing the coordinates of the specified *event* relative to the specified *target*.

```js
const [x, y] = d3.pointer(event);
```

*event* can be a [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent), a [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent), a [Touch](https://www.w3.org/TR/touch-events/#touch-interface), or a custom event holding a UIEvent as *event*.sourceEvent.

If *target* is not specified, it defaults to the source event’s currentTarget property, if available. If the *target* is an SVG element, the event’s coordinates are transformed using the [inverse](https://www.w3.org/TR/geometry-1/#dom-dommatrixreadonly-inverse) of the [screen coordinate transformation matrix](https://www.w3.org/TR/SVG/types.html#__svg__SVGGraphicsElement__getScreenCTM). If the *target* is an HTML element, the event’s coordinates are translated relative to the top-left corner of the *target*’s [bounding client rectangle](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect). (As such, the coordinate system can only be translated relative to the client coordinates. See also [GeometryUtils](https://www.w3.org/TR/cssom-view-1/#the-geometryutils-interface).) Otherwise, [*event*.pageX, *event*.pageY] is returned.

## pointers(*event*, *target*) {#pointers}

[Source](https://github.com/d3/d3-selection/blob/main/src/pointers.js) · Returns an array [[*x0*, *y0*], [*x1*, *y1*]…] of coordinates of the specified *event*’s pointer locations relative to the specified *target*.

```js
const points = d3.pointers(event);
```

For touch events, the returned array of positions corresponds to the *event*.touches array; for other events, returns a single-element array.

If *target* is not specified, it defaults to the source event’s currentTarget property, if any.

# docs/d3-selection/joining.md

# Joining data

For an introduction, see [Thinking With Joins](http://bost.ocks.org/mike/join/) and the [*selection*.join notebook](https://observablehq.com/@d3/selection-join).

## *selection*.data(*data*, *key*) {#selection_data}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/data.js) · Binds the specified array of *data* with the selected elements, returning a new selection that represents the *update* selection: the elements successfully bound to data. Also defines the [enter](#selection_enter) and [exit](#selection_exit) selections on the returned selection, which can be used to add or remove elements to correspond to the new data. The specified *data* is an array of arbitrary values (*e.g.*, numbers or objects), or a function that returns an array of values for each group. When data is assigned to an element, it is stored in the property `__data__`, thus making the data “sticky” and available on re-selection.

The *data* is specified **for each group** in the selection. If the selection has multiple groups (such as [d3.selectAll](./selecting.md#selectAll) followed by [*selection*.selectAll](./selecting.md#selection_selectAll)), then *data* should typically be specified as a function. This function will be evaluated for each group in order, being passed the group’s parent datum (*d*, which may be undefined), the group index (*i*), and the selection’s parent nodes (*nodes*), with *this* as the group’s parent element.

In conjunction with [*selection*.join](#selection_join) (or more explicitly with [*selection*.enter](#selection_enter), [*selection*.exit](#selection_exit), [*selection*.append](./modifying.md#selection_append) and [*selection*.remove](./modifying.md#selection_remove)), *selection*.data can be used to enter, update and exit elements to match data. For example, to create an HTML table from a matrix of numbers:

```js
const matrix = [
  [11975,  5871, 8916, 2868],
  [ 1951, 10048, 2060, 6171],
  [ 8010, 16145, 8090, 8045],
  [ 1013,   990,  940, 6907]
];

d3.select("body")
  .append("table")
  .selectAll("tr")
  .data(matrix)
  .join("tr")
  .selectAll("td")
  .data(d => d)
  .join("td")
    .text(d => d);
```

In this example the *data* function is the identity function: for each table row, it returns the corresponding row from the data matrix.

If a *key* function is not specified, then the first datum in *data* is assigned to the first selected element, the second datum to the second selected element, and so on. A *key* function may be specified to control which datum is assigned to which element, replacing the default join-by-index, by computing a string identifier for each datum and element. This key function is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]); the returned string is the element’s key. The key function is then also evaluated for each new datum in *data*, being passed the current datum (*d*), the current index (*i*), and the group’s new *data*, with *this* as the group’s parent DOM element; the returned string is the datum’s key. The datum for a given key is assigned to the element with the matching key. If multiple elements have the same key, the duplicate elements are put into the exit selection; if multiple data have the same key, the duplicate data are put into the enter selection.

For example, given this document:

```html
<div id="Ford"></div>
<div id="Jarrah"></div>
<div id="Kwon"></div>
<div id="Locke"></div>
<div id="Reyes"></div>
<div id="Shephard"></div>
```

You could join data by key as follows:


```js
const data = [
  {name: "Locke", number: 4},
  {name: "Reyes", number: 8},
  {name: "Ford", number: 15},
  {name: "Jarrah", number: 16},
  {name: "Shephard", number: 23},
  {name: "Kwon", number: 42}
];

d3.selectAll("div")
  .data(data, function(d) { return d ? d.name : this.id; })
    .text(d => d.number);
```

This example key function uses the datum *d* if present, and otherwise falls back to the element’s id property. Since these elements were not previously bound to data, the datum *d* is null when the key function is evaluated on selected elements, and non-null when the key function is evaluated on the new data.

The *update* and *enter* selections are returned in data order, while the *exit* selection preserves the selection order prior to the join. If a key function is specified, the order of elements in the selection may not match their order in the document; use [*selection*.order](./modifying.md#selection_order) or [*selection*.sort](./modifying.md#selection_sort) as needed. For more on how the key function affects the join, see [A Bar Chart, Part 2](https://observablehq.com/@d3/lets-make-a-bar-chart/2) and [Object Constancy](http://bost.ocks.org/mike/constancy/).

If *data* is not specified, this method returns the array of data for the selected elements.

This method cannot be used to clear bound data; use [*selection*.datum](#selection_datum) instead.

## *selection*.join(*enter*, *update*, *exit*) {#selection_join}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/join.js) · Appends, removes and reorders elements as necessary to match the data that was previously bound by [*selection*.data](#selection_data), returning the [merged](#selection_merge) enter and update selection. This method is a convenient alternative to the explicit [general update pattern](https://observablehq.com/@d3/general-update-pattern), replacing [*selection*.enter](#selection_enter), [*selection*.exit](#selection_exit), [*selection*.append](./modifying.md#selection_append), [*selection*.remove](./modifying.md#selection_remove), and [*selection*.order](./modifying.md#selection_order). For example:

```js
svg.selectAll("circle")
  .data(data)
  .join("circle")
    .attr("fill", "none")
    .attr("stroke", "black");
```

The *enter* function may be specified as a string shorthand, as above, which is equivalent to [*selection*.append](./modifying.md#selection_append) with the given element name. Likewise, optional *update* and *exit* functions may be specified, which default to the identity function and calling [*selection*.remove](./modifying.md#selection_remove), respectively. The shorthand above is thus equivalent to:

```js
svg.selectAll("circle")
  .data(data)
  .join(
    enter => enter.append("circle"),
    update => update,
    exit => exit.remove()
  )
    .attr("fill", "none")
    .attr("stroke", "black");
```

By passing separate functions on enter, update and exit, you have greater control over what happens. And by specifying a key function to [*selection*.data](#selection_data), you can minimize changes to the DOM to optimize performance. For example, to set different fill colors for enter and update:

```js
svg.selectAll("circle")
  .data(data)
  .join(
    enter => enter.append("circle").attr("fill", "green"),
    update => update.attr("fill", "blue")
  )
    .attr("stroke", "black");
```

The selections returned by the *enter* and *update* functions are merged and then returned by *selection*.join.

You can animate enter, update and exit by creating transitions inside the *enter*, *update* and *exit* functions. If the *enter* and *update* functions return transitions, their underlying selections are merged and then returned by *selection*.join. The return value of the *exit* function is not used.

For more, see the [*selection*.join notebook](https://observablehq.com/@d3/selection-join).

## *selection*.enter() {#selection_enter}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/enter.js) · Returns the enter selection: placeholder nodes for each datum that had no corresponding DOM element in the selection. (The enter selection is empty for selections not returned by [*selection*.data](#selection_data).)

The enter selection is typically used to create “missing” elements corresponding to new data. For example, to create DIV elements from an array of numbers:

```js
const div = d3.select("body")
  .selectAll("div")
  .data([4, 8, 15, 16, 23, 42])
  .enter().append("div")
    .text(d => d);
```

If the body is initially empty, the above code will create six new DIV elements, append them to the body in-order, and assign their text content as the associated (string-coerced) number:

```html
<div>4</div>
<div>8</div>
<div>15</div>
<div>16</div>
<div>23</div>
<div>42</div>
```

Conceptually, the enter selection’s placeholders are pointers to the parent element (in this example, the document body). The enter selection is typically only used transiently to append elements, and is often [merged](#selection_merge) with the update selection after appending, such that modifications can be applied to both entering and updating elements.

## *selection*.exit() {#selection_exit}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/exit.js) · Returns the exit selection: existing DOM elements in the selection for which no new datum was found. (The exit selection is empty for selections not returned by [*selection*.data](#selection_data).)

The exit selection is typically used to remove “superfluous” elements corresponding to old data. For example, to update the DIV elements created previously with a new array of numbers:

```js
div = div.data([1, 2, 4, 8, 16, 32], d => d);
```

Since a key function was specified (as the identity function), and the new data contains the numbers [4, 8, 16] which match existing elements in the document, the update selection contains three DIV elements. Leaving those elements as-is, we can append new elements for [1, 2, 32] using the enter selection:

```js
div.enter().append("div").text(d => d);
```

Likewise, to remove the exiting elements [15, 23, 42]:

```js
div.exit().remove();
```

Now the document body looks like this:

```html
<div>1</div>
<div>2</div>
<div>4</div>
<div>8</div>
<div>16</div>
<div>32</div>
```

The order of the DOM elements matches the order of the data because the old data’s order and the new data’s order were consistent. If the new data’s order is different, use [*selection*.order](./modifying.md#selection_order) to reorder the elements in the DOM. See the [general update pattern](https://observablehq.com/@d3/general-update-pattern) notebook for more on data joins.

## *selection*.datum(value) {#selection_datum}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/datum.js) · Gets or sets the bound data for each selected element. Unlike [*selection*.data](#selection_data), this method does not compute a join and does not affect indexes or the enter and exit selections.

If a *value* is specified, sets the element’s bound data to the specified value on all selected elements. If the *value* is a constant, all elements are given the same datum; otherwise, if the *value* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). The function is then used to set each element’s new data. A null value will delete the bound data.

If a *value* is not specified, returns the bound datum for the first (non-null) element in the selection. This is generally useful only if you know the selection contains exactly one element.

This method is useful for accessing HTML5 [custom data attributes](http://www.w3.org/TR/html5/dom.html#custom-data-attribute). For example, given the following elements:

```html
<ul id="list">
  <li data-username="shawnbot">Shawn Allen</li>
  <li data-username="mbostock">Mike Bostock</li>
</ul>
```

You can expose the custom data attributes by setting each element’s data as the built-in [dataset](http://www.w3.org/TR/html5/dom.html#dom-dataset) property:

```js
selection.datum(function() { return this.dataset; })
```

## *selection*.merge(*other*) {#selection_merge}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/merge.js) · Returns a new selection merging this selection with the specified *other* selection or transition. The returned selection has the same number of groups and the same parents as this selection. Any missing (null) elements in this selection are filled with the corresponding element, if present (not null), from the specified *selection*. (If the *other* selection has additional groups or parents, they are ignored.)

This method is used internally by [*selection*.join](#selection_join) to merge the [enter](#selection_enter) and [update](#selection_data) selections after binding data. You can also merge explicitly, although note that since merging is based on element index, you should use operations that preserve index, such as [*selection*.select](./selecting.md#selection_select) instead of [*selection*.filter](./selecting.md#selection_filter). For example:

```js
const odd = selection.select(function(d, i) { return i & 1 ? this : null; ));
const even = selection.select(function(d, i) { return i & 1 ? null : this; ));
const merged = odd.merge(even);
```

See [*selection*.data](#selection_data) for more.

This method is not intended for concatenating arbitrary selections, however: if both this selection and the specified *other* selection have (non-null) elements at the same index, this selection’s element is returned in the merge and the *other* selection’s element is ignored.

# docs/d3-selection/locals.md

# Local variables

D3 locals allow you to define local state independent of data. For instance, when rendering [small multiples](https://gist.github.com/mbostock/e1192fe405703d8321a5187350910e08) of time-series data, you might want the same x scale for all charts but distinct y scales to compare the relative performance of each metric. D3 locals are scoped by DOM elements: on set, the value is stored on the given element; on get, the value is retrieved from given element or the nearest ancestor that defines it.

:::warning CAUTION
Locals are rarely used; you may find it easier to store whatever state you need in the selection’s data.
:::

## local() {#local}

[Source](https://github.com/d3/d3-selection/blob/main/src/local.js) · Declares a new local variable.

```js
const foo = d3.local();
```

Like `var`, each local is a distinct symbolic reference; unlike `var`, the value of each local is also scoped by the DOM.

## *local*.set(*node*, *value*) {#local_set}

[Source](https://github.com/d3/d3-selection/blob/main/src/local.js) · Sets the value of this local on the specified *node* to the *value*, and returns the specified *value*. This is often performed using [*selection*.each](./control-flow.md#selection_each):

```js
selection.each(function(d) {
  foo.set(this, d.value);
});
```

If you are just setting a single variable, consider using [*selection*.property](./modifying.md#selection_property):

```js
selection.property(foo, (d) => d.value);
```

## *local*.get(*node*) {#local_get}

[Source](https://github.com/d3/d3-selection/blob/main/src/local.js) · Returns the value of this local on the specified *node*.

```js
selection.each(function() {
  const value = foo.get(this);
});
```

If the *node* does not define this local, returns the value from the nearest ancestor that defines it. Returns undefined if no ancestor defines this local.

## *local*.remove(*node*) {#local_remove}

[Source](https://github.com/d3/d3-selection/blob/main/src/local.js) · Deletes this local’s value from the specified *node*.

```js
selection.each(function() {
  foo.remove(this);
});
```

Returns true if the *node* defined this local prior to removal, and false otherwise. If ancestors also define this local, those definitions are unaffected, and thus [*local*.get](#local_get) will still return the inherited value.

## *local*.toString() {#local_toString}

[Source](https://github.com/d3/d3-selection/blob/main/src/local.js) · Returns the automatically-generated identifier for this local. This is the name of the property that is used to store the local’s value on elements, and thus you can also set or get the local’s value using *element*[*local*] or by using [*selection*.property](./modifying.md#selection_property).

# docs/d3-selection/modifying.md

# Modifying elements

After selecting elements, use the selection to modify the elements. For example, to set the class and color style of all paragraph elements in the current document:

```js
d3.selectAll("p")
    .attr("class", "graf")
    .style("color", "red");
```

Selection methods typically return the current selection, or a new selection, allowing the concise application of multiple operations on a given selection via method chaining. The above is equivalent to:

```js
const p = d3.selectAll("p");
p.attr("class", "graf");
p.style("color", "red");
```

Selections are immutable. All selection methods that affect which elements are selected (or their order) return a new selection rather than modifying the current selection. However, note that elements are necessarily mutable, as selections drive transformations of the document!

## *selection*.attr(*name*, *value*) {#selection_attr}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/attr.js) · If a *value* is specified, sets the attribute with the specified *name* to the specified value on the selected elements and returns this selection.

```js
selection.attr("color", "red")
```

If the *value* is a constant, all elements are given the same attribute value; otherwise, if the *value* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). The function’s return value is then used to set each element’s attribute. A null value will remove the specified attribute.

```js
selection.attr("color") // "red"
```

If a *value* is not specified, returns the current value of the specified attribute for the first (non-null) element in the selection. This is generally useful only if you know that the selection contains exactly one element.

The specified *name* may have a namespace prefix, such as `xlink:href` to specify the `href` attribute in the XLink namespace. See [namespaces](./namespaces.md#namespaces) for the map of supported namespaces; additional namespaces can be registered by adding to the map.

## *selection*.classed(*names*, *value*) {#selection_classed}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/classed.js) · If a *value* is specified, assigns or unassigns the specified CSS class *names* on the selected elements by setting the `class` attribute or modifying the `classList` property and returns this selection.

```js
selection.classed("foo", true)
```

The specified *names* is a string of space-separated class names. For example, to assign the classes `foo` and `bar` to the selected elements:

```js
selection.classed("foo bar", true)
```

If the *value* is truthy, then all elements are assigned the specified classes; otherwise, the classes are unassigned.

```js
selection.classed("foo", () => Math.random() > 0.5)
```

If the *value* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). The function’s return value is then used to assign or unassign classes on each element.

```js
selection.classed("foo") // true, perhaps
```

If a *value* is not specified, returns true if and only if the first (non-null) selected element has the specified *classes*. This is generally useful only if you know the selection contains exactly one element.

## *selection*.style(*name*, *value*, *priority*) {#selection_style}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/style.js) · If a *value* is specified, sets the style property with the specified *name* to the specified value on the selected elements and returns this selection.

```js
selection.style("color", "red")
```

If the *value* is a constant, then all elements are given the same style property value; otherwise, if the *value* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). The function’s return value is then used to set each element’s style property. A null value will remove the style property. An optional *priority* may also be specified, either as null or the string `important` (without the exclamation point).

```js
selection.style("color") // "red"
```

If a *value* is not specified, returns the current value of the specified style property for the first (non-null) element in the selection. The current value is defined as the element’s inline value, if present, and otherwise its [computed value](https://developer.mozilla.org/en-US/docs/Web/CSS/computed_value). Accessing the current style value is generally useful only if you know the selection contains exactly one element.

:::warning CAUTION
Unlike many SVG attributes, CSS styles typically have associated units. For example, `3px` is a valid stroke-width property value, while `3` is not. Some browsers implicitly assign the `px` (pixel) unit to numeric values, but not all browsers do: IE, for example, throws an “invalid arguments” error!
:::

## *selection*.property(*name*, *value*) {#selection_property}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/property.js) · Some HTML elements have special properties that are not addressable using attributes or styles, such as a form field’s text `value` and a checkbox’s `checked` boolean. Use this method to get or set these properties.

```js
selection.property("checked", true)
```

If a *value* is specified, sets the property with the specified *name* to the specified value on selected elements. If the *value* is a constant, then all elements are given the same property value; otherwise, if the *value* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). The function’s return value is then used to set each element’s property. A null value will delete the specified property.

```js
selection.property("checked") // true, perhaps
```

If a *value* is not specified, returns the value of the specified property for the first (non-null) element in the selection. This is generally useful only if you know the selection contains exactly one element.

## *selection*.text(*value*) {#selection_text}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/text.js) · If a *value* is specified, sets the [text content](http://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-textContent) to the specified value on all selected elements, replacing any existing child elements.

```js
selection.text("Hello, world!")
```

If the *value* is a constant, then all elements are given the same text content; otherwise, if the *value* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). The function’s return value is then used to set each element’s text content. A null value will clear the content.

```js
selection.text() // "Hello, world!"
```

If a *value* is not specified, returns the text content for the first (non-null) element in the selection. This is generally useful only if you know the selection contains exactly one element.

## *selection*.html(*value*) {#selection_html}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/html.js) · If a *value* is specified, sets the [inner HTML](http://dev.w3.org/html5/spec-LC/apis-in-html-documents.html#innerhtml) to the specified value on all selected elements, replacing any existing child elements.

```js
selection.html("Hello, <i>world</i>!")
```

If the *value* is a constant, then all elements are given the same inner HTML; otherwise, if the *value* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). The function’s return value is then used to set each element’s inner HTML. A null value will clear the content.

```js
selection.html() // "Hello, <i>world</i>!"
```

If a *value* is not specified, returns the inner HTML for the first (non-null) element in the selection. This is generally useful only if you know the selection contains exactly one element.

Use [*selection*.append](#selection_append) or [*selection*.insert](#selection_insert) instead to create data-driven content; this method is intended for when you want a little bit of HTML, say for rich formatting. Also, *selection*.html is only supported on HTML elements. SVG elements and other non-HTML elements do not support the innerHTML property, and thus are incompatible with *selection*.html. Consider using [XMLSerializer](https://developer.mozilla.org/en-US/docs/XMLSerializer) to convert a DOM subtree to text. See also the [innersvg polyfill](https://code.google.com/p/innersvg/), which provides a shim to support the innerHTML property on SVG elements.

## *selection*.append(*type*) {#selection_append}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/append.js) · If the specified *type* is a string, appends a new element of this type (tag name) as the last child of each selected element, or before the next following sibling in the update selection if this is an [enter selection](./joining.md#selection_enter). The latter behavior for enter selections allows you to insert elements into the DOM in an order consistent with the new bound data; however, note that [*selection*.order](#selection_order) may still be required if updating elements change order (*i.e.*, if the order of new data is inconsistent with old data).

If the specified *type* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). This function should return an element to be appended. (The function typically creates a new element, but it may instead return an existing element.) For example, to append a paragraph to each DIV element:

```js
d3.selectAll("div").append("p");
```

This is equivalent to:

```js
d3.selectAll("div").append(() => document.createElement("p"));
```

Which is equivalent to:

```js
d3.selectAll("div").select(function() {
  return this.appendChild(document.createElement("p"));
});
```

In both cases, this method returns a new selection containing the appended elements. Each new element inherits the data of the current elements, if any, in the same manner as [*selection*.select](./selecting.md#selection_select).

The specified *name* may have a namespace prefix, such as `svg:text` to specify a `text` attribute in the SVG namespace. See [namespaces](./namespaces.md#namespaces) for the map of supported namespaces; additional namespaces can be registered by adding to the map. If no namespace is specified, the namespace will be inherited from the parent element; or, if the name is one of the known prefixes, the corresponding namespace will be used (for example, `svg` implies `svg:svg`).

## *selection*.insert(*type*, *before*) {#selection_insert}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/insert.js) · If the specified *type* is a string, inserts a new element of this type (tag name) before the first element matching the specified *before* selector for each selected element. For example, a *before* selector `:first-child` will prepend nodes before the first child. If *before* is not specified, it defaults to null. (To append elements in an order consistent with [bound data](./joining.md), use [*selection*.append](#selection_append).)

Both *type* and *before* may instead be specified as functions which are evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). The *type* function should return an element to be inserted; the *before* function should return the child element before which the element should be inserted. For example, to append a paragraph to each DIV element:

```js
d3.selectAll("div").insert("p");
```

This is equivalent to:

```js
d3.selectAll("div").insert(() => document.createElement("p"));
```

Which is equivalent to:

```js
d3.selectAll("div").select(function() {
  return this.insertBefore(document.createElement("p"), null);
});
```

In both cases, this method returns a new selection containing the appended elements. Each new element inherits the data of the current elements, if any, in the same manner as [*selection*.select](./selecting.md#selection_select).

The specified *name* may have a namespace prefix, such as `svg:text` to specify a `text` attribute in the SVG namespace. See [namespaces](./namespaces.md#namespaces) for the map of supported namespaces; additional namespaces can be registered by adding to the map. If no namespace is specified, the namespace will be inherited from the parent element; or, if the name is one of the known prefixes, the corresponding namespace will be used (for example, `svg` implies `svg:svg`).

## *selection*.remove() {#selection_remove}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/remove.js) · Removes the selected elements from the document. Returns this selection (the removed elements) which are now detached from the DOM. There is not currently a dedicated API to add removed elements back to the document; however, you can pass a function to [*selection*.append](#selection_append) or [*selection*.insert](#selection_insert) to re-add elements.

## *selection*.clone(*deep*) {#selection_clone}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/clone.js) · Inserts clones of the selected elements immediately following the selected elements and returns a selection of the newly added clones. If *deep* is truthy, the descendant nodes of the selected elements will be cloned as well. Otherwise, only the elements themselves will be cloned. Equivalent to:

```js
selection.select(function() {
  return this.parentNode.insertBefore(this.cloneNode(deep), this.nextSibling);
});
```

## *selection*.sort(*compare*) {#selection_sort}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/sort.js) · Returns a new selection that contains a copy of each group in this selection sorted according to the *compare* function. After sorting, re-inserts elements to match the resulting order (per [*selection*.order](#selection_order)).

The compare function, which defaults to [ascending](../d3-array/sort.md#ascending), is passed two elements’ data *a* and *b* to compare. It should return either a negative, positive, or zero value. If negative, then *a* should be before *b*; if positive, then *a* should be after *b*; otherwise, *a* and *b* are considered equal and the order is arbitrary.

## *selection*.order() {#selection_order}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/order.js) · Re-inserts elements into the document such that the document order of each group matches the selection order. This is equivalent to calling [*selection*.sort](#selection_sort) if the data is already sorted, but much faster.

## *selection*.raise() {#selection_raise}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/raise.js) · Re-inserts each selected element, in order, as the last child of its parent. Equivalent to:

```js
selection.each(function() {
  this.parentNode.appendChild(this);
});
```

## *selection*.lower() {#selection_lower}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/lower.js) · Re-inserts each selected element, in order, as the first child of its parent. Equivalent to:

```js
selection.each(function() {
  this.parentNode.insertBefore(this, this.parentNode.firstChild);
});
```

## create(*name*) {#create}

[Source](https://github.com/d3/d3-selection/blob/main/src/create.js) · Given the specified element *name*, returns a single-element selection containing a detached element of the given name in the current document. This method assumes the HTML namespace, so you must specify a namespace explicitly when creating SVG or other non-HTML elements; see [namespace](./namespaces.md#namespace) for details on supported namespace prefixes.

```js
d3.create("svg") // equivalent to svg:svg
```
```js
d3.create("svg:svg") // more explicitly
```
```js
d3.create("svg:g") // an SVG G element
```
```js
d3.create("g") // an HTML G (unknown) element
```

## creator(*name*) {#creator}

[Source](https://github.com/d3/d3-selection/blob/main/src/creator.js) · Given the specified element *name*, returns a function which creates an element of the given name, assuming that `this` is the parent element. This method is used internally by [*selection*.append](#selection_append) and [*selection*.insert](#selection_insert) to create new elements. For example, this:

```js
selection.append("div");
```

Is equivalent to:

```js
selection.append(d3.creator("div"));
```

See [namespace](./namespaces.md#namespace) for details on supported namespace prefixes, such as for SVG elements.

# docs/d3-selection/namespaces.md

# Namespaces

XML namespaces are fun! Right? 🤪 Fortunately you can mostly ignore them.

A case where you need to specify them is when appending an element to a parent that belongs to a different namespace; typically, to create a [div](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) inside a SVG [foreignObject](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/ForeignObject) element:

```js
d3.create("svg")
  .append("foreignObject")
    .attr("width", 300)
    .attr("height", 100)
  .append("xhtml:div")
    .text("Hello, HTML!");
```

## namespace(*name*) {#namespace}

[Source](https://github.com/d3/d3-selection/blob/main/src/namespace.js) · Qualifies the specified *name*, which may or may not have a namespace prefix.

```js
d3.namespace("svg:text") // {space: "http://www.w3.org/2000/svg", local: "text"}
```

If the name contains a colon (`:`), the substring before the colon is interpreted as the namespace prefix, which must be registered in [d3.namespaces](#namespaces). Returns an object `space` and `local` attributes describing the full namespace URL and the local name. If the name does not contain a colon, this function merely returns the input name.

## namespaces

[Source](https://github.com/d3/d3-selection/blob/main/src/namespaces.js) · The map of registered namespace prefixes. The initial value is:

```js
{
  svg: "http://www.w3.org/2000/svg",
  xhtml: "http://www.w3.org/1999/xhtml",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
}
```

Additional prefixes may be assigned as needed to create elements or attributes in other namespaces.

# docs/d3-selection/selecting.md

# Selecting elements

A *selection* is a set of elements from the DOM. Typically these elements are identified by [selectors](http://www.w3.org/TR/selectors-api/) such as `.fancy` for elements with the class *fancy*, or `div` to select DIV elements.

Selection methods come in two forms, **select** and **selectAll**: the former selects only the first matching element, while the latter selects all matching elements in document order. The top-level selection methods, [d3.select](#select) and [d3.selectAll](#selectAll), query the entire document; the subselection methods, [*selection*.select](#selection_select) and [*selection*.selectAll](#selection_selectAll), restrict selection to descendants of the selected elements. There is also [*selection*.selectChild](#selection_selectChild) and [*selection*.selectChildren](#selection_selectChildren) for direct children.

By convention, selection methods that return the current selection such as [*selection*.attr](./modifying.md#selection_attr) use four spaces of indent, while methods that return a new selection use only two. This helps reveal changes of context by making them stick out of the chain:

```js
d3.select("body")
  .append("svg")
    .attr("width", 960)
    .attr("height", 500)
  .append("g")
    .attr("transform", "translate(20,20)")
  .append("rect")
    .attr("width", 920)
    .attr("height", 460);
```

## selection() {#selection}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/index.js) · [Selects](#select) the root element, `document.documentElement`.

```js
const root = d3.selection();
```

This function can also be used to test for selections (`instanceof d3.selection`) or to extend the selection prototype. For example, to add a method to check checkboxes:

```js
d3.selection.prototype.checked = function(value) {
  return arguments.length < 1
      ? this.property("checked")
      : this.property("checked", !!value);
};
```

And then to use:

```js
d3.selectAll("input[type=checkbox]").checked(true);
```

## select(*selector*) {#select}

[Source](https://github.com/d3/d3-selection/blob/main/src/select.js) · Selects the first element that matches the specified *selector* string.

```js
const svg = d3.select("#chart");
```

If no elements match the *selector*, returns an empty selection. If multiple elements match the *selector*, only the first matching element (in document order) will be selected. For example, to select the first anchor element:

```js
const anchor = d3.select("a");
```

If the *selector* is not a string, instead selects the specified node; this is useful if you already have a reference to a node, such as `document.body`.

```js
d3.select(document.body).style("background", "red");
```

Or, to make a clicked paragraph red:

```js
d3.selectAll("p").on("click", (event) => d3.select(event.currentTarget).style("color", "red"));
```

## selectAll(*selector*) {#selectAll}

[Source](https://github.com/d3/d3-selection/blob/main/src/selectAll.js) · Selects all elements that match the specified *selector* string.

```js
const p = d3.selectAll("p");
```

The elements will be selected in document order (top-to-bottom). If no elements in the document match the *selector*, or if the *selector* is null or undefined, returns an empty selection.

If the *selector* is not a string, instead selects the specified array of nodes; this is useful if you already have a reference to nodes, such as `this.childNodes` within an event listener or a global such as `document.links`. The nodes may instead be an iterable, or a pseudo-array such as a NodeList. For example, to color all links red:

```js
d3.selectAll(document.links).style("color", "red");
```

## *selection*.select(*selector*) {#selection_select}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/select.js) · For each selected element, selects the first descendant element that matches the specified *selector* string.

```js
const b = d3.selectAll("p").select("b"); // the first <b> in every <p>
```

If no element matches the specified selector for the current element, the element at the current index will be null in the returned selection. (If the *selector* is null, every element in the returned selection will be null, resulting in an empty selection.) If the current element has associated data, this data is propagated to the corresponding selected element. If multiple elements match the selector, only the first matching element in document order is selected.

If the *selector* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). It must return an element, or null if there is no matching element. For example, to select the previous sibling of each paragraph:

```js
const previous = d3.selectAll("p").select(function() {
  return this.previousElementSibling;
});
```

Unlike [*selection*.selectAll](#selection_selectAll), *selection*.select does not affect grouping: it preserves the existing group structure and indexes, and propagates data (if any) to selected children. Grouping plays an important role in the [data join](./joining.md). See [Nested Selections](http://bost.ocks.org/mike/nest/) and [How Selections Work](http://bost.ocks.org/mike/selection/) for more on this topic.

:::warning CAUTION
*selection*.select propagates the parent’s data to the selected child.
:::

## *selection*.selectAll(selector) {#selection_selectAll}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/selectAll.js) · For each selected element, selects the descendant elements that match the specified *selector* string.

```js
const b = d3.selectAll("p").selectAll("b"); // every <b> in every <p>
```

The elements in the returned selection are grouped by their corresponding parent node in this selection. If no element matches the specified selector for the current element, or if the *selector* is null, the group at the current index will be empty. The selected elements do not inherit data from this selection; use [*selection*.data](./joining.md#selection_data) to propagate data to children.

If the *selector* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). It must return an array of elements (or an iterable, or a pseudo-array such as a NodeList), or the empty array if there are no matching elements. For example, to select the previous and next siblings of each paragraph:

```js
const sibling = d3.selectAll("p").selectAll(function() {
  return [
    this.previousElementSibling,
    this.nextElementSibling
  ];
});
```

Unlike [*selection*.select](#selection_select), *selection*.selectAll does affect grouping: each selected descendant is grouped by the parent element in the originating selection. Grouping plays an important role in the [data join](./joining.md). See [Nested Selections](http://bost.ocks.org/mike/nest/) and [How Selections Work](http://bost.ocks.org/mike/selection/) for more on this topic.

## *selection*.filter(*filter*) {#selection_filter}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/filter.js) · Filters the selection, returning a new selection that contains only the elements for which the specified *filter* is true. For example, to filter a selection of table rows to contain only even rows:

```js
const even = d3.selectAll("tr").filter(":nth-child(even)");
```

This is approximately equivalent to using [d3.selectAll](#selectAll) directly, although the indexes may be different:

```js
const even = d3.selectAll("tr:nth-child(even)");
```

The *filter* may be specified either as a selector string or a function. If the *filter* is a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element (*nodes*[*i*]). Using a function:

```js
const even = d3.selectAll("tr").filter((d, i) => i & 1);
```

Or using [*selection*.select](#selection_select) (and avoiding an arrow function, since *this* is needed to refer to the current element):

```js
const even = d3.selectAll("tr").select(function(d, i) { return i & 1 ? this : null; });
```

Note that the `:nth-child` pseudo-class is a one-based index rather than a zero-based index. Also, the above filter functions do not have precisely the same meaning as `:nth-child`; they rely on the selection index rather than the number of preceding sibling elements in the DOM.

The returned filtered selection preserves the parents of this selection, but like [*array*.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), it does not preserve indexes as some elements may be removed; use [*selection*.select](#selection_select) to preserve the index, if needed.

## *selection*.selectChild(*selector*) {#selection_selectChild}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/selectChild.js) · Returns a new selection with the (first) child of each element of the current selection matching the *selector*.

```js
d3.selectAll("p").selectChild("b") // the first <b> child of every <p>
```

If no *selector* is specified, selects the first child (if any). If the *selector* is specified as a string, selects the first child that matches (if any). If the *selector* is a function, it is evaluated for each of the children nodes, in order, being passed the child (*child*), the child’s index (*i*), and the list of children (*children*); the method selects the first child for which the selector return truthy, if any.

:::warning CAUTION
*selection*.selectChild propagates the parent’s data to the selected child.
:::

## *selection*.selectChildren(*selector*) {#selection_selectChildren}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/selectChildren.js) · Returns a new selection with the children of each element of the current selection matching the *selector*. If no *selector* is specified, selects all the children. If the *selector* is specified as a string, selects the children that match (if any). If the *selector* is a function, it is evaluated for each of the children nodes, in order, being passed the child (*child*), the child’s index (*i*), and the list of children (*children*); the method selects all children for which the selector return truthy.

## *selection*.selection() {#selection_selection}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/index.js) · Returns the selection (for symmetry with [*transition*.selection](../d3-transition/selecting.md#transition_selection)).

## matcher(*selector*) {#matcher}

[Source](https://github.com/d3/d3-selection/blob/main/src/matcher.js) · Given the specified *selector*, returns a function which returns true if `this` element [matches](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) the specified selector. This method is used internally by [*selection*.filter](#selection_filter). For example, this:

```js
const div = selection.filter("div");
```

Is equivalent to:

```js
const div = selection.filter(d3.matcher("div"));
```

(Although D3 is not a compatibility layer, this implementation does support vendor-prefixed implementations due to the recent standardization of *element*.matches.)

## selector(*selector*) {#selector}

[Source](https://github.com/d3/d3-selection/blob/main/src/selector.js) · Given the specified *selector*, returns a function which returns the first descendant of `this` element that matches the specified selector. This method is used internally by [*selection*.select](#selection_select). For example, this:

```js
const div = selection.select("div");
```

Is equivalent to:

```js
const div = selection.select(d3.selector("div"));
```

## selectorAll(*selector*) {#selectorAll}

[Source](https://github.com/d3/d3-selection/blob/main/src/selectAll.js) · Given the specified *selector*, returns a function which returns all descendants of `this` element that match the specified selector. This method is used internally by [*selection*.selectAll](#selection_selectAll). For example, this:

```js
const div = selection.selectAll("div");
```

Is equivalent to:

```js
const div = selection.selectAll(d3.selectorAll("div"));
```

## window(*node*) {#window}

[Source](https://github.com/d3/d3-selection/blob/main/src/window.js) · Returns the owner window for the specified *node*. If *node* is a node, returns the owner document’s default view; if *node* is a document, returns its default view; otherwise returns the *node*.

## style(*node*, *name*) {#style}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/style.js) · Returns the value of the style property with the specified *name* for the specified *node*. If the *node* has an inline style with the specified *name*, its value is returned; otherwise, the [computed property value](https://developer.mozilla.org/en-US/docs/Web/CSS/computed_value) is returned. See also [*selection*.style](./modifying.md#selection_style).

# docs/d3-shape.md

# d3-shape

Visualizations can be represented by discrete graphical marks such as [symbols](./d3-shape/symbol.md), [arcs](./d3-shape/arc.md), [lines](./d3-shape/line.md), and [areas](./d3-shape/area.md). While the rectangles of a bar chart may sometimes be simple, other shapes are complex, such as rounded annular sectors and Catmull–Rom splines. The d3-shape module provides a variety of shape generators for your convenience.

As with other aspects of D3, these shapes are driven by data: each shape generator exposes accessors that control how the input data are mapped to a visual representation. For example, you might define a line generator for a time series by [scaling](./d3-scale.md) fields of your data to fit the chart:

```js
const line = d3.line()
    .x((d) => x(d.date))
    .y((d) => y(d.value));
```

This line generator can then be used to compute the `d` attribute of an SVG path element:

```js
path.datum(data).attr("d", line);
```

Or you can use it to render to a Canvas 2D context:

```js
line.context(context)(data);
```

See one of:

- [Arcs](./d3-shape/arc.md) - circular or annular sectors, as in a pie or donut chart.
- [Areas](./d3-shape/area.md) - an area defined by a bounding topline and baseline, as in an area chart.
- [Curves](./d3-shape/curve.md) - interpolate between points to produce a continuous shape.
- [Lines](./d3-shape/line.md) - a spline or polyline, as in a line chart.
- [Links](./d3-shape/link.md) - a smooth cubic Bézier curve from a source to a target.
- [Pies](./d3-shape/pie.md) - compute angles for a pie or donut chart.
- [Stacks](./d3-shape/stack.md) - stack adjacent shapes, as in a stacked bar chart.
- [Symbols](./d3-shape/symbol.md) - a categorical shape encoding, as in a scatterplot.
- [Radial areas](./d3-shape/radial-area.md) - like [area](./d3-shape/area.md), but in polar coordinates.
- [Radial lines](./d3-shape/radial-line.md) - like [line](./d3-shape/line.md), but in polar coordinates.
- [Radial links](./d3-shape/radial-link.md) - like [link](./d3-shape/link.md), but in polar coordinates.

# docs/d3-shape/arc.md

<script setup>

import ExampleArcs from "../components/ExampleArcs.vue";
import {ref} from "vue";

const cornerRadius = ref(18);
const padAngle = ref(0.03);
const padRadius = ref(200);

</script>

# Arcs

The arc generator produces a [circular](https://en.wikipedia.org/wiki/Circular_sector) or [annular](https://en.wikipedia.org/wiki/Annulus_(mathematics)) sector, as in a [pie](https://observablehq.com/@d3/pie-chart/2) or [donut](https://observablehq.com/@d3/donut-chart/2) chart. Arcs are centered at the origin; use a [transform](http://www.w3.org/TR/SVG/coords.html#TransformAttribute) to move the arc to a different position.

```js
svg.append("path")
    .attr("transform", "translate(100,100)")
    .attr("d", d3.arc()({
      innerRadius: 100,
      outerRadius: 200,
      startAngle: -Math.PI / 2,
      endAngle: Math.PI / 2
    }));
```

If the absolute difference between the [start](#arc_startAngle) and [end](#arc_endAngle) angles (the *angular span*) is greater than 2π, the arc generator will produce a complete circle or annulus. If it is less than 2π, the arc’s angular length will be equal to the absolute difference between the two angles (going clockwise if the signed difference is positive and anticlockwise if it is negative). If the absolute difference is less than 2π, the arc may have [rounded corners](#arc_cornerRadius) and [angular padding](#arc_padAngle).

See also the [pie generator](./pie.md), which computes the necessary angles to represent an array of data as a pie or donut chart; these angles can then be passed to an arc generator.

## arc() {#arc}

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · Constructs a new arc generator with the default settings. With default settings:

```js
const arc = d3.arc();
```

Or, with the radii and angles configured as constants:

```js
const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(100)
    .startAngle(0)
    .endAngle(Math.PI / 2);
```

## *arc*(...*arguments*) {#_arc}

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · Generates an arc for the given *arguments*. The *arguments* are arbitrary; they are propagated to the arc generator’s accessor functions along with the `this` object. For example, with the default settings, an object with radii and angles is expected:

```js
const arc = d3.arc();

arc({
  innerRadius: 0,
  outerRadius: 100,
  startAngle: 0,
  endAngle: Math.PI / 2
}); // "M0,-100A100,100,0,0,1,100,0L0,0Z"
```

If the radii and angles are instead defined as constants, you can generate an arc without any arguments:

```js
d3.arc()
    .innerRadius(0)
    .outerRadius(100)
    .startAngle(0)
    .endAngle(Math.PI / 2)
  (); // "M0,-100A100,100,0,0,1,100,0L0,0Z"
```

If the arc generator has a [context](#arc_context), then the arc is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls and this function returns void. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string is returned.

## *arc*.centroid(...*arguments*) {#arc_centroid}

[Examples](https://observablehq.com/@d3/pie-settings) · [Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · Computes the midpoint [*x*, *y*] of the center line of the arc that would be [generated](#_arc) by the given *arguments*.

The *arguments* are arbitrary; they are propagated to the arc generator’s accessor functions along with the `this` object. To be consistent with the generated arc, the accessors must be deterministic, *i.e.*, return the same value given the same arguments. The midpoint is defined as ([startAngle](#arc_startAngle) + [endAngle](#arc_endAngle)) / 2 and ([innerRadius](#arc_innerRadius) + [outerRadius](#arc_outerRadius)) / 2. For example:

Note that this is **not the geometric center** of the arc, which may be outside the arc; this method is merely a convenience for positioning labels.

## *arc*.innerRadius(*radius*) {#arc_innerRadius}

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *radius* is specified, sets the inner radius to the specified function or number and returns this arc generator.

```js
const arc = d3.arc().innerRadius(40);
```

If *radius* is not specified, returns the current inner radius accessor.

```js
arc.innerRadius() // () => 40
```

The inner radius accessor defaults to:

```js
function innerRadius(d) {
  return d.innerRadius;
}
```

Specifying the inner radius as a function is useful for constructing a stacked polar bar chart, often in conjunction with a [sqrt scale](../d3-scale/pow.md). More commonly, a constant inner radius is used for a donut or pie chart. If the outer radius is smaller than the inner radius, the inner and outer radii are swapped. A negative value is treated as zero.

## *arc*.outerRadius(*radius*) {#arc_outerRadius}

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *radius* is specified, sets the outer radius to the specified function or number and returns this arc generator.

```js
const arc = d3.arc().outerRadius(240);
```

If *radius* is not specified, returns the current outer radius accessor.

```js
arc.outerRadius() // () => 240
```

The outer radius accessor defaults to:

```js
function outerRadius(d) {
  return d.outerRadius;
}
```

Specifying the outer radius as a function is useful for constructing a coxcomb or polar bar chart, often in conjunction with a [sqrt scale](../d3-scale/pow.md). More commonly, a constant outer radius is used for a pie or donut chart. If the outer radius is smaller than the inner radius, the inner and outer radii are swapped. A negative value is treated as zero.

## *arc*.cornerRadius(*radius*) {#arc_cornerRadius}

<p>
  <label class="label-input">
    <span>Corner radius:</span>
    <input type="range" v-model.number="cornerRadius" min="0" max="80" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{cornerRadius.toFixed(0)}}</span>
  </label>
</p>

<ExampleArcs :cornerRadius="cornerRadius" />

[Examples](https://observablehq.com/@d3/pie-settings) · [Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *radius* is specified, sets the corner radius to the specified function or number and returns this arc generator.

```js-vue
const arc = d3.arc().cornerRadius({{cornerRadius}});
```

If *radius* is not specified, returns the current corner radius accessor.

```js-vue
arc.cornerRadius() // () => {{cornerRadius}}
```

The corner radius accessor defaults to:

```js
function cornerRadius() {
  return 0;
}
```

If the corner radius is greater than zero, the corners of the arc are rounded using circles of the given radius. For a circular sector, the two outer corners are rounded; for an annular sector, all four corners are rounded.

The corner radius may not be larger than ([outerRadius](#arc_outerRadius) - [innerRadius](#arc_innerRadius)) / 2. In addition, for arcs whose angular span is less than π, the corner radius may be reduced as two adjacent rounded corners intersect. This occurs more often with the inner corners. See the [arc corners animation](https://observablehq.com/@d3/arc-corners) for illustration.

## *arc*.startAngle(*angle*) {#arc_startAngle}

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *angle* is specified, sets the start angle to the specified function or number and returns this arc generator.

```js
const arc = d3.arc().startAngle(Math.PI / 4);
```

If *angle* is not specified, returns the current start angle accessor.

```js
arc.startAngle() // () => 0.7853981633974483
```

The start angle accessor defaults to:

```js
function startAngle(d) {
  return d.startAngle;
}
```

The *angle* is specified in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise. If |endAngle - startAngle| ≥ 2π, a complete circle or annulus is generated rather than a sector.

## *arc*.endAngle(*angle*) {#arc_endAngle}

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *angle* is specified, sets the end angle to the specified function or number and returns this arc generator.

```js
const arc = d3.arc().endAngle(Math.PI);
```

If *angle* is not specified, returns the current end angle accessor.

```js
arc.endAngle() // () => 3.141592653589793
```

The end angle accessor defaults to:

```js
function endAngle(d) {
  return d.endAngle;
}
```

The *angle* is specified in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise. If |endAngle - startAngle| ≥ 2π, a complete circle or annulus is generated rather than a sector.

## *arc*.padAngle(*angle*) {#arc_padAngle}

<p>
  <label class="label-input">
    <span>Pad angle:</span>
    <input type="range" v-model.number="padAngle" min="0" max="0.1" step="0.001">
    <span style="font-variant-numeric: tabular-nums;">{{padAngle.toFixed(3)}}</span>
  </label>
</p>

<ExampleArcs :padAngle="padAngle" />

[Examples](https://observablehq.com/@d3/pie-settings) · [Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *angle* is specified, sets the pad angle to the specified function or number and returns this arc generator.

```js
const arc = d3.arc().padAngle(0);
```

If *angle* is not specified, returns the current pad angle accessor.

```js
arc.padAngle() // () => 0
```

The pad angle accessor defaults to:

```js
function padAngle() {
  return d && d.padAngle;
}
```

The pad angle is converted to a fixed linear distance separating adjacent arcs, defined as [padRadius](#arc_padRadius) × padAngle. This distance is subtracted equally from the [start](#arc_startAngle) and [end](#arc_endAngle) of the arc. If the arc forms a complete circle or annulus, as when |endAngle - startAngle| ≥ 2π, the pad angle is ignored.

If the [inner radius](#arc_innerRadius) or angular span is small relative to the pad angle, it may not be possible to maintain parallel edges between adjacent arcs. In this case, the inner edge of the arc may collapse to a point, similar to a circular sector. For this reason, padding is typically only applied to annular sectors (*i.e.*, when innerRadius is positive), as shown in this diagram:

The recommended minimum inner radius when using padding is outerRadius \* padAngle / sin(θ), where θ is the angular span of the smallest arc before padding. For example, if the outer radius is 200 pixels and the pad angle is 0.02 radians, a reasonable θ is 0.04 radians, and a reasonable inner radius is 100 pixels. See the [arc padding animation](https://observablehq.com/@d3/arc-pad-angle) for illustration.

Often, the pad angle is not set directly on the arc generator, but is instead computed by the [pie generator](./pie.md) so as to ensure that the area of padded arcs is proportional to their value; see [*pie*.padAngle](./pie.md#pie_padAngle). See the [pie padding animation](https://observablehq.com/@d3/arc-pad-angle) for illustration. If you apply a constant pad angle to the arc generator directly, it tends to subtract disproportionately from smaller arcs, introducing distortion.

## *arc*.padRadius(*radius*) {#arc_padRadius}

<p>
  <label class="label-input">
    <span>Pad radius:</span>
    <input type="range" v-model.number="padRadius" min="0" max="400" step="1">
    <span style="font-variant-numeric: tabular-nums;">{{padRadius.toFixed()}}</span>
  </label>
</p>

<ExampleArcs :padAngle="0.05" :padRadius="padRadius" />

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *radius* is specified, sets the pad radius to the specified function or number and returns this arc generator. If *radius* is not specified, returns the current pad radius accessor, which defaults to null, indicating that the pad radius should be automatically computed as sqrt([innerRadius](#arc_innerRadius) × innerRadius + [outerRadius](#arc_outerRadius) × outerRadius). The pad radius determines the fixed linear distance separating adjacent arcs, defined as padRadius × [padAngle](#arc_padAngle).

## *arc*.context(*context*) {#arc_context}

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *context* is specified, sets the context and returns this arc generator.

```js
const context = canvas.getContext("2d");
const arc = d3.arc().context(context);
```

If *context* is not specified, returns the current context, which defaults to null.

```js
arc.context() // context
```

If the context is not null, then the [generated arc](#_arc) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated arc is returned.

## *arc*.digits(*digits*) {#arc_digits}

[Source](https://github.com/d3/d3-shape/blob/main/src/arc.js) · If *digits* is specified, sets the maximum number of digits after the decimal separator and returns this arc generator.

```js
const arc = d3.arc().digits(3);
```

If *digits* is not specified, returns the current maximum fraction digits, which defaults to 3.

```js
arc.digits() // 3
```

This option only applies when the associated [*context*](#arc_context) is null, as when this arc generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

# docs/d3-shape/area.md

# Areas

<!-- https://observablehq.com/@d3/stacked-area-chart -->
<!-- https://observablehq.com/@d3/difference-chart -->

[Examples](https://observablehq.com/@d3/area-chart/2) · The area generator produces an area defined by a *topline* and a *baseline* as in an area chart. Typically, the two lines share the same [*x*-values](#area_x) ([x0](#area_x0) = [x1](#area_x1)), differing only in *y*-value ([y0](#area_y0) and [y1](#area_y1)); most commonly, y0 is defined as a constant representing zero (the y scale’s output for zero). The *topline* is defined by x1 and y1 and is rendered first; the *baseline* is defined by x0 and y0 and is rendered second with the points in reverse order. With a [curveLinear](./curve.md#curveLinear) [curve](#area_curve), this produces a clockwise polygon. See also [radial areas](./radial-area.md).

## area(*x*, *y0*, *y1*) {#area}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · Constructs a new area generator with the given *x*, *y0*, and *y1* accessors or numbers.

```js
const area = d3.area((d) => x(d.Date), y(0), (d) => y(d.Close));
```

If *x*, *y0* or *y1* are not specified, the respective defaults will be used. The above can be expressed more explicitly as:

```js
const area = d3.area()
    .x((d) => x(d.Date))
    .y0(y(0))
    .y1((d) => y(d.Close));
```

## *area*(*data*) {#_area}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · Generates an area for the given array of *data*.

```js
svg.append("path").attr("d", area(data));
```

If the area generator has a [context](#area_context), then the area is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls and this function returns void. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string is returned.

:::warning CAUTION
Depending on this area generator’s associated [curve](#area_curve), the given input *data* may need to be sorted by *x*-value before being passed to the area generator.
:::

## *area*.x(*x*) {#area_x}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *x* is specified, sets [x0](#area_x0) to *x* and [x1](#area_x1) to null and returns this area generator.

```js
const area = d3.area().x((d) => x(d.Date));
```

If *x* is not specified, returns the current x0 accessor.

```js
area.x() // (d) => x(d.Date)
```

## *area*.x0(*x*) {#area_x0}

:::tip
This method is intended for vertically-oriented areas, as when time goes down↓ rather than right→; for the more common horizontally-oriented areas, use [*area*.x](#area_x) instead.
:::

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *x* is specified, sets the x0 accessor to the specified function or number and returns this area generator.

```js
const area = d3.area().x0(x(0));
```

When an area is [generated](#_area), the x0 accessor will be invoked for each [defined](#area_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments.

If *x* is not specified, returns the current x0 accessor.

```js
area.x0() // () => 20
```

The x0 accessor defaults to:

```js
function x(d) {
  return d[0];
}
```

The default x0 accessor assumes that the input data are two-element arrays of numbers [[x0, y0], [x1, y1], …]. If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor as shown above.

## *area*.x1(*x*) {#area_x1}

:::tip
This method is intended for vertically-oriented areas, as when time goes down↓ rather than right→; for the more common horizontally-oriented areas, use [*area*.x](#area_x) instead.
:::

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *x* is specified, sets the x1 accessor to the specified function or number and returns this area generator.

```js
const area = d3.area().x1((d) => x(d.Close));
```

When an area is [generated](#_area), the x1 accessor will be invoked for each [defined](#area_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments.

If *x* is not specified, returns the current x1 accessor.

```js
area.x1() // (d) => x(d.Close)
```

The x1 accessor defaults to null, indicating that the previously-computed [x0](#area_x0) value should be reused for the x1 value; this default is intended for horizontally-oriented areas.

## *area*.y(*y*) {#area_y}
:::tip
This method is intended for vertically-oriented areas, as when time goes down↓ rather than right→; for the more common horizontally-oriented areas, use [*area*.y0](#area_y0) and [*area*.y1](#area_y1) instead.
:::

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *y* is specified, sets [y0](#area_y0) to *y* and [y1](#area_y1) to null and returns this area generator.

```js
const area = d3.area().y((d) => y(d.Date));
```

If *y* is not specified, returns the current y0 accessor.

```js
area.y() // (d) => y(d.Date)
```

## *area*.y0(*y*) {#area_y0}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *y* is specified, sets the y0 accessor to the specified function or number and returns this area generator.

```js
const area = d3.area().y0(y(0));
```

When an area is [generated](#_area), the y0 accessor will be invoked for each [defined](#area_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. For a horizontally-oriented area with a constant baseline (*i.e.*, an area that is not stacked, and not a ribbon or band), y0 is typically set to the output of the y scale for zero.

If *y* is not specified, returns the current y0 accessor.

```js
area.y0() // () => 360
```

The y0 accessor defaults to:

```js
function y() {
  return 0;
}
```

In the default SVG coordinate system, note that the default zero represents the top of the chart rather than the bottom, producing a flipped (or “hanging”) area.

## *area*.y1(*y*) {#area_y1}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *y* is specified, sets the y1 accessor to the specified function or number and returns this area generator.

```js
const area = d3.area().y1((d) => y(d.Close));
```

When an area is [generated](#_area), the y1 accessor will be invoked for each [defined](#area_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments.

If *y* is not specified, returns the current y1 accessor.

```js
area.y1() // (d) => y(d.Close)
```

The y1 accessor defaults to:

```js
function y(d) {
  return d[1];
}
```

The default y1 accessor assumes that the input data are two-element arrays of numbers [[x0, y0], [x1, y1], …]. If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor as shown above. A null accessor is also allowed, indicating that the previously-computed [y0](#area_y0) value should be reused for the y1 value; this can be used for a vertically-oriented area, as when time goes down↓ instead of right→.

## *area*.defined(*defined*) {#area_defined}

[Examples](https://observablehq.com/@d3/area-chart-missing-data/2) · [Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *defined* is specified, sets the defined accessor to the specified function or boolean and returns this area generator.

```js
const area = d3.area().defined((d) => !isNaN(d.Close));
```

When an area is [generated](#_area), the defined accessor will be invoked for each element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. If the given element is defined (*i.e.*, if the defined accessor returns a truthy value for this element), the [x0](#area_x0), [x1](#area_x1), [y0](#area_y0) and [y1](#area_y1) accessors will subsequently be evaluated and the point will be added to the current area segment. Otherwise, the element will be skipped, the current area segment will be ended, and a new area segment will be generated for the next defined point. As a result, the generated area may have several discrete segments.

If *defined* is not specified, returns the current defined accessor.

```js
area.defined() // (d) => !isNaN(d.Close)
```

The defined accessor defaults to the constant true, and assumes that the input data is always defined:

```js
function defined() {
  return true;
}
```

Note that if an area segment consists of only a single point, it may appear invisible unless rendered with rounded or square [line caps](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap). In addition, some curves such as [curveCardinalOpen](./curve.md#curveCardinalOpen) only render a visible segment if it contains multiple points.

## *area*.curve(*curve*) {#area_curve}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *curve* is specified, sets the [curve factory](./curve.md) and returns this area generator.

```js
const area = d3.area().curve(d3.curveStep);
```

If *curve* is not specified, returns the current curve factory, which defaults to [curveLinear](./curve.md#curveLinear).

```js
area.curve() // d3.curveStep
```

## *area*.context(context) {#area_context}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *context* is specified, sets the context and returns this area generator.

```js
const context = canvas.getContext("2d");
const area = d3.area().context(context);
```

If *context* is not specified, returns the current context.

```js
area.context() // context
```

The context defaults to null. If the context is not null, then the [generated area](#_area) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated area is returned.

## *area*.digits(digits) {#area_digits}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · If *digits* is specified, sets the maximum number of digits after the decimal separator and returns this area generator.

```js
const area = d3.area().digits(3);
```

If *digits* is not specified, returns the current maximum fraction digits, which defaults to 3.

```js
area.digits() // 3
```

This option only applies when the associated [*context*](#area_context) is null, as when this area generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

## *area*.lineX0() {#area_lineX0}

An alias for [*area*.lineY0](#area_lineY0).

## *area*.lineY0() {#area_lineY0}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · Returns a new [line generator](./line.md) that has this area generator’s current [defined accessor](#area_defined), [curve](#area_curve) and [context](#area_context). The line’s [*x*-accessor](./line.md#line_x) is this area’s [*x0*-accessor](#area_x0), and the line’s [*y*-accessor](./line.md#line_y) is this area’s [*y0*-accessor](#area_y0).

## *area*.lineX1() {#area_lineX1}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · Returns a new [line generator](./line.md#lines) that has this area generator’s current [defined accessor](#area_defined), [curve](#area_curve) and [context](#area_context). The line’s [*x*-accessor](./line.md#line_x) is this area’s [*x1*-accessor](#area_x1), and the line’s [*y*-accessor](./line.md#line_y) is this area’s [*y0*-accessor](#area_y0).

## *area*.lineY1() {#area_lineY1}

[Source](https://github.com/d3/d3-shape/blob/main/src/area.js) · Returns a new [line generator](./line.md#lines) that has this area generator’s current [defined accessor](#area_defined), [curve](#area_curve) and [context](#area_context). The line’s [*x*-accessor](./line.md#line_x) is this area’s [*x0*-accessor](#area_x0), and the line’s [*y*-accessor](./line.md#line_y) is this area’s [*y1*-accessor](#area_y1).

# docs/d3-shape/curve.md

<script setup>

import {ref} from "vue";
import ExampleCurve from "../components/ExampleCurve.vue";

const alpha = ref(0.5);
const beta = ref(0.85);
const tension = ref(0);
const ticks = [0, 0.25, 0.5, 0.75, 1];

</script>

# Curves

Curves turn a discrete (pointwise) representation of a [line](./line.md) or [area](./area.md) into a continuous shape: curves specify how to interpolate between two-dimensional [*x*, *y*] points.

Curves are typically not constructed or used directly. Instead, one of the built-in curves is being passed to [*line*.curve](./line.md#line_curve) or [*area*.curve](./area.md#area_curve).

```js
const line = d3.line()
    .x((d) => x(d.date))
    .y((d) => y(d.value))
    .curve(d3.curveCatmullRom.alpha(0.5));
```

If desired, you can implement a [custom curve](#custom-curves). For an example of using a curve directly, see [Context to Curve](https://observablehq.com/@d3/context-to-curve).

## *curveBasis*(*context*) {#curveBasis}

<ExampleCurve :curves='[{curve: "basis"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/basis.js) · Produces a cubic [basis spline](https://en.wikipedia.org/wiki/B-spline) using the specified control points. The first and last points are triplicated such that the spline starts at the first point and ends at the last point, and is tangent to the line between the first and second points, and to the line between the penultimate and last points.

## *curveBasisClosed*(*context*) {#curveBasisClosed}

<ExampleCurve :curves='[{curve: "basis-closed"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/basisClosed.js) · Produces a closed cubic [basis spline](https://en.wikipedia.org/wiki/B-spline) using the specified control points. When a line segment ends, the first three control points are repeated, producing a closed loop with C2 continuity.

## *curveBasisOpen*(*context*) {#curveBasisOpen}

<ExampleCurve :curves='[{curve: "basis-open"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/basisOpen.js) · Produces a cubic [basis spline](https://en.wikipedia.org/wiki/B-spline) using the specified control points. Unlike [basis](#curveBasis), the first and last points are not repeated, and thus the curve typically does not intersect these points.

## *curveBumpX*(*context*) {#curveBumpX}

<ExampleCurve :curves='[{curve: "bump-x"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/bump.js) · Produces a Bézier curve between each pair of points, with horizontal tangents at each point.

## *curveBumpY*(*context*) {#curveBumpY}

<ExampleCurve :curves='[{curve: "bump-y"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/bump.js) · Produces a Bézier curve between each pair of points, with vertical tangents at each point.

## *curveBundle*(*context*) {#curveBundle}

<ExampleCurve label="beta" :curves='ticks.map((t) => ({curve: "bundle", tension: t}))' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/bundle.js) · Produces a straightened cubic [basis spline](https://en.wikipedia.org/wiki/B-spline) using the specified control points, with the spline straightened according to the curve’s [*beta*](#curveBundle_beta), which defaults to 0.85. This curve is typically used in [hierarchical edge bundling](https://observablehq.com/@d3/hierarchical-edge-bundling) to disambiguate connections, as proposed by [Danny Holten](https://www.win.tue.nl/vis1/home/dholten/) in [Hierarchical Edge Bundles: Visualization of Adjacency Relations in Hierarchical Data](https://www.win.tue.nl/vis1/home/dholten/papers/bundles_infovis.pdf). This curve does not implement [*curve*.areaStart](#curve_areaStart) and [*curve*.areaEnd](#curve_areaEnd); it is intended to work with [d3.line](./line.md), not [d3.area](./area.md).

## curveBundle.beta(*beta*) {#curveBundle_beta}

<p>
  <label class="label-input">
    <span>Beta:</span>
    <input type="range" v-model.number="beta" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{beta.toFixed(2)}}</span>
  </label>
</p>

<ExampleCurve :curves='[{curve: "bundle", tension: beta}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/bundle.js) · Returns a bundle curve with the specified *beta* in the range [0, 1], representing the bundle strength. If *beta* equals zero, a straight line between the first and last point is produced; if *beta* equals one, a standard [basis](#curveBasis) spline is produced. For example:

```js
const line = d3.line().curve(d3.curveBundle.beta(0.5));
```

## *curveCardinal*(*context*) {#curveCardinal}

<ExampleCurve label="tension" :curves='ticks.map((t) => ({curve: "cardinal", tension: t}))' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/cardinal.js) · Produces a cubic [cardinal spline](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline) using the specified control points, with one-sided differences used for the first and last piece. The default [tension](#curveCardinal_tension) is 0.

## *curveCardinalClosed*(*context*) {#curveCardinalClosed}

<ExampleCurve label="tension" :curves='ticks.map((t) => ({curve: "cardinal-closed", tension: t}))' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/cardinalClosed.js) · Produces a closed cubic [cardinal spline](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline) using the specified control points. When a line segment ends, the first three control points are repeated, producing a closed loop. The default [tension](#curveCardinal_tension) is 0.

## *curveCardinalOpen*(*context*) {#curveCardinalOpen}

<ExampleCurve label="tension" :curves='ticks.map((t) => ({curve: "cardinal-open", tension: t}))' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/cardinalOpen.js) · Produces a cubic [cardinal spline](https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Cardinal_spline) using the specified control points. Unlike [curveCardinal](#curveCardinal), one-sided differences are not used for the first and last piece, and thus the curve starts at the second point and ends at the penultimate point. The default [tension](#curveCardinal_tension) is 0.

## curveCardinal.tension(*tension*) {#curveCardinal_tension}

<p>
  <label class="label-input">
    <span>Tension:</span>
    <input type="range" v-model.number="tension" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{tension.toFixed(2)}}</span>
  </label>
</p>

<ExampleCurve :curves='[{curve: "cardinal", tension}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/cardinalOpen.js) · Returns a cardinal curve with the specified *tension* in the range [0, 1]. The *tension* determines the length of the tangents: a *tension* of one yields all zero tangents, equivalent to [curveLinear](#curveLinear); a *tension* of zero produces a uniform [Catmull–Rom](#curveCatmullRom) spline. For example:

```js
const line = d3.line().curve(d3.curveCardinal.tension(0.5));
```

## *curveCatmullRom*(*context*) {#curveCatmullRom}

<ExampleCurve label="alpha" :curves='ticks.map((t) => ({curve: "catmull-rom", tension: t}))' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/catmullRom.js) · Produces a cubic Catmull–Rom spline using the specified control points and the parameter [*alpha*](#curveCatmullRom_alpha), which defaults to 0.5, as proposed by Yuksel et al. in [On the Parameterization of Catmull–Rom Curves](http://www.cemyuksel.com/research/catmullrom_param/), with one-sided differences used for the first and last piece.

## *curveCatmullRomClosed*(*context*) {#curveCatmullRomClosed}

<ExampleCurve label="alpha" :curves='ticks.map((t) => ({curve: "catmull-rom-closed", tension: t}))' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/catmullRomClosed.js) · Produces a closed cubic Catmull–Rom spline using the specified control points and the parameter [*alpha*](#curveCatmullRom_alpha), which defaults to 0.5, as proposed by Yuksel et al. When a line segment ends, the first three control points are repeated, producing a closed loop.

## *curveCatmullRomOpen*(*context*) {#curveCatmullRomOpen}

<ExampleCurve label="alpha" :curves='ticks.map((t) => ({curve: "catmull-rom-open", tension: t}))' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/catmullRomOpen.js) · Produces a cubic Catmull–Rom spline using the specified control points and the parameter [*alpha*](#curveCatmullRom_alpha), which defaults to 0.5, as proposed by Yuksel et al. Unlike [curveCatmullRom](#curveCatmullRom), one-sided differences are not used for the first and last piece, and thus the curve starts at the second point and ends at the penultimate point.

## curveCatmullRom.alpha(*alpha*) {#curveCatmullRom_alpha}

<p>
  <label class="label-input">
    <span>Alpha:</span>
    <input type="range" v-model.number="alpha" min="0" max="1" step="0.01">
    <span style="font-variant-numeric: tabular-nums;">{{alpha.toFixed(2)}}</span>
  </label>
</p>

<ExampleCurve :curves='[{curve: "catmull-rom", tension: alpha}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/catmullRom.js) · Returns a cubic Catmull–Rom curve with the specified *alpha* in the range [0, 1]. If *alpha* is zero, produces a uniform spline, equivalent to [curveCardinal](#curveCardinal) with a tension of zero; if *alpha* is one, produces a chordal spline; if *alpha* is 0.5, produces a [centripetal spline](https://en.wikipedia.org/wiki/Centripetal_Catmull–Rom_spline). Centripetal splines are recommended to avoid self-intersections and overshoot. For example:

```js
const line = d3.line().curve(d3.curveCatmullRom.alpha(0.5));
```

## *curveLinear*(*context*) {#curveLinear}

<ExampleCurve :curves='[{curve: "linear"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/linear.js) · Produces a polyline through the specified points.

## *curveLinearClosed*(*context*) {#curveLinearClosed}

<ExampleCurve :curves='[{curve: "linear-closed"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/linearClosed.js) · Produces a closed polyline through the specified points by repeating the first point when the line segment ends.

## *curveMonotoneX*(*context*) {#curveMonotoneX}

<ExampleCurve :curves='[{curve: "monotone-x"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/monotone.js) · Produces a cubic spline that [preserves monotonicity](https://en.wikipedia.org/wiki/Monotone_cubic_interpolation) in *y*, assuming monotonicity in *x*, as proposed by Steffen in [A simple method for monotonic interpolation in one dimension](http://adsabs.harvard.edu/full/1990A%26A...239..443S): “a smooth curve with continuous first-order derivatives that passes through any given set of data points without spurious oscillations. Local extrema can occur only at grid points where they are given by the data, but not in between two adjacent grid points.”

## *curveMonotoneY*(*context*) {#curveMonotoneY}

<ExampleCurve :points='[[100, 200], [340, 200], [460, 160], [460, 120], [420, 80], [580, 40], [820, 40]]' :curves='[{curve: "monotone-y"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/monotone.js) · Produces a cubic spline that [preserves monotonicity](https://en.wikipedia.org/wiki/Monotone_cubic_interpolation) in *x*, assuming monotonicity in *y*, as proposed by Steffen in [A simple method for monotonic interpolation in one dimension](http://adsabs.harvard.edu/full/1990A%26A...239..443S): “a smooth curve with continuous first-order derivatives that passes through any given set of data points without spurious oscillations. Local extrema can occur only at grid points where they are given by the data, but not in between two adjacent grid points.”

## *curveNatural*(*context*) {#curveNatural}

<ExampleCurve :curves='[{curve: "natural"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/natural.js) · Produces a [natural](https://en.wikipedia.org/wiki/Spline_interpolation) [cubic spline](http://mathworld.wolfram.com/CubicSpline.html) with the second derivative of the spline set to zero at the endpoints.

## *curveStep*(*context*) {#curveStep}

<ExampleCurve :curves='[{curve: "step"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/step.js) · Produces a piecewise constant function (a [step function](https://en.wikipedia.org/wiki/Step_function)) consisting of alternating horizontal and vertical lines. The *y*-value changes at the midpoint of each pair of adjacent *x*-values.

## *curveStepAfter*(*context*) {#curveStepAfter}

<ExampleCurve :curves='[{curve: "step-after"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/step.js) · Produces a piecewise constant function (a [step function](https://en.wikipedia.org/wiki/Step_function)) consisting of alternating horizontal and vertical lines. The *y*-value changes after the *x*-value.

## *curveStepBefore*(*context*) {#curveStepBefore}

<ExampleCurve :curves='[{curve: "step-before"}]' />

[Source](https://github.com/d3/d3-shape/blob/main/src/curve/step.js) · Produces a piecewise constant function (a [step function](https://en.wikipedia.org/wiki/Step_function)) consisting of alternating horizontal and vertical lines. The *y*-value changes before the *x*-value.

## Custom curves

Curves are typically not used directly, instead being passed to [*line*.curve](./line.md#line_curve) and [*area*.curve](./area.md#area_curve). However, you can define your own curve implementation should none of the built-in curves satisfy your needs using the following interface; see the [curveLinear source](https://github.com/d3/d3-shape/blob/main/src/curve/linear.js) for an example implementation. You can also use this low-level interface with a built-in curve type as an alternative to the line and area generators.

### *curve*.areaStart() {#curve_areaStart}

Indicates the start of a new area segment. Each area segment consists of exactly two [line segments](#curve_lineStart): the topline, followed by the baseline, with the baseline points in reverse order.

### *curve*.areaEnd() {#curve_areaEnd}

Indicates the end of the current area segment.

### *curve*.lineStart() {#curve_lineStart}

Indicates the start of a new line segment. Zero or more [points](#curve_point) will follow.

### *curve*.lineEnd() {#curve_lineEnd}

Indicates the end of the current line segment.

### *curve*.point(*x*, *y*) {#curve_point}

Indicates a new point in the current line segment with the given *x*- and *y*-values.

# docs/d3-shape/line.md

# Lines

<!-- https://observablehq.com/@d3/line-chart -->

[Examples](https://observablehq.com/@d3/line-chart/2) · The line generator produces a [spline](https://en.wikipedia.org/wiki/Spline_(mathematics)) or [polyline](https://en.wikipedia.org/wiki/Polygonal_chain) as in a line chart. Lines also appear in many other visualization types, such as the links in [hierarchical edge bundling](https://observablehq.com/@d3/hierarchical-edge-bundling). See also [radial lines](./radial-line.md).

## line(*x*, *y*) {#line}

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js) · Constructs a new line generator with the given *x* and *y* accessor.

```js
const line = d3.line((d) => x(d.Date), (d) => y(d.Close));
```

If *x* or *y* are not specified, the respective defaults will be used. The above can be expressed more explicitly as:

```js
const line = d3.line()
    .x((d) => x(d.Date))
    .y((d) => y(d.Close));
```

## *line*(*data*) {#_line}

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js) · Generates a line for the given array of *data*.

```js
svg.append("path").attr("d", line(data)).attr("stroke", "currentColor");
```

If the line generator has a [context](#line_context), then the line is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls and this function returns void. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string is returned.

:::warning CAUTION
Depending on this line generator’s associated [curve](#line_curve), the given input *data* may need to be sorted by *x*-value before being passed to the line generator.
:::

## *line*.x(*x*) {#line_x}

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js) · If *x* is specified, sets the x accessor to the specified function or number and returns this line generator.

```js
const line = d3.line().x((d) => x(d.Date));
```

If *x* is not specified, returns the current x accessor.

```js
line.x() // (d) => x(d.Date)
```

The x accessor defaults to:

```js
function x(d) {
  return d[0];
}
```

When a line is [generated](#_line), the x accessor will be invoked for each [defined](#line_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments.

The default x accessor assumes that the input data are two-element arrays of numbers. If your data are in a different format, or if you wish to transform the data before rendering, then you should specify a custom accessor.

## *line*.y(y) {#line_y}

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js) · If *y* is specified, sets the y accessor to the specified function or number and returns this line generator.

```js
const line = d3.line().y((d) => y(d.Close));
```

When a line is [generated](#_line), the y accessor will be invoked for each [defined](#line_defined) element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments.

If *y* is not specified, returns the current y accessor.

```js
line.y() // (d) => y(d.Close)
```

The y accessor defaults to:

```js
function y(d) {
  return d[1];
}
```

The default y accessor assumes that the input data are two-element arrays of numbers. See [*line*.x](#line_x) for more information.

## *line*.defined(*defined*) {#line_defined}

[Examples](https://observablehq.com/@d3/line-chart-missing-data/2) · [Source](https://github.com/d3/d3-shape/blob/main/src/line.js) · If *defined* is specified, sets the defined accessor to the specified function or boolean and returns this line generator.

```js
const line = d3.line().defined((d) => !isNaN(d.Close));
```

When a line is [generated](#_line), the defined accessor will be invoked for each element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments. If the given element is defined (*i.e.*, if the defined accessor returns a truthy value for this element), the [x](#line_x) and [y](#line_y) accessors will subsequently be evaluated and the point will be added to the current line segment. Otherwise, the element will be skipped, the current line segment will be ended, and a new line segment will be generated for the next defined point.

If *defined* is not specified, returns the current defined accessor.

```js
line.defined() // (d) => !isNaN(d.Close)
```

The defined accessor defaults to the constant true, and assumes that the input data is always defined:

```js
function defined() {
  return true;
}
```

Note that if a line segment consists of only a single point, it may appear invisible unless rendered with rounded or square [line caps](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap). In addition, some curves such as [curveCardinalOpen](./curve.md#curveCardinalOpen) only render a visible segment if it contains multiple points.

## *line*.curve(*curve*) {#line_curve}

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js) · If *curve* is specified, sets the [curve factory](./curve.md) and returns this line generator.

```js
const line = d3.line().curve(d3.curveStep);
```

If *curve* is not specified, returns the current curve factory, which defaults to [curveLinear](./curve.md#curveLinear).

```js
line.curve() // d3.curveStep
```

## *line*.context(context) {#line_context}

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js) · If *context* is specified, sets the context and returns this line generator.

```js
const context = canvas.getContext("2d");
const line = d3.line().context(context);
```

If *context* is not specified, returns the current context.

```js
line.context() // context
```

The context defaults to null. If the context is not null, then the [generated line](#_line) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated line is returned.

## *line*.digits(*digits*) {#line_digits}

[Source](https://github.com/d3/d3-shape/blob/main/src/line.js) · If *digits* is specified, sets the maximum number of digits after the decimal separator and returns this line generator.

```js
const line = d3.line().digits(3);
```

If *digits* is not specified, returns the current maximum fraction digits, which defaults to 3.

```js
line.digits() // 3
```

This option only applies when the associated [*context*](#line_context) is null, as when this line generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

# docs/d3-shape/link.md

# Links

[Examples](https://observablehq.com/@d3/tidy-tree) · The link shape generates a smooth cubic Bézier curve from a source point to a target point. The tangents of the curve at the start and end are either [vertical](#linkVertical) or [horizontal](#linkHorizontal). See also [radial links](./radial-link.md).

## link(*curve*) {#link}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · Returns a new [link generator](#_link) using the specified <i>curve</i>. For example, to visualize [links](../d3-hierarchy/hierarchy.md#node_links) in a [tree diagram](../d3-hierarchy/tree.md) rooted on the top edge of the display, you might say:

```js
const link = d3.link(d3.curveBumpY)
    .x((d) => d.x)
    .y((d) => d.y);
```

## linkVertical() {#linkVertical}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · Shorthand for [link](#link) with [curveBumpY](./curve.md#curveBumpY); suitable for visualizing [links](../d3-hierarchy/hierarchy.md#node_links) in a [tree diagram](../d3-hierarchy/tree.md) rooted on the top edge of the display. Equivalent to:

```js
const link = d3.link(d3.curveBumpY);
```

## linkHorizontal() {#linkHorizontal}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · Shorthand for [link](#link) with [curveBumpX](./curve.md#curveBumpX); suitable for visualizing [links](../d3-hierarchy/hierarchy.md#node_links) in a [tree diagram](../d3-hierarchy/tree.md) rooted on the left edge of the display. Equivalent to:

```js
const link = d3.link(d3.curveBumpX);
```

## *link*(...*arguments*) {#_link}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · Generates a link for the given *arguments*. The *arguments* are arbitrary; they are propagated to the link generator’s accessor functions along with the `this` object. With the default settings, an object with *source* and *target* properties is expected.

```js
link({source: [100, 100], target: [300, 300]}) // "M100,100C200,100,200,300,300,300"
```

## *link*.source(*source*) {#link_source}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · If *source* is specified, sets the source accessor to the specified function and returns this link generator.

```js
const link = d3.linkHorizontal().source((d) => d[0]);
```

If *source* is not specified, returns the current source accessor.

```js
link.source() // (d) => d[0]
```

The source accessor defaults to:

```js
function source(d) {
  return d.source;
}
```

## *link*.target(*target*) {#link_target}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · If *target* is specified, sets the target accessor to the specified function and returns this link generator.

```js
const link = d3.linkHorizontal().target((d) => d[1]);
```

If *target* is not specified, returns the current target accessor.

```js
link.target() // (d) => d[1]
```

The target accessor defaults to:

```js
function target(d) {
  return d.target;
}
```

## *link*.x(*x*) {#link_x}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · If *x* is specified, sets the *x*-accessor to the specified function or number and returns this link generator.

```js
const link = d3.linkHorizontal().x((d) => x(d.x));
```

If *x* is not specified, returns the current x accessor.

```js
link.x() // (d) => x(d.x)
```

The x accessor defaults to:

```js
function x(d) {
  return d[0];
}
```

## *link*.y(*y*) {#link_y}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · If *y* is specified, sets the *y*-accessor to the specified function or number and returns this link generator.

```js
const link = d3.linkHorizontal().y((d) => y(d.y));
```

If *y* is not specified, returns the current y accessor.

```js
link.y() // (d) => y(d.y)
```

The y accessor defaults to:

```js
function y(d) {
  return d[1];
}
```

## *link*.context(*context*) {#link_context}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · If *context* is specified, sets the context and returns this link generator.

```js
const context = canvas.getContext("2d");
const link = d3.link().context(context);
```

If *context* is not specified, returns the current context.

```js
link.context() // context
```

The context defaults to null. If the context is not null, then the [generated link](#_link) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated link is returned. See also [d3-path](../d3-path.md).

## *link*.digits(*digits*) {#link_digits}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · If *digits* is specified, sets the maximum number of digits after the decimal separator and returns this link generator.

```js
const link = d3.link().digits(3);
```

If *digits* is not specified, returns the current maximum fraction digits, which defaults to 3.

```js
link.digits() // 3
```

This option only applies when the associated [*context*](#link_context) is null, as when this link generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

# docs/d3-shape/pie.md

<script setup>

import ExampleArcs from "../components/ExampleArcs.vue";
import {ref} from "vue";

const padAngle = ref(0.03);

</script>

# Pies

[Examples](https://observablehq.com/@d3/donut-chart/2) · The pie generator computes the necessary angles to represent a tabular dataset as a pie or donut chart; these angles can then be passed to an [arc generator](./arc.md). (The pie generator does not produce a shape directly.)

## pie() {#pie}

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js) · Constructs a new pie generator with the default settings.

```js
const pie = d3.pie();
```

## *pie*(*data*, ...*arguments*) {#_pie}

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js) · Generates a pie for the given array of *data*, returning an array of objects representing each datum’s arc angles. For example, given a set of numbers, here is how to compute the angles for a pie chart:

```js
const data = [1, 1, 2, 3, 5, 8, 13, 21];
const pie = d3.pie();
const arcs = pie(data);
```

The resulting `arcs` is an array of objects:

```json
[
  {"data":  1, "value":  1, "index": 6, "startAngle": 6.050474740247008, "endAngle": 6.166830023713296, "padAngle": 0},
  {"data":  1, "value":  1, "index": 7, "startAngle": 6.166830023713296, "endAngle": 6.283185307179584, "padAngle": 0},
  {"data":  2, "value":  2, "index": 5, "startAngle": 5.817764173314431, "endAngle": 6.050474740247008, "padAngle": 0},
  {"data":  3, "value":  3, "index": 4, "startAngle": 5.468698322915565, "endAngle": 5.817764173314431, "padAngle": 0},
  {"data":  5, "value":  5, "index": 3, "startAngle": 4.886921905584122, "endAngle": 5.468698322915565, "padAngle": 0},
  {"data":  8, "value":  8, "index": 2, "startAngle": 3.956079637853813, "endAngle": 4.886921905584122, "padAngle": 0},
  {"data": 13, "value": 13, "index": 1, "startAngle": 2.443460952792061, "endAngle": 3.956079637853813, "padAngle": 0},
  {"data": 21, "value": 21, "index": 0, "startAngle": 0.000000000000000, "endAngle": 2.443460952792061, "padAngle": 0}
]
```

Each object in the returned array has the following properties:

* `data` - the input datum; the corresponding element in the input data array.
* `value` - the numeric [value](#pie_value) of the arc.
* `index` - the zero-based [sorted index](#pie_sort) of the arc.
* `startAngle` - the [start angle](#pie_startAngle) of the arc.
* `endAngle` - the [end angle](#pie_endAngle) of the arc.
* `padAngle` - the [pad angle](#pie_padAngle) of the arc.

This representation is designed to work with the arc generator’s default [startAngle](./arc.md#arc_startAngle), [endAngle](./arc.md#arc_endAngle) and [padAngle](./arc.md#arc_padAngle) accessors. Angles are in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise.

The length of the returned array is the same as *data*, and each element *i* in the returned array corresponds to the element *i* in the input data. The returned array of arcs is in the same order as the data, even when the pie chart is [sorted](#pie_sortValues).

Any additional *arguments* are arbitrary; they are propagated to the pie generator’s accessor functions along with the `this` object.

## *pie*.value(*value*) {#pie_value}

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js) · If *value* is specified, sets the value accessor to the specified function or number and returns this pie generator.

```js
const pie = d3.pie().value((d) => d.value);
```

When a pie is [generated](#_pie), the value accessor will be invoked for each element in the input data array, being passed the element `d`, the index `i`, and the array `data` as three arguments.

If *value* is not specified, returns the current value accessor.

```js
pie.value() // (d) => d.value
```

The value accessor defaults to:

```js
function value(d) {
  return d;
}
```

The default value accessor assumes that the input data are numbers, or that they are coercible to numbers using [valueOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf). If your data are not numbers, then you should specify an accessor that returns the corresponding numeric value for a given datum. For example, given a CSV file with *number* and *name* fields:

```
number,name
4,Locke
8,Reyes
15,Ford
16,Jarrah
23,Shephard
42,Kwon
```

You might say:

```js
const data = await d3.csv("lost.csv", d3.autoType);
const pie = d3.pie().value((d) => d.number);
const arcs = pie(data);
```

This is similar to [mapping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) your data to values before invoking the pie generator:

```js
const arcs = d3.pie()(data.map((d) => d.number));
```

The benefit of an accessor is that the input data remains associated with the returned objects, thereby making it easier to access other fields of the data, for example to set the color or to add text labels.

## *pie*.sort(*compare*) {#pie_sort}

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js) · If *compare* is specified, sets the data comparator to the specified function and returns this pie generator.

```js
const pie = d3.pie().sort((a, b) => d3.ascending(a.name, b.name));
```

The data comparator takes two arguments *a* and *b*, each elements from the input data array. If the arc for *a* should be before the arc for *b*, then the comparator must return a number less than zero; if the arc for *a* should be after the arc for *b*, then the comparator must return a number greater than zero; returning zero means that the relative order of *a* and *b* is unspecified.

If *compare* is not specified, returns the current data comparator.

```js
pie.sort() // (a, b) => d3.ascending(a.name, b.name))
```

The data comparator defaults to null. If both the data comparator and the [value comparator](#pie_sortValues) are null, then arcs are positioned in the original input order. Setting the data comparator implicitly sets the value comparator to null.

Sorting does not affect the order of the [generated arc array](#_pie) which is always in the same order as the input data array; it only affects the computed angles of each arc. The first arc starts at the [start angle](#pie_startAngle) and the last arc ends at the [end angle](#pie_endAngle).

## *pie*.sortValues(*compare*) {#pie_sortValues}

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js) · If *compare* is specified, sets the value comparator to the specified function and returns this pie generator.

```js
const pie = d3.pie().sortValues(d3.ascending);
```

The value comparator is similar to the [data comparator](#pie_sort), except the two arguments *a* and *b* are values derived from the input data array using the [value accessor](#pie_value) rather than the data elements. If the arc for *a* should be before the arc for *b*, then the comparator must return a number less than zero; if the arc for *a* should be after the arc for *b*, then the comparator must return a number greater than zero; returning zero means that the relative order of *a* and *b* is unspecified.

If *compare* is not specified, returns the current value comparator.

```js
pie.sortValues() // d3.ascending
```

The value comparator defaults to [descending](../d3-array/sort.md#descending). If both the [data comparator](#pie_sort) and the value comparator are null, then arcs are positioned in the original input order. Setting the value comparator implicitly sets the [data comparator](#pie_sort) to null.

Sorting does not affect the order of the [generated arc array](#_pie) which is always in the same order as the input data array; it merely affects the computed angles of each arc. The first arc starts at the [start angle](#pie_startAngle) and the last arc ends at the [end angle](#pie_endAngle).

## *pie*.startAngle(*angle*) {#pie_startAngle}

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js) · If *angle* is specified, sets the overall start angle of the pie to the specified function or number and returns this pie generator.

```js
const pie = d3.pie().startAngle(0);
```

The start angle is the *overall* start angle of the pie, *i.e.*, the start angle of the first arc. It is typically expressed as a constant number but can also be expressed as a function of data. When a function, the start angle accessor is invoked once, being passed the same arguments and `this` context as the [pie generator](#_pie).

If *angle* is not specified, returns the current start angle accessor.

```js
pie.startAngle() // () => 0
```

The start angle accessor defaults to:

```js
function startAngle() {
  return 0;
}
```

Angles are in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise.

## *pie*.endAngle(*angle*) {#pie_endAngle}

[Source](https://github.com/d3/d3-shape/blob/main/src/pie.js) · If *angle* is specified, sets the overall end angle of the pie to the specified function or number and returns this pie generator.

```js
const pie = d3.pie().endAngle(Math.PI);
```

The end angle here means the *overall* end angle of the pie, *i.e.*, the end angle of the last arc. It is typically expressed as a constant number but can also be expressed as a function of data. When a function, the end angle accessor is invoked once, being passed the same arguments and `this` context as the [pie generator](#_pie).

If *angle* is not specified, returns the current end angle accessor.

```js
pie.endAngle() // () => Math.PI
```

The end angle accessor defaults to:

```js
function endAngle() {
  return 2 * Math.PI;
}
```

Angles are in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise. The value of the end angle is constrained to [startAngle](#pie_startAngle) ± τ, such that |endAngle - startAngle| ≤ τ.

## *pie*.padAngle(*angle*) {#pie_padAngle}

<p>
  <label class="label-input">
    <span>Pad angle:</span>
    <input type="range" v-model.number="padAngle" min="0" max="0.1" step="0.001">
    <span style="font-variant-numeric: tabular-nums;">{{padAngle.toFixed(3)}}</span>
  </label>
</p>

<ExampleArcs :padAngle="padAngle" />

[Examples](https://observablehq.com/@d3/arc-pad-angle) · [Source](https://github.com/d3/d3-shape/blob/main/src/pie.js) · If *angle* is specified, sets the pad angle to the specified function or number and returns this pie generator.

```js-vue
const pie = d3.pie().padAngle({{padAngle}});
```

The pad angle specifies the angular separation in radians between adjacent arcs. The total amount of padding is the specified *angle* times the number of elements in the input data array, and at most |[endAngle](#pie_endAngle) - [startAngle](#pie_startAngle)|; the remaining space is divided proportionally by [value](#pie_value) such that the relative area of each arc is preserved.

The pad angle is typically expressed as a constant number but can also be expressed as a function of data. When a function, the pad angle accessor is invoked once, being passed the same arguments and `this` context as the [pie generator](#_pie).

If *angle* is not specified, returns the current pad angle accessor.

```js-vue
pie.padAngle() // () => {{padAngle}}
```

The pad angle accessor defaults to:

```js
function padAngle() {
  return 0;
}
```

# docs/d3-shape/radial-area.md

# Radial areas

[Examples](https://observablehq.com/@d3/radial-area-chart) · A radial area generator is like the Cartesian [area generator](./area.md) except the [x](./area.md#area_x) and [y](./area.md#area_y) accessors are replaced with [angle](#areaRadial_angle) and [radius](#areaRadial_radius) accessors. Radial areas are positioned relative to the origin; use a [transform](http://www.w3.org/TR/SVG/coords.html#TransformAttribute) to change the origin.

## areaRadial() {#areaRadial}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Constructs a new radial area generator with the default settings.

```js
const area = d3.areaRadial();
```

## *areaRadial*(*data*) {#_areaRadial}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*](./area.md#_area).

```js
svg.append("path").attr("d", area(data));
```

## *areaRadial*.angle(*angle*) {#areaRadial_angle}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.x](./area.md#area_x), except the accessor returns the angle in radians, with 0 at -*y* (12 o’clock).

```js
const area = d3.areaRadial().angle((d) => a(d.Date));
```

## *areaRadial*.startAngle(*angle*) {#areaRadial_startAngle}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.x0](./area.md#area_x0), except the accessor returns the angle in radians, with 0 at -*y* (12 o’clock). Note: typically [angle](#areaRadial_angle) is used instead of setting separate start and end angles.

## *areaRadial*.endAngle(*angle*) {#areaRadial_endAngle}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.x1](./area.md#area_x1), except the accessor returns the angle in radians, with 0 at -*y* (12 o’clock). Note: typically [angle](#areaRadial_angle) is used instead of setting separate start and end angles.

## *areaRadial*.radius(*radius*) {#areaRadial_radius}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.y](./area.md#area_y), except the accessor returns the radius: the distance from the origin.

```js
const area = d3.areaRadial().radius((d) => r(d.temperature));
```

## *areaRadial*.innerRadius(*radius*) {#areaRadial_innerRadius}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.y0](./area.md#area_y0), except the accessor returns the radius: the distance from the origin.

```js
const area = d3.areaRadial().radius((d) => r(d.low));
```

## *areaRadial*.outerRadius(*radius*) {#areaRadial_outerRadius}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.y1](./area.md#area_y1), except the accessor returns the radius: the distance from the origin.

```js
const area = d3.areaRadial().radius((d) => r(d.high));
```

## *areaRadial*.defined(*defined*) {#areaRadial_defined}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.defined](./area.md#area_defined).

```js
const area = d3.areaRadial().defined((d) => !isNaN(d.temperature));
```

## *areaRadial*.curve(*curve*) {#areaRadial_curve}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.curve](./area.md#area_curve). Note that [curveMonotoneX](./curve.md#curveMonotoneX) or [curveMonotoneY](./curve.md#curveMonotoneY) are not recommended for radial areas because they assume that the data is monotonic in *x* or *y*, which is typically untrue of radial areas.

```js
const area = d3.areaRadial().curve(d3.curveBasisClosed);
```

## *areaRadial*.context(*context*) {#areaRadial_context}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Equivalent to [*area*.context](./area.md#area_context).

```js
const context = canvas.getContext("2d");
const area = d3.areaRadial().context(context);
```

## *areaRadial*.lineInnerRadius() {#areaRadial_lineInnerRadius}

An alias for [*areaRadial*.lineStartAngle](#areaRadial_lineStartAngle).

## *areaRadial*.lineStartAngle() {#areaRadial_lineStartAngle}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Returns a new [radial line generator](./radial-line.md) that has this radial area generator’s current [defined accessor](#areaRadial_defined), [curve](#areaRadial_curve) and [context](#areaRadial_context). The line’s [angle accessor](./radial-line.md#lineRadial_angle) is this area’s [start angle accessor](#areaRadial_startAngle), and the line’s [radius accessor](./radial-line.md#lineRadial_radius) is this area’s [inner radius accessor](#areaRadial_innerRadius).

## *areaRadial*.lineEndAngle() {#areaRadial_lineEndAngle}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Returns a new [radial line generator](./radial-line.md#lineRadial) that has this radial area generator’s current [defined accessor](#areaRadial_defined), [curve](#areaRadial_curve) and [context](#areaRadial_context). The line’s [angle accessor](./radial-line.md#lineRadial_angle) is this area’s [end angle accessor](#areaRadial_endAngle), and the line’s [radius accessor](./radial-line.md#lineRadial_radius) is this area’s [inner radius accessor](#areaRadial_innerRadius).

## *areaRadial*.lineOuterRadius() {#areaRadial_lineOuterRadius}

[Source](https://github.com/d3/d3-shape/blob/main/src/areaRadial.js) · Returns a new [radial line generator](./radial-line.md#lineRadial) that has this radial area generator’s current [defined accessor](#areaRadial_defined), [curve](#areaRadial_curve) and [context](#areaRadial_context). The line’s [angle accessor](./radial-line.md#lineRadial_angle) is this area’s [start angle accessor](#areaRadial_startAngle), and the line’s [radius accessor](./radial-line.md#lineRadial_radius) is this area’s [outer radius accessor](#areaRadial_outerRadius).

# docs/d3-shape/radial-line.md

# Radial lines

[Examples](https://observablehq.com/@d3/d3-lineradial) · A radial line generator is like the Cartesian [line generator](./line.md) except the [x](./line.md#line_x) and [y](./line.md#line_y) accessors are replaced with [angle](#lineRadial_angle) and [radius](#lineRadial_radius) accessors. Radial lines are positioned relative to the origin; use a [transform](http://www.w3.org/TR/SVG/coords.html#TransformAttribute) to change the origin.

## lineRadial() {#lineRadial}

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js) · Constructs a new radial line generator with the default settings.

```js
const line = d3.lineRadial();
```

## *lineRadial*(*data*) {#_lineRadial}

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js) · Equivalent to [*line*](./line.md#_line).

```js
svg.append("path").attr("d", line(data)).attr("stroke", "currentColor");
```

## *lineRadial*.angle(*angle*) {#lineRadial_angle}

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js) · Equivalent to [*line*.x](./line.md#line_x), except the accessor returns the angle in radians, with 0 at -*y* (12 o’clock).

```js
const line = d3.lineRadial().angle((d) => a(d.Date));
```

## *lineRadial*.radius(*radius*) {#lineRadial_radius}

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js) · Equivalent to [*line*.y](./line.md#line_y), except the accessor returns the radius: the distance from the origin.

```js
const line = d3.lineRadial().radius((d) => r(d.temperature));
```

## *lineRadial*.defined(*defined*) {#lineRadial_defined}

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js) · Equivalent to [*line*.defined](./line.md#line_defined).

```js
const line = d3.lineRadial().defined((d) => !isNaN(d.temperature));
```

## *lineRadial*.curve(*curve*) {#lineRadial_curve}

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js) · Equivalent to [*line*.curve](./line.md#line_curve). Note that [curveMonotoneX](../d3-shape/curve.md#curveMonotoneX) or [curveMonotoneY](../d3-shape/curve.md#curveMonotoneY) are not recommended for radial lines because they assume that the data is monotonic in *x* or *y*, which is typically untrue of radial lines.

```js
const line = d3.lineRadial().curve(d3.curveBasis);
```

## *lineRadial*.context(*context*) {#lineRadial_context}

[Source](https://github.com/d3/d3-shape/blob/main/src/lineRadial.js) · Equivalent to [*line*.context](./line.md#line_context).

```js
const context = canvas.getContext("2d");
const line = d3.lineRadial().context(context);
```

# docs/d3-shape/radial-link.md

# Radial links

A radial link generator is like the Cartesian [link generator](./link.md) except the [x](./link.md#link_x) and [y](./link.md#link_y) accessors are replaced with [angle](#linkRadial_angle) and [radius](#linkRadial_radius) accessors. Radial links are positioned relative to the origin; use a [transform](http://www.w3.org/TR/SVG/coords.html#TransformAttribute) to change the origin.

## linkRadial() {#linkRadial}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · Returns a new [link generator](./link.md#_link) with radial tangents. For example, to visualize [links](../d3-hierarchy/hierarchy.md#node_links) in a [tree diagram](../d3-hierarchy/tree.md) rooted in the center of the display, you might say:

```js
const link = d3.linkRadial()
    .angle((d) => d.x)
    .radius((d) => d.y);
```

## *linkRadial*.angle(*angle*) {#linkRadial_angle}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · Equivalent to [*link*.x](./link.md#link_x), except the accessor returns the angle in radians, with 0 at -*y* (12 o’clock).

## *linkRadial*.radius(*radius*) {#linkRadial_radius}

[Source](https://github.com/d3/d3-shape/blob/main/src/link.js) · Equivalent to [*link*.y](./link.md#link_y), except the accessor returns the radius: the distance from the origin.

# docs/d3-shape/stack.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {ref, shallowRef, onMounted} from "vue";
import PlotRender from "../components/PlotRender.js";

const riaa = shallowRef([]);

onMounted(() => {
  d3.csv("../data/riaa-us-revenue.csv", d3.autoType).then((data) => (riaa.value = data));
});

</script>

# Stacks

<!-- https://observablehq.com/@mbostock/streamgraph-transitions -->

[Examples](https://observablehq.com/@d3/stacked-bar-chart/2) · Stacking converts lengths into contiguous position intervals. For example, a bar chart of monthly sales might be broken down into a multi-series bar chart by category, stacking bars vertically and applying a categorical color encoding. Stacked charts can show overall value and per-category value simultaneously; however, it is typically harder to compare across categories as only the bottom layer of the stack is aligned. So, chose the [stack order](#stack_order) carefully, and consider a [streamgraph](#stackOffsetWiggle). (See also [grouped charts](https://observablehq.com/@d3/grouped-bar-chart/2).)

Like the [pie generator](./pie.md), the stack generator does not produce a shape directly. Instead it computes positions which you can then pass to an [area generator](./area.md) or use directly, say to position bars.

## stack() {#stack}

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js) · Constructs a new stack generator with the default settings. See [*stack*](#_stack) for usage.

## *stack*(*data*, ...*arguments*) {#_stack}

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js) · Generates a stack for the given array of *data* and returns an array representing each series. Any additional *arguments* are arbitrary; they are propagated to accessors along with the `this` object.

For example, consider this tidy table of monthly fruit sales:

date    | fruit    |   sales
--------|----------|--------:
 1/2015 | apples   |    3840
 1/2015 | bananas  |    1920
 1/2015 | cherries |     960
 1/2015 | durians  |     400
 2/2015 | apples   |    1600
 2/2015 | bananas  |    1440
 2/2015 | cherries |     960
 2/2015 | durians  |     400
 3/2015 | apples   |     640
 3/2015 | bananas  |     960
 3/2015 | cherries |     640
 3/2015 | durians  |     400
 4/2015 | apples   |     320
 4/2015 | bananas  |     480
 4/2015 | cherries |     640
 4/2015 | durians  |     400

This could be represented in JavaScript as an array of objects, perhaps parsed from [CSV](../d3-dsv.md):

```js
const data = [
  {date: new Date("2015-01-01"), fruit: "apples", sales: 3840},
  {date: new Date("2015-01-01"), fruit: "bananas", sales: 1920},
  {date: new Date("2015-01-01"), fruit: "cherries", sales: 960},
  {date: new Date("2015-01-01"), fruit: "durians", sales: 400},
  {date: new Date("2015-02-01"), fruit: "apples", sales: 1600},
  {date: new Date("2015-02-01"), fruit: "bananas", sales: 1440},
  {date: new Date("2015-02-01"), fruit: "cherries", sales: 960},
  {date: new Date("2015-02-01"), fruit: "durians", sales: 400},
  {date: new Date("2015-03-01"), fruit: "apples", sales: 640},
  {date: new Date("2015-03-01"), fruit: "bananas", sales: 960},
  {date: new Date("2015-03-01"), fruit: "cherries", sales: 640},
  {date: new Date("2015-03-01"), fruit: "durians", sales: 400},
  {date: new Date("2015-04-01"), fruit: "apples", sales: 320},
  {date: new Date("2015-04-01"), fruit: "bananas", sales: 480},
  {date: new Date("2015-04-01"), fruit: "cherries", sales: 640},
  {date: new Date("2015-04-01"), fruit: "durians", sales: 400}
];
```

To compute the stacked series (a series, or layer, for each *fruit*; and a stack, or column, for each *date*), we can [index](../d3-array/group.md#index) the data by *date* and then *fruit*, compute the distinct *fruit* names across the data set, and lastly get the *sales* value for each *date* and *fruit*.

```js
const series = d3.stack()
    .keys(d3.union(data.map(d => d.fruit))) // apples, bananas, cherries, …
    .value(([, group], key) => group.get(key).sales)
  (d3.index(data, d => d.date, d => d.fruit));
```

:::tip
See [union](../d3-array/sets.md#union) and [index](../d3-array/group.md#index) from d3-array.
:::

The resulting array has one element per *series*. Each series has one point per month, and each point has a lower and upper value defining the baseline and topline:

```js
[
  [[   0, 3840], [   0, 1600], [   0,  640], [   0,  320]], // apples
  [[3840, 5760], [1600, 3040], [ 640, 1600], [ 320,  800]], // bananas
  [[5760, 6720], [3040, 4000], [1600, 2240], [ 800, 1440]], // cherries
  [[6720, 7120], [4000, 4400], [2240, 2640], [1440, 1840]]  // durians
]
```

Each series in then typically passed to an [area generator](./area.md) to render an area chart, or used to construct rectangles for a bar chart.

```js
svg.append("g")
  .selectAll("g")
  .data(series)
  .join("g")
    .attr("fill", d => color(d.key))
  .selectAll("rect")
  .data(D => D)
  .join("rect")
    .attr("x", d => x(d.data[0]))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth());
```

The series are determined by the [keys accessor](#stack_keys); each series *i* in the returned array corresponds to the *i*th key. Each series is an array of points, where each point *j* corresponds to the *j*th element in the input *data*. Lastly, each point is represented as an array [*y0*, *y1*] where *y0* is the lower value (baseline) and *y1* is the upper value (topline); the difference between *y0* and *y1* corresponds to the computed [value](#stack_value) for this point. The key for each series is available as *series*.key, and the [index](#stack_order) as *series*.index. The input data element for each point is available as *point*.data.

## *stack*.keys(*keys*) {#stack_keys}

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js) · If *keys* is specified, sets the keys accessor to the specified function or array and returns this stack generator.

```js
const stack = d3.stack().keys(["apples", "bananas", "cherries", "durians"]);
```

If *keys* is not specified, returns the current keys accessor.

```js
stack.keys() // () => ["apples", "bananas", "cherries", "durians"]
```

The keys accessor defaults to the empty array. A series (layer) is [generated](#_stack) for each key. Keys are typically strings, but they may be arbitrary values; see [InternMap](../d3-array/intern.md). The series’ key is passed to the [value accessor](#stack_value), along with each data point, to compute the point’s value.

## *stack*.value(*value*) {#stack_value}

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js) · If *value* is specified, sets the value accessor to the specified function or number and returns this stack generator.

```js
const stack = d3.stack().value((d, key) => d[key]);
```

If *value* is not specified, returns the current value accessor.

```js
stack.value() // (d, key) => d[key]
```

The value accessor defaults to:

```js
function value(d, key) {
  return d[key];
}
```

:::warning CAUTION
The default value accessor assumes that the input data is an array of objects exposing named properties with numeric values. This is a “wide” rather than “tidy” representation of data and is no longer recommended. See [*stack*](#_stack) for an example using tidy data.
:::

## *stack*.order(*order*) {#stack_order}

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js) · If *order* is specified, sets the order accessor to the specified function or array and returns this stack generator.

```js
const stack = d3.stack().order(d3.stackOrderNone);
```

If *order* is a function, it is passed the generated series array and must return an array of numeric indexes representing the stack order. For example, to use reverse key order:

```js
const stack = d3.stack().order(series => d3.range(series.length).reverse());
```

The stack order is computed prior to the [offset](#stack_offset); thus, the lower value for all points is zero at the time the order is computed. The index attribute for each series is also not set until after the order is computed.

If *order* is not specified, returns the current order accessor.

```js
stack.order() // d3.stackOrderNone
```

The order accessor defaults to [stackOrderNone](#stackOrderNone); this uses the order given by the [key accessor](#stack_keys). See [stack orders](#stack-orders) for the built-in orders.

## *stack*.offset(*offset*) {#stack_offset}

[Source](https://github.com/d3/d3-shape/blob/main/src/stack.js) · If *offset* is specified, sets the offset accessor to the specified function and returns this stack generator.

```js
const stack = d3.stack().offset(d3.stackOffsetExpand);
```

The offset function is passed the generated series array and the order index array; it is then responsible for updating the lower and upper values in the series array. See the built-in offsets for a reference implementation.

If *offset* is not specified, returns the current offset acccesor.

```js
stack.offset() // d3.stackOffsetExpand
```

The offset accessor defaults to [stackOffsetNone](#stackOffsetNone); this uses a zero baseline. See [stack offsets](#stack-offsets) for the built-in offsets.

## Stack orders

Stack orders are typically not used directly, but are instead passed to [*stack*.order](#stack_order).

### stackOrderAppearance(*series*) {#stackOrderAppearance}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1000 // convert millions to billions
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", order: "appearance"}),
    Plot.ruleY([0])
  ]
}' />

```js
const stack = d3.stack().order(d3.stackOrderAppearance);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/order/appearance.js) · Returns a series order such that the earliest series (according to the maximum value) is at the bottom.

### stackOrderAscending(*series*) {#stackOrderAscending}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1000 // convert millions to billions
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", order: "sum"}),
    Plot.ruleY([0])
  ]
}' />

```js
const stack = d3.stack().order(d3.stackOrderAscending);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/order/ascending.js) · Returns a series order such that the smallest series (according to the sum of values) is at the bottom.

### stackOrderDescending(*series*) {#stackOrderDescending}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1000 // convert millions to billions
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", order: "-sum"}),
    Plot.ruleY([0])
  ]
}' />

```js
const stack = d3.stack().order(d3.stackOrderDescending);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/order/descending.js) · Returns a series order such that the largest series (according to the sum of values) is at the bottom.

### stackOrderInsideOut(*series*) {#stackOrderInsideOut}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1000 // convert millions to billions
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", offset: "wiggle", order: "inside-out"}),
  ]
}' />

```js
const stack = d3.stack().order(d3.stackOrderInsideOut);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/order/insideOut.js) · Returns a series order such that the earliest series (according to the maximum value) are on the inside and the later series are on the outside. This order is recommended for streamgraphs in conjunction with the [wiggle offset](#stackOffsetWiggle). See [Stacked Graphs — Geometry & Aesthetics](http://leebyron.com/streamgraph/) by Byron & Wattenberg for more information.

### stackOrderNone(*series*) {#stackOrderNone}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1000 // convert millions to billions
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", order: null}),
    Plot.ruleY([0])
  ]
}' />

```js
const stack = d3.stack().order(d3.stackOrderNone);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/order/none.js) · Returns the given series order [0, 1, … *n* - 1] where *n* is the number of elements in *series*. Thus, the stack order is given by the [key accessor](#stack_keys).

### stackOrderReverse(*series*) {#stackOrderReverse}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1000 // convert millions to billions
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", order: null, reverse: true}),
    Plot.ruleY([0])
  ]
}' />

```js
const stack = d3.stack().order(d3.stackOrderReverse);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/order/reverse.js) · Returns the reverse of the given series order [*n* - 1, *n* - 2, … 0] where *n* is the number of elements in *series*. Thus, the stack order is given by the reverse of the [key accessor](#stack_keys).

## Stack offsets

Stack offsets are typically not used directly, but are instead passed to [*stack*.offset](#stack_offset).

### stackOffsetExpand(*series*, *order*) {#stackOffsetExpand}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (%)",
    percent: true
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", offset: "expand", order: "-appearance"}),
    Plot.ruleY([0])
  ]
}' />

```js
const stack = d3.stack().offset(d3.stackOffsetExpand);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/expand.js) · Applies a zero baseline and normalizes the values for each point such that the topline is always one.

### stackOffsetDiverging(*series*, *order*) {#stackOffsetDiverging}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1e3
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: (d) => (d.group === "Disc" ? -1 : 1) * d.revenue, z: "format", fill: "group", order: "appearance"}),
    Plot.ruleY([0])
  ]
}' />

```js
const stack = d3.stack().offset(d3.stackOffsetDiverging);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/diverging.js) · Positive values are stacked above zero, negative values are [stacked below zero](https://observablehq.com/@d3/diverging-stacked-bar-chart/2), and zero values are stacked at zero.

### stackOffsetNone(*series*, *order*) {#stackOffsetNone}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1e3
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", order: "appearance"}),
    Plot.ruleY([0])
  ]
}' />

```js
const stack = d3.stack().offset(d3.stackOffsetNone);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/none.js) · Applies a zero baseline.

### stackOffsetSilhouette(*series*, *order*) {#stackOffsetSilhouette}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1e3
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", offset: "center", order: "appearance"})
  ]
}' />

```js
const stack = d3.stack().offset(d3.stackOffsetSilhouette);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/silhouette.js) · Shifts the baseline down such that the center of the streamgraph is always at zero.

### stackOffsetWiggle(*series*, *order*) {#stackOffsetWiggle}

<PlotRender defer :options='{
  height: 200,
  y: {
    grid: true,
    label: "Annual revenue (billions)",
    transform: (d) => d / 1e3
  },
  marks: [
    Plot.areaY(riaa, {x: "year", y: "revenue", z: "format", fill: "group", offset: "wiggle"})
  ]
}' />

```js
const stack = d3.stack().offset(d3.stackOffsetWiggle);
```

[Source](https://github.com/d3/d3-shape/blob/main/src/offset/wiggle.js) · Shifts the baseline so as to minimize the weighted wiggle of layers. This offset is recommended for streamgraphs in conjunction with the [inside-out order](#stackOrderInsideOut). See [Stacked Graphs — Geometry & Aesthetics](http://leebyron.com/streamgraph/) by Bryon & Wattenberg for more information.

# docs/d3-shape/symbol.md

<script setup>

import * as Plot from "@observablehq/plot";
import PlotRender from "../components/PlotRender.js";

</script>

# Symbols

[Examples](https://observablehq.com/@d3/fitted-symbols) · Symbols provide a categorical shape encoding as in a scatterplot. Symbols are centered at the origin; use a [transform](http://www.w3.org/TR/SVG/coords.html#TransformAttribute) to move the symbol to a different position.

## symbol(*type*, *size*) {#symbol}

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js) · Constructs a new symbol generator of the specified [type](#symbol_type) and [size](#symbol_size). If not specified, *type* defaults to a circle, and *size* defaults to 64.

```js
svg.append("path").attr("d", d3.symbol(d3.symbolCross));
```

## *symbol*(...*arguments*) {#_symbol}

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js) · Generates a symbol for the given *arguments*. The *arguments* are arbitrary; they are propagated to the symbol generator’s accessor functions along with the `this` object. With the default settings, invoking the symbol generator produces a circle of 64 square pixels.

```js
d3.symbol()() // "M4.514,0A4.514,4.514,0,1,1,-4.514,0A4.514,4.514,0,1,1,4.514,0"
```


If the symbol generator has a [context](#symbol_context), then the symbol is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls and this function returns void. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string is returned.

## *symbol*.type(*type*) {#symbol_type}

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js) · If *type* is specified, sets the symbol type to the specified function or symbol type and returns this symbol generator.

```js
const symbol = d3.symbol().type(d3.symbolCross);
```

If *type* is a function, the symbol generator’s arguments and *this* are passed through. This is convenient for use with [*selection*.attr](../d3-selection/modifying.md#selection_attr), say in conjunction with an [ordinal scale](../d3-scale/ordinal.md) to produce a categorical symbol encoding.

```js
const symbolType = d3.scaleOrdinal(d3.symbolsFill);
const symbol = d3.symbol().type((d) => symbolType(d.category));
```

If *type* is not specified, returns the current symbol type accessor.

```js
symbol.type() // () => d3.symbolCross
```

The symbol type accessor defaults to:

```js
function type() {
  return circle;
}
```

See [symbolsFill](#symbolsFill) and [symbolsStroke](#symbolsStroke) for built-in symbol types. To implement a custom symbol type, pass an object that implements [*symbolType*.draw](#symbolType_draw).

## *symbol*.size(*size*) {#symbol_size}

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js) · If *size* is specified, sets the size to the specified function or number and returns this symbol generator.

```js
const symbol = d3.symbol().size(100);
```

If *size* is a function, the symbol generator’s arguments and *this* are passed through. This is convenient for use with [*selection*.attr](../d3-selection/modifying.md#selection_attr), say in conjunction with a [linear scale](../d3-scale/linear.md) to produce a quantitative size encoding.

```js
const symbolSize = d3.scaleLinear([0, 100]);
const symbol = d3.symbol().size((d) => symbolSize(d.value));
```

If *size* is not specified, returns the current size accessor.

```js
symbol.size() // () => 100
```

The size accessor defaults to:

```js
function size() {
  return 64;
}
```

## *symbol*.context(*context*) {#symbol_context}

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js) · If *context* is specified, sets the context and returns this symbol generator.

```js
const context = canvas.getContext("2d");
const symbol = d3.symbol().context(context);
```

If *context* is not specified, returns the current context.

```js
symbol.context() // context
```

The context defaults to null. If the context is not null, then the [generated symbol](#_symbol) is rendered to this context as a sequence of [path method](http://www.w3.org/TR/2dcontext/#canvaspathmethods) calls. Otherwise, a [path data](http://www.w3.org/TR/SVG/paths.html#PathData) string representing the generated symbol is returned.

## *symbol*.digits(*digits*) {#symbol_digits}

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js) · If *digits* is specified, sets the maximum number of digits after the decimal separator and returns this symbol generator.

```js
const symbol = d3.symbol().digits(3);
```

If *digits* is not specified, returns the current maximum fraction digits, which defaults to 3.

```js
symbol.digits() // 3
```

This option only applies when the associated [*context*](#symbol_context) is null, as when this symbol generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

## symbolsFill {#symbolsFill}

<PlotRender :options='{
  marks: [
    Plot.dotX(["circle", "cross", "diamond", "square", "star", "triangle", "wye"], {fill: "currentColor", symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js) · An array containing a set of symbol types designed for filling: [circle](#symbolCircle), [cross](#symbolCross), [diamond](#symbolDiamond), [square](#symbolSquare), [star](#symbolStar), [triangle](#symbolTriangle), and [wye](#symbolWye). Useful for a categorical shape encoding with an [ordinal scale](../d3-scale/ordinal.md).

```js
const symbolType = d3.scaleOrdinal(d3.symbolsFill);
```

## symbolsStroke {#symbolsStroke}

<PlotRender :options='{
  marks: [
    Plot.dotX(["circle", "plus", "times", "triangle2", "asterisk", "square2", "diamond2"], {stroke: "currentColor", symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol.js) · An array containing a set of symbol types designed for stroking: [circle](#symbolCircle), [plus](#symbolPlus), [times](#symbolTimes), [triangle2](#symbolTriangle2), [asterisk](#symbolAsterisk), [square2](#symbolSquare2), and [diamond2](#symbolDiamond2). Useful for a categorical shape encoding with an [ordinal scale](../d3-scale/ordinal.md).

```js
const symbolType = d3.scaleOrdinal(d3.symbolsStroke);
```

## symbolAsterisk {#symbolAsterisk}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["asterisk"], {stroke: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/asterisk.js) · The asterisk symbol type; intended for stroking.

## symbolCircle {#symbolCircle}

<PlotRender :options='{
  width: 80,
  height: 40,
  axis: null,
  x: {type: "band"},
  marks: [
    Plot.dotX(["circle"], {x: 0, stroke: "currentColor", r: 12, symbol: Plot.identity}),
    Plot.dotX(["circle"], {x: 1, fill: "currentColor", r: 12, symbol: Plot.identity}),
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/circle.js) · The circle symbol type; intended for either filling or stroking.

## symbolCross {#symbolCross}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["cross"], {fill: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/cross.js) · The Greek cross symbol type, with arms of equal length; intended for filling.

## symbolDiamond {#symbolDiamond}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["diamond"], {fill: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/diamond.js) · The rhombus symbol type; intended for filling.

## symbolDiamond2 {#symbolDiamond2}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["diamond2"], {stroke: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/diamond.js) · The rotated square symbol type; intended for stroking.

## symbolPlus {#symbolPlus}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["plus"], {stroke: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/plus.js) · The plus symbol type; intended for stroking.

## symbolSquare {#symbolSquare}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["square"], {fill: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/square.js) · The square symbol type; intended for filling.

## symbolSquare2 {#symbolSquare2}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["square2"], {stroke: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/square2.js) · The square2 symbol type; intended for stroking.

## symbolStar {#symbolStar}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["star"], {fill: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/star.js) · The pentagonal star (pentagram) symbol type; intended for filling.

## symbolTriangle {#symbolTriangle}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["triangle"], {fill: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/triangle.js) · The up-pointing triangle symbol type; intended for filling.

## symbolTriangle2 {#symbolTriangle2}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["triangle2"], {stroke: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/triangle2.js) · The up-pointing triangle symbol type; intended for stroking.

## symbolWye {#symbolWye}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["wye"], {fill: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/wye.js) · The Y-shape symbol type; intended for filling.

## symbolTimes {#symbolTimes}

<PlotRender :options='{
  width: 40,
  height: 40,
  axis: null,
  marks: [
    Plot.dotX(["times"], {stroke: "currentColor", r: 12, symbol: Plot.identity})
  ]
}' />

[Source](https://github.com/d3/d3-shape/blob/main/src/symbol/times.js) · The X-shape symbol type; intended for stroking.

## Custom symbols

Symbol types are typically not used directly, instead being passed to [*symbol*.type](#symbol_type). However, you can define your own symbol type implementation should none of the built-in types satisfy your needs using the following interface. You can also use this low-level interface with a built-in symbol type as an alternative to the symbol generator.

```js
const path = d3.pathRound(3);
const circle = d3.symbolCircle.draw(path, 64);
path.toString(); // "M4.514,0A4.514,4.514,0,1,1,-4.514,0A4.514,4.514,0,1,1,4.514,0"
```

### *symbolType*.draw(*context*, *size*) {#symbolType_draw}

Renders this symbol type to the specified *context* with the specified *size* in square pixels. The *context* implements the [CanvasPathMethods](http://www.w3.org/TR/2dcontext/#canvaspathmethods) interface. (Note that this is a subset of the CanvasRenderingContext2D interface!) See also [d3-path](../d3-path.md).

## pointRadial(*angle*, *radius*) {#pointRadial}

[Examples](https://observablehq.com/@d3/radial-area-chart) · [Source](https://github.com/d3/d3-shape/blob/main/src/pointRadial.js) · Returns the point [<i>x</i>, <i>y</i>] for the given *angle* in radians, with 0 at -*y* (12 o’clock) and positive angles proceeding clockwise, and the given *radius*.

```js
d3.pointRadial(Math.PI / 3, 100) // [86.60254037844386, -50]
```

# docs/d3-time-format.md

# d3-time-format

This module provides an approximate JavaScript implementation of the venerable [strptime](http://pubs.opengroup.org/onlinepubs/009695399/functions/strptime.html) and [strftime](http://pubs.opengroup.org/onlinepubs/007908799/xsh/strftime.html) functions from the C standard library, and can be used to parse or format [dates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) in a variety of locale-specific representations. To format a date, create a [formatter](#locale_format) from a specifier (a string with the desired format *directives*, indicated by `%`); then pass a date to the formatter, which returns a string. For example, to convert the current date to a human-readable string:

```js
const formatTime = d3.utcFormat("%B %d, %Y");
formatTime(new Date()); // "May 31, 2023"
```

Likewise, to convert a string back to a date, create a [parser](#locale_parse):

```js
const parseTime = d3.utcParse("%B %d, %Y");
parseTime("June 30, 2015"); // 2023-05-31
```

You can implement more elaborate conditional time formats, too. For example, here’s a multi-scale time format using [time intervals](./d3-time.md):

```js
const formatMillisecond = d3.utcFormat(".%L"),
    formatSecond = d3.utcFormat(":%S"),
    formatMinute = d3.utcFormat("%I:%M"),
    formatHour = d3.utcFormat("%I %p"),
    formatDay = d3.utcFormat("%a %d"),
    formatWeek = d3.utcFormat("%b %d"),
    formatMonth = d3.utcFormat("%B"),
    formatYear = d3.utcFormat("%Y");

function multiFormat(date) {
  return (d3.utcSecond(date) < date ? formatMillisecond
      : d3.utcMinute(date) < date ? formatSecond
      : d3.utcHour(date) < date ? formatMinute
      : d3.utcDay(date) < date ? formatHour
      : d3.utcMonth(date) < date ? (d3.utcWeek(date) < date ? formatDay : formatWeek)
      : d3.utcYear(date) < date ? formatMonth
      : formatYear)(date);
}
```

This module is used by D3 [time scales](./d3-scale/time.md) to generate human-readable ticks.

Also see [*date*.toLocaleString](https://observablehq.com/@mbostock/date-formatting).

## timeFormat(*specifier*) {#timeFormat}

```js
d3.timeFormat("%b %d")
```

An alias for [*locale*.format](#locale_format) on the [default locale](#timeFormatDefaultLocale).

## timeParse(*specifier*) {#timeParse}

```js
d3.timeParse("%b %d")
```

An alias for [*locale*.parse](#locale_parse) on the [default locale](#timeFormatDefaultLocale).

## utcFormat(*specifier*) {#utcFormat}

```js
d3.utcFormat("%b %d")
```

An alias for [*locale*.utcFormat](#locale_utcFormat) on the [default locale](#timeFormatDefaultLocale).

## utcParse(*specifier*) {#utcParse}

```js
d3.utcParse("%b %d")
```

An alias for [*locale*.utcParse](#locale_utcParse) on the [default locale](#timeFormatDefaultLocale).

## isoFormat {#isoFormat}

```js
d3.isoFormat(new Date()) // "2023-05-31T18:17:36.788Z"
```

[Source](https://github.com/d3/d3-time-format/blob/main/src/isoFormat.js) · The full [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC time formatter. Where available, this method will use [Date.toISOString](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toISOString) to format.

## isoParse {#isoParse}

```js
d3.isoParse("2023-05-31T18:17:36.788Z")
```

[Source](https://github.com/d3/d3-time-format/blob/main/src/isoParse.js) · The full [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC time parser. Where available, this method will use the [Date constructor](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date) to parse strings. If you depend on strict validation of the input format according to ISO 8601, you should construct a [UTC parser function](#utcParse):

```js
const strictIsoParse = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");
```

## *locale*.format(*specifier*) {#locale_format}

```js
d3.timeFormat("%b %d")
```

[Source](https://github.com/d3/d3-time-format/blob/main/src/locale.js) · Returns a new formatter for the given string *specifier*. The specifier string may contain the following directives:

* `%a` - abbreviated weekday name.*
* `%A` - full weekday name.*
* `%b` - abbreviated month name.*
* `%B` - full month name.*
* `%c` - the locale’s date and time, such as `%x, %X`.*
* `%d` - zero-padded day of the month as a decimal number [01,31].
* `%e` - space-padded day of the month as a decimal number [ 1,31]; equivalent to `%_d`.
* `%f` - microseconds as a decimal number [000000, 999999].
* `%g` - ISO 8601 week-based year without century as a decimal number [00,99].
* `%G` - ISO 8601 week-based year with century as a decimal number.
* `%H` - hour (24-hour clock) as a decimal number [00,23].
* `%I` - hour (12-hour clock) as a decimal number [01,12].
* `%j` - day of the year as a decimal number [001,366].
* `%m` - month as a decimal number [01,12].
* `%M` - minute as a decimal number [00,59].
* `%L` - milliseconds as a decimal number [000, 999].
* `%p` - either AM or PM.*
* `%q` - quarter of the year as a decimal number [1,4].
* `%Q` - milliseconds since UNIX epoch.
* `%s` - seconds since UNIX epoch.
* `%S` - second as a decimal number [00,61].
* `%u` - Monday-based (ISO 8601) weekday as a decimal number [1,7].
* `%U` - Sunday-based week of the year as a decimal number [00,53].
* `%V` - ISO 8601 week of the year as a decimal number [01, 53].
* `%w` - Sunday-based weekday as a decimal number [0,6].
* `%W` - Monday-based week of the year as a decimal number [00,53].
* `%x` - the locale’s date, such as `%-m/%-d/%Y`.*
* `%X` - the locale’s time, such as `%-I:%M:%S %p`.*
* `%y` - year without century as a decimal number [00,99].
* `%Y` - year with century as a decimal number, such as `1999`.
* `%Z` - time zone offset, such as `-0700`, `-07:00`, `-07`, or `Z`.
* `%%` - a literal percent sign (`%`).

Directives marked with an asterisk (\*) may be affected by the [locale definition](#timeFormatLocale).

For `%U`, all days in a new year preceding the first Sunday are considered to be in week 0. For `%W`, all days in a new year preceding the first Monday are considered to be in week 0. Week numbers are computed using [*interval*.count](./d3-time.md#interval_count). For example, 2015-52 and 2016-00 represent Monday, December 28, 2015, while 2015-53 and 2016-01 represent Monday, January 4, 2016. This differs from the [ISO week date](https://en.wikipedia.org/wiki/ISO_week_date) specification (`%V`), which uses a more complicated definition!

For `%V`,`%g` and `%G`, per the [strftime man page](http://man7.org/linux/man-pages/man3/strftime.3.html):

> In this system, weeks start on a Monday, and are numbered from 01, for the first week, up to 52 or 53, for the last week.  Week 1 is the first week where four or more days fall within the new year (or, synonymously, week 01 is: the first week of the year that contains a Thursday; or, the week that has 4 January in it). If the ISO week number belongs to the previous or next year, that year is used instead.

The `%` sign indicating a directive may be immediately followed by a padding modifier:

* `0` - zero-padding
* `_` - space-padding
* `-` - disable padding

If no padding modifier is specified, the default is `0` for all directives except `%e`, which defaults to `_`. (In some implementations of strftime and strptime, a directive may include an optional field width or precision; this feature is not yet implemented.)

The returned function formats a specified *[date](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date)*, returning the corresponding string.

```js
const formatMonth = d3.timeFormat("%B"),
    formatDay = d3.timeFormat("%A"),
    date = new Date(2014, 4, 1); // Thu May 01 2014 00:00:00 GMT-0700 (PDT)

formatMonth(date); // "May"
formatDay(date); // "Thursday"
```

## *locale*.parse(*specifier*) {#locale_parse}

```js
d3.timeParse("%b %d")
```

[Source](https://github.com/d3/d3-time-format/blob/main/src/locale.js) · Returns a new parser for the given string *specifier*. The specifier string may contain the same directives as [*locale*.format](#locale_format). The `%d` and `%e` directives are considered equivalent for parsing.

The returned function parses a specified *string*, returning the corresponding [date](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date) or null if the string could not be parsed according to this format’s specifier. Parsing is strict: if the specified <i>string</i> does not exactly match the associated specifier, this method returns null. For example, if the associated specifier is `%Y-%m-%dT%H:%M:%SZ`, then the string `"2011-07-01T19:15:28Z"` will be parsed as expected, but `"2011-07-01T19:15:28"`, `"2011-07-01 19:15:28"` and `"2011-07-01"` will return null. (Note that the literal `Z` here is different from the time zone offset directive `%Z`.) If a more flexible parser is desired, try multiple formats sequentially until one returns non-null.

## *locale*.utcFormat(*specifier*) {#locale_utcFormat}

```js
d3.utcFormat("%b %d")
```

[Source](https://github.com/d3/d3-time-format/blob/main/src/locale.js) · Equivalent to [*locale*.format](#locale_format), except all directives are interpreted as [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) rather than local time.

## *locale*.utcParse(*specifier*) {#locale_utcParse}

```js
d3.utcParse("%b %d")
```

[Source](https://github.com/d3/d3-time-format/blob/main/src/locale.js) · Equivalent to [*locale*.parse](#locale_parse), except all directives are interpreted as [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) rather than local time.

## timeFormatLocale(*definition*) {#timeFormatLocale}

```js
const enUs = d3.timeFormatLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
```

[Source](https://github.com/d3/d3-time-format/blob/main/src/locale.js) · Returns a *locale* object for the specified *definition* with [*locale*.format](#locale_format), [*locale*.parse](#locale_parse), [*locale*.utcFormat](#locale_utcFormat), [*locale*.utcParse](#locale_utcParse) methods. The *definition* must include the following properties:

* `dateTime` - the date and time (`%c`) format specifier (<i>e.g.</i>, `"%a %b %e %X %Y"`).
* `date` - the date (`%x`) format specifier (<i>e.g.</i>, `"%m/%d/%Y"`).
* `time` - the time (`%X`) format specifier (<i>e.g.</i>, `"%H:%M:%S"`).
* `periods` - the A.M. and P.M. equivalents (<i>e.g.</i>, `["AM", "PM"]`).
* `days` - the full names of the weekdays, starting with Sunday.
* `shortDays` - the abbreviated names of the weekdays, starting with Sunday.
* `months` - the full names of the months (starting with January).
* `shortMonths` - the abbreviated names of the months (starting with January).

## timeFormatDefaultLocale(*definition*) {#timeFormatDefaultLocale}

```js
const enUs = d3.timeFormatDefaultLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
```

[Source](https://github.com/d3/d3-time-format/blob/main/src/defaultLocale.js) · Equivalent to [d3.timeFormatLocale](#timeFormatLocale), except it also redefines [d3.timeFormat](#timeFormat), [d3.timeParse](#timeParse), [d3.utcFormat](#utcFormat) and [d3.utcParse](#utcParse) to the new locale’s [*locale*.format](#locale_format), [*locale*.parse](#locale_parse), [*locale*.utcFormat](#locale_utcFormat) and [*locale*.utcParse](#locale_utcParse). If you do not set a default locale, it defaults to [U.S. English](https://github.com/d3/d3-time-format/blob/main/locale/en-US.json).

# docs/d3-time.md

# d3-time

When visualizing time series data, analyzing temporal patterns, or working with time in general, the irregularities of conventional time units quickly become apparent. In the [Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar), for example, most months have 31 days but some have 28, 29 or 30; most years have 365 days but [leap years](https://en.wikipedia.org/wiki/Leap_year) have 366; and with [daylight saving](https://en.wikipedia.org/wiki/Daylight_saving_time), most days have 24 hours but some have 23 or 25. Adding to complexity, daylight saving conventions vary around the world.

As a result of these temporal peculiarities, it can be difficult to perform seemingly-trivial tasks. For example, if you want to compute the number of days that have passed between two dates, you can’t simply subtract and divide by 24 hours (86,400,000 ms):

```js
const start = new Date(2015, 02, 01); // 2015-03-01T00:00
const end = new Date(2015, 03, 01); // 2015-04-01T00:00
const days = (end - start) / 864e5; // 30.958333333333332, oops! 🤯
```

You can, however, use [d3.timeDay](#timeDay).[count](#interval_count):

```js
d3.timeDay.count(start, end) // 31 😌
```

The [day](#timeDay) [interval](#timeInterval) is one of several provided by d3-time. Each interval represents a conventional unit of time — [hours](#timeHour), [weeks](#timeWeek), [months](#timeMonth), *etc.* — and has methods to calculate boundary dates. For example, [d3.timeDay](#timeDay) computes midnight (typically 12:00 AM local time) of the corresponding day. In addition to [rounding](#interval_round) and [counting](#interval_count), intervals can also be used to generate arrays of boundary dates. For example, to compute each Sunday in the current month:

```js
const start = d3.timeMonth.floor(new Date(2015, 0, 15)); // 2015-01-01T00:00
const stop = d3.timeMonth.ceil(new Date(2015, 0, 15)); // 2015-02-01T00:00
const weeks = d3.timeWeek.range(start, stop); // [2015-01-04T00:00, 2015-01-11T00:00, 2015-01-18T00:00, 2015-01-25T00:00]
```

The d3-time module does not implement its own calendaring system; it merely implements a convenient API for calendar math on top of ECMAScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). Thus, it ignores leap seconds and can only work with the local time zone and [Coordinated Universal Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) (UTC).

This module is used by D3’s time scales to generate sensible ticks, by D3’s time format, and can also be used directly to do things like [calendar layouts](https://observablehq.com/@d3/calendar/2).

## *interval*(*date*) {#_interval}

```js
d3.utcMonday() // the latest preceding Monday, UTC time
```

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Equivalent to [*interval*.floor](#interval_floor), except if *date* is not specified, it defaults to the current time. For example, [d3.timeYear](#timeYear)(*date*) and d3.timeYear.floor(*date*) are equivalent.

## *interval*.floor(*date*) {#interval_floor}

```js
d3.utcMonday.floor(new Date()) // the latest preceding Monday, UTC time
```

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Returns a new date representing the latest interval boundary date before or equal to *date*. For example, [d3.timeDay](#timeDay).floor(*date*) typically returns 12:00 AM local time on the given *date*.

This method is idempotent: if the specified *date* is already floored to the current interval, a new date with an identical time is returned. Furthermore, the returned date is the minimum expressible value of the associated interval, such that *interval*.floor(*interval*.floor(*date*) - 1) returns the preceding interval boundary date.

Note that the `==` and `===` operators do not compare by value with [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects, and thus you cannot use them to tell whether the specified *date* has already been floored. Instead, coerce to a number and then compare:

```js
// Returns true if the specified date is a day boundary.
function isDay(date) {
  return +d3.timeDay.floor(date) === +date;
}
```

This is more reliable than testing whether the time is 12:00 AM, as in some time zones midnight may not exist due to daylight saving.

## *interval*.round(*date*) {#interval_round}

```js
d3.utcMonday.round(new Date()) // the previous or following Monday, whichever is closer
```

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Returns a new date representing the closest interval boundary date to *date*. For example, [d3.timeDay](#timeDay).round(*date*) typically returns 12:00 AM local time on the given *date* if it is on or before noon, and 12:00 AM of the following day if it is after noon.

This method is idempotent: if the specified *date* is already rounded to the current interval, a new date with an identical time is returned.

## *interval*.ceil(*date*) {#interval_ceil}

```js
d3.utcMonday.ceil(new Date()) // the following Monday
```

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Returns a new date representing the earliest interval boundary date after or equal to *date*. For example, [d3.timeDay](#timeDay).ceil(*date*) typically returns 12:00 AM local time on the date following the given *date*.

This method is idempotent: if the specified *date* is already ceilinged to the current interval, a new date with an identical time is returned. Furthermore, the returned date is the maximum expressible value of the associated interval, such that *interval*.ceil(*interval*.ceil(*date*) + 1) returns the following interval boundary date.

## *interval*.offset(*date*, *step*) {#interval_offset}

```js
d3.utcDay.offset(new Date(), 1) // the same time tomorrow
```

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Returns a new date equal to *date* plus *step* intervals. If *step* is not specified it defaults to 1. If *step* is negative, then the returned date will be before the specified *date*; if *step* is zero, then a copy of the specified *date* is returned; if *step* is not an integer, it is [floored](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor). This method does not round the specified *date* to the interval. For example, if *date* is today at 5:34 PM, then [d3.timeDay](#timeDay).offset(*date*, 1) returns 5:34 PM tomorrow (even if daylight saving changes!).

## *interval*.range(*start*, *stop*, *step*) {#interval_range}

```js
d3.utcDay.range(new Date("2014-01-01"), new Date("2015-01-01")) // every day in 2014
```

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Returns an array of dates representing every interval boundary after or equal to *start* (inclusive) and before *stop* (exclusive). If *step* is specified, then every *step*th boundary will be returned; for example, for the [d3.timeDay](#timeDay) interval a *step* of 2 will return every other day. If *step* is not an integer, it is [floored](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor).

The first date in the returned array is the earliest boundary after or equal to *start*; subsequent dates are [offset](#interval_offset) by *step* intervals and [floored](#interval_floor). Thus, two overlapping ranges may be consistent. For example, this range contains odd days:

```js
d3.timeDay.range(new Date(2015, 0, 1), new Date(2015, 0, 7), 2) // [2015-01-01T00:00, 2015-01-03T00:00, 2015-01-05T00:00]
```

While this contains even days:

```js
d3.timeDay.range(new Date(2015, 0, 2), new Date(2015, 0, 8), 2) // [2015-01-02T00:00, 2015-01-04T00:00, 2015-01-06T00:00]
```

To make ranges consistent when a *step* is specified, use [*interval*.every](#interval_every) instead.

For convenience, aliases for *interval*.range are also provided as plural forms of the corresponding interval, such as [utcMondays](#utcMondays).

## *interval*.filter(*test*) {#interval_filter}

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Returns a new interval that is a filtered subset of this interval using the specified *test* function. The *test* function is passed a date and should return true if and only if the specified date should be considered part of the interval. For example, to create an interval that returns the 1st, 11th, 21th and 31th (if it exists) of each month:

```js
d3.timeDay.filter((d) => (d.getDate() - 1) % 10 === 0)
```

The returned filtered interval does not support [*interval*.count](#interval_count). See also [*interval*.every](#interval_every).

## *interval*.every(*step*) {#interval_every}

```js
d3.unixDay.every(3)
```

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Returns a [filtered](#interval_filter) view of this interval representing every *step*th date. The meaning of *step* is dependent on this interval’s parent interval as defined by the field function. For example, [d3.timeMinute](#timeMinute).every(15) returns an interval representing every fifteen minutes, starting on the hour: :00, :15, :30, :45, <i>etc.</i> Note that for some intervals, the resulting dates may not be uniformly-spaced; [d3.timeDay](#timeDay)’s parent interval is [d3.timeMonth](#timeMonth), and thus the interval number resets at the start of each month. If *step* is not valid, returns null. If *step* is one, returns this interval.

This method can be used in conjunction with [*interval*.range](#interval_range) to ensure that two overlapping ranges are consistent. For example, this range contains odd days:

```js
d3.timeDay.every(2).range(new Date(2015, 0, 1), new Date(2015, 0, 7)) // [2015-01-01T00:00, 2015-01-03T00:00, 2015-01-05T00:00]
```

As does this one:

```js
d3.timeDay.every(2).range(new Date(2015, 0, 2), new Date(2015, 0, 8)) // [2015-01-03T00:00, 2015-01-05T00:00, 2015-01-07T00:00]
```

The returned filtered interval does not support [*interval*.count](#interval_count). See also [*interval*.filter](#interval_filter).

## *interval*.count(*start*, *end*) {#interval_count}

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Returns the number of interval boundaries after *start* (exclusive) and before or equal to *end* (inclusive). Note that this behavior is slightly different than [*interval*.range](#interval_range) because its purpose is to return the zero-based number of the specified *end* date relative to the specified *start* date. For example, to compute the current zero-based day-of-year number:

```js
d3.timeDay.count(d3.timeYear(now), now) // 177
```

Likewise, to compute the current zero-based week-of-year number for weeks that start on Sunday:

```js
d3.timeSunday.count(d3.timeYear(now), now) // 25
```

## timeInterval(*floor*, *offset*, *count*, *field*) {#timeInterval}

```js
const utcDay = d3.timeInterval(
  (date) => date.setUTCHours(0, 0, 0, 0), // floor
  (date, step) => date.setUTCDate(date.getUTCDate() + step), // offset
  (start, end) => (end - start) / 864e5, // count
  (date) => date.getUTCDate() - 1 // field
);
```

[Source](https://github.com/d3/d3-time/blob/main/src/interval.js) · Constructs a new custom interval given the specified *floor* and *offset* functions and an optional *count* function.

The *floor* function takes a single date as an argument and rounds it down to the nearest interval boundary.

The *offset* function takes a date and an integer step as arguments and advances the specified date by the specified number of boundaries; the step may be positive, negative or zero.

The optional *count* function takes a start date and an end date, already floored to the current interval, and returns the number of boundaries between the start (exclusive) and end (inclusive). If a *count* function is not specified, the returned interval does not expose [*interval*.count](#interval_count) or [*interval*.every](#interval_every) methods. Note: due to an internal optimization, the specified *count* function must not invoke *interval*.count on other time intervals.

The optional *field* function takes a date, already floored to the current interval, and returns the field value of the specified date, corresponding to the number of boundaries between this date (exclusive) and the latest previous parent boundary. For example, for the [d3.timeDay](#timeDay) interval, this returns the number of days since the start of the month. If a *field* function is not specified, it defaults to counting the number of interval boundaries since the UNIX epoch of January 1, 1970 UTC. The *field* function defines the behavior of [*interval*.every](#interval_every).

## timeMillisecond {#timeMillisecond}

[Source](https://github.com/d3/d3-time/blob/main/src/millisecond.js) · Milliseconds in local time; the shortest available time unit.

## timeSecond {#timeSecond}

[Source](https://github.com/d3/d3-time/blob/main/src/second.js) · Seconds in local time (e.g., 01:23:45.0000 AM); 1,000 milliseconds.

## timeMinute {#timeMinute}

[Source](https://github.com/d3/d3-time/blob/main/src/minute.js) · Minutes in local time (e.g., 01:02:00 AM); 60 seconds. Note that ECMAScript [ignores leap seconds](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.1).

## timeHour {#timeHour}

[Source](https://github.com/d3/d3-time/blob/main/src/hour.js) · Hours in local time (e.g., 01:00 AM); 60 minutes. Note that advancing time by one hour in local time can return the same hour or skip an hour due to daylight saving.

## timeDay {#timeDay}

[Source](https://github.com/d3/d3-time/blob/main/src/day.js) · Days in local time (e.g., February 7, 2012 at 12:00 AM); typically 24 hours. Days in local time may range from 23 to 25 hours due to daylight saving. d3.unixDay is like [d3.utcDay](#timeDay), except it counts days since the UNIX epoch (January 1, 1970) such that *interval*.every returns uniformly-spaced dates rather than varying based on day-of-month.

## timeWeek {#timeWeek}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Alias for [d3.timeSunday](#timeSunday); 7 days and typically 168 hours. Weeks in local time may range from 167 to 169 hours due to daylight saving.

## timeSunday {#timeSunday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Sunday-based weeks in local time (e.g., February 5, 2012 at 12:00 AM).

## timeMonday {#timeMonday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Monday-based weeks in local time (e.g., February 6, 2012 at 12:00 AM).

## timeTuesday {#timeTuesday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Tuesday-based weeks in local time (e.g., February 7, 2012 at 12:00 AM).

## timeWednesday {#timeWednesday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Wednesday-based weeks in local time (e.g., February 8, 2012 at 12:00 AM).

## timeThursday {#timeThursday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Thursday-based weeks in local time (e.g., February 9, 2012 at 12:00 AM).

## timeFriday {#timeFriday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Friday-based weeks in local time (e.g., February 10, 2012 at 12:00 AM).

## timeSaturday {#timeSaturday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Saturday-based weeks in local time (e.g., February 11, 2012 at 12:00 AM).

## timeMonth {#timeMonth}

[Source](https://github.com/d3/d3-time/blob/main/src/month.js) · Months in local time (e.g., February 1, 2012 at 12:00 AM); ranges from 28 to 31 days.

## timeYear {#timeYear}

[Source](https://github.com/d3/d3-time/blob/main/src/year.js) · Years in local time (e.g., January 1, 2012 at 12:00 AM); ranges from 365 to 366 days.

## utcMillisecond {#utcMillisecond}

[Source](https://github.com/d3/d3-time/blob/main/src/millisecond.js) · Milliseconds in UTC time; the shortest available time unit.

## utcSecond {#utcSecond}

[Source](https://github.com/d3/d3-time/blob/main/src/second.js) · Seconds in UTC time (e.g., 01:23:45.0000 AM); 1,000 milliseconds.

## utcMinute {#utcMinute}

[Source](https://github.com/d3/d3-time/blob/main/src/minute.js) · Minutes in UTC time (e.g., 01:02:00 AM); 60 seconds. Note that ECMAScript [ignores leap seconds](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.1).

## utcHour {#utcHour}

[Source](https://github.com/d3/d3-time/blob/main/src/hour.js) · Hours in UTC time (e.g., 01:00 AM); 60 minutes.

## utcDay {#utcDay}

[Source](https://github.com/d3/d3-time/blob/main/src/day.js) · Days in UTC time (e.g., February 7, 2012 at 12:00 AM); 24 hours.

## utcWeek {#utcWeek}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Alias for [d3.timeSunday](#timeSunday); 7 days and 168 hours.

## utcSunday {#utcSunday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Sunday-based weeks in UTC time (e.g., February 5, 2012 at 12:00 AM).

## utcMonday {#utcMonday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Monday-based weeks in UTC time (e.g., February 6, 2012 at 12:00 AM).

## utcTuesday {#utcTuesday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Tuesday-based weeks in UTC time (e.g., February 7, 2012 at 12:00 AM).

## utcWednesday {#utcWednesday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Wednesday-based weeks in UTC time (e.g., February 8, 2012 at 12:00 AM).

## utcThursday {#utcThursday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Thursday-based weeks in UTC time (e.g., February 9, 2012 at 12:00 AM).

## utcFriday {#utcFriday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Friday-based weeks in UTC time (e.g., February 10, 2012 at 12:00 AM).

## utcSaturday {#utcSaturday}

[Source](https://github.com/d3/d3-time/blob/main/src/week.js) · Saturday-based weeks in UTC time (e.g., February 11, 2012 at 12:00 AM).

## utcMonth {#utcMonth}

[Source](https://github.com/d3/d3-time/blob/main/src/month.js) · Months in UTC time (e.g., February 1, 2012 at 12:00 AM); ranges from 28 to 31 days.

## utcYear {#utcYear}

[Source](https://github.com/d3/d3-time/blob/main/src/year.js) · Years in UTC time (e.g., January 1, 2012 at 12:00 AM); ranges from 365 to 366 days.

## unixDay {#unixDay}

Like [d3.utcDay](#utcDay), except it counts days since the UNIX epoch (January 1, 1970) such that [*interval*.every](#interval_every) returns uniformly-spaced dates rather than varying based on day-of-month.

## timeMilliseconds(*start*, *stop*, *step*) {#timeMilliseconds}

Alias for [d3.timeMillisecond](#timeMillisecond).[range](#interval_range).

## timeSeconds(*start*, *stop*, *step*) {#timeSeconds}

Alias for [d3.timeSecond](#timeSecond).[range](#interval_range).

## timeMinutes(*start*, *stop*, *step*) {#timeMinutes}

Alias for [d3.timeMinute](#timeMinute).[range](#interval_range).

## timeHours(*start*, *stop*, *step*) {#timeHours}

Alias for [d3.timeHour](#timeHour).[range](#interval_range).

## timeDays(*start*, *stop*, *step*) {#timeDays}

Alias for [d3.timeDay](#timeDay).[range](#interval_range).

## timeWeeks(*start*, *stop*, *step*) {#timeWeeks}

Alias for [d3.timeWeek](#timeWeek).[range](#interval_range).

## timeSundays(*start*, *stop*, *step*) {#timeSundays}

Alias for [d3.timeSunday](#timeSunday).[range](#interval_range).

## timeMondays(*start*, *stop*, *step*) {#timeMondays}

Alias for [d3.timeMonday](#timeMonday).[range](#interval_range).

## timeTuesdays(*start*, *stop*, *step*) {#timeTuesdays}

Alias for [d3.timeTuesday](#timeTuesday).[range](#interval_range).

## timeWednesdays(*start*, *stop*, *step*) {#timeWednesdays}

Alias for [d3.timeWednesday](#timeWednesday).[range](#interval_range).

## timeThursdays(*start*, *stop*, *step*) {#timeThursdays}

Alias for [d3.timeThursday](#timeThursday).[range](#interval_range).

## timeFridays(*start*, *stop*, *step*) {#timeFridays}

Alias for [d3.timeFriday](#timeFriday).[range](#interval_range).

## timeSaturdays(*start*, *stop*, *step*) {#timeSaturdays}

Alias for [d3.timeSaturday](#timeSaturday).[range](#interval_range).

## timeMonths(*start*, *stop*, *step*) {#timeMonths}

Alias for [d3.timeMonth](#timeMonth).[range](#interval_range).

## timeYears(*start*, *stop*, *step*) {#timeYears}

Alias for [d3.timeYear](#timeYear).[range](#interval_range).

## utcMilliseconds(*start*, *stop*, *step*) {#utcMilliseconds}

Alias for [d3.utcMillisecond](#utcMillisecond).[range](#interval_range).

## utcSeconds(*start*, *stop*, *step*) {#utcSeconds}

Alias for [d3.utcSecond](#utcSecond).[range](#interval_range).

## utcMinutes(*start*, *stop*, *step*) {#utcMinutes}

Alias for [d3.utcMinute](#utcMinute).[range](#interval_range).

## utcHours(*start*, *stop*, *step*) {#utcHours}

Alias for [d3.utcHour](#utcHour).[range](#interval_range).

## utcDays(*start*, *stop*, *step*) {#utcDays}

Alias for [d3.utcDay](#utcDay).[range](#interval_range).

## utcWeeks(*start*, *stop*, *step*) {#utcWeeks}

Alias for [d3.utcWeek](#utcWeek).[range](#interval_range).

## utcSundays(*start*, *stop*, *step*) {#utcSundays}

Alias for [d3.utcSunday](#utcSunday).[range](#interval_range).

## utcMondays(*start*, *stop*, *step*) {#utcMondays}

Alias for [d3.utcMonday](#utcMonday).[range](#interval_range).

## utcTuesdays(*start*, *stop*, *step*) {#utcTuesdays}

Alias for [d3.utcTuesday](#utcTuesday).[range](#interval_range).

## utcWednesdays(*start*, *stop*, *step*) {#utcWednesdays}

Alias for [d3.utcWednesday](#utcWednesday).[range](#interval_range).

## utcThursdays(*start*, *stop*, *step*) {#utcThursdays}

Alias for [d3.utcThursday](#utcThursday).[range](#interval_range).

## utcFridays(*start*, *stop*, *step*) {#utcFridays}

Alias for [d3.utcFriday](#utcFriday).[range](#interval_range).

## utcSaturdays(*start*, *stop*, *step*) {#utcSaturdays}

Alias for [d3.utcSaturday](#utcSaturday).[range](#interval_range).

## utcMonths(*start*, *stop*, *step*) {#utcMonths}

Alias for [d3.utcMonth](#utcMonth).[range](#interval_range).

## utcYears(*start*, *stop*, *step*) {#utcYears}

Alias for [d3.utcYear](#utcYear).[range](#interval_range).

## timeTicks(*start*, *stop*, *count*) {#timeTicks}

[Source](https://github.com/d3/d3-time/blob/main/src/ticks.js) · Equivalent to [d3.utcTicks](#utcTicks), but in local time.

## timeTickInterval(*start*, *stop*, *count*) {#timeTickInterval}

[Source](https://github.com/d3/d3-time/blob/main/src/ticks.js) · Returns the time interval that would be used by [d3.timeTicks](#timeTicks) given the same arguments.

## utcTicks(*start*, *stop*, *count*) {#utcTicks}

[Source](https://github.com/d3/d3-time/blob/main/src/ticks.js) · Returns an array of approximately *count* dates at regular intervals between *start* and *stop* (inclusive). If *stop* is before *start*, dates are returned in reverse chronological order; otherwise dates are returned in chronological order. The following UTC time intervals are considered:

* 1 second
* 5 seconds
* 15 seconds
* 30 seconds
* 1 minute
* 5 minutes
* 15 minutes
* 30 minutes
* 1 hour
* 3 hours
* 6 hours
* 12 hours
* 1 day
* 2 days
* 1 week
* 1 month
* 3 months
* 1 year

Multiples of milliseconds (for small ranges) and years (for large ranges) are also considered, following the rules of [d3.ticks](./d3-array/ticks.md#ticks). The interval producing the number of dates that is closest to *count* is used. For example:

```js
const start = new Date("1970-03-01");
const stop = new Date("1996-03-19");
const count = 4;
const ticks = d3.utcTicks(start, stop, count); // [1975-01-01, 1980-01-01, 1985-01-01, 1990-01-01, 1995-01-01]
```

If *count* is a time interval, this function behaves similarly to [*interval*.range](#interval_range) except that both *start* and *stop* are inclusive and it may return dates in reverse chronological order if *stop* is before *start*.

## utcTickInterval(*start*, *stop*, *count*) {#utcTickInterval}

[Source](https://github.com/d3/d3-time/blob/main/src/ticks.js) · Returns the time interval that would be used by [d3.utcTicks](#utcTicks) given the same arguments. If there is no associated interval, such as when *start* or *stop* is invalid, returns null.

```js
const start = new Date("1970-03-01");
const stop = new Date("1996-03-19");
const count = 4;
const interval = d3.utcTickInterval(start, stop, count); // d3.utcYear.every(5)
```

# docs/d3-timer.md

# d3-timer

This module provides an efficient queue capable of managing thousands of concurrent animations, while guaranteeing consistent, synchronized timing with concurrent or staged animations. Internally, it uses [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) for fluid animation (if available), switching to [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout) for delays longer than 24ms.

## now() {#now}

[Source](https://github.com/d3/d3-timer/blob/main/src/timer.js) · Returns the current time as defined by [performance.now](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) if available, and [Date.now](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/now) if not.

```js
d3.now() // 1236.3000000715256
```

The current time is updated at the start of a frame; it is thus consistent during the frame, and any timers scheduled during the same frame will be synchronized. If this method is called outside of a frame, such as in response to a user event, the current time is calculated and then fixed until the next frame, again ensuring consistent timing during event handling.

## timer(*callback*, *delay*, *time*) {#timer}

[Source](https://github.com/d3/d3-timer/blob/main/src/timer.js) · Schedules a new timer, invoking the specified *callback* repeatedly until the timer is [stopped](#timer_stop). An optional numeric *delay* in milliseconds may be specified to invoke the given *callback* after a delay; if *delay* is not specified, it defaults to zero. The delay is relative to the specified *time* in milliseconds; if *time* is not specified, it defaults to [now](#now).

The *callback* is passed the (apparent) *elapsed* time since the timer became active. For example:

```js
const t = d3.timer((elapsed) => {
  console.log(elapsed);
  if (elapsed > 200) t.stop();
}, 150);
```

This produces roughly the following console output:

```
3
25
48
65
85
106
125
146
167
189
209
```

(The exact values may vary depending on your JavaScript runtime and what else your computer is doing.) Note that the first *elapsed* time is 3ms: this is the elapsed time since the timer started, not since the timer was scheduled. Here the timer started 150ms after it was scheduled due to the specified delay. The apparent *elapsed* time may be less than the true *elapsed* time if the page is backgrounded and [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) is paused; in the background, apparent time is frozen.

If [timer](#timer) is called within the callback of another timer, the new timer callback (if eligible as determined by the specified *delay* and *time*) will be invoked immediately at the end of the current frame, rather than waiting until the next frame. Within a frame, timer callbacks are guaranteed to be invoked in the order they were scheduled, regardless of their start time.

## *timer*.restart(*callback*, *delay*, *time*) {#timer_restart}

[Source](https://github.com/d3/d3-timer/blob/main/src/timer.js) · Restart a timer with the specified *callback* and optional *delay* and *time*. This is equivalent to stopping this timer and creating a new timer with the specified arguments, although this timer retains the original invocation priority.

## *timer*.stop() {#timer_stop}

[Source](https://github.com/d3/d3-timer/blob/main/src/timer.js) · Stops this timer, preventing subsequent callbacks. This method has no effect if the timer has already stopped.

## timerFlush() {#timerFlush}

[Source](https://github.com/d3/d3-timer/blob/main/src/timer.js) · Immediately invoke any eligible timer callbacks. Note that zero-delay timers are normally first executed after one frame (~17ms). This can cause a brief flicker because the browser renders the page twice: once at the end of the first event loop, then again immediately on the first timer callback. By flushing the timer queue at the end of the first event loop, you can run any zero-delay timers immediately and avoid the flicker.

## timeout(*callback*, *delay*, *time*) {#timeout}

[Source](https://github.com/d3/d3-timer/blob/main/src/timeout.js) · Like [timer](#timer), except the timer automatically [stops](#timer_stop) on its first callback. A suitable replacement for [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout) that is guaranteed to not run in the background. The *callback* is passed the elapsed time.

## interval(*callback*, *delay*, *time*) {#interval}

[Source](https://github.com/d3/d3-timer/blob/main/src/interval.js) · Like [timer](#timer), except the *callback* is invoked only every *delay* milliseconds; if *delay* is not specified, this is equivalent to [timer](#timer). A suitable replacement for [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) that is guaranteed to not run in the background. The *callback* is passed the elapsed time.

# docs/d3-transition.md

# d3-transition

A transition is a [selection](./d3-selection.md)-like interface for animating changes to the DOM. Instead of applying changes instantaneously, transitions smoothly interpolate the DOM from its current state to the desired target state over a given duration.

To apply a transition, select elements, call [*selection*.transition](./d3-transition/selecting.md#selection_transition), and then make the desired changes. For example:

```js
d3.select("body")
  .transition()
    .style("background-color", "red");
```

Transitions support most selection methods (such as [*transition*.attr](./d3-transition/modifying.md#transition_attr) and [*transition*.style](./d3-transition/modifying.md#transition_style) in place of [*selection*.attr](./d3-selection/modifying.md#selection_attr) and [*selection*.style](./d3-selection/modifying.md#selection_style)), but not all methods are supported; for example, you must [append](./d3-selection/modifying.md#selection_append) elements or [bind data](./d3-selection/joining.md) before a transition starts. A [*transition*.remove](./d3-transition/modifying.md#transition_remove) operator is provided for convenient removal of elements when the transition ends.

To compute intermediate state, transitions leverage a variety of [built-in interpolators](./d3-interpolate.md). [Colors](./d3-interpolate/color.md#interpolateRgb), [numbers](./d3-interpolate/value.md#interpolateNumber), and [transforms](./d3-interpolate/transform.md) are automatically detected. [Strings](./d3-interpolate/value.md#interpolateString) with embedded numbers are also detected, as is common with many styles (such as padding or font sizes) and paths. To specify a custom interpolator, use [*transition*.attrTween](./d3-transition/modifying.md#transition_attrTween), [*transition*.styleTween](./d3-transition/modifying.md#transition_styleTween) or [*transition*.tween](./d3-transition/modifying.md#transition_tween).

See one of:

* [Selecting elements](./d3-transition/selecting.md)
* [Modifying elements](./d3-transition/modifying.md)
* [Timing](./d3-transition/timing.md)
* [Control flow](./d3-transition/control-flow.md)

# docs/d3-transition/control-flow.md

# Control flow

For advanced usage, transitions provide methods for custom control flow.

## The life of a transition

Immediately after creating a transition, such as by [*selection*.transition](./selecting.md#selection_transition) or [*transition*.transition](./selecting.md#transition_transition), you may configure the transition using methods such as [*transition*.delay](./timing.md#transition_delay), [*transition*.duration](./timing.md#transition_duration), [*transition*.attr](./modifying.md#transition_attr) and [*transition*.style](./modifying.md#transition_style). Methods that specify target values (such as *transition*.attr) are evaluated synchronously; however, methods that require the starting value for interpolation, such as [*transition*.attrTween](./modifying.md#transition_attrTween) and [*transition*.styleTween](./modifying.md#transition_styleTween), must be deferred until the transition starts.

Shortly after creation, either at the end of the current frame or during the next frame, the transition is scheduled. At this point, the delay and `start` event listeners may no longer be changed; attempting to do so throws an error with the message “too late: already scheduled” (or if the transition has ended, “transition not found”).

When the transition subsequently starts, it interrupts the active transition of the same name on the same element, if any, dispatching an `interrupt` event to registered listeners. (Note that interrupts happen on start, not creation, and thus even a zero-delay transition will not immediately interrupt the active transition: the old transition is given a final frame. Use [*selection*.interrupt](#selection_interrupt) to interrupt immediately.) The starting transition also cancels any pending transitions of the same name on the same element that were created before the starting transition. The transition then dispatches a `start` event to registered listeners. This is the last moment at which the transition may be modified: the transition’s timing, tweens, and listeners may not be changed when it is running; attempting to do so throws an error with the message “too late: already running” (or if the transition has ended, “transition not found”). The transition initializes its tweens immediately after starting.

During the frame the transition starts, but *after* all transitions starting this frame have been started, the transition invokes its tweens for the first time. Batching tween initialization, which typically involves reading from the DOM, improves performance by avoiding interleaved DOM reads and writes.

For each frame that a transition is active, it invokes its tweens with an [eased](./timing.md#transition_ease) *t*-value ranging from 0 to 1. Within each frame, the transition invokes its tweens in the order they were registered.

When a transition ends, it invokes its tweens a final time with a (non-eased) *t*-value of 1. It then dispatches an `end` event to registered listeners. This is the last moment at which the transition may be inspected: after ending, the transition is deleted from the element, and its configuration is destroyed. (A transition’s configuration is also destroyed on interrupt or cancel.) Attempting to inspect a transition after it is destroyed throws an error with the message “transition not found”.

## *selection*.interrupt(*name*) {#selection_interrupt}

[Source](https://github.com/d3/d3-transition/blob/main/src/selection/interrupt.js) · Interrupts the active transition of the specified *name* on the selected elements, and cancels any pending transitions with the specified *name*, if any. If a name is not specified, null is used.

Interrupting a transition on an element has no effect on any transitions on any descendant elements. For example, an [axis transition](../d3-axis.md) consists of multiple independent, synchronized transitions on the descendants of the axis [G element](https://www.w3.org/TR/SVG/struct.html#Groups) (the tick lines, the tick labels, the domain path, *etc.*). To interrupt the axis transition, you must therefore interrupt the descendants:

```js
selection.selectAll("*").interrupt();
```

The [universal selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors), `*`, selects all descendant elements. If you also want to interrupt the G element itself:

```js
selection.interrupt().selectAll("*").interrupt();
```

## interrupt(*node*, *name*) {#interrupt}

[Source](https://github.com/d3/d3-transition/blob/main/src/interrupt.js) · Interrupts the active transition of the specified *name* on the specified *node*, and cancels any pending transitions with the specified *name*, if any. If a name is not specified, null is used. See also [*selection*.interrupt](#selection_interrupt).

## *transition*.end() {#transition_end}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/end.js) · Returns a promise that resolves when every selected element finishes transitioning. If any element’s transition is cancelled or interrupted, the promise rejects.

## *transition*.on(*typenames*, *listener*) {#transition_on}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/on.js) · Adds or removes a *listener* to each selected element for the specified event *typenames*. The *typenames* is one of the following string event types:

* `start` - when the transition starts.
* `end` - when the transition ends.
* `interrupt` - when the transition is interrupted.
* `cancel` - when the transition is cancelled.

See [The Life of a Transition](#the-life-of-a-transition) for more. Note that these are *not* native DOM events as implemented by [*selection*.on](../d3-selection/events.md#selection_on) and [*selection*.dispatch](../d3-selection/events.md#selection_dispatch), but transition events!

The type may be optionally followed by a period (`.`) and a name; the optional name allows multiple callbacks to be registered to receive events of the same type, such as `start.foo` and `start.bar`. To specify multiple typenames, separate typenames with spaces, such as `interrupt end` or `start.foo start.bar`.

When a specified transition event is dispatched on a selected node, the specified *listener* will be invoked for the transitioning element, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. Listeners always see the latest datum for their element, but the index is a property of the selection and is fixed when the listener is assigned; to update the index, re-assign the listener.

If an event listener was previously registered for the same *typename* on a selected element, the old listener is removed before the new listener is added. To remove a listener, pass null as the *listener*. To remove all listeners for a given name, pass null as the *listener* and `.foo` as the *typename*, where `foo` is the name; to remove all listeners with no name, specify `.` as the *typename*.

If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename* on the first (non-null) selected element, if any. If multiple typenames are specified, the first matching listener is returned.

## *transition*.each(*function*) {#transition_each}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/each.js) · Invokes the specified *function* for each selected element, passing in the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. This method can be used to invoke arbitrary code for each selected element, and is useful for creating a context to access parent and child data simultaneously. Equivalent to [*selection*.each](../d3-selection/control-flow.md#selection_each).

## *transition*.call(*function*, ...*arguments*) {#transition_call}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/call.js) · Invokes the specified *function* exactly once, passing in this transition along with any optional *arguments*. Returns this transition. This is equivalent to invoking the function by hand but facilitates method chaining. For example, to set several attributes in a reusable function:

```js
function color(transition, fill, stroke) {
  transition
      .style("fill", fill)
      .style("stroke", stroke);
}
```

Now say:

```js
d3.selectAll("div").transition().call(color, "red", "blue");
```

This is equivalent to:

```js
color(d3.selectAll("div").transition(), "red", "blue");
```

Equivalent to [*selection*.call](../d3-selection/control-flow.md#selection_call).

## *transition*.empty() {#transition_empty}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/empty.js) · Returns true if this transition contains no (non-null) elements. Equivalent to [*selection*.empty](../d3-selection/control-flow.md#selection_empty).

## *transition*.nodes() {#transition_nodes}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/nodes.js) · Returns an array of all (non-null) elements in this transition. Equivalent to [*selection*.nodes](../d3-selection/control-flow.md#selection_nodes).

## *transition*.node() {#transition_node}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/node.js) · Returns the first (non-null) element in this transition. If the transition is empty, returns null. Equivalent to [*selection*.node](../d3-selection/control-flow.md#selection_node).

## *transition*.size() {#transition_size}

[Source](https://github.com/d3/d3-selection/blob/main/src/selection/size.js) · Returns the total number of elements in this transition. Equivalent to [*selection*.size](../d3-selection/control-flow.md#selection_size).

# docs/d3-transition/modifying.md

# Modifying elements

After selecting elements and creating a transition with [*selection*.transition](./selecting.md#selection_transition), use the transition’s transformation methods to affect document content.

## *transition*.attr(*name*, *value*) {#transition_attr}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/attr.js) · For each selected element, assigns the [attribute tween](#transition_attrTween) for the attribute with the specified *name* to the specified target *value*. The starting value of the tween is the attribute’s value when the transition starts. The target *value* may be specified either as a constant or a function. If a function, it is immediately evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element.

If the target value is null, the attribute is removed when the transition starts. Otherwise, an interpolator is chosen based on the type of the target value, using the following algorithm:

1. If *value* is a number, use [interpolateNumber](../d3-interpolate/value.md#interpolateNumber).
2. If *value* is a [color](../d3-color.md) or a string coercible to a color, use [interpolateRgb](../d3-interpolate/color.md#interpolateRgb).
3. Use [interpolateString](../d3-interpolate/value.md#interpolateString).

To apply a different interpolator, use [*transition*.attrTween](#transition_attrTween).

## *transition*.attrTween(*name*, *factory*) {#transition_attrTween}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/attrTween.js) · If *factory* is specified and not null, assigns the attribute [tween](#transition_tween) for the attribute with the specified *name* to the specified interpolator *factory*. An interpolator factory is a function that returns an [interpolator](../d3-interpolate.md); when the transition starts, the *factory* is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The returned interpolator will then be invoked for each frame of the transition, in order, being passed the [eased](./timing.md#transition_ease) time *t*, typically in the range [0, 1]. Lastly, the return value of the interpolator will be used to set the attribute value. The interpolator must return a string. (To remove an attribute at the start of a transition, use [*transition*.attr](#transition_attr); to remove an attribute at the end of a transition, use [*transition*.on](./control-flow.md#transition_on) to listen for the *end* event.)

If the specified *factory* is null, removes the previously-assigned attribute tween of the specified *name*, if any. If *factory* is not specified, returns the current interpolator factory for attribute with the specified *name*, or undefined if no such tween exists.

For example, to interpolate the fill attribute from red to blue:

```js
transition.attrTween("fill", () => d3.interpolateRgb("red", "blue"));
```

Or to interpolate from the current fill to blue, like [*transition*.attr](#transition_attr):

```js
transition.attrTween("fill", function() {
  return d3.interpolateRgb(this.getAttribute("fill"), "blue");
});
```

Or to apply a custom rainbow interpolator:

```js
transition.attrTween("fill", () => (t) => `hsl(${t * 360},100%,50%)`);
```

This method is useful to specify a custom interpolator, such as one that understands [SVG paths](https://observablehq.com/@d3/path-tween). A useful technique is *data interpolation*, where [interpolateObject](../d3-interpolate/value.md#interpolateObject) is used to interpolate two data values, and the resulting value is then used (say, with a [shape](../d3-shape.md)) to compute the new attribute value.

## *transition*.style(*name*, *value*, *priority*) {#transition_style}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/style.js) · For each selected element, assigns the [style tween](#transition_styleTween) for the style with the specified *name* to the specified target *value* with the specified *priority*. The starting value of the tween is the style’s inline value if present, and otherwise its computed value, when the transition starts. The target *value* may be specified either as a constant or a function. If a function, it is immediately evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element.

If the target value is null, the style is removed when the transition starts. Otherwise, an interpolator is chosen based on the type of the target value, using the following algorithm:

1. If *value* is a number, use [interpolateNumber](../d3-interpolate/value.md#interpolateNumber).
2. If *value* is a [color](../d3-color.md) or a string coercible to a color, use [interpolateRgb](../d3-interpolate/color.md#interpolateRgb).
3. Use [interpolateString](../d3-interpolate/value.md#interpolateString).

To apply a different interpolator, use [*transition*.styleTween](#transition_styleTween).

## *transition*.styleTween(*name*, *factory*, *priority*) {#transition_styleTween}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/styleTween.js) · If *factory* is specified and not null, assigns the style [tween](#transition_tween) for the style with the specified *name* to the specified interpolator *factory*. An interpolator factory is a function that returns an [interpolator](../d3-interpolate.md); when the transition starts, the *factory* is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The returned interpolator will then be invoked for each frame of the transition, in order, being passed the [eased](./timing.md#transition_ease) time *t*, typically in the range [0, 1]. Lastly, the return value of the interpolator will be used to set the style value with the specified *priority*. The interpolator must return a string. (To remove an style at the start of a transition, use [*transition*.style](#transition_style); to remove an style at the end of a transition, use [*transition*.on](./control-flow.md#transition_on) to listen for the *end* event.)

If the specified *factory* is null, removes the previously-assigned style tween of the specified *name*, if any. If *factory* is not specified, returns the current interpolator factory for style with the specified *name*, or undefined if no such tween exists.

For example, to interpolate the fill style from red to blue:

```js
transition.styleTween("fill", () => d3.interpolateRgb("red", "blue"));
```

Or to interpolate from the current fill to blue, like [*transition*.style](#transition_style):

```js
transition.styleTween("fill", function() {
  return d3.interpolateRgb(this.style.fill, "blue");
});
```

Or to apply a custom rainbow interpolator:

```js
transition.styleTween("fill", () => (t) => `hsl(${t * 360},100%,50%)`);
```

This method is useful to specify a custom interpolator, such as with *data interpolation*, where [interpolateObject](../d3-interpolate/value.md#interpolateObject) is used to interpolate two data values, and the resulting value is then used to compute the new style value.

## *transition*.text(*value*) {#transition_text}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/text.js) · For each selected element, sets the [text content](http://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-textContent) to the specified target *value* when the transition starts. The *value* may be specified either as a constant or a function. If a function, it is immediately evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The function’s return value is then used to set each element’s text content. A null value will clear the content.

To interpolate text rather than to set it on start, use [*transition*.textTween](#transition_textTween) or append a replacement element and cross-fade opacity. Text is not interpolated by default because it is usually undesirable.

## *transition*.textTween(*factory*) {#transition_textTween}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/textTween.js), [Examples](https://observablehq.com/@d3/transition-texttween)

If *factory* is specified and not null, assigns the text [tween](#transition_tween) to the specified interpolator *factory*. An interpolator factory is a function that returns an [interpolator](../d3-interpolate.md); when the transition starts, the *factory* is evaluated for each selected element, in order, being passed the current datum `d` and index `i`, with the `this` context as the current DOM element. The returned interpolator will then be invoked for each frame of the transition, in order, being passed the [eased](./timing.md#transition_ease) time *t*, typically in the range [0, 1]. Lastly, the return value of the interpolator will be used to set the text. The interpolator must return a string.

For example, to interpolate the text with integers from 0 to 100:

```js
transition.textTween(() => d3.interpolateRound(0, 100));
```

If the specified *factory* is null, removes the previously-assigned text tween, if any. If *factory* is not specified, returns the current interpolator factory for text, or undefined if no such tween exists.

## *transition*.remove() {#transition_remove}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/remove.js) · For each selected element, [removes](../d3-selection/modifying.md#selection_remove) the element when the transition ends, as long as the element has no other active or pending transitions. If the element has other active or pending transitions, does nothing.

## *transition*.tween(name, value) {#transition_tween}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/tween.js) · For each selected element, assigns the tween with the specified *name* with the specified *value* function. The *value* must be specified as a function that returns a function. When the transition starts, the *value* function is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The returned function is then invoked for each frame of the transition, in order, being passed the [eased](./timing.md#transition_ease) time *t*, typically in the range [0, 1]. If the specified *value* is null, removes the previously-assigned tween of the specified *name*, if any.

For example, to interpolate the fill attribute to blue, like [*transition*.attr](#transition_attr):

```js
transition.tween("attr.fill", function() {
  const i = d3.interpolateRgb(this.getAttribute("fill"), "blue");
  return function(t) {
    this.setAttribute("fill", i(t));
  };
});
```

<!-- This method is useful to specify a custom interpolator, or to perform side-effects, say to animate the [scroll offset](https://bl.ocks.org/mbostock/1649463). -->

# docs/d3-transition/selecting.md

# Selecting elements

Transitions are derived from [selections](../d3-selection.md) via [*selection*.transition](#selection_transition). You can also create a transition on the document root element using [d3.transition](#transition).

## *selection*.transition(*name*) {#selection_transition}

[Source](https://github.com/d3/d3-transition/blob/main/src/selection/transition.js) · Returns a new transition on the given *selection* with the specified *name*. If a *name* is not specified, null is used. The new transition is only exclusive with other transitions of the same name.

If the *name* is a [transition](#transition) instance, the returned transition has the same id and name as the specified transition. If a transition with the same id already exists on a selected element, the existing transition is returned for that element. Otherwise, the timing of the returned transition is inherited from the existing transition of the same id on the nearest ancestor of each selected element. Thus, this method can be used to synchronize a transition across multiple selections, or to re-select a transition for specific elements and modify its configuration. For example:

```js
const t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);

d3.selectAll(".apple").transition(t)
    .style("fill", "red");

d3.selectAll(".orange").transition(t)
    .style("fill", "orange");
```

If the specified *transition* is not found on a selected node or its ancestors (such as if the transition [already ended](./control-flow.md#the-life-of-a-transition)), the default timing parameters are used; however, in a future release, this will likely be changed to throw an error. See [#59](https://github.com/d3/d3-transition/issues/59).

## transition(*name*) {#transition}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/index.js) · Returns a new transition on the root element, `document.documentElement`, with the specified *name*. If a *name* is not specified, null is used. The new transition is only exclusive with other transitions of the same name. The *name* may also be a [transition](#transition) instance; see [*selection*.transition](#selection_transition). This method is equivalent to:

```js
d3.selection()
  .transition(name)
```

This function can also be used to test for transitions (`instanceof d3.transition`) or to extend the transition prototype.

## *transition*.select(*selector*) {#transition_select}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/select.js) · For each selected element, selects the first descendant element that matches the specified *selector* string, if any, and returns a transition on the resulting selection. The *selector* may be specified either as a selector string or a function. If a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The new transition has the same id, name and timing as this transition; however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element.

This method is equivalent to deriving the selection for this transition via [*transition*.selection](#transition_selection), creating a subselection via [*selection*.select](../d3-selection/selecting.md#selection_select), and then creating a new transition via [*selection*.transition](#selection_transition):

```js
transition
  .selection()
  .select(selector)
  .transition(transition)
```

## *transition*.selectAll(selector) {#transition_selectAll}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/selectAll.js) · For each selected element, selects all descendant elements that match the specified *selector* string, if any, and returns a transition on the resulting selection. The *selector* may be specified either as a selector string or a function. If a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The new transition has the same id, name and timing as this transition; however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element.

This method is equivalent to deriving the selection for this transition via [*transition*.selection](#transition_selection), creating a subselection via [*selection*.selectAll](../d3-selection/selecting.md#selection_selectAll), and then creating a new transition via [*selection*.transition](#selection_transition):

```js
transition
  .selection()
  .selectAll(selector)
  .transition(transition)
```

## *transition*.selectChild(*selector*) {#transition_selectChild}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/select.js) · For each selected element, selects the first child element that matches the specified *selector* string, if any, and returns a transition on the resulting selection. The *selector* may be specified either as a selector string or a function. If a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The new transition has the same id, name and timing as this transition; however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element.

This method is equivalent to deriving the selection for this transition via [*transition*.selection](#transition_selection), creating a subselection via [*selection*.selectChild](../d3-selection/selecting.md#selection_selectChild), and then creating a new transition via [*selection*.transition](#selection_transition):

```js
transition
  .selection()
  .selectChild(selector)
  .transition(transition)
```

## *transition*.selectChildren(*selector*) {#transition_selectChildren}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/selectAll.js) · For each selected element, selects all children that match the specified *selector* string, if any, and returns a transition on the resulting selection. The *selector* may be specified either as a selector string or a function. If a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The new transition has the same id, name and timing as this transition; however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element.

This method is equivalent to deriving the selection for this transition via [*transition*.selection](#transition_selection), creating a subselection via [*selection*.selectChildren](../d3-selection/selecting.md#selection_selectChildren), and then creating a new transition via [*selection*.transition](#selection_transition):

```js
transition
  .selection()
  .selectChildren(selector)
  .transition(transition)
```

## *transition*.filter(*filter*) {#transition_filter}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/filter.js) · For each selected element, selects only the elements that match the specified *filter*, and returns a transition on the resulting selection. The *filter* may be specified either as a selector string or a function. If a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The new transition has the same id, name and timing as this transition; however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element.

This method is equivalent to deriving the selection for this transition via [*transition*.selection](#transition_selection), creating a subselection via [*selection*.filter](../d3-selection/selecting.md#selection_filter), and then creating a new transition via [*selection*.transition](#selection_transition):

```js
transition
  .selection()
  .filter(filter)
  .transition(transition)
```

## *transition*.merge(*other*) {#transition_merge}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/merge.js) · Returns a new transition merging this transition with the specified *other* transition, which must have the same id as this transition. The returned transition has the same number of groups, the same parents, the same name and the same id as this transition. Any missing (null) elements in this transition are filled with the corresponding element, if present (not null), from the *other* transition.

This method is equivalent to deriving the selection for this transition via [*transition*.selection](#transition_selection), merging with the selection likewise derived from the *other* transition via [*selection*.merge](../d3-selection/joining.md#selection_merge), and then creating a new transition via [*selection*.transition](#selection_transition):

```js
transition
  .selection()
  .merge(other.selection())
  .transition(transition)
```

## *transition*.transition() {#transition_transition}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/transition.js) · Returns a new transition on the same selected elements as this transition, scheduled to start when this transition ends. The new transition inherits a reference time equal to this transition’s time plus its [delay](./timing.md#transition_delay) and [duration](./timing.md#transition_duration). The new transition also inherits this transition’s name, duration, and [easing](./timing.md#transition_ease). This method can be used to schedule a sequence of chained transitions. For example:

```js
d3.selectAll(".apple")
  .transition() // First fade to green.
    .style("fill", "green")
  .transition() // Then red.
    .style("fill", "red")
  .transition() // Wait one second. Then brown, and remove.
    .delay(1000)
    .style("fill", "brown")
    .remove();
```

The delay for each transition is relative to its previous transition. Thus, in the above example, apples will stay red for one second before the last transition to brown starts.

## *transition*.selection() {#transition_selection}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/selection.js) · Returns the [selection](../d3-selection/selecting.md#selection) corresponding to this transition.

## active(node, name) {#active}

[Examples](https://observablehq.com/@d3/chained-transitions) · [Source](https://github.com/d3/d3-transition/blob/main/src/active.js) · Returns the active transition on the specified *node* with the specified *name*, if any. If no *name* is specified, null is used. Returns null if there is no such active transition on the specified node. This method is useful for creating chained transitions. For example, to initiate disco mode:

```js
d3.selectAll("circle").transition()
    .delay((d, i) => i * 50)
    .on("start", function repeat() {
        d3.active(this)
            .style("fill", "red")
          .transition()
            .style("fill", "green")
          .transition()
            .style("fill", "blue")
          .transition()
            .on("start", repeat);
      });
```

# docs/d3-transition/timing.md

# Timing

The [easing](#transition_ease), [delay](#transition_delay) and [duration](#transition_duration) of a transition is configurable. For example, a per-element delay can be used to [stagger the reordering](https://observablehq.com/@d3/sortable-bar-chart) of elements, improving perception. See [Animated Transitions in Statistical Data Graphics](http://vis.berkeley.edu/papers/animated_transitions/) for recommendations.

## *transition*.delay(*value*) {#transition_delay}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/delay.js) · For each selected element, sets the transition delay to the specified *value* in milliseconds.

```js
transition.delay(250);
```

The *value* may be specified either as a constant or a function. If a function, it is immediately evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The function’s return value is then used to set each element’s transition delay. If a delay is not specified, it defaults to zero.

If a *value* is not specified, returns the current value of the delay for the first (non-null) element in the transition. This is generally useful only if you know that the transition contains exactly one element.

```js
transition.delay() // 250
```

Setting the delay to a multiple of the index `i` is a convenient way to stagger transitions across a set of elements. For example:

```js
transition.delay((d, i) => i * 10);
```

Of course, you can also compute the delay as a function of the data, or [sort the selection](../d3-selection/modifying.md#selection_sort) before computed an index-based delay.

## *transition*.duration(*value*) {#transition_duration}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/duration.js) · For each selected element, sets the transition duration to the specified *value* in milliseconds.

```js
transition.duration(750);
```

The *value* may be specified either as a constant or a function. If a function, it is immediately evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The function’s return value is then used to set each element’s transition duration. If a duration is not specified, it defaults to 250ms.

If a *value* is not specified, returns the current value of the duration for the first (non-null) element in the transition. This is generally useful only if you know that the transition contains exactly one element.

```js
transition.duration() // 750
```

## *transition*.ease(*value*) {#transition_ease}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/ease.js) · Specifies the transition [easing function](../d3-ease.md) for all selected elements.

```js
transition.ease(d3.easeCubic);
```

The *value* must be specified as a function. The easing function is invoked for each frame of the animation, being passed the normalized time *t* in the range [0, 1]; it must then return the eased time *tʹ* which is typically also in the range [0, 1]. A good easing function should return 0 if *t* = 0 and 1 if *t* = 1. If an easing function is not specified, it defaults to [easeCubic](../d3-ease.md#easeCubic).

If a *value* is not specified, returns the current easing function for the first (non-null) element in the transition. This is generally useful only if you know that the transition contains exactly one element.

```js
transition.ease() // d3.easeCubic
```

## *transition*.easeVarying(*factory*) {#transition_easeVarying}

[Examples](https://observablehq.com/@d3/transition-easevarying) · [Source](https://github.com/d3/d3-transition/blob/main/src/transition/easeVarying.js) · Specifies a factory for the transition [easing function](../d3-ease.md).

```js
transition.easeVarying((d) => d3.easePolyIn.exponent(d.exponent));
```

The *factory* must be a function. It is invoked for each node of the selection, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. It must return an easing function.

# docs/d3-zoom.md

# d3-zoom

[Examples](https://observablehq.com/collection/@d3/d3-zoom) · [Panning and zooming](https://observablehq.com/@d3/zoomable-scatterplot) let the user focus on a region of interest by restricting the view. It uses direct manipulation: click-and-drag to pan (translate), spin the wheel to zoom (scale), or pinch with touch. Panning and zooming are widely used in web-based mapping, but can also be used in visualization such as dense time series and scatterplots.

The zoom behavior is a flexible abstraction, handling a surprising variety of input modalities and browser quirks. The zoom behavior is agnostic about the DOM, so you can use it with HTML, [SVG](https://observablehq.com/@d3/zoom), or [Canvas](https://observablehq.com/@d3/zoom-canvas). You can use d3-zoom with [d3-scale](./d3-scale.md) and [d3-axis](./d3-axis.md) to [zoom axes](https://observablehq.com/@d3/pan-zoom-axes). You can restrict zooming using [*zoom*.scaleExtent](#zoom_scaleExtent) and panning using [*zoom*.translateExtent](#zoom_translateExtent). You can combine d3-zoom with other behaviors such as [d3-drag](./d3-drag.md) for [dragging](https://observablehq.com/@d3/drag-zoom) and [d3-brush](./d3-brush.md) for [focus + context](https://observablehq.com/@d3/focus-context).

The zoom behavior can be controlled programmatically using [*zoom*.transform](#zoom_transform), allowing you to implement user interface controls which drive the display or to stage [animated tours](https://observablehq.com/@d3/scatterplot-tour) through your data. [Smooth zoom transitions](https://observablehq.com/@d3/programmatic-zoom) are based on [“Smooth and efficient zooming and panning”](http://www.win.tue.nl/~vanwijk/zoompan.pdf) by Jarke J. van Wijk and Wim A.A. Nuij.

See also [d3-tile](https://github.com/d3/d3-tile) for examples panning and zooming maps.

## zoom() {#zoom}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · Creates a new zoom behavior. The returned behavior, [*zoom*](#_zoom), is both an object and a function, and is typically applied to selected elements via [*selection*.call](./d3-selection/control-flow.md#selection_call).

## *zoom*(*selection*) {#_zoom}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · Applies this zoom behavior to the specified [*selection*](./d3-selection.md), binding the necessary event listeners to allow panning and zooming, and initializing the [zoom transform](#zoomTransform) on each selected element to the identity transform if not already defined.

This function is typically not invoked directly, and is instead invoked via [*selection*.call](./d3-selection/control-flow.md#selection_call). For example, to instantiate a zoom behavior and apply it to a selection:

```js
selection.call(d3.zoom().on("zoom", zoomed));
```

Internally, the zoom behavior uses [*selection*.on](./d3-selection/events.md#selection_on) to bind the necessary event listeners for zooming. The listeners use the name `.zoom`, so you can subsequently unbind the zoom behavior as follows:

```js
selection.on(".zoom", null);
```

To disable just wheel-driven zooming (say to not interfere with native scrolling), you can remove the zoom behavior’s wheel event listener after applying the zoom behavior to the selection:

```js
selection
    .call(zoom)
    .on("wheel.zoom", null);
```

Alternatively, use [*zoom*.filter](#zoom_filter) for greater control over which events can initiate zoom gestures.

Applying the zoom behavior also sets the [-webkit-tap-highlight-color](https://developer.apple.com/library/mac/documentation/AppleApplications/Reference/SafariWebContent/AdjustingtheTextSize/AdjustingtheTextSize.html#//apple_ref/doc/uid/TP40006510-SW5) style to transparent, disabling the tap highlight on iOS. If you want a different tap highlight color, remove or re-apply this style after applying the drag behavior.

The zoom behavior stores the zoom state on the element to which the zoom behavior was applied, not on the zoom behavior itself. This allows the zoom behavior to be applied to many elements simultaneously with independent zooming. The zoom state can change either on user interaction or programmatically via [*zoom*.transform](#zoom_transform).

To retrieve the zoom state, use *event*.transform on the current [zoom event](#zoom-events) within a zoom event listener (see [*zoom*.on](#zoom_on)), or use [zoomTransform](#zoomTransform) for a given node. The latter is useful for modifying the zoom state programmatically, say to implement buttons for zooming in and out.

## *zoom*.transform(*selection*, *transform*, *point*) {#zoom_transform}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · If *selection* is a selection, sets the [current zoom transform](#zoomTransform) of the selected elements to the specified *transform*, instantaneously emitting start, zoom and end [events](#zoom-events).

If *selection* is a transition, defines a “zoom” tween to the specified *transform* using [interpolateZoom](./d3-interpolate/zoom.md#interpolateZoom), emitting a start event when the transition starts, zoom events for each tick of the transition, and then an end event when the transition ends (or is interrupted). The transition will attempt to minimize the visual movement around the specified *point*; if the *point* is not specified, it defaults to the center of the viewport [extent](#zoom_extent).

The *transform* may be specified either as a [zoom transform](#zoomTransform) or as a function that returns a zoom transform; similarly, the *point* may be specified either as a two-element array [*x*, *y*] or a function that returns such an array. If a function, it is invoked for each selected element, being passed the current event (`event`) and datum `d`, with the `this` context as the current DOM element.

This function is typically not invoked directly, and is instead invoked via [*selection*.call](./d3-selection/control-flow.md#selection_call) or [*transition*.call](./d3-transition/control-flow.md#transition_call). For example, to reset the zoom transform to the [identity transform](#zoomIdentity) instantaneously:

```js
selection.call(zoom.transform, d3.zoomIdentity);
```

To smoothly reset the zoom transform to the identity transform over 750 milliseconds:

```js
selection.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
```

This method requires that you specify the new zoom transform completely, and does not enforce the defined [scale extent](#zoom_scaleExtent) and [translate extent](#zoom_translateExtent), if any. To derive a new transform from the existing transform, and to enforce the scale and translate extents, see the convenience methods [*zoom*.translateBy](#zoom_translateBy), [*zoom*.scaleBy](#zoom_scaleBy) and [*zoom*.scaleTo](#zoom_scaleTo).

## *zoom*.translateBy(*selection*, *x*, *y*) {#zoom_translateBy}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · If *selection* is a selection, [translates](#transform_translate) the [current zoom transform](#zoomTransform) of the selected elements by *x* and *y*, such that the new *t<sub>x1</sub>* = *t<sub>x0</sub>* + *kx* and *t<sub>y1</sub>* = *t<sub>y0</sub>* + *ky*. If *selection* is a transition, defines a “zoom” tween translating the current transform. This method is a convenience method for [*zoom*.transform](#zoom_transform). The *x* and *y* translation amounts may be specified either as numbers or as functions that return numbers. If a function, it is invoked for each selected element, being passed the current datum `d` and index `i`, with the `this` context as the current DOM element.

## *zoom*.translateTo(*selection*, *x*, *y*, *p*) {#zoom_translateTo}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · If *selection* is a selection, [translates](#transform_translate) the [current zoom transform](#zoomTransform) of the selected elements such that the given position ⟨*x*,*y*⟩ appears at given point *p*. The new *t<sub>x</sub>* = *p<sub>x</sub>* - *kx* and *t<sub>y</sub>* = *p<sub>y</sub>* - *ky*. If *p* is not specified, it defaults to the center of the viewport [extent](#zoom_extent). If *selection* is a transition, defines a “zoom” tween translating the current transform. This method is a convenience method for [*zoom*.transform](#zoom_transform). The *x* and *y* coordinates may be specified either as numbers or as functions that returns numbers; similarly the *p* point may be specified either as a two-element array [*p<sub>x</sub>*,*p<sub>y</sub>*] or a function. If a function, it is invoked for each selected element, being passed the current datum `d` and index `i`, with the `this` context as the current DOM element.

## *zoom*.scaleBy(*selection*, *k*, *p*) {#zoom_scaleBy}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · If *selection* is a selection, [scales](#transform_scale) the [current zoom transform](#zoomTransform) of the selected elements by *k*, such that the new *k₁* = *k₀k*. The reference point *p* does move. If *p* is not specified, it defaults to the center of the viewport [extent](#zoom_extent). If *selection* is a transition, defines a “zoom” tween translating the current transform. This method is a convenience method for [*zoom*.transform](#zoom_transform). The *k* scale factor may be specified either as a number or a function that returns a number; similarly the *p* point may be specified either as a two-element array [*p<sub>x</sub>*,*p<sub>y</sub>*] or a function. If a function, it is invoked for each selected element, being passed the current datum `d` and index `i`, with the `this` context as the current DOM element.

## *zoom*.scaleTo(*selection*, *k*, *p*) {#zoom_scaleTo}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · If *selection* is a selection, [scales](#transform_scale) the [current zoom transform](#zoomTransform) of the selected elements to *k*, such that the new *k₁* = *k*. The reference point *p* does move. If *p* is not specified, it defaults to the center of the viewport [extent](#zoom_extent). If *selection* is a transition, defines a “zoom” tween translating the current transform. This method is a convenience method for [*zoom*.transform](#zoom_transform). The *k* scale factor may be specified either as a number or a function that returns a number; similarly the *p* point may be specified either as a two-element array [*p<sub>x</sub>*,*p<sub>y</sub>*] or a function. If a function, it is invoked for each selected element, being passed the current datum `d` and index `i`, with the `this` context as the current DOM element.

## *zoom*.constrain(*constrain*) {#zoom_constrain}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · If *constrain* is specified, sets the transform constraint function to the specified function and returns the zoom behavior. If *constrain* is not specified, returns the current constraint function, which defaults to:

```js
function constrain(transform, extent, translateExtent) {
  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
      dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
      dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
      dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
  return transform.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}
```

The constraint function must return a [*transform*]#zoomTransform) given the current *transform*, [viewport extent](#zoom_extent) and [translate extent](#zoom_translateExtent). The default implementation attempts to ensure that the viewport extent does not go outside the translate extent.

## *zoom*.filter(*filter*) {#zoom_filter}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · If *filter* is specified, sets the filter to the specified function and returns the zoom behavior. If *filter* is not specified, returns the current filter, which defaults to:

```js
function filter(event) {
  return (!event.ctrlKey || event.type === 'wheel') && !event.button;
}
```

The filter is passed the current event (`event`) and datum `d`, with the `this` context as the current DOM element. If the filter returns falsey, the initiating event is ignored and no zoom gestures are started. Thus, the filter determines which input events are ignored. The default filter ignores mousedown events on secondary buttons, since those buttons are typically intended for other purposes, such as the context menu.

## *zoom*.touchable(*touchable*) {#zoom_touchable}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · If *touchable* is specified, sets the touch support detector to the specified function and returns the zoom behavior. If *touchable* is not specified, returns the current touch support detector, which defaults to:

```js
function touchable() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}
```

Touch event listeners are only registered if the detector returns truthy for the corresponding element when the zoom behavior is [applied](#_zoom). The default detector works well for most browsers that are capable of touch input, but not all; Chrome’s mobile device emulator, for example, fails detection.

## *zoom*.wheelDelta(*delta*) {#zoom_wheelDelta}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · If *delta* is specified, sets the wheel delta function to the specified function and returns the zoom behavior. If *delta* is not specified, returns the current wheel delta function, which defaults to:

```js
function wheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
}
```

The value *Δ* returned by the wheel delta function determines the amount of scaling applied in response to a [WheelEvent](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent). The scale factor [*transform*.k](#zoomTransform) is multiplied by 2<sup>*Δ*</sup>; for example, a *Δ* of +1 doubles the scale factor, *Δ* of -1 halves the scale factor.

## *zoom*.extent(*extent*) {#zoom_extent}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · If *extent* is specified, sets the viewport extent to the specified array of points [[*x0*, *y0*], [*x1*, *y1*]], where [*x0*, *y0*] is the top-left corner of the viewport and [*x1*, *y1*] is the bottom-right corner of the viewport, and returns this zoom behavior. The *extent* may also be specified as a function which returns such an array; if a function, it is invoked for each selected element, being passed the current datum `d`, with the `this` context as the current DOM element.

If *extent* is not specified, returns the current extent accessor, which defaults to [[0, 0], [*width*, *height*]] where *width* is the [client width](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth) of the element and *height* is its [client height](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight); for SVG elements, the nearest ancestor SVG element’s viewBox, or [width](https://www.w3.org/TR/SVG/struct.html#SVGElementWidthAttribute) and [height](https://www.w3.org/TR/SVG/struct.html#SVGElementHeightAttribute) attributes, are used. Alternatively, consider using [*element*.getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).

The viewport extent affects several functions: the center of the viewport remains fixed during changes by [*zoom*.scaleBy](#zoom_scaleBy) and [*zoom*.scaleTo](#zoom_scaleTo); the viewport center and dimensions affect the path chosen by [interpolateZoom](./d3-interpolate/zoom.md#interpolateZoom); and the viewport extent is needed to enforce the optional [translate extent](#zoom_translateExtent).

## *zoom*.scaleExtent(*extent*) {#zoom_scaleExtent}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · If *extent* is specified, sets the scale extent to the specified array of numbers [*k0*, *k1*] where *k0* is the minimum allowed scale factor and *k1* is the maximum allowed scale factor, and returns this zoom behavior. If *extent* is not specified, returns the current scale extent, which defaults to [0, ∞]. The scale extent restricts zooming in and out. It is enforced on interaction and when using [*zoom*.scaleBy](#zoom_scaleBy), [*zoom*.scaleTo](#zoom_scaleTo) and [*zoom*.translateBy](#zoom_translateBy); however, it is not enforced when using [*zoom*.transform](#zoom_transform) to set the transform explicitly.

If the user tries to zoom by wheeling when already at the corresponding limit of the scale extent, the wheel events will be ignored and not initiate a zoom gesture. This allows the user to scroll down past a zoomable area after zooming in, or to scroll up after zooming out. If you would prefer to always prevent scrolling on wheel input regardless of the scale extent, register a wheel event listener to prevent the browser default behavior:

```js
selection
    .call(zoom)
    .on("wheel", event => event.preventDefault());
```

## *zoom*.translateExtent(*extent*) {#zoom_translateExtent}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · If *extent* is specified, sets the translate extent to the specified array of points [[*x0*, *y0*], [*x1*, *y1*]], where [*x0*, *y0*] is the top-left corner of the world and [*x1*, *y1*] is the bottom-right corner of the world, and returns this zoom behavior. If *extent* is not specified, returns the current translate extent, which defaults to [[-∞, -∞], [+∞, +∞]]. The translate extent restricts panning, and may cause translation on zoom out. It is enforced on interaction and when using [*zoom*.scaleBy](#zoom_scaleBy), [*zoom*.scaleTo](#zoom_scaleTo) and [*zoom*.translateBy](#zoom_translateBy); however, it is not enforced when using [*zoom*.transform](#zoom_transform) to set the transform explicitly.

## *zoom*.clickDistance(*distance*) {#zoom_clickDistance}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · If *distance* is specified, sets the maximum distance that the mouse can move between mousedown and mouseup that will trigger a subsequent click event. If at any point between mousedown and mouseup the mouse is greater than or equal to *distance* from its position on mousedown, the click event following mouseup will be suppressed. If *distance* is not specified, returns the current distance threshold, which defaults to zero. The distance threshold is measured in client coordinates ([*event*.clientX](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX) and [*event*.clientY](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY)).

## *zoom*.tapDistance(*distance*) {#zoom_tapDistance}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · If *distance* is specified, sets the maximum distance that a double-tap gesture can move between first touchstart and second touchend that will trigger a subsequent double-click event. If *distance* is not specified, returns the current distance threshold, which defaults to 10. The distance threshold is measured in client coordinates ([*event*.clientX](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX) and [*event*.clientY](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY)).

## *zoom*.duration(*duration*) {#zoom_duration}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · If *duration* is specified, sets the duration for zoom transitions on double-click and double-tap to the specified number of milliseconds and returns the zoom behavior. If *duration* is not specified, returns the current duration, which defaults to 250 milliseconds. If the duration is not greater than zero, double-click and -tap trigger instantaneous changes to the zoom transform rather than initiating smooth transitions.

To disable double-click and double-tap transitions, you can remove the zoom behavior’s dblclick event listener after applying the zoom behavior to the selection:

```js
selection
    .call(zoom)
    .on("dblclick.zoom", null);
```

## *zoom*.interpolate(*interpolate*) {#zoom_interpolate}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · If *interpolate* is specified, sets the interpolation factory for zoom transitions to the specified function. If *interpolate* is not specified, returns the current interpolation factory, which defaults to [interpolateZoom](./d3-interpolate/zoom.md#interpolateZoom) to implement smooth zooming. To apply direct interpolation between two views, try [interpolate](./d3-interpolate/value.md#interpolate) instead.

## *zoom*.on(*typenames*, *listener*) {#zoom_on}

[Source](https://github.com/d3/d3-zoom/blob/main/src/zoom.js) · If *listener* is specified, sets the event *listener* for the specified *typenames* and returns the zoom behavior. If an event listener was already registered for the same type and name, the existing listener is removed before the new listener is added. If *listener* is null, removes the current event listeners for the specified *typenames*, if any. If *listener* is not specified, returns the first currently-assigned listener matching the specified *typenames*, if any. When a specified event is dispatched, each *listener* will be invoked with the same context and arguments as [*selection*.on](./d3-selection/events.md#selection_on) listeners: the current event (`event`) and datum `d`, with the `this` context as the current DOM element.

The *typenames* is a string containing one or more *typename* separated by whitespace. Each *typename* is a *type*, optionally followed by a period (`.`) and a *name*, such as `zoom.foo` and `zoom.bar`; the name allows multiple listeners to be registered for the same *type*. The *type* must be one of the following:

* `start` - after zooming begins (such as on mousedown).
* `zoom` - after a change to the zoom transform (such as on mousemove).
* `end` - after zooming ends (such as on mouseup ).

See [*dispatch*.on](./d3-dispatch.md#dispatch_on) for more.

## Zoom events

When a [zoom event listener](#zoom_on) is invoked, it receives the current zoom event as a first argument. The *event* object exposes several fields:

* *event*.target - the associated [zoom behavior](#zoom).
* *event*.type - the string “start”, “zoom” or “end”; see [*zoom*.on](#zoom_on).
* *event*.transform - the current [zoom transform](#zoomTransform).
* *event*.sourceEvent - the underlying input event, such as mousemove or touchmove.

The zoom behavior handles a variety of interaction events:

| Event        | Listening Element | Zoom Event  | Default Prevented? |
| ------------ | ----------------- | ----------- | ------------------ |
| mousedown⁵   | selection         | start       | no¹                |
| mousemove²   | window¹           | zoom        | yes                |
| mouseup²     | window¹           | end         | yes                |
| dragstart²   | window            | -           | yes                |
| selectstart² | window            | -           | yes                |
| click³       | window            | -           | yes                |
| dblclick     | selection         | *multiple*⁶ | yes                |
| wheel⁸       | selection         | zoom⁷       | yes                |
| touchstart   | selection         | *multiple*⁶ | no⁴                |
| touchmove    | selection         | zoom        | yes                |
| touchend     | selection         | end         | no⁴                |
| touchcancel  | selection         | end         | no⁴                |

The propagation of all consumed events is [immediately stopped](https://dom.spec.whatwg.org/#dom-event-stopimmediatepropagation).

¹ Necessary to capture events outside an iframe; see [d3-drag#9](https://github.com/d3/d3-drag/issues/9).
<br>² Only applies during an active, mouse-based gesture; see [d3-drag#9](https://github.com/d3/d3-drag/issues/9).
<br>³ Only applies immediately after some mouse-based gestures; see [*zoom*.clickDistance](#zoom_clickDistance).
<br>⁴ Necessary to allow [click emulation](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW7) on touch input; see [d3-drag#9](https://github.com/d3/d3-drag/issues/9).
<br>⁵ Ignored if within 500ms of a touch gesture ending; assumes [click emulation](https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW7).
<br>⁶ Double-click and double-tap initiate a transition that emits start, zoom and end events; see [*zoom*.tapDistance](#zoom_tapDistance).
<br>⁷ The first wheel event emits a start event; an end event is emitted when no wheel events are received for 150ms.
<br>⁸ Ignored if already at the corresponding limit of the [scale extent](#zoom_scaleExtent).

## zoomTransform(*node*) {#zoomTransform}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns the current transform for the specified *node*. Note that *node* should typically be a DOM element, not a *selection*. (A selection may consist of multiple nodes, in different states, and this function only returns a single transform.) If you have a selection, call [*selection*.node](./d3-selection/control-flow.md#selection_node) first:

```js
var transform = d3.zoomTransform(selection.node());
```

In the context of an [event listener](./d3-selection/events.md#selection_on), the *node* is typically the element that received the input event (which should be equal to [*event*.transform](#zoom-events)), *this*:

```js
var transform = d3.zoomTransform(this);
```

Internally, an element’s transform is stored as *element*.\_\_zoom; however, you should use this method rather than accessing it directly. If the given *node* has no defined transform, returns the transform of the closest ancestor, or if none exists, the [identity transformation](#zoomIdentity). The returned transform represents a two-dimensional [transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix#Affine_transformations) of the form:

*k* 0 *t<sub>x</sub>*
<br>0 *k* *t<sub>y</sub>*
<br>0 0 1

(This matrix is capable of representing only scale and translation; a future release may also allow rotation, though this would probably not be a backwards-compatible change.) The position ⟨*x*,*y*⟩ is transformed to ⟨*xk* + *t<sub>x</sub>*,*yk* + *t<sub>y</sub>*⟩. The transform object exposes the following properties:

* *transform*.x - the translation amount *t<sub>x</sub>* along the *x*-axis.
* *transform*.y - the translation amount *t<sub>y</sub>* along the *y*-axis.
* *transform*.k - the scale factor *k*.

These properties should be considered read-only; instead of mutating a transform, use [*transform*.scale](#transform_scale) and [*transform*.translate](#transform_translate) to derive a new transform. Also see [*zoom*.scaleBy](#zoom_scaleBy), [*zoom*.scaleTo](#zoom_scaleTo) and [*zoom*.translateBy](#zoom_translateBy) for convenience methods on the zoom behavior. To create a transform with a given *k*, *t<sub>x</sub>*, and *t<sub>y</sub>*:

```js
var t = d3.zoomIdentity.translate(x, y).scale(k);
```

To apply the transformation to a [Canvas 2D context](https://www.w3.org/TR/2dcontext/), use [*context*.translate](https://www.w3.org/TR/2dcontext/#dom-context-2d-translate) followed by [*context*.scale](https://www.w3.org/TR/2dcontext/#dom-context-2d-scale):

```js
context.translate(transform.x, transform.y);
context.scale(transform.k, transform.k);
```

Similarly, to apply the transformation to HTML elements via [CSS](https://www.w3.org/TR/css-transforms-1/):

```js
div.style("transform", "translate(" + transform.x + "px," + transform.y + "px) scale(" + transform.k + ")");
div.style("transform-origin", "0 0");
```

To apply the transformation to [SVG](https://www.w3.org/TR/SVG/coords.html#TransformAttribute):

```js
g.attr("transform", "translate(" + transform.x + "," + transform.y + ") scale(" + transform.k + ")");
```

Or more simply, taking advantage of [*transform*.toString](#transform_toString):

```js
g.attr("transform", transform);
```

Note that the order of transformations matters! The translate must be applied before the scale.

## zoomIdentity {#zoomIdentity}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · The identity transform, where *k* = 1, *t<sub>x</sub>* = *t<sub>y</sub>* = 0.

## new d3.ZoomTransform(*k*, *x*, *y*) {#ZoomTransform}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns a transform with scale *k* and translation (*x*, *y*).

## *transform*.scale(*k*) {#transform_scale}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns a transform whose scale *k₁* is equal to *k₀k*, where *k₀* is this transform’s scale.

## *transform*.translate(*x*, *y*) {#transform_translate}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns a transform whose translation *t<sub>x1</sub>* and *t<sub>y1</sub>* is equal to *t<sub>x0</sub>* + *t<sub>k</sub> x* and *t<sub>y0</sub>* + *t<sub>k</sub> y*, where *t<sub>x0</sub>* and *t<sub>y0</sub>* is this transform’s translation and *t<sub>k</sub>* is this transform’s scale.

## *transform*.apply(*point*) {#transform_apply}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns the transformation of the specified *point* which is a two-element array of numbers [*x*, *y*]. The returned point is equal to [*xk* + *t<sub>x</sub>*, *yk* + *t<sub>y</sub>*].

## *transform*.applyX(*x*) {#transform_applyX}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns the transformation of the specified *x*-coordinate, *xk* + *t<sub>x</sub>*.

## *transform*.applyY(*y*) {#transform_applyY}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns the transformation of the specified y coordinate, *yk* + *t<sub>y</sub>*.

## *transform*.invert(*point*) {#transform_invert}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns the inverse transformation of the specified *point* which is a two-element array of numbers [*x*, *y*]. The returned point is equal to [(*x* - *t<sub>x</sub>*) / *k*, (*y* - *t<sub>y</sub>*) / *k*].

## *transform*.invertX(*x*) {#transform_invertX}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns the inverse transformation of the specified *x*-coordinate, (*x* - *t<sub>x</sub>*) / *k*.

## *transform*.invertY(*y*) {#transform_invertY}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns the inverse transformation of the specified y coordinate, (*y* - *t<sub>y</sub>*) / *k*.

## *transform*.rescaleX(*x*) {#transform_rescaleX}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns a [copy](./d3-scale/linear.md#linear_copy) of the [continuous scale](./d3-scale/linear.md) *x* whose [domain](./d3-scale/linear.md#linear_domain) is transformed. This is implemented by first applying the [inverse *x*-transform](#transform_invertX) on the scale’s [range](./d3-scale/linear.md#linear_range), and then applying the [inverse scale](./d3-scale/linear.md#linear_invert) to compute the corresponding domain:

```js
function rescaleX(x) {
  var range = x.range().map(transform.invertX, transform),
      domain = range.map(x.invert, x);
  return x.copy().domain(domain);
}
```

The scale *x* must use [interpolateNumber](./d3-interpolate/value.md#interpolateNumber); do not use [*continuous*.rangeRound](./d3-scale/linear.md#linear_rangeRound) as this reduces the accuracy of [*continuous*.invert](./d3-scale/linear.md#linear_invert) and can lead to an inaccurate rescaled domain. This method does not modify the input scale *x*; *x* thus represents the untransformed scale, while the returned scale represents its transformed view.

## *transform*.rescaleY(*y*) {#transform_rescaleY}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns a [copy](./d3-scale/linear.md#linear_copy) of the [continuous scale](./d3-scale/linear.md) *y* whose [domain](./d3-scale/linear.md#linear_domain) is transformed. This is implemented by first applying the [inverse *y*-transform](#transform_invertY) on the scale’s [range](./d3-scale/linear.md#linear_range), and then applying the [inverse scale](./d3-scale/linear.md#linear_invert) to compute the corresponding domain:

```js
function rescaleY(y) {
  var range = y.range().map(transform.invertY, transform),
      domain = range.map(y.invert, y);
  return y.copy().domain(domain);
}
```

The scale *y* must use [interpolateNumber](./d3-interpolate/value.md#interpolateNumber); do not use [*continuous*.rangeRound](./d3-scale/linear.md#linear_rangeRound) as this reduces the accuracy of [*continuous*.invert](./d3-scale/linear.md#linear_invert) and can lead to an inaccurate rescaled domain. This method does not modify the input scale *y*; *y* thus represents the untransformed scale, while the returned scale represents its transformed view.

## *transform*.toString() {#transform_toString}

[Source](https://github.com/d3/d3-zoom/blob/main/src/transform.js) · Returns a string representing the [SVG transform](https://www.w3.org/TR/SVG/coords.html#TransformAttribute) corresponding to this transform. Implemented as:

```js
function toString() {
  return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
}
```

# docs/getting-started.md

<script setup>

import ExampleBlankChart from "./components/ExampleBlankChart.vue";

</script>

# Getting started

D3 works in any JavaScript environment.

## Try D3 online

The fastest way to get started (and get help) with D3 is on [Observable](https://observablehq.com)! D3 is available by default in notebooks as part of Observable’s standard library. To create something with D3, return the generated DOM element from a cell. Here is a blank chart to get you started:

<ExampleBlankChart />

```js
{
  // Declare the chart dimensions and margins.
  const width = 640;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the x (horizontal position) scale.
  const x = d3.scaleUtc()
      .domain([new Date("2023-01-01"), new Date("2024-01-01")])
      .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height);

  // Add the x-axis.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));

  // Add the y-axis.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));

  // Return the SVG element.
  return svg.node();
}
```

As a more complete example, try one of these starter templates:

* [Area chart](https://observablehq.com/@d3/area-chart/2)
* [Bar chart](https://observablehq.com/@d3/bar-chart/2)
* [Donut chart](https://observablehq.com/@d3/donut-chart/2)
* [Histogram](https://observablehq.com/@d3/histogram/2)
* [Line chart](https://observablehq.com/@d3/line-chart/2)

See the [D3 gallery](https://observablehq.com/@d3/gallery) for more forkable examples.

Observable includes a few D3 snippets when you click **+** to add a cell (type “d3” when the cell menu is open to filter), as well as convenient [sample datasets](https://observablehq.com/@observablehq/sample-datasets) to try out D3 features. Or upload a CSV or JSON file to start playing with your data. You can also fork any of the [hundreds of notebooks](https://observablehq.com/@d3?tab=notebooks) we’ve published for a head start.

Observable is free for public use. Sign up for a [Pro account](https://observablehq.com/pricing) to connect to private databases, collaborate on private notebooks, and more.

## D3 in vanilla HTML

In vanilla HTML, you can load D3 from a CDN such as jsDelivr or you can download it locally. We recommend using the CDN-hosted ES module bundle. But for those who need it, we also provide a UMD bundle that exports the `d3` global when loaded as a plain script.

:::code-group
```html [ESM + CDN]
<!DOCTYPE html>
<div id="container"></div>
<script type="module">

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Declare the chart dimensions and margins.
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// Declare the x (horizontal position) scale.
const x = d3.scaleUtc()
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// Add the x-axis.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

// Add the y-axis.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

// Append the SVG element.
container.append(svg.node());

</script>
```

```html [UMD + CDN]
<!DOCTYPE html>
<div id="container"></div>
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script type="module">

// Declare the chart dimensions and margins.
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// Declare the x (horizontal position) scale.
const x = d3.scaleUtc()
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// Add the x-axis.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

// Add the y-axis.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

// Append the SVG element.
container.append(svg.node());

</script>
```

```html [UMD + local]
<!DOCTYPE html>
<div id="container"></div>
<script src="d3.js"></script>
<script type="module">

// Declare the chart dimensions and margins.
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 30;
const marginLeft = 40;

// Declare the x (horizontal position) scale.
const x = d3.scaleUtc()
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// Add the x-axis.
svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

// Add the y-axis.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

// Append the SVG element.
container.append(svg.node());

</script>
```
:::

You can also import and destructure individual D3 modules like so:

```html
<script type="module">

import {forceSimulation, forceCollide, forceX} from "https://cdn.jsdelivr.net/npm/d3-force@3/+esm";

const nodes = [{}, {}];
const simulation = forceSimulation(nodes)
    .force("x", forceX())
    .force("collide", forceCollide(5))
    .on("tick", () => console.log(nodes[0].x));

</script>
```

If you’d prefer to run D3 locally (or offline), you can download the UMD bundles of D3 here:

- <a href="./d3.v7.js" download>d3.v7.js</a>
- <a href="./d3.v7.min.js" download>d3.v7.min.js</a>

Then, create an `index.html` file as shown above in the **UMD + local** tab. Use the non-minified bundle for debugging, and the minified bundle for faster performance in production.

## Installing from npm

If you’re developing a web application using Node, you can install D3 via yarn, npm, pnpm, or your preferred package manager.

:::code-group

```bash [yarn]
yarn add d3
```

```bash [npm]
npm install d3
```

```bash [pnpm]
pnpm add d3
```

:::

You can then load D3 into your app as:

```js
import * as d3 from "d3";
```

You can instead import specific symbols if you prefer:

```js
import {select, selectAll} from "d3";
```

Alternatively you can install and import from D3 submodules:

```js
import {mean, median} from "d3-array";
```

TypeScript declarations are available via [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

## D3 in React

Most D3 modules (including [d3-scale](./d3-scale.md), [d3-array](./d3-array.md), [d3-interpolate](./d3-interpolate.md), and [d3-format](./d3-format.md)) don’t interact with the DOM, so there is no difference when using them in React. You can use them in JSX for purely declarative visualization, such as the line plot below.

:::code-group
```jsx [LinePlot.jsx]
import * as d3 from "d3";

export default function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20
}) {
  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  const line = d3.line((d, i) => x(i), y);
  return (
    <svg width={width} height={height}>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
      </g>
    </svg>
  );
}
```
:::

<p style="margin-top: -1em;"><a href="https://codesandbox.io/s/d3-react-ssr-5g1bm0?file=/src/LinePlot.jsx" style="font-size: smaller;" target="_blank">Sandbox ↗︎</a></p>

D3 modules that operate on [selections](./d3-selection/selecting.md) (including [d3-selection](./d3-selection.md), [d3-transition](./d3-transition.md), and [d3-axis](./d3-axis.md)) do manipulate the DOM, which competes with React’s virtual DOM. In those cases, you can attach a ref to an element and pass it to D3 in a useEffect hook.

:::code-group
```jsx [LinePlot.jsx]
import * as d3 from "d3";
import {useRef, useEffect} from "react";

export default function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40
}) {
  const gx = useRef();
  const gy = useRef();
  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  const line = d3.line((d, i) => x(i), y);
  useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);
  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
      </g>
    </svg>
  );
}
```
:::

<p style="margin-top: -1em;"><a href="https://codesandbox.io/s/d3-react-useeffect-5lp0x6?file=/src/LinePlot.jsx" style="font-size: smaller;" target="_blank">Sandbox ↗︎</a></p>

For more guidance using D3 in React, see [Amelia Wattenberger’s post](https://2019.wattenberger.com/blog/react-and-d3).

## D3 in Svelte

As [with React](#d3-in-react), you can use Svelte exclusively for rendering if you like, and only use D3 modules that don’t manipulate the DOM. Here is a line plot of an array of numbers that uses [d3-shape](./d3-shape.md) and [d3-scale](./d3-scale-chromatic.md).

:::code-group
```svelte [LinePlot.svelte]
<script>
  import * as d3 from 'd3';

  export let data;
  export let width = 640;
  export let height = 400;
  export let marginTop = 20;
  export let marginRight = 20;
  export let marginBottom = 20;
  export let marginLeft = 20;

  $: x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  $: y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  $: line = d3.line((d, i) => x(i), y);
</script>
<svg width={width} height={height}>
  <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
  <g fill="white" stroke="currentColor" stroke-width="1.5">
    {#each data as d, i}
      <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
    {/each}
  </g>
</svg>
```
:::

<p style="margin-top: -1em;"><a href="https://svelte.dev/repl/ece91c0d8b204d5ea970dbbc0d6783aa?version=3.59.1" style="font-size: smaller;" target="_blank">REPL ↗︎</a></p>

Svelte’s reactive statements (`$:`) pair nicely with D3 [data joins](./d3-selection/joining.md) for efficient updates. Below, we use them to render dynamic axes as the data changes.

:::code-group
```svelte [LinePlot.svelte]
<script>
  import * as d3 from 'd3';

  export let data;
  export let width = 640;
  export let height = 400;
  export let marginTop = 20;
  export let marginRight = 20;
  export let marginBottom = 30;
  export let marginLeft = 40;

  let gx;
  let gy;

  $: x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
  $: y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
  $: line = d3.line((d, i) => x(i), y);
  $: d3.select(gy).call(d3.axisLeft(y));
  $: d3.select(gx).call(d3.axisBottom(x));
</script>
<svg width={width} height={height}>
  <g bind:this={gx} transform="translate(0,{height - marginBottom})" />
  <g bind:this={gy} transform="translate({marginLeft},0)" />
  <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
  <g fill="white" stroke="currentColor" stroke-width="1.5">
    {#each data as d, i}
      <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
    {/each}
  </g>
</svg>
```
:::

<p style="margin-top: -1em;"><a href="https://svelte.dev/playground/8722c32f4e1a44a98e3a3fc8a095b2d7?version=5.16.0" style="font-size: smaller;" target="_blank">REPL ↗︎</a></p>

# docs/index.md

---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
titleTemplate: "The JavaScript library for bespoke data visualization"

head:
  - - link
    - rel: canonical
      href: https://d3js.org
  - - meta
    - name: title
      content: D3
  - - meta
    - name: description
      content: The JavaScript library for bespoke data visualization

hero:
  name: "D3"
  text: "The JavaScript library for bespoke data visualization"
  tagline: Create custom dynamic visualizations with unparalleled flexibility
  image:
    src: /logo.svg
    alt: D3
  actions:
    - theme: brand
      text: Get started
      link: /getting-started
    - theme: alt
      text: What is D3?
      link: /what-is-d3
    - theme: alt
      text: Examples
      link: https://observablehq.com/@d3/gallery?utm_source=d3js-org&utm_medium=hero&utm_campaign=try-observable
      rel: external

features:
  - title: Selections and transitions
    details: Create, update, and animate the DOM based on data without the overhead of a virtual DOM.
    link: /d3-selection
  - title: Scales and axes
    details: Encode abstract data into visual values such as position, size, and color. Explain position encodings with axes.
    link: /d3-scale
  - title: Shapes
    details: Render arcs, areas, curves, lines, links, pies, stacks, symbols… and any geometric primitive you might need to visualize data.
    link: /d3-shape
  - title: Interactions
    details: Facilitate exploration with reusable interactive behaviors, including panning, zooming, brushing, and dragging.
    link: /d3-brush
  - title: Layouts
    details: Treemaps, trees, force-directed graphs, Voronoi, contours, chords, circle-packing… a library of layout algorithms at the ready.
    link: /d3-hierarchy
  - title: Geographic maps
    details: More spherical projections than you can shake a stick at, with arbitrary aspects, adaptive sampling, and flexible clipping.
    link: /d3-geo
  - title: … and much more!
    details: CSV parsing, localized date parsing and formatting, color spaces, calendar math, statistics, and can I stop listing features now?
    link: /d3-array
  - title: Powering Observable Plot
    details: The D3 team also builds Observable Plot, a high-level API for quick charts built on top of D3.
    link: https://observablehq.com/plot?utm_source=d3js-org&utm_medium=features&utm_campaign=try-observable
    linkText: Try Observable Plot
    rel: external
  - title: Built by Observable
    details: D3 is developed by Observable, the platform for collaborative data analysis.
    link: https://observablehq.com?utm_source=d3js-org&utm_medium=features&utm_campaign=try-observable
    linkText: Visit Observable
    rel: external
---

<style>

:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(-30deg, #f9a03c, #b84e51);
}

.VPHero .name {
  display: none; /* too similar to the logo */
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
  <span style="display: inline-block; position: relative;">bespoke<svg style="color: var(--vp-c-brand); position: absolute; z-index: -1; top: 1em; left: 0.2em; width: calc(100% - 0.7em); height: auto;" width="240" height="11" viewBox="0 0 240 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.766 10.187c.939-.024.386-.885.552-1.401 1.105-.301.553.626.962 1.061.685-.263 1.171-1.1 1.696-1.085.044.144.15.191.044.378.697-.736 2.21-.134 2.995-1.052a.55.55 0 0 1 .127.215 3.35 3.35 0 0 1-.204-1.204c.42-.034.751-.593.94 0-.255 0-.266.23-.377.416l.426-.273c.448.813-.586.316-.553.927.84-.306 1.802-1.037 2.476-.831.182.803-1.525.339-.608 1.023l-1.033-.268c.85 1.248-.625-.057.171 1.276 1.348.177 1.47-.478 2.818-.3.276-.479-.132-.66.144-1.124 1.857-.885 1.602 1.984 2.94.846.337-.555.42-1.582 1.442-1.08l-.276.889c1.298.038.668-1.348 2.06-.784-.226.368-1.005.344-.8.444.917.689.59-.545 1.27-.569l.16.827c1.371-.181 2.863-.827 4.388-1.037-.072.249-.326.512.044.746 1.912-.478 4.123-.058 6.007.368l.68-.727c.05.015.095.04.132.074a.275.275 0 0 1 .077.118c.014.044.015.091.004.136a.27.27 0 0 1-.07.122c.74.243 0-.445.354-.732.414-.062.552.383.315.603 1.248-.636 3.586-1.401 4.973-.694l-.254.22c1.06.249 1.105-1.477 2.127-.855l-.182.129c2.293.23 4.785-.478 6.564.52.293-1.017 2.272.393 2.365-1.022 1.327.664.967.927 2.813 1.348.492.052.702-.899 1.299-1.061l.044.731.79-.794.47.87.552-.205a.66.66 0 0 1-.332-.2.517.517 0 0 1-.132-.33c.873-.354 2.177.477 2.21.831l2.078-.679c-.039.301-.387.411-.657.607 1.105-.779.226.77 1.232.053-.144-.163.06-.44.077-.588.553.435 1.691.416 2.547.205l-.149.512c1.558.1 3.271-.31 5.018-.335-.636-.224-.514-1.109 0-1.204l.226.774c.32-.478-.552-.282.122-.884.652.076.464.875.094 1.138l.784-.287c.056.23-.127.358-.165.655.309-.478 1.387.75 1.834-.096l.05.23c1.746-.03 2.53-.316 3.95-.383 0-.674.553-.535.984-1.085 1.05.196 2.21.707 3.482.63.878-.343.243-.568.635-.955.077.612 1.332.535.69.985a15.353 15.353 0 0 0 3.83-.68c-.21-.243-.447-.353-.331-.563a.738.738 0 0 1 .275.01c.09.02.173.058.245.11a.58.58 0 0 1 .169.188c.04.072.061.151.062.232l-.088.067c2.127-.956 4.973 1.706 6.669.41l-.099.068 1.763-.684c.817.1-.481.478.127.842 1.9-1.043 3.022.12 4.586-.574 1.243 1.793 4.327-.167 5.979.956l-.1-.42c.426-.421.52.234.835.33-.05-.33-.464-.378-.205-.613 3.598-.545 7.438.598 11.129.956 1.348.11.757-2.203 2.465-1.195l-.481.794c2.719-.956 5.564 0 8.233-.77-.154.182-.16.416-.425.416.552.574 2.083.034 2.094-.435.42.053.1.425.354.665.552.339 1.42-.732 1.718-.158.05.09-.16.186-.265.23.37-.278 1.719.076 1.365-.589 1 .32 1.917-.287 2.713.105.553-.736 1.713.364 1.884-.683-.077 1.08 1.752.875 2.387.377-.215.326.553.345.299.794.718 0 1.381-.206 1.265-.76 1.315 1.305 2.686-1.018 3.415.645a45.888 45.888 0 0 1 6.078-1.17c-.082 1.075-2.138.09-2.066 1.218 1.834-.425 2.906-1.343 4.719-1.066.47.153-.276.478-.437.65 1.835-.43 3.537.148 5.172-.42 0 .1-.182.21-.348.291.321-.033.741.167.713-.325l-.315.13c-.497-.718 1.304-1.468 1.365-1.841-.553 1.396 1.602.377.707 2.137a.73.73 0 0 0 .337-.263.58.58 0 0 0 .1-.383c.315.1.409.297.083.665 1.155-.254.757-.78 1.801-.75 0 .233-.221.324-.337.601.553-.478 1.078-.908 1.951-.697-.056.143.044.33-.216.325 1.509-.048 2.603-1.195 4.249-.722-.513 1.023.553.349.625 1.243l.895-.254-.348-.44c.785.034 1.492-.602 2.155-.296l-.591.354 1.47-.139-.824-.354c.807-.444-.055-1.132.978-.86-.21.086.785.029 1.177.56.398-.278.801-.57 1.376-.335.138.291-.149.984-.055 1.176.398-.736 1.834-.168 2.337-.956-.143.227-.192.49-.138.745l.337-.597c.359.2.409.296.337.669 1.105.134-.309-1.138.967-.626-.105.048-.055.138-.27.23 1.287.277 2.519-.335 3.702 0 .326.903-1.05.195-.669.955 1.724-.129 3.592-.999 5.25-.74l-.31-.106c.277-1.262 1.221.66 2.083.086-.21.086-.298.693-.237.555 1.105.234 2.343-.249 4.083-.603l-.226.32c.657.311 1.763.216 2.481.383.226-.315.641-.253.403-.731 2.166 1.912 4.305-.89 6.228.726-.238 0-.553.268-.387.273l1.702-.244c-.111-.554-.21-.34-.553-.784.124-.163.292-.298.489-.392.198-.094.419-.145.644-.148-.774.34-.028.884.287 1.205-.049-.173.072-.354.05-.526.846 1.008.199-1.11 1.376-.407l-.077.287c.458-.134.889-.478 1.37-.401.177.645-.492.282-.552.803.685 0 1.403-1.162 1.994-.507-.298.167-.718.158-1.016.325.641.77.729.583 1.221.717h-.044l1.138.378-.282-.21c.928-1.635 1.752-.25 2.951-1.3-1.166.994-.21.592-.332 1.309.288.21.724.454.586.65.553-.564.89.478 1.696-.34 0 .235.581.044.431.627.713-.163-.149-.411-.077-.703 1.133-.76 2.514 1.061 4.139.029 1.376-.397 1.658-1.171 2.94-1.515.403.392-.393.836-.393.836.267.161.581.255.906.27a1.97 1.97 0 0 0 .934-.184c-.138.196 0 .373.172.64.519-.038.386-.831 1.05-.477a3.24 3.24 0 0 1-.553.918c.619-.192 1.243-.603 1.884-.79.149.412-.409.603-.646.856.718-.153 1.851-.296 2.105-.927l-.442-.248c.26 0 .105.559-.094.669-.63.478-.862-.258-.884-.478l.459-.134c-.387-1.382-1.818.148-2.719.033l.431-.956-.973.784c-.182-.263-.287-.822.166-.956-.624-.516-.591.33-1.105-.239-.055-.086-.028-.134.033-.172l-.646.273c.132-.201-.072-.703.309-.545-1.105-.617-1.873.674-2.26-.096l.099-.057c-1.596.272-.193.721-1.414 1.534l-.713-1.83-.188.721c-.16-.033-.481-.1-.409-.387-.63.478.089.32-.287.78-.752-.699-2.172.229-2.293-.957-.31.545.729.478-.127.813-.183-1.258-.978.181-1.658-.416.254-.636.917-.273.226-.875-.486 1.076-1.386-.282-2-.096-.066.87-1.332.32-2.354.579.078-.292-1.89-.54-2.818-.885l.033-.148c-.221.87-1.182.674-1.901.832a.906.906 0 0 1 .132-.55c.102-.169.258-.31.449-.406h-.669a.979.979 0 0 1-.34.327 1.167 1.167 0 0 1-.478.151l.194-.65c-.885 0-1.813.712-2.94.244-.083.607.84 1.725-.381 2.103-.034-.335-.056-.899.27-1.028-.105.043-.381.263-.585.12l.502-.545c-.508-.258-.287.478-.701.397 0-.478-.293-.35-.221-.722.11-.038.359.205.525 0a1.931 1.931 0 0 1-.691-.264 1.649 1.649 0 0 1-.503-.487c.028.268-.028.636-.37.684-.89 0-.282-.574-.79-.832-.227.325-.78-.033-.824.674-.259 0-.293-.34-.387-.535-.469.3-2.149.033-1.657.793l.116.053s-.05 0-.078.033c-1.525.66-3.105-.478-4.608-.224V3.34c-.895.244-1.984.106-2.636.593a.711.711 0 0 1-.402-.28.553.553 0 0 1-.084-.442c-.691.158-.774.416-1.746 0 .701-.396-.221-.373.713-.287-.879-.224-1.067-.607-2.039 0 .342-.597-.641-.774-1.067-.602l.608.445c-.436.053-.88.039-1.31-.043l.254-.794c-1.784-1.004-3.315 1.578-4.647-.067-.497.545.973.411.553 1.052-.829-.124-1.658-1.286-1.929-1.29-1.132-.479-1.105 1.137-2.282.812a.818.818 0 0 1 .031.774.938.938 0 0 1-.264.323 1.11 1.11 0 0 1-.397.198c-.829-.124-.994-1.214-.464-1.434.205 0 .299.072.288.168.27-.096.629-.21.303-.526l-.116.282c-.403-.297-1.552-.292-1.271-.75-.635.257-.281.477.183.616-1.061-.435-1.658-.053-2.763-.344.171.162.326.478.155.478-1.608-.378-.724.526-1.824.636-.608-.445.249-1.033-.862-.684-.668-.306-.127-.755.149-.985-1.016.536-1.867-.387-2.442-.478l.553-.22a1.892 1.892 0 0 1-.846.12l.293.573c-.309-.105-.553-.11-.553-.348-.326.368.227.956-.42 1.434-.403-.297-1.265.286-1.392-.478 1.298.272-.127-.76.978-.866a1.102 1.102 0 0 1-.851.024c-.044-.086.044-.157.133-.2-1.233-.689-.592.846-1.879.807.171-.42-.287-.808-.497-.721.519 0 .237.712-.249 1.027-.823-.34-.906.235-1.337.187l.491.162c-.176.426-.585.364-1.165.478-.045-.33.524-.22.326-.368-.652.736-1.437-.793-2.338-.306-.409-.291-.027-.798-.387-.999-1.011.54-1.077-.588-2.133-.148.293.574.349.435-.403.985l1.735-.387-1.105.822c.525 0 1.105-.35 1.42-.249-.553.478-.481.316-.238.794-.701-.86-1.425.478-2.21-.1l.044-1.41c-1.232-.641-2.21.702-3.823.334l.513.248c-.221.56-.994.072-1.519.292.055-.478-.271-.645-.492-.956.028.349-1.177-.043-1.337.899l-.707-.627c-1.305-.267-1.503 1.33-2.763 1.157.381-.507-.183-.846.657-1.21-.414 0-.79-.095-.801.23-.276-.263-1.199.646-1.575.215-.182.206-.243.698-.713.655a.337.337 0 0 1 0-.234c0 .234-.735.31-.331.837-1.271-1.478-3.592.095-4.708-1.172-.936.165-1.883.277-2.835.335.05-.139 0-.234.16-.186-1.143-.44-.707 1.352-2.005.86-.664-.765.69-.411.276-.703-.171-1.553-1.564.21-2.437-.702l.21-.091c-.663-.555-1.608.564-2.713.454a.326.326 0 0 0 0-.234c-.746.784-2.155 1.051-3.205 1.271.326-.607.475-.32.276-.956-.47.091.138.99-.801 1.167-.304-.33-.984-.622-1.078-1.282l.89-.019c-.459-.85-1.149.034-1.613-.114l.055-.368c-1.36.124-1.376 1.06-2.835.999l.155.282c-.796.956-.674-.521-1.465.172l-.248-.956c-.871.453-1.797.82-2.763 1.094.552-.698 1.658-1.06 2.315-1.477-.519 0-1.774.072-2.044.54.21-.09.475-.325.685-.181a2.832 2.832 0 0 1-1.094.83 3.298 3.298 0 0 1-1.42.27c.171-1.832-2.713-.455-3.482-1.865-1.834.693-3.652-.258-5.796-.13.774 1.435-.625.049-.481 1.507-.497.1-.685.076-.729 0l-1.525-.86c-.365-.421.469-.326.42-.65-1.106-.106-.465-.618-1.194-1 .155.521-.37.75-1 .56l.901.659c-1.52.793-1.338-1.214-2.868-.43l.48-.478c-.79.277-2.917 0-3.674 1.204-.144-.167-.332-.564 0-.674-1.89-.148-4.183 1.31-5.664.612l.138-.358c-.348.105-.602.678-1.05.325 0-.148.138-.359 0-.378-.182.124-.923.64-1.392.44l.386-.411c-1.85-.44-2.807 1.023-4.343 1.29 0-1.051-1.475-1.376-2.21-1.53V.685c-2.15-.086-3.625.956-5.598 1.4-1.265-1.118-4.188-.392-6.194-.99.31.182 0 .818-.37.957-.475-.206-1.266.755-1.221-.21h.165c-.375-.957-1.326-.67-2.072-.675l-.083 1.267c-2.006-1.778-5.106.813-6.227-.803-.459.33-1.045.34-1.498.67v-.68a12.396 12.396 0 0 0-3.575 0l.31-.478c-.912 0-1.072 1.98-1.912 2.042l-.288-1c-1.591.053-3.232-.774-4.763.192 0-.148.055-.445.31-.478-.746 0-2.918-.588-2.587.788-.06-.903-1.657-.038-2.48.388l.104-.689c-.685.875-.701 1.11-1.696 1.377-.243-.076-.238-.526.088-.368-.812-.32-.59.655-1.574.33l.342-.435c-.823-.029-.746.2-1.177.707-.503.287-1.564-.114-1.713-.712-.094.368-.52.875-1.011.717a.38.38 0 0 1 .013-.245.442.442 0 0 1 .164-.2c-1.393-.406-2 .851-2.973.235a.553.553 0 0 0-.182-.392 9.431 9.431 0 0 1 1.89.028c0-.616-.912-.688-.255-1.563-.685.478-1.845 1.54-2.713 1.286a.84.84 0 0 1-.1-.215l.061-.072a.668.668 0 0 0-.295 0 .61.61 0 0 0-.257.125 1.992 1.992 0 0 0-.718-.158c-.128-.507-1.023-.234-1.465-.244.072.67-.508.583.06 1.119-.07-.048.078-.086.366-.125a.528.528 0 0 0 .188-.076l-.028.062c.287-.033.663-.062 1.105-.09-.332.358-.68.654-1.183.3-.204.445-.43.894-.552 1.11-.647-.914-1.83-1.377-2.022-1.946-1.321.43-3.145.368-3.918 1.663-.376.177-.459-.344-.614-.535.216-.139.476-.13.586-.316-.74.354-2.249.216-2.381 1.105-.984-.364.491-.837-.818-.636l.166-.277c-2.675-1.291-4.09 2.433-7.068.755.204.105.304.148.354.296-3.316-.645-6.709 1.038-10.018-.062-.94-.205-1 .359-1.531.818l-.249-.713-.906.88c-1.315.679-2.47-1.65-4.117-.411l.254.478c-.624-.058-1.939.387-1.873-.177-.055.09-.166.516-.425.272l-.044-.372-1.487.712c-1.199-.215.078-1.506-1.658-1.492C.895 5.105-.22 6.114.04 6.362c.178.01.347.073.478.179a.645.645 0 0 1 .24.4l-.558.225C.17 8.279-.194 9.44 1.304 10.144l.917-.732.36.521-.818.1c.513.479.784 0 1.105-.305.07.225.233.42.458.55l.907-1.114c.149.43-.376.884.292 1.094.426-.516-.502-.956.233-1.314.513.478.403.898.933.44a.447.447 0 0 1 .012.336.525.525 0 0 1-.233.27c.476-.367 1.304-.214 1.525-.817.553.598 1.658-.248 1.691.808.29-.433.74-.77 1.277-.956-.752 1.3 1.724 0 1.591 1.348.553-1.162 2.21-.617 3.255-1.3-.055.095-.16.282-.265.23.624.061.823.391 1.237.592 0-.956.967-1.195 1.448-1.797.812.87-.392 1.118-.1 1.974-.082-.755 1.272-.813.973-1.434.614.53.514.248.862 1.008.028-1.17.553-.22.962-.956.873.54.282 1.086 1.182.689.453.354-.342.808-.342.808Zm21.793-2.93-.447.057.447-.058Zm1.818-.091a7.552 7.552 0 0 0-.801 0c-.072-.23 0-.478.171-.478-.083.186.348.305.63.478Zm-4.128-4.49c.288-.109.393 0 .442.159-.172.02-.343.053-.508.1v.081a.973.973 0 0 1 .066-.34Z"/></svg>
  </span> data visualization</div>
</template>

# docs/what-is-d3.md

<script setup>

import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import {useData} from "vitepress";
import {computed} from "vue";
import LogoDiagram from "./components/LogoDiagram.vue";
import PlotRender from "./components/PlotRender.js";

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
  })({items: sidebar}, "/D3");
  return paths;
});

// https://github.com/observablehq/plot/issues/1703
function computeTreeWidth(paths) {
  const root = d3.tree().nodeSize([1, 1])(d3.stratify().path((d) => d.path)(paths));
  const [x1, x2] = d3.extent(root, (d) => d.x);
  return x2 - x1;
}

</script>

# What is D3?

<LogoDiagram />

**D3** (or **D3.js**) is a free, open-source JavaScript library for visualizing data. Its low-level approach built on web standards offers unparalleled flexibility in authoring dynamic, data-driven graphics. For more than a decade D3 has powered groundbreaking and award-winning visualizations, become a foundational building block of higher-level chart libraries, and fostered a vibrant community of data practitioners around the world.

D3 “slingshotted the field into growth, diversification and creativity that has been unprecedented” and “changed how millions of data visualizations are created across newsrooms, websites, and personal portfolios,” remarked the Information is Beautiful [2022 Test of Time Award](https://nightingaledvs.com/information-is-beautiful-awards-test-of-time/). The IEEE VIS [2021 Test of Time Award](https://ieeevis.org/year/2021/info/awards/test-of-time-awards) noted, “By creating a framework that was compelling and easy for web developers to use to author interactive visualizations, the authors have undeniably helped to bring data visualization to the mainstream. [D3] is a cornerstone contribution to this conference specifically and more generally to the success of our field as a whole.”

D3 was created by Mike Bostock in 2011. Mike co-authored the [D3 paper](http://vis.stanford.edu/papers/d3) with Jeff Heer and Vadim Ogievetsky at Stanford. Jason Davies made major contributions to D3 from 2011 to 2013, most notably to D3’s geographic projection system. Philippe Rivière has been a major contributor to D3 and its documentation since 2016. Over the years, countless kind individuals have contributed to D3 by sharing code and ideas, by teaching and answering questions, and by bringing people together to further the practice of visualization. Mike and Philippe now maintain D3 and [Observable Plot](https://observablehq.com/plot) at [Observable](https://observablehq.com).

## D3 is a low-level toolbox

D3 is not a charting library in the traditional sense. It has no concept of “charts”. When you visualize data with D3, you compose a variety of primitives.

To make a [stacked area chart](https://observablehq.com/@d3/stacked-area-chart/2), you might use

- a [CSV parser](./d3-dsv.md) to load data,
- a [time scale](./d3-scale/time.md) for horizontal position (*x*),
- a [linear scale](./d3-scale/linear.md) for vertical position (*y*),
- an [ordinal scale](./d3-scale/ordinal.md) and [categorical scheme](./d3-scale-chromatic/categorical.md) for color,
- a [stack layout](./d3-shape/stack.md) for arranging values,
- an [area shape](./d3-shape/area.md) with a [linear curve](./d3-shape/curve.md) for generating SVG path data,
- [axes](./d3-axis.md) for documenting the position encodings, and
- [selections](./d3-selection.md) for creating SVG elements.

That’s a lot to take in, right? But take a deep breath — you don’t have to learn everything at once. Each piece can be used independently, so you can learn them individually before you fit them together. D3 is not a single monolith but rather a suite of 30 discrete libraries (or “modules”). We bundle these modules together for convenience rather than necessity so your tools are within reach as you iterate on your design.

What all’s in the D3 toolbox? We recommend exploring the documentation and examples to get a sense of what’s relevant to you.

<PlotRender :options='{
  axis: null,
  height: computeTreeWidth(paths) * 12,
  marginTop: 4,
  marginBottom: 4,
  marginRight: 120,
  marks: [
    Plot.tree(paths, {path: "path", textStroke: "var(--vp-c-bg)", channels: {href: {value: "link", filter: null}}, treeSort: null})
  ]
}' />

:::tip
Unless you need D3’s low-level control, we recommend our high-level sister library: [Observable Plot](https://observablehq.com/plot). Whereas a histogram in D3 might require 50 lines of code, Plot can do it in one! Plot’s concise yet expressive API lets you focus more on analyzing and visualizing data instead of web development. You can even combine Plot and D3 for the best of both.
:::

## D3 is flexible

Because D3 has no overarching “chart” abstraction, even a basic chart may require a few dozen lines of code. On the upside, all the pieces are laid out in front of you and you have complete control over what happens. You can tailor the visualization to achieve exactly what you want. D3 has no default presentation of your data — there’s just the code you write yourself. (Or copy from an example.)

Consider D3 an alternative to “doing everything yourself”, not an alternative to a high-level charting library. If you aren’t satisfied with other tools and you’re thinking of rolling your own charts using SVG or Canvas (or even WebGL), you might as well peruse D3’s toolbox! There’s almost certainly something here that will help you build the chart of your dreams without imposing on your creativity.

## D3 works with the web

D3 doesn’t introduce a new graphical representation; instead, you use D3 directly with web standards such as SVG and Canvas.

The name “D3” is short for *data-driven documents*, where *documents* refers to the [Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) standard that represents the contents of a webpage. While some of D3’s modules (such as [selections](./d3-selection.md) and [transitions](./d3-selection.md)) touch the DOM, others (including [scales](./d3-scale.md) and [shapes](./d3-shape.md)) only operate on data. D3 can also be paired with web frameworks such as React, Vue, and Svelte; see the [getting started guide](./getting-started.md) for recommendations.

D3’s embrace of web standards brings many benefits. For example, you can use external stylesheets to alter the appearance of charts (even in response to media queries, say for responsive charts or dark mode); you can use the debugger and element inspector to review what your code is doing; and D3’s synchronous, imperative evaluation model — calling [*selection*.attr](./d3-selection/modifying.md#selection_attr) immediately mutates the DOM — can make it easier to debug than frameworks with complex asynchronous runtimes.

## D3 is for bespoke visualization

D3 makes things possible, not necessarily easy; even simple things that should be easy are often not. To paraphrase Amanda Cox: “Use D3 if you think it’s perfectly normal to write a hundred lines of code for a bar chart.”

If you need maximal expressiveness for your bespoke visualization, you should consider D3. D3 makes sense for media organizations such as *The New York Times* or *The Pudding*, where a single graphic may be seen by a million readers, and where a team of editors can work together to advance the state of the art in visual communication.

On the other hand, D3 is overkill for throwing together a private dashboard or a one-off analysis. Don’t get seduced by whizbang examples: many of them took an immense effort to implement! If you’re constrained by time (and who isn’t?), you’d likely produce a better visualization or analysis with [Observable Plot](https://observablehq.com/plot).

## D3 is for dynamic visualization

D3’s most novel concept is its [data join](./d3-selection/joining.md): given a set of data and a set of DOM elements, the data join allows you to apply separate operations for *entering*, *updating*, and *exiting* elements. If you’re only creating static charts (charts that don’t animate or respond to user input), you may find this concept unintuitive or even bizarre because it’s not needed.

The data join exists so that you can control *exactly* what happens when your data changes and update the display in response. This direct control allows extremely performant updates — you only touch the elements and attributes that need changing, without diffing the DOM — and smooth animated transitions between states. D3 shines for dynamic, interactive visualizations. (Try option-clicking the state toggles in [“512 Paths to the White House”](https://archive.nytimes.com/www.nytimes.com/interactive/2012/11/02/us/politics/paths-to-the-white-house.html) from 2012. Really.)
