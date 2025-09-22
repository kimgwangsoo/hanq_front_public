import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    unwrapDefaultObjectInVue(),
    vue()
  ],
  resolve: {
    alias: [
      { find: /^@\//, replacement: fileURLToPath(new URL('./src/', import.meta.url)) },
    ],
    // Webpack처럼 확장자 생략 허용
    extensions:['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.vue'] //.vue 추가!
  },
  define: {
    // Webpack처럼 process.env 객체를 만들어줌
    'process.env': {
      BASE_URL: '/', // 필요시 네 프로젝트 base에 맞게 수정
      // 다른 곳에서 process.env.XXX 쓰면 여기에 키 더 추가
    },
  },
  build: {
    sourcemap: false,   // 소스맵 꼬임으로 뜨는 괴상한 위치 오류 억제
  },
})

function unwrapDefaultObjectInVue() {
  return {
    name: 'unwrap-default-object-in-vue',
    enforce: 'pre', // vue 플러그인 전에 실행
    transform(code, id) {
      if (!id.endsWith('.vue')) return null

      // <script> 블록만 대상으로 삼음
      const scriptStart = code.indexOf('<script')
      if (scriptStart === -1) return null
      const scriptTagEnd = code.indexOf('>', scriptStart)
      if (scriptTagEnd === -1) return null
      const scriptClose = code.indexOf('</script>', scriptTagEnd)
      if (scriptClose === -1) return null

      const before = code.slice(0, scriptTagEnd + 1)
      const script = code.slice(scriptTagEnd + 1, scriptClose)
      const after  = code.slice(scriptClose)

      const exportIdx = script.indexOf('export default (')
      if (exportIdx === -1) {
        // 흔한 변형: 중간 공백
        const m = script.match(/export\s+default\s*\(\s*{/)
        if (!m) return null
      }

      // 시작 패턴 교체: export default ( {  -> export default {
      let s = script.replace(/export\s+default\s*\(\s*{/, 'export default {')

      // 종료 패턴 교체: 마지막 } ) ; 를 } ; 로
      // </script> 직전 범위에서만 탐색해서 안정성 확보
      s = s.replace(/}\s*\)\s*;?\s*$/, '};')

      return { code: before + s + after, map: null }
    }
  }
}