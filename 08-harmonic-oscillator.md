---
title: "Chapter 8: The quantum harmonic oscillator" 
short_title: "Ch. 8: QHO"
numbering:
  enumerator: 8.%s
authors:
  - name: 
    affiliations:
---

We now turn our attention to arguably the most important system in all of quantum mechanics — the quantum harmonic oscillator. Here we will study the quantum mechanics of a particle whose force is of the form $F(x) = - kx$. That is, a restorative force proportional to the displacement from the origin. We know that in classical mechanics systems with such forces lead to simple harmonic motion. Our goal now is to understand the quantum mechanics of such systems.  

Why is this one of the most important systems to study? The first reason is that it provides an approximation to the behaviour of **almost all** potential wells, as we outline briefly as an aside. Second, you will see later in your degree that the quantum harmonic oscillator reappears in a huge range of situations, from describing light in quantum field theory, to describing phonons in condensed matter physics and far beyond. 

The method we will use to find the energy eigenstates of the quantum harmonic oscillator is also a very deep and powerful method. It is often called the **algebraic** approach, and provides a fascinating way of **turning one energy eigenstate into another**. The alternative approach is called the **analytical** approach, and relies on solving the TISE directly. Most textbooks choose one approach or the other (or present them both). Here, we will focus on the former, as it is also the approach which is widely used in other contexts. 

````{aside} *Approximation of an arbitrary potential well*
*Imagine a situation where a particle is acted on by a conservative force $F(x)$, with associated potential energy $V(x)$. Assume that this force pushes the particle back to a position $x_0$. An example is depicted below:*

```{image} ./Pictures/arbitrary-potential.svg
:name: arbitrary-well
:align: center
```

*What is the form of the potential when the particle is close to the bottom of the well?. We can **expand** the potential energy around the bottom, to obtain*
\begin{equation}\vph
V(x) \approx V_0 +  \frac{dV}{dx}\bigg|_{x_0}(x-x_0) + \frac{1}{2}  \frac{d^2V}{dx^2}\bigg|_{x_0}(x-x_0)^2
\end{equation}
*where $V_0 = V(x_0)$.*

*At $x = x_0$, the bottom of the well, the first derivative of the potential vanishes, $\frac{dV}{dx}\big|_{x_0} = 0$, since the bottom is, by definition, a **turning point**. Thus, to leading order, the potential will be approximately*
\begin{equation}\vph
V(x) \approx V_0 + \frac{1}{2} \frac{d^2V}{dx^2}\bigg|_{x_0}(x-x_0)^2.
\end{equation}
*We can finally make two simplifications without loss of generality: First, we can **redefine the zero of the energy scale**, so that $V_0 = V(x_0) = 0$. Second, we can change our co-ordinate so that the bottom of the well corresponds to $x_0 = 0$. With these two simplications, we arrive at*
\begin{equation}
V(x) \approx \frac{1}{2}\frac{d^2V}{dx^2}\bigg|_{0}x^2 
\end{equation}
*If we call $k = \frac{d^2V(x)}{dx^2}\bigg|_{0}$, then we arrive precisely at the potential energy $V(x) = \frac{1}{2}kx^2$ associated to the force $F(x) = -kx$, through $F(x) = -dV/dx$.* 

*This shows that the harmonic oscillator is the leading-order approximation to any potential well in the vicinity of the bottom of the well. It means that if the particle is not too far from $x_0 = 0$, then the force it experiences (and the potential energy it will have) will be essentially indistinguishable from the linear force of simple harmonic motion.* 

*This region of small $x$ is precisely the region that is explored classically by a particle with low energy. It is thus reasonable to assume that for low energies, all systems behave roughly like the harmonic oscillator, and that this is also true in quantum mechanics. Hence, by solving the quantum mechanics of a harmonic oscillator, we obtain an approximation to the quantum mechanics of any particle trapped in a potential well.*

*The only caveat to the above is when $d^2V/dx^2$ vanishes. In this case, we need to go to higher-order derivatives in order to find the leading-order approximation to the potential well, and the behaviour will not be well approximated by the harmonic oscillator. The infinite square well is precisely a potential of this kind — at the bottom of the well **all derivatives $d^nV/dx^n$ vanish**. However, this indicates that there is no force on the particle whatsoever, which is a very special situation. In general, it will be the case that $d^2 V/dx^2$ does not vanish, and that the leading-order behaviour is well approximated by the harmonic oscillator.*

````

