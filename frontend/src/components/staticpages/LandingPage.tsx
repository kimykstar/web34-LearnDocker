import { BookOpen, Plug, Terminal, TrendingUp, View } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className='w-full'>
            <div className='bg-neutral-100'>
                <div className='container mx-auto px-4 py-16'>
                    <div className='max-w-3xl'>
                        <h1 className='text-4xl font-bold mb-6'>
                            Docker를 쉽고 재미있게 배워보세요!
                        </h1>
                        <p className='text-xl mb-8'>
                            실전 같은 환경에서 직접 실습하며 Docker의 개념과 사용법을 익혀보세요.
                            <br />
                            단계별 학습과 실시간 시각화로 더욱 효과적인 학습 경험을 제공합니다.
                        </p>
                        <button className='bg-Moby-Blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors'>
                            지금 시작하기
                        </button>
                    </div>
                </div>
            </div>

            <div className='container mx-auto px-4 py-16'>
                <h2 className='text-3xl mb-6'>기능 소개</h2>
                <div className='flex flex-col md:flex-row gap-8'>
                    <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
                        <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
                            <TrendingUp className='w-6 h-6 text-blue-600' />
                        </div>
                        <h3 className='text-xl font-semibold mb-3'>단계별 학습</h3>
                        <p className='text-gray-600'>
                            기초 개념부터 실전 활용까지 체계적으로 학습하세요. 퀴즈를 통해 학습
                            내용을 점검하고 실력을 향상시킬 수 있습니다.
                        </p>
                    </div>

                    <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
                        <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
                            <Plug className='w-6 h-6 text-blue-600' />
                        </div>
                        <h3 className='text-xl font-semibold mb-3'>통합된 학습 환경</h3>
                        <p className='text-gray-600'>
                            실제 Docker 환경에서 직접 명령어를 실행하고 결과를 확인하세요. 별도의
                            설치나 설정 없이 바로 학습을 시작할 수 있습니다.
                        </p>
                    </div>

                    <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
                        <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
                            <View className='w-6 h-6 text-blue-600' />
                        </div>
                        <h3 className='text-xl font-semibold mb-3'>실시간 시각화</h3>
                        <p className='text-gray-600'>
                            컨테이너와 이미지의 상태 변화를 실시간으로 시각화하여 보여줍니다.
                            추상적인 개념을 직관적으로 이해할 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>

            <div className='container mx-auto px-4 py-16'>
                <h2 className='text-3xl mb-6'>학습 방법</h2>
                <div className='flex flex-col gap-12'>
                    {/* 학습 페이지 설명 */}
                    <div className='flex-1 bg-white rounded-xl shadow-md overflow-hidden'>
                        <div className='bg-blue-50 p-6'>
                            <div className='flex items-center gap-3 mb-4'>
                                <BookOpen className='w-8 h-8 text-blue-600' />
                                <h3 className='text-2xl font-semibold'>학습 페이지</h3>
                            </div>
                            <p className='text-gray-600'>
                                Docker의 기본 개념과 CLI 사용법을 학습하세요
                            </p>
                        </div>

                        <div className='p-6'>
                            <ol className='space-y-4 list-decimal list-inside'>
                                <li className='text-gray-700'>
                                    <strong>Docker란?</strong>, <strong>Docker Image란?</strong>,{' '}
                                    <strong>Docker Container란?</strong>,{' '}
                                    <strong>Docker Container 생명주기</strong> 페이지에 접근하세요.
                                </li>
                                <li className='text-gray-700'>
                                    Docker의 개념과 사용법을 익혀보세요.
                                </li>
                                <li className='text-gray-700'>
                                    더 자세한 내용이나 옵션을 알고 싶다면, link된 Docker 공식 문서를
                                    참고하세요.
                                </li>
                            </ol>
                        </div>
                    </div>

                    {/* 퀴즈 페이지 설명 */}
                    <div className='flex-1 bg-white rounded-xl shadow-md overflow-hidden'>
                        <div className='bg-blue-50 p-6'>
                            <div className='flex items-center gap-3 mb-4'>
                                <Terminal className='w-8 h-8 text-blue-600' />
                                <h3 className='text-2xl font-semibold'>퀴즈 페이지</h3>
                            </div>
                            <p className='text-gray-600'>
                                샌드박스 환경에서 퀴즈를 풀며 Docker 명령어를 실습하세요
                            </p>
                        </div>

                        <div className='p-6'>
                            <ol className='space-y-4 list-decimal list-inside'>
                                <li className='text-gray-700'>
                                    Sidebar의 <strong>학습 시작하기</strong> 버튼을 눌러 세션을
                                    받아주세요. 세션을 할당받으면 타이머가 시작됩니다.
                                </li>
                                <li className='text-gray-700'>
                                    첫번째 문제인 <strong>Image 가져오기</strong> 페이지에
                                    접근하세요.
                                </li>
                                <li className='text-gray-700'>
                                    문제를 읽고, 명령창에 docker 명령어를 입력하세요.
                                </li>
                                <li className='text-gray-700'>
                                    docker 명령어를 입력했을 때, docker Image와 Container의 변화가
                                    시각적으로 나타나는 것을 확인해보세요.
                                </li>
                                <li className='text-gray-700'>
                                    <strong>Image 목록 확인하기</strong>,{' '}
                                    <strong>Container 실행하기</strong>,{' '}
                                    <strong>Container 생성 및 실행하기</strong>,
                                    <strong>Container 목록 확인하기</strong> 문제는 Input 창에
                                    정답을 입력해야 합니다.
                                </li>
                                <li className='text-gray-700'>
                                    채점 버튼을 눌러 통과 여부를 확인하세요.
                                </li>
                                <li className='text-gray-700'>
                                    다음 버튼을 눌러 다음 문제로 이동합니다.
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
