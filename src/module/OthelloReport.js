import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/Othello.css';

import fig1 from '../assets/othello/fig1_linearity_light.png';
import fig2 from '../assets/othello/fig2_intervention_light.png';
import fig3 from '../assets/othello/fig3_devtrace_light.png';
import fig4 from '../assets/othello/fig4_transfer_light.png';
import fig5 from '../assets/othello/fig5_transfererr_light.png';

const headline = [
    {
        stat: 'Epoch 2',
        label: 'the board becomes decodable',
        note: 'Probe error falls from 22.4% at random initialisation to 5.2% within two epochs of a twenty epoch run.',
    },
    {
        stat: 'Epoch 4',
        label: 'causal use reaches its maximum',
        note: 'The intervention effect is fully mature by epoch 4 and does not improve for the remaining sixteen epochs.',
    },
    {
        stat: '0.53',
        label: 'probe agreement, epoch 2 vs epoch 20',
        note: 'Mean cosine between probe directions at the two checkpoints. Two probes trained at the same epoch with different seeds agree at 0.999, so this is a property of the model.',
    },
    {
        stat: '26.3% vs 15.2%',
        long: true,
        label: 'asymmetric transfer error',
        note: 'A late probe applied to early activations is worse than an early probe applied to late activations. Late probes are more specialised to their own checkpoint.',
    },
];

const Figure = ({ src, alt, caption, wide }) => (
    <figure className={`oth-figure ${wide ? 'oth-figure-wide' : ''}`}>
        <div className="oth-figure-frame">
            <img src={src} alt={alt} loading="lazy" />
        </div>
        <figcaption>
            {caption}
            {wide && <span className="oth-scroll-hint">Scroll the figure sideways →</span>}
        </figcaption>
    </figure>
);

