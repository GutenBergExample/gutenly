/**
 * BLOCK: Section
 *
 * Wrap another block in a section
 */
import classnames from "classnames";
import icons from "../icons";

/**
 * Internal block libraries
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	registerBlockType,
	InnerBlocks,
	InspectorControls,
	BlockControls,
	BlockDescription,
	BlockAlignmentToolbar,
	ColorPalette
} = wp.blocks; // Import registerBlockType() from wp.blocks as well as Editable so we can use TinyMCE
const {
	PanelBody,
	PanelRow,
	PanelColor,
	TextControl,
	Dashicon
} = wp.components;
const validAlignments = ["wide", "full"];
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("cgb/block-section", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Section", "CGB"), // Block title.
	icon: "editor-table", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("team"), __("Section")],
	attributes: {
		verticalPadding: {
			type: "number",
			default: 1
		},
		topMargin: {
			type: "number",
			default: 0
		},
		bottomMargin: {
			type: "number",
			default: 1
		},
		sectionBackgroundColor: {
			type: "string",
			default: "transparent"
		},
		alignment: {
			type: "string"
		}
	},

	// The "edit" property must be a valid function.
	edit: props => {
		const onChangePadding = value => {
			props.setAttributes({ verticalPadding: value });
		};

		const onChangeMarginTop = value => {
			props.setAttributes({ topMargin: value });
		};

		const onChangeMarginBottom = value => {
			props.setAttributes({ bottomMargin: value });
		};

		const onChangeSectionBackgroundColor = value => {
			props.setAttributes({ sectionBackgroundColor: value });
		};

		const updateAlignment = nextAlign =>
			props.setAttributes({
				alignment: nextAlign
			});

		return [
			!!props.focus && (
				<InspectorControls key="inspector">
					<PanelBody title={__("Section Spacings")}>
						<PanelRow>
							<TextControl
								label={__("Vertical padding (rem)")}
								value={props.attributes.verticalPadding}
								onChange={onChangePadding}
							/>
						</PanelRow>
						<PanelRow>
							<TextControl
								label={__("Top Margin (rem)")}
								value={props.attributes.topMargin}
								onChange={onChangeMarginTop}
							/>
							<TextControl
								label={__("Bottom Margin (rem)")}
								value={props.attributes.bottomMargin}
								onChange={onChangeMarginBottom}
							/>
						</PanelRow>

						<PanelColor
							title={__("Section Background Color")}
							colorValue={props.attributes.sectionBackgroundColor}
						>
							<ColorPalette
								value={props.attributes.sectionBackgroundColor}
								onChange={onChangeSectionBackgroundColor}
							/>
						</PanelColor>
					</PanelBody>
				</InspectorControls>
			),
			!!props.focus && (
				<BlockControls key="controls">
					<BlockAlignmentToolbar
						value={props.attributes.alignment}
						onChange={updateAlignment}
					/>
				</BlockControls>
			),
			<div
				className="transition-all"
				style={{
					backgroundColor: props.attributes.sectionBackgroundColor,
					paddingTop: props.attributes.verticalPadding + "rem",
					paddingBottom: props.attributes.verticalPadding + "rem",
					marginTop: props.attributes.topMargin + "rem",
					marginBottom: props.attributes.bottomMargin + "rem"
				}}
			>
				<div>
					<InnerBlocks />
				</div>
			</div>
		];
	},

	getEditWrapperProps(attributes) {
		const { alignment } = attributes;
		console.log(validAlignments);

		if (-1 !== validAlignments.indexOf(alignment)) {
			return { "data-align": alignment };
		}
	},

	// The "save" property must be specified and must be a valid function.
	save: function(props) {
		const classes = classnames(
			"transition-all",
			props.attributes.alignment ? `align${props.attributes.alignment}` : null
		);

		const innerClasses = classnames(
			props.attributes.alignment == "full" ? "container container-bd" : null
		);

		return (
			<div
				className={classes}
				style={{
					backgroundColor: props.attributes.sectionBackgroundColor,
					paddingTop: props.attributes.verticalPadding + "rem",
					paddingBottom: props.attributes.verticalPadding + "rem",
					marginTop: props.attributes.topMargin + "rem",
					marginBottom: props.attributes.bottomMargin + "rem"
				}}
			>
				<div className={innerClasses}>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
});