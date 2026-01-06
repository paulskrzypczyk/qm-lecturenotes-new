---
title: "Chapter 1: The position of a quantum particle" 
short_title: "Ch. 1: Position"
numbering:
  enumerator: 1.%s
authors:
  - name: 
    affiliations:
---

`````{important} Video: Position of a quantum particle I
:class: dropdown
```{iframe} https://mediasite.bris.ac.uk/Mediasite/Play/da48530baf1c43e6bf10f2be7ad5a52c1d
:width: 100%
```
````{tip} Slides
:class: dropdown
```{iframe} https://www.ole.bris.ac.uk/bbcswebdav/users/phyps/Quantum%20Mechanics/Lecture%20Slides/QM-1-I.pdf
:width: 100%
```
````
`````

In your previous unit on quantum physics, you considered a simplied situation where a particle could be found in one of a discrete number of locations — for example, either on the left-hand or right-hand side of a box. Here, we will now consider a more realistic and powerful situation, that considered in the context of **mechanics**, where a particle with one degree of freedom (is constrained to move in one dimension) has a **position** $x$. Our goal is to develop the quantum formalism to describe the motion of such a particle. This is known as **quantum mechanics**. 

We will be able to learn most of the important lessons about the quantum description of the mechanics of a particle by considering only motion in one dimension. This is advantageous, as it is simpler to consider this idealised scenario. At the end of this unit, we will consider the more physically relevant case of motion in **three dimensions**, which describes the universe we live in. 

(s-position)=
## The position of a quantum particle

Consider the case previously studied, where a particle can be found in one of four possible locations, as summarised in the following figure:

```{figure}  ./Pictures/discrete-positions-1
:label: discrete-positions
:alt: Picture of a quantum particle in one of four possible locations
:width: 400px
:align: center
Quantum particle that can be in one of four possible locations. Depicted is the quantum particle in the state $\ket{0}$, in the second location. Under each possible location for the particle we have written the corresponding quantum state $\ket{k}$. 
```

In this case, the general quantum state of the particle is a superposition, given by
```{math}
:label: e-quantum-state-discrete
\ket{\psi} = \sum_{k=-1}^2\alpha_k \ket{k}, 
```
where $\alpha_k$ are complex numbers satisfying the normalisation condition $\sum_k |\alpha_k|^2 = 1$, and $\ket{k}$ is the quantum state with the particle at location $k$. Here, we will now view the labels $k$ not as abstract labels, but really as telling us, in a **coarse-grained** fashion, the position of the particle. 

Let us imagine therefore dividing each region into two, to obtain a more **fine-grained** description of the position of the particle. In this case, we would have the following situation:

```{figure}  ./Pictures/discrete-positions-2
:label: f-discrete-posiitions-2
:alt: Picture of a quantum particle now in one of eight possible locations
:width: 400px
:align: center
Quantum particle that can now be in one of 8 possible locations. Depicted is the quantum particle in the state $\ket{0}$, in the fourth location. As above, under each possible location for the particle we have written the corresponding quantum state $\ket{k}$.
```
with a general quantum state of the particle now being a superposition of the form
```{math}
:label: e-discrete-position
\ket{\psi} = \sum_{k=-3}^4\alpha_k \ket{k/2}.
```

Notice that our precision has now increased. Whereas before we could only specify the position of the particle in integer steps, we now specify it in twice as many half-integer steps. 

We can imagine continuing this process of dividing each region in two **indefinitely** until we have infinite precision, such that each quantum state $\ket{x}$ now represents an actual position for the particle. As a figure, this would now give us a **continuous line**, as depicted below:

