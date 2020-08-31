import React, { useState } from 'react'
import AceEditor from 'react-ace'
import Layout from '../components/layout'
import SEO from '../components/seo'

import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-monokai'

import * as jmesmapper from 'jmesmapper';

function safeStringify(value) {
  try {
    return JSON.stringify(value, null, 2);
  } catch (error) {
    return ''
  }
}

const IndexPage = () => {
  const [data, setData] = useState({ map: '', source: '', result: '' })
  const setDataOnChange = type => {
    return value => {
      const update = { ...data, [type]: value };
      try {
        update.result = jmesmapper.search(JSON.parse(update.source), update.map);
      } catch (e) {
        update.result = e.message;
        console.log(e)
      }
      setData(update);
    }
  }

  return (
    <Layout>
      <SEO title="Page two" />
      <div class="full-width">
        <div class="left-col">
          <AceEditor
            mode="javascript"
            theme="monokai"
            width="100%"
            height="50%"
            value={data.map}
            onChange={setDataOnChange('map')}
            name="source"
            editorProps={{ $blockScrolling: true }}
          />
          <AceEditor
            mode="javascript"
            theme="monokai"
            width="100%"
            height="50%"
            value={data.source}
            onChange={setDataOnChange('source')}
            name="result"
            editorProps={{ $blockScrolling: true }}
          />
        </div>
        <div class="right-col">
          <AceEditor
            mode="json"
            theme="monokai"
            width="100%"
            height="100%"
            value={safeStringify(data.result)}
            name="map"
            editorProps={{ $blockScrolling: true }}
          />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
