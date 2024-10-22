<template>
  <div class="editor" id="editor" ref="editor" dir="rtl">
    <div class="placeholder" v-if="placeholder"> {{ placeholder }}</div>
    <ckeditor :editor="editor" :config="editorConfig" v-model="content" @input="input"/>
  </div>
</template>

<script>
let FullFreeBuildEditor;
let CKEditor;
if (process.client) {
  FullFreeBuildEditor = require('@blowstack/ckeditor5-full-free-build');
  CKEditor = require('@ckeditor/ckeditor5-vue2')
} else {
  CKEditor = {component: {template: '<div></div>'}}
}
export default {
  name: "EditorComponent",
  components: {
    ckeditor: CKEditor.component
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.content = this.value
  },
  data() {
    return {
      token: '',
      editor: FullFreeBuildEditor,
      content: '',
      editorConfig: {
        placeholder: this.placeholder,
        width: 'auto',
        minHeight: '800px',
        language: 'fa',
        contentLanguageDirection: 'rtl',
        plugins: [
          'Alignment',
          'BlockQuote',
          'Bold',
          'Italic',
          'Underline',
          'Indent',
          'IndentBlock',
          'Link',
          'List',
          'ListStyle',
          'MediaEmbed',
          'MediaEmbedToolbar',
          'PageBreak',
          'Paragraph',
          'PasteFromOffice',
          'SpecialCharacters',
          'SpecialCharactersArrows',
          'SpecialCharactersCurrency',
          'SpecialCharactersText',
          'Table',
          'TableCellProperties',
          'TableProperties',
          'TableToolbar',
          'TextTransformation',
          'TodoList',
          'Code',
          'CodeBlock',
          'Essentials',
          'FontFamily',
          'FontSize',
          'FontBackgroundColor',
          'FontColor',
          'Heading',
          'Highlight',
          'HorizontalLine',
          'Autoformat',
          `AutoImage`,
          `Image`,
          `ImageCaption`,
          `ImageInsert`,
          `ImageResize`,
          `ImageStyle`,
          `ImageUpload`,
          'SimpleUploadAdapter',
          'ImageToolbar',
        ],
        toolbar: {
          items: [
            'alignment',
            'blockQuote',
            'bold',
            'italic',
            'underline',
            'indent',
            'indentBlock',
            '|',
            'link',
            'list',
            'listStyle',
            '|',
            'mediaEmbed',
            'mediaEmbedToolbar',
            'pageBreak',
            'paragraph',
            'pasteFromOffice',
            'specialCharacters',
            'specialCharactersArrows',
            'specialCharactersCurrency',
            'specialCharactersText',
            '|',
            'table',
            'tableCellProperties',
            'tableProperties',
            'tableToolbar',
            '|',
            'textTransformation',
            'todoList',
            'code',
            'codeBlock',
            'essentials',
            '|',
            'fontFamily',
            'fontSize',
            'fontBackgroundColor',
            'fontColor',
            '|',
            'heading',
            'highlight',
            'horizontalLine',
            'autoformat',
            '|',
            `image`,
            `imageCaption`,
            `imageInsert`,
            `imageResize`,
            `imageStyle`,
            `imageUpload`,
            'simpleUploadAdapter',
            'imageToolbar',
          ],
          shouldNotGroupWhenFull: true
        },
        simpleUpload: {
          uploadUrl: process.env.ckeditorBaseURL,
          headers: {
            Authorization: `Bearer ${this.$cookies.get('token')}`,
            Accept: 'application/json',
            ContentType: 'application/json',
          },
        },
        fontFamily: {
          options: [
            'IRANSansX',
            'Ubuntu, Arial, sans-serif',
            'Ubuntu Mono, Courier New, Courier, monospace'
          ],
          supportAllValues: true
        },
      }
    }
  },
  methods: {
    input(event) {
      this.$emit('input', event)
    }
  }
}
</script>

<style scoped lang="scss">
.placeholder {
  margin-bottom: 10px;
  font-weight: 700 !important;
}
</style>