const OthelloReport = () => {
    // PlusNav.css locks the document to a fixed, non-scrolling viewport.
    // This page is a long read, so it opts back into normal page scrolling.
    useEffect(() => {
        const prevTitle = document.title;
        document.documentElement.classList.add('page-scroll');
        document.body.classList.add('page-scroll');
        document.title = 'Othello-GPT: World Model Emergence and Drift · Alexei Korolev';
        window.scrollTo(0, 0);
        return () => {
            document.documentElement.classList.remove('page-scroll');
            document.body.classList.remove('page-scroll');
            document.title = prevTitle;
        };
    }, []);

    return (
        <div className="oth-page">
            <header className="oth-topbar">
                <Link className="oth-back" to="/#projects">
                    <span className="chevron chevron-left" />
                    <span>Back to portfolio</span>
                </Link>
                <span className="oth-topbar-title">Othello-GPT</span>
            </header>

            <article className="oth-article">
                <div className="oth-hero">
                    <span className="oth-kicker">Mechanistic interpretability</span>
                    <h1 className="oth-title">
                        Othello-GPT: World Model Emergence and Drift During Training
                    </h1>
                    <p className="oth-standfirst">
                        A study of when a transformer's internal board representation appears during
                        training, how much of its behaviour that representation accounts for on a
                        calibrated scale, and how stable the representation is once it has formed.
                    </p>
                    <div className="oth-meta">
                        <span>8 layer, 512 dimensional GPT, 25.3M parameters</span>
                        <span>20 epochs, checkpoints every 2</span>
                        <span>NVIDIA H200 and A100</span>
                    </div>
                </div>

                <section className="oth-tldr">
                    <h2>Summary of findings</h2>
                    <div className="oth-stat-grid">
                        {headline.map((h, i) => (
                            <div className="oth-stat" key={i}>
                                <span className={`oth-stat-num ${h.long ? 'oth-stat-num-long' : ''}`}>
                                    {h.stat}
                                </span>
                                <span className="oth-stat-label">{h.label}</span>
                                <p className="oth-stat-note">{h.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ---------------- 1. BACKGROUND ---------------- */}

                <section className="oth-section">
                    <h2>1. Background</h2>

                    <h3>1.1 Othello</h3>
                    <p>
                        Othello is a two player game played on an 8x8 board. Players alternate
                        placing discs of their own colour. A move is legal only if the new disc
                        brackets one or more of the opponent's discs in a straight line against
                        another disc of the mover's colour. Every bracketed disc then flips to the
                        mover's colour.
                    </p>
                    <p>
                        Two properties matter here. The set of legal moves is determined entirely by
                        the current board state, and the board state changes on every single move,
                        often at several tiles at once. A player who cannot track the board cannot
                        name the legal moves.
                    </p>

                    <h3>1.2 Othello-GPT</h3>
                    <p>
                        Othello-GPT is a well known result in mechanistic interpretability, introduced
                        by Li et al. in <em>Emergent World Representations</em> (2023). The
                        experimental setup is deliberately austere. A GPT is trained on sequences of
                        Othello moves with a single objective, predicting the next move in the
                        sequence. It never observes a board. It is never given the rules. It receives
                        no supervision of any kind about game state.
                    </p>
                    <p>
                        The trained model predicts legal moves at very low error. That result raises
                        the question the paper is actually about. To do this, did the model construct
                        an internal representation of the board, or is it tracking surface statistics
                        of move sequences?
                    </p>
                    <p>
                        The paper argued for the first answer on two pieces of evidence. A probe
                        trained on the model's residual stream could decode the board state. Editing
                        that decoded state inside the residual stream changed which moves the model
                        went on to predict. The representation was therefore both present and used.
                    </p>
                    <p>
                        One detail of the original result was awkward. The probe that succeeded was a
                        nonlinear MLP probe, reaching 1.41% error at layer 7. A linear probe on the
                        same activations did not succeed. Labelling each tile black, white or empty,
                        a linear probe never fell below roughly 17.6% error. The apparent conclusion
                        was that the board was present but not linearly encoded.
                    </p>

                    <h3>1.3 Nanda's reframing</h3>
                    <p>
                        Neel Nanda showed that conclusion was an artifact of the labelling scheme
                        rather than a fact about the model, in{' '}
                        <em>Emergent Linear Representations in World Models</em> (Nanda et al. 2023).
                        Relabel each tile as <strong>mine</strong> or <strong>yours</strong> relative
                        to the player about to move, instead of black or white, and a single linear
                        probe decodes the board accurately across both plies.
                    </p>
                    <p>
                        The representation is linear. The earlier failure came from asking in
                        absolute colour coordinates, which are not the coordinates the model uses.
                        This study takes Nanda's corrected picture as its starting point.
                    </p>

                    <h3>1.4 What this study adds</h3>
                    <p>
                        Prior work establishes that the board representation exists, that it is
                        linear in the player relative frame, and that intervening on it changes model
                        behaviour. It does not establish how large the intervention effect is
                        relative to what is achievable, or when during training the representation
                        appears, or whether it is stable once formed. Those are the three questions
                        addressed below.
                    </p>
                </section>

                {/* ---------------- 2. METHODOLOGY ---------------- */}

                <section className="oth-section">
                    <h2>2. Methodology</h2>

                    <h3>2.1 Model and data</h3>
                    <p>
                        The model is an 8 layer, 8 head, 512 dimensional GPT with roughly 25.3M
                        parameters, a block size of 59 and a 61 token vocabulary. It is trained from
                        scratch on synthetic random legal Othello games. The implementation is minGPT,
                        with the upstream <code>othello_world</code> codebase vendored unmodified so
                        that comparisons to the original paper remain valid.
                    </p>
                    <p>
                        Two architectures were trained, matched on both parameter count and FLOPs. The
                        first is a standard GELU baseline. The second replaces the MLPs with bilinear
                        MLPs (Dooms et al. 2024) at expansion 8/3, a drop in replacement containing no
                        elementwise nonlinearity. The bilinear variant is included because its weights
                        are more directly analysable.
                    </p>

                    <h3>2.2 Training and checkpointing</h3>
                    <p>
                        The main run is 20 epochs on an NVIDIA H200. A checkpoint was written every 2
                        epochs, including at initialisation, giving 11 checkpoints from epoch 0 to
                        epoch 20. The full bilinear run was a single 47 hour job on two A100 80GB
                        cards. Analysis jobs ran on A40s. All compute was on the UW Hyak{' '}
                        <em>klone</em> cluster.
                    </p>
                    <p>
                        Retaining every second checkpoint is what makes the developmental and
                        transfer analyses in §3.3 and §3.4 possible. Both require probing the same
                        model at many points in training rather than only at convergence.
                    </p>

                    <h3>2.3 Reference points</h3>
                    <p>
                        Two baselines were established before any analysis. The authors' released
                        checkpoint was converted from TransformerLens to minGPT and re-scored through
                        this harness, where it produces approximately zero legal move error. This
                        confirms the evaluation harness itself is correct.
                    </p>
                    <p>
                        Second, under random legal play the irreducible next move cross entropy is
                        2.011 nats, with a mean of 8.62 legal moves per position. Reported losses
                        should be read against this floor rather than against zero.
                    </p>

                    <h3>2.4 Probing</h3>
                    <p>
                        Linear probes are trained on residual stream activations to classify each of
                        the 64 tiles as mine, yours or empty, using the player relative frame from
                        §1.3. Probes are trained per layer and per checkpoint on held out synthetic
                        games. Reported probe error is tile classification error.
                    </p>

                    <h3>2.5 Intervention and calibration</h3>
                    <p>
                        The causal test trains mine/yours probes at layers 4 through 8, edits a single
                        tile in the residual stream using the probe directions, propagates that edit
                        forward layer by layer, and then counts how many of the model's top-N
                        predicted moves are illegal <em>on the edited board</em>. If the model reads
                        the board it has just been given, that count should fall.
                    </p>
                    <p>
                        A raw count is not interpretable on its own, so the metric was calibrated
                        against both ends of its achievable range, computed directly from the game
                        engine rather than estimated. The minimum is an oracle that fully honours the
                        edit and plays the edited board. The maximum is an oracle that entirely
                        ignores the edit and plays the true board. Any measured value can then be
                        expressed as a position between those two bounds.
                    </p>

                    <h3>2.6 Probe transfer</h3>
                    <p>
                        To test stability, a probe trained on checkpoint <em>i</em> is applied to
                        activations from checkpoint <em>j</em>, for all 11 by 11 pairs. Probe
                        directions are also compared to each other directly by cosine similarity.
                    </p>
                    <p>
                        Two controls are necessary. The first is a seed control: two probes trained at
                        the same epoch on different seeds, which bounds how much of any measured
                        difference is probe training noise. The second corrects for scale. The
                        residual stream grows in norm during training, so a probe from an earlier
                        checkpoint will produce mis-scaled logits on a later one even if it is aimed
                        correctly. Each stale probe is therefore scored three ways, none of which can
                        re-aim it: <code>raw</code> leaves the logits untouched, <code>global</code>{' '}
                        fits one gain and three class offsets (4 parameters), and{' '}
                        <code>pertile</code> fits a gain and offsets per tile (256 parameters). Error
                        that survives <code>pertile</code> is not a scale effect.
                    </p>
                </section>

                {/* ---------------- 3. RESULTS ---------------- */}

                <section className="oth-section">
                    <h2>3. Results</h2>

                    <h3>3.1 Replication of prior work</h3>
                    <p>
                        Legal move error at full scale is 0.032% for the GELU model, 0.046% on an H200
                        rerun, and 0.036% for the bilinear model, against the authors' anchor
                        checkpoint at 0.017%. All three solve the task equivalently.
                    </p>
                    <p>
                        The original probe picture from Li et al. reproduces. A linear probe on
                        absolute black/white labels does not fall below roughly 17.6% error, while a
                        nonlinear MLP probe reaches 1.41% at layer 7.
                    </p>
                    <p>
                        Nanda's linearity result also reproduces. Under mine/yours labelling a single
                        linear probe reaches <strong>1.12% error at layer 7</strong>, against{' '}
                        <strong>17.7%</strong> for the absolute colour linear probe on the same
                        activations, a factor of 15.8. The layer profile is informative: error falls
                        monotonically from 9.5% at layer 1 to 1.12% at layer 7, then flattens at layer
                        8. The board is assembled through the middle of the stack and consumed at the
                        top.
                    </p>
                    <Figure
                        src={fig1}
                        alt="Linear probe error by layer on a log scale. The absolute black/white probe stays flat near 18% across all 8 layers. The player-relative mine/yours probe falls from 9.5% at layer 1 to 1.17% at layer 8, a 15.8x gap at layer 7."
                        caption="Figure 1. Linear probe error by layer for the full scale GELU model, log scale. Both probes read the same activations; only the labelling scheme differs."
                    />

                    <h3>3.2 A calibrated causal test</h3>
                    <p>
                        Over 200 cases, editing one tile in the residual stream reduces the number of
                        illegal moves in the model's top-N predictions from{' '}
                        <strong>1.36 to 0.67</strong>.
                    </p>
                    <p>
                        Reported alone, that pair of numbers cannot be assessed. A reduction of 0.69
                        is large or small only relative to what was achievable, and prior work does
                        not supply that range. I therefore calibrated the metric by computing its
                        minimum and maximum directly from the game engine:
                    </p>
                    <ul className="oth-list">
                        <li>
                            <strong>Minimum, 0.000.</strong> An oracle that fully honours the edit and
                            plays the edited board.
                        </li>
                        <li>
                            <strong>Maximum, 1.388 ± 0.547.</strong> An oracle that ignores the edit
                            entirely and plays the true board.
                        </li>
                    </ul>
                    <p>
                        Against those bounds the result reads cleanly. The un-intervened model scores
                        1.36, which sits on the maximum of 1.388, as it must, since it has not been
                        edited. That agreement is itself a check on the calibration. After the edit
                        the model moves <strong>about 51% of the distance to the minimum</strong>.
                    </p>
                    <p>
                        The effect is therefore causal and partial. The model does read the edited
                        board, and it reads it for roughly half of what an ideal edit follower would
                        do. This replaces an uncalibrated metric with one that has a defined scale.
                    </p>
                    <Figure
                        src={fig2}
                        alt="Horizontal bars of illegal moves in the model's top-N predictions. The un-intervened model scores 1.36, sitting on the calibrated maximum of 1.39. After the board edit the model scores 0.67, roughly halfway to the calibrated minimum of 0.0."
                        caption="Figure 2. Illegal moves in the model's top-N predictions, scored on the edited board, n = 200 cases with probes at layers 4 to 8. Dashed lines mark the calibrated minimum and maximum computed from the game engine."
                    />

                    <h3>3.3 Emergence across checkpoints</h3>
                    <p>
                        Probing and intervening at every second checkpoint gives the developmental
                        picture.
                    </p>
                    <div className="oth-table-wrap">
                        <table className="oth-table">
                            <thead>
                                <tr>
                                    <th>Epoch</th>
                                    <th>Best mine/yours probe error</th>
                                    <th>Intervention (base → intervened)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>0 (init)</td>
                                    <td>22.4%</td>
                                    <td>8.14 → 8.18 <em>(no effect, control)</em></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>5.2%</td>
                                    <td>1.41 → 1.05</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>2.65%</td>
                                    <td>1.37 → 0.69</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>1.49%</td>
                                    <td>1.37 → 0.64</td>
                                </tr>
                                <tr>
                                    <td>20</td>
                                    <td>1.12%</td>
                                    <td>1.36 → 0.69</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        The representation appears early. Probe error falls from 22.4% to 5.2% within
                        two epochs and to 2.65% by epoch 4. Epoch 0 serves as the random
                        initialisation control and behaves as required: 22.4% is the class prior
                        floor, and the intervention has no effect.
                    </p>
                    <p>
                        <strong>Epoch 4 is the point of interest.</strong> The intervention effect is
                        fully mature there and does not improve across the remaining sixteen epochs,
                        while probe error continues to fall from 2.65% to 1.12% over the same
                        interval. The final 60% of the improvement in decodability yields no
                        additional causal control.
                    </p>
                    <p>
                        Decodability and causal use therefore separate after epoch 4. Late training
                        refines a representation the model is already using to its full extent. This
                        is a dissociation between how well a representation can be read by an external
                        probe and how much the model itself relies on it.
                    </p>
                    <Figure
                        src={fig3}
                        alt="Two stacked panels over training epochs 0 to 20 on log scales. The upper panel shows best-layer probe error falling from 22.4% at random init to 2.65% by epoch 4 and continuing down to 1.12% by epoch 20. The lower panel shows the un-intervened and intervened illegal-move counts separating by epoch 2 and remaining flat from epoch 4 onward at about 1.37 versus 0.68."
                        caption="Figure 3. Probe error (upper) and intervention effect (lower) across training, log scales. The shaded region marks epochs 4 to 20, over which the intervention effect is flat while probe error continues to fall."
                    />

                    <h3>3.4 Probe transfer between checkpoints</h3>
                    <p>
                        The transfer analysis tests whether the representation is stable once it has
                        formed. It is not.
                    </p>
                    <p>
                        Comparing probe directions at layer 7, adjacent late checkpoints agree at a
                        mean cosine of roughly 0.99. Epoch 2 and epoch 20 agree at only{' '}
                        <strong>0.53</strong>. Epoch 0 agrees with everything at approximately 0.02.
                        The decay away from the diagonal is smooth and monotone, at both layer 4 and
                        layer 7.
                    </p>
                    <p>
                        The seed control establishes that this is a property of the model rather than
                        of probe fitting. Two probes trained at the same epoch on different seeds
                        agree at cosine 0.997 to 0.999, with subspace agreement of 0.996 to 0.999 and
                        identical error. The cross checkpoint disagreement is roughly three orders of
                        magnitude larger than that noise floor.
                    </p>
                    <Figure
                        src={fig4}
                        alt="An 11 by 11 heatmap of mean cosine similarity between layer-7 probe directions trained at different epochs. The diagonal is 1 by construction; values decay smoothly away from it, from 0.99 between adjacent late epochs down to 0.53 between epoch 2 and epoch 20, and about 0.02 for anything against epoch 0."
                        caption="Figure 4. Mean cosine similarity between layer 7 probe directions across checkpoints. The diagonal is 1 by construction. Same epoch, different seed agreement is 0.997 or above."
                    />

                    <h4>Separating scale from direction</h4>
                    <p>
                        Transfer error alone cannot distinguish a probe that is aimed incorrectly from
                        one that is aimed correctly but produces mis-scaled outputs. Applying the
                        three corrections described in §2.6 separates the two.
                    </p>
                    <div className="oth-table-wrap">
                        <table className="oth-table">
                            <thead>
                                <tr>
                                    <th>Layer 7, probe → activations</th>
                                    <th>raw</th>
                                    <th>global</th>
                                    <th>pertile</th>
                                    <th>own-epoch</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ep2 → ep20</td>
                                    <td>15.2%</td>
                                    <td>14.8%</td>
                                    <td><strong>8.3%</strong></td>
                                    <td>1.10%</td>
                                </tr>
                                <tr>
                                    <td>ep20 → ep2</td>
                                    <td>26.3%</td>
                                    <td>15.4%</td>
                                    <td><strong>10.6%</strong></td>
                                    <td>5.12%</td>
                                </tr>
                                <tr>
                                    <td>mean off-diagonal (ep ≥ 2)</td>
                                    <td>6.9%</td>
                                    <td>5.2%</td>
                                    <td><strong>3.5%</strong></td>
                                    <td>—</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <span className="oth-scroll-hint oth-scroll-hint-table">
                        Scroll the table sideways →
                    </span>
                    <p>
                        A substantial part of the apparent collapse is scale. The ep20 to ep2 case
                        falls from 26.3% to 10.6% under per tile recalibration. Figures near 50% error
                        on raw logits are largely a scale artifact and should not be cited as evidence
                        of change in the representation.
                    </p>
                    <p>
                        What survives recalibration is still large. An error of 8.3% against a native
                        1.10% is roughly eight times the own-epoch error, and around 300 times the
                        same epoch seed control spread. Epoch 0 behaves as a control must, holding at
                        approximately 42% under every correction, since recalibration cannot recover a
                        probe that was never aimed at anything.
                    </p>
                    <p>
                        The transfer error is also <strong>asymmetric</strong>. A late probe applied
                        to early activations performs worse than an early probe applied to late
                        activations, 26.3% against 15.2% on raw logits. The cosine matrix in Figure 4
                        is symmetric by construction and cannot show this. The asymmetry indicates
                        that late probes are more specialised to their own checkpoint than early
                        probes are.
                    </p>
                    <Figure
                        wide
                        src={fig5}
                        alt="Three 11 by 11 heatmaps of layer-7 probe decode error on a shared log colour scale, for the raw, global and per-tile corrections. In all three the diagonal is lowest, around 1.1 percent at late epochs, and error grows away from it. Moving from raw to per-tile shrinks the off-diagonal values substantially, for example epoch 20 applied to epoch 2 falls from 26 percent to 11 percent, but the off-diagonal never approaches the diagonal."
                        caption="Figure 5. Layer 7 probe decode error across checkpoint pairs under the three corrections, shared log colour scale. The corrections rescale probe output and never re-aim it, so residual off-diagonal error is not a scale effect."
                    />

                    <h3>3.5 Representation geometry</h3>
                    <p>
                        The 64 tile directions are not low dimensional. The top three principal
                        components account for only 9.2% of variance at layer 4 and 10.0% at layer 7.
                        There is no compact three dimensional board manifold. The board is encoded as
                        a high rank code distributed across the residual stream.
                    </p>

                    <h3>3.6 Secondary comparison: bilinear MLPs</h3>
                    <p>
                        The bilinear architecture matches the GELU baseline on the task, at 0.036%
                        against 0.032% legal move error. Its board representation is consistently
                        about twice as hard to read.
                    </p>
                    <div className="oth-table-wrap">
                        <table className="oth-table">
                            <thead>
                                <tr>
                                    <th>Probe</th>
                                    <th>GELU</th>
                                    <th>Bilinear</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>nonlinear @ L7</td>
                                    <td>1.41%</td>
                                    <td>2.60%</td>
                                </tr>
                                <tr>
                                    <td>linear mine/yours @ L7</td>
                                    <td>0.99%</td>
                                    <td>2.03%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        The linearity result of §3.1 holds under bilinear as well, at 2.03% mine/yours
                        against 16.8% absolute, a factor of 8.3. The difference between architectures
                        is in how sharply the board is written, not in what kind of representation it
                        is.
                    </p>
                    <p>
                        Decomposing the linear readout across all 64 attention heads shows the
                        bilinear board code is roughly half as redundant.
                    </p>
                    <div className="oth-table-wrap">
                        <table className="oth-table">
                            <thead>
                                <tr>
                                    <th />
                                    <th>GELU</th>
                                    <th>Bilinear</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>heads with board correlation &gt; 0.3</td>
                                    <td><strong>18 / 64</strong></td>
                                    <td><strong>9 / 64</strong></td>
                                </tr>
                                <tr>
                                    <td>strongest heads</td>
                                    <td>A5.h5 0.61, A6.h5 0.54, A7.h5 0.45</td>
                                    <td>A5.h3 0.58, A6.h0 0.57, A5.h6 0.36</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        The peak correlation is essentially unchanged at 0.61 against 0.58. The
                        bilinear model is not missing a strong board signal; it distributes that
                        signal across half as many heads. That the sparser code is also the harder to
                        read one is suggestive, but with one seed per architecture it is a correlation
                        between two measurements and not a demonstrated cause. The mechanism behind
                        the readability difference was not identified, and it is reported here as an
                        observation rather than an explanation.
                    </p>
                </section>

                {/* ---------------- 4. CONCLUSION ---------------- */}

                <section className="oth-section">
                    <h2>4. Conclusion</h2>
                    <p>
                        <strong>
                            The world model representation emerges early in training, and it continues
                            to drift for the rest of the run.
                        </strong>{' '}
                        The board becomes decodable within two epochs of a twenty epoch schedule, and
                        the model's causal reliance on it is complete by epoch 4. The remaining
                        sixteen epochs improve how legible the representation is to an external probe
                        without increasing how much the model uses it. Emergence is early and the
                        refinement that follows it is causally inert.
                    </p>
                    <p>
                        The representation does not settle once it has formed. Probe directions at
                        epoch 2 and epoch 20 agree at a cosine of 0.53, against a same epoch seed
                        control of 0.999, and the decay between checkpoints is smooth and monotone.
                        Most of the apparent transfer collapse is a scale effect and disappears under
                        recalibration, but a real difference of roughly eight times the own-epoch
                        error remains after correction. Decodability plateaus while the underlying
                        encoding keeps changing slowly. A probe is therefore a statement about one
                        checkpoint rather than about the model in general.
                    </p>
                    <p>
                        The drift is also <strong>slightly asymmetric</strong>. Probes trained on late
                        representations transfer to early activations worse than probes trained on
                        early representations transfer to late ones, 26.3% against 15.2% on raw
                        logits. Late representations appear to be more specialised, and an early probe
                        retains partial validity later in training in a way the reverse does not.
                    </p>
                    <p>
                        Separately, the causal test gives a calibrated figure for a claim that was
                        previously reported without a scale. Measured against a minimum and maximum
                        computed from the game engine, editing the board representation moves the
                        model about 51% of the way toward ideal edit following. The representation is
                        genuinely used and genuinely accounts for only part of the model's behaviour.
                    </p>
                </section>

                {/* ---------------- LIMITATIONS ---------------- */}

                <section className="oth-section oth-caveats">
                    <h2>Limitations</h2>
                    <ul className="oth-list">
                        <li>
                            Probes are trained on held out synthetic games, whereas the upstream work
                            used championship games. The representational question is unaffected, but
                            absolute numbers are not directly comparable to the paper's championship
                            track.
                        </li>
                        <li>
                            The intervention legality metric is reconstructed, since the upstream work
                            did not release the exact scoring procedure. The calibration in §3.2
                            addresses the interpretation of the number, but direct cross paper
                            comparison of the raw value remains unsafe.
                        </li>
                        <li>
                            In the developmental study, epochs 0 through 14 recorded only the best
                            layer's probe error, the result of a preempted job bug that was fixed
                            after that run. The full per layer breakdown exists from epoch 16 onward.
                        </li>
                        <li>
                            The intervention uses 200 cases. The transfer and PCA analyses use 2,000
                            games covering 117,961 positions. The model itself is a single seed.
                        </li>
                        <li>
                            All results are from one model size, 25.3M parameters, on one synthetic
                            distribution.
                        </li>
                    </ul>
                </section>

                {/* ---------------- FURTHER WORK ---------------- */}

                <section className="oth-section">
                    <h2>Further work</h2>
                    <ol className="oth-list oth-list-num">
                        <li>
                            Determine why causal efficacy stops at roughly 51%. The remaining half may
                            be a limit on probe quality, or the model may read the board through a
                            pathway the edit does not reach.
                        </li>
                        <li>
                            Train multiple seeds to test whether the drift converges to a seed
                            independent endpoint or is specific to each run.
                        </li>
                        <li>
                            Characterise the structure of the drift. It is smooth and monotone, which
                            leaves open whether it follows a low dimensional path or is diffuse.
                        </li>
                        <li>
                            Identify what makes the bilinear board representation less sharp at equal
                            task error.
                        </li>
                        <li>
                            Run a championship game track to make the numbers directly comparable to
                            the original paper.
                        </li>
                    </ol>
                </section>

                {/* ---------------- REFERENCES ---------------- */}

                <section className="oth-section oth-refs">
                    <h2>References</h2>
                    <ul className="oth-list">
                        <li>
                            Li, K., Hopkins, A. K., Bau, D., Viégas, F., Pfister, H., Wattenberg, M.
                            (2023). <em>Emergent World Representations: Exploring a Sequence Model
                            Trained on a Synthetic Task.</em>{' '}
                            <a
                                href="https://arxiv.org/abs/2210.13382"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                arXiv:2210.13382
                            </a>
                        </li>
                        <li>
                            Nanda, N., Lee, A., Wattenberg, M. (2023).{' '}
                            <em>
                                Emergent Linear Representations in World Models of Self-Supervised
                                Sequence Models.
                            </em>
                        </li>
                        <li>
                            Dooms, T., Wilhelm, D. (2024).{' '}
                            <em>
                                Bilinear MLPs enable weight-based mechanistic interpretability.
                            </em>{' '}
                            <a
                                href="https://arxiv.org/abs/2410.08417"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                arXiv:2410.08417
                            </a>
                        </li>
                    </ul>
                    <p className="oth-colophon">
                        Every figure on this page is generated directly from the result files by a
                        single reproducible job. Compute was provided on the UW Hyak <em>klone</em>{' '}
                        cluster under Jason Hendrick's account, used with permission. Code available
                        on request.
                    </p>
                </section>

                <div className="oth-footer-nav">
                    <Link className="oth-back" to="/#projects">
                        <span className="chevron chevron-left" />
                        <span>Back to portfolio</span>
                    </Link>
                </div>
            </article>
        </div>
    );
};

export default OthelloReport;