## The harmonic oscillator potential
For the classical harmonic oscillator, the relation between the **spring-constant** $k$, the **mass** $M$ and **angular frequency** $\omega$ is $\omega = \sqrt{k/M}$. For this reason, it is customary to write $k = M \omega^2$ and take the definition of the harmonic oscillator potential to be
````{card}
```{math}
:label: e-QHO-potential
V(x) = \frac{1}{2} M \omega^2x^2.
```
````
This is depicted below in [](#harmonic-oscillator).

````{figure} ./Pictures/harmonic-oscillator.svg
:name: harmonic-oscillator
:width: 400px
:align: center

**Harmonic oscillator potential.** The potential energy of the harmonic oscillator.
````

## Generating energy eigenstates using the creation and annihilation operators

Our first goal, as always, is to determine the **energy eigenstates** of the quantum harmonic oscillator. In this chapter instead of going about this directly — by solving the TISE with the potential [](#e-QHO-potential) (which is in fact not very straightforward to do at all) — we are going to take a different approach. While at first sight this might seem strange, we will ultimately realise that this is a very powerful technique for finding the energy eigenstates. 

The approach we will take is to find a special **pair of operators** called the **creation** and **annihilation operators**. These remarkable operators **transform one energy eigenstate into another**. In fact, we will see that the creation operator generates the next energy level up, while the annihilation operator generates the next one down. In this way, once we have found just **one** energy eigenstate (by whatever means!) we can then use the creation and annihilation operators to **find them all**!

*What are these remarkable creation and annihilation operators?* To define them, we first need to define a **characteristic length scale** and a **characteristic momentum scale** for the harmonic oscillator. As you will show in [](#ex-length-mom-scales), the **physical** quantities of the harmonic oscillator — the **mass** $M$, the **angular frequency** $\omega$ (which specifies the scale of the **force** through the spring constant), along with $\hbar$ (the key quantum constant which has dimensions) — can be uniquely combined to specify a length $\ell$ and a momentum $q = \hbar/\ell$, given by
````{card}
```{math}
:label: e-ell-QHO
\ell &= \sqrt{\frac{\hbar}{M\omega}},& q &= \frac{\hbar}{\ell} = \sqrt{M\hbar \omega}.
```
````
With these defined, we can now define the creation and annihilation operators, which we denote by $\hat{a}$ and $\hat{a}^\dagger$ respectively, as
````{card}
```{math}
:label: e-creation-annihilation
\hat{a} &= \frac{1}{\sqrt{2}}\left(\frac{\hat{X}}{\ell} + i \frac{\hat{P}}{\rho}\right) = \frac{1}{\sqrt{2}}\left(\frac{\hat{X}}{\ell} + i \frac{\ell\hat{P}}{\hbar}\right)& &\text{creation op.}\\
\hat{a}^\dagger &= \frac{1}{\sqrt{2}}\left(\frac{\hat{X}}{\ell} - i \frac{\hat{P}}{\rho}\right) = \frac{1}{\sqrt{2}}\left(\frac{\hat{X}}{\ell} - i \frac{\ell\hat{P}}{\hbar}\right)& &\text{annihilation op.}
```
````
That is, the creation operator is a **dimensionless** combination of the position and momentum operators, with the momentum operator multipled by the imaginary number $i$ (and an overall normalisation factor of $1/\sqrt{2}$). 

*Why did we call the annihilation operator $\hat{a}^\dagger$?* Because it is indeed the **Hermitian conjugate operator to $\hat{a}$**: Recall that since position and momentum are **observable quantities** the operators $\hat{X}$ and $\hat{P}$ are **Hermitian**, satisfying $\hat{X}^\dagger = \hat{X}$ and $\hat{P}^\dagger = \hat{P}$. Thus, when we take the Hermitian conjugate of $\hat{a}$, the **only** change is to the sign of the imaginary number $i$, which is precisely the definition of $\hat{a}^\dagger$. 

*So, how do we see that these operators do as stated?* The claim is that if we act with the creation operator on an energy eigenstate $\ket{E_n}$ (of the quantum harmonic oscillator), then we will obtain (up to normalisation) **the energy eigenstate $\ket{E_{n+1}}$.** To be an energy eigenstate means that $\hat{H} \ket{E_n} = E_n \ket{E_n}$. Thus, the claim above, expressed mathematically, is that
```{math}
:label: e-H-adag
\hat{H} \left( \hat{a}^\dagger \ket{E_n}\right) = E_{n+1} \left(\hat{a}^\dagger\ket{E_n}\right),
```
since if this equation is satisfied, it means that $\left(\hat{a}^\dagger\ket{E_n}\right)$ is an energy eigenstate of $\hat{H}$, with eigenvalue $E_{n+1}$, i.e. it is the next energy level. 

In order to show [](#e-H-adag) holds, it is easiest to return to notion of the **commutator** that we introduced previously in [](#s-commutation). In particular, if we calculate $[\hat{H},\hat{a}^\dagger]$, and find that it is equal to the operator $\hat{b}$ (which we will come to below), then this would mean that $\hat{H}\hat{a}^\dagger - \hat{a}^\dagger \hat{H} = \hat{b}$, and so by re-arranging, $\hat{H}\hat{a}^\dagger = \hat{a}^\dagger \hat{H} + \hat{b}$. We can then substitute this into the left-hand side of [](#e-H-adag) to obtain
```{math}
:label: e-H-adag-1
\hat{H} \hat{a}^\dagger \ket{E_n} &= \left(\hat{a}^\dagger \hat{H} + \hat{b}\right)\ket{E_n},\\
&= \left(E_n \hat{a}^\dagger + \hat{b}\right)\ket{E_n}.
```
At first sight this might not look too helpful. However, at this stage it is useful to determine $\hat{b}$. In [](#ex-comm-H-adag) below, by using the explicit form of $\hat{a}^\dagger$ from [](#e-creation-annihilation), as well as the explicit form of the Hamiltonian operator, with $\hat{V} = \frac{1}{2} M \omega^2 \hat{X}^2$ from [](#e-QHO-potential), and the two commutators
```{math}
[\hat{P}^2,\hat{X}] &= -2i\hbar \hat{P},& [\hat{X}^2, \hat{P}] = 2i\hbar \hat{X},
```
both of which you prove as problems in problem classes, you will show that 
````{card}
```{math}
[\hat{H},\hat{a}^\dagger] = \hbar \omega \hat{a}^\dagger.
```
````
(i.e. $\hat{b} = \hbar \omega \hat{a}^\dagger$). Substituting this into [](#e-H-adag-1), we therefore see that
```{math}
:label: e-H-adag
\hat{H} \hat{a}^\dagger \ket{E_n} = (E_n + \hbar \omega) \hat{a}^\dagger \ket{E_n},
```
This means that $(\hat{a}^\dagger \ket{E_n})$ is an **energy eigenstate** of energy $(E_n + \hbar \omega)$ (up to normalisation). This is in fact the energy of the **next** energy level $E_{n+1}$. **We will not prove this here, but state it as a fact** (which has been shown to be true). One crucial point to note is that the **spacing between the energy levels of the harmonic oscillator is constant, and equal to $\hbar \omega$.** This is a special feature of the harmonic oscillator and for other potential wells, the spacing is not constant (e.g. as we saw for the infinite square well in [](#e-isw-energy-levels), the spacing **grows**). 

In a similar fashion, in [](#ex-comm-H-a) you will similarly show the commutation relation
````{card}
```{math}
[\hat{H},\hat{a}] = -\hbar \omega \hat{a},
```
````
between the Hamiltonian and the **annihilation operator**. From this, you will also show that
```{math}
\hat{H}\hat{a}\ket{E_n} = (E_n - \hbar \omega)\hat{a}\ket{E_n}.
```
This shows that $(\hat{a}\ket{E_n})$ is an energy eigenstate of $\hat{H}$ with energy $(E_n - \hbar \omega) = E_{n-1}$. That is, the annihilation operator transforms an energy level into the **next lowest energy level** (up to normalisation). 

We thus have a procedure, starting from any given energy level $\ket{E_n}$, to create any other energy level, by either successively applying the creation operator (to **'climb up'** the energy levels) or by applying $\hat{a}$ (to **'climb down'** them). All we need is a way to find **one** eigenstate, and then we have everything we need. We will now see how we can obtain the **ground state** of the oscillator.

## The ground state of the harmonic oscillator

You might have noticed something strange in the above — we appear to be able to apply the annihilation operator as many times as we like, and continually create new energy levels of progressively lower energy. However, we know that at some point we **must** hit the state of lowest energy — the ground state. We seem to thus have a problem with this approach.

A little thought shows that there is a way out of this problem: we pointed out a couple of times above that $\hat{a}\ket{E_n}$ isn't neccessarily **normalised**, and in fact we will see below that it isn't, and this is the key to escaping our problem. In particular, let us imagine that we have indeed found the ground state, which we will denote by $\ket{E_0}$. According to the above, $\hat{a}\ket{E_0}$ will be **proportional** to a state of energy $E_0 - \hbar \omega$. However, if the proportionality constant **vanishes**, then our sequence **terminates**. That is, if $\hat{a}\ket{E_0} = 0$, then we **don't** obtain a new state, and hence we can no longer climb down! 

Remarkably, this insight **also allows us to find the ground state $\ket{E_0}$**. More precisely, we can use it to find the ground state eigenfunction $u_0(x)$. *How do we do this?* Well, we know that eigenfunctions satisfy the same equation as eigenstates, except we have to use operators on wavefunctions instead. Therefore, $\hat{a}\ket{E_0} = 0$ is equivalent to
```{math}
\op{a} u_0(x) = 0,
```
where $\op{a} = \frac{1}{\sqrt{2}}(\op{X}/\ell + i\ell \op{P}/\hbar)$, as in [](#e-creation-annihilation). Substituting in $\op{P} = -i\hbar \frac{\partial}{\partial x}$ and $\op{X} = x$, and re-arranging, we arrive at a simple differential equation that must be satisfied by $u_0(x)$:
```{math}
\frac{\partial}{\partial x} u_0(x) = -\frac{x}{\ell^2} u_0(x).
```
It isn't too difficult to spot the solution to this: it is nothing but a Gaussian:
```{math}
\frac{\partial}{\partial x} \left(N_0 e^{-x^2/2\ell^2}\right) = - \frac{x}{\ell^2} N_0 e^{-x^2/2\ell^2},
```
where $N_0$ is a normalisation constant, that we will fix below. This shows that the **ground state of the harmonic oscillator is a gaussian wavefunction**, with standard deviation $\Delta x = \ell/\sqrt{2}$ (i.e. confirming that, indeed, $\ell$ is really a characteristic length scale of the harmonic oscillator). We can thus use [](#e-gaussian-wf) to fix the normalisation, and so the ground state wavefunction is
````{card}
```{math}
u_0(x) = \sqrt{\frac{1}{\ell\sqrt{\pi}}} e^{-x^2/2\ell^2}.
```
````
As an [exercise](#ex-gs-E-QHO), by evaluating $\op{H}u_0(x)$, you will show that the energy of the ground state is
```{math}
E_0 = \frac{1}{2}\hbar \omega.
```
Before determining the rest of the energy eigenstates and eigenvalues, we will first introduce the **number operator** as this will allow us to take care of the normalisation of energy eigenstates. 

## The number operator
Having found the energy of the ground state, and given that we saw above that the energy spacing is $\hbar \omega$ (as we saw in [](#e-H-adag)), this means we now in fact know the energy of all of the energy levels, which is given by
````{card}
```{math}
:label: e-energy-levels-QHO
E_n &= \hbar \omega\left(n + \frac{1}{2}\right),& n&= 0,1,2,\ldots
```
````
Note, that whereas for the energy levels of the [infinite square well](07-infinite-square-well) we took $n$ to start at $n = 1$, for the harmonic oscillator we take $n$ to start at $n = 0$. THis is **standard** and somewhat unfortunate, but has reason (which we will explain below).

We can use [](#e-energy-levels-QHO) to learn something very interesting about the product operator $\hat{a}^\dagger \hat{a}$. Using the definitions [](#e-creation-annihilation), we see that
```{math}
\hat{a}^\dagger \hat{a} &= \frac{1}{2}\left(\frac{\hat{X}}{\ell} - i\frac{\ell \hat{P}}{\hbar}\right)\left(\frac{\hat{X}}{\ell} + i\frac{\ell \hat{P}}{\hbar}\right), \\
&= \frac{1}{2}\left(\frac{\hat{X}^2}{\ell^2} + \frac{i}{\hbar}\left(\hat{X}\hat{P} - \hat{P}\hat{X}\right) + \frac{\ell^2\hat{P}^2}{\hbar^2}\right).
```
Using the definition of $\ell$ [](#e-ell-QHO), and the canonical commutation relation [](#e-canonical-comm), this can be further simplified to give
```{math}
\hat{a}^\dagger \hat{a} &= \frac{1}{2}\left(\frac{M\omega \hat{X}^2}{\hbar} + \frac{i}{\hbar} i\hbar + \frac{\hat{P}^2}{\hbar M \omega}\right),\\
&= \frac{1}{\hbar \omega}\left( \frac{\hat{P}^2}{2M} + \frac{1}{2} M \omega^2 \hat{X}^2 - \frac{1}{2} \hbar \omega\right).
```
The first two terms in the bracket are nothing but the kinetic energy operator and potential energy operator of the harmonic oscillator, and so together give the Hamiltonian $\hat{H}$. Thus, by re-arranging, we arrive at a special equation,
```{math}
\hat{H} = \hbar \omega \left(\hat{a}^\dagger \hat{a} + \frac{1}{2}\right),
```
which shows how we can **express the Hamiltonian in terms of the creation and annihilation operators**! Finally, comparing to [](#e-energy-levels-QHO), we see that we can give $\hat{a}^\dagger \hat{a}$ a **very nice interpretation**. Since $\hat{H}\ket{E_n} = E_n \ket{E_n}$ by definition, we must therefore have
```{math}
\hat{a}^\dagger \hat{a} \ket{E_n} = n \ket{E_n}.
```
We therefore call $\hat{a}^\dagger \hat{a}$ the **number operator**, 
````{card}
```{math}
\hat{n} = \hat{a}^\dagger \hat{a},
```
```` 
such that $\ket{E_n}$ are **eigenstates**, with eigenvalue $n$ — the **quantum number** of the energy level. 