```{figure} ./Pictures/continuous-position-1
:label: continuous-poisition-1
:alt: Picture of a quantum particle now anywhere on a line between $x=-2$ and $x=2$.
:width: 400px
:align: center
A quantum particle that can now be anywhere in the region $-2\leq x \leq 2$, arrived at by continually dividing the regions from [](#f-discrete-posiitions-2) until they become infinitely small and continuous. Depicted is a quantum particle at $x = 0$.
```
Since we have now ended up with a **continuous** position for the particle, the most general quantum superposition will no longer be a summation, but will become an **integral**,
```{math}
:label: e-contin-position
\ket{\psi} = \int_{-2}^{2} \psi(x) \ket{x} dx.
```
In [](#e-contin-position), in comparison to [](#e-discrete-position), apart from changing from a sum to an integral, we have also **renamed** the coefficients $\alpha_k$ by $\psi(x)$, and written them now as a **function**. It is useful to realise that $\alpha_k$ could also have been thought of as a (discrete) function of $k$, although it wasn't particularly useful to write it this way. Now however, it will turn out extremely useful to think of the coefficient $\psi(x)$ as a function. This is the **quantum mechanical wavefunction** of a particle. We will in fact spend the majority of this unit studying the wavefunction, as will become clear below. 

In this example so far, we have ended up with a quantum mechanical particle which can be in the region $-2\leq x \leq 2$. There was nothing special about this region, and in general, we can **extend to arbitrary positions**, so that the particle can be found anywhere. In this case we would have 

```{figure} ./Pictures/continuous-position-2
:label: f-continuous-poisition-inf
:alt: Picture of a quantum particle now anywhere on a line between $x=-\infty$ and $x=\infty$.
:width: 400px
:align: center
A quantum particle that can now be anywhere. Depicted is a quantum particle at an arbitrary position $x$.
```
with a general quantum superposition 
````{card}
```{math}
:label: e-general-quantum-state
\vph \ket{\psi} = \int_{-\infty}^{\infty} \psi(x) \ket{x} dx.
```
````
This state corresponds to a **superposition** of the particle having a position $x$, and we will refer to $\ket{x}$ as **position states**. Just as previously, e.g. in [](#e-quantum-state-discrete), these states are meant to represent a quantum particle which has — with certainty — position $x$ (we will see below that we have to be slightly careful with this!). 

We can use these to introduce the **position operator** $\hat{X}$ of a particle. This will be the operator which has as eigenvalue the position $x$, with corresponding eigenstate the position state $\ket{x}$. Using the **same rule as before** except replacing a sum by an integral, the position operator is given by
````{card}
```{math}
:label: e-position-operator
\hat{X} = \int_{-\infty}^{\infty} x \ket{x}\bra{x} dx. \vph
```
````
## Normalisation of wavefunctions

Recall that we need quantum states to be **normalised**. Mathematically, this corresponded to 
```{math}
:label: e-normalisation
\| \ket{\psi} \| = 1,
```
and physically, this ensures that when performing a measurement, the probability of the outcomes always add up to 1, as they must. While we have now moved from discrete superpositions to continuous superpositions of the form [](#e-general-quantum-state), the quantum state nevertheless must remain normalised, and the normalisation condition **remains the same**. Previously we knew that [](#e-normalisation) lead to the modulus squared of the coefficients summing up to one (i.e. $\|\ket{\psi} \|^2 = \inner{\psi}{\psi} = \sum_k |\alpha_k|^2 = 1$). For the continuous case, the generalisation of this is simply
````{card}
```{math}
:label: e-norm-wavefunction
\int_{-\infty}^{\infty} |\psi(x)|^2 dx = 1.
```
````
We need to check that this is what we arrive at starting from [](#e-general-quantum-state). We see that
```{math}
:label: e-norm-calc-1
\| \ket{\psi} \|^2 &= \inner{\psi}{\psi},\\
&= \left(\int_{-\infty}^{\infty} \psi^*(x')\bra{x'}dx'\right)\left(\int_{-\infty}^{\infty} \psi(x)\ket{x}dx\right),\\
&= \int_{-\infty}^{\infty} \psi^*(x')\left[\int_{-\infty}^{\infty} \psi(x) \inner{x'}{x} dx\right]dx'.
```
To simplify this expression, we need to recall the definition of the Dirac delta function, which we give below for convenience (along with its key properties, for later reference). 

````{topic} Dirac Delta Function
:label: dirac-delta-function
:class: dropdown
The Dirac Delta function $\delta(y)$ is defined such that
```{math}
:label: e-delta-defining-eq
\vph \infint  f(y) \delta(y-y_0) dy = f(y_0).
```
One representation of the Dirac Delta function is
```{math}
:label: e-delta
\vph \delta(y)  = \frac{1}{2\pi} \infint e^{iay} da.
```
The delta function is an infinitely thin, infinitely tall 'spike', as depicted below:

```{image} ./Pictures/delta.svg
:alt: 
:width: 250px
:align: center
```
Two key properties of the delta function are that it is an **even** function,
```{math}
:label: e-delta-even
\delta(-y) = \delta(y).
```
and that under a **change of scale**
```{math}
:label: e-delta-scale
\delta\left(by\right) = \frac{1}{|b|}\delta(y),
````
We see that in the final line of [](#e-norm-calc-1), if the inner integral (in square brackets) were equal to $\psi(x')$ then we would arrive at the desired expression [](#e-norm-wavefunction). We will achieve this, using the defining equation of the Dirac Delta function [](#e-delta-defining-eq), if 
````{card}
```{math}
:label: e-position-norm
\inner{x'}{x} = \delta(x-x').
```
````
This is a remarkable equation. What is shows is that **positions states have infinite normalisation!**:
```{math}
:label: e-norm-position-state
\| \ket{x} \|^2 = \inner{x}{x} = \delta(0) = \infty.
``` 
However, we know that physically valid quantum states must be normalised. This leads us to an extremely important conclusion:

> It is physically impossible in quantum mechanics for a particle to have a definite position.

Nevertheless, as we have seen in [](#e-general-quantum-state), quantum particles can (in fact must) have a **superposition** of positions, and be in a valid quantum state, so long as the wavefunction satisfies the normalisation condition [](#e-norm-wavefunction). What we see is that, even though the position states $\ket{x}$ are themselves not permissible quantum states, they are **useful**, and provide a convenient **basis** in which to express a quantum state.

## Probabilities to find a particle somewhere

`````{important} Video: Position of a quantum particle II
:class: dropdown
```{iframe} https://mediasite.bris.ac.uk/Mediasite/Play/a150aacb62314e608f0fa23be49695751d
:width: 100%
```
````{tip} Slides
:class: dropdown
```{iframe} https://www.ole.bris.ac.uk/bbcswebdav/users/phyps/Quantum%20Mechanics/Lecture%20Slides/QM-1-II.pdf
:width: 100%
```
````
`````

As you learnt in your previous unit on quantum physics, it is an inherently **probabilisitic** theory. That is, quantum particles do not have definite properties, but rather we must perform measurements to learn about the properties of a particle, and in general the results will be probabilistic. This is true for the position of a particle, just as with any other property. If we want to ask where a particle is, we have to measure the position operator $\hat{X}$ from [](#e-position-operator), where $x$ are the position eigenvalues and $\ket{x}$ the associated position eigenstates. 

For a state $\ket{\psi} = \int_{-\infty}^{\infty} \psi(x) \ket{x} dx$, what is the probability to find the particle at some location $x_0$? This question in fact **doesn't make sense** as stated: the position is **continuous**, and therefore there is in fact zero probability to find the particle (precisely) somewhere. As with **any** continuous quantity, we can no longer talk about probabilities, but must rather talk about **probability densities**. That is, we can ask the question: *what is the probability to find the particle in a small region of `width' $dx$?*. This will be the probability density[^pdf] $\pd(x_0)$ multipled by $dx$, as depicted in the following figure:

```{figure} ./Pictures/prob-density
:label: f-prob-density
:alt: Picture of a quantum particle now anywhere on a line between $x=-\infty$ and $x=\infty$.
:width: 400px
:align: center
**Probability densities in quantum mechanics**. The probability density is given by $\pd(x) = |\psi(x)|^2$. The probability to find a particle in the small region $x_0 \leq x \leq x_0 + dx$ of width $dx$ around $x_0$ is $\pd(x_0)dx = |\psi(x_0)|^2dx$. In the above figure, this is the area of the shaded region. 
```

[^pdf]: Note that this is also referred to as the **probability density function (PDF)**. Here we will simply refer to it as the `probability density', but the two terms are interchangable. 


where according to quantum mechanics, the probability density is given by 
````{card}
```{math}
\pd(x) = |\psi(x)|^2,
```
````
so that the probability to find the particle in a small region around $x_0$ is
````{card}
```{math}
\prob(x_0 \leq x \leq x_0 + dx) = |\psi(x_0)|^2 dx,
```
````
(i.e. nothing but the density, multiplied by the width). Physically, all measurements will have a **finite resolution**, which is here captured by the small interval $dx$. 

## State after a position measurement

Previously you also considered the **state of a particle directly after a measurement**. The rule that you learnt is that when performing a measurement of some operator, you obtain as the result of the measurement one of its eigenvalues, and the state directly after the measurement will be the corresponding **eigenstate of the operator**. 

Here we therefore see that we have a complication: As we saw in [](#e-norm-position-state), the eigenstates $\ket{x}$ of the position operator $\hat{X}$ have infinite norm, and are not valid states of a quantum particle! This raises the question of what happens to a particle after we measure its position?

The resolution of this apparent problem is the following:

> **It is unphysical to be able to perform a perfect measurement of the position of a particle**. 

That is, just like it was unphysical for a particle to have a definite position, it is also unphysical to perform a perfect measurement, which would determine the position of a particle (to infinite precision!). In reality, the best measurements we can perform will be **coarse-grained** and have a **finite resolution**. 

Nevertheless, just as it is useful to consider position states $\ket{x}$ and write quantum states as a superposition of them (as in [](#e-general-quantum-state)), it is useful to consider the probability density $\pd(x) = |\psi(x)|^2$ that *would* arise from an idealised position measurement. We will consider this **directly** instead of the measurement. We will however **not consider the associated state after the measurement**. 
```{aside} *State after a position measurement*
*While it is possible to describe the state after a coarse-grained measurement, it is beyond the scope of this unit. One reason for this is that there is no **universal** way to do this — it will depend on precisely how the finite precision is taken into account. Roughly speaking however, we expect that right after measuring the position of a particle, its state will now correspond to one **localised** around where it was found. You will often see this referred to as the `collapse' of the wavefunction.*
``` 

One advantage of using directly the probability density $\pd(x) = |\psi(x)|^2$ is that it allows us to answer natural physical questions easily. For example, a natural question we can ask about a quantum particle is: *What is the probability to find it in the region $x_a \leq x \leq x_b$?* (for example, we might be interested in an electron, and the region might be the region close to the proton in a Hydrogen atom). We can answer this question directly: it is just the **total probability** that an idealised position measurement gives a result in this region. The answer is therefore
````{card}
```{math}
\vph \prob(x_a \leq x \leq x_b) = \int_{x_a}^{x_b} |\psi(x)|^2 dx,
```
````
i.e. we integrate the probability density, just as we would involving any question involving probability densities.

(s-operators-on-wf)=
## Operators acting on wavefunctions

`````{important} Video: Position of a quantum particle III
:class: dropdown
```{iframe} https://mediasite.bris.ac.uk/Mediasite/Play/3b72a2b176b84639ae91356a18c035031d
:width: 100%
```
````{tip} Slides
:class: dropdown
```{iframe} https://www.ole.bris.ac.uk/bbcswebdav/users/phyps/Quantum%20Mechanics/Lecture%20Slides/QM-1-III.pdf
:width: 100%
```
````
`````

As this unit progresses, we will see that it is **very often** useful to focus **exclusively** on the wavefunction $\psi(x)$, and leave it **implicit** that the quantum state of the particle is as given by [](#e-general-quantum-state). The reason for this is that is can often be **overly cumbersome** to work with the full state $\ket{\psi}$, and it is much more convenient to just work with $\psi(x)$ instead.

In fact, in many popular textbooks on quantum mechanics, the presentation often **begins** with the wavefunction $\psi(x)$, before introducing the full quantum state $\ket{\psi}$ later on. One disadvantage of this is that certain aspects of quantum theory are obscured without the link to the quantum state. Here, we have introduced the quantum state first, but would now like to develop the formalism which allows us to focus exclusively on the wavefunction. 

In order to do this, there is one key ingredient we need to address, which is how to **describe the action of operators** directly on wavefunctions. We will do this in this section.

Consider the action of the position operator $\hat{X}$ on a quantum state $\ket{\psi}$:
```{math}
:label: e-X-on-psi
\hat{X}\ket{\psi} &= \hat{X}\int_{-\infty}^{\infty}\psi(x) \ket{x} dx, \nonumber \\
&= \int_{-\infty}^{\infty}\psi(x) \hat{X}\ket{x} dx, \nonumber \\
&= \int_{-\infty}^{\infty}\psi(x) x\ket{x} dx, \nonumber \\
&= \int_{-\infty}^{\infty}\psi'(x) \ket{x} dx, \nonumber \\
```
where in the last line we have defined $\psi'(x) = x\psi(x)$. 

What this shows us is that the action of the position operator $\hat{X}$ is to transform the wavefunction $\psi(x)$ to the wavefunction $\psi'(x) = x\psi(x)$. We see that this is **still a form of 'operation'** but now at the level of the wavefunction. That is, previously we saw that operators act on ket vectors, and transform them into other ket vectors. Here, in **direct analogy**, we saw that a wavefunction $\psi(x)$ was transformed into another wavefunction $\psi'(x)$, and so we can define an **associated position operator** which we will denote by $\op{X}$ (where the subscript w refers to `wavefunction') by
````{card}
```{math}
:label: e-op-X
\op{X}\psi(x) = x\psi(x).
```
````
That is, the action of $\op{X}$ is to multiply (any) wavefunction $\psi(x)$ by the coordinate $x$ everywhere, transforming into a new function $\psi'(x) = x\psi(x)$. What we can observe is that, with this definition, we have the following equality:
````{card}
```{math}
\hat{X}\ket{\psi} = \infint \left(\op{X}\psi(x)\right) \ket{x} dx.
```
````
In this way, we see that if we are given a wavefunction $\psi(x)$, as a way of describing a quantum state $\ket{\psi}$, then we can **use** $\op{X}$ in order to calculate the action of $\hat{X}$ on $\psi(x)$. 

More generally, we can apply the above procedure to **any quantum mechanical operator** $\hat{A}$: There will **always** be an associated operator $\op{A}$ acting on wavefunctions $\psi(x)$, such that
````{card}
```{math}
:label: e-op-to-wf-op
\hat{A}\ket{\psi} = \infint \left(\op{A}\psi(x)\right) \ket{x} dx.
```
````
While this is abstract at this stage, it will hopefully become much clearer in the next [Chapter](02-momentum), when we begin to investigate the **momentum** of particle in quantum mechanics. Here we will find a more interesting relationship between the momentum operator $\hat{P}$ and the associated wavefunction momentum operator $\op{P}$. 

## Exercises

````{exercise}
:label: ex-1-1
Consider a particle with the following wavefunction,
```{math}
:label: e-wf-ex-1-1
\psi(x) = \begin{cases} \frac{\sqrt{15}}{4\sqrt{a}}\left(1-\frac{x^2}{a^2}\right)&  \text{if } |x| \leq a, \\ 0  &\text{otherwise. } \end{cases}
```
where $a > 0$ is a constant, which sets the overall length scale. 
1. Show that this is a normalised wavefunction. 
1.  Sketch the wavefunction $\psi(x)$ and the probability density $\pd(x)$.
1. Where is a measurement of the position of the particle most likely to find it? What is the probability density at this location?
```{dropdown} Answers
1. n/a (show that)
2. n/a (sketch)
3. $x = 0$; $\pd(0) = \frac{15}{16a}$.
```
````
````{exercise}
:label: ex-1-2
Consider a particle with the following wavefunction,
   \begin{equation*}
   \psi(x) = \begin{cases}
   A\left(1+\frac{x}{2a}\right)&  \text{if } -2a \leq x \leq 0, \\
   A\left(1-\frac{x}{2a}\right)&  \text{if } 0 \leq x \leq 2a, \\
   0  &\text{otherwise, }
   \end{cases}
   \end{equation*}
   where $A>0$ and $a>0$ are constants. 
   1. Normalise the wavefunction. That is, find the value of $A$ such that the wavefunction is normalised. 
   1. Sketch the wavefunction $\psi(x)$, and the probability density $\pd(x)$. 
   1. What is the probability that a measurement of the position of the particle will find it  between $x = a$ and $x = 2a$. 
   ```{dropdown} Answers
   1. $A = \sqrt{\frac{3}{4a}}$.
   2. n/a (sketch)
   3. $\frac{1}{16}$
   ```
````
````{exercise}
:label: ex-1-3
Consider a particle with the following wavefunction,
   \begin{equation*}
   \psi(x) = \begin{cases}
   \frac{1}{\sqrt{a}}e^{2\pi x i /a} &  \text{if } 0 \leq x \leq a, \\
   0  &\text{otherwise. }
   \end{cases}
   \end{equation*}
   where $a > 0$ is a constant.
   1. Sketch the wavefunction $\psi(x)$, taking care to plot both the real and imaginary parts. 
   1. Show that this is a normalised wavefunction. 
   1. Sketch the probability density $\pd(x)$. 
   1. Where will a measurement of the position of the particle find it on average? That is, what is the expected location of the particle? 
   ```{note} Hint
   :class: dropdown
   Recall that for a probability density $\pd(x)$, the expectation (or expected) value is defined by
   $$  \langle x \rangle = \int_{-\infty}^{\infty} x \pd(x) dx,$$
   which is the average, or mean, position where the particle will be found.
   ```
   ```{dropdown} Answers
   1. n/a (sketch)
   2. n/a (show that)
   3. n/a (sketch)
   4. $\frac{a}{2}$
   ```
````