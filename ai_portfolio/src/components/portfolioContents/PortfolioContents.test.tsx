import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PortfolioContents from './PortfolioContents';
import { PORTFOLIO_CONTENT } from '../../utils/portfolioData';

describe('PortfolioContents', () => {
  it('タイトルとサブタイトルが表示される', () => {
    render(<PortfolioContents />);

    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('このポートフォリオについて')).toBeInTheDocument();
  });

  it('作成のきっかけセクションが表示される', () => {
    render(<PortfolioContents />);

    expect(
      screen.getByText(PORTFOLIO_CONTENT.motivation.title)
    ).toBeInTheDocument();
    PORTFOLIO_CONTENT.motivation.paragraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it('使用技術セクションが表示される', () => {
    render(<PortfolioContents />);

    expect(
      screen.getByText(PORTFOLIO_CONTENT.techStack.title)
    ).toBeInTheDocument();
    PORTFOLIO_CONTENT.techStack.items.forEach((item) => {
      expect(screen.getByText(`${item.label}:`)).toBeInTheDocument();
      expect(screen.getByText(item.value)).toBeInTheDocument();
    });
  });

  it('良かったポイントセクションが表示される', () => {
    render(<PortfolioContents />);

    expect(
      screen.getByText(PORTFOLIO_CONTENT.goodPoints.title)
    ).toBeInTheDocument();
    PORTFOLIO_CONTENT.goodPoints.items.forEach((point) => {
      expect(screen.getByText(point.title)).toBeInTheDocument();
      expect(screen.getByText(point.description)).toBeInTheDocument();
    });
  });

  it('残念ポイントセクションが表示される', () => {
    render(<PortfolioContents />);

    expect(
      screen.getByText(PORTFOLIO_CONTENT.badPoints.title)
    ).toBeInTheDocument();
    PORTFOLIO_CONTENT.badPoints.items.forEach((point) => {
      expect(screen.getByText(point.title)).toBeInTheDocument();
      expect(screen.getByText(point.description)).toBeInTheDocument();
    });
  });

  it('Figmaデザインカンプセクションが表示される', () => {
    render(<PortfolioContents />);

    expect(
      screen.getByText(PORTFOLIO_CONTENT.figmaDesigns.title)
    ).toBeInTheDocument();
    PORTFOLIO_CONTENT.figmaDesigns.images.forEach((image) => {
      expect(screen.getByText(image.title)).toBeInTheDocument();
      expect(screen.getByAltText(image.alt)).toBeInTheDocument();
    });
  });

  it('今後の展望セクションが表示される', () => {
    render(<PortfolioContents />);

    expect(
      screen.getByText(PORTFOLIO_CONTENT.future.title)
    ).toBeInTheDocument();
    PORTFOLIO_CONTENT.future.paragraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it('GitHubボタンが表示される', () => {
    render(<PortfolioContents />);

    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('画像をクリックするとモーダルが開く', async () => {
    const user = userEvent.setup();
    render(<PortfolioContents />);

    // モーダルは初期状態では表示されない
    expect(screen.queryByText('×')).not.toBeInTheDocument();

    // 最初の画像をクリック
    const firstImage = screen.getByAltText('HOMEページのデザインカンプ');
    await user.click(firstImage);

    // モーダルが表示される
    expect(screen.getByText('×')).toBeInTheDocument();
    expect(screen.getByAltText('デザインカンプ拡大表示')).toBeInTheDocument();
  });

  it('モーダルの閉じるボタンをクリックするとモーダルが閉じる', async () => {
    const user = userEvent.setup();
    render(<PortfolioContents />);

    // 画像をクリックしてモーダルを開く
    const firstImage = screen.getByAltText('HOMEページのデザインカンプ');
    await user.click(firstImage);

    // モーダルが表示される
    expect(screen.getByText('×')).toBeInTheDocument();

    // 閉じるボタンをクリック
    const closeButton = screen.getByText('×');
    await user.click(closeButton);

    // モーダルが閉じる
    expect(screen.queryByText('×')).not.toBeInTheDocument();
  });

  it('モーダルの背景をクリックするとモーダルが閉じる', async () => {
    const user = userEvent.setup();
    render(<PortfolioContents />);

    // 画像をクリックしてモーダルを開く
    const firstImage = screen.getByAltText('HOMEページのデザインカンプ');
    await user.click(firstImage);

    // モーダルが表示される
    const modal = screen.getByText('×').parentElement?.parentElement;
    expect(modal).toBeInTheDocument();

    // 背景をクリック
    if (modal) {
      await user.click(modal);
    }

    // モーダルが閉じる
    expect(screen.queryByText('×')).not.toBeInTheDocument();
  });
});
