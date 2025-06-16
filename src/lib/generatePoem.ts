export async function generatePoem(_: string): Promise<string> {
  const poem = `햇살이 스며든 그 순간,
셔터 너머 작은 떨림
바람의 기억을 안고
너는 한 편의 시가 되어
나를 바라보았지`;
  await new Promise(resolve => setTimeout(resolve, 1000));
  return poem;
}
