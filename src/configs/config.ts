import common from './common';
import local from './local';
import dev from './dev';
import prod from './prod';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';

const phase = process.env.NODE_ENV; // phaze에 NODE_ENV값 저장

let conf = {}; // phaze의 값에 따라서 적절한 환경 변숫값을 conf에 저장
if (phase === 'local') {
  conf = local;
} else if (phase === 'dev') {
  conf = dev;
} else if (phase === 'prod') {
  conf = prod;
}

// yaml 파일 로딩
const yamlConfig: Record<string, any> = yaml.load(
  readFileSync(`${process.cwd()}/envs/config.yaml`, 'utf8'),
);

// common과 conf에서 받은 값을 합쳐서 결과값으로 주는 함수 반환
export default () => ({
  ...common,
  ...conf,
  ...yamlConfig, // 기존 설정의 마지막에 덧붙임
});